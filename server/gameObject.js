const roundObject = require("./roundObject");

class gameObject {
    constructor(gameId)
    {
        this.gameId = gameId
        this.users = []
        this.rounds = [] //pass in round object
        this.can_join = true
        this.total_rounds = undefined
        this.usersToScore = {}
        this.mapUserIdToUser = {}
    }

    initializeLeaderBoard(){
        this.users.map((user) => {
        this.usersToScore[user._id] = 0
        this.mapUserIdToUser[user._id] = user});
    }
    getCurrentRound(){
        return this.rounds[this.rounds.length-1]
    }
        
    
    addNewRound()
    {
        this.rounds.push(new roundObject(this.gameId, this.users[this.rounds.length % this.users.length], this.rounds.length))
    }

    updateRoundIntro(intro)
    {
        this.rounds[this.rounds.length-1].intro_line = intro
    }

    isJudge(user)
    {   //for first round
        if(this.rounds.length === 0 ){
            if(user._id == this.users[0]._id){
                return true
            }
            return false
        }
    
        else if(user._id === this.users[this.rounds.length % this.users.length]._id)
        {
            return true
        }
        return false
    }




}

module.exports = gameObject;