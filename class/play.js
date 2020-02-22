class Play {
    status = false
    Players = []
    listWinner = new Map()

    constructor() {
        if(this.constructor == Play){
            throw new Error(" Object of Abstract Class cannot be created")
        }
    }

    setPlayers(Players){
        this.Players = Players
    }

    getPlayers(){
        return this.Players
    }

    setScore(score){
        for(let player of this.Players){
            player.setScore(score)
        }
    }

    getStatus(){ return this.status }

    setStatus(status){
        this.status = status
    }

    addListWinner(player){
        this.listWinner.set(player.name, player)
    }

    getListWinner(){ return this.listWinner }

    getActualAim(){ throw new Error() }
}

exports.play = Play