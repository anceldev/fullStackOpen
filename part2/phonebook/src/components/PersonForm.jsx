
const PersonForm = ({ addName, newName, handleNewName, newNumber, handleNewNumber }) => {
  // const { addName, newName, handleNewName, newNumber, handleNewNumber } = props
  return (
    <form onSubmit={addName}>
        <div>
          name: <input
            value={newName}
            onChange={handleNewName}
          />
        </div>
        <div>
          number: <input
            value={newNumber}
            onChange={handleNewNumber}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

export default PersonForm