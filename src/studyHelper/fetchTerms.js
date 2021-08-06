function fetchTerms(folderID, setMockData) {
  console.log("hi");
  let terms = [];
  fetch(`http://localhost:8080/api/terms/${folderID}`, {
    credentials: "include",
  })
    .then((result) => result.json())
    .then((data) => {
      addToArray(data);
      setMockData(terms);
    })
    .catch((err) => {
      console.log(err);
      return [];
    });

  const addToArray = (data) => {
    //add initial question
    addNewTerm(data[0]);
    let currentIndex = 0;
    for (let i = 1; i < data.length; i++) {
      let term = data[i];
      if (term.term_id === terms[currentIndex].id) {
        terms[currentIndex].questions.push({
          id: term.question_id,
          question: term.question_text,
          answer: term.answer_text,
          accuracy: 0,
        });
      } else {
        addNewTerm(term);
        currentIndex++;
      }
    }
  };

  const addNewTerm = (question) => {
    terms.push({
      id: question.term_id,
      termTitle: question.name,
      questions: [
        {
          id: question.question_id,
          question: question.question_text,
          answer: question.answer_text,
          accuracy: 0,
        },
      ],
    });
  };
}

export default fetchTerms;