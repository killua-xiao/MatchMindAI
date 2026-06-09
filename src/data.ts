import { FootballTeam, SystemLog } from "./types";

export const initialTeams: FootballTeam[] = [
  {
    "id": "usa",
    "name": "美国",
    "code": "USA",
    "confederation": "CONCACAF",
    "group": "A",
    "elo": 1840,
    "coach": {
      "name": "毛里西奥·波切蒂诺",
      "style": "高位逼抢，纵向垂直攻防推进",
      "experienceYears": 18
    },
    "ratings": {
      "attack": 81,
      "midfield": 80,
      "defense": 79,
      "benchDepth": 77,
      "experience": 75
    },
    "tactics": {
      "possession": 55,
      "pressing": 82,
      "counterAttack": 78,
      "defenseLine": 68,
      "physicality": 79,
      "setPiece": 74,
      "preferredFormation": "4-3-3"
    },
    "keyPlayers": [
      {
        "name": "克里斯蒂安·普利西奇",
        "club": "AC米兰",
        "rating": 86,
        "role": "FWD",
        "status": "Healthy"
      },
      {
        "name": "威斯顿·麦肯尼",
        "club": "尤文图斯",
        "rating": 81,
        "role": "MID",
        "status": "Healthy"
      },
      {
        "name": "安东尼·罗宾逊",
        "club": "富勒姆",
        "rating": 82,
        "role": "DEF",
        "status": "Healthy"
      },
      {
        "name": "马特·特纳",
        "club": "水晶宫",
        "rating": 78,
        "role": "GK",
        "status": "Healthy"
      },
      {
        "name": "蒂莫西·维阿",
        "club": "尤文图斯",
        "rating": 79,
        "role": "FWD",
        "status": "Healthy"
      },
      {
        "name": "尤纳斯·穆萨",
        "club": "AC米兰",
        "rating": 79,
        "role": "MID",
        "status": "Healthy"
      },
      {
        "name": "克里斯·里查兹",
        "club": "水晶宫",
        "rating": 77,
        "role": "DEF",
        "status": "Healthy"
      },
      {
        "name": "乔瓦尼·雷纳",
        "club": "多特蒙德",
        "rating": 80,
        "role": "MID",
        "status": "Healthy"
      }
    ],
    "recentForm": [
      {
        "opponent": "墨西哥",
        "score": "2 - 0",
        "xg": "1.8 - 0.9",
        "date": "2026-03-24",
        "type": "Friendly",
        "outcome": "W"
      },
      {
        "opponent": "哥伦比亚",
        "score": "1 - 1",
        "xg": "1.2 - 1.4",
        "date": "2026-04-12",
        "type": "Friendly",
        "outcome": "D"
      }
    ],
    "strengths": [
      "流畅的守转攻过渡反击",
      "普利西奇高超的边路 1v1 创造与突破能力",
      "边后卫插上起速极快"
    ],
    "weaknesses": [
      "在中锋位置（五号位/九号位）长期缺乏稳定的关键得分手",
      "高分贝高空横传球防守中容易暴露出盯人空白"
    ],
    "injuries": [
      {
        "playerName": "泰勒·亚当斯",
        "role": "MID",
        "injury": "Hamstring strain",
        "severity": "Medium",
        "impactPercent": 8,
        "status": "Doubtful for matchday 1"
      }
    ]
  },
  {
    "id": "mexico",
    "name": "墨西哥",
    "code": "MEX",
    "confederation": "CONCACAF",
    "group": "A",
    "elo": 1810,
    "coach": {
      "name": "哈维尔·阿吉雷",
      "style": "务实低位防线，直接发起长传反击",
      "experienceYears": 25
    },
    "ratings": {
      "attack": 79,
      "midfield": 78,
      "defense": 77,
      "benchDepth": 75,
      "experience": 82
    },
    "tactics": {
      "possession": 48,
      "pressing": 65,
      "counterAttack": 85,
      "defenseLine": 50,
      "physicality": 76,
      "setPiece": 78,
      "preferredFormation": "4-2-3-1"
    },
    "keyPlayers": [
      {
        "name": "圣地亚哥·希门尼斯",
        "club": "费耶诺德",
        "rating": 83,
        "role": "FWD",
        "status": "Healthy"
      },
      {
        "name": "埃德森·阿尔瓦雷斯",
        "club": "西汉姆联",
        "rating": 84,
        "role": "MID",
        "status": "Healthy"
      },
      {
        "name": "塞萨尔·蒙特斯",
        "club": "阿尔梅里亚",
        "rating": 78,
        "role": "DEF",
        "status": "Healthy"
      },
      {
        "name": "吉列尔莫·奥乔亚",
        "club": "AVS",
        "rating": 79,
        "role": "GK",
        "status": "Healthy"
      },
      {
        "name": "路易斯·查韦斯",
        "club": "莫斯科迪纳摩",
        "rating": 80,
        "role": "MID",
        "status": "Healthy"
      },
      {
        "name": "约翰·巴斯克斯",
        "club": "热那亚",
        "rating": 78,
        "role": "DEF",
        "status": "Healthy"
      },
      {
        "name": "奥尔贝林·皮内达",
        "club": "雅典AEK",
        "rating": 77,
        "role": "MID",
        "status": "Healthy"
      },
      {
        "name": "亨利·马丁",
        "club": "美洲队",
        "rating": 78,
        "role": "FWD",
        "status": "Healthy"
      }
    ],
    "recentForm": [
      {
        "opponent": "美国",
        "score": "0 - 2",
        "xg": "0.9 - 1.8",
        "date": "2026-03-24",
        "type": "Friendly",
        "outcome": "L"
      },
      {
        "opponent": "洪都拉斯",
        "score": "3 - 1",
        "xg": "2.4 - 0.8",
        "date": "2026-05-02",
        "type": "Qualifier",
        "outcome": "W"
      }
    ],
    "strengths": [
      "埃德森·阿尔瓦雷斯在中后场防线前的强悍屏障保护",
      "狂热的主场/美洲拥趸到场观战的巨大声势支持",
      "禁区内的强悍头球和防空优势"
    ],
    "weaknesses": [
      "中后卫转身和横向移动速度慢，易被速度型前锋撕裂",
      "处于防守深区时建构进攻体系效率低迷"
    ],
    "injuries": []
  },
  {
    "id": "canada",
    "name": "加拿大",
    "code": "CAN",
    "confederation": "CONCACAF",
    "group": "A",
    "elo": 1780,
    "coach": {
      "name": "杰西·马希",
      "style": "红牛式极限疯狂高位逼抢，垂直闪击爆发",
      "experienceYears": 14
    },
    "ratings": {
      "attack": 82,
      "midfield": 75,
      "defense": 74,
      "benchDepth": 72,
      "experience": 73
    },
    "tactics": {
      "possession": 45,
      "pressing": 92,
      "counterAttack": 89,
      "defenseLine": 75,
      "physicality": 82,
      "setPiece": 70,
      "preferredFormation": "4-2-2-2"
    },
    "keyPlayers": [
      {
        "name": "阿方索·戴维斯",
        "club": "拜仁慕尼黑",
        "rating": 88,
        "role": "DEF",
        "status": "Healthy"
      },
      {
        "name": "乔纳森·戴维",
        "club": "里尔",
        "rating": 84,
        "role": "FWD",
        "status": "Healthy"
      },
      {
        "name": "斯蒂芬·欧斯塔基奥",
        "club": "波尔图",
        "rating": 80,
        "role": "MID",
        "status": "Healthy"
      },
      {
        "name": "马克西姆·克雷波",
        "club": "波特兰伐木者",
        "rating": 75,
        "role": "GK",
        "status": "Healthy"
      },
      {
        "name": "泰琼·布坎南",
        "club": "国际米兰",
        "rating": 79,
        "role": "MID",
        "status": "Healthy"
      },
      {
        "name": "阿利斯特·约翰斯顿",
        "club": "凯尔特人",
        "rating": 78,
        "role": "DEF",
        "status": "Healthy"
      },
      {
        "name": "塞勒·拉林",
        "club": "马略卡",
        "rating": 77,
        "role": "FWD",
        "status": "Healthy"
      },
      {
        "name": "伊斯梅尔·科内",
        "club": "马赛",
        "rating": 76,
        "role": "MID",
        "status": "Healthy"
      }
    ],
    "recentForm": [
      {
        "opponent": "牙买加",
        "score": "2 - 1",
        "xg": "1.9 - 1.1",
        "date": "2026-03-20",
        "type": "Qualifier",
        "outcome": "W"
      },
      {
        "opponent": "荷兰",
        "score": "1 - 3",
        "xg": "1.1 - 2.8",
        "date": "2026-05-15",
        "type": "Friendly",
        "outcome": "L"
      }
    ],
    "strengths": [
      "阿方索·戴维斯带来的世界级速度",
      "莱奥波德与戴维之间炉火纯青的传跑默契",
      "强悍且意志坚决的高频压迫逼抢网块"
    ],
    "weaknesses": [
      "中场厚度单薄，替补深度严重不足",
      "高防线极其害怕被对方起大球或直接斜长传撕裂身后身侧"
    ],
    "injuries": []
  },
  {
    "id": "new_zealand",
    "name": "新西兰",
    "code": "NZL",
    "confederation": "OFC",
    "group": "A",
    "elo": 1550,
    "coach": {
      "name": "达伦·巴泽利",
      "style": "极深低位防线，利用大名单制支点中锋起高球",
      "experienceYears": 8
    },
    "ratings": {
      "attack": 70,
      "midfield": 68,
      "defense": 69,
      "benchDepth": 65,
      "experience": 68
    },
    "tactics": {
      "possession": 38,
      "pressing": 45,
      "counterAttack": 70,
      "defenseLine": 35,
      "physicality": 85,
      "setPiece": 82,
      "preferredFormation": "5-3-2"
    },
    "keyPlayers": [
      {
        "name": "克里斯·伍德",
        "club": "诺丁汉森林",
        "rating": 81,
        "role": "FWD",
        "status": "Healthy"
      },
      {
        "name": "利贝拉托·卡卡切",
        "club": "恩波利",
        "rating": 75,
        "role": "DEF",
        "status": "Healthy"
      },
      {
        "name": "萨普里特·辛格",
        "club": "罗斯托克",
        "rating": 72,
        "role": "MID",
        "status": "Healthy"
      },
      {
        "name": "奥利弗·赛尔",
        "club": "珀斯光荣",
        "rating": 68,
        "role": "GK",
        "status": "Healthy"
      },
      {
        "name": "迈克尔·博克索尔",
        "club": "明尼苏达联",
        "rating": 70,
        "role": "DEF",
        "status": "Healthy"
      },
      {
        "name": "马修·加伯特",
        "club": "布雷达",
        "rating": 71,
        "role": "MID",
        "status": "Healthy"
      },
      {
        "name": "本·万恩",
        "club": "普利茅斯",
        "rating": 69,
        "role": "FWD",
        "status": "Healthy"
      },
      {
        "name": "乔记·贝尔",
        "club": "维京",
        "rating": 70,
        "role": "MID",
        "status": "Healthy"
      }
    ],
    "recentForm": [
      {
        "opponent": "斐济",
        "score": "4 - 0",
        "xg": "3.2 - 0.2",
        "date": "2026-03-12",
        "type": "Qualifier",
        "outcome": "W"
      },
      {
        "opponent": "澳大利亚",
        "score": "0 - 1",
        "xg": "0.5 - 1.4",
        "date": "2026-04-29",
        "type": "Friendly",
        "outcome": "L"
      }
    ],
    "strengths": [
      "在对方禁区内有极其恐怖的物理身体对抗能力",
      "克里斯·伍德的支点做球能力",
      "极强且紧致的低位铁桶阵防守组织"
    ],
    "weaknesses": [
      "中前场严重缺乏顶尖的技术型组织派、极佳创造力传球手",
      "难以应对中路高频带球突破和内切撕扯的技术流选手"
    ],
    "injuries": []
  },
  {
    "id": "argentina",
    "name": "阿根廷",
    "code": "ARG",
    "confederation": "CONMEBOL",
    "group": "B",
    "elo": 2150,
    "coach": {
      "name": "利昂内尔·斯卡洛尼",
      "style": "混合控制，中路控球及流体流转",
      "experienceYears": 8
    },
    "ratings": {
      "attack": 91,
      "midfield": 93,
      "defense": 90,
      "benchDepth": 88,
      "experience": 96
    },
    "tactics": {
      "possession": 64,
      "pressing": 75,
      "counterAttack": 80,
      "defenseLine": 58,
      "physicality": 78,
      "setPiece": 80,
      "preferredFormation": "4-3-3"
    },
    "keyPlayers": [
      {
        "name": "利昂内尔·梅西",
        "club": "迈阿密国际",
        "rating": 92,
        "role": "FWD",
        "status": "Healthy"
      },
      {
        "name": "亚历克西斯·麦卡利斯特",
        "club": "利物浦",
        "rating": 89,
        "role": "MID",
        "status": "Healthy"
      },
      {
        "name": "克里斯蒂安·罗梅罗",
        "club": "热刺",
        "rating": 90,
        "role": "DEF",
        "status": "Healthy"
      },
      {
        "name": "埃米利亚诺·马丁内斯",
        "club": "阿斯顿维拉",
        "rating": 90,
        "role": "GK",
        "status": "Healthy"
      },
      {
        "name": "恩佐·费尔南德斯",
        "club": "切尔西",
        "rating": 87,
        "role": "MID",
        "status": "Healthy"
      },
      {
        "name": "胡利安·阿尔瓦雷斯",
        "club": "马德里竞技",
        "rating": 88,
        "role": "FWD",
        "status": "Healthy"
      },
      {
        "name": "劳塔罗·马丁内斯",
        "club": "国际米兰",
        "rating": 89,
        "role": "FWD",
        "status": "Healthy"
      },
      {
        "name": "尼古拉斯·奥塔门迪",
        "club": "本菲卡",
        "rating": 83,
        "role": "DEF",
        "status": "Healthy"
      }
    ],
    "recentForm": [
      {
        "opponent": "巴西",
        "score": "1 - 0",
        "xg": "1.4 - 1.1",
        "date": "2026-03-26",
        "type": "Qualifier",
        "outcome": "W"
      },
      {
        "opponent": "智利",
        "score": "3 - 0",
        "xg": "2.6 - 0.4",
        "date": "2026-05-18",
        "type": "Qualifier",
        "outcome": "W"
      }
    ],
    "strengths": [
      "大禁区前沿致命的撞墙配合",
      "战术层面的顶级冷静",
      "中场不遗余力的球权回收"
    ],
    "weaknesses": [
      "后防线球员的年龄管理",
      "极度依赖梅西组织进攻发起的倾向"
    ],
    "injuries": []
  },
  {
    "id": "sweden",
    "name": "瑞典",
    "code": "SWE",
    "confederation": "UEFA",
    "group": "B",
    "elo": 1870,
    "coach": {
      "name": "容·达尔·托马森",
      "style": "两翼高侵略性起速，极高步频的垂直闪击",
      "experienceYears": 10
    },
    "ratings": {
      "attack": 85,
      "midfield": 78,
      "defense": 77,
      "benchDepth": 74,
      "experience": 79
    },
    "tactics": {
      "possession": 52,
      "pressing": 70,
      "counterAttack": 84,
      "defenseLine": 60,
      "physicality": 80,
      "setPiece": 76,
      "preferredFormation": "4-2-3-1"
    },
    "keyPlayers": [
      {
        "name": "维克托·约克雷斯",
        "club": "里斯本竞技",
        "rating": 89,
        "role": "FWD",
        "status": "Healthy"
      },
      {
        "name": "亚历山大·伊萨克",
        "club": "纽卡斯尔联 United",
        "rating": 87,
        "role": "FWD",
        "status": "Healthy"
      },
      {
        "name": "德扬·库卢塞夫斯基",
        "club": "热刺",
        "rating": 84,
        "role": "MID",
        "status": "Healthy"
      },
      {
        "name": "罗宾·奥尔森",
        "club": "阿斯顿维拉",
        "rating": 76,
        "role": "GK",
        "status": "Healthy"
      },
      {
        "name": "维克托·林德洛夫",
        "club": "曼联",
        "rating": 79,
        "role": "DEF",
        "status": "Healthy"
      },
      {
        "name": "卡尔·斯塔费尔特",
        "club": "塞尔塔",
        "rating": 75,
        "role": "DEF",
        "status": "Healthy"
      },
      {
        "name": "埃米尔·福斯贝里",
        "club": "纽约红牛",
        "rating": 78,
        "role": "MID",
        "status": "Healthy"
      },
      {
        "name": "安东尼·伊兰加",
        "club": "诺丁汉森林",
        "rating": 77,
        "role": "FWD",
        "status": "Healthy"
      }
    ],
    "recentForm": [
      {
        "opponent": "丹麦",
        "score": "2 - 2",
        "xg": "1.8 - 1.7",
        "date": "2026-03-22",
        "type": "Friendly",
        "outcome": "D"
      },
      {
        "opponent": "爱沙尼亚",
        "score": "4 - 1",
        "xg": "3.1 - 0.5",
        "date": "2026-05-10",
        "type": "Qualifier",
        "outcome": "W"
      }
    ],
    "strengths": [
      "极具杀伤力的约克雷斯-伊萨克锋线组合",
      "库卢塞夫斯基的内切创造力",
      "身体强壮的中后卫"
    ],
    "weaknesses": [
      "缺乏真正的中场节拍器",
      "左路防守空档"
    ],
    "injuries": []
  },
  {
    "id": "iran",
    "name": "伊朗",
    "code": "IRN",
    "confederation": "AFC",
    "group": "B",
    "elo": 1770,
    "coach": {
      "name": "阿米尔·加莱诺伊",
      "style": "纪律极其严明的低位蹲坑，大范围起大球长传连线锋线",
      "experienceYears": 20
    },
    "ratings": {
      "attack": 76,
      "midfield": 72,
      "defense": 75,
      "benchDepth": 70,
      "experience": 80
    },
    "tactics": {
      "possession": 40,
      "pressing": 55,
      "counterAttack": 83,
      "defenseLine": 40,
      "physicality": 81,
      "setPiece": 78,
      "preferredFormation": "4-4-2"
    },
    "keyPlayers": [
      {
        "name": "梅赫迪·塔雷米",
        "club": "Inter Milan",
        "rating": 83,
        "role": "FWD",
        "status": "Healthy"
      },
      {
        "name": "萨达尔·阿兹蒙",
        "club": "迪拜青年国民",
        "rating": 81,
        "role": "FWD",
        "status": "Healthy"
      },
      {
        "name": "阿里雷扎·贾汉巴赫什",
        "club": "海伦芬",
        "rating": 76,
        "role": "MID",
        "status": "Healthy"
      },
      {
        "name": "阿里雷扎·贝兰万德",
        "club": "大不里士拖拉机",
        "rating": 75,
        "role": "GK",
        "status": "Healthy"
      },
      {
        "name": "绍贾·哈里扎德",
        "club": "大不里士拖拉机",
        "rating": 72,
        "role": "DEF",
        "status": "Healthy"
      },
      {
        "name": "萨曼·格多斯",
        "club": "卡尔巴联合",
        "rating": 74,
        "role": "MID",
        "status": "Healthy"
      },
      {
        "name": "米拉德·穆罕默迪",
        "club": "波斯波利斯",
        "rating": 71,
        "role": "DEF",
        "status": "Healthy"
      },
      {
        "name": "梅赫迪·加耶迪",
        "club": "卡尔巴联合",
        "rating": 73,
        "role": "FWD",
        "status": "Healthy"
      }
    ],
    "recentForm": [
      {
        "opponent": "乌兹别克斯坦",
        "score": "1 - 0",
        "xg": "1.1 - 0.7",
        "date": "2026-03-19",
        "type": "Qualifier",
        "outcome": "W"
      },
      {
        "opponent": "日本",
        "score": "1 - 2",
        "xg": "1.3 - 2.1",
        "date": "2026-05-22",
        "type": "Qualifier",
        "outcome": "L"
      }
    ],
    "strengths": [
      "致命的前锋搭档（塔雷米-阿兹蒙）",
      "强大的精神属性与韧性",
      "侵略性极强的防守滑铲补位"
    ],
    "weaknesses": [
      "边后卫回追冲刺速度较慢",
      "面对顶级高压逼抢时控球能力不足"
    ],
    "injuries": []
  },
  {
    "id": "south_africa",
    "name": "南非",
    "code": "RSA",
    "confederation": "CAF",
    "group": "B",
    "elo": 1690,
    "coach": {
      "name": "雨果·布鲁斯",
      "style": "细腻流畅的传球攻防转换，极为团结一心的防守协协",
      "experienceYears": 22
    },
    "ratings": {
      "attack": 72,
      "midfield": 71,
      "defense": 70,
      "benchDepth": 68,
      "experience": 72
    },
    "tactics": {
      "possession": 46,
      "pressing": 62,
      "counterAttack": 78,
      "defenseLine": 48,
      "physicality": 72,
      "setPiece": 67,
      "preferredFormation": "4-3-3"
    },
    "keyPlayers": [
      {
        "name": "珀西·陶",
        "club": "Al Ahly",
        "rating": 78,
        "role": "FWD",
        "status": "Healthy"
      },
      {
        "name": "特博霍·莫科埃纳",
        "club": "马姆罗迪日落黄昏",
        "rating": 79,
        "role": "MID",
        "status": "Healthy"
      },
      {
        "name": "罗恩温·威廉姆斯",
        "club": "马姆罗迪日落黄昏",
        "rating": 78,
        "role": "GK",
        "status": "Healthy"
      },
      {
        "name": "科多·马赫瓦拉",
        "club": "马姆罗迪晚霞",
        "rating": 72,
        "role": "DEF",
        "status": "Healthy"
      },
      {
        "name": "塔邦·莫纳雷",
        "club": "奥兰多海盗",
        "rating": 69,
        "role": "MID",
        "status": "Healthy"
      },
      {
        "name": "格兰特·克卡纳",
        "club": "马姆罗迪晚霞",
        "rating": 70,
        "role": "DEF",
        "status": "Healthy"
      },
      {
        "name": "奥布里·莫迪巴",
        "club": "马姆罗迪晚霞",
        "rating": 71,
        "role": "DEF",
        "status": "Healthy"
      },
      {
        "name": "拉尔斯·维尔德维克",
        "club": "水原FC",
        "rating": 68,
        "role": "FWD",
        "status": "Healthy"
      }
    ],
    "recentForm": [
      {
        "opponent": "尼日利亚",
        "score": "1 - 1",
        "xg": "1.0 - 1.2",
        "date": "2026-03-18",
        "type": "Qualifier",
        "outcome": "D"
      },
      {
        "opponent": "津巴布韦",
        "score": "2 - 1",
        "xg": "1.5 - 0.9",
        "date": "2026-05-15",
        "type": "Qualifier",
        "outcome": "W"
      }
    ],
    "strengths": [
      "凝聚力极高的战术核心（多为本土默契）",
      "罗恩温·威廉姆斯的门线扑救反应",
      "边路极具灵性的盘带"
    ],
    "weaknesses": [
      "缺乏高水平欧洲联赛经验",
      "面对高压迫且身体强壮的球队时易出现防守失误"
    ],
    "injuries": []
  },
  {
    "id": "france",
    "name": "法国",
    "code": "FRA",
    "confederation": "UEFA",
    "group": "C",
    "elo": 2110,
    "coach": {
      "name": "迪迪埃·德尚",
      "style": "顶级稳固紧凑站位，致命的两翼高速防守反击",
      "experienceYears": 16
    },
    "ratings": {
      "attack": 94,
      "midfield": 91,
      "defense": 93,
      "benchDepth": 95,
      "experience": 94
    },
    "tactics": {
      "possession": 56,
      "pressing": 68,
      "counterAttack": 95,
      "defenseLine": 55,
      "physicality": 88,
      "setPiece": 84,
      "preferredFormation": "4-2-3-1"
    },
    "keyPlayers": [
      {
        "name": "基利安·姆巴佩",
        "club": "皇家马德里",
        "rating": 94,
        "role": "FWD",
        "status": "Healthy"
      },
      {
        "name": "安东尼·格里兹曼",
        "club": "马德里竞技",
        "rating": 88,
        "role": "MID",
        "status": "Healthy"
      },
      {
        "name": "威廉·萨利巴",
        "club": "阿森纳",
        "rating": 91,
        "role": "DEF",
        "status": "Healthy"
      },
      {
        "name": "迈克·迈尼昂",
        "club": "AC米兰",
        "rating": 89,
        "role": "GK",
        "status": "Healthy"
      },
      {
        "name": "奥雷利安·楚阿梅尼",
        "club": "皇家马德里",
        "rating": 88,
        "role": "MID",
        "status": "Healthy"
      },
      {
        "name": "乌斯曼·登贝莱",
        "club": "巴黎圣日耳曼",
        "rating": 86,
        "role": "FWD",
        "status": "Healthy"
      },
      {
        "name": "西奥·埃尔南德斯",
        "club": "AC米兰",
        "rating": 87,
        "role": "DEF",
        "status": "Healthy"
      },
      {
        "name": "埃杜阿尔多·卡马文加",
        "club": "皇家马德里",
        "rating": 88,
        "role": "MID",
        "status": "Healthy"
      }
    ],
    "recentForm": [
      {
        "opponent": "德国",
        "score": "0 - 2",
        "xg": "1.2 - 1.8",
        "date": "2026-03-24",
        "type": "Friendly",
        "outcome": "L"
      },
      {
        "opponent": "奥地利",
        "score": "2 - 1",
        "xg": "2.3 - 0.9",
        "date": "2026-05-20",
        "type": "Qualifier",
        "outcome": "W"
      }
    ],
    "strengths": [
      "姆巴佩举世无双的速度和致命的终结能力",
      "极其雄厚的顶级板凳深度",
      "萨利巴-于帕梅卡诺的防守屏障"
    ],
    "weaknesses": [
      "阵地战控球时偶尔缺乏创造性的向前推进",
      "中场防守屏障前插过深"
    ],
    "injuries": [
      {
        "playerName": "奥雷利安·楚阿梅尼",
        "role": "MID",
        "injury": "Metatarsal discomfort",
        "severity": "High",
        "impactPercent": 5,
        "status": "Doubtful for early group stage"
      }
    ]
  },
  {
    "id": "serbia",
    "name": "塞尔维亚",
    "code": "SRB",
    "confederation": "UEFA",
    "group": "C",
    "elo": 1820,
    "coach": {
      "name": "德拉甘·斯托伊科维奇",
      "style": "直接边路起球轰炸，硬朗锋线碾压",
      "experienceYears": 12
    },
    "ratings": {
      "attack": 83,
      "midfield": 77,
      "defense": 75,
      "benchDepth": 74,
      "experience": 80
    },
    "tactics": {
      "possession": 49,
      "pressing": 60,
      "counterAttack": 72,
      "defenseLine": 45,
      "physicality": 89,
      "setPiece": 85,
      "preferredFormation": "3-4-1-2"
    },
    "keyPlayers": [
      {
        "name": "杜尚·弗拉霍维奇",
        "club": "尤文图斯",
        "rating": 86,
        "role": "FWD",
        "status": "Healthy"
      },
      {
        "name": "亚历山大·米特罗维奇",
        "club": "利雅得新月",
        "rating": 85,
        "role": "FWD",
        "status": "Healthy"
      },
      {
        "name": "谢尔盖·米林科维奇-萨维奇",
        "club": "利雅得新月",
        "rating": 83,
        "role": "MID",
        "status": "Healthy"
      },
      {
        "name": "万亚·米林科维奇-萨维奇",
        "club": "都灵",
        "rating": 79,
        "role": "GK",
        "status": "Healthy"
      },
      {
        "name": "尼古拉·米伦科维奇",
        "club": "诺丁汉森林",
        "rating": 81,
        "role": "DEF",
        "status": "Healthy"
      },
      {
        "name": "斯特拉希尼亚·帕夫洛维奇",
        "club": "AC米兰",
        "rating": 80,
        "role": "DEF",
        "status": "Healthy"
      },
      {
        "name": "菲利普·科斯蒂奇",
        "club": "费内巴切",
        "rating": 78,
        "role": "MID",
        "status": "Healthy"
      },
      {
        "name": "杜尚·塔迪奇",
        "club": "费内巴切",
        "rating": 80,
        "role": "MID",
        "status": "Healthy"
      }
    ],
    "recentForm": [
      {
        "opponent": "俄罗斯",
        "score": "1 - 1",
        "xg": "1.2 - 1.1",
        "date": "2026-03-21",
        "type": "Friendly",
        "outcome": "D"
      },
      {
        "opponent": "瑞典",
        "score": "2 - 1",
        "xg": "1.8 - 1.4",
        "date": "2026-05-14",
        "type": "Friendly",
        "outcome": "W"
      }
    ],
    "strengths": [
      "致命的空中优势（弗拉霍维奇与米特罗维奇）",
      "在进攻三区的身体对抗统治力",
      "精准的边路传中"
    ],
    "weaknesses": [
      "面对对手横向转移时的防守脆弱性",
      "攻防转换中回追冲刺较慢"
    ],
    "injuries": []
  },
  {
    "id": "peru",
    "name": "秘鲁",
    "code": "PER",
    "confederation": "CONMEBOL",
    "group": "C",
    "elo": 1740,
    "coach": {
      "name": "豪尔赫·福萨蒂",
      "style": "防守型 3-5-2 低位阵防",
      "experienceYears": 24
    },
    "ratings": {
      "attack": 73,
      "midfield": 74,
      "defense": 76,
      "benchDepth": 70,
      "experience": 81
    },
    "tactics": {
      "possession": 42,
      "pressing": 58,
      "counterAttack": 80,
      "defenseLine": 38,
      "physicality": 77,
      "setPiece": 73,
      "preferredFormation": "3-5-2"
    },
    "keyPlayers": [
      {
        "name": "詹卢卡·拉帕杜拉",
        "club": "卡利亚里",
        "rating": 78,
        "role": "FWD",
        "status": "Healthy"
      },
      {
        "name": "路易斯·阿德文库拉",
        "club": "博卡青年",
        "rating": 79,
        "role": "DEF",
        "status": "Healthy"
      },
      {
        "name": "雷纳托·塔皮亚",
        "club": "莱加内斯",
        "rating": 80,
        "role": "MID",
        "status": "Healthy"
      },
      {
        "name": "佩德罗·加alese",
        "club": "奥兰多城",
        "rating": 76,
        "role": "GK",
        "status": "Healthy"
      },
      {
        "name": "亚历山大·卡伦斯",
        "club": "雅典AEK",
        "rating": 74,
        "role": "DEF",
        "status": "Healthy"
      },
      {
        "name": "皮耶罗·奎斯佩",
        "club": "美洲狮",
        "rating": 72,
        "role": "MID",
        "status": "Healthy"
      },
      {
        "name": "卡洛斯·赞布拉诺",
        "club": "利马联盟",
        "rating": 73,
        "role": "DEF",
        "status": "Healthy"
      },
      {
        "name": "安迪·波洛",
        "club": "大学队",
        "rating": 71,
        "role": "MID",
        "status": "Healthy"
      }
    ],
    "recentForm": [
      {
        "opponent": "委内瑞拉",
        "score": "1 - 1",
        "xg": "0.8 - 1.1",
        "date": "2026-03-25",
        "type": "Qualifier",
        "outcome": "D"
      },
      {
        "opponent": "巴拉圭",
        "score": "2 - 0",
        "xg": "1.6 - 0.7",
        "date": "2026-05-19",
        "type": "Qualifier",
        "outcome": "W"
      }
    ],
    "strengths": [
      "阿德温库拉在边路的充沛体能与大步幅冲刺",
      "极其坚固的防守双后腰",
      "身体对抗中的顽强斗志"
    ],
    "weaknesses": [
      "严重老龄化的中场组织核心",
      "近期正式比赛中进球率偏低"
    ],
    "injuries": []
  },
  {
    "id": "nigeria",
    "name": "尼日利亚",
    "code": "NGA",
    "confederation": "CAF",
    "group": "C",
    "elo": 1800,
    "coach": {
      "name": "奥古斯丁·埃瓜沃恩",
      "style": "爆发性的翼卫两边缘转化，极高速度的纵深闪击渗透",
      "experienceYears": 15
    },
    "ratings": {
      "attack": 86,
      "midfield": 75,
      "defense": 75,
      "benchDepth": 78,
      "experience": 77
    },
    "tactics": {
      "possession": 45,
      "pressing": 72,
      "counterAttack": 92,
      "defenseLine": 52,
      "physicality": 84,
      "setPiece": 71,
      "preferredFormation": "4-3-3"
    },
    "keyPlayers": [
      {
        "name": "维克托·奥斯梅恩",
        "club": "加拉塔萨雷",
        "rating": 90,
        "role": "FWD",
        "status": "Healthy"
      },
      {
        "name": "阿德莫拉·卢克曼",
        "club": "亚特兰大",
        "rating": 86,
        "role": "FWD",
        "status": "Healthy"
      },
      {
        "name": "亚历克斯·伊沃比",
        "club": "富勒姆",
        "rating": 80,
        "role": "MID",
        "status": "Healthy"
      },
      {
        "name": "斯坦利·恩瓦巴利",
        "club": "奇帕联",
        "rating": 75,
        "role": "GK",
        "status": "Healthy"
      },
      {
        "name": "威廉·特罗斯特-埃康",
        "club": "卡利杰",
        "rating": 78,
        "role": "DEF",
        "status": "Healthy"
      },
      {
        "name": "卡尔文·巴锡",
        "club": "富勒姆",
        "rating": 77,
        "role": "DEF",
        "status": "Healthy"
      },
      {
        "name": "威尔弗雷德·恩迪迪",
        "club": "莱斯特城",
        "rating": 81,
        "role": "MID",
        "status": "Healthy"
      },
      {
        "name": "维克托·博尼法斯",
        "club": "勒沃库森",
        "rating": 84,
        "role": "FWD",
        "status": "Healthy"
      }
    ],
    "recentForm": [
      {
        "opponent": "加纳",
        "score": "1 - 2",
        "xg": "1.4 - 1.5",
        "date": "2026-03-22",
        "type": "Friendly",
        "outcome": "L"
      },
      {
        "opponent": "南非",
        "score": "1 - 1",
        "xg": "1.2 - 1.0",
        "date": "2026-03-18",
        "type": "Qualifier",
        "outcome": "D"
      }
    ],
    "strengths": [
      "在前锋、中前场能传善射配置极高，各线深度极为丰富奢侈 (奥斯梅恩、卢克曼)",
      "攻防转换时惊人的纵向推进速度",
      "身体素质出众的空中支点"
    ],
    "weaknesses": [
      "门将发挥不稳定",
      "攻防转换中替补中场配置失衡"
    ],
    "injuries": []
  },
  {
    "id": "england",
    "name": "英格兰",
    "code": "ENG",
    "confederation": "UEFA",
    "group": "D",
    "elo": 2060,
    "coach": {
      "name": "托马斯·图赫尔",
      "style": "严谨刚劲控球，讲究局部三角及精细空间掌控",
      "experienceYears": 15
    },
    "ratings": {
      "attack": 92,
      "midfield": 93,
      "defense": 89,
      "benchDepth": 93,
      "experience": 88
    },
    "tactics": {
      "possession": 60,
      "pressing": 78,
      "counterAttack": 83,
      "defenseLine": 62,
      "physicality": 80,
      "setPiece": 88,
      "preferredFormation": "4-2-3-1"
    },
    "keyPlayers": [
      {
        "name": "哈里·凯恩",
        "club": "拜仁慕尼黑",
        "rating": 91,
        "role": "FWD",
        "status": "Healthy"
      },
      {
        "name": "裘德·贝林厄姆",
        "club": "皇家马德里",
        "rating": 92,
        "role": "MID",
        "status": "Healthy"
      },
      {
        "name": "布卡约·萨卡",
        "club": "阿森纳",
        "rating": 89,
        "role": "FWD",
        "status": "Healthy"
      },
      {
        "name": "乔丹·皮克福德",
        "club": "埃弗顿",
        "rating": 84,
        "role": "GK",
        "status": "Healthy"
      },
      {
        "name": "约翰·斯通斯",
        "club": "曼城",
        "rating": 87,
        "role": "DEF",
        "status": "Healthy"
      },
      {
        "name": "德克兰·赖斯",
        "club": "阿森纳",
        "rating": 89,
        "role": "MID",
        "status": "Healthy"
      },
      {
        "name": "菲尔·福登",
        "club": "曼城",
        "rating": 90,
        "role": "MID",
        "status": "Healthy"
      },
      {
        "name": "科尔·帕尔默",
        "club": "切尔西",
        "rating": 88,
        "role": "MID",
        "status": "Healthy"
      }
    ],
    "recentForm": [
      {
        "opponent": "巴西",
        "score": "0 - 1",
        "xg": "1.5 - 1.1",
        "date": "2026-03-23",
        "type": "Friendly",
        "outcome": "L"
      },
      {
        "opponent": "比利时",
        "score": "2 - 2",
        "xg": "2.1 - 1.9",
        "date": "2026-03-26",
        "type": "Friendly",
        "outcome": "D"
      }
    ],
    "strengths": [
      "格拉利什/萨卡/贝林厄姆等持球推进点的深度",
      "哈里·凯恩致命的回撤接应",
      "出色的定位球战术配合"
    ],
    "weaknesses": [
      "历史上在点球大战的高压下表现脆弱",
      "左后卫面对快速反击时的防守落位与节奏控制"
    ],
    "injuries": [
      {
        "playerName": "约翰·斯通斯",
        "role": "DEF",
        "injury": "Groin strain",
        "severity": "Medium",
        "impactPercent": 6,
        "status": "Partially recovered, load-managed"
      }
    ]
  },
  {
    "id": "ecuador",
    "name": "厄瓜多尔",
    "code": "ECU",
    "confederation": "CONMEBOL",
    "group": "D",
    "elo": 1850,
    "coach": {
      "name": "塞巴斯蒂安·贝卡切切",
      "style": "极具侵略性的横冲直撞边路折返，窄密的中场绞杀网",
      "experienceYears": 11
    },
    "ratings": {
      "attack": 78,
      "midfield": 82,
      "defense": 83,
      "benchDepth": 75,
      "experience": 79
    },
    "tactics": {
      "possession": 52,
      "pressing": 80,
      "counterAttack": 85,
      "defenseLine": 58,
      "physicality": 86,
      "setPiece": 74,
      "preferredFormation": "4-3-3"
    },
    "keyPlayers": [
      {
        "name": "佩尔维斯·埃斯图皮尼安",
        "club": "布莱顿",
        "rating": 84,
        "role": "DEF",
        "status": "Healthy"
      },
      {
        "name": "皮耶罗·因卡皮耶",
        "club": "勒沃库森",
        "rating": 85,
        "role": "DEF",
        "status": "Healthy"
      },
      {
        "name": "莫伊塞斯·凯塞多",
        "club": "切尔西",
        "rating": 88,
        "role": "MID",
        "status": "Healthy"
      },
      {
        "name": "亚历山大·多明格斯",
        "club": "基多大学",
        "rating": 75,
        "role": "GK",
        "status": "Healthy"
      },
      {
        "name": "菲利克斯·托雷斯",
        "club": "科林蒂安",
        "rating": 77,
        "role": "DEF",
        "status": "Healthy"
      },
      {
        "name": "威廉·帕乔",
        "club": "巴黎圣日耳曼",
        "rating": 81,
        "role": "DEF",
        "status": "Healthy"
      },
      {
        "name": "肯德里·帕埃斯",
        "club": "山谷独立",
        "rating": 78,
        "role": "MID",
        "status": "Healthy"
      },
      {
        "name": "恩纳·瓦伦西亚",
        "club": "国际体育",
        "rating": 76,
        "role": "FWD",
        "status": "Healthy"
      }
    ],
    "recentForm": [
      {
        "opponent": "意大利",
        "score": "0 - 2",
        "xg": "0.8 - 1.4",
        "date": "2026-03-24",
        "type": "Friendly",
        "outcome": "L"
      },
      {
        "opponent": "乌拉圭",
        "score": "2 - 1",
        "xg": "1.8 - 1.5",
        "date": "2026-04-10",
        "type": "Qualifier",
        "outcome": "W"
      }
    ],
    "strengths": [
      "中场令人难以置信的充沛体能（凯塞多）",
      "极其紧凑的防守低位（因卡皮耶）",
      "顶级边翼卫"
    ],
    "weaknesses": [
      "难以攻克对手的低位防守阵型",
      "前锋进球转化率较低"
    ],
    "injuries": []
  },
  {
    "id": "south_korea",
    "name": "韩国",
    "code": "KOR",
    "confederation": "AFC",
    "group": "D",
    "elo": 1820,
    "coach": {
      "name": "洪明甫",
      "style": "极高节奏波幅的垂直闪电突入转换，中场整体宽度大范围摆动",
      "experienceYears": 13
    },
    "ratings": {
      "attack": 84,
      "midfield": 78,
      "defense": 77,
      "benchDepth": 73,
      "experience": 82
    },
    "tactics": {
      "possession": 54,
      "pressing": 72,
      "counterAttack": 88,
      "defenseLine": 60,
      "physicality": 76,
      "setPiece": 75,
      "preferredFormation": "4-2-3-1"
    },
    "keyPlayers": [
      {
        "name": "孙兴慜",
        "club": "热刺",
        "rating": 88,
        "role": "FWD",
        "status": "Healthy"
      },
      {
        "name": "金玟哉",
        "club": "拜仁慕尼黑",
        "rating": 89,
        "role": "DEF",
        "status": "Healthy"
      },
      {
        "name": "李刚仁",
        "club": "巴黎圣日耳曼",
        "rating": 84,
        "role": "MID",
        "status": "Healthy"
      },
      {
        "name": "赵贤祐",
        "club": "蔚山HD",
        "rating": 75,
        "role": "GK",
        "status": "Healthy"
      },
      {
        "name": "薛英佑",
        "club": "贝尔格莱德红星",
        "rating": 72,
        "role": "DEF",
        "status": "Healthy"
      },
      {
        "name": "黄仁范",
        "club": "费耶诺德",
        "rating": 77,
        "role": "MID",
        "status": "Healthy"
      },
      {
        "name": "黄喜灿",
        "club": "伍尔弗汉普顿流浪者",
        "rating": 79,
        "role": "FWD",
        "status": "Healthy"
      },
      {
        "name": "曹圭成",
        "club": "中日德兰",
        "rating": 74,
        "role": "FWD",
        "status": "Healthy"
      }
    ],
    "recentForm": [
      {
        "opponent": "泰国",
        "score": "3 - 0",
        "xg": "2.2 - 0.4",
        "date": "2026-03-26",
        "type": "Qualifier",
        "outcome": "W"
      },
      {
        "opponent": "新加坡",
        "score": "7 - 0",
        "xg": "5.1 - 0.1",
        "date": "2026-05-11",
        "type": "Qualifier",
        "outcome": "W"
      }
    ],
    "strengths": [
      "左路致命的边路进攻（孙兴慜）",
      "李刚仁充满活力的创造力",
      "金玟哉顶级的地面防守回收能力"
    ],
    "weaknesses": [
      "过度依赖三大外籍球星",
      "面对耐心控球、传导流畅的中场三人组时较为被动"
    ],
    "injuries": []
  },
  {
    "id": "cameroon",
    "name": "喀麦隆",
    "code": "CMR",
    "confederation": "CAF",
    "group": "D",
    "elo": 1715,
    "coach": {
      "name": "马克·布赖斯",
      "style": "物理化硬骨骼禁区中空分布，强硬单传和边卫连线出球",
      "experienceYears": 19
    },
    "ratings": {
      "attack": 74,
      "midfield": 73,
      "defense": 74,
      "benchDepth": 69,
      "experience": 79
    },
    "tactics": {
      "possession": 44,
      "pressing": 60,
      "counterAttack": 82,
      "defenseLine": 45,
      "physicality": 88,
      "setPiece": 80,
      "preferredFormation": "4-1-4-1"
    },
    "keyPlayers": [
      {
        "name": "布莱恩·姆贝乌莫",
        "club": "布伦特福德",
        "rating": 82,
        "role": "FWD",
        "status": "Healthy"
      },
      {
        "name": "安德烈-弗兰克·赞博·安古伊萨",
        "club": "Napoli",
        "rating": 81,
        "role": "MID",
        "status": "Healthy"
      },
      {
        "name": "安德烈·奥纳纳",
        "club": "Manchester United",
        "rating": 84,
        "role": "GK",
        "status": "Healthy"
      },
      {
        "name": "让-夏尔·卡斯特莱托",
        "club": "南特",
        "rating": 75,
        "role": "DEF",
        "status": "Healthy"
      },
      {
        "name": "克里斯托弗·伍",
        "club": "雷恩",
        "rating": 74,
        "role": "DEF",
        "status": "Healthy"
      },
      {
        "name": "萨穆埃尔·乌姆·古埃特",
        "club": "伊韦尔东",
        "rating": 71,
        "role": "MID",
        "status": "Healthy"
      },
      {
        "name": "文森特·阿布巴卡尔",
        "club": "哈塔伊体育",
        "rating": 78,
        "role": "FWD",
        "status": "Healthy"
      },
      {
        "name": "卡尔·托科·埃卡姆比",
        "club": "达曼协作",
        "rating": 76,
        "role": "FWD",
        "status": "Healthy"
      }
    ],
    "recentForm": [
      {
        "opponent": "安哥拉",
        "score": "1 - 1",
        "xg": "1.1 - 1.1",
        "date": "2026-03-24",
        "type": "Qualifier",
        "outcome": "D"
      },
      {
        "opponent": "佛得角",
        "score": "4 - 1",
        "xg": "2.8 - 0.7",
        "date": "2026-05-01",
        "type": "Qualifier",
        "outcome": "W"
      }
    ],
    "strengths": [
      "安古伊萨强大的地面覆盖能力",
      "奥纳纳顶级的后场出球与组织调度能力",
      "极具身体对抗的前场支点作用"
    ],
    "weaknesses": [
      "防守端战术性的过度扑抢",
      "俱乐部内部管理层面的分心因素"
    ],
    "injuries": []
  },
  {
    "id": "spain",
    "name": "西班牙",
    "code": "ESP",
    "confederation": "UEFA",
    "group": "E",
    "elo": 2090,
    "coach": {
      "name": "路易斯·德拉富恩特",
      "style": "垂直双两边快攻渗透传球，全场高密度疯反抢阻截",
      "experienceYears": 16
    },
    "ratings": {
      "attack": 91,
      "midfield": 94,
      "defense": 88,
      "benchDepth": 91,
      "experience": 85
    },
    "tactics": {
      "possession": 66,
      "pressing": 88,
      "counterAttack": 82,
      "defenseLine": 72,
      "physicality": 75,
      "setPiece": 76,
      "preferredFormation": "4-3-3"
    },
    "keyPlayers": [
      {
        "name": "拉明·亚马尔",
        "club": "巴塞罗那",
        "rating": 91,
        "role": "FWD",
        "status": "Healthy"
      },
      {
        "name": "罗德里",
        "club": "曼城",
        "rating": 93,
        "role": "MID",
        "status": "Healthy"
      },
      {
        "name": "尼科·威廉姆斯",
        "club": "Athletic Bilbao",
        "rating": 88,
        "role": "FWD",
        "status": "Healthy"
      },
      {
        "name": "乌奈·西蒙",
        "club": "毕尔巴鄂竞技",
        "rating": 87,
        "role": "GK",
        "status": "Healthy"
      },
      {
        "name": "达尼·卡瓦哈尔",
        "club": "皇家马德里",
        "rating": 88,
        "role": "DEF",
        "status": "Healthy"
      },
      {
        "name": "佩德里",
        "club": "巴塞罗那",
        "rating": 89,
        "role": "MID",
        "status": "Healthy"
      },
      {
        "name": "阿尔瓦罗·莫拉塔",
        "club": "AC米兰",
        "rating": 84,
        "role": "FWD",
        "status": "Healthy"
      },
      {
        "name": "艾梅里克·拉波尔特",
        "club": "利雅得胜利",
        "rating": 85,
        "role": "DEF",
        "status": "Healthy"
      }
    ],
    "recentForm": [
      {
        "opponent": "哥伦比亚",
        "score": "0 - 1",
        "xg": "1.1 - 1.3",
        "date": "2026-03-22",
        "type": "Friendly",
        "outcome": "L"
      },
      {
        "opponent": "巴西",
        "score": "3 - 3",
        "xg": "2.6 - 2.4",
        "date": "2026-03-26",
        "type": "Friendly",
        "outcome": "D"
      }
    ],
    "strengths": [
      "拉明·亚马尔与尼科·威廉姆斯极具创造力的双翼",
      "罗德里在中场无懈可击的组织调度",
      "惊人的传球成功率数据"
    ],
    "weaknesses": [
      "边后卫大幅压上后留下的身后空档",
      "面对高强度就地反抢时较为脆弱"
    ],
    "injuries": []
  },
  {
    "id": "colombia",
    "name": "哥伦比亚",
    "code": "COL",
    "confederation": "CONMEBOL",
    "group": "E",
    "elo": 1900,
    "coach": {
      "name": "内斯托尔·洛伦佐",
      "style": "高能攻防转换爆破，顶级大弧线传中核心包抄",
      "experienceYears": 10
    },
    "ratings": {
      "attack": 85,
      "midfield": 84,
      "defense": 82,
      "benchDepth": 80,
      "experience": 84
    },
    "tactics": {
      "possession": 53,
      "pressing": 74,
      "counterAttack": 88,
      "defenseLine": 55,
      "physicality": 83,
      "setPiece": 86,
      "preferredFormation": "4-2-3-1"
    },
    "keyPlayers": [
      {
        "name": "路易斯·迪亚斯",
        "club": "利物浦",
        "rating": 88,
        "role": "FWD",
        "status": "Healthy"
      },
      {
        "name": "哈梅斯·罗德里格斯",
        "club": "圣保罗",
        "rating": 83,
        "role": "MID",
        "status": "Healthy"
      },
      {
        "name": "丹尼尔·穆尼奥斯",
        "club": "水晶宫",
        "rating": 81,
        "role": "DEF",
        "status": "Healthy"
      },
      {
        "name": "卡米洛·巴尔加斯",
        "club": "阿特拉斯",
        "rating": 79,
        "role": "GK",
        "status": "Healthy"
      },
      {
        "name": "达温松·桑切斯",
        "club": "加拉塔萨雷",
        "rating": 80,
        "role": "DEF",
        "status": "Healthy"
      },
      {
        "name": "杰弗森·莱尔马",
        "club": "水晶宫",
        "rating": 81,
        "role": "MID",
        "status": "Healthy"
      },
      {
        "name": "约翰·阿里亚斯",
        "club": "弗鲁米嫩塞",
        "rating": 80,
        "role": "MID",
        "status": "Healthy"
      },
      {
        "name": "约翰·杜兰",
        "club": "阿斯顿维拉",
        "rating": 81,
        "role": "FWD",
        "status": "Healthy"
      }
    ],
    "recentForm": [
      {
        "opponent": "西班牙",
        "score": "1 - 0",
        "xg": "1.3 - 1.1",
        "date": "2026-03-22",
        "type": "Friendly",
        "outcome": "W"
      },
      {
        "opponent": "罗马nia",
        "score": "3 - 2",
        "xg": "2.1 - 1.5",
        "date": "2026-03-26",
        "type": "Friendly",
        "outcome": "W"
      }
    ],
    "strengths": [
      "路易斯·迪亚斯主导的高速动态反击",
      "哈梅斯·罗德里格斯神乎其技的定位球脚法",
      "身体对抗中极佳的势头"
    ],
    "weaknesses": [
      "偶尔收缩过紧的防守阵型",
      "中场极高的黄牌累积率"
    ],
    "injuries": []
  },
  {
    "id": "poland",
    "name": "波兰",
    "code": "POL",
    "confederation": "UEFA",
    "group": "E",
    "elo": 1795,
    "coach": {
      "name": "米哈乌·普罗比日",
      "style": "防守紧凑的窄防线，直接将高空落点做给顶尖物理大前锋",
      "experienceYears": 15
    },
    "ratings": {
      "attack": 81,
      "midfield": 74,
      "defense": 75,
      "benchDepth": 71,
      "experience": 82
    },
    "tactics": {
      "possession": 44,
      "pressing": 55,
      "counterAttack": 78,
      "defenseLine": 42,
      "physicality": 83,
      "setPiece": 81,
      "preferredFormation": "3-5-2"
    },
    "keyPlayers": [
      {
        "name": "罗伯特·莱万多夫斯基",
        "club": "巴塞罗那",
        "rating": 88,
        "role": "FWD",
        "status": "Healthy"
      },
      {
        "name": "皮奥特尔·泽林斯基",
        "club": "Inter Milan",
        "rating": 84,
        "role": "MID",
        "status": "Healthy"
      },
      {
        "name": "沃伊切赫·什琴斯尼",
        "club": "巴塞罗那",
        "rating": 84,
        "role": "GK",
        "status": "Healthy"
      },
      {
        "name": "乌卡什·斯科鲁普斯基",
        "club": "博洛尼亚",
        "rating": 78,
        "role": "GK",
        "status": "Healthy"
      },
      {
        "name": "扬·贝德纳雷克",
        "club": "修咸顿",
        "rating": 76,
        "role": "DEF",
        "status": "Healthy"
      },
      {
        "name": "塞巴斯蒂安·希曼斯基",
        "club": "费内巴切",
        "rating": 80,
        "role": "MID",
        "status": "Healthy"
      },
      {
        "name": "尼古拉·扎莱夫斯基",
        "club": "罗马",
        "rating": 77,
        "role": "MID",
        "status": "Healthy"
      },
      {
        "name": "卡罗尔·希维德尔斯基",
        "club": "夏洛特FC",
        "rating": 75,
        "role": "FWD",
        "status": "Healthy"
      }
    ],
    "recentForm": [
      {
        "opponent": "爱沙尼亚",
        "score": "5 - 1",
        "xg": "3.4 - 0.4",
        "date": "2026-03-21",
        "type": "Qualifier",
        "outcome": "W"
      },
      {
        "opponent": "威尔士",
        "score": "0 - 0",
        "xg": "1.1 - 1.1",
        "date": "2026-03-25",
        "type": "Qualifier",
        "outcome": "D"
      }
    ],
    "strengths": [
      "罗伯特·莱万多夫斯基致命的终结能力",
      "皮奥特尔·杰林斯基在中路手术刀般的穿透传球",
      "什琴斯尼在大赛中的神勇扑救"
    ],
    "weaknesses": [
      "边路阵容深度的局限",
      "防守深区角球（后点）时的漏洞"
    ],
    "injuries": []
  },
  {
    "id": "mali",
    "name": "马里",
    "code": "MLI",
    "confederation": "CAF",
    "group": "E",
    "elo": 1710,
    "coach": {
      "name": "汤姆·圣菲特",
      "style": "紧凑沉稳的中场双后腰，主打身体对抗与球权绞杀阻击",
      "experienceYears": 18
    },
    "ratings": {
      "attack": 72,
      "midfield": 79,
      "defense": 74,
      "benchDepth": 68,
      "experience": 71
    },
    "tactics": {
      "possession": 46,
      "pressing": 68,
      "counterAttack": 80,
      "defenseLine": 46,
      "physicality": 86,
      "setPiece": 72,
      "preferredFormation": "4-2-3-1"
    },
    "keyPlayers": [
      {
        "name": "伊夫·比苏马",
        "club": "热刺",
        "rating": 82,
        "role": "MID",
        "status": "Healthy"
      },
      {
        "name": "阿马杜·海达拉",
        "club": "莱比锡RB",
        "rating": 81,
        "role": "MID",
        "status": "Healthy"
      },
      {
        "name": "哈马里·特拉奥雷",
        "club": "皇家社会",
        "rating": 78,
        "role": "DEF",
        "status": "Healthy"
      },
      {
        "name": "吉吉·迪亚拉",
        "club": "年轻非洲人",
        "rating": 71,
        "role": "GK",
        "status": "Healthy"
      },
      {
        "name": "布巴卡尔·库亚特",
        "club": "蒙彼利埃",
        "rating": 74,
        "role": "DEF",
        "status": "Healthy"
      },
      {
        "name": "迪亚迪·萨马塞库",
        "club": "加迪斯",
        "rating": 73,
        "role": "MID",
        "status": "Healthy"
      },
      {
        "name": "塞古·科伊塔",
        "club": "云达不莱梅",
        "rating": 74,
        "role": "FWD",
        "status": "Healthy"
      },
      {
        "name": "埃尔·比拉尔·图雷",
        "club": "斯图加特",
        "rating": 75,
        "role": "FWD",
        "status": "Healthy"
      }
    ],
    "recentForm": [
      {
        "opponent": "毛里塔尼亚",
        "score": "2 - 0",
        "xg": "1.6 - 0.5",
        "date": "2026-03-22",
        "type": "Friendly",
        "outcome": "W"
      },
      {
        "opponent": "尼日利亚",
        "score": "2 - 0",
        "xg": "1.4 - 0.8",
        "date": "2026-03-26",
        "type": "Friendly",
        "outcome": "W"
      }
    ],
    "strengths": [
      "惊人的中场绞杀力（比苏马与海达拉）",
      "运动能力出众的中后卫防线",
      "极高的体能指数"
    ],
    "weaknesses": [
      "前锋在中路防守压力下极易出现失误",
      "长传球效率偏低"
    ],
    "injuries": []
  },
  {
    "id": "belgium",
    "name": "比利时",
    "code": "BEL",
    "confederation": "UEFA",
    "group": "F",
    "elo": 1880,
    "coach": {
      "name": "多梅尼科·特德斯科",
      "style": "高燃高频边路回冲压迫机制，守转攻极端过载突击",
      "experienceYears": 9
    },
    "ratings": {
      "attack": 86,
      "midfield": 84,
      "defense": 78,
      "benchDepth": 82,
      "experience": 82
    },
    "tactics": {
      "possession": 58,
      "pressing": 76,
      "counterAttack": 90,
      "defenseLine": 62,
      "physicality": 76,
      "setPiece": 74,
      "preferredFormation": "4-3-3"
    },
    "keyPlayers": [
      {
        "name": "凯文·德布劳内",
        "club": "曼城",
        "rating": 91,
        "role": "MID",
        "status": "Healthy"
      },
      {
        "name": "杰里米·多库",
        "club": "曼城",
        "rating": 86,
        "role": "FWD",
        "status": "Healthy"
      },
      {
        "name": "阿马杜·奥纳纳",
        "club": "阿斯顿维拉",
        "rating": 83,
        "role": "MID",
        "status": "Healthy"
      },
      {
        "name": "科恩·卡斯特尔斯",
        "club": "卡迪西亚",
        "rating": 83,
        "role": "GK",
        "status": "Healthy"
      },
      {
        "name": "蒂莫西·卡斯塔涅",
        "club": "富勒姆",
        "rating": 79,
        "role": "DEF",
        "status": "Healthy"
      },
      {
        "name": "沃特·法斯",
        "club": "莱斯特城",
        "rating": 78,
        "role": "DEF",
        "status": "Healthy"
      },
      {
        "name": "尤里·蒂勒曼斯",
        "club": "阿斯顿维拉",
        "rating": 83,
        "role": "MID",
        "status": "Healthy"
      },
      {
        "name": "罗梅卢·卢卡库",
        "club": "那不勒斯",
        "rating": 84,
        "role": "FWD",
        "status": "Healthy"
      }
    ],
    "recentForm": [
      {
        "opponent": "爱尔兰",
        "score": "0 - 0",
        "xg": "0.9 - 0.7",
        "date": "2026-03-23",
        "type": "Friendly",
        "outcome": "D"
      },
      {
        "opponent": "英格兰",
        "score": "2 - 2",
        "xg": "1.9 - 2.1",
        "date": "2026-03-26",
        "type": "Friendly",
        "outcome": "D"
      }
    ],
    "strengths": [
      "凯文·德布劳内无与伦比的机会制造能力",
      "多库世界级的边路1对1单打突破",
      "阿马杜·奥纳纳的空中屏障作用"
    ],
    "weaknesses": [
      "逐渐老化的中后卫核心防线",
      "面对边路快速反击插上时的防守漏洞"
    ],
    "injuries": [
      {
        "playerName": "罗梅卢·卢卡库",
        "role": "FWD",
        "injury": "Knee hyperextension",
        "severity": "Medium",
        "impactPercent": 7,
        "status": "Doubtful for opener, training light"
      }
    ]
  },
  {
    "id": "egypt",
    "name": "埃及",
    "code": "EGY",
    "confederation": "CAF",
    "group": "F",
    "elo": 1785,
    "coach": {
      "name": "霍萨姆·哈桑",
      "style": "严密低位蹲坑防守，一切战术极其倾斜萨拉赫起速直刺",
      "experienceYears": 15
    },
    "ratings": {
      "attack": 84,
      "midfield": 73,
      "defense": 75,
      "benchDepth": 70,
      "experience": 84
    },
    "tactics": {
      "possession": 43,
      "pressing": 50,
      "counterAttack": 93,
      "defenseLine": 38,
      "physicality": 78,
      "setPiece": 75,
      "preferredFormation": "4-3-3"
    },
    "keyPlayers": [
      {
        "name": "穆罕默德·萨拉赫",
        "club": "利物浦",
        "rating": 91,
        "role": "FWD",
        "status": "Healthy"
      },
      {
        "name": "穆斯塔法·穆罕默德",
        "club": "南特",
        "rating": 80,
        "role": "FWD",
        "status": "Healthy"
      },
      {
        "name": "奥马尔·马尔穆什",
        "club": "法兰克福",
        "rating": 85,
        "role": "FWD",
        "status": "Healthy"
      },
      {
        "name": "穆罕默德·埃尔舍纳维",
        "club": "阿赫利",
        "rating": 78,
        "role": "GK",
        "status": "Healthy"
      },
      {
        "name": "穆罕默德·阿卜杜勒莫内姆",
        "club": "尼斯",
        "rating": 78,
        "role": "DEF",
        "status": "Healthy"
      },
      {
        "name": "埃尔内尼",
        "club": "半岛队",
        "rating": 75,
        "role": "MID",
        "status": "Healthy"
      },
      {
        "name": "哈姆迪·法特希",
        "club": "沃克拉",
        "rating": 74,
        "role": "MID",
        "status": "Healthy"
      },
      {
        "name": "特雷泽盖",
        "club": "赖扬",
        "rating": 77,
        "role": "FWD",
        "status": "Healthy"
      }
    ],
    "recentForm": [
      {
        "opponent": "新西兰",
        "score": "1 - 0",
        "xg": "1.3 - 0.6",
        "date": "2026-03-22",
        "type": "Friendly",
        "outcome": "W"
      },
      {
        "opponent": "克罗地亚",
        "score": "2 - 4",
        "xg": "1.5 - 2.9",
        "date": "2026-03-26",
        "type": "Friendly",
        "outcome": "L"
      }
    ],
    "strengths": [
      "穆罕默德·萨拉赫顶级的关键时刻终结能力",
      "奥马尔·马尔穆什在德甲令人惊叹的火热状态",
      "坚韧的大赛/杯赛韧性"
    ],
    "weaknesses": [
      "中场串联过渡过于静态",
      "面对顶级横向大范围转移球时较为脆弱"
    ],
    "injuries": []
  },
  {
    "id": "ukraine",
    "name": "乌克兰",
    "code": "UKR",
    "confederation": "UEFA",
    "group": "F",
    "elo": 1810,
    "coach": {
      "name": "谢尔盖·雷布罗夫",
      "style": "对称式控球层层堆积推进，翼卫高频压上过载插上",
      "experienceYears": 13
    },
    "ratings": {
      "attack": 83,
      "midfield": 81,
      "defense": 79,
      "benchDepth": 78,
      "experience": 76
    },
    "tactics": {
      "possession": 55,
      "pressing": 65,
      "counterAttack": 80,
      "defenseLine": 55,
      "physicality": 77,
      "setPiece": 72,
      "preferredFormation": "4-2-3-1"
    },
    "keyPlayers": [
      {
        "name": "阿尔乔姆·多夫比克",
        "club": "罗马",
        "rating": 85,
        "role": "FWD",
        "status": "Healthy"
      },
      {
        "name": "奥列克桑德·津琴科",
        "club": "阿森纳",
        "rating": 82,
        "role": "MID",
        "status": "Healthy"
      },
      {
        "name": "安德里·卢宁",
        "club": "皇家马德里",
        "rating": 84,
        "role": "GK",
        "status": "Healthy"
      },
      {
        "name": "阿纳托利·特鲁宾",
        "club": "本菲卡",
        "rating": 81,
        "role": "GK",
        "status": "Healthy"
      },
      {
        "name": "伊利亚·扎巴尔尼",
        "club": "伯恩茅斯",
        "rating": 81,
        "role": "DEF",
        "status": "Healthy"
      },
      {
        "name": "格奥尔基·苏达科夫",
        "club": "顿涅茨克矿工",
        "rating": 79,
        "role": "MID",
        "status": "Healthy"
      },
      {
        "name": "米哈伊洛·穆德里克",
        "club": "切尔西",
        "rating": 79,
        "role": "FWD",
        "status": "Healthy"
      },
      {
        "name": "维克托·齐甘科夫",
        "club": "赫罗纳",
        "rating": 82,
        "role": "MID",
        "status": "Healthy"
      }
    ],
    "recentForm": [
      {
        "opponent": "波黑",
        "score": "2 - 1",
        "xg": "1.6 - 1.1",
        "date": "2026-03-21",
        "type": "Qualifier",
        "outcome": "W"
      },
      {
        "opponent": "冰岛",
        "score": "2 - 1",
        "xg": "1.9 - 0.9",
        "date": "2026-03-26",
        "type": "Qualifier",
        "outcome": "W"
      }
    ],
    "strengths": [
      "极具杀伤力的中锋支点作用（多夫比克）",
      "津琴科内收内切组织",
      "门将位置的强劲实力（卢宁）"
    ],
    "weaknesses": [
      "防守盯人时偶尔出现的注意力不集中",
      "难以应对顶级的强力高位逼抢"
    ],
    "injuries": []
  },
  {
    "id": "chile",
    "name": "智利",
    "code": "CHI",
    "confederation": "CONMEBOL",
    "group": "F",
    "elo": 1750,
    "coach": {
      "name": "里卡多·加雷卡",
      "style": "顽向甚至偏向偏执的战术铁律防线，中圈极硬物理人盯人对位绞杀",
      "experienceYears": 22
    },
    "ratings": {
      "attack": 74,
      "midfield": 76,
      "defense": 75,
      "benchDepth": 70,
      "experience": 85
    },
    "tactics": {
      "possession": 48,
      "pressing": 62,
      "counterAttack": 81,
      "defenseLine": 45,
      "physicality": 80,
      "setPiece": 75,
      "preferredFormation": "4-3-3"
    },
    "keyPlayers": [
      {
        "name": "亚历克西斯·桑切斯",
        "club": "乌迪内斯",
        "rating": 79,
        "role": "FWD",
        "status": "Healthy"
      },
      {
        "name": "埃里克·普尔加尔",
        "club": "弗拉门戈",
        "rating": 78,
        "role": "MID",
        "status": "Healthy"
      },
      {
        "name": "吉列尔莫·马里潘",
        "club": "都灵",
        "rating": 78,
        "role": "DEF",
        "status": "Healthy"
      },
      {
        "name": "布拉沃",
        "club": "自由球员",
        "rating": 75,
        "role": "GK",
        "status": "Healthy"
      },
      {
        "name": "保罗·迪亚斯",
        "club": "河床",
        "rating": 76,
        "role": "DEF",
        "status": "Healthy"
      },
      {
        "name": "罗德里戈·埃切维里亚",
        "club": "飓风队",
        "rating": 73,
        "role": "MID",
        "status": "Healthy"
      },
      {
        "name": "维克托·达维拉",
        "club": "莫斯科陆军",
        "rating": 74,
        "role": "FWD",
        "status": "Healthy"
      },
      {
        "name": "达里奥·奥索里奥",
        "club": "中日德兰",
        "rating": 75,
        "role": "MID",
        "status": "Healthy"
      }
    ],
    "recentForm": [
      {
        "opponent": "阿尔巴尼亚",
        "score": "3 - 0",
        "xg": "2.1 - 0.5",
        "date": "2026-03-22",
        "type": "Friendly",
        "outcome": "W"
      },
      {
        "opponent": "法国",
        "score": "2 - 3",
        "xg": "1.4 - 2.2",
        "date": "2026-03-26",
        "type": "Friendly",
        "outcome": "L"
      }
    ],
    "strengths": [
      "经验丰富的大赛老将",
      "低位防守中侵略性极强的放铲",
      "极强的中场战术意识"
    ],
    "weaknesses": [
      "明显老化的前场明星球员",
      "缺乏快速回追型后卫"
    ],
    "injuries": []
  },
  {
    "id": "portugal",
    "name": "葡萄牙",
    "code": "POR",
    "confederation": "UEFA",
    "group": "G",
    "elo": 2000,
    "coach": {
      "name": "罗伯托·马丁内斯",
      "style": "流畅整体控球大范围展宽，诱导边路压过撕裂",
      "experienceYears": 17
    },
    "ratings": {
      "attack": 92,
      "midfield": 91,
      "defense": 89,
      "benchDepth": 94,
      "experience": 91
    },
    "tactics": {
      "possession": 62,
      "pressing": 75,
      "counterAttack": 85,
      "defenseLine": 65,
      "physicality": 78,
      "setPiece": 80,
      "preferredFormation": "4-3-3"
    },
    "keyPlayers": [
      {
        "name": "克里斯蒂亚诺·罗纳尔多",
        "club": "利雅得胜利",
        "rating": 88,
        "role": "FWD",
        "status": "Healthy"
      },
      {
        "name": "布鲁诺·费尔南德斯",
        "club": "Manchester United",
        "rating": 90,
        "role": "MID",
        "status": "Healthy"
      },
      {
        "name": "鲁本·迪亚斯",
        "club": "曼城",
        "rating": 91,
        "role": "DEF",
        "status": "Healthy"
      },
      {
        "name": "迪奥戈·科斯塔",
        "club": "波尔图",
        "rating": 86,
        "role": "GK",
        "status": "Healthy"
      },
      {
        "name": "若昂·坎塞洛",
        "club": "利雅得新月",
        "rating": 85,
        "role": "DEF",
        "status": "Healthy"
      },
      {
        "name": "贝尔纳多·席尔瓦",
        "club": "曼城",
        "rating": 89,
        "role": "MID",
        "status": "Healthy"
      },
      {
        "name": "拉斐尔·莱奥",
        "club": "AC米兰",
        "rating": 88,
        "role": "FWD",
        "status": "Healthy"
      },
      {
        "name": "维蒂尼亚",
        "club": "巴黎圣日耳曼",
        "rating": 86,
        "role": "MID",
        "status": "Healthy"
      }
    ],
    "recentForm": [
      {
        "opponent": "瑞典",
        "score": "5 - 2",
        "xg": "3.5 - 1.4",
        "date": "2026-03-21",
        "type": "Friendly",
        "outcome": "W"
      },
      {
        "opponent": "斯洛文尼亚",
        "score": "0 - 2",
        "xg": "1.1 - 1.2",
        "date": "2026-03-26",
        "type": "Friendly",
        "outcome": "L"
      }
    ],
    "strengths": [
      "布鲁诺·费尔南德斯致命的组织传导能力",
      "迪亚斯作为防线统帅的领导力",
      "进攻套路极其丰富多样"
    ],
    "weaknesses": [
      "C罗在高位逼抢中防守投入度的局限",
      "面对高速反击时防守结构偶尔出现的漏洞"
    ],
    "injuries": []
  },
  {
    "id": "switzerland",
    "name": "瑞士",
    "code": "SUI",
    "confederation": "UEFA",
    "group": "G",
    "elo": 1890,
    "coach": {
      "name": "穆拉特·雅金",
      "style": "刚柔齐备防线稳固如山，高稳定性高效分配运转循环",
      "experienceYears": 13
    },
    "ratings": {
      "attack": 78,
      "midfield": 85,
      "defense": 84,
      "benchDepth": 80,
      "experience": 89
    },
    "tactics": {
      "possession": 51,
      "pressing": 64,
      "counterAttack": 78,
      "defenseLine": 48,
      "physicality": 80,
      "setPiece": 82,
      "preferredFormation": "3-4-2-1"
    },
    "keyPlayers": [
      {
        "name": "格拉尼特·扎卡",
        "club": "勒沃库森",
        "rating": 89,
        "role": "MID",
        "status": "Healthy"
      },
      {
        "name": "马努埃尔·阿坎吉",
        "club": "曼城",
        "rating": 88,
        "role": "DEF",
        "status": "Healthy"
      },
      {
        "name": "扬·索默",
        "club": "Inter Milan",
        "rating": 85,
        "role": "GK",
        "status": "Healthy"
      },
      {
        "name": "格雷戈·科贝尔",
        "club": "多特蒙德",
        "rating": 87,
        "role": "GK",
        "status": "Healthy"
      },
      {
        "name": "希尔万·威德默",
        "club": "美因茨",
        "rating": 76,
        "role": "DEF",
        "status": "Healthy"
      },
      {
        "name": "雷莫·弗罗伊勒",
        "club": "博洛尼亚",
        "rating": 79,
        "role": "MID",
        "status": "Healthy"
      },
      {
        "name": "丹尼斯·扎卡里亚",
        "club": "摩纳哥",
        "rating": 81,
        "role": "MID",
        "status": "Healthy"
      },
      {
        "name": "布雷尔·恩博洛",
        "club": "摩纳哥",
        "rating": 79,
        "role": "FWD",
        "status": "Healthy"
      }
    ],
    "recentForm": [
      {
        "opponent": "丹麦",
        "score": "0 - 0",
        "xg": "0.8 - 0.7",
        "date": "2026-03-23",
        "type": "Friendly",
        "outcome": "D"
      },
      {
        "opponent": "爱尔兰",
        "score": "1 - 0",
        "xg": "1.2 - 0.5",
        "date": "2026-03-26",
        "type": "Friendly",
        "outcome": "W"
      }
    ],
    "strengths": [
      "扎卡无懈可击的后场组织与节奏掌控",
      "阿坎吉顶级的多角色防守覆盖",
      "在淘汰赛中极强的抗压能力"
    ],
    "weaknesses": [
      "缺乏世界顶级的终结型9号中锋",
      "进球方式偶尔缺乏多样性"
    ],
    "injuries": []
  },
  {
    "id": "ghana",
    "name": "加纳",
    "code": "GHA",
    "confederation": "CAF",
    "group": "G",
    "elo": 1720,
    "coach": {
      "name": "奥托·阿多",
      "style": "直接利用物理爆发起步反击，高密度边翼快速起步渗透",
      "experienceYears": 7
    },
    "ratings": {
      "attack": 79,
      "midfield": 76,
      "defense": 74,
      "benchDepth": 72,
      "experience": 75
    },
    "tactics": {
      "possession": 44,
      "pressing": 68,
      "counterAttack": 89,
      "defenseLine": 50,
      "physicality": 85,
      "setPiece": 70,
      "preferredFormation": "4-2-3-1"
    },
    "keyPlayers": [
      {
        "name": "穆罕默德·库杜斯",
        "club": "西汉姆联",
        "rating": 86,
        "role": "MID",
        "status": "Healthy"
      },
      {
        "name": "伊尼亚基·威廉姆斯",
        "club": "Athletic Bilbao",
        "rating": 81,
        "role": "FWD",
        "status": "Healthy"
      },
      {
        "name": "托马斯·帕尔特伊",
        "club": "阿森纳",
        "rating": 82,
        "role": "MID",
        "status": "Healthy"
      },
      {
        "name": "劳伦斯·阿蒂-齐吉",
        "club": "圣加伦",
        "rating": 72,
        "role": "GK",
        "status": "Healthy"
      },
      {
        "name": "阿里杜·塞杜",
        "club": "雷恩",
        "rating": 75,
        "role": "DEF",
        "status": "Healthy"
      },
      {
        "name": "伊利沙·奥夫苏",
        "club": "欧塞尔",
        "rating": 73,
        "role": "MID",
        "status": "Healthy"
      },
      {
        "name": "安托万·塞梅尼奥",
        "club": "伯恩茅斯",
        "rating": 77,
        "role": "FWD",
        "status": "Healthy"
      },
      {
        "name": "乔丹·阿尤",
        "club": "莱斯特城",
        "rating": 75,
        "role": "FWD",
        "status": "Healthy"
      }
    ],
    "recentForm": [
      {
        "opponent": "尼日利亚",
        "score": "2 - 1",
        "xg": "1.5 - 1.4",
        "date": "2026-03-22",
        "type": "Friendly",
        "outcome": "W"
      },
      {
        "opponent": "乌干达",
        "score": "2 - 2",
        "xg": "1.7 - 1.2",
        "date": "2026-03-26",
        "type": "Friendly",
        "outcome": "D"
      }
    ],
    "strengths": [
      "库杜斯令人难以置信的盘带与持球推进能力",
      "帕尔特伊扎实的身体对抗与中场屏障作用",
      "爆发力十足的边路套边与插上"
    ],
    "weaknesses": [
      "下半场防守端战术注意力的短暂不集中",
      "边翼卫套边插上缺乏持续性"
    ],
    "injuries": []
  },
  {
    "id": "panama",
    "name": "巴拿马",
    "code": "PAN",
    "confederation": "CONCACAF",
    "group": "G",
    "elo": 1650,
    "coach": {
      "name": "托马斯·克里斯蒂安森",
      "style": "中高度阵型刚健防御运转，腰部和中圈中位严密压阻",
      "experienceYears": 11
    },
    "ratings": {
      "attack": 71,
      "midfield": 72,
      "defense": 71,
      "benchDepth": 66,
      "experience": 73
    },
    "tactics": {
      "possession": 48,
      "pressing": 58,
      "counterAttack": 79,
      "defenseLine": 45,
      "physicality": 78,
      "setPiece": 74,
      "preferredFormation": "3-4-3"
    },
    "keyPlayers": [
      {
        "name": "阿达尔贝托·卡拉斯奎利亚",
        "club": "Houston Dynamo",
        "rating": 79,
        "role": "MID",
        "status": "Healthy"
      },
      {
        "name": "迈克尔·穆里略",
        "club": "Marseille",
        "rating": 78,
        "role": "DEF",
        "status": "Healthy"
      },
      {
        "name": "菲德尔·埃斯科瓦尔",
        "club": "Saprissa",
        "rating": 72,
        "role": "DEF",
        "status": "Healthy"
      },
      {
        "name": "奥兰多·莫斯克拉",
        "club": "特拉维夫马卡比",
        "rating": 70,
        "role": "GK",
        "status": "Healthy"
      },
      {
        "name": "何塞·科尔多瓦",
        "club": "诺维奇",
        "rating": 71,
        "role": "DEF",
        "status": "Healthy"
      },
      {
        "name": "埃德加·巴塞纳斯",
        "club": "马萨特兰",
        "rating": 70,
        "role": "MID",
        "status": "Healthy"
      },
      {
        "name": "何塞·法哈多",
        "club": "天主大学队",
        "rating": 69,
        "role": "FWD",
        "status": "Healthy"
      },
      {
        "name": "克里斯蒂安·马丁内斯",
        "club": "阿尔詹达勒",
        "rating": 68,
        "role": "MID",
        "status": "Healthy"
      }
    ],
    "recentForm": [
      {
        "opponent": "墨西哥",
        "score": "0 - 3",
        "xg": "0.8 - 2.1",
        "date": "2026-03-21",
        "type": "Qualifier",
        "outcome": "L"
      },
      {
        "opponent": "牙买加",
        "score": "0 - 1",
        "xg": "1.1 - 1.2",
        "date": "2026-03-24",
        "type": "Qualifier",
        "outcome": "L"
      }
    ],
    "strengths": [
      "卡拉斯基亚极佳的后场大局观与视野",
      "迈克尔·穆里略欧洲级别的边路覆盖能力",
      "出色的定位球战术套路"
    ],
    "weaknesses": [
      "禁区内终结效率严重受限",
      "比分落后时防守韧性不足"
    ],
    "injuries": []
  },
  {
    "id": "netherlands",
    "name": "荷兰",
    "code": "NED",
    "confederation": "UEFA",
    "group": "H",
    "elo": 1960,
    "coach": {
      "name": "罗纳德·科曼",
      "style": "全攻全守骨架垂直高压防御，暴烈两翼疯狂高步频拼杀",
      "experienceYears": 24
    },
    "ratings": {
      "attack": 85,
      "midfield": 86,
      "defense": 91,
      "benchDepth": 87,
      "experience": 85
    },
    "tactics": {
      "possession": 59,
      "pressing": 78,
      "counterAttack": 83,
      "defenseLine": 65,
      "physicality": 84,
      "setPiece": 80,
      "preferredFormation": "4-3-3"
    },
    "keyPlayers": [
      {
        "name": "维吉尔·范戴克",
        "club": "利物浦",
        "rating": 90,
        "role": "DEF",
        "status": "Healthy"
      },
      {
        "name": "弗兰基·德容",
        "club": "巴塞罗那",
        "rating": 88,
        "role": "MID",
        "status": "Healthy"
      },
      {
        "name": "科迪·加克波",
        "club": "利物浦",
        "rating": 85,
        "role": "FWD",
        "status": "Healthy"
      },
      {
        "name": "巴特·维尔布鲁根",
        "club": "布莱顿",
        "rating": 81,
        "role": "GK",
        "status": "Healthy"
      },
      {
        "name": "内森·阿克",
        "club": "曼城",
        "rating": 84,
        "role": "DEF",
        "status": "Healthy"
      },
      {
        "name": "登泽尔·邓弗里斯",
        "club": "国际米兰",
        "rating": 83,
        "role": "DEF",
        "status": "Healthy"
      },
      {
        "name": "哈维·西蒙斯",
        "club": "莱比锡红牛",
        "rating": 86,
        "role": "MID",
        "status": "Healthy"
      },
      {
        "name": "唐耶尔·马伦",
        "club": "多特蒙德",
        "rating": 81,
        "role": "FWD",
        "status": "Healthy"
      }
    ],
    "recentForm": [
      {
        "opponent": "苏格兰",
        "score": "4 - 0",
        "xg": "2.4 - 0.7",
        "date": "2026-03-22",
        "type": "Friendly",
        "outcome": "W"
      },
      {
        "opponent": "德国",
        "score": "1 - 2",
        "xg": "1.2 - 1.9",
        "date": "2026-03-26",
        "type": "Friendly",
        "outcome": "L"
      }
    ],
    "strengths": [
      "范戴克世界级的防守屏障作用",
      "弗朗基·德容顶级的摆脱逼抢与推进能力",
      "出色的斜传起球配合"
    ],
    "weaknesses": [
      "面对低位紧凑防线时难以渗透中路空间",
      "缺乏顶级传统禁区型9号终结者"
    ],
    "injuries": []
  },
  {
    "id": "japan",
    "name": "日本",
    "code": "JPN",
    "confederation": "AFC",
    "group": "H",
    "elo": 1860,
    "coach": {
      "name": "森保一",
      "style": "战术极精细传导控球，超高步频的全场反抢与攻防闪击",
      "experienceYears": 12
    },
    "ratings": {
      "attack": 85,
      "midfield": 86,
      "defense": 81,
      "benchDepth": 83,
      "experience": 80
    },
    "tactics": {
      "possession": 58,
      "pressing": 80,
      "counterAttack": 89,
      "defenseLine": 60,
      "physicality": 72,
      "setPiece": 74,
      "preferredFormation": "4-2-3-1"
    },
    "keyPlayers": [
      {
        "name": "三笘薰",
        "club": "布莱顿",
        "rating": 87,
        "role": "FWD",
        "status": "Healthy"
      },
      {
        "name": "久保建英",
        "club": "皇家社会",
        "rating": 86,
        "role": "MID",
        "status": "Healthy"
      },
      {
        "name": "远藤航",
        "club": "利物浦",
        "rating": 84,
        "role": "MID",
        "status": "Healthy"
      },
      {
        "name": "铃木彩艳",
        "club": "帕尔马",
        "rating": 75,
        "role": "GK",
        "status": "Healthy"
      },
      {
        "name": "板仓滉",
        "club": "门兴格拉德巴赫",
        "rating": 80,
        "role": "DEF",
        "status": "Healthy"
      },
      {
        "name": "南野拓实",
        "club": "摩纳哥",
        "rating": 79,
        "role": "MID",
        "status": "Healthy"
      },
      {
        "name": "堂安律",
        "club": "弗赖堡",
        "rating": 79,
        "role": "MID",
        "status": "Healthy"
      },
      {
        "name": "上田绮世",
        "club": "费耶诺德",
        "rating": 77,
        "role": "FWD",
        "status": "Healthy"
      }
    ],
    "recentForm": [
      {
        "opponent": "朝鲜",
        "score": "1 - 0",
        "xg": "1.6 - 0.3",
        "date": "2026-03-21",
        "type": "Qualifier",
        "outcome": "W"
      },
      {
        "opponent": "叙利亚",
        "score": "5 - 0",
        "xg": "3.4 - 0.2",
        "date": "2026-05-15",
        "type": "Qualifier",
        "outcome": "W"
      }
    ],
    "strengths": [
      "令人惊叹的边路深度（三笘薰、久保建英、伊东纯也）",
      "远藤航顶级的跑动引擎与防守屏障",
      "极速的传接配合流"
    ],
    "weaknesses": [
      "禁区内高强度直接对抗中的空中劣势",
      "面对低位防守空间时前锋的转化率"
    ],
    "injuries": []
  },
  {
    "id": "tunisia",
    "name": "突尼斯",
    "code": "TUN",
    "confederation": "CAF",
    "group": "H",
    "elo": 1700,
    "coach": {
      "name": "凯斯·雅库比",
      "style": "沉缓紧凑的中下防线低落位阵型，直接起大长传寻找制空支点",
      "experienceYears": 12
    },
    "ratings": {
      "attack": 72,
      "midfield": 74,
      "defense": 75,
      "benchDepth": 68,
      "experience": 81
    },
    "tactics": {
      "possession": 40,
      "pressing": 55,
      "counterAttack": 78,
      "defenseLine": 40,
      "physicality": 80,
      "setPiece": 76,
      "preferredFormation": "4-3-2-1"
    },
    "keyPlayers": [
      {
        "name": "埃利亚斯·斯希里",
        "club": "法兰克福",
        "rating": 81,
        "role": "MID",
        "status": "Healthy"
      },
      {
        "name": "艾萨·莱杜尼",
        "club": "柏林联合",
        "rating": 78,
        "role": "MID",
        "status": "Healthy"
      },
      {
        "name": "蒙塔萨尔·塔尔比",
        "club": "洛里昂",
        "rating": 77,
        "role": "DEF",
        "status": "Healthy"
      },
      {
        "name": "阿曼·达曼",
        "club": "哈萨姆",
        "rating": 71,
        "role": "GK",
        "status": "Healthy"
      },
      {
        "name": "瓦杰迪·克奇里达",
        "club": "阿特罗米托斯",
        "rating": 71,
        "role": "DEF",
        "status": "Healthy"
      },
      {
        "name": "汉尼拔·梅布里",
        "club": "伯恩利",
        "rating": 73,
        "role": "MID",
        "status": "Healthy"
      },
      {
        "name": "赛义夫丁·贾齐里",
        "club": "扎马雷克",
        "rating": 70,
        "role": "FWD",
        "status": "Healthy"
      },
      {
        "name": "尤瑟夫·姆萨克尼",
        "club": "多哈阿拉伯人",
        "rating": 71,
        "role": "FWD",
        "status": "Healthy"
      }
    ],
    "recentForm": [
      {
        "opponent": "克罗地亚",
        "score": "0 - 0",
        "xg": "0.6 - 1.1",
        "date": "2026-03-23",
        "type": "Friendly",
        "outcome": "D"
      },
      {
        "opponent": "新西兰",
        "score": "0 - 0",
        "xg": "0.7 - 0.7",
        "date": "2026-03-26",
        "type": "Friendly",
        "outcome": "D"
      }
    ],
    "strengths": [
      "纪律性极强的双中场组合",
      "侵略性极强的铲断拦截者",
      "中路攻防转换中的沉着冷静"
    ],
    "weaknesses": [
      "转换中极其缓慢的边路反击",
      "进攻端阵容深度不足"
    ],
    "injuries": []
  },
  {
    "id": "costa_rica",
    "name": "哥斯达黎加",
    "code": "CRC",
    "confederation": "CONCACAF",
    "group": "H",
    "elo": 1670,
    "coach": {
      "name": "克劳迪奥·维瓦斯",
      "style": "极其深厚顽强的低位蹲坑五后卫，利用单点锋线爆发闪击冲刺",
      "experienceYears": 14
    },
    "ratings": {
      "attack": 71,
      "midfield": 70,
      "defense": 72,
      "benchDepth": 66,
      "experience": 79
    },
    "tactics": {
      "possession": 37,
      "pressing": 48,
      "counterAttack": 83,
      "defenseLine": 35,
      "physicality": 77,
      "setPiece": 72,
      "preferredFormation": "5-4-1"
    },
    "keyPlayers": [
      {
        "name": "曼弗德·乌加尔德",
        "club": "莫斯科斯巴达",
        "rating": 79,
        "role": "FWD",
        "status": "Healthy"
      },
      {
        "name": "弗朗西斯科·卡尔沃",
        "club": "华雷斯",
        "rating": 75,
        "role": "DEF",
        "status": "Healthy"
      },
      {
        "name": "乔尔·坎贝尔",
        "club": "阿拉胡埃伦斯",
        "rating": 74,
        "role": "FWD",
        "status": "Healthy"
      },
      {
        "name": "帕特里克·塞奎拉",
        "club": "卡萨皮亚",
        "rating": 71,
        "role": "GK",
        "status": "Healthy"
      },
      {
        "name": "胡安·巴勃罗·巴尔加斯",
        "club": "百万富翁",
        "rating": 71,
        "role": "DEF",
        "status": "Healthy"
      },
      {
        "name": "杰兰·米切尔",
        "club": "费耶诺德",
        "rating": 72,
        "role": "DEF",
        "status": "Healthy"
      },
      {
        "name": "布兰登·阿奎莱拉",
        "club": "里奥阿维",
        "rating": 70,
        "role": "MID",
        "status": "Healthy"
      },
      {
        "name": "阿尔瓦罗·萨莫拉",
        "club": "阿里斯",
        "rating": 69,
        "role": "FWD",
        "status": "Healthy"
      }
    ],
    "recentForm": [
      {
        "opponent": "洪都拉斯",
        "score": "3 - 1",
        "xg": "1.9 - 1.1",
        "date": "2026-03-23",
        "type": "Qualifier",
        "outcome": "W"
      },
      {
        "opponent": "阿根廷",
        "score": "1 - 3",
        "xg": "0.8 - 3.1",
        "date": "2026-03-27",
        "type": "Friendly",
        "outcome": "L"
      }
    ],
    "strengths": [
      "曼弗德·乌加尔德的高强度逼抢",
      "历史上出色的杯赛韧性",
      "顽固的五后卫防线封堵"
    ],
    "weaknesses": [
      "攻防转换中极低的传球准星",
      "防守型边后卫的老龄化指标"
    ],
    "injuries": []
  },
  {
    "id": "italy",
    "name": "意大利",
    "code": "ITA",
    "confederation": "UEFA",
    "group": "I",
    "elo": 1950,
    "coach": {
      "name": "卢西亚诺·斯帕莱蒂",
      "style": "中前场高压控球渗透，极高频反抢阻圈",
      "experienceYears": 25
    },
    "ratings": {
      "attack": 82,
      "midfield": 88,
      "defense": 89,
      "benchDepth": 86,
      "experience": 82
    },
    "tactics": {
      "possession": 60,
      "pressing": 82,
      "counterAttack": 79,
      "defenseLine": 62,
      "physicality": 80,
      "setPiece": 78,
      "preferredFormation": "3-4-2-1"
    },
    "keyPlayers": [
      {
        "name": "尼科洛·巴雷拉",
        "club": "Inter Milan",
        "rating": 89,
        "role": "MID",
        "status": "Healthy"
      },
      {
        "name": "亚历山德罗·巴斯托尼",
        "club": "Inter Milan",
        "rating": 88,
        "role": "DEF",
        "status": "Healthy"
      },
      {
        "name": "詹路易吉·多纳鲁马",
        "club": "巴黎圣日耳曼",
        "rating": 89,
        "role": "GK",
        "status": "Healthy"
      },
      {
        "name": "古列尔莫·维卡里奥",
        "club": "热刺",
        "rating": 84,
        "role": "GK",
        "status": "Healthy"
      },
      {
        "name": "费代里科·迪马尔科",
        "club": "国际米兰",
        "rating": 86,
        "role": "DEF",
        "status": "Healthy"
      },
      {
        "name": "曼努埃尔·洛卡特利",
        "club": "尤文图斯",
        "rating": 82,
        "role": "MID",
        "status": "Healthy"
      },
      {
        "name": "马特奥·雷特吉",
        "club": "亚特兰大",
        "rating": 81,
        "role": "FWD",
        "status": "Healthy"
      },
      {
        "name": "若日尼奥",
        "club": "阿森纳",
        "rating": 80,
        "role": "MID",
        "status": "Healthy"
      }
    ],
    "recentForm": [
      {
        "opponent": "委内瑞拉",
        "score": "2 - 1",
        "xg": "1.8 - 1.0",
        "date": "2026-03-21",
        "type": "Friendly",
        "outcome": "W"
      },
      {
        "opponent": "厄瓜多尔",
        "score": "2 - 0",
        "xg": "1.4 - 0.8",
        "date": "2026-03-24",
        "type": "Friendly",
        "outcome": "W"
      }
    ],
    "strengths": [
      "巴斯托尼顶级左路组织型后卫的防守与出球表现",
      "巴雷拉极致的B2B（全能中场）引擎",
      "世界级的门将屏障作用"
    ],
    "weaknesses": [
      "缺乏冷酷无情的终结型中锋",
      "边后卫防守节奏失误"
    ],
    "injuries": []
  },
  {
    "id": "senegal",
    "name": "塞内加尔",
    "code": "SEN",
    "confederation": "CAF",
    "group": "I",
    "elo": 1810,
    "coach": {
      "name": "阿利乌·西塞",
      "style": "紧促硬核的中区拦截，如电闪雷鸣般的边路闪击突袭",
      "experienceYears": 11
    },
    "ratings": {
      "attack": 81,
      "midfield": 79,
      "defense": 82,
      "benchDepth": 78,
      "experience": 88
    },
    "tactics": {
      "possession": 49,
      "pressing": 68,
      "counterAttack": 89,
      "defenseLine": 50,
      "physicality": 88,
      "setPiece": 80,
      "preferredFormation": "4-3-3"
    },
    "keyPlayers": [
      {
        "name": "萨迪奥·马内",
        "club": "利雅得胜利",
        "rating": 84,
        "role": "FWD",
        "status": "Healthy"
      },
      {
        "name": "卡利杜·库利巴利",
        "club": "利雅得新月",
        "rating": 83,
        "role": "DEF",
        "status": "Healthy"
      },
      {
        "name": "尼古拉斯·杰克逊",
        "club": "切尔西",
        "rating": 83,
        "role": "FWD",
        "status": "Healthy"
      },
      {
        "name": "爱德华·门迪",
        "club": "吉达国民",
        "rating": 81,
        "role": "GK",
        "status": "Healthy"
      },
      {
        "name": "莫穆·塞克",
        "club": "海法马卡比",
        "rating": 73,
        "role": "DEF",
        "status": "Healthy"
      },
      {
        "name": "帕普·马塔尔·萨尔",
        "club": "热刺",
        "rating": 80,
        "role": "MID",
        "status": "Healthy"
      },
      {
        "name": "伊德里萨·盖伊",
        "club": "埃弗顿",
        "rating": 76,
        "role": "MID",
        "status": "Healthy"
      },
      {
        "name": "布拉耶·迪亚",
        "club": "拉齐奥",
        "rating": 78,
        "role": "FWD",
        "status": "Healthy"
      }
    ],
    "recentForm": [
      {
        "opponent": "加蓬",
        "score": "3 - 0",
        "xg": "2.1 - 0.5",
        "date": "2026-03-22",
        "type": "Friendly",
        "outcome": "W"
      },
      {
        "opponent": "贝宁",
        "score": "1 - 0",
        "xg": "1.3 - 0.4",
        "date": "2026-03-26",
        "type": "Friendly",
        "outcome": "W"
      }
    ],
    "strengths": [
      "身体对抗极其强悍的防线（库利巴利）",
      "尼古拉斯·杰克逊充满活力的纵深插上",
      "极高的身体对抗成功率"
    ],
    "weaknesses": [
      "中场组织略显粗糙",
      "易在定位球防守中出现盯人失误"
    ],
    "injuries": []
  },
  {
    "id": "turkey",
    "name": "土耳其",
    "code": "TUR",
    "confederation": "UEFA",
    "group": "I",
    "elo": 1805,
    "coach": {
      "name": "温琴佐·蒙特拉",
      "style": "极强战术视觉的起速突击，倒三角伪9号局部包抄过载",
      "experienceYears": 12
    },
    "ratings": {
      "attack": 83,
      "midfield": 82,
      "defense": 76,
      "benchDepth": 77,
      "experience": 75
    },
    "tactics": {
      "possession": 54,
      "pressing": 72,
      "counterAttack": 86,
      "defenseLine": 58,
      "physicality": 76,
      "setPiece": 74,
      "preferredFormation": "4-2-3-1"
    },
    "keyPlayers": [
      {
        "name": "哈坎·恰尔汗奥卢",
        "club": "Inter Milan",
        "rating": 88,
        "role": "MID",
        "status": "Healthy"
      },
      {
        "name": "阿尔达·居莱尔",
        "club": "皇家马德里",
        "rating": 85,
        "role": "MID",
        "status": "Healthy"
      },
      {
        "name": "克南·伊尔迪兹",
        "club": "尤文图斯",
        "rating": 82,
        "role": "FWD",
        "status": "Healthy"
      },
      {
        "name": "阿尔泰·巴因迪尔",
        "club": "曼联",
        "rating": 75,
        "role": "GK",
        "status": "Healthy"
      },
      {
        "name": "阿卜杜勒克里姆·巴尔达克哲",
        "club": "加拉塔萨雷",
        "rating": 78,
        "role": "DEF",
        "status": "Healthy"
      },
      {
        "name": "萨利赫·厄兹詹",
        "club": "沃尔夫斯堡",
        "rating": 77,
        "role": "MID",
        "status": "Healthy"
      },
      {
        "name": "奥尔昆·科克屈",
        "club": "本菲卡",
        "rating": 81,
        "role": "MID",
        "status": "Healthy"
      },
      {
        "name": "巴里什·阿尔佩尔·伊尔马兹",
        "club": "加拉塔萨雷",
        "rating": 78,
        "role": "FWD",
        "status": "Healthy"
      }
    ],
    "recentForm": [
      {
        "opponent": "匈牙利",
        "score": "0 - 1",
        "xg": "0.9 - 1.2",
        "date": "2026-03-22",
        "type": "Friendly",
        "outcome": "L"
      },
      {
        "opponent": "奥地利",
        "score": "1 - 6",
        "xg": "1.1 - 3.8",
        "date": "2026-03-26",
        "type": "Friendly",
        "outcome": "L"
      }
    ],
    "strengths": [
      "恰尔汗奥卢大师级的拖后组织视野",
      "阿尔达·居莱尔惊人的半肋部盘带能力",
      "极佳的中场技术底蕴"
    ],
    "weaknesses": [
      "面对高运动能力和强身体对抗转换时的脆弱性",
      "中后卫位置盯防失误"
    ],
    "injuries": []
  },
  {
    "id": "jamaica",
    "name": "牙买加",
    "code": "JAM",
    "confederation": "CONCACAF",
    "group": "I",
    "elo": 1680,
    "coach": {
      "name": "史蒂夫·麦克拉伦",
      "style": "直接大长传飞快两边锋突刺，低位并蹲坑双主力腰后撤",
      "experienceYears": 24
    },
    "ratings": {
      "attack": 80,
      "midfield": 70,
      "defense": 69,
      "benchDepth": 67,
      "experience": 71
    },
    "tactics": {
      "possession": 41,
      "pressing": 58,
      "counterAttack": 91,
      "defenseLine": 42,
      "physicality": 83,
      "setPiece": 76,
      "preferredFormation": "4-4-2"
    },
    "keyPlayers": [
      {
        "name": "利昂·贝利",
        "club": "阿斯顿维拉",
        "rating": 83,
        "role": "FWD",
        "status": "Healthy"
      },
      {
        "name": "米查尔·安东尼奥",
        "club": "西汉姆联",
        "rating": 78,
        "role": "FWD",
        "status": "Healthy"
      },
      {
        "name": "德马莱·格雷",
        "club": "Al Ettifaq",
        "rating": 78,
        "role": "FWD",
        "status": "Healthy"
      },
      {
        "name": "安德烈·布莱克",
        "club": "费城联合",
        "rating": 74,
        "role": "GK",
        "status": "Healthy"
      },
      {
        "name": "伊森·平诺克",
        "club": "布伦特福德",
        "rating": 77,
        "role": "DEF",
        "status": "Healthy"
      },
      {
        "name": "鲍比·德科多瓦-里德",
        "club": "莱斯特城",
        "rating": 74,
        "role": "MID",
        "status": "Healthy"
      },
      {
        "name": "凯塞·帕尔默",
        "club": "赫尔城",
        "rating": 71,
        "role": "MID",
        "status": "Healthy"
      },
      {
        "name": "沙马尔·尼科尔森",
        "club": "莫斯科斯巴达",
        "rating": 72,
        "role": "FWD",
        "status": "Healthy"
      }
    ],
    "recentForm": [
      {
        "opponent": "美国",
        "score": "1 - 3",
        "xg": "1.0 - 2.4",
        "date": "2026-03-21",
        "type": "Qualifier",
        "outcome": "L"
      },
      {
        "opponent": "巴拿马",
        "score": "1 - 0",
        "xg": "1.2 - 1.1",
        "date": "2026-03-24",
        "type": "Qualifier",
        "outcome": "W"
      }
    ],
    "strengths": [
      "贝利带来的毁灭性反击节奏",
      "米查尔·安东尼奥在身体对抗中的统治力",
      "极快的攻防转换节奏"
    ],
    "weaknesses": [
      "深处低位的中场出球运转局限性",
      "防守结构在造越位战术中投入过度"
    ],
    "injuries": []
  },
  {
    "id": "germany",
    "name": "德国",
    "code": "GER",
    "confederation": "UEFA",
    "group": "J",
    "elo": 1980,
    "coach": {
      "name": "朱利安·纳格尔斯曼",
      "style": "侵略性极高的肋部穿插反击体系，中路精密持球创造力",
      "experienceYears": 10
    },
    "ratings": {
      "attack": 89,
      "midfield": 92,
      "defense": 87,
      "benchDepth": 90,
      "experience": 88
    },
    "tactics": {
      "possession": 63,
      "pressing": 86,
      "counterAttack": 80,
      "defenseLine": 68,
      "physicality": 78,
      "setPiece": 81,
      "preferredFormation": "4-2-3-1"
    },
    "keyPlayers": [
      {
        "name": "弗洛里安·维尔茨",
        "club": "勒沃库森",
        "rating": 91,
        "role": "MID",
        "status": "Healthy"
      },
      {
        "name": "贾马尔·穆西亚拉",
        "club": "拜仁慕尼黑",
        "rating": 91,
        "role": "MID",
        "status": "Healthy"
      },
      {
        "name": "安东尼奥·吕迪格",
        "club": "皇家马德里",
        "rating": 89,
        "role": "DEF",
        "status": "Healthy"
      },
      {
        "name": "马克-安德烈·特尔施特根",
        "club": "巴塞罗那",
        "rating": 88,
        "role": "GK",
        "status": "Healthy"
      },
      {
        "name": "约书亚·基米希",
        "club": "拜仁慕尼黑",
        "rating": 89,
        "role": "MID",
        "status": "Healthy"
      },
      {
        "name": "伊尔卡伊·京多安",
        "club": "巴塞罗那",
        "rating": 86,
        "role": "MID",
        "status": "Healthy"
      },
      {
        "name": "尼克拉斯·菲尔克鲁格",
        "club": "西汉姆联",
        "rating": 81,
        "role": "FWD",
        "status": "Healthy"
      },
      {
        "name": "尼科·施洛特贝克",
        "club": "多特蒙德",
        "rating": 83,
        "role": "DEF",
        "status": "Healthy"
      }
    ],
    "recentForm": [
      {
        "opponent": "法国",
        "score": "2 - 0",
        "xg": "1.8 - 1.2",
        "date": "2026-03-24",
        "type": "Friendly",
        "outcome": "W"
      },
      {
        "opponent": "荷兰",
        "score": "2 - 1",
        "xg": "1.9 - 1.2",
        "date": "2026-03-26",
        "type": "Friendly",
        "outcome": "W"
      }
    ],
    "strengths": [
      "穆西亚拉与维尔茨神奇的肋部协同效应",
      "吕迪格顶级的回追速度与身体对抗统治力",
      "顶级的攻防转换控制力"
    ],
    "weaknesses": [
      "易在边后卫身后被对手人数过载击穿",
      "面对三中场枢纽时在狭窄通道内推进困难"
    ],
    "injuries": []
  },
  {
    "id": "uruguay",
    "name": "乌拉圭",
    "code": "URU",
    "confederation": "CONMEBOL",
    "group": "J",
    "elo": 1940,
    "coach": {
      "name": "马塞洛·贝尔萨",
      "style": "疯狂盯人疯人战术，极度狂躁的两肺高密集高压逼抢",
      "experienceYears": 30
    },
    "ratings": {
      "attack": 86,
      "midfield": 89,
      "defense": 84,
      "benchDepth": 82,
      "experience": 85
    },
    "tactics": {
      "possession": 57,
      "pressing": 95,
      "counterAttack": 92,
      "defenseLine": 65,
      "physicality": 88,
      "setPiece": 82,
      "preferredFormation": "4-3-3"
    },
    "keyPlayers": [
      {
        "name": "费德里科·巴尔韦德",
        "club": "皇家马德里",
        "rating": 90,
        "role": "MID",
        "status": "Healthy"
      },
      {
        "name": "达尔文·努涅斯",
        "club": "利物浦",
        "rating": 84,
        "role": "FWD",
        "status": "Healthy"
      },
      {
        "name": "罗纳德·阿劳霍",
        "club": "巴塞罗那",
        "rating": 88,
        "role": "DEF",
        "status": "Healthy"
      },
      {
        "name": "塞尔希奥·罗切特",
        "club": "国际体育",
        "rating": 78,
        "role": "GK",
        "status": "Healthy"
      },
      {
        "name": "何塞·希门尼斯",
        "club": "马德里竞技",
        "rating": 82,
        "role": "DEF",
        "status": "Healthy"
      },
      {
        "name": "曼努埃尔·乌加特",
        "club": "曼联",
        "rating": 81,
        "role": "MID",
        "status": "Healthy"
      },
      {
        "name": "尼古拉斯·德拉克鲁斯",
        "club": "弗拉门戈",
        "rating": 80,
        "role": "MID",
        "status": "Healthy"
      },
      {
        "name": "法昆多·佩利斯特里",
        "club": "帕纳辛奈科斯",
        "rating": 76,
        "role": "FWD",
        "status": "Healthy"
      }
    ],
    "recentForm": [
      {
        "opponent": "巴斯克",
        "score": "1 - 1",
        "xg": "1.4 - 1.0",
        "date": "2026-03-23",
        "type": "Friendly",
        "outcome": "D"
      },
      {
        "opponent": "科特迪瓦",
        "score": "1 - 2",
        "xg": "1.5 - 1.6",
        "date": "2026-03-26",
        "type": "Friendly",
        "outcome": "L"
      }
    ],
    "strengths": [
      "贝尔萨高强度、跑不死的压迫引擎",
      "巴尔韦德的长距离带球推进与转换中的大步幅奔袭",
      "禁区内凶悍的身体封堵"
    ],
    "weaknesses": [
      "大赛后期极度疲劳的迹象",
      "达尔文·努涅斯极高的预期进球（xG）转化率波动"
    ],
    "injuries": []
  },
  {
    "id": "algeria",
    "name": "阿尔及利亚",
    "code": "ALG",
    "confederation": "CAF",
    "group": "J",
    "elo": 1730,
    "coach": {
      "name": "弗拉基米尔·佩特科维奇",
      "style": "战术性控球展宽，大范围起斜吊中路传中旋转",
      "experienceYears": 18
    },
    "ratings": {
      "attack": 78,
      "midfield": 75,
      "defense": 74,
      "benchDepth": 73,
      "experience": 80
    },
    "tactics": {
      "possession": 52,
      "pressing": 64,
      "counterAttack": 81,
      "defenseLine": 52,
      "physicality": 77,
      "setPiece": 75,
      "preferredFormation": "4-3-3"
    },
    "keyPlayers": [
      {
        "name": "里亚德·马赫雷斯",
        "club": "吉达国民",
        "rating": 81,
        "role": "FWD",
        "status": "Healthy"
      },
      {
        "name": "拉扬·艾特-努里",
        "club": "Wolves",
        "rating": 82,
        "role": "DEF",
        "status": "Healthy"
      },
      {
        "name": "伊斯梅尔·本纳塞尔",
        "club": "AC米兰",
        "rating": 83,
        "role": "MID",
        "status": "Healthy"
      },
      {
        "name": "安东尼·曼德雷亚",
        "club": "卡昂",
        "rating": 72,
        "role": "GK",
        "status": "Healthy"
      },
      {
        "name": "艾萨·曼迪",
        "club": "里尔",
        "rating": 74,
        "role": "DEF",
        "status": "Healthy"
      },
      {
        "name": "纳比勒·本塔莱布",
        "club": "里尔",
        "rating": 76,
        "role": "MID",
        "status": "Healthy"
      },
      {
        "name": "萨伊德·本拉赫马",
        "club": "里昂",
        "rating": 77,
        "role": "FWD",
        "status": "Healthy"
      },
      {
        "name": "巴格达·布内贾",
        "club": "沙马尔",
        "rating": 75,
        "role": "FWD",
        "status": "Healthy"
      }
    ],
    "recentForm": [
      {
        "opponent": "玻利维亚",
        "score": "3 - 2",
        "xg": "2.4 - 1.2",
        "date": "2026-03-22",
        "type": "Friendly",
        "outcome": "W"
      },
      {
        "opponent": "南非",
        "score": "3 - 3",
        "xg": "2.2 - 2.1",
        "date": "2026-03-26",
        "type": "Friendly",
        "outcome": "D"
      }
    ],
    "strengths": [
      "艾特-努里极具创造力的现代边后卫套上",
      "本纳塞尔在中路快速摆脱逼抢的脱困表现",
      "技术型的边路倒三角传中"
    ],
    "weaknesses": [
      "高分贝高空横传球防守中容易暴露出盯人空白",
      "高龄进攻球星的防守回追率"
    ],
    "injuries": []
  },
  {
    "id": "australia",
    "name": "澳大利亚",
    "code": "AUS",
    "confederation": "AFC",
    "group": "J",
    "elo": 1725,
    "coach": {
      "name": "托尼·波波维奇",
      "style": "顽硬中区中后防线硬物理拦截，利用定位角球及大弧起斜高线压欺",
      "experienceYears": 12
    },
    "ratings": {
      "attack": 73,
      "midfield": 74,
      "defense": 76,
      "benchDepth": 71,
      "experience": 82
    },
    "tactics": {
      "possession": 46,
      "pressing": 60,
      "counterAttack": 79,
      "defenseLine": 45,
      "physicality": 86,
      "setPiece": 84,
      "preferredFormation": "4-2-3-1"
    },
    "keyPlayers": [
      {
        "name": "哈里·苏塔尔",
        "club": "谢菲尔德联",
        "rating": 78,
        "role": "DEF",
        "status": "Healthy"
      },
      {
        "name": "杰克逊·欧文",
        "club": "圣保利",
        "rating": 77,
        "role": "MID",
        "status": "Healthy"
      },
      {
        "name": "马修·瑞安",
        "club": "罗马",
        "rating": 76,
        "role": "GK",
        "status": "Healthy"
      },
      {
        "name": "乔·高奇",
        "club": "阿斯顿维拉",
        "rating": 71,
        "role": "GK",
        "status": "Healthy"
      },
      {
        "name": "凯·罗尔斯",
        "club": "哈茨",
        "rating": 72,
        "role": "DEF",
        "status": "Healthy"
      },
      {
        "name": "康纳·梅特卡夫",
        "club": "圣保利",
        "rating": 71,
        "role": "MID",
        "status": "Healthy"
      },
      {
        "name": "克雷格·古德温",
        "club": "麦加统一",
        "rating": 75,
        "role": "FWD",
        "status": "Healthy"
      },
      {
        "name": "米切尔·杜克",
        "club": "町田泽维亚",
        "rating": 70,
        "role": "FWD",
        "status": "Healthy"
      }
    ],
    "recentForm": [
      {
        "opponent": "黎巴嫩",
        "score": "2 - 0",
        "xg": "1.7 - 0.4",
        "date": "2026-03-21",
        "type": "Qualifier",
        "outcome": "W"
      },
      {
        "opponent": "黎巴嫩",
        "score": "5 - 0",
        "xg": "3.2 - 0.1",
        "date": "2026-03-26",
        "type": "Qualifier",
        "outcome": "W"
      }
    ],
    "strengths": [
      "哈里·苏塔尔巨人般的身高与定位球统治力",
      "欧文带来的圣保利式硬朗中场作风",
      "对第二落点球的侵略性拼抢"
    ],
    "weaknesses": [
      "狭窄半通道内的技术精度欠佳",
      "缺乏创造性的拖后组织核心"
    ],
    "injuries": []
  },
  {
    "id": "brazil",
    "name": "巴西",
    "code": "BRA",
    "confederation": "CONMEBOL",
    "group": "K",
    "elo": 2050,
    "coach": {
      "name": "多里瓦尔·儒尼奥尔",
      "style": "流动边翼过载压迫，前锋极其自由奔放即兴发挥",
      "experienceYears": 20
    },
    "ratings": {
      "attack": 91,
      "midfield": 89,
      "defense": 90,
      "benchDepth": 93,
      "experience": 90
    },
    "tactics": {
      "possession": 59,
      "pressing": 72,
      "counterAttack": 88,
      "defenseLine": 58,
      "physicality": 80,
      "setPiece": 78,
      "preferredFormation": "4-3-3"
    },
    "keyPlayers": [
      {
        "name": "维尼修斯·儒尼奥尔",
        "club": "皇家马德里",
        "rating": 93,
        "role": "FWD",
        "status": "Healthy"
      },
      {
        "name": "罗德里戈",
        "club": "皇家马德里",
        "rating": 89,
        "role": "FWD",
        "status": "Healthy"
      },
      {
        "name": "布鲁诺·吉马良斯",
        "club": "纽卡斯尔联 United",
        "rating": 88,
        "role": "MID",
        "status": "Healthy"
      },
      {
        "name": "埃德森",
        "club": "曼城",
        "rating": 87,
        "role": "GK",
        "status": "Healthy"
      },
      {
        "name": "马尔基尼奥斯",
        "club": "巴黎圣日耳曼",
        "rating": 87,
        "role": "DEF",
        "status": "Healthy"
      },
      {
        "name": "加布里埃尔",
        "club": "阿森纳",
        "rating": 86,
        "role": "DEF",
        "status": "Healthy"
      },
      {
        "name": "卢卡斯·帕奎塔",
        "club": "西汉姆联",
        "rating": 84,
        "role": "MID",
        "status": "Healthy"
      },
      {
        "name": "拉菲尼亚",
        "club": "巴塞罗那",
        "rating": 85,
        "role": "FWD",
        "status": "Healthy"
      }
    ],
    "recentForm": [
      {
        "opponent": "英格兰",
        "score": "1 - 0",
        "xg": "1.2 - 1.5",
        "date": "2026-03-23",
        "type": "Friendly",
        "outcome": "W"
      },
      {
        "opponent": "西班牙",
        "score": "3 - 3",
        "xg": "2.4 - 2.6",
        "date": "2026-03-26",
        "type": "Friendly",
        "outcome": "D"
      }
    ],
    "strengths": [
      "维尼修斯·儒尼奥尔致命的1对1速度与爆发力",
      "梦幻般的灵性与即兴发挥",
      "身体对抗强悍、侵略性十足的防守后腰"
    ],
    "weaknesses": [
      "助攻积极的边后卫身后留下的防守空档",
      "后防线偶尔出现的注意力不集中"
    ],
    "injuries": [
      {
        "playerName": "内马尔(Neymar Jr)",
        "role": "MID",
        "injury": "Knee rehab management",
        "severity": "High",
        "impactPercent": 6,
        "status": "Doubtful for games, training separately"
      }
    ]
  },
  {
    "id": "denmark",
    "name": "丹麦",
    "code": "DEN",
    "confederation": "UEFA",
    "group": "K",
    "elo": 1875,
    "coach": {
      "name": "拉尔斯·克努森",
      "style": "战术对称三线平衡对称攻防，动态极强传中起球体系",
      "experienceYears": 10
    },
    "ratings": {
      "attack": 81,
      "midfield": 84,
      "defense": 83,
      "benchDepth": 81,
      "experience": 88
    },
    "tactics": {
      "possession": 54,
      "pressing": 68,
      "counterAttack": 79,
      "defenseLine": 50,
      "physicality": 82,
      "setPiece": 83,
      "preferredFormation": "3-4-2-1"
    },
    "keyPlayers": [
      {
        "name": "拉斯穆斯·霍伊伦",
        "club": "Manchester United",
        "rating": 83,
        "role": "FWD",
        "status": "Healthy"
      },
      {
        "name": "克里斯蒂安·埃里克森",
        "club": "Manchester United",
        "rating": 82,
        "role": "MID",
        "status": "Healthy"
      },
      {
        "name": "皮埃尔-埃米尔·霍伊别尔",
        "club": "Marseille",
        "rating": 83,
        "role": "MID",
        "status": "Healthy"
      },
      {
        "name": "卡斯帕·舒梅切尔",
        "club": "凯尔特人",
        "rating": 77,
        "role": "GK",
        "status": "Healthy"
      },
      {
        "name": "约阿希姆·安德森",
        "club": "富勒姆",
        "rating": 80,
        "role": "DEF",
        "status": "Healthy"
      },
      {
        "name": "维克托·内尔森",
        "club": "加拉塔萨雷",
        "rating": 77,
        "role": "DEF",
        "status": "Healthy"
      },
      {
        "name": "莫滕·尤尔曼德",
        "club": "葡萄牙体育",
        "rating": 80,
        "role": "MID",
        "status": "Healthy"
      },
      {
        "name": "米克尔·达姆斯高",
        "club": "布伦特福德",
        "rating": 75,
        "role": "MID",
        "status": "Healthy"
      }
    ],
    "recentForm": [
      {
        "opponent": "瑞士",
        "score": "0 - 0",
        "xg": "0.7 - 0.8",
        "date": "2026-03-23",
        "type": "Friendly",
        "outcome": "D"
      },
      {
        "opponent": "法罗群岛",
        "score": "2 - 0",
        "xg": "1.8 - 0.2",
        "date": "2026-03-26",
        "type": "Friendly",
        "outcome": "W"
      }
    ],
    "strengths": [
      "埃里克森令人惊叹的定位球与传中视野",
      "霍伊伦冲击空间的强硬跑位",
      "战术纪律极强且高度统一的整体"
    ],
    "weaknesses": [
      "面对深位横向反击时回防落位节奏较慢",
      "攻防转换节奏较慢"
    ],
    "injuries": []
  },
  {
    "id": "cote_divoire",
    "name": "科特迪瓦",
    "code": "CIV",
    "confederation": "CAF",
    "group": "K",
    "elo": 1800,
    "coach": {
      "name": "埃梅尔塞·法埃",
      "style": "高能翼卫爆发极速推进，极高物理欺压的中路肌肉长城",
      "experienceYears": 6
    },
    "ratings": {
      "attack": 82,
      "midfield": 82,
      "defense": 78,
      "benchDepth": 79,
      "experience": 81
    },
    "tactics": {
      "possession": 50,
      "pressing": 75,
      "counterAttack": 88,
      "defenseLine": 52,
      "physicality": 89,
      "setPiece": 76,
      "preferredFormation": "4-3-3"
    },
    "keyPlayers": [
      {
        "name": "塞巴斯蒂安·阿莱",
        "club": "莱加内斯",
        "rating": 82,
        "role": "FWD",
        "status": "Healthy"
      },
      {
        "name": "弗兰克·凯西",
        "club": "吉达国民",
        "rating": 83,
        "role": "MID",
        "status": "Healthy"
      },
      {
        "name": "奥斯曼·迪奥曼德",
        "club": "里斯本竞技",
        "rating": 83,
        "role": "DEF",
        "status": "Healthy"
      },
      {
        "name": "叶海亚·福法纳",
        "club": "昂热",
        "rating": 76,
        "role": "GK",
        "status": "Healthy"
      },
      {
        "name": "维尔弗里德·辛戈",
        "club": "摩纳哥",
        "rating": 78,
        "role": "DEF",
        "status": "Healthy"
      },
      {
        "name": "塞卡·福法纳",
        "club": "达曼协作",
        "rating": 80,
        "role": "MID",
        "status": "Healthy"
      },
      {
        "name": "西门·阿丁格拉",
        "club": "布莱顿",
        "rating": 79,
        "role": "FWD",
        "status": "Healthy"
      },
      {
        "name": "杰雷米·博加",
        "club": "尼斯",
        "rating": 78,
        "role": "FWD",
        "status": "Healthy"
      }
    ],
    "recentForm": [
      {
        "opponent": "贝宁",
        "score": "2 - 2",
        "xg": "1.6 - 1.1",
        "date": "2026-03-23",
        "type": "Friendly",
        "outcome": "D"
      },
      {
        "opponent": "乌拉圭",
        "score": "2 - 1",
        "xg": "1.6 - 1.5",
        "date": "2026-03-26",
        "type": "Friendly",
        "outcome": "W"
      }
    ],
    "strengths": [
      "凯西在中路无可阻挡的对抗与球权回收",
      "迪奥曼德极具运动天赋的回追铲断",
      "历史上无可比拟的团队凝聚力"
    ],
    "weaknesses": [
      "面对大范围横向定位球传中时的防守漏洞",
      "前锋线人员储备与板凳深度不足"
    ],
    "injuries": []
  },
  {
    "id": "iraq",
    "name": "伊拉克",
    "code": "IRQ",
    "confederation": "AFC",
    "group": "K",
    "elo": 1620,
    "coach": {
      "name": "赫苏斯·卡萨斯",
      "style": "西班牙式中区密集控球推进，直接砸给空霸中锋",
      "experienceYears": 12
    },
    "ratings": {
      "attack": 72,
      "midfield": 70,
      "defense": 68,
      "benchDepth": 64,
      "experience": 71
    },
    "tactics": {
      "possession": 45,
      "pressing": 55,
      "counterAttack": 81,
      "defenseLine": 45,
      "physicality": 79,
      "setPiece": 75,
      "preferredFormation": "4-2-3-1"
    },
    "keyPlayers": [
      {
        "name": "艾曼·胡赛因",
        "club": "阿尔科尔",
        "rating": 79,
        "role": "FWD",
        "status": "Healthy"
      },
      {
        "name": "阿里·贾西姆",
        "club": "科莫",
        "rating": 78,
        "role": "MID",
        "status": "Healthy"
      },
      {
        "name": "雷宾·苏拉卡",
        "club": "首尔FC",
        "rating": 70,
        "role": "DEF",
        "status": "Healthy"
      },
      {
        "name": "贾拉勒·哈桑",
        "club": "扎瓦拉",
        "rating": 70,
        "role": "GK",
        "status": "Healthy"
      },
      {
        "name": "萨阿德·纳蒂克",
        "club": "空军体育",
        "rating": 68,
        "role": "DEF",
        "status": "Healthy"
      },
      {
        "name": "伊布拉希姆·巴耶什",
        "club": "利雅得体育",
        "rating": 71,
        "role": "MID",
        "status": "Healthy"
      },
      {
        "name": "尤塞夫·阿明",
        "club": "桑德豪森",
        "rating": 70,
        "role": "MID",
        "status": "Healthy"
      },
      {
        "name": "莫哈纳德·阿里",
        "club": "巴格达警察",
        "rating": 70,
        "role": "FWD",
        "status": "Healthy"
      }
    ],
    "recentForm": [
      {
        "opponent": "菲律宾",
        "score": "1 - 0",
        "xg": "1.4 - 0.2",
        "date": "2026-03-21",
        "type": "Qualifier",
        "outcome": "W"
      },
      {
        "opponent": "菲律宾",
        "score": "5 - 0",
        "xg": "3.1 - 0.3",
        "date": "2026-03-26",
        "type": "Qualifier",
        "outcome": "W"
      }
    ],
    "strengths": [
      "艾曼·胡赛因传奇般的空中头槌",
      "科莫球星阿里·贾西姆的进攻发起点",
      "禁区内极强的投入度与拼抢力度"
    ],
    "weaknesses": [
      "面对高防守密度的欧洲球队时经验不足",
      "中路身体对抗下的串联过渡节奏欠佳"
    ],
    "injuries": []
  },
  {
    "id": "croatia",
    "name": "克罗地亚",
    "code": "CRO",
    "confederation": "UEFA",
    "group": "L",
    "elo": 1910,
    "coach": {
      "name": "兹拉特科·达利奇",
      "style": "技术派中场降速完美传控，大赛逆境绝地还击之王",
      "experienceYears": 15
    },
    "ratings": {
      "attack": 79,
      "midfield": 92,
      "defense": 84,
      "benchDepth": 80,
      "experience": 97
    },
    "tactics": {
      "possession": 62,
      "pressing": 60,
      "counterAttack": 75,
      "defenseLine": 45,
      "physicality": 78,
      "setPiece": 76,
      "preferredFormation": "4-3-3"
    },
    "keyPlayers": [
      {
        "name": "卢卡·莫德里奇",
        "club": "皇家马德里",
        "rating": 89,
        "role": "MID",
        "status": "Healthy"
      },
      {
        "name": "马特奥·科瓦契奇",
        "club": "曼城",
        "rating": 85,
        "role": "MID",
        "status": "Healthy"
      },
      {
        "name": "约什科·格瓦迪奥尔",
        "club": "曼城",
        "rating": 90,
        "role": "DEF",
        "status": "Healthy"
      },
      {
        "name": "多米尼克·利瓦科维奇",
        "club": "费内巴切",
        "rating": 81,
        "role": "GK",
        "status": "Healthy"
      },
      {
        "name": "杜热·恰莱塔-卡尔",
        "club": "里昂",
        "rating": 77,
        "role": "DEF",
        "status": "Healthy"
      },
      {
        "name": "马里奥·帕沙利奇",
        "club": "亚特兰大",
        "rating": 80,
        "role": "MID",
        "status": "Healthy"
      },
      {
        "name": "卢卡·苏西奇",
        "club": "皇家社会",
        "rating": 78,
        "role": "MID",
        "status": "Healthy"
      },
      {
        "name": "安德烈·克拉马里奇",
        "club": "霍芬海姆",
        "rating": 80,
        "role": "FWD",
        "status": "Healthy"
      }
    ],
    "recentForm": [
      {
        "opponent": "突尼斯",
        "score": "0 - 0",
        "xg": "1.1 - 0.6",
        "date": "2026-03-23",
        "type": "Friendly",
        "outcome": "D"
      },
      {
        "opponent": "埃及",
        "score": "4 - 2",
        "xg": "2.9 - 1.5",
        "date": "2026-03-26",
        "type": "Friendly",
        "outcome": "W"
      }
    ],
    "strengths": [
      "老将们在杯赛中令人惊叹的沉稳心态",
      "莫德里奇-科瓦契奇的技术化摆脱出球环路",
      "格瓦迪奥尔的多功能防守属性"
    ],
    "weaknesses": [
      "严重缺乏速度极快的精英级边锋",
      "中卫线在攻防转换中反应节奏较慢"
    ],
    "injuries": []
  },
  {
    "id": "saudi_arabia",
    "name": "沙特阿拉伯",
    "code": "KSA",
    "confederation": "AFC",
    "group": "L",
    "elo": 1710,
    "coach": {
      "name": "埃尔韦·雷纳尔",
      "style": "富有极高视觉冲击力的高重心逼抢阵线，极其严明自律的站圈纪律",
      "experienceYears": 18
    },
    "ratings": {
      "attack": 73,
      "midfield": 75,
      "defense": 74,
      "benchDepth": 74,
      "experience": 82
    },
    "tactics": {
      "possession": 48,
      "pressing": 84,
      "counterAttack": 80,
      "defenseLine": 64,
      "physicality": 76,
      "setPiece": 72,
      "preferredFormation": "4-3-3"
    },
    "keyPlayers": [
      {
        "name": "萨利姆·多萨里",
        "club": "利雅得新月",
        "rating": 82,
        "role": "FWD",
        "status": "Healthy"
      },
      {
        "name": "菲拉斯·布赖坎",
        "club": "吉达国民",
        "rating": 78,
        "role": "FWD",
        "status": "Healthy"
      },
      {
        "name": "沙特·阿卜杜勒哈米德",
        "club": "罗马（AS 罗马）",
        "rating": 81,
        "role": "DEF",
        "status": "Healthy"
      },
      {
        "name": "穆罕默德·奥韦斯",
        "club": "利雅得新月",
        "rating": 73,
        "role": "GK",
        "status": "Healthy"
      },
      {
        "name": "阿里·布莱希",
        "club": "利雅得新月",
        "rating": 72,
        "role": "DEF",
        "status": "Healthy"
      },
      {
        "name": "穆罕默德·卡努",
        "club": "利雅得新月",
        "rating": 74,
        "role": "MID",
        "status": "Healthy"
      },
      {
        "name": "阿卜杜勒拉赫曼·加里卜",
        "club": "利雅得胜利",
        "rating": 73,
        "role": "FWD",
        "status": "Healthy"
      },
      {
        "name": "哈桑·坦巴蒂",
        "club": "利雅得新月",
        "rating": 72,
        "role": "DEF",
        "status": "Healthy"
      }
    ],
    "recentForm": [
      {
        "opponent": "塔吉克斯坦",
        "score": "1 - 0",
        "xg": "1.2 - 0.4",
        "date": "2026-03-21",
        "type": "Qualifier",
        "outcome": "W"
      },
      {
        "opponent": "塔吉克斯坦",
        "score": "1 - 1",
        "xg": "0.9 - 0.8",
        "date": "2026-03-26",
        "type": "Qualifier",
        "outcome": "D"
      }
    ],
    "strengths": [
      "埃尔韦·雷纳尔令人惊叹的精神动员体系",
      "边路极佳的默契与速度（达瓦萨里）",
      "罗马节奏的沙特·阿卜杜勒哈米德横向跑动"
    ],
    "weaknesses": [
      "高位越位陷阱具有极高风险",
      "缺乏身材高大、身体对抗占优的中后卫"
    ],
    "injuries": []
  },
  {
    "id": "morocco",
    "name": "摩洛哥",
    "code": "MAR",
    "confederation": "CAF",
    "group": "L",
    "elo": 1920,
    "coach": {
      "name": "瓦利德·雷格拉吉",
      "style": "刚健紧闭的低位高阻严密布控，顶级翼卫飞人攻守大反弹",
      "experienceYears": 10
    },
    "ratings": {
      "attack": 84,
      "midfield": 84,
      "defense": 88,
      "benchDepth": 82,
      "experience": 89
    },
    "tactics": {
      "possession": 46,
      "pressing": 65,
      "counterAttack": 92,
      "defenseLine": 40,
      "physicality": 82,
      "setPiece": 79,
      "preferredFormation": "4-3-3"
    },
    "keyPlayers": [
      {
        "name": "阿什拉夫·哈基米",
        "club": "巴黎圣日耳曼",
        "rating": 90,
        "role": "DEF",
        "status": "Healthy"
      },
      {
        "name": "卜拉欣·迪亚斯",
        "club": "皇家马德里",
        "rating": 86,
        "role": "MID",
        "status": "Healthy"
      },
      {
        "name": "亚辛·布努",
        "club": "利雅得新月",
        "rating": 86,
        "role": "GK",
        "status": "Healthy"
      },
      {
        "name": "努萨尔·马兹拉维",
        "club": "曼联",
        "rating": 81,
        "role": "DEF",
        "status": "Healthy"
      },
      {
        "name": "纳耶夫·阿格尔德",
        "club": "皇家社会",
        "rating": 80,
        "role": "DEF",
        "status": "Healthy"
      },
      {
        "name": "阿扎丁·奥纳希",
        "club": "帕纳辛奈科斯",
        "rating": 79,
        "role": "MID",
        "status": "Healthy"
      },
      {
        "name": "索菲扬·阿姆拉巴特",
        "club": "费内巴切",
        "rating": 80,
        "role": "MID",
        "status": "Healthy"
      },
      {
        "name": "阿尤布·卡比",
        "club": "奥林匹亚科斯",
        "rating": 79,
        "role": "FWD",
        "status": "Healthy"
      }
    ],
    "recentForm": [
      {
        "opponent": "安哥拉",
        "score": "1 - 0",
        "xg": "1.4 - 0.4",
        "date": "2026-03-22",
        "type": "Friendly",
        "outcome": "W"
      },
      {
        "opponent": "毛里塔尼亚",
        "score": "0 - 0",
        "xg": "0.9 - 0.5",
        "date": "2026-03-26",
        "type": "Friendly",
        "outcome": "D"
      }
    ],
    "strengths": [
      "由哈基米统帅引导的、几乎冠称本届世界第一的两翼高速转守反击直刺两底线的极度致命翼卫突破推进力",
      "由莫洛哥主教练主帅精密雕看、几乎一滴水都不漏的顶级摩洛哥低位铁壁后防扫防阻网",
      "球门前拥有在世界段大站、点球拉锯时在世界上堪称一神级的点球终结屏障守护神布努"
    ],
    "weaknesses": [
      "在对方前场高节奏逼抢下容易陷入局部控球停滞、低效推进",
      "过度倾斜和依赖边路高速起爆直刺"
    ],
    "injuries": []
  },
  {
    "id": "uzbekistan",
    "name": "乌兹别克斯坦",
    "code": "UZB",
    "confederation": "AFC",
    "group": "L",
    "elo": 1680,
    "coach": {
      "name": "斯雷奇科·卡塔内茨",
      "style": "防守强悍稳固大线站，精纯大单脚前插连锋线出击",
      "experienceYears": 24
    },
    "ratings": {
      "attack": 77,
      "midfield": 72,
      "defense": 71,
      "benchDepth": 67,
      "experience": 72
    },
    "tactics": {
      "possession": 42,
      "pressing": 55,
      "counterAttack": 83,
      "defenseLine": 42,
      "physicality": 81,
      "setPiece": 79,
      "preferredFormation": "3-4-1-2"
    },
    "keyPlayers": [
      {
        "name": "埃尔多尔·肖穆罗多夫",
        "club": "罗马",
        "rating": 81,
        "role": "FWD",
        "status": "Healthy"
      },
      {
        "name": "阿博斯贝克·法伊祖拉耶夫",
        "club": "莫斯科陆军",
        "rating": 79,
        "role": "MID",
        "status": "Healthy"
      },
      {
        "name": "鲁斯塔姆·阿舒尔马托夫",
        "club": "喀山红宝石",
        "rating": 71,
        "role": "DEF",
        "status": "Healthy"
      },
      {
        "name": "乌特基尔·优素福夫",
        "club": "胡齐斯坦钢铁",
        "rating": 69,
        "role": "GK",
        "status": "Healthy"
      },
      {
        "name": "胡桑·胡萨诺夫",
        "club": "朗斯",
        "rating": 74,
        "role": "DEF",
        "status": "Healthy"
      },
      {
        "name": "奥塔贝克·舒库罗夫",
        "club": "费哈",
        "rating": 72,
        "role": "MID",
        "status": "Healthy"
      },
      {
        "name": "奥斯顿·乌鲁诺夫",
        "club": "波斯波利斯",
        "rating": 72,
        "role": "FWD",
        "status": "Healthy"
      },
      {
        "name": "伊戈尔·谢尔盖耶夫",
        "club": "巴吞联",
        "rating": 70,
        "role": "FWD",
        "status": "Healthy"
      }
    ],
    "recentForm": [
      {
        "opponent": "中国香港",
        "score": "2 - 0",
        "xg": "1.8 - 0.2",
        "date": "2026-03-21",
        "type": "Qualifier",
        "outcome": "W"
      },
      {
        "opponent": "中国香港",
        "score": "3 - 0",
        "xg": "2.3 - 0.3",
        "date": "2026-03-26",
        "type": "Qualifier",
        "outcome": "W"
      }
    ],
    "strengths": [
      "肖穆罗多夫作为罗马神将、具备世界一档、无与伦比的身背人拿球支点跟门前暴力起重头球/硬砸终结威压",
      "法伊祖拉耶夫那在莫斯科陆军锤炼、具有风驰电掣步频、在极小极其窄小半肋部中可以起跳闪开对手防线的顶级持球技术",
      "纪律感和协同意识高昂、坚守大防线蹲底平推的刚硬后卫团队组合"
    ],
    "weaknesses": [
      "防守后场缺乏高韧度、高厚度后腰扫尾替补屏障",
      "边路防区在面临高速横向转移和大范围斜拉时偶有盯人失锁"
    ],
    "injuries": []
  }
];

