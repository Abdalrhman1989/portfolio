import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  FileText,
  Gamepad2,
  Goal,
  Layers3,
  Lightbulb,
  PlayCircle,
  RefreshCcw,
  Users,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Making Games Study Hub | Autumn 2026",
  description:
    "Beginner-friendly study hub for Making Games Autumn 2026 lectures from August 24 to September 4.",
};

const lectures = [
  {
    date: "August 24",
    title: "Intro Lecture",
    focus: "Course mindset, prototypes, players, teamwork, and what a game wants to be.",
    learn: [
      "The course is practice-oriented: you learn by making games, testing them, and improving them.",
      "Making a game is not only coding. It also includes design, teamwork, planning, testing, and communication.",
      "A prototype is a small playable experiment, not a perfect final game.",
      "A good process matters more than making an amazing game at the beginning.",
    ],
    remember:
      "Ask: who is the player, what does the game want to become, and what resources do I have?",
  },
  {
    date: "August 28",
    title: "Design Lecture + Exercises",
    focus: "Game design language: mechanics, goals, rules, challenge, progression, and gates.",
    learn: [
      "A mechanic is usually an action the player can do, such as drop, catch, move, trade, jump, or guess.",
      "A core mechanic is the repeated action that gives the game its identity.",
      "A goal tells the player what they are trying to achieve.",
      "Challenge makes the goal meaningful, but the difficulty should fit the player.",
      "Progression is how the game changes over time: player skill, abilities, levels, story, resources, or choices.",
    ],
    remember:
      "Explain a game by saying: the player does X, to reach Y, but Z makes it difficult.",
  },
  {
    date: "August 31",
    title: "Roles + Prototype 1 Intro",
    focus: "Game development roles and the physical two-player prototype assignment.",
    learn: [
      "Game Designer: Systems works with rules, mechanics, balance, and game logic.",
      "Game Designer: Experience focuses on player feeling, usability, controls, UI, and playtesting.",
      "Producer organizes time, tasks, milestones, communication, and team health.",
      "Programmers and tech leads build and organize the technical systems.",
      "Prototype 1 must be physical and analog, exactly two players, funny, and radically simple.",
    ],
    remember:
      "For Prototype 1, keep it tiny: one repeated action, clear scoring, fast play, and easy rules.",
  },
  {
    date: "September 4",
    title: "Prototype 1 Playtesting + Game Loop",
    focus: "Testing prototypes and drawing gameplay loops.",
    learn: [
      "Playtesting means watching real people try your game and noticing what works or confuses them.",
      "A gameplay loop shows what the player repeatedly does, what reward or result happens, and what they do next.",
      "Loops help designers see how mechanics, rewards, outcomes, and player choices connect.",
      "If one part of a loop changes, other parts of the game may change too.",
    ],
    remember:
      "For Cup Catch: drop paper ball -> try to catch -> score or miss -> switch roles -> repeat.",
  },
];

const terms = [
  ["Mechanic", "An action the player can do inside the rules of the game."],
  ["Core Mechanic", "The main repeated action that defines the game."],
  ["Rule", "What players can and cannot do."],
  ["Goal", "What the player is trying to achieve."],
  ["Challenge", "What makes the goal difficult or interesting."],
  ["Progression", "How the game changes over time."],
  ["Game Loop", "The repeated cycle of action, result, reward, and next action."],
  ["Playtesting", "Letting people play so you can learn from their behavior and feedback."],
  ["Design Pillars", "Short principles that guide design decisions."],
  ["Player Experience", "What the player feels, understands, and does during play."],
];

const roles = [
  ["Systems Designer", "Designs rules, mechanics, balance, and how the game works."],
  ["Experience Designer", "Checks if the game feels good and is understandable for players."],
  ["Producer", "Keeps the team organized, healthy, and on schedule."],
  ["Programmer", "Builds the game systems and makes them work."],
  ["Tech Lead", "Guides technical choices, code structure, and build process."],
  ["Artist", "Creates visual style, assets, characters, environments, and UI."],
  ["Sound Designer", "Creates sound effects, music, and audio mood."],
  ["Narrative Designer", "Works on story, dialogue, choices, and text."],
  ["QA / Tester", "Finds bugs and checks if the game behaves correctly."],
];

const cupCatchLoop = [
  "Prepare cup and paper ball",
  "Dropper drops the ball",
  "Catcher tries to catch",
  "Score 1 point or 0 points",
  "Players switch roles",
  "Repeat until someone reaches 5 points",
];

const studySlides = [
  {
    number: "01",
    title: "Course Mindset",
    tag: "Aug 24",
    point:
      "The course teaches process: make small games, test them, learn from players, and improve.",
    visual: ["Player", "Prototype", "Feedback"],
  },
  {
    number: "02",
    title: "Design Language",
    tag: "Aug 28",
    point:
      "Use clear words: mechanic, rule, goal, challenge, progression, player experience, and loop.",
    visual: ["Mechanic", "Goal", "Progression"],
  },
  {
    number: "03",
    title: "Game Teams",
    tag: "Aug 31",
    point:
      "Games are made by roles working together: designers, producers, programmers, artists, sound, writing, QA.",
    visual: ["Roles", "Team", "Communication"],
  },
  {
    number: "04",
    title: "Game Loops",
    tag: "Sep 4",
    point:
      "A loop shows what the player repeatedly does and how actions connect to outcomes and rewards.",
    visual: ["Action", "Outcome", "Repeat"],
  },
];

