import React, { useState } from "react";
function FlashCard() {
    const [isActive, setActive] = useState(false);

    const handleClick = () => {
        setActive(!isActive);
    }

    let mockData = {
        title: 'title 1',
        definition: 'definition 1',
        accuracy: 0.25,
    }

    return (
        <div id="flashcard">
            <div id="flashcard-inner" onClick={() => handleClick()}>
                <p id="flashcard-title" className={isActive ? "active" : null}>
                    {mockData.title}
                </p>
                <p id="flashcard-definition" className={!isActive? "active" : null}>
                    {mockData.definition}
                </p>
            </div>
            <div id="flashcard-controls">
                <button>correct</button>
                <button>false</button>
                <button>related</button>
            </div>
        </div>
    );
}

export default FlashCard;