type Tweet struct {
    count int
    tweetId int
    followeeId int
    index int
}

type TweetHeap []*Tweet
func (h TweetHeap) Len() int           { return len(h) }
func (h TweetHeap) Less(i, j int) bool { return h[i].count < h[j].count }
func (h TweetHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }
func (h *TweetHeap) Push(x interface{}) {*h = append(*h, x.(*Tweet))}
func (h *TweetHeap) Pop() interface{} {
	old := *h
	n := len(old)
	x := old[n-1]
	*h = old[0 : n-1]
	return x
}

type Twitter struct {
    count int
    tweetMap map[int][]*Tweet
    followMap map[int]map[int]bool
}

func Constructor() Twitter {
    return Twitter{tweetMap: make(map[int][]*Tweet), followMap: make(map[int]map[int]bool)}
}

func (this *Twitter) PostTweet(userId int, tweetId int)  {
    if _, ok := this.tweetMap[userId]; !ok {
        this.tweetMap[userId] = make([]*Tweet, 0)
    }
    this.tweetMap[userId] = append(this.tweetMap[userId], &Tweet{count: this.count, tweetId: tweetId})
    this.count -= 1
}


func (this *Twitter) GetNewsFeed(userId int) []int {
    res := make([]int, 0)
    minHeap := TweetHeap{}
    
    if _, ok := this.followMap[userId]; !ok {
        this.followMap[userId] = make(map[int]bool)
    }
    this.followMap[userId][userId] = true;
    for followeeId, _ := range this.followMap[userId] {
        if _, ok := this.tweetMap[followeeId]; ok {
            index := len(this.tweetMap[followeeId]) - 1
            tweet := this.tweetMap[followeeId][index]
            heap.Push(&minHeap, &Tweet{
                count: tweet.count, 
                tweetId: tweet.tweetId, 
                followeeId: followeeId, 
                index: index - 1})
        }
    }
    
    for len(minHeap) > 0 && len(res) < 10 {
        tweet := heap.Pop(&minHeap).(*Tweet)
        res = append(res, tweet.tweetId)
        if tweet.index >= 0 {
            nextTweet := this.tweetMap[tweet.followeeId][tweet.index]
            heap.Push(&minHeap, &Tweet{count: nextTweet.count, 
                                     tweetId: nextTweet.tweetId,
                                     followeeId: tweet.followeeId,
                                     index: tweet.index - 1})
        }
    }
    return res
}


func (this *Twitter) Follow(followerId int, followeeId int)  {
    if _, ok := this.followMap[followerId]; !ok {
        this.followMap[followerId] = make(map[int]bool)
    }
    this.followMap[followerId][followeeId] = true
}


func (this *Twitter) Unfollow(followerId int, followeeId int)  {
    if _, ok := this.followMap[followerId]; ok {
        delete(this.followMap[followerId], followeeId)
    }
}