const materials = [
  {
    day: "August 24",
    items: [
      "Intro Slides - Rego",
      "MakingGamesIntro_24082026",
      "Course structure, prototypes, expectations, players, resources, and vocabulary.",
    ],
  },
  {
    day: "August 28",
    items: [
      "MakingGamesGameDesignTerminology_28082026",
      "Greg Costikyan - I Have No Words & I Must Design",
      "Priscilla Lo et al. - What is a game mechanic?",
      "Anna Anthropy and Naomi Clark - Verbs and objects",
      "Game Maker's Toolkit - How to Think Like a Game Designer",
      "Adam Millard - Leveling Up Progression Systems",
    ],
  },
  {
    day: "August 31",
    items: [
      "Roles in Game Development lecture",
      "Tracy Fullerton - Game Design Workshop, Team Structures",
      "Prototype 1 Intro",
      "Design pillars: physical, two-player, laugh-out-loud, radically simple.",
    ],
  },
  {
    day: "September 4",
    items: [
      "Prototype 1 Playtesting & Showcase",
      "MakingGames2026_GameLoops_04092026",
      "Recommended reading: Emmanuel Guardiola on gameplay loops",
      "Exercise: draw your Prototype 1 gameplay loop and explain it to another person.",
    ],
  },
];

const gameLoopExamples = [
  ["Pac-Man", "Move through maze", "Eat pellets", "Avoid ghosts", "Clear maze / chase score"],
  ["Papers, Please", "Inspect document", "Compare rules", "Approve or deny", "Earn money / face consequence"],
  ["Hay Day", "Plant crops", "Wait / harvest", "Produce goods", "Sell / upgrade farm"],
  ["Animal Crossing", "Explore town", "Collect items", "Decorate / talk", "Return tomorrow"],
  ["Cup Catch", "Drop ball", "Try to catch", "Score or miss", "Switch roles and repeat"],
];

const readingNotes = [
  {
    title: "Costikyan - Critical Vocabulary for Games",
    type: "Reading",
    notes: [
      "Do not use vague words like gameplay without explaining what creates it.",
      "Games need interaction, goals, struggle, structure, and meaning inside the game.",
      "A game is interesting because the player tries to achieve something under rules and obstacles.",
    ],
  },
  {
    title: "Lo et al. - What Is A Game Mechanic?",
    type: "Reading",
    notes: [
      "Game mechanic is a difficult term, and different people define it differently.",
      "For class, think of mechanics as player actions allowed by rules.",
      "Describe mechanics as small verbs, not broad genres or stories.",
    ],
  },
  {
    title: "Anthropy & Clark - Verbs And Objects",
    type: "Reading",
    notes: [
      "A useful way to design is: what verbs can the player do, and what objects do those verbs affect?",
      "Example: catch paper ball, drop paper ball, switch roles, score point.",
      "This helps you describe a game clearly even if you are not a gamer.",
    ],
  },
  {
    title: "Game Maker's Toolkit - Think Like A Game Designer",
    type: "Video",
    notes: [
      "Look at games by asking why design choices work.",
      "Break a game into actions, rules, feedback, goals, and player decisions.",
      "Design is not just having ideas; it is testing why an idea creates an experience.",
    ],
  },
  {
    title: "Adam Millard - Progression Systems",
    type: "Video",
    notes: [
      "Progression is more than numbers going up.",
      "Good progression can give new choices, new mastery, new areas, or new understanding.",
      "Progression should keep the player engaged without overwhelming them.",
    ],
  },
  {
    title: "Fullerton - Team Structures",
    type: "Reading",
    notes: [
      "Game teams need different roles and clear responsibilities.",
      "Designers must communicate with producers, programmers, artists, QA, and others.",
      "Inclusive teamwork matters because good ideas can come from anywhere in the team.",
    ],
  },
  {
    title: "Guardiola - Gameplay Loop",
    type: "Recommended",
    notes: [
      "A gameplay loop models repeated player activity.",
      "It helps designers understand what the player does again and again.",
      "Use loops to explain how mechanics connect to outcomes and motivation.",
    ],
  },
];

const beginnerRoadmap = [
  {
    title: "1. Understand The Game As Actions",
    body:
      "Do not begin with story, graphics, or whether you are a gamer. Begin with the player action. In Cup Catch the actions are drop, catch, switch, and count points.",
  },
  {
    title: "2. Connect Actions To Rules",
    body:
      "A rule gives shape to the action. For example: the ball must be dropped from shoulder height, the catcher may only use the cup, and players switch after every drop.",
  },
  {
    title: "3. Add A Goal And Challenge",
    body:
      "The goal is to reach 5 points. The challenge is timing, hand-eye coordination, and the uncertainty of the falling paper ball.",
  },
  {
    title: "4. Explain The Loop",
    body:
      "A loop is the repeated pattern of play. Cup Catch repeats: prepare, drop, catch or miss, score, switch, and try again.",
  },
];

