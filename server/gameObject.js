class gameObject {
    constructor(gameId)
    {
        this.gameId = gameId
        this.users = []
        this.rounds = [] //pass in round object\
        this.canJoin = true
        this.total_rounds = 0

    }

}

module.exports = gameObject;

// myMap = {};

// myMap[userId] = asdf