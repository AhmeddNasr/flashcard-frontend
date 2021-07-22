import {useState, useEffect} from 'react';
import FlashCard from "./FlashCard";
import ListOfTerms from "./ListOfTerms";
import NewTerm from './NewTerm'
import textareaAutoSize from './textareaAutoSize';

import "./studyHelper.css";
import "./listOfTerms.css"
function StudyHelperIndex() {
    // auto size text area
    useEffect(() => {
        textareaAutoSize();
    }, [])
    // index of displayed term
    let mockDataArray = 
        [ 
            {
                title: 'title 1',
                definition: 'r a erat nam',
                accuracy: 0.25,
                priority: 0,
            },  
            {
                title: 'title 2',
                definition: 'r  a erat nam r a erat nam r a erat nam r a erat nam r a erat nam r a erat nam r a erat nama erat nam r a erat nam r a erat nam r a erat nam r a erat nam r a erat nam r a erat nama erat nam r a erat nam r a erat nam r a erat nam r a erat nam r a erat nam r a erat nama erat nam r a erat nam r a erat nam r a erat nam r a erat nam r a erat nam r a erat nama erat nam r a erat nam r a erat nam r a erat nam r a erat nam r a erat nam r a erat nama erat nam r a erat nam r a erat nam r a erat nam r a erat nam r a erat nam r a erat nama erat nam r a erat nam r a erat nam r a erat nam r a erat nam r a erat nam r a erat nama erat nam r a erat nam r a erat nam r a erat nam r a erat nam r a erat nam r a erat nama erat nam r a erat nam r a erat nam r a erat nam r a erat nam r a erat nam r a erat nama erat nam r a erat nam r a erat nam r a erat nam r a erat nam r a erat nam r a erat nama erat nam r a erat nam r a erat nam r a erat nam r a erat nam r a erat nam r a erat nama erat nam r a erat nam r a erat nam r a erat nam r a erat nam r a erat nam r a erat nama erat nam r a erat nam r a erat nam r a erat nam r a erat nam r a erat nam r a erat nama erat nam r a erat nam r a erat nam r a erat nam r a erat nam r a erat nam r a erat nama erat nam r a erat nam r a erat nam r a erat nam r a erat nam r a erat nam r a erat nama erat nam r a erat nam r a erat nam r a erat nam r a erat nam r a erat nam r a erat nama erat nam r a erat nam r a erat nam r a erat nam r a erat nam r a erat nam r a erat nama erat nam r a erat nam r a erat nam r a erat nam r a erat nam r a erat nam r a erat nam',
                accuracy: 0.25,
                priority: 0,
            },
            {
                title: 'title 3',
                definition: 'r a erat nam',
                accuracy: 0.25,
                priority: 0,
            },
            {
                title: 'title 4',
                definition: 'r a erat nam',
                accuracy: 0.25,
                priority: 0,
            },
        ]
    const [activeTerm, setActiveTerm] = useState(0);
    const [mockData, setMockData] = useState(mockDataArray);
    // cycle displayed term when 'I got it' or 'Study again' button is pressed
    const nextTerm = () => {
        setActiveTerm((activeTerm + 1)%mockData.length);
    }

    const addItem = (e) => {
        let titleInput = document.getElementById('termList-title-input');
        let definitionInput = document.getElementById('termList-definition-input');
        // check empty value
        let emptyInput = false;
        if (titleInput.value.length < 1) {
            titleInput.classList.add('empty-input');
            emptyInput = true;
        }
        if (definitionInput.value.length < 1) {
            definitionInput.classList.add('empty-input');
            return;
        }
        if (emptyInput) {
            return;
        }
        // mock schema
        let item = {
            title: titleInput.value,
            definition: definitionInput.value,
            accuracy: 0,
            priority: 0,
        };
        // temporary: copy mock array and push item then set the state
        let tempArray = [...mockData];
        tempArray.push(item);
        setMockData(tempArray);
        // Clear input fields to avoid accidental multiple submittion of same card
        titleInput.value = '';
        definitionInput.value = '';
        titleInput.classList.remove('empty-input');
        definitionInput.classList.remove('empty-input');
    }

    
    return (
        <div id="studyHelper">
            <FlashCard activeTerm={mockData[activeTerm]} nextTerm={() => nextTerm()}/>
            <NewTerm addItem={() => {addItem()}}/>
            <p className="termList-sectionTitle">List of terms in this class ({mockData.length})</p>                
            <ListOfTerms terms={mockData}/>
        </div>
    );
}


export default StudyHelperIndex;