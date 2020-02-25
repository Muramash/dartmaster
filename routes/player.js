const router = require("express").Router()
const error = require ("./../error/error")
const db = require("./../data/connect.js").db

router.get('/', (req, res, next) => {
    db.all("SELECT * FROM player")
        .then((response) => {
            res.response = JSON.stringify(response)
            res.render('players', {response: response})
        })
        .catch((err) => {
            throw new error.NotFoundError("Players not found")
        })
})

router.get('/:id', (req, res, next) => {
    let id = +req.params.id;
    if (id != req.params.id) throw new error.BadRequestError("I'm actually not a number bro")

    db.all("SELECT * FROM Player WHERE id=?", id)
        .then((response) => {
            if(!response[0]) throw new error.NotFoundError("Player not found")
            res.response = JSON.stringify(response[0])
            res.render("player", { response: response[0]})
        })
})

router.post("/", (req, res, next) => {
    try{
        req.body = JSON.parse(Object.keys(req.body)[0])
    }
    catch(err){
        req.body = req.body
    }
    let playerName = req.body.playerName
    let playerEmail = req.body.playerEmail

    if(playerEmail && playerName){
        let date = new Date();
        date = date.getUTCDate() + date.getUTCMonth() + date.getUTCFullYear()
        db.run("INSERT INTO player (playerName, playerEmail, playerWon, playerLost, createdTimeStmp) VALUES (?, ?, 0, 0, ?)",
            playerName,
            playerEmail,
            date)
        .then((response) => {
            res.json({ response })
        })
        .catch((err) => res.send(err))
    }
})

router.patch("/:id", (req, res, next) => {
    let id = +req.params.id
    if(id != req.params.id) throw new error.BadRequestError("I'm actually not a number bro")

    try{
        req.body = JSON.parse(Object.keys(req.body)[0])
    }
    catch(err){
        req.body = req.body
    }
    let playerName = req.body.playerName
    let playerEmail = req.body.playerEmail
    let playerWon = req.body.playerWon
    let playerLost = req.body.playerLost
    db.all("SELECT * FROM player WHERE id=?", id)
        .then((response) => {
            if(!response[0]) throw new error.NotFoundError("Player not found")
            if(!playerName) playerName = result[0].playerName
            if(!playerEmail) playerEmail = result[0].playerEmail
            if(!playerWon) playerWon = result[0].playerWon
            if(!playerLost) playerLost = result[0].playerLost
                db.run("UPDATE player SET playerName=?, playerEmail=?, playerWon=?, playerLost=? WHERE id=?",
                playerName,
                playerEmail,
                playerWon,
                playerLost,
                id)
                .then((response) => {
                    res.json({ response})
                })
                .catch((err) => {
                    throw new error.NotFoundError("Player wasn't updated")
                })
        })
        .catch((err) => {
            throw new error.NotFoundError("Player not found")
        })
})

router.delete("/:id", (req, res, next) => {
    let id = +req.params.id
    if(id != req.params.id) throw new error.BadRequestError("I'm actually not a number bro")

    db.run("DELETE FROM player WHERE id=?",
        id)
    .then((response) => {
        res.json({ response})
    })
    .catch((err) => res.send(err))
})
module.exports = router