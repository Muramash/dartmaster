exports.gameplay = questions = [
    {
        type: 'list',
        name: 'type',
        message: 'Mode de jeu (1 = World  2 = 301  3 = Cricket):',
        choices: ['1', '2', '3'],
        filter: function(val) {
          return val.toLowerCase()
        }
      }
]

exports.nbPlayers = questions = [
    {
        type: "input",
        name: "nbPlayers",
        message: "Combien de joueurs ?",
        default: 2,
        validate: function(value) {
            var valid = !isNaN(parseFloat(value))
            return valid || 'Please enter a number'
          },
        filter: Number
    }
]

exports.createPlayer = questions = [
    {
        type: 'input',
        name: 'name',
        message: 'Choisi un nom',
    }
]

exports.world = questions = [
    {
        type: 'input',
        name: 'shoot',
        message: 'Secteur :',
    }
]

exports.three = questions = [
    {
        type: 'input',
        name: 'shoot',
        message: 'Marque :',
        validate: function(value) {
          var valid = !isNaN(parseFloat(value))
          return valid || 'Please enter a number'
        },
        filter: Number
    }
]

exports.cricket = questions = [
    {
        type: 'input',
        name: 'frame',
        message: 'Frame stricked :',
        validate: function(value) {
            var valid = !isNaN(parseFloat(value))
            return valid || 'Please enter a number'
        },
        filter: Number
    },
    {
        type: 'list',
        name: 'area',
        message: 'Simple, double ou triple :',
        choices: ['1', '2', '3'],
        validate: function(value) {
          var valid = !isNaN(parseFloat(value))
          return valid || 'Please enter a number'
        },
        filter: Number
    }
]

exports.playerName = (index) => {
    return     {
        type: 'input',
        name: 'p'+ index,
        message: 'Nom du joueur :'
    }
}
