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
    A brute force approach would be to start at each gas station, simulate the process, and return the index where completing the circuit is possible. This would be an <code>O(n^2)</code> time solution. Can you think of a better way? Maybe a greedy approach works.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
   We can immediately return <code>-1</code> if <code>sum(gas) < sum(cost)</code>, as completing the circuit is impossible due to insufficient gas. Otherwise, a solution always exists because the total gas is sufficient to cover the total cost, meaning there must be a valid starting point that allows completing the circuit.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    We start with a variable <code>total</code> to track the gas balance and initialize the result index to <code>0</code>. As we iterate through the array with index <code>i</code>, we accumulate the difference <code>(gas[i] - cost[i])</code>. If <code>total</code> becomes negative at any index, we reset it to <code>0</code> and update the result index to <code>(i + 1)</code>.
    </p>
</details>
