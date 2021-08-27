function Questions(props) {
  let questions = props.questions;
  let questionsDOM = [];
  for (let i = 0; i < questions.length; i++) {
    questionsDOM.push(
      <div className="term-list-question">
        <p className="question">{questions[i].question}</p>
        <p className="answer">{questions[i].answer}</p>
      </div>
    );
  }
  return questionsDOM;
}
export default Questions;
