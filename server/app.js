const express = require('express')
const { Agent, Review } = require('./model')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/agents', async (req, res, next) => {
  const agents = await Agent.findAll({
    include: [
      { model: Review, as: 'reviews' }
    ]
  })
  return res.json(agents)
})

module.exports = app
