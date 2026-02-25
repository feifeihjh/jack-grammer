import { Type } from "@google/genai";

export enum Difficulty {
  BEGINNER = "初级",
  INTERMEDIATE = "中级",
  ADVANCED = "高级",
}

export enum GrammarPoint {
  NON_FINITE = "非谓语动词",
  RELATIVE_CLAUSE = "定语从句",
  CONJUNCTIONS = "连词",
  TENSE = "时态",
  PREPOSITIONS = "介词",
}

export interface Option {
  id: string;
  text: string;
}

export interface Explanation {
  correctAnswer: string;
  rule: string;
  example: string;
  commonMistake: string;
  reviewLink?: string;
}

export interface Question {
  id: string;
  sentence: string; // Use "____" for blanks
  options: Option[];
  correctOptionId: string;
  difficulty: Difficulty;
  category: GrammarPoint;
  explanation: Explanation;
}

export const QUESTION_BANK: Question[] = [
  {
    id: "1",
    sentence: "____ tired, she still finished the report.",
    options: [
      { id: "a", text: "Feel" },
      { id: "b", text: "Feeling" },
      { id: "c", text: "To feel" },
      { id: "d", text: "Felt" },
    ],
    correctOptionId: "b",
    difficulty: Difficulty.INTERMEDIATE,
    category: GrammarPoint.NON_FINITE,
    explanation: {
      correctAnswer: "Feeling",
      rule: "现在分词（doing）在这里表示原因或状态。当分词动作的发出者与主句主语一致时，可以使用分词短语。",
      example: "Feeling hungry, the boy ate a big apple. (因为感到饿，男孩吃了一个大苹果。)",
      commonMistake: "不要在这里使用 'Felt'，因为它不是句子的谓语动词，且此处表示主动意义。",
      reviewLink: "https://learnenglish.britishcouncil.org/grammar/intermediate-to-upper-intermediate/participle-clauses",
    },
  },
  {
    id: "2",
    sentence: "This is the park ____ I used to play when I was young.",
    options: [
      { id: "a", text: "which" },
      { id: "b", text: "that" },
      { id: "c", text: "where" },
      { id: "d", text: "who" },
    ],
    correctOptionId: "c",
    difficulty: Difficulty.BEGINNER,
    category: GrammarPoint.RELATIVE_CLAUSE,
    explanation: {
      correctAnswer: "where",
      rule: "在定语从句中，我们使用 'where' 来指代地点，并在从句中作地点状语。",
      example: "The house where I live is very old. (我住的房子非常旧。)",
      commonMistake: "直接使用 'which' 而没有介词（如 'in which'）。'which' 在从句中通常作主语或宾语。",
    },
  },
  {
    id: "3",
    sentence: "I like apples ____ I don't like bananas.",
    options: [
      { id: "a", text: "and" },
      { id: "b", text: "but" },
      { id: "c", text: "or" },
      { id: "d", text: "so" },
    ],
    correctOptionId: "b",
    difficulty: Difficulty.BEGINNER,
    category: GrammarPoint.CONJUNCTIONS,
    explanation: {
      correctAnswer: "but",
      rule: "使用 'but' 来表示两个想法之间的转折关系。",
      example: "It was raining, but we went out anyway. (虽然在下雨，但我们还是出去了。)",
      commonMistake: "在两个部分意思相反时错误地使用了表示并列的 'and'。",
    },
  },
  {
    id: "4",
    sentence: "The girl ____ is wearing a red dress is my sister.",
    options: [
      { id: "a", text: "who" },
      { id: "b", text: "which" },
      { id: "c", text: "whose" },
      { id: "d", text: "whom" },
    ],
    correctOptionId: "a",
    difficulty: Difficulty.BEGINNER,
    category: GrammarPoint.RELATIVE_CLAUSE,
    explanation: {
      correctAnswer: "who",
      rule: "在定语从句中，指代人时使用 'who'。",
      example: "The man who lives next door is a doctor. (住在隔壁的那个人是个医生。)",
      commonMistake: "指代人时错误地使用了指代物的 'which'。",
    },
  },
  {
    id: "5",
    sentence: "____ it was raining, they still went for a walk.",
    options: [
      { id: "a", text: "Because" },
      { id: "b", text: "Although" },
      { id: "c", text: "Unless" },
      { id: "d", text: "If" },
    ],
    correctOptionId: "b",
    difficulty: Difficulty.INTERMEDIATE,
    category: GrammarPoint.CONJUNCTIONS,
    explanation: {
      correctAnswer: "Although",
      rule: "使用 'although' (虽然) 来引导让步状语从句，表示尽管有某种情况，主句的情况依然发生。",
      example: "Although he is small, he is very strong. (虽然他很瘦小，但他很强壮。)",
      commonMistake: "错误使用 'because'，那会变成“因为下雨所以去散步”，逻辑不通。",
    },
  },
  {
    id: "6",
    sentence: "I haven't seen him ____ last Monday.",
    options: [
      { id: "a", text: "for" },
      { id: "b", text: "since" },
      { id: "c", text: "at" },
      { id: "d", text: "in" },
    ],
    correctOptionId: "b",
    difficulty: Difficulty.BEGINNER,
    category: GrammarPoint.TENSE,
    explanation: {
      correctAnswer: "since",
      rule: "在现在完成时中，'since' 后接过去的一个具体时间点，表示动作自那时起持续到现在。",
      example: "I have lived here since 2010. (我自2010年起就住在这里。)",
      commonMistake: "错误使用 'for'。'for' 后面应该接一段时间（如 for two weeks）。",
    },
  },
  {
    id: "7",
    sentence: "Look! The children ____ in the garden.",
    options: [
      { id: "a", text: "play" },
      { id: "b", text: "are playing" },
      { id: "c", text: "played" },
      { id: "d", text: "plays" },
    ],
    correctOptionId: "b",
    difficulty: Difficulty.BEGINNER,
    category: GrammarPoint.TENSE,
    explanation: {
      correctAnswer: "are playing",
      rule: "当看到 'Look!' 或 'Listen!' 等提示词时，通常使用现在进行时 (am/is/are + doing) 表示正在发生的动作。",
      example: "Listen! Someone is singing. (听！有人在唱歌。)",
      commonMistake: "使用一般现在时 'play'，这通常表示习惯性的动作而非此时此刻正在发生的动作。",
    },
  },
  {
    id: "8",
    sentence: "The book ____ by J.K. Rowling is very famous.",
    options: [
      { id: "a", text: "write" },
      { id: "b", text: "writing" },
      { id: "c", text: "written" },
      { id: "d", text: "wrote" },
    ],
    correctOptionId: "c",
    difficulty: Difficulty.ADVANCED,
    category: GrammarPoint.NON_FINITE,
    explanation: {
      correctAnswer: "written",
      rule: "过去分词（done）在这里作后置定语，表示被动含义。书是被写的。",
      example: "The window broken by the wind was fixed. (被风吹破的窗户修好了。)",
      commonMistake: "错误使用 'writing'，那会表示书正在写某样东西（主动意义）。",
    },
  },
];
