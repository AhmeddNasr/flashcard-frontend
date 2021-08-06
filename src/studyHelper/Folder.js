import { useState, useEffect } from "react";
import FlashCard from "./FlashCard";
import TermList from "./TermList";
import NewTerm from "./NewTerm";
import textareaAutoSize from "./textareaAutoSize";
import addItemToArray from "./addItem";
import generateFlashcards from "./generateFlashcards";
import fetchTerms from "./fetchTerms";
import "./styles/studyHelper.css";

function Folder(props) {
  // auto size text area
  useEffect(() => {
    textareaAutoSize();
    fetchTerms(props.match.params.folderID, setMockData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  let mockDataArray = [
    {
      id: 1,
      termTitle: "",
      questions: [
        {
          id: 1,
          question: "",
          answer: "",
          accuracy: 0,
        },
      ],
      accuracy: 0,
    },
  ];

  // index of displayed term on the flash card
  const [activeTerm, setActiveTerm] = useState(0);
  const [mockData, setMockData] = useState(mockDataArray);
  // eslint-disable-next-line
  const [useSmartCards, setUseSmartCards] = useState(false);

  // cycle displayed term when 'I got it' or 'Study again' button is pressed
  const nextTerm = () => {
    setActiveTerm((activeTerm + 1) % flashcards.length);
  };

  const addItem = () => {
    let newArray = addItemToArray(mockData);
    // check if error occured (when input is empty))
    if (newArray) {
      setMockData(newArray);
    }
  };

  let flashcards = generateFlashcards(mockData, useSmartCards);

  return (
    <div id="studyHelper">
      <FlashCard
        flashcard={flashcards[activeTerm]}
        nextTerm={() => nextTerm()}
      />
      <NewTerm addItem={(arr) => addItem(arr)} />
      <p className="termList-sectionTitle">
        List of terms in this class ({mockData.length})
      </p>
      <TermList terms={mockData} />
    </div>
  );
}

export default Folder;
