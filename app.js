const app = require('express')()
const parser = require('body-parser')
const path = require('path')
const router = require('./router')
const error = require('./error/error')
const port = 8080
const methodOverride = require('method-override')

app.use(methodOverride('X-HTTP-Method-Override'));
app.use(methodOverride('DELETE'));
app.use(methodOverride('_method')); 

app.use(parser.json())
app.use(parser.urlencoded({extended: true}))

app.set("view engine", "pug")
app.set("views", path.join(__dirname, "views"))

app.use("/", router)

app.get("/", (req, res, next) => {
    res.json({data : { message: "Error 404 : API_UNREACHABLE"}})
})

app.use((req, res, next) =>{
    throw new error.NotFoundError()
})

app.use((err, req, res, next) => {
    if (!(err instanceof error.HttpError)) {
        console.error(err)
        err = new error.ServerError()
    }

    return res.status(err.status || 500).json({ err })
})

app.listen(8080, console.log(`Server listen on port ${port}.`))