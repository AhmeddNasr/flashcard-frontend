import {useState, useEffect} from 'react';
import FlashCard from "./FlashCard";
import ListOfTerms from "./ListOfTerms";
import NewTerm from './NewTerm'
import textareaAutoSize from './textareaAutoSize';
import addItemToArray from './addItem';
import "./studyHelper.css";
import "./listOfTerms.css"
function StudyHelperIndex() {
    // auto size text area
    useEffect(() => {
        textareaAutoSize();
    })
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
    // index of displayed term
    const [activeTerm, setActiveTerm] = useState(0);
    const [mockData, setMockData] = useState(mockDataArray);
    
    // cycle displayed term when 'I got it' or 'Study again' button is pressed
    const nextTerm = () => {
        setActiveTerm((activeTerm + 1)%mockData.length);
    }

    const addItem = () => {
        let newArray = addItemToArray(mockDataArray);
        // check if error occured (when input is empty))
        if(addItemToArray) {
            setMockData(newArray);
        }
    }
    
    return (
        <div id="studyHelper">
            <FlashCard activeTerm={mockData[activeTerm]} nextTerm={() => nextTerm()}/>
            {/* <NewTerm mockDataArray={mockDataArray} addItem={(arr) => addItem(arr)}/> */}
            <NewTerm addItem={(newArray) => addItem(newArray)}/>
            <p className="termList-sectionTitle">List of terms in this class ({mockData.length})</p>                
            <ListOfTerms terms={mockData}/>
        </div>
    );
}


export default StudyHelperIndex;