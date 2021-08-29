function generateFlashcards(data, isShuffled) {
  
  const shuffle = (array) => {
    let currentIndex = array.length,
      randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  };

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
