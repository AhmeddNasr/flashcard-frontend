// import {useEffect} from 'react';
import Questions from "./Questions";
function TermList(props) {
  let terms = [];
  terms.push(
    <p className="termList-sectionTitle">
      List of terms in this class ({props.terms.length})
    </p>
  );
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
