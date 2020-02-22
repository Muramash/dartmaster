'use strict'
// Import module
require('events').EventEmitter.defaultMaxListeners = 999
const inquirer = require('inquirer')

// Import class
const Player = require('./class/player').player
const World = require('./class/world').world
const Three = require('./class/301').three
const Cricket = require('./class/cricket').cricket

const questions = require('./questions')

console.log('Bienvenue sur dartmaster.')

async function start() {
    let nbPlayers = (await inquirer.prompt(questions.nbPlayers)).nbPlayers
    console.log(nbPlayers)
    let allPlayers = []
    for(let i = 0 ; i<nbPlayers ; i++){
        let newPlayer = await inquirer.prompt(questions.createPlayer)
        newPlayer = new Player(newPlayer.name)
        allPlayers.push(newPlayer)
    }
    let gameplay = await inquirer.prompt(questions.gameplay)
    switch(gameplay.type){
        case '1':
            gameplay = new World()
            break
        case '2':
            gameplay = new Three()
            break
        case '3':
            gameplay = new Cricket()
            break
        default:
            return new Error()
    }
    gameplay.setPlayers(allPlayers)
    while(!gameplay.getStatus()){
        for(let player of gameplay.getPlayers()){
            console.log(`Player : ${player.getName()} | Score : ${player.getScore()}`)
            let allShoots = []
            for(let i = 0 ; i<3 ; i++){
                let actualAim = await gameplay.getActualAim()
                allShoots.push(actualAim)
            }
            gameplay.scoring(player, allShoots)
            console.log(player.score)
        }
    }
console.log('Gagnant :', gameplay.getListWinner().keys())
}

start()