const express = require('express')
const morgan = require('morgan')
const app = express()

let persons = [
  {
    "id": 1,
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": 2,
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": 3,
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": 4,
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
]

morgan.token("post-body", (req, res) => JSON.stringify(req.body));
app.use(express.json())
// app.use(morgan(":method :url :status :res[content-length] - :response-time ms :post-body"))

app.get('/', (request, response) => {
  response.send('<h1>Phonebook App</h1>')
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  if(person) {
    response.json(person)
  } else {
    response.status(404).send(`No person found with id ${id}`)
  }
})

app.get('/info', (request, response) => {
  const numPersons = persons.count
  console.log(request.date)
  response.send(`<p>Phonebook has info for ${numPersons} people<p><p>${new Date()}</p>`)
})

const newID = () => {
  return Math.floor(Math.random() * 2000)
}
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :post-body"))
app.post('/api/persons', (request, response) => {
  const body = request.body
  if(!body.name || !body.number) {
    return response.status(400).json({
      error: 'content missing'
    })
  }

  const personExists = persons.find(person => person.name.toLocaleLowerCase() === body.name.toLocaleLowerCase())

  if(personExists) {
    return response.status(400).json({
      error: 'name bust be unique'
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: newID()
  }

  persons = persons.concat(person)
  response.json(person)
})


app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id != id)
  response.status(204).send(`Person with id ${id} deleted`)
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)