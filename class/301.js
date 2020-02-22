// Import module
const inquirer = require('inquirer')

// Import class
const Play = require('./play').play

class three extends Play {
    questions = require('../questions')
    scoreBegin = 301

    constructor(){
        super()
    }

    scoring(player, aims){
        for(let aim of aims){
            aim = aim.aim
            if(aim <= 60){
                if(player.getScore()-aim > 1){
                    player.setScore(player.getScore()-aim)
                } else if(aim%2 == 0 && player.getScore()-aim == 0){
                    player.setScore(0)
                }
                if(player.getScore() == 0){
                    super.setStatus(true)
                    super.addListWinner(player)
                }
            }
        }
    }

    getActualAim(){
        return inquirer.prompt(this.questions.three)
    }

    setPlayers(Players){
        super.setPlayers(Players)
        this.setScore()
    }

    setScore(){
        super.setScore(this.scoreBegin)
    }
}

exports.three = three