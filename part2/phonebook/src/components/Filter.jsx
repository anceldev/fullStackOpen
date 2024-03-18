const Filter = ({ searchText, handleSearchText }) => {
  return (
    <div>
        search: <input
        value={searchText}
        onChange={handleSearchText}
        />  
      </div>
  )
}

export default Filter