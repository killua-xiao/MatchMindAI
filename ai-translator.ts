import fs from "fs";
import path from "path";
import { GoogleGenAI, Type } from "@google/genai";
import { initialTeams, seedSystemLogs } from "./src/data";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function translateBatch(batch: string[], model: string = "gemini-3.5-flash"): Promise<any> {
  const prompt = `You are a professional football (soccer) reporter and translator. 
Translate the following array of English football terms, names, and sentences to accurate, professional, and natural Chinese.
Keep the term tone consistent with soccer terminology. Keep proper nouns matching official historical standard Chinese translations.

Terms to translate:
${JSON.stringify(batch)}

Only output valid JSON in the form:
{
  "English String": "Chinese Translation"
}`;

  return await ai.models.generateContent({
    model: model,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        additionalProperties: {
          type: Type.STRING
        }
      },
      temperature: 0.1
    }
  });
}

async function translateWithFallback(batch: string[]): Promise<any> {
  try {
    return await translateBatch(batch, "gemini-3.5-flash");
  } catch (err: any) {
    console.warn(`Primary model failed for batch, trying gemini-3.1-flash-lite...`);
    await sleep(300);
    try {
      return await translateBatch(batch, "gemini-3.1-flash-lite");
    } catch (err2: any) {
      console.warn(`Fallback model also failed, retrying once...`);
      await sleep(1000);
      return await translateBatch(batch, "gemini-3.1-flash-lite");
    }
  }
}

async function main() {
  console.log("Extracting English strings from data.ts...");
  const englishSet = new Set<string>();

  const isEnglish = (str: string) => {
    if (!str) return false;
    if (/[\u4e00-\u9fa5]/.test(str)) return false;
    return /[a-zA-Z]/.test(str);
  };

  for (const team of initialTeams) {
    if (isEnglish(team.name)) englishSet.add(team.name);
    
    if (team.coach) {
      if (isEnglish(team.coach.name)) englishSet.add(team.coach.name);
      if (isEnglish(team.coach.style)) englishSet.add(team.coach.style);
    }

    if (team.keyPlayers) {
      for (const p of team.keyPlayers) {
        if (isEnglish(p.name)) englishSet.add(p.name);
        if (isEnglish(p.club)) englishSet.add(p.club);
      }
    }

    if (team.recentForm) {
      for (const match of team.recentForm) {
        if (isEnglish(match.opponent)) englishSet.add(match.opponent);
        if (isEnglish(match.type)) englishSet.add(match.type);
      }
    }

    if (team.strengths) {
      for (const s of team.strengths) {
        if (isEnglish(s)) englishSet.add(s);
      }
    }

    if (team.weaknesses) {
      for (const w of team.weaknesses) {
        if (isEnglish(w)) englishSet.add(w);
      }
    }

    if (team.injuries) {
      for (const inj of team.injuries) {
        if (isEnglish(inj.playerName)) englishSet.add(inj.playerName);
        if (isEnglish(inj.injury)) englishSet.add(inj.injury);
        if (isEnglish(inj.status)) englishSet.add(inj.status);
      }
    }
  }

  for (const log of seedSystemLogs) {
    if (isEnglish(log.source)) englishSet.add(log.source);
    if (isEnglish(log.message)) englishSet.add(log.message);
  }

  const englishList = Array.from(englishSet);
  console.log(`Found ${englishList.length} unique English strings to translate.`);

  if (englishList.length === 0) {
    console.log("No English strings found to translate!");
    return;
  }

  const batchSize = 40;
  const batches: string[][] = [];
  for (let i = 0; i < englishList.length; i += batchSize) {
    batches.push(englishList.slice(i, i + batchSize));
  }

  console.log(`Sending ${batches.length} batches in parallel to Gemini...`);
  
  const results = await Promise.all(
    batches.map(async (batch, index) => {
      console.log(`Dispatching batch ${index + 1}/${batches.length}...`);
      const response = await translateWithFallback(batch);
      try {
        const resData = JSON.parse(response.text.trim());
        console.log(`Batch ${index + 1} processed!`);
        return resData;
      } catch (err) {
        console.error(`Failed to parse response for batch ${index + 1}:`, response?.text);
        return {};
      }
    })
  );

  const translations = Object.assign({}, ...results);
  console.log(`All parallel translations finished! Rebuilding src/data.ts...`);

  const translateVal = (val: string) => {
    if (!val) return val;
    if (translations[val]) return translations[val];
    return val;
  };

  const updatedTeams = initialTeams.map(team => {
    return {
      ...team,
      name: translateVal(team.name),
      coach: team.coach ? {
        ...team.coach,
        name: translateVal(team.coach.name),
        style: translateVal(team.coach.style)
      } : team.coach,
      keyPlayers: team.keyPlayers ? team.keyPlayers.map(p => ({
        ...p,
        name: translateVal(p.name),
        club: translateVal(p.club)
      })) : team.keyPlayers,
      recentForm: team.recentForm ? team.recentForm.map(match => ({
        ...match,
        opponent: translateVal(match.opponent),
        type: translateVal(match.type)
      })) : team.recentForm,
      strengths: team.strengths ? team.strengths.map(s => translateVal(s)) : team.strengths,
      weaknesses: team.weaknesses ? team.weaknesses.map(w => translateVal(w)) : team.weaknesses,
      injuries: team.injuries ? team.injuries.map(inj => ({
        ...inj,
        playerName: translateVal(inj.playerName),
        injury: translateVal(inj.injury),
        status: translateVal(inj.status)
      })) : team.injuries
    };
  });

  const updatedLogs = seedSystemLogs.map(log => ({
    ...log,
    source: translateVal(log.source),
    message: translateVal(log.message)
  }));

  const filePath = path.join(process.cwd(), "src", "data.ts");
  const outputContent = `import { FootballTeam, SystemLog } from "./types";

export const initialTeams: FootballTeam[] = ${JSON.stringify(updatedTeams, null, 2)};

export const seedSystemLogs: SystemLog[] = ${JSON.stringify(updatedLogs, null, 2)};
`;

  fs.writeFileSync(filePath, outputContent, "utf8");
  console.log("SUCCESS: Re-generated src/data.ts entirely in professional Chinese!");
}

main().catch(err => {
  console.error("Execution error:", err);
});