const deepLectureDetails = [
  {
    day: "August 24",
    title: "Intro Lecture",
    blocks: [
      {
        heading: "What The Course Is Really About",
        body:
          "The course is not only about playing games. It is about learning how games are made: how ideas become prototypes, how players react, how teams communicate, and how designers improve a game through feedback.",
      },
      {
        heading: "Prototype Thinking",
        body:
          "A prototype is a small test version of an idea. It does not need to look finished. Its job is to answer a question, such as: is this mechanic fun, clear, too easy, too hard, or confusing?",
      },
      {
        heading: "Player, Game, Resources",
        body:
          "A game always has players, rules, actions, goals, limits, materials, and time. Resources can be physical objects, player attention, team time, money, skills, or information.",
      },
      {
        heading: "What You Should Take From It",
        body:
          "You are allowed to start simple. Your first job is to make something playable, observe people using it, and learn how to talk about why it works or does not work.",
      },
    ],
    say:
      "I understand the course as a making-and-testing course. A prototype is not a final game; it is a small experiment that teaches us something.",
  },
  {
    day: "August 28",
    title: "Design Lecture + Exercises",
    blocks: [
      {
        heading: "Game Mechanics",
        body:
          "A mechanic is something the player can do inside the rules. Use simple verbs: move, jump, trade, choose, drop, catch, block, collect, inspect, combine, talk, or build.",
      },
      {
        heading: "Core Mechanics",
        body:
          "The core mechanic is the action the player repeats most and remembers the game for. In Pac-Man it is moving through a maze while eating pellets and avoiding ghosts. In Cup Catch it is trying to catch the falling paper ball.",
      },
      {
        heading: "Goals And Challenge",
        body:
          "A goal gives the player direction. Challenge makes the goal interesting. If there is no challenge, the action can feel pointless. If the challenge is too high, the player may feel lost or frustrated.",
      },
      {
        heading: "Progression",
        body:
          "Progression means the game changes over time. It can be harder levels, new abilities, new rules, more pressure, better player skill, new information, or a change in strategy.",
      },
    ],
    say:
      "A clear way to explain a game is: the player does an action, under rules, toward a goal, while facing a challenge.",
  },
  {
    day: "August 31",
    title: "Roles In Game Development + Prototype 1",
    blocks: [
      {
        heading: "Why Roles Matter",
        body:
          "Games are made by teams because a game needs many kinds of work: rules, code, art, sound, planning, writing, testing, and communication. A role means responsibility, not superiority.",
      },
      {
        heading: "Design Roles",
        body:
          "Systems designers care about rules, balance, numbers, and mechanics. Experience designers care about how the player feels, understands, learns, and moves through the game.",
      },
      {
        heading: "Production Roles",
        body:
          "A producer helps the team decide what to do now, what can wait, who is responsible, and whether the team is using time realistically. This is especially important in student projects.",
      },
      {
        heading: "Prototype 1 Constraints",
        body:
          "Prototype 1 is physical, analog, exactly two players, laugh-out-loud, and radically simple. These limits are helpful because they force you to focus on one clear playable idea.",
      },
    ],
    say:
      "The constraints helped me make Cup Catch simple: two players, one cup, one paper ball, clear scoring, and a repeated loop.",
  },
  {
    day: "September 4",
    title: "Playtesting, Showcase, And Game Loop",
    blocks: [
      {
        heading: "Playtesting",
        body:
          "Playtesting means letting real people play and watching carefully. You look for confusion, boredom, laughter, tension, unfairness, unclear rules, and moments where the game becomes interesting.",
      },
      {
        heading: "Game Loop",
        body:
          "A game loop is the repeated cycle of player activity. It shows what the player does, what result happens, what feedback they receive, and why they want to continue.",
      },
      {
        heading: "Why Loops Are Useful",
        body:
          "Loops help you see the whole system. If you change one rule, the difficulty, score, rhythm, and feeling can all change. Designers use loops to understand cause and effect.",
      },
      {
        heading: "Cup Catch Loop",
        body:
          "Cup Catch has a very clean loop: prepare, drop, catch or miss, score, switch, repeat. Because the loop is short, players understand the game quickly.",
      },
    ],
    say:
      "My game loop is short on purpose. The player immediately understands the action, result, and next turn.",
  },
];

const teacherAnswers = [
  [
    "What is your core mechanic?",
    "The core mechanic is catching a falling paper ball with a cup. The game repeats this action many times.",
  ],
  [
    "What are the rules?",
    "Two players stand close. One drops the paper ball from shoulder height. The other catches with a cup. Catch gives 1 point. Miss gives 0. Players switch roles after each drop.",
  ],
  [
    "What is the goal?",
    "The goal is to be the first player to reach 5 points.",
  ],
  [
    "Where is the challenge?",
    "The challenge is timing the cup correctly, reacting quickly, and judging the paper ball's fall.",
  ],
  [
    "What is the game loop?",
    "Prepare cup and paper ball, drop, try to catch, score or miss, switch roles, repeat.",
  ],
  [
    "Why is it a good Prototype 1 game?",
    "It is analog, two-player, simple, fast to learn, easy to test, and funny when people almost catch the ball.",
  ],
];

const cupCatchExplain = [
  ["Materials", "One cup and one small paper ball."],
  ["Players", "Exactly two players: one Dropper and one Catcher."],
  ["Time", "A round takes only a few seconds, so players get many attempts."],
  ["Feedback", "The feedback is immediate: the ball is either inside the cup or not."],
  ["Fairness", "Players switch roles after every drop so both players get the same chance."],
  ["Difficulty Tuning", "Make it easier by standing closer. Make it harder by standing farther away."],
];

