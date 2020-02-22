// Import module
const inquirer = require('inquirer')

// Import class
const Play = require('./play').play

class Cricket extends Play {
    questions = require('../questions')
    scoreBegin = [
        [15, 0],
        [16, 0],
        [17, 0],
        [18, 0],
        [19, 0],
        [20, 0],
    ]
    lockTab = [
        [15, 0],
        [16, 0],
        [17, 0],
        [18, 0],
        [19, 0],
        [20, 0],
    ]

    tempscore = 0

    constructor(){
        super()
    }

    scoring(player, aims){
        for(let aim of aims){
            let frame = aim.frame
            let area = aim.area
            for(let number of player.getScore()){
                if(frame == number[0]){
                    console.log("Player score 1 : ", player.getScore())
                    number[1] = area
                    console.log("good job ! You stricked frame", number[0], "with", number[1], "points.")
                    console.log("Player score 2 : ", player.getScore())
                }
                if(player.getScore()[number[1]] >= 3){
                    console.log("Frame", number[0],"is locked.")
                    this.lockTab[number[1]] =  1
                }
            }
        }
        console.log("Player : ",player.getName()," have stricked : ",player.getScore())
        console.log("lockTab", this.lockTab)
    }

    getActualAim(){
        return inquirer.prompt(this.questions.cricket)
    }

    setPlayers(Players){
        super.setPlayers(Players)
        this.setScore()
    }

    setScore(){
        super.setScore([...this.scoreBegin])
    }
}

exports.cricket = Cricket