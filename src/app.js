const dotenv = require("dotenv")
const express = require("express")
const Joi = require("joi")

const app = express()

const configMiddlewares = require("./middlewares")

app.use(express.json())
dotenv.config()
const PORT = process.env.PORT || 3000

configMiddlewares(app)


const courses = [
    { id: 1, name: "introduction to java", price: 120 },
    { id: 2, name: "introduction to ruby", price: 110 },
    { id: 3, name: "introduction to php", price: 115 },
]


const validate = (req) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        price: Joi.number().min(1).max(100).required(),
    })

    return schema.validate(req.body)

}


app.get("/api/courses/", (req, res) => {
    res.json({ data: courses })
})

app.get("/api/courses/:id/", (req, res) => {

    const id = req.params.id;
    const course = courses.find(el => el.id === parseInt(id))

    if (!course)
        return res.status(404).json({ msg: "course not found" })

    res.json({ data: course })
})

app.post("/api/courses/", (req, res) => {

    const { value, error } = validate(req);
    if (error)
        return res.status(400).json(error.details[0].message)

    const course = {
        id: courses.length + 1,
        name: req.body.name.slice(0, 10),
        price: parseInt(req.body.price)
    }

    courses.push(course);

    res.send(course)
})


app.put("/api/courses/:id/", (req, res) => {
    const id = parseInt(req.params.id)
    // check 404
    const index = courses.findIndex(el => el.id === id)

    if (index === -1)
        return res.status(404).json({ msg: "course not found" })

    // validate
    const { value, error } = validate(req);
    if (error)
        return res.status(400).json(error.details[0].message)

    // update
    let course = courses[index]
    course = req.body
    course.id = id

    courses[index] = course

    res.send(course)
})


app.delete("/api/courses/:id/", (req, res) => {
    const id = parseInt(req.params.id)
    // check 404
    const index = courses.findIndex(el => el.id === id)

    if (index === -1)
        return res.status(404).json({ msg: "course not found" })

    courses.splice(index, 1)

    res.json(course)

})


app.use((req, res, next) => {
    res.status(404).json({ code: 404, msg: "Not Found" });
    next()
})

app.listen(PORT, () => {
    console.log(`app is listening at http://localhost:${PORT}`)
})