export const seedSystemLogs: SystemLog[] = [
  {
    "id": "log_1",
    "timestamp": "2026-06-08T10:14:02Z",
    "source": "Opta数据输入引擎",
    "type": "crawler",
    "message": "成功同步欧洲/南美国家队世界杯预选赛中全场 xG 及控球比参数，共对齐 48 强基础参数。",
    "confidenceScore": 98,
    "status": "Synced"
  },
  {
    "id": "log_2",
    "timestamp": "2026-06-08T11:22:45Z",
    "source": "Transfermarkt 伤情接口 API",
    "type": "injury",
    "message": "检测到美国队泰勒·亚当斯的新腘绳肌受伤预警。预计影响：美国队中场防守覆盖率下降8%。",
    "confidenceScore": 95,
    "status": "Cleaned"
  },
  {
    "id": "log_3",
    "timestamp": "2026-06-08T12:05:10Z",
    "source": "Sofascore数据分析网关",
    "type": "crawler",
    "message": "报告了埃尔多尔·肖穆罗多夫俱乐部归属（罗马 vs 卡利亚里）的评分不匹配。冲突已根据意甲官方名单解决。",
    "confidenceScore": 90,
    "status": "Conflict Resolved"
  },
  {
    "id": "log_4",
    "timestamp": "2026-06-08T13:48:58Z",
    "source": "战术智慧分析分析仪",
    "type": "analysis",
    "message": "全盘重算 48 队 ELO 计算曲线并代入 1000 回赛事预测，因格子军卫防线高龄红利退潮，克罗地亚比率微下修。",
    "confidenceScore": 92,
    "status": "Synced"
  }
];
