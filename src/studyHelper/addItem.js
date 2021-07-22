function addItemToArray() {
    let titleInput = document.querySelector('.termList-title-input');
    let definitionInputs = document.querySelectorAll('.termList-definition-input');
    // check empty value

    function markAsEmpty (element, placeholder) {
        let oldPlaceHolder = element.placeholder;
        element.classList.add('empty-input');
        element.placeholder = placeholder;
        // clear warning on input
        element.addEventListener('input', () => {
            element.classList.remove('empty-input');
            element.placeholder = oldPlaceHolder;
        })
        element.focus();
    }

    // check if title is empty
    if(titleInput.value.trim() === '') {
        markAsEmpty(titleInput, 'Term can NOT be empty');
        return;
        
        // check if definition is empty in the case of only one back
    } else if (definitionInputs.length === 1) {
        let definition = definitionInputs[0];
        if (definition.value === '') {
            markAsEmpty(definition, 'Definition can NOT be empty');
            return;
        }
        // check if definitions (questions and answers) are empty in case of multiple backs
    } else if (definitionInputs.length > 1) {
        let backQuestion = document.querySelectorAll('.termList-definition-title-input');
        let backAnswer = document.querySelectorAll('.termList-definition-input');
        // loop over backs
        for (let i = 0; i < backQuestion.length; i++) {
            if (backQuestion[i].value === '') {
                markAsEmpty(backQuestion[i], 'Please enter a question');
                return;       
            } else if (backAnswer[i].value === '') {
                markAsEmpty(backAnswer[i], 'Please enter an answer');
                return;
            }
        }
    }


    // if (titleInput.value.length < 1) {
    //     titleInput.classList.add('empty-input');
    //     emptyInput = true;
    // }
    // if (definitionInput.value.length < 1) {
    //     definitionInput.classList.add('empty-input');
    //     return;
    // }
    // if (emptyInput) {
    //     return;
    // }
    // mock schema
    // let item = {
    //     title: titleInput.value,
    //     definition: definitionInput.value,
    //     accuracy: 0,
    //     priority: 0,
    // };
    // temporary: copy mock array and push item then set the state
    // let tempArray = [...mockData];
    // tempArray.push(item);
    // setMockData(tempArray);
    // Clear input fields to avoid accidental multiple submittion of same card
    // titleInput.value = '';
    // definitionInput.value = '';
    // titleInput.classList.remove('empty-input');
    // definitionInput.classList.remove('empty-input');
}

export default addItemToArray;