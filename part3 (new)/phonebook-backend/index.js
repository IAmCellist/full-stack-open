// if (process.env.NODE_ENV !== 'production') {
// 	require('dotenv').config()
// }
// const express = require('express')
// const app = express()

// app.use(express.static('build'))
// app.use(express.json())

// const morgan = require('morgan')
// const Person = require('./models/person.js')

// morgan.token('body', (req) => {
// 	return JSON.stringify(req.body)
// })

// app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

// app.get('/api/persons', (request, response) => {
// 	Person.find({}).then(persons => {
// 		response.json(persons)
// 	})
// })

// app.get('/info', (request, response, next) => {
// 	Person.find({})
// 		.then(persons => {
// 			response.send(`<div>Phonebook has info for ${persons.length} people</div><div>${new Date()}</div>`)
// 		})
// 		.catch(err => next(err))
// })

// app.get('/api/persons/:id', (request, response, next) => {
// 	Person.findById(request.params.id)
// 		.then(person => {
// 			response.json(person)
// 		})
// 		.catch(err => next(err))
// })

// app.delete('/api/persons/:id', (request, response, next) => {
// 	Person.findByIdAndRemove(request.params.id)
// 		.then(() => {
// 			response.status(204).end()
// 		})
// 		.catch(err => next(err))
// })


// app.post('/api/persons', (request, response, next) => {
// 	const body = request.body

// 	if (body.name === undefined || body.number === undefined) {
// 		return response.status(400).json({ error: 'content missing' })
// 	}

// 	const person = new Person({
// 		name: body.name,
// 		number: body.number
// 	})

// 	person.save()
// 		.then(savedPerson => {
// 			response.json(savedPerson)
// 		})
// 		.catch(err => next(err))
// })

// app.put('/api/persons/:id', (request, response, next) => {
// 	const { name, number } = request.body

// 	Person.findByIdAndUpdate(request.params.id,
// 		{ name, number },
// 		{ new: true, runValidators: true, context: 'query' })
// 		.then(updatedPerson => {
// 			response.json(updatedPerson)
// 		})
// 		.catch(err => next(err))
// })

// const unknownEndpoint = (request, response) => {
// 	response.status(404).send({ error: 'unknown endpoint' })
// }

// app.use(unknownEndpoint)

// const errorHandler = (error, request, response, next) => {
// 	console.error(error.message)

// 	if (error.name === 'CastError') {
// 		return response.status(400).send({ error: 'malformatted id' })
// 	}
// 	else if (error.name === 'ValidationError') {
// 		return response.status(400).json({ error: error.message })
// 	}

// 	next(error)
// }

// app.use(errorHandler)

//const PORT = process.env.PORT
// app.listen(PORT, () => {
// 	console.log(`Server running on port ${PORT}`)
// })

const app = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})

