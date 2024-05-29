export interface QuizItem {
    question: string;
    A: string;
    B: string;
    C: string;
    D: string;
    answer: Answer
    choose?: Answer
}

export type Answer = 'A' | 'B' | 'C' | 'D'