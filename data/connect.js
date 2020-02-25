const database = require('sqlite')

database.open("./data/dart.db")

exports.db = database