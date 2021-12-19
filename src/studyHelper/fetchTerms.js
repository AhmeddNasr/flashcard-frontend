//Fetches data from api then formats it with addToArray (from an array of question to an array of terms)
//finally sets it in state
function fetchTerms(folderID, setTermState) {
  let terms = [];
  fetch(`http://localhost:8080/api/terms/${folderID}`, {
    headers: { Authorization: localStorage.getItem("token") },
  })
    .then((result) => {
      if (result.ok) {
        return result.json();
      } else {
        return (window.location.href = "/error");
      }
    })
    .then((data) => {
      if (data.length > 0) {
        addToArray(data);
        setTermState(terms);
      } else {
        setTermState([]);
      }
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
