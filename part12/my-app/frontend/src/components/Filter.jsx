const Filter = ({ filterNames, setFilteredNames }) => {
    return(
    <div>
        <label>filter shown with </label>
        <input data-testid="inputFilter" onChange={(event) => setFilteredNames(event.target.value)} value={filterNames}></input>
    </div>
    );
};

export default Filter