import {useState} from 'react';
import FlashCard from "./FlashCard";
import ListOfTerms from "./ListOfTerms";
import "./studyHelper.css";
import "./listOfTerms.css"
function StudyHelperIndex() {
    // index of displayed term
    const [activeTerm, setActiveTerm] = useState(0);
    // cycle displayed term when 'I got it' or 'Study again' button is pressed
    const nextTerm = () => {
        setActiveTerm((activeTerm + 1)%mockData.length);
    }
    let mockData = 
        [ 
            {
                title: 'title 1',
                definition: 'r a erat nam',
                accuracy: 0.25,
                priority: 0,
            },  
            {
                title: 'title 2',
                definition: 'r a erat nam',
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
    return (
        <div id="studyHelper">
            <FlashCard activeTerm={mockData[activeTerm]} nextTerm={() => nextTerm()}/>
            <ul>
                <ListOfTerms terms={mockData}/>
            </ul>
        </div>
    );
}


export default StudyHelperIndex;