const fullTeachingPack = [
  {
    day: "August 24",
    lecture: "Intro Lecture",
    subjects: [
      {
        name: "Games Business Today",
        simple:
          "Many people can make games now because tools are easier, but this also means there is strong competition. A game being good is not always enough; teams also need planning, testing, communication, and understanding of players.",
        example:
          "A simple mobile game may compete with thousands of other games, so the team must know who it is for and why someone would play it.",
      },
      {
        name: "Course Goals",
        simple:
          "The course teaches you to work with players, work with teammates, organize development, use resources wisely, and understand what your game wants to become.",
        example:
          "For Cup Catch, the game wants to be fast, physical, funny, and easy to learn. That tells you not to add complicated rules.",
      },
      {
        name: "Good Process Before Good Game",
        simple:
          "At the beginning, the teachers care a lot about process. This means making, testing, learning, changing, and explaining your choices. You do not need to make the best game in the class.",
        example:
          "If a playtester says the distance is too hard, you can change the distance. That is good process.",
      },
      {
        name: "Course Structure",
        simple:
          "Before autumn break, you make several small prototypes. After autumn break, you work in teams on a bigger project with supervision, workshops, guest lectures, playtesting, and showcases.",
        example:
          "Prototype 1 is physical. Later prototypes use tools such as Twine, PuzzleScript, Playdate, or larger engines.",
      },
      {
        name: "Resources",
        simple:
          "Resources are not only money. They include time, skill, technology, team energy, materials, teacher feedback, and what you personally want to learn.",
        example:
          "Cup Catch uses very few resources: one cup, paper, two players, and a few minutes of testing.",
      },
      {
        name: "Designer Vocabulary",
        simple:
          "The class started building a shared language. This matters because designers need words to explain games clearly instead of only saying fun, boring, or good gameplay.",
        example:
          "Instead of saying Cup Catch is fun, say the short loop creates quick tension and immediate feedback.",
      },
    ],
    exercise:
      "Students thought alone, discussed in pairs or groups, and shared expectations and game design terms with the class.",
    mustKnow:
      "You are not expected to already know everything. The point is to learn by making and by speaking clearly about design.",
  },
  {
    day: "August 28",
    lecture: "Design Lecture + Exercises",
    subjects: [
      {
        name: "Mechanics",
        simple:
          "A mechanic is an action the player can do because the rules allow it. Good mechanic words are verbs: move, jump, choose, inspect, drop, catch, score, trade, collect.",
        example:
          "Cup Catch mechanics are drop, catch, switch roles, and score points.",
      },
      {
        name: "Core Mechanics",
        simple:
          "A core mechanic is the main repeated action. It is what the player does again and again, and it gives the game its identity.",
        example:
          "In Cup Catch, catching the falling ball with the cup is the core mechanic.",
      },
      {
        name: "Rules",
        simple:
          "Rules define what is allowed, what is forbidden, and how the game reacts. Rules make the mechanic understandable and fair.",
        example:
          "The ball must be dropped from shoulder height, and the catcher can only use the cup.",
      },
      {
        name: "Goals",
        simple:
          "A goal tells the player what they are trying to achieve. Without a goal, the player may not know why they are acting.",
        example:
          "The goal in Cup Catch is to be the first player to reach 5 points.",
      },
      {
        name: "Challenge And Flow",
        simple:
          "Challenge is what makes the goal difficult. Flow happens when the challenge is not too easy and not too hard, so the player feels focused and involved.",
        example:
          "If players stand too close, Cup Catch becomes too easy. If they stand too far, it becomes frustrating.",
      },
      {
        name: "Progression And Gates",
        simple:
          "Progression means the game changes over time. A gate is something that blocks progress until the player does something, learns something, gets a resource, or reaches a condition.",
        example:
          "In Cup Catch, simple progression can be rounds getting harder by increasing distance after each point.",
      },
      {
        name: "Verbs And Objects",
        simple:
          "A clear design method is to ask: what verbs can the player do, and what objects do those verbs affect?",
        example:
          "Verb: catch. Object: paper ball. Tool: cup. Result: point or miss.",
      },
    ],
    exercise:
      "The class practiced using terminology to describe games. The important habit is explaining what the player does and how rules create experience.",
    mustKnow:
      "Do not explain only story or theme. Explain player action, goal, challenge, feedback, and loop.",
  },
  {
    day: "August 31",
    lecture: "Roles In Game Development + Prototype 1 Intro",
    subjects: [
      {
        name: "Game Designer: Systems",
        simple:
          "This role protects the rule system. They think about mechanics, balance, game logic, progression, and whether the game works as a system.",
        example:
          "For Cup Catch, a systems designer decides score limit, distance, switching rule, and difficulty.",
      },
      {
        name: "Game Designer: Experience",
        simple:
          "This role protects player experience. They care about feeling, clarity, controls, UI, accessibility, testing, and whether players understand what to do.",
        example:
          "For Cup Catch, an experience designer watches if players laugh, understand the rules, and feel the distance is fair.",
      },
      {
        name: "Producer",
        simple:
          "The producer protects time and teamwork. They schedule tasks, keep milestones realistic, support team health, and make sure people deliver.",
        example:
          "For Prototype 1, a producer would make sure the rules text, playtest, image, and submission are finished before Friday.",
      },
      {
        name: "Programmer And Tech Lead",
        simple:
          "Programmers build systems. Tech leads guide technical decisions, code structure, tools, builds, and the development pipeline. For analog Prototype 1, these roles matter less, but later they become central.",
        example:
          "In a digital version of Cup Catch, programmers would code falling physics, scoring, input, and reset.",
      },
      {
        name: "Secondary Roles",
        simple:
          "Other roles include level designer, artist, sound designer, composer, narrative designer, writer, QA tester, localization, marketing, and more.",
        example:
          "Even Cup Catch could use a visual designer for a clean rules sheet and a tester for finding unclear rules.",
      },
      {
        name: "Team Structures",
        simple:
          "A team works better when responsibilities are clear, communication is regular, and everyone understands how their work affects others.",
        example:
          "Changing a rule affects testing, writing, player experience, and maybe production timing.",
      },
      {
        name: "Design Constraints",
        simple:
          "Constraints are limits that help creativity. If everything is possible, it is easy to get lost. Prototype 1 gives strong limits so you can focus.",
        example:
          "Physical, analog, exactly two players, funny, and radically simple are constraints that led to Cup Catch.",
      },
      {
        name: "Design Pillars",
        simple:
          "Design pillars are short principles that guide decisions. They help you decide what belongs in the game and what should be removed.",
        example:
          "If a new Cup Catch rule is not simple, physical, two-player, or funny, you probably remove it.",
      },
    ],
    exercise:
      "The lecture connected roles to later course work, then introduced Prototype 1 and its design pillars.",
    mustKnow:
      "A role is a responsibility. A design pillar is a decision guide. A constraint can help creativity.",
  },
  {
    day: "September 4",
    lecture: "Prototype 1 Playtesting + Showcase + Game Loop",
    subjects: [
      {
        name: "Unsupervised Playtesting",
        simple:
          "Playtesting is when real people try your game. Your job is to observe what they do, where they hesitate, what they enjoy, and what rule they misunderstand.",
        example:
          "If players in Cup Catch keep asking how far apart to stand, the rules need a clearer distance.",
      },
      {
        name: "Showcase",
        simple:
          "A showcase is a chance to share the prototype, not to prove it is perfect. You can explain the idea, let people play, and learn from their reactions.",
        example:
          "You can say: this is a very small physical reaction game about catching a falling paper ball with a cup.",
      },
      {
        name: "Core Gameplay Loop",
        simple:
          "A gameplay loop shows the repeated player activity: action, result, feedback, reward, and next action.",
        example:
          "Cup Catch: prepare, drop, catch or miss, score, switch, repeat.",
      },
      {
        name: "Why Loops Help Designers",
        simple:
          "Loops show how game parts connect. If you change one part, the rest can change too. This helps you predict design problems.",
        example:
          "If catching gives 2 points instead of 1, the game becomes shorter and maybe less fair.",
      },
      {
        name: "Examples From The Lecture",
        simple:
          "Pac-Man, Papers Please, Hay Day, Animal Crossing, and Sushi Hands show that very different games can still be explained as loops.",
        example:
          "Pac-Man loops movement, eating, avoiding, and clearing. Hay Day loops planting, waiting, harvesting, producing, and upgrading.",
      },
      {
        name: "Loop Exercise",
        simple:
          "The class exercise was to draw the gameplay loop of Prototype 1 and show it to another person to see if it makes sense.",
        example:
          "Draw Cup Catch as six boxes with arrows: prepare -> drop -> catch/miss -> score -> switch -> repeat.",
      },
    ],
    exercise:
      "Draw your Prototype 1 gameplay loop on paper, explain it to one person, listen to their comments, and improve the drawing or rules.",
    mustKnow:
      "A loop is not decoration. It is a practical tool for understanding what players repeatedly do.",
  },
];

const studyMethods = [
  [
    "Before Class",
    "Read the lecture card, learn the key words, and prepare one simple sentence you can say out loud.",
  ],
  [
    "During Exercises",
    "Focus on the action. Ask what the player does, what the rule is, and what feedback they receive.",
  ],
  [
    "When You Are Nervous",
    "Use Cup Catch as your safe example. It is simple enough to explain every major term.",
  ],
  [
    "After Class",
    "Write three notes: one new term, one example, and one question you still have.",
  ],
];

const conceptMap = [
  ["Player", "The person taking action"],
  ["Mechanic", "The action they can do"],
  ["Rule", "The limit around the action"],
  ["Goal", "The reason to act"],
  ["Challenge", "The difficulty or obstacle"],
  ["Feedback", "The result the player sees or feels"],
  ["Loop", "The repeated cycle of action and result"],
];

const sourceLinks = [
  [
    "August 24 section",
    "https://learnit.itu.dk/course/section.php?id=170413",
    "Intro lecture, Rego intro slides, course structure, expectations, prototypes, and design vocabulary.",
  ],
  [
    "August 28 section",
    "https://learnit.itu.dk/course/section.php?id=170414",
    "Design terminology, mechanics, goals, challenge, progression, readings, and videos.",
  ],
  [
    "August 31 section",
    "https://learnit.itu.dk/course/section.php?id=170415",
    "Roles in game development, Fullerton team structures, and Prototype 1 intro.",
  ],
  [
    "September 4 section",
    "https://learnit.itu.dk/course/section.php?id=170416",
    "Prototype 1 playtesting, showcase, and game loop lecture.",
  ],
];

export default function MakingGamesPage() {
  return (
    <main className="min-h-screen bg-[#0b0d10] text-slate-100">
      <section className="relative overflow-hidden border-b border-white/10 px-6 pb-12 pt-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(20,184,166,0.18),transparent_30%),radial-gradient(circle_at_80%_10%,rgba(245,158,11,0.14),transparent_28%)]" />
        <div className="relative mx-auto max-w-6xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-teal-300/25 bg-teal-300/10 px-3 py-1 text-sm text-teal-100">
            <Gamepad2 className="h-4 w-4" />
            Making Games Autumn 2026
          </div>
          <h1 className="max-w-4xl text-4xl font-bold leading-tight tracking-normal text-white md:text-6xl">
            Study Hub From Intro To Game Loops
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            A simple guide for the lectures you missed: what each class was about,
            the important words, the roles in a game team, and your Prototype 1
            game, Cup Catch.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {lectures.map((lecture) => (
              <a
                key={lecture.date}
                href={`#${lecture.date.toLowerCase().replace(" ", "-")}`}
                className="rounded-lg border border-white/10 bg-white/[0.06] p-4 transition hover:border-teal-300/45 hover:bg-white/[0.09]"
              >
                <p className="text-sm text-teal-200">{lecture.date}</p>
                <p className="mt-1 font-semibold text-white">{lecture.title}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 flex items-center gap-3">
            <PlayCircle className="h-6 w-6 text-amber-300" />
            <h2 className="text-3xl font-bold text-white">Visual Lecture Slides</h2>
          </div>
          <div className="grid gap-5 lg:grid-cols-4">
            {studySlides.map((slide) => (
              <article
                key={slide.number}
                className="min-h-[300px] rounded-lg border border-white/10 bg-white/[0.06] p-5 shadow-2xl shadow-black/20"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="text-4xl font-black text-white/15">{slide.number}</span>
                  <span className="rounded-full bg-amber-300/15 px-3 py-1 text-xs font-semibold text-amber-100">
                    {slide.tag}
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-bold text-white">{slide.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{slide.point}</p>
                <div className="mt-6 space-y-2">
                  {slide.visual.map((item, index) => (
                    <div key={item} className="flex items-center gap-2">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-teal-300 text-xs font-bold text-slate-950">
                        {index + 1}
                      </span>
                      <span className="rounded-lg border border-white/10 bg-black/25 px-3 py-2 text-sm text-slate-200">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-slate-950/55 px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 flex items-center gap-3">
            <FileText className="h-6 w-6 text-teal-300" />
            <h2 className="text-3xl font-bold text-white">All Materials From Start To Now</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {materials.map((group) => (
              <article key={group.day} className="rounded-lg border border-white/10 bg-white/[0.05] p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-teal-200">
                  {group.day}
                </p>
                <ul className="mt-4 space-y-3">
                  {group.items.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-6 text-slate-300">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal-300" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 flex items-center gap-3">
            <ClipboardList className="h-6 w-6 text-teal-300" />
            <h2 className="text-3xl font-bold text-white">Course Links And Sources</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {sourceLinks.map(([label, url, note]) => (
              <a
                key={label}
                href={url}
                className="rounded-lg border border-white/10 bg-white/[0.05] p-5 transition hover:border-teal-300/45 hover:bg-white/[0.08]"
              >
                <p className="font-semibold text-white">{label}</p>
                <p className="mt-2 break-words text-sm leading-6 text-teal-200">{url}</p>
                <p className="mt-3 text-sm leading-6 text-slate-300">{note}</p>
              </a>
            ))}
          </div>
          <div className="mt-5 rounded-lg border border-amber-300/20 bg-amber-300/10 p-4">
            <p className="text-sm leading-7 text-amber-50">
              The LearnIT links may require your ITU login. The explanations on this
              page are written from the local PDFs and course text you provided.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 flex items-center gap-3">
            <BookOpen className="h-6 w-6 text-amber-300" />
            <h2 className="text-3xl font-bold text-white">Full Teaching Pack</h2>
          </div>
          <p className="max-w-4xl text-base leading-8 text-slate-300">
            Read this like a private lesson. Each lecture is split into subjects,
            simple meaning, examples, exercise, and the one idea you must remember.
          </p>
          <div className="mt-8 grid gap-6">
            {fullTeachingPack.map((lecture) => (
              <article
                key={lecture.day}
                className="rounded-lg border border-white/10 bg-white/[0.05] p-6"
              >
                <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-teal-200">
                      {lecture.day}
                    </p>
                    <h3 className="mt-1 text-2xl font-bold text-white">{lecture.lecture}</h3>
                  </div>
                  <span className="rounded-full bg-amber-300/15 px-3 py-1 text-sm font-semibold text-amber-100">
                    complete notes
                  </span>
                </div>

                <div className="mt-5 grid gap-4 lg:grid-cols-2">
                  {lecture.subjects.map((subject) => (
                    <div key={subject.name} className="rounded-lg border border-white/10 bg-slate-950/75 p-5">
                      <h4 className="text-lg font-bold text-white">{subject.name}</h4>
                      <p className="mt-3 text-sm leading-7 text-slate-300">{subject.simple}</p>
                      <div className="mt-4 rounded-lg border border-teal-300/20 bg-teal-300/10 p-3">
                        <p className="text-sm font-semibold text-teal-100">Easy example</p>
                        <p className="mt-1 text-sm leading-6 text-slate-100">{subject.example}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  <div className="rounded-lg border border-white/10 bg-black/25 p-4">
                    <p className="font-semibold text-white">Class exercise</p>
                    <p className="mt-2 text-sm leading-7 text-slate-300">{lecture.exercise}</p>
                  </div>
                  <div className="rounded-lg border border-amber-300/20 bg-amber-300/10 p-4">
                    <p className="font-semibold text-amber-100">Must know</p>
                    <p className="mt-2 text-sm leading-7 text-slate-100">{lecture.mustKnow}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-slate-950/55 px-6 py-12">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="rounded-lg border border-white/10 bg-white/[0.05] p-6">
            <div className="flex items-center gap-3">
              <Lightbulb className="h-6 w-6 text-amber-300" />
              <h2 className="text-2xl font-bold text-white">How To Study This Course</h2>
            </div>
            <div className="mt-5 grid gap-3">
              {studyMethods.map(([title, body]) => (
                <div key={title} className="rounded-lg bg-slate-950/75 p-4">
                  <p className="font-semibold text-white">{title}</p>
                  <p className="mt-2 text-sm leading-7 text-slate-300">{body}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-lg border border-teal-300/20 bg-teal-300/10 p-6">
            <div className="flex items-center gap-3">
              <Layers3 className="h-6 w-6 text-teal-200" />
              <h2 className="text-2xl font-bold text-white">Concept Map</h2>
            </div>
            <p className="mt-3 text-sm leading-7 text-slate-200">
              This is the easiest order for understanding almost every lecture.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {conceptMap.map(([term, meaning], index) => (
                <div key={term} className="rounded-lg bg-black/25 p-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-300 text-sm font-bold text-slate-950">
                      {index + 1}
                    </span>
                    <p className="font-semibold text-white">{term}</p>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{meaning}</p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 flex items-center gap-3">
            <BookOpen className="h-6 w-6 text-amber-300" />
            <h2 className="text-3xl font-bold text-white">Readings And Videos Explained</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {readingNotes.map((item) => (
              <article key={item.title} className="rounded-lg border border-white/10 bg-white/[0.05] p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-semibold text-white">{item.title}</h3>
                  <span className="rounded-full bg-teal-300/10 px-3 py-1 text-xs font-semibold text-teal-100">
                    {item.type}
                  </span>
                </div>
                <ul className="mt-4 space-y-2">
                  {item.notes.map((note) => (
                    <li key={note} className="flex gap-3 text-sm leading-6 text-slate-300">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-300" />
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-12">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-lg border border-white/10 bg-slate-950/70 p-6">
            <div className="flex items-center gap-3">
              <BookOpen className="h-6 w-6 text-teal-300" />
              <h2 className="text-2xl font-bold text-white">What To Understand First</h2>
            </div>
            <p className="mt-4 leading-7 text-slate-300">
              This course is not asking you to already be a gamer. It is teaching
              you how to think like a game maker. That means you look at a game as
              a system of actions, rules, goals, challenges, players, and feedback.
            </p>
            <div className="mt-6 grid gap-3 md:grid-cols-3">
              {[
                ["Player", "Who is this game for?"],
                ["Action", "What does the player do?"],
                ["Loop", "What repeats again and again?"],
              ].map(([title, body]) => (
                <div key={title} className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
                  <p className="font-semibold text-amber-200">{title}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-teal-300/20 bg-teal-300/10 p-6">
            <div className="flex items-center gap-3">
              <ClipboardList className="h-6 w-6 text-teal-200" />
              <h2 className="text-2xl font-bold text-white">Quick Exam Brain</h2>
            </div>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-200">
              <li>Use terms clearly: mechanic, goal, rule, challenge, progression, loop.</li>
              <li>When explaining your game, describe what players do, not only the story.</li>
              <li>Keep prototypes small so you can test and improve them fast.</li>
              <li>When playtesting, ask normal questions. Do not ask players to analyze mechanics for you.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-slate-950/55 px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 flex items-center gap-3">
            <Goal className="h-6 w-6 text-teal-300" />
            <h2 className="text-3xl font-bold text-white">Beginner Roadmap</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {beginnerRoadmap.map((step) => (
              <article key={step.title} className="rounded-lg border border-white/10 bg-white/[0.05] p-5">
                <h3 className="text-lg font-bold text-white">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{step.body}</p>
              </article>
            ))}
          </div>
          <div className="mt-6 rounded-lg border border-amber-300/20 bg-amber-300/10 p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-amber-100">
              Simple sentence to remember
            </p>
            <p className="mt-3 text-lg leading-8 text-white">
              A game is a set of player actions, controlled by rules, aimed at a
              goal, made interesting by challenge, and repeated through a loop.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 pb-12">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2">
          <article className="rounded-lg border border-white/10 bg-white/[0.05] p-6">
            <div className="flex items-center gap-3">
              <Lightbulb className="h-6 w-6 text-amber-300" />
              <h2 className="text-2xl font-bold text-white">The Basic Game Design Picture</h2>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-300">
              When you explain any game, move from small to big. Start with the
              player's action, then connect it to rules, goals, challenge, and loop.
            </p>
            <div className="mt-6 space-y-3">
              {[
                ["Mechanic", "What the player does"],
                ["Rule", "What controls that action"],
                ["Goal", "Why the player does it"],
                ["Challenge", "What makes it difficult"],
                ["Loop", "What repeats during play"],
              ].map(([title, body], index, list) => (
                <div key={title} className="flex items-center gap-3">
                  <div className="min-w-0 flex-1 rounded-lg border border-white/10 bg-slate-950/80 p-4">
                    <p className="font-semibold text-white">{title}</p>
                    <p className="mt-1 text-sm text-slate-300">{body}</p>
                  </div>
                  {index < list.length - 1 && <ArrowRight className="hidden h-5 w-5 shrink-0 text-teal-300 sm:block" />}
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-lg border border-teal-300/20 bg-teal-300/10 p-6">
            <div className="flex items-center gap-3">
              <Users className="h-6 w-6 text-teal-200" />
              <h2 className="text-2xl font-bold text-white">How Game Roles Work Together</h2>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-200">
              Each role protects one part of the game. The best teams talk often
              because every change affects other people.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {[
                ["Systems", "Rules + mechanics"],
                ["Experience", "Player feeling"],
                ["Producer", "Time + tasks"],
                ["Programmer", "Working systems"],
                ["Artist", "Visual clarity"],
                ["Sound", "Mood + feedback"],
              ].map(([title, body]) => (
                <div key={title} className="rounded-lg bg-black/25 p-4">
                  <p className="font-semibold text-white">{title}</p>
                  <p className="mt-1 text-sm leading-5 text-slate-300">{body}</p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="px-6 pb-12">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 flex items-center gap-3">
            <BookOpen className="h-6 w-6 text-amber-300" />
            <h2 className="text-3xl font-bold text-white">Deep Lecture Notes</h2>
          </div>
          <div className="grid gap-5">
            {deepLectureDetails.map((lecture) => (
              <article key={lecture.day} className="rounded-lg border border-white/10 bg-white/[0.05] p-6">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-teal-200">
                      {lecture.day}
                    </p>
                    <h3 className="mt-1 text-2xl font-bold text-white">{lecture.title}</h3>
                  </div>
                  <span className="rounded-full border border-white/10 bg-black/25 px-3 py-1 text-sm text-slate-300">
                    easy notes
                  </span>
                </div>
                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  {lecture.blocks.map((block) => (
                    <div key={block.heading} className="rounded-lg border border-white/10 bg-slate-950/70 p-4">
                      <h4 className="font-semibold text-white">{block.heading}</h4>
                      <p className="mt-2 text-sm leading-7 text-slate-300">{block.body}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-5 rounded-lg border border-teal-300/20 bg-teal-300/10 p-4">
                  <p className="text-sm font-semibold text-teal-100">What you can say in class</p>
                  <p className="mt-2 text-sm leading-7 text-slate-100">{lecture.say}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-12">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 flex items-center gap-3">
            <CalendarDays className="h-6 w-6 text-amber-300" />
            <h2 className="text-3xl font-bold text-white">Lectures Step By Step</h2>
          </div>
          <div className="grid gap-5">
            {lectures.map((lecture) => (
              <article
                key={lecture.date}
                id={lecture.date.toLowerCase().replace(" ", "-")}
                className="scroll-mt-24 rounded-lg border border-white/10 bg-white/[0.05] p-6"
              >
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-teal-200">
                      {lecture.date}
                    </p>
                    <h3 className="mt-1 text-2xl font-bold text-white">{lecture.title}</h3>
                  </div>
                  <p className="max-w-xl rounded-lg bg-slate-950/70 px-4 py-3 text-sm leading-6 text-slate-300">
                    {lecture.focus}
                  </p>
                </div>
                <ul className="mt-5 grid gap-3 md:grid-cols-2">
                  {lecture.learn.map((item) => (
                    <li key={item} className="flex gap-3 rounded-lg bg-black/20 p-3 text-sm leading-6 text-slate-300">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal-300" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 rounded-lg border border-amber-300/20 bg-amber-300/10 p-4 text-sm leading-6 text-amber-100">
                  <strong>Remember:</strong> {lecture.remember}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-slate-950/55 px-6 py-12">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <Layers3 className="h-6 w-6 text-teal-300" />
              <h2 className="text-3xl font-bold text-white">Important Terms</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {terms.map(([term, meaning]) => (
                <div key={term} className="rounded-lg border border-white/10 bg-white/[0.05] p-4">
                  <h3 className="font-semibold text-white">{term}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{meaning}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-5 flex items-center gap-3">
              <Users className="h-6 w-6 text-amber-300" />
              <h2 className="text-3xl font-bold text-white">Game Team Roles</h2>
            </div>
            <div className="grid gap-3">
              {roles.map(([role, meaning]) => (
                <div key={role} className="rounded-lg border border-white/10 bg-white/[0.05] p-4">
                  <h3 className="font-semibold text-white">{role}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{meaning}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 flex items-center gap-3">
            <RefreshCcw className="h-6 w-6 text-amber-300" />
            <h2 className="text-3xl font-bold text-white">Game Loop Graphics</h2>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.05] p-6">
            <p className="max-w-3xl text-sm leading-6 text-slate-300">
              A game loop is a simple drawing of what repeats. It helps you see
              how mechanics, results, rewards, and the next decision connect.
            </p>
            <div className="mt-6 grid gap-4">
              {gameLoopExamples.map(([game, a, b, c, d]) => (
                <article key={game} className="rounded-lg border border-white/10 bg-slate-950/75 p-4">
                  <h3 className="font-semibold text-white">{game}</h3>
                  <div className="mt-3 grid gap-2 md:grid-cols-4">
                    {[a, b, c, d].map((step, index) => (
                      <div key={step} className="flex items-center gap-2">
                        <span className="flex min-h-12 flex-1 items-center rounded-lg bg-white/[0.06] px-3 text-sm leading-5 text-slate-200">
                          {step}
                        </span>
                        {index < 3 && <ArrowRight className="hidden h-4 w-4 shrink-0 text-teal-300 md:block" />}
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-slate-950/55 px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 flex items-center gap-3">
            <Goal className="h-6 w-6 text-teal-300" />
            <h2 className="text-3xl font-bold text-white">Teacher Questions: Ready Answers</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {teacherAnswers.map(([question, answer]) => (
              <article key={question} className="rounded-lg border border-white/10 bg-white/[0.05] p-5">
                <h3 className="font-semibold text-amber-100">{question}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 flex items-center gap-3">
            <Gamepad2 className="h-6 w-6 text-teal-300" />
            <h2 className="text-3xl font-bold text-white">Prototype 1: Cup Catch</h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-lg border border-white/10 bg-white/[0.05] p-6">
              <h3 className="text-xl font-bold text-white">Copy-Ready Submission Text</h3>
              <div className="mt-4 space-y-4 rounded-lg bg-slate-950/80 p-5 text-sm leading-7 text-slate-200">
                <p>
                  Cup Catch is a very simple two-player physical game. One player
                  drops a small paper ball, and the other player tries to catch it
                  with a cup. The game uses no screen or digital tools, only one cup
                  and one small paper ball.
                </p>
                <p>
                  Core mechanics: Drop, Catch, Switch, and Score. One player drops
                  the paper ball from shoulder height. The other player tries to
                  catch it with the cup. Players switch roles after each round. A
                  successful catch gives 1 point.
                </p>
                <p>
                  Rules: exactly two players play. Players stand about one arm apart.
                  One player is the Dropper and the other is the Catcher. The Dropper
                  drops the paper ball from shoulder height. If the Catcher catches
                  the ball in the cup, the Catcher scores 1 point. If the ball falls,
                  no point is scored. Players switch roles after every drop. First
                  player to 5 points wins.
                </p>
              </div>
            </div>

            <div className="rounded-lg border border-teal-300/20 bg-teal-300/10 p-6">
              <h3 className="text-xl font-bold text-white">Simple Gameplay Picture</h3>
              <div className="mt-5 grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-end">
                <div className="rounded-lg border border-white/10 bg-black/25 p-4 text-center">
                  <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-amber-200/40 bg-amber-200/15 text-sm font-semibold text-amber-100">
                    Paper ball
                  </div>
                  <p className="mt-3 text-sm text-slate-200">Dropper releases the ball</p>
                </div>
                <ArrowRight className="mx-auto hidden h-6 w-6 text-teal-200 sm:block" />
                <div className="rounded-lg border border-white/10 bg-black/25 p-4 text-center">
                  <div className="mx-auto flex h-24 w-28 items-end justify-center rounded-b-full border border-teal-200/50 bg-teal-200/15 pb-5 text-sm font-semibold text-teal-100">
                    Cup
                  </div>
                  <p className="mt-3 text-sm text-slate-200">Catcher tries to catch it</p>
                </div>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {cupCatchExplain.map(([title, body]) => (
                  <div key={title} className="rounded-lg bg-black/25 p-4">
                    <p className="font-semibold text-white">{title}</p>
                    <p className="mt-1 text-sm leading-6 text-slate-300">{body}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-teal-300/20 bg-teal-300/10 p-6 lg:col-span-2">
              <h3 className="text-xl font-bold text-white">Cup Catch Gameplay Loop</h3>
              <div className="mt-5 grid gap-3 md:grid-cols-3">
                {cupCatchLoop.map((step, index) => (
                  <div key={step} className="flex items-center gap-3 rounded-lg bg-black/25 p-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-300 text-sm font-bold text-slate-950">
                      {index + 1}
                    </span>
                    <span className="text-sm text-slate-200">{step}</span>
                    {index < cupCatchLoop.length - 1 && (
                      <RefreshCcw className="ml-auto h-4 w-4 text-teal-200" />
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-lg border border-white/10 bg-white/[0.06] p-4">
                <div className="mb-3 flex items-center gap-2 text-white">
                  <Goal className="h-5 w-5 text-amber-300" />
                  <strong>Why it fits Prototype 1</strong>
                </div>
                <p className="text-sm leading-6 text-slate-300">
                  It is physical and analog, exactly two players, funny because
                  failed catches are playful, and radically simple because the loop
                  is only drop, catch, switch, score.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
