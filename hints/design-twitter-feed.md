<br>
<details class="hint-accordion">  
    <summary>Recommended Time & Space Complexity</summary>
    <p>
    You should aim for a solution with <code>O(n)</code> time for each <code>getNewsFeed()</code> function call, <code>O(1)</code> time for the remaining methods, and <code>O((N * m) + (N * M) + n)</code> space, where <code>n</code> is the number of <code>followeeIds</code> associated with the <code>userId</code>, <code>m</code> is the maximum number of tweets by any user, <code>N</code> is the total number of <code>userIds</code>, and <code>M</code> is the maximum number of followees for any user.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 1</summary>
    <p>
    Can you think of a data structure to store all the information, such as <code>userIds</code> and corresponding <code>followeeIds</code>, or <code>userIds</code> and their tweets? Maybe you should think of a hash data structure in terms of key-value pairs. Also, can you think of a way to determine that a tweet was posted before another tweet?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    We use a hash map <code>followMap</code> to store <code>userIds</code> and their unique <code>followeeIds</code> as a <code>hash set</code>. Another hash map, <code>tweetMap</code>, stores <code>userIds</code> and their tweets as a list of <code>(count, tweetId)</code> pairs. A counter <code>count</code>, incremented with each tweet, tracks the order of tweets. The variable <code>count</code> is helpful in distinguishing the time of tweets from two users. This way of storing data makes the functions <code>follow()</code>, <code>unfollow()</code>, and <code>postTweet()</code> run in <code>O(1)</code>. Can you think of a way to implement <code>getNewsFeed()</code>? Maybe consider a brute force approach and try to optimize it.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    A naive solution would involve taking the tweets of the userId and its followeeIds into a list, sorting them in descending order based on their <code>count</code> values, and returning the top <code>10</code> tweets as the most recent ones. Can you think of a more efficient approach that avoids collecting all tweets and sorting? Perhaps consider a data structure and leverage the fact that each user's individual tweets list is already sorted.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 4</summary>
    <p>
    We can use a Max-Heap to efficiently retrieve the top <code>10</code> most recent tweets. For each followee and the userId, we insert their most recent tweet from the <code>tweetMap</code> into the heap, along with the tweet's <code>count</code> and its index in the tweet list. This index is necessary because after processing a tweet, we can insert the next most recent tweet from the same user's list. By always pushing and popping tweets from the heap, we ensure that the <code>10</code> most recent tweets are retrieved without sorting all tweets.
    </p>
</details>