function DefinitionInput(props) {
  let definitionInputs = [];
  for (let i = 1; i < props.count + 1; i++) {
    definitionInputs.push(
      <div
        className="termList-definition-input-container"
        key={`definition-input-${i}`}
      >
        <label>Back{props.count === 1 ? "" : ` (${i})`}</label>
        <textarea
          type="text"
          className="termList-input termList-definition-title-input"
          placeholder="Enter question"
          minLength="1"
        ></textarea>
        <textarea
          key={`definition-${i}`}
          type="text"
          className="termList-input termList-definition-input"
          placeholder="Enter Answer"
          minLength="1"
        ></textarea>
      </div>
    );
  }
  return definitionInputs;
}

export default DefinitionInput;
