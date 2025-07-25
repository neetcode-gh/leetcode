<br>
<details class="hint-accordion">  
    <summary>Recommended Time & Space Complexity</summary>
    <p>
    You should aim for a solution with <code>O(n)</code> time and <code>O(1)</code> space, where <code>n</code> is the size of input array.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 1</summary>
    <p>
    A brute force approach would be to recursively explore all paths from index <code>0</code> to its reachable indices, then process those indices similarly, returning <code>true</code> if we reach the last index. This would be an exponential approach. Can you think of a better way? Maybe a greedy approach works.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    Instead of processing the array from index <code>0</code>, start from the last index. Let the target index be <code>goal = n - 1</code>. Iterate in reverse from index <code>n - 2</code>.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    At each iteration, we check whether the current index can reach <code>goal</code>. If it can, we update <code>goal</code> to the current index, as reaching the current index means we can also reach the <code>goal</code>.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 4</summary>
    <p>
    To determine if we can reach the last index, the <code>goal</code> should be <code>0</code> after the iteration. Otherwise, reaching the last index is not possible.
    </p>
</details>
