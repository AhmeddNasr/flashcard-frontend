function Card(props) {
  let cardData = props.flashcard;
  // const [isAnswerActive, setActive] = useState(false);
  // const handleClick = () => {
  //     setActive(!isAnswerActive);
  // }

  const handleClick = () => {
    let title = document.querySelector(".flashcard-title");
    let definition = document.querySelector(".flashcard-definition");
    if (title.classList.value === "flashcard-title active") {
      title.classList.value = "flashcard-title hidden";
      definition.classList.value = "flashcard-definition active";
      // title.classList.remove('active');
      // title.classList.add('hidden');
      // definition.classList.add('active');
      // definition.classList.remove('hidden');
    } else {
      title.classList.value = "flashcard-title active";
      definition.classList.value = "flashcard-definition hidden";
    }
  };

  return (
    <div
      className="flashcard-inner"
      key={cardData.termID + "/" + cardData.questionID}
      onClick={() => handleClick()}
    >
      <div className="flashcard-title active">
        <p>{cardData.title}</p>
        <p>{cardData.question}</p>
      </div>
      <div className="flashcard-definition hidden">
        <p>{cardData.answer}</p>
      </div>
    </div>
  );
}

export default Card;
