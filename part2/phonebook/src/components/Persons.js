const Persons = ({newSearch, persons, deletePerson}) => {
  return (newSearch !== '' ? persons.filter(p => p.name.toLowerCase().includes(newSearch.toLowerCase())) : persons)
      .map(person => 
      <div key={person.name}>
        {person.name} {person.num} <button id={person.id} value={person.name} onClick={deletePerson}>delete</button>
      </div>
      )
}

export default Persons
