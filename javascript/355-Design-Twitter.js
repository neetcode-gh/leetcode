
var Twitter = function() {
     this.folow = new Map();  //uid:{uid:true,uid:true,...} uid--> Follows these...
     this.tweets = new Map(); //tid:uid
};

/** 
 * @param {number} userId 
 * @param {number} tweetId
 * @return {void}
 */
Twitter.prototype.postTweet = function(userId, tweetId) {
    let tweets = this.tweets;    
    tweets.set(tweetId,userId);
};

/** 
 * @param {number} userId
 * @return {number[]}
 */
Twitter.prototype.getNewsFeed = function(userId) {
    let tweets = this.tweets;
    let folow = this.folow;
    let ids = {};
    if (folow.has(userId)) {
        ids = folow.get(userId);
    }
    
    let res = [];
    let ar = Array.from(tweets);

    while (res.length < 10 && ar.length > 0) {
        let item = (ar.pop());
        if (item[1] === userId || ids[item[1]]) {
            res.push(item[0]);   
        }                        
    }
    
    return res;    
};

/** 
 * @param {number} followerId 
 * @param {number} followeeId
 * @return {void}
 */
Twitter.prototype.follow = function(followerId, followeeId) {
    let folow = this.folow;
    let ar = {};
    if (folow.has(followerId)) {
        ar = folow.get(followerId);
    }
    
    ar[followeeId] = true;
    folow.set(followerId, ar);
};

/** 
 * @param {number} followerId 
 * @param {number} followeeId
 * @return {void}
 */
Twitter.prototype.unfollow = function(followerId, followeeId) {
    let folow = this.folow;
    let ar = {};
    if (folow.has(followerId)) {
        ar = folow.get(followerId);
    }
    
    if (ar.hasOwnProperty(followeeId)) {
        delete ar[followeeId];
    }
    
    folow.set(followerId, ar);
};

/** 
 * Your Twitter object will be instantiated and called as such:
 * var obj = new Twitter()
 * obj.postTweet(userId,tweetId)
 * var param_2 = obj.getNewsFeed(userId)
 * obj.follow(followerId,followeeId)
 * obj.unfollow(followerId,followeeId)
 */