class User {
    private int uid;
    private Set<Integer> followingIDs;
    private List<Integer> tweetIDs;
    
    public User(int uid) {
        this.uid = uid;
        this.followingIDs = new HashSet<>();
        this.followingIDs.add(this.uid); // by default, follows self
        this.tweetIDs = new ArrayList<>();
    }
    
    public Set<Integer> getFollowingIDs() {
        return this.followingIDs;
    }
    
    public List<Integer> getTweetIDs() {
        return this.tweetIDs;
    }
    
    public int getID() {
        return this.uid;
    }
    
    @Override
    public String toString() {
        return "[" + this.uid + ", following: " + this.followingIDs + ", tweets: " + this.tweetIDs + "]";
    }
    
    // Most recent ones are at the end
    public void follow(int fid) {
        this.followingIDs.add(fid);
    }
    
    public void unfollow(int fid) {
        this.followingIDs.remove(fid);
    }
    
    // If remove tweet existed, treeSet would've been used (to maintain ordering)
    public void postTweet(int tweetID) {
        this.tweetIDs.add(tweetID);
    }
}

class Tweet {
    private int tweetID;
    private int timestamp;
    
    public Tweet(int tweetID, int timestamp) {
        this.tweetID = tweetID;
        this.timestamp = timestamp;
    }
    
    public int getTimeStamp() {
        return this.timestamp;
    }
    
    public Integer getTweetID() {
        return this.tweetID;
    }
    
    @Override
    public String toString() {
        return "{" + this.tweetID + "," + this.timestamp + "}";
    }
}

class Database {
    private static int GLOBAL_TIME = 0;
    
    // 1 <= userID <= 500 ---> Can be 501 sized array instead of HashMap
    private static int NUM_USERS = 501;
    private User[] users;
    private boolean[] userExists;
    
    // 0 <= tweetID <= 10^4 --> Can be 10^4 + 1 sized array instead of HashMap
    private static int NUM_TWEETS = 10000 + 1;
    private Tweet[] tweets;
    
    // Acts like a 'node' to indicate where to go next
    class Triplet {
        int userId;
        int index;
        int tweetID;
        
        public Triplet(int userId, int index, int tweetID) {
            this.userId = userId;
            this.index = index;
            this.tweetID = tweetID;
        }
        
        @Override
        public String toString() {
            return "[" + this.userId + "," + this.index + "," + this.tweetID + "]";
        }
    }
    
    // Compare the linked list of tweets present in the user class
    // Nested class to access the 'tweets'
    class TweetComparator implements Comparator<Triplet> {
        @Override
        public int compare(Triplet o1, Triplet o2) {
            // Compare max. with respect to timestamp
            return (
                tweets[o2.tweetID].getTimeStamp() - 
                tweets[o1.tweetID].getTimeStamp()
            );
        }
    }
    // From outside, Database.TweetComparator obj = databaseObj.new TweetComparator()
    private TweetComparator comparator;
    
    // Constructor
    public Database() {
        this.users = new User[NUM_USERS];
        this.userExists = new boolean[NUM_USERS];
        Arrays.fill(this.userExists, false);
        
        this.tweets = new Tweet[NUM_TWEETS];
        this.comparator = new TweetComparator();
    }
    
    private void createUserMaybe(int uid) {
        if(this.userExists[uid])
            return;
    
        this.userExists[uid] = true;
        User user = new User(uid);
        this.users[uid] = user;
    }
    
    private void createTweet(int tweetId) {
        Tweet tweet = new Tweet(tweetId, Database.GLOBAL_TIME);
        Database.GLOBAL_TIME++;
        this.tweets[tweetId] = tweet;
    }
    
    public void postTweet(int uid, int tweetId) {
        // Create new User if doesn't exist
        createUserMaybe(uid);
        
        // Create new Tweet
        createTweet(tweetId);
        
        // Post the tweet
        this.users[uid].postTweet(tweetId);
    }
    
    public void follow(int followerId, int followeeId) {
        // Create users if doesn't exist
        createUserMaybe(followerId);
        createUserMaybe(followeeId);
        
        // Follow
        this.users[followerId].follow(followeeId);
    }
    
    public void unfollow(int followerId, int followeeId) {
        // Create users if doesn't exist
        createUserMaybe(followerId);
        createUserMaybe(followeeId);
        
        // Unfollow
        this.users[followerId].unfollow(followeeId);
    }
    
    private List<Tweet> getMaxTopK(int userId, int k) {
        // Check if this user exists or not
        if(!this.userExists[userId])
            return new ArrayList<>();
            
        // Use top k of sorted list type logic
        PriorityQueue<Triplet> pq = new PriorityQueue<>(this.comparator);
        
        User user = this.users[userId];
        Set<Integer> followingIDs = user.getFollowingIDs();

        // Take the most recent (i.e. last) tweet for each of the following user
        for(int followingID: followingIDs) {
            User followingUser = this.users[followingID];
            List<Integer> followingUserTweetIds = followingUser.getTweetIDs();

            if(followingUserTweetIds.isEmpty())
                continue;
            
            int lastIndex = followingUserTweetIds.size() - 1;
            int mostRecentTweetID = followingUserTweetIds.get(lastIndex);
            Triplet triplet = new Triplet(followingID, lastIndex, mostRecentTweetID);
            
            pq.add(triplet);
        }
        // Now, remove from pq, and "move required pointers/links" accordingly
        List<Tweet> maxTweets = new ArrayList<>();
        
        while(!pq.isEmpty() && (maxTweets.size() < k)) {
            Triplet top = pq.remove();
            maxTweets.add(tweets[top.tweetID]);
            
            // For this top's user, if 'lesser' recent tweet is available, add to pq
            int userID = top.userId;
            int nextIndex = top.index - 1; // move backwards due to ArrayList
            if(nextIndex < 0)
                continue;
            
            int newTweetID = users[userID].getTweetIDs().get(nextIndex);
            Triplet newTriplet = new Triplet(userID, nextIndex, newTweetID);
            pq.add(newTriplet);
        }
        
        return maxTweets;
    }
    
    public List<Integer> getMaxTop10TweetIDs(int userId) {
        List<Tweet> tweets = getMaxTopK(userId, 10);
        // Instead of streams, normal for loop may also be used
        return tweets
                .stream()
                .map(x -> x.getTweetID())
                .collect(Collectors.toList());
    }
}

class Twitter {
    private Database db;
    
    public Twitter() {
        this.db = new Database();    
    }
    
    public void postTweet(int userId, int tweetId) {
        this.db.postTweet(userId, tweetId);
    }
    
    public List<Integer> getNewsFeed(int userId) {
        return db.getMaxTop10TweetIDs(userId);
    }
    
    public void follow(int followerId, int followeeId) {
        this.db.follow(followerId, followeeId);
    }
    
    public void unfollow(int followerId, int followeeId) {
        this.db.unfollow(followerId, followeeId);
    }
}

/**
 * Your Twitter object will be instantiated and called as such:
 * Twitter obj = new Twitter();
 * obj.postTweet(userId,tweetId);
 * List<Integer> param_2 = obj.getNewsFeed(userId);
 * obj.follow(followerId,followeeId);
 * obj.unfollow(followerId,followeeId);
 */