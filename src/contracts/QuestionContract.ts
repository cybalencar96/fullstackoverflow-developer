export interface Question {
    question: string;
    student: string;
    classs: string;
    tags: string;
}

export interface QuestionDB extends Question {
    id: number;
    submitedAt: string;
    answer: string;
    answeredAt: string;
    answeredBy: string;
}

export interface QuestionNotAnswered {
    question: string;
    student: string;
    class: string;
    tags?: string;
    answered?: boolean;
    submitAt: string;
}

export interface QuestionAnswered extends QuestionNotAnswered {
    answer: string;
    answeredAt: string;
    answeredBy: string;
}

export interface AnswerQuestion {
    questionId: number;
    answer: string;
    userToken?: string;
    userId?: number;
}

