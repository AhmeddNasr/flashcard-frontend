import React from "react";
import Card from './Card';

function FlashCard(props) {
    return (
        <div id="flashcard">
            <i className="fas fa-ellipsis-v"></i>
            <Card flashcard={props.flashcard} />
            <div id="flashcard-controls">
                <button className='flashcard-controls-button' onClick={() => props.nextTerm()}>I got it</button>
                <button className='flashcard-controls-button' onClick={() => props.nextTerm()}>Study again</button>
                {/* <button>Study again</button> */}
            </div>
        </div>
    );
}

export default FlashCard;

