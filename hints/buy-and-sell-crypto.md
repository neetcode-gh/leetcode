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
    A brute force solution would be to iterate through the array with index <code>i</code>, considering it as the day to buy, and trying all possible options for selling it on the days to the right of index <code>i</code>. This would be an <code>O(n^2)</code> solution. Can you think of a better way?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    You should buy at a price and always sell at a higher price. Can you iterate through the array with index <code>i</code>, considering it as either the buying price or the selling price?
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
    We are trying to maximize <code>profit = sell - buy</code>. If the current <code>i</code> is the sell value, we want to choose the minimum buy value to the left of <code>i</code> to maximize the profit. The result will be the maximum profit among all. However, if all profits are negative, we can return <code>0</code> since we are allowed to skip doing transaction. 
    </p>
</details>