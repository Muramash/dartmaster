// Import module
const inquirer = require('inquirer')

// Import class
const Play = require('./play').play

class world extends Play {
    questions = require('../questions')
    scoreBegin = 0
    scoreWin = 20

    constructor(){
        super()
    }

    scoring(player, aims){
        for(let aim of aims){
            aim = aim.aim
            if(player.getScore()+1 == parseInt(aim))
                player.setScore(parseInt(aim))
            if(player.getScore() == this.scoreWin){
                super.setStatus(true)
                super.addListWinner(player)
            }
        }
    }

    getActualAim(){
        return inquirer.prompt(this.questions.world)
    }

    setScore(){
        super.setScore(this.scoreBegin)
    }

    setPlayers(Players){
        super.setPlayers(Players)
        this.setScore()
    }
}

exports.world = world