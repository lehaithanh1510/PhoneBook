const express = require("express")
const app = express()
const morgan = require('morgan')
const cors = require("cors")


let persons = [
    {
        name: "Le Hai Thanh",
        number: "0981497748",
        id: 1
    },
    {
        name: "Hai Thanh",
        number: "0981497748",
        id: 2
    },
    {
        name: "Le Thanh",
        number: "0981497748",
        id: 3
    }
]

app.use(cors())
app.use(express.json())
morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :response-time ms - :res[content-length] :body - :req[content-length]'));


app.get('/api/persons', (req, res) => {
    res.send({ success: 1, data: persons })
})

app.get("/api/persons/:id", (req, res) => {
    const id = parseInt(req.params.id)

    console.log(id);

    const foundPerson = persons.filter(person => person.id === id)

    if (foundPerson.length) {
        res.send({ success: 1, data: foundPerson })
    }
    res.status(400).send({ success: 0, message: "Content missing" })

})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)

    persons = persons.filter(person => person.id !== id)

    res.status(204).end()
})

app.post('/api/persons', (req, res) => {
    const personToAdd = req.body

    const { name } = personToAdd

    const existedName = persons.filter(person => person.name === name)

    if (existedName.length) {
        return res.status(400).send({ success: 0, message: "Name must be unique" })
    }

    personToAdd.id = Math.max(...persons.map(person => person.id)) + 1

    persons = persons.concat(personToAdd)

    res.send({ success: 1, data: persons })
})

const PORT = process.env.PORT || 3003

app.listen(PORT, () => {
    console.log("Server started")
})