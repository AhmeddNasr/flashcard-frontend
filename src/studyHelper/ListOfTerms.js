function ListOfTerms(props) {
    let terms = [];

    for(let i = 0; i < props.terms.length; i++){
        terms.push(
            <div className="termList-term">
                <div key={`${i}-title`} className="termList-title termList">{i+1}- {props.terms[i].title}</div>
                <div key={`${i}-definition`} className="termList-definition termList">{props.terms[i].definition}</div>
            </div>
        )
    }
    return terms;
}

export default ListOfTerms;