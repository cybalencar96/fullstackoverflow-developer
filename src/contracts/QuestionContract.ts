interface Question {
    question: string;
    student: string;
    classs: string;
    tags: string;
}

interface QuestionDB extends Question {
    id: number;
    submitedAt: string;
    answer: string;
    answeredAt: string;
    answeredBy: string;
}

interface QuestionNotAnswered {
    id?: number,
    question: string;
    student: string;
    class: string;
    tags?: string;
    answered?: boolean;
    submitAt: string;
}

interface QuestionAnswered extends QuestionNotAnswered {
    answer: string;
    answeredAt: string;
    answeredBy: string;
}

interface AnswerQuestion {
    questionId: number;
    answer: string;
    userToken?: string;
    userId?: number;
}

export {
    Question,
    QuestionDB,
    QuestionNotAnswered,
    QuestionAnswered,
    AnswerQuestion,
}
