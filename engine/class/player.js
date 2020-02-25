class Player {
    score = undefined

    constructor(name){
        this.name = name
    }

    setScore(score){
        this.score = score
    }
    
    getName(){ return this.name }
    getScore(){ return this.score }

}

exports.player = Player