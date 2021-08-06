import { useState } from "react";
import DefinitionInput from "./DefinitionInput.js";
import "./styles/new-term.css";

function NewTerm(props) {
  const [definitionCount, setDefinitionCount] = useState(1);

  //TODO
  const expandForm = function () {
    let form = document.getElementById("new-term-form");
    if (form.style.display !== "flex") {
      let title = document.getElementById("termList-title-input");
      form.style.display = "flex";
      title.focus();
    } else {
      form.style.display = "none";
    }
  };

  const addDefinition = function () {
    setDefinitionCount(definitionCount + 1);
  };

  const resetDefinition = function () {
    setDefinitionCount(1);
  };

  // useEffect(() => {
  // let lastDefinition = definitionInputs[definitionInputs.length-1];
  // lastDefinition.focus();
  // TODO
  // let lastDefinitionPosition = lastDefinition.getBoundingClientRect().top;
  // window.scrollTo({
  //     top: lastDefinitionPosition,
  //     behavior: 'smooth'
  // })
  // }, [definitionCount])

  return (
    <div id="new-term">
      <div
        id="new-term-expand"
        onClick={() => {
          expandForm();
        }}
      >
        <p className="termList-sectionTitle">
          Add a new card <i id="expand-icon" className="fas fa-caret-down"></i>
        </p>
      </div>
      <form id="new-term-form">
        <label>Front</label>
        <textarea
          type="text"
          id="termList-title-input"
          placeholder="Enter term"
          className="termList-input termList-title-input"
          minLength="1"
        ></textarea>
        <DefinitionInput count={definitionCount} />
        <button type="button" onClick={() => addDefinition()}>
          Add another back
        </button>
        <button
          type="button"
          style={{ width: "40px" }}
          onClick={(newArray) => {
            props.addItem(newArray);
            resetDefinition();
          }}
        >
          Add
        </button>
      </form>
    </div>
  );
}

export default NewTerm;
