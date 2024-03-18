import Person from "./Person"

const Persons = ({listPersons, deletePerson}) => {
  return (
    <div>
        {listPersons.map((person) => {
          return (
            <Person key={person.id} person={person} deletePerson={deletePerson} />
          )
        })
        }
      </div>
  )
}

export default Persons