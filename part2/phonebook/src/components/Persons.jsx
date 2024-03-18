import React from 'react'

const Persons = ({listPersons}) => {
  return (
    <div>
        {listPersons.map((person) => {
          return (
            <p key={person.id}>{person.name} {person.number}</p>
          )
        })
        }
      </div>
  )
}

export default Persons