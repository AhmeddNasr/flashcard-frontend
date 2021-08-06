// import {useEffect} from 'react';
import Questions from "./Questions";
function TermList(props) {
  // useEffect(() => {
  //     let firstTerm = document.querySelector('.termList-term');
  //     firstTerm.id = 'active-term';
  //     let firstExpanded = document.querySelector('.termList-expanded');
  //     firstExpanded.classList.add('active');
  // }, []);

  // const handleExpansion = (e) => {
  //     let oldActive = document.getElementsByClassName('termList-expanded active');
  //     if(e.target.children[1].id !== oldActive[0].id) {
  //         oldActive[0].classList.remove('active');
  //         e.target.children[1].classList.add('active');
  //         console.log(e.target);
  //         e.target.children[1].id = 'active-term';
  //     }
  // }

  let terms = [];
  for (let i = 0; i < props.terms.length; i++) {
    let currentTerm = props.terms[i];
    terms.push(
      <div className="term" key={`${i}-term`}>
        <p className="term-list-term-title">{currentTerm.termTitle}</p>
        <div className="term-list-question-list">
          <Questions questions={currentTerm.questions} />
        </div>
      </div>
    );
  }
  return terms;
}

export default TermList;

/* <div className="termList-term" id="termList">
                    <div className="termList-title termList">{i+1}- {props.terms[i].termTitle}</div>
                    <div className="termList-definition termList">{props.terms[i].definition}</div>
                </div>
                <div className="termList-expanded" id={`${i}-term`}>
                    termList-expanded
                </div> */
