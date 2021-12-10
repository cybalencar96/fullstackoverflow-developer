const baseQuestionSelectQuery = `
    SELECT 
        questions.id,
        questions.question, 
        questions.student, 
        questions.classs, 
        questions.tags, 
        questions."answeredAt", 
        questions."submitedAt", 
        users.name as "answeredBy", 
        questions.answer 
    FROM questions 
    LEFT JOIN users ON users.id = questions."answeredBy"
    WHERE 1 = 1
`

export {
    baseQuestionSelectQuery,
}