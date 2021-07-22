function DefinitionInput(props) {
    let definitionInputs = [];
    for(let i = 1; i < props.count+1; i++) {
        definitionInputs.push(
            <div key={`definition-input-${i}`}>
                <label>Definition - {i}</label>
                <textarea type="text" className="termList-input termList-definition-title-input" placeholder="Enter Definition Title" minLength="1"></textarea>
                <textarea type="text" className="termList-input termList-definition-input" placeholder="Enter Definition" minLength="1"></textarea>
            </div>
        )
    }
    return definitionInputs;
}

export default DefinitionInput;