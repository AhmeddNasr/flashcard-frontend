import './new-term.css'
function NewTerm(props) {
    const expandForm = function() {
        let form = document.getElementById('new-term-form');
        form.style.display = 'flex';
    }
    console.log(props);
    return (
        <div id="new-term">
            <div id="new-term-expand" onClick={() => { expandForm() }}>
                <p className="termList-sectionTitle">Add a new term <i id='expand-icon' class="fas fa-caret-down"></i></p>
            </div>
            <form id="new-term-form">
                <textarea type="text" id="termList-title-input" placeholder="Term" className="termList-input" minLength="1"></textarea>
                <textarea type="text" id="termList-definition-input" placeholder="Definition" className="termList-input" minLength="1"></textarea>
                <button type="button" style={{ width: '40px' }} onClick={(e) => props.addItem(e)}>Add</button>
            </form>
        </div>
    )
}

export default NewTerm;