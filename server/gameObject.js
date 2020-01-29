class gameObject {
    constructor(gameId)
    {
        this.gameId = gameId
        this.users = []
        this.rounds = [] //pass in round object\
        this.can_join = true
        this.total_rounds = undefined

    }

}

module.exports = gameObject;

// myMap = {};

// myMap[userId] = asdf