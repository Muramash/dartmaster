const router = require("express").Router()
const error = require("./../error/error")
const db = require("./../data/connect.js").db

router.get('/', (req, res, next) => {
    db.all('SELECT * FROM game')
        .then((response) => {
            res.response = JSON.stringify(response)
            res.render('games', { response: response})
        })
        .catch((err) => {
            throw new error.NotFoundError(err)
            console.log(err)
        })
})

router.get("/:id", (req, res, next) => {
    let id = +req.params.id
    if (id != req.params.id) throw new error.BadRequestError("I'm actually not a number bro")

    db.all("SELECT * FROM game WHERE id =?", id)
        .then((response) => {
            if(!response[0]) throw new error.NotFoundError("Game not found")
            res.response = JSON.stringify(response[0])
            res.render("game", { response: response[0]})
        })
        .catch((err) => {
            throw new error.NotFoundError("Game not found")
            console.log(err)
        })
})

router.get('/:id/players', (req, res, next) => {
    let id = +req.params.id
    if (id != req.params.id) throw new error.BadRequestError("I'm actually not a number bro")

    db.all("SELECT * FROM played INNER JOIN Player ON Player.id = played.playerId WHERE gameId=?", id)
        .then((response) => {
            res.response = JSON.stringify(response)
            res.render("players", { response: response })
        })
        .catch((err) => {
            throw new error.NotFoundError("Game not found")
        })
})

router.post('/new', (req, res, next) => {
    try{
        req.body = JSON.parse(Object.keys(req.body)[0])
    } 
    catch(err) {
        req.body = req.body
    }
    res.json(req.body)
})

router.post('/', (req, res, next) => {
    try {
        req.body = JSON.parse(Object.keys(req.body)[0])
    } 
    catch(err) {
        req.body = req.body
    }
    let gameMode = req.body.gameMode
    let gameName = req.body.gameName
    if (gameMode && gameName){
        let date = new Date()
        date = date.getUTCDate() + date.getUTCMonth() + date.getUTCFullYear()
        db.run('INSERT INTO Game (gameMode, gameName, gameStatus, created) VALUES (?,?, "draft", ?',
            gameMode,
            gameName,
            date)
            .then((response) => {
                res.json({ response })
            })
            .catch((err) => res.send(err))
    }
})

router.patch('/:id', (req, res, next) => {
    let id = +req.params.id
    if (id != req.params.id) throw new error.BadRequestError("I'm actually not a number bro")

    try{
        req.body = JSON.parse(Object.keys(req.body)[0])
    }
    catch(err){
        req.body = req.body
    }
    let gameMode = req.body.gameMode
    let gameName = req.body.gameName
    let actualPlayerId = req.body.actualPlayerId
    let gameStatus = req.body.status
    db.all("SELECT * FROM game WHERE id=?", id)
        .then((response) => {
            if(!response[0]) throw new error.NotFoundError("Game not found")
            if(!gameMode) gameMode = result[0].gameMode
            if(!gameName) gameName = result[0].gameName
            if(!actualPlayerId) actualPlayerId = response[0].actualPlayerId
            if(!gameStatus) gameStatus = result[0].gameStatus

            db.run('UPDATE game SET gameMode=?, gameName=?, actualPlayerId=?, gameStatus=? WHERE id =?',
            gameMode,
            gameName,
            actualPlayerId,
            gameStatus,
            id)
                .then((response2) => {
                    res.json({response2})
                })
                .catch((err) => {
                    throw new error.NotFoundError("Game wasn't updated")
                })
        })
        .catch((err) =>{
            throw new error.NotFoundError("Game not found")
        })
})

router.delete('/:id', (req, res, next) => {
    let id = +req.params.id
    if (id != req.params.id) throw new error.BadRequestError("I'm actually not a number bro")
    db.run('DELETE FROM game WHERE id=?', id)
    .then((response) => {
        res.json({response})
    })
    .catch((err) => res.send(err))
})

module.exports = router