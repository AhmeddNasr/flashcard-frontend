import React, { useState } from "react";
function FlashCard(props) {
    const [isActive, setActive] = useState(false);

    const handleClick = () => {
        setActive(!isActive);
    }

    return (
        <div id="flashcard">
            <i class="fas fa-ellipsis-v"></i>
            <div id="flashcard-inner" onClick={handleClick}>
                <p id="flashcard-title" className={isActive ? "active" : null}>
                    {props.activeTerm.title}
                </p>
                <p id="flashcard-definition" className={!isActive? "active" : null}>
                    {props.activeTerm.definition}
                </p>
            </div>
            <div id="flashcard-controls">
                <button onClick={() => props.nextTerm()}>I got it</button>
                <button onClick={() => props.nextTerm()}>Study again</button>
                {/* <button>Study again</button> */}
            </div>
        </div>
    );
}

export default FlashCard;