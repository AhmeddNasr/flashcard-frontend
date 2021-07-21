import {useEffect} from 'react';

function ListOfTerms(props) {
    useEffect(() => {
        let firstExpanded = document.querySelector('.termList-expanded');
        firstExpanded.classList.add('active');
    }, []);

    const handleExpansion = (e) => {
        let oldActive = document.getElementsByClassName('termList-expanded active');
        oldActive[0].classList.remove('active');
        e.target.children[1].classList.add('active');
    }

    let terms = [];

    for(let i = 0; i < props.terms.length; i++){
        terms.push(
            <div className="term" key={`${i}-term`} onClick={(e) => handleExpansion(e)}>
                <div className="termList-term" id="termList">
                    <div className="termList-title termList">{i+1}- {props.terms[i].title}</div>
                    <div className="termList-definition termList">{props.terms[i].definition}</div>
                </div>
                <div className="termList-expanded">Priority: {`${props.terms[i].priority}`}</div>
            </div>
        )
    }
    return terms;
}

export default ListOfTerms;