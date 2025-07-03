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
    A brute force approach would be to recursively explore all paths from index <code>0</code> to its reachable indices, then process those indices similarly and return the minimum steps to reach the last index. This would be an exponential approach. Can you think of a better way? Maybe a greedy approach works.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    We maintain two pointers, <code>l</code> and <code>r</code>, initially set to <code>0</code>, representing the range of reachable indices. At each step, we iterate through the indices in the range <code>l</code> to <code>r</code> and determine the farthest index that can be reached from the current range.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    We then update the pointers <code>l</code> and <code>r</code> to the next range, setting <code>l</code> to <code>r + 1</code> and <code>r</code> to the farthest index reachable from the current range. We continue this process until the pointers go out of bounds.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 4</summary>
    <p>
    The number of steps taken represents the minimum steps required to reach the last index, as it is guaranteed that we can reach it.
    </p>
</details>
