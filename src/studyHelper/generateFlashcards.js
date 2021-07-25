function generateFlashcards (data) {
    let flashcards = [];
    for(let i = 0; i < data.length; i++) {
        let term = data[i]
        for (let y = 0; y < term.questions.length; y++) {
            let question = term.questions[y];
            flashcards.push({
                termID: term.id,
                questionID: question.id,
                title: term.termTitle,
                question: question.question,
                answer: question.answer
            });
        }
    }
    return flashcards;
}

export default generateFlashcards;