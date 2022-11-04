public class Twitter
{

    private PriorityQueue<TweetInfo, int> pq;
    private int time;
    private Dictionary<int, HashSet<int>> followers;
    private Dictionary<int, List<Tweet>> tweets;

    public Twitter()
    {
        time = 0;
        pq = new PriorityQueue<TweetInfo, int>(new MaxHeap());
        followers = new Dictionary<int, HashSet<int>>();
        tweets = new Dictionary<int, List<Tweet>>();
    }

    //T: O(1)
    public void PostTweet(int userId, int tweetId)
    {
        time++;
        if (!tweets.ContainsKey(userId))
            tweets.Add(userId, new List<Tweet>());
        tweets[userId].Add(new Tweet(time, tweetId));
    }

    public IList<int> GetNewsFeed(int userId)
    {
        var result = new List<int>();
        var followersOfUserId = new HashSet<int>();
        if (followers.ContainsKey(userId))
            followersOfUserId = followers[userId];
        followersOfUserId.Add(userId);

        //We are just adding the last indexed tweet of the all the followers tweet
        foreach (var followeeId in followersOfUserId)
        {
            if (tweets.ContainsKey(followeeId))
            {
                var lastTweetIndex = tweets[followeeId].Count - 1;
                var tweet = tweets[followeeId][lastTweetIndex];
                var tweetInfo = new TweetInfo(tweet.Time, tweet.TweetId, followeeId, lastTweetIndex - 1);
                pq.Enqueue(tweetInfo, tweet.Time);
            }
        }

        while (pq.Count > 0 && result.Count < 10)
        {
            var tweetInfo = pq.Dequeue();
            result.Add(tweetInfo.TweetId);

            if (tweetInfo.Index >= 0)
            {
                var tweet = tweets[tweetInfo.FolloweeId][tweetInfo.Index];
                var tweetInfo2 = new TweetInfo(tweet.Time, tweet.TweetId, tweetInfo.FolloweeId, tweetInfo.Index - 1);
                pq.Enqueue(tweetInfo2, tweet.Time);
            }
        }

        return result;
    }

    //T: O(1)
    public void Follow(int followerId, int followeeId)
    {
        if (!followers.ContainsKey(followerId))
            followers.Add(followerId, new HashSet<int>());
        followers[followerId].Add(followeeId);
    }

    // T: O(1) using HashSet for O(1) deletions
    public void Unfollow(int followerId, int followeeId)
    {
        if (!followers.ContainsKey(followerId))
            return;
        var followersList = followers[followerId];
        if (followersList.Contains(followeeId))
            followers[followerId].Remove(followeeId);
    }

    public class Tweet
    {
        public int Time;
        public int TweetId;

        public Tweet(int time, int tweetId)
        {
            Time = time;
            TweetId = tweetId;
        }
    }

    public class TweetInfo : Tweet
    {
        public int Index;
        public int FolloweeId;

        public TweetInfo(int time, int tweetId, int followeeId, int index) : base(time, tweetId)
        {
            Index = index;
            FolloweeId = followeeId;
            Time = time;
            TweetId = tweetId;
        }
    }

    public class MaxHeap : IComparer<int>
    {
        public int Compare(int x, int y)
        {
            if (x < y) return 1;
            if (x > y) return -1;
            else return 0;
        }
    }
}

/**
 * Your Twitter object will be instantiated and called as such:
 * Twitter obj = new Twitter();
 * obj.PostTweet(userId,tweetId);
 * IList<int> param_2 = obj.GetNewsFeed(userId);
 * obj.Follow(followerId,followeeId);
 * obj.Unfollow(followerId,followeeId);
 */