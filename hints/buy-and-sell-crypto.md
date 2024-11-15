<br>
<details class="hint-accordion">  
    <summary>Recommended Time & Space Complexity</summary>
    <p>
    You should aim for a solution with <code>O(n)</code> time and <code>O(1)</code> space, where <code>n</code> is the size of the input array.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 1</summary>
    <p>
    A brute force solution would be to iterate throgh the array with index <code>i</code>, considering it as the day to buy, and trying all possible options for selling it on the days to the right of index <code>i</code>. This would be an <code>O(n^2)</code> solution. Can you think of a better way?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    From the problem, you should buy at a price and should always sell at a higher price. Can you try to fix anyone between buy and sell?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    We can iterate through the array with index <code>i</code>, considering it as the selling value. But what value will it be optimal to consider as buying point on the left of index <code>i</code>?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 4</summary>
    <p>
    It is obvious to take the minimum value as the buying point on the left of index <code>i</code>. So, we just need to maintain the prefix minimum for the index <code>i</code> and compute the profit as <code>sell - buy</code>. The result will be the maximum profit among all. We also need to make sure that we can also avoid doing transaction. So, we should initialize our maximum profit as <code>0</code>. 
    </p>
</details>