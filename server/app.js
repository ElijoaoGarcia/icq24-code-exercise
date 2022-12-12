const express = require('express')
const { Agent, Review } = require('./model')

const app = express()
const router = express.Router()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const agents = router.route('/agents')
const reviews = router.route('/reviews')

agents.get(async (req, res, next) => {
  try {
    const agents = await Agent.findAll({
      include: [
        { model: Review, as: 'reviews' }
      ]
    })
    return res.json(agents)
  } catch (error) {
    res.status(500)
  }
})

agents.post(async (req, res) => {
  try {
    const { agent } = req.body
    await Agent.create(agent)
    res.status(200).send()
  } catch (error) {
    res.status(500)
  }
})

reviews.post(async (req, res) => {
  try {
    const { review } = req.body
    Review.create(review)
    res.status(200).send()
  } catch (error) {
    res.status(500)
  }
})

app.use(router)

module.exports = app
