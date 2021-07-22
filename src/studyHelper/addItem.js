function addItemToArray() {
    let titleInput = document.querySelector('.termList-title-input');
    let definitionInputs = document.querySelectorAll('.termList-definition-input');
    // check empty value
    // check if title is empty
    if(titleInput.value.trim() === '') {
        titleInput.classList.add('empty-input');
        titleInput.placeholder = 'Term can NOT be empty';
        titleInput.addEventListener('input', () => {
            titleInput.classList.remove('empty-input');
            titleInput.placeholder = 'Enter term';
        })
        titleInput.focus();
    } else {
        for (let i=0; i<definitionInputs.length; i++) {
            break;
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