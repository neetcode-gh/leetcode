<br>
<details class="hint-accordion">  
    <summary>Recommended Time & Space Complexity</summary>
    <p>
    You should aim for a solution as good or better than <code>O(n)</code> time and <code>O(n)</code> space, where <code>n</code> is the size of the input array.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 1</summary>
    <p>
    Try to think in terms of recursion and visualize it as a decision tree. Can you determine the possible decisions at each recursion step? Also, can you identify the base cases and the essential information that needs to be tracked during recursion?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    At each recursion step, we can buy only if we haven't already bought a coin, or we can sell if we own one. When buying, we subtract the coin value, and when selling, we add it. We explore all possible buying and selling options recursively, iterating through the coins from left to right using index <code>i</code>. For the cooldown condition, if we buy a coin, we increment the index <code>i</code> by two.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    We can use a boolean variable <code>canBuy</code> to indicate whether buying is allowed at the current recursive step. If we go out of bounds, we return <code>0</code>. This approach is exponential. Can you think of a way to optimize it?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 4</summary>
    <p>
    We can use memoization to cache the results of recursive calls and avoid recalculations. A hash map or a <code>2D</code> array can be used to store these results.
    </p>
</details>
