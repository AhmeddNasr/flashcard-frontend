function addItemToArray(array) {
    let titleInput = document.querySelector('.termList-title-input');
    let backQuestion = document.querySelectorAll('.termList-definition-title-input');
    let backAnswer = document.querySelectorAll('.termList-definition-input');

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
        
        // check if definition is empty
    } else {
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
    let oldArray = [...array];

    //extract value from question and answer nodes
    let questions = [];

    for(let i = 0; i < backAnswer.length; i++) {
        // question Schema
        questions.push({
            id: i,
            question: backQuestion[i].value,
            answer: backAnswer[i].value,
            accuracy: 0,
        })
        //clear fields
        backQuestion[i].value = '';
        backAnswer[i].value = '';
    }

    // card Schema
    let item = {
        id: array.length+1,
        termTitle: titleInput.value,
        questions,
        accuracy: 0,
        priority: 0,
    }
    //clear title field
    titleInput.value = '';

    oldArray.push(item);

    //clear input field

    return oldArray;
}

export default addItemToArray;