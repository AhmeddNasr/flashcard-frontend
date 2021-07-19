import react, {useState} from 'react';
import FlashCard from "./FlashCard";
import "./studyHelper.css";
function StudyHelperIndex() {
    let mockData = {
        title: 'title 1',
        definition: 'r a erat nam',
        accuracy: 0.25,
        priority: 0,
    }
    const [activeTerm, setActiveTerm] = useState(mockData);
    return (
        <div id="studyHelper">
            <FlashCard activeTerm={activeTerm} />
            
        </div>
    );
}
export default StudyHelperIndex;