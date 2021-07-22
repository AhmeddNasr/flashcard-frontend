import { useState, useEffect } from 'react';
import DefinitionInput from './DefinitionInput.js'
import './new-term.css'


function NewTerm(props) {
    const [definitionCount, setDefinitionCount] = useState(1);

    const expandForm = function() {
        let form = document.getElementById('new-term-form');
        if (form.style.display !== 'flex') {
            let title = document.getElementById('termList-title-input');
            form.style.display = 'flex';
            title.focus();
        } else {
            form.style.display = 'none';
        }
    }

    const addDefinition = function () {
        setDefinitionCount(definitionCount+1);
    }

    useEffect(() => {
        let definitionInputs = document.querySelectorAll('.termList-definition-title-input');
        let term = document.querySelector('.termList-title-input');
        if(definitionInputs[0]) {
            let firstDefinition = definitionInputs[0];
            if (firstDefinition.value === '' && term.value !== '') {
                    firstDefinition.value = 'Definition?';
                }
        }
        // let lastDefinition = definitionInputs[definitionInputs.length-1];
        // lastDefinition.focus();
        // TODO
        // let lastDefinitionPosition = lastDefinition.getBoundingClientRect().top;
        // window.scrollTo({
        //     top: lastDefinitionPosition,
        //     behavior: 'smooth'
        // })        
    }, [definitionCount])

    return (
        <div id="new-term">
            <div id="new-term-expand" onClick={() => { expandForm() }}>
                <p className="termList-sectionTitle">Add a new card <i id='expand-icon' className="fas fa-caret-down"></i></p>
            </div>
            <form id="new-term-form">
                <label>Front</label>
                <textarea type="text" id="termList-title-input" placeholder="Enter term" className="termList-input termList-title-input" minLength="1"></textarea>
                <DefinitionInput count={definitionCount}/>
                <button type="button" onClick={() => addDefinition()}>Add multiple questions</button>
                <button type="button" style={{ width: '40px' }} onClick={(e) => props.addItem(e)}>Add</button>
            </form>
        </div>
    )
}

export default NewTerm;