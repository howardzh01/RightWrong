class roundObject {
    constructor(gameId, judge, round_number)
    {
        this.gameId = gameId
        this.judge = judge
        this.round_number = round_number
        this.intro_line = ""
        this.mapUserToSentence = {}
        this.winner_userId = undefined;

    }

    
}

module.exports = roundObject;