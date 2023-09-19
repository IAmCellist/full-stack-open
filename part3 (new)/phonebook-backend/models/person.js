const mongoose = require('mongoose')

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5
  },
  number: {
    type: String,
    validate: {
      validator: (v) => {
        return new RegExp(/\d{3}-\d{3}-\d{4}/).test(v)
      },
      message: props => `${props.value} is not a valid phone number`
    },
    minLength: 8,
    required: true
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)