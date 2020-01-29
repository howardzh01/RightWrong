const roundObject = require("./roundObject");

class gameObject {
    constructor(gameId)
    {
        this.gameId = gameId
        this.users = []
        this.rounds = [] //pass in round object\
        this.can_join = true
        this.total_rounds = undefined
    }
    getCurrentRound(){
        return this.rounds[this.rounds.length-1]
    }
        
    
    addNewRound()
    {
        let a = new roundObject(this.gameId, this.rounds.length)
        this.rounds.push(a)
        return a
    }

    updateRoundIntro(intro)
    {
        this.rounds[this.rounds.length-1].intro_line = intro
    }

    isJudge(user)
    {   //for first round
        if(this.rounds.length === 0 && user._id == this.users[0]._id){
            return true
        }
        
        if(user._id === this.users[this.rounds.length% this.users.length]._id)
        {
            return true
        }
        return false
    }




}

module.exports = gameObject;

// myMap = {};

// myMap[userId] = asdf