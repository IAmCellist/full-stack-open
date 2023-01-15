const PersonForm = ({newName, newNum, handleNameChange, handleNumChange, addPerson}) => {
  return (  
  <form>
    <div>
      name: <input value={newName} onChange={handleNameChange}/>
    </div>
    <div>
      number: <input value={newNum} onChange={handleNumChange}/>
    </div>
    <div>
      <button type="submit" onClick={addPerson}>add</button>
    </div>
  </form>
  )
}

export default PersonForm