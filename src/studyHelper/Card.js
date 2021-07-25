import { useState } from 'react';
function Card(props) {

    let cardData = props.flashcard;
    const [isAnswerActive, setActive] = useState(false);
    const handleClick = () => {
        setActive(!isAnswerActive);
    }
    return(
        <div className='flashcard-inner' key={cardData.termID + '/' + cardData.questionID} onClick={() => handleClick()}>
            <div className={'flashcard-title ' + (isAnswerActive ? 'active' : 'hidden')}>
                <p>{cardData.title}</p>
                <p>{cardData.question}</p>
            </div>
            <div className={'flashcard-definition ' + (isAnswerActive ? 'hidden' : 'active')}>
                <p>{cardData.answer}</p>
            </div>
        </div>
    )
}

export default Card;