function generateFlashcards(data, isShuffled) {
  
  function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

  let flashcards = [];
  for (let i = 0; i < data.length; i++) {
    let term = data[i];
    for (let y = 0; y < term.questions.length; y++) {
      let question = term.questions[y];
      flashcards.push({
        termID: term.id,
        questionID: question.id,
        title: term.termTitle,
        question: question.question,
        answer: question.answer,
      });
    }
  }


  if (isShuffled) {
    return shuffle(flashcards);
  }

  return flashcards;
}
export default generateFlashcards;
