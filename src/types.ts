export interface KeyPlayer {
  name: string;
  club: string;
  rating: number; // 0 to 100
  role: 'GK' | 'DEF' | 'MID' | 'FWD';
  status: 'Healthy' | 'Injured' | 'Suspended' | 'Doubtful';
}

export interface MatchResult {
  opponent: string;
  score: string;
  xg: string; // e.g. "2.1 - 0.8"
  date: string;
  type: string; // e.g. "Qualifier", "Friendly"
  outcome: 'W' | 'D' | 'L';
}

export interface TeamTactics {
  possession: number; // 0-100
  pressing: number; // 0-100
  counterAttack: number; // 0-100
  defenseLine: number; // 0-100 (high = aggressive line, low = low block)
  physicality: number; // 0-100
  setPiece: number; // 0-100
  preferredFormation: string; // e.g. "4-3-3"
}

export interface TeamRatings {
  attack: number;
  midfield: number;
  defense: number;
  benchDepth: number;
  experience: number;
}

export interface InjuryStory {
  playerName: string;
  role: string;
  injury: string;
  severity: 'High' | 'Medium' | 'Low';
  impactPercent: number; // reduction in team defense/attack score
  status: string;
}

export interface FootballTeam {
  id: string;
  name: string;
  code: string;
  confederation: 'UEFA' | 'CONMEBOL' | 'CONCACAF' | 'CAF' | 'AFC' | 'OFC';
  group: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L';
  elo: number;
  coach: {
    name: string;
    style: string;
    experienceYears: number;
  };
  ratings: TeamRatings;
  tactics: TeamTactics;
  keyPlayers: KeyPlayer[];
  recentForm: MatchResult[];
  strengths: string[];
  weaknesses: string[];
  injuries: InjuryStory[];
}

export interface TournamentProbabilities {
  teamId: string;
  groupStageExit: number;
  roundOf32: number;
  roundOf16: number;
  quarterFinal: number;
  semiFinal: number;
  finalist: number;
  champion: number;
  explanation: string;
}

export interface GameSimulationOutput {
  homeTeamScore: number;
  awayTeamScore: number;
  homeXg: number;
  awayXg: number;
  winnerId: string | 'Draw';
  events: string[];
  possession: number; // home possession
  shots: { home: number; away: number };
}

export interface SystemLog {
  id: string;
  timestamp: string;
  source: string; // e.g. "FIFA API", "Opta Scraper", "Transfermarkt Feed"
  type: 'crawler' | 'analysis' | 'injury' | 'system';
  message: string;
  confidenceScore: number; // 0-100
  status: 'Cleaned' | 'Conflict Resolved' | 'Synced';
}

export interface TacticalBoardState {
  players: {
    id: string;
    name: string;
    number: number;
    role: string;
    x: number; // percentage width 0-100
    y: number; // percentage height 0-100
    color: string;
  }[];
  ball: { x: number; y: number };
  lines: { id: string; points: { x: number; y: number }[]; color: string; type: 'arrow' | 'dotted' | 'solid' }[];
}
