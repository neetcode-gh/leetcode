class Twitter() {
    
    var time = 0
    val tweetMap = HashMap<Int, ArrayList<Pair<Int, Int>>>()   //[userId, [time, tweetId]]
    val followMap = HashMap<Int, HashSet<Int>>()    //[userId, [userId]] hashset to avoud duplicats

    fun postTweet(userId: Int, tweetId: Int) {
        val tweetList = tweetMap.getOrDefault(userId, ArrayList<Pair<Int, Int>>())
        tweetList.add(time to tweetId)
        tweetMap.put(userId, tweetList)
        time++
    }

    fun getNewsFeed(userId: Int): List<Int> {
        val res = ArrayList<Int>()
        val maxHeap = PriorityQueue<IntArray>{ a,b -> b[0] - a[0] } //[time, tweetId, index, uID] maxHeap with latest (highest time) first
        
        val fl = followMap.getOrDefault(userId, HashSet<Int>())
        fl.add(userId) // get our own tweets aswell
        for(friend in fl){
            val tl = tweetMap.get(friend)
            if(tl != null){
                var index = tl.size-1
                val (time, tweetId) = tl.get(index)
                maxHeap.add(intArrayOf(time, tweetId, --index, friend))
            }
        }
        while(res.size < 10 && !maxHeap.isEmpty()){
            val (t, tw, i, f) = maxHeap.poll()
            res.add(tw)
            val tl = tweetMap.get(f)
            if(tl != null && tl.size > 0 && i >= 0){
                val (time, tweetId) = tl.get(i)
                maxHeap.add(intArrayOf(time, tweetId, i-1, f))
            } 
        }
        return res
    }
    
    fun follow(followerId: Int, followeeId: Int) {
        val followSet = followMap.getOrDefault(followerId, HashSet<Int>())
        followSet.add(followeeId)
        followMap.put(followerId, followSet)
    }

    fun unfollow(followerId: Int, followeeId: Int) {
        val followSet = followMap.getOrDefault(followerId, HashSet<Int>())
        followSet?: return
        if(followSet.contains(followeeId)){
            followSet.remove(followeeId)
            followMap.put(followerId, followSet)
        }
    }
}

/**
 * Your Twitter object will be instantiated and called as such:
 * var obj = Twitter()
 * obj.postTweet(userId,tweetId)
 * var param_2 = obj.getNewsFeed(userId)
 * obj.follow(followerId,followeeId)
 * obj.unfollow(followerId,followeeId)
 */
