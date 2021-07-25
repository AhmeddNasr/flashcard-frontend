import {useState, useEffect} from 'react';
import FlashCard from "./FlashCard";
import TermList from "./TermList";
import NewTerm from './NewTerm'
import textareaAutoSize from './textareaAutoSize';
import addItemToArray from './addItem';
import generateFlashcards from './generateFlashcards';
import "./styles/studyHelper.css";

function StudyHelperIndex() {
    // auto size text area
    useEffect(() => {
        textareaAutoSize();
    })
    let mockDataArray = 
        [ 
            {
                id: 1,
                termTitle: 'Term 1',
                questions: [{
                    id: 1,
                    question: 'Question 1',
                    answer: 'Answer 1',
                    accuracy: 0,
                },
                {
                    id: 2,
                    question: 'Question 2',
                    answer: 'Answer 2 - congue eu consequat ac felis donec et odio pellentesque diam volutpat commodo sed egestas egestas fringilla phasellus faucibus scelerisque eleifend',
                    accuracy: 0,
                }],
                accuracy: 0,
            },
            {
                id: 2,
                termTitle: 'Term 2',
                questions: [{
                    id: 1,
                    question: 'Question 1',
                    answer: 'Answer 1',
                    accuracy: 0,
                },
                {
                    id: 2,
                    question: 'Question 2',
                    answer: 'Answer 2',
                    accuracy: 0,
                }],
                accuracy: 0,
            },
            {
                id: 3,
                termTitle: 'Term 3',
                questions: [{
                    id: 1,
                    question: 'Question 1',
                    answer: 'Answer 1',
                    accuracy: 0,
                },
                {
                    id: 2,
                    question: 'Question 2',
                    answer: 'Answer 2',
                    accuracy: 0,
                }],
                accuracy: 0,
            },
        ]

    // index of displayed term on the flash card
    const [activeTerm, setActiveTerm] = useState(0);
    const [mockData, setMockData] = useState(mockDataArray);
    
    // cycle displayed term when 'I got it' or 'Study again' button is pressed
    const nextTerm = () => {
        setActiveTerm((activeTerm + 1)%flashcards.length);
    }

    const addItem = () => {
        let newArray = addItemToArray(mockData);
        // check if error occured (when input is empty))
        if(newArray) {
            setMockData(newArray);
        }
    }

    let flashcards = generateFlashcards(mockData);

    return (
        <div id="studyHelper">
            <FlashCard flashcard={flashcards[activeTerm]} nextTerm={() => nextTerm()}/>
            <NewTerm addItem={(arr) => addItem(arr)}/>
            <p className="termList-sectionTitle">List of terms in this class ({mockData.length})</p>                
            <TermList terms={mockData} />
        </div>
    );
}


export default StudyHelperIndex;