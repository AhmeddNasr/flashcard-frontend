function ListOfTerms(props) {
    let terms = [];
    props.terms.forEach((term) => {
        // used a counter in lieu of index
        let counter = 0;
        terms.push(
            <div className="termList-term">
                <div key={`${counter}-title`} className="termList-title">{term.title}</div>
                <div key={`${counter}-definition`} className="termList-definition">{term.definition}</div>
            </div>
        )
        counter++;
    })
    return terms;
}

export default ListOfTerms;