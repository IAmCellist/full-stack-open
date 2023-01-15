const Search = ({newSearch, handleSearch}) => {
  return (
    <div>
      find countries <input value={newSearch} onChange={handleSearch}/>
    </div>
  )
}

export default Search