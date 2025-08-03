<br>
<details class="hint-accordion">  
    <summary>Recommended Time & Space Complexity</summary>
    <p>
    You should aim for a solution with <code>O(nlogn)</code> time and <code>O(n)</code> space, where <code>n</code> is the size of the input array.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 1</summary>
    <p>
    If two intervals are sorted in ascending order by their start values, they overlap if the start value of the second interval is less than the end value of the first interval. And these are called overlapping intervals.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    A brute force approach would be to sort the given intervals in ascending order based on their start values and recursively explore all possibilities. This would be an exponential approach. Can you think of a better way? Maybe a greedy approach works here.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    We first sort the given intervals based on their start values to efficiently check for overlaps by comparing adjacent intervals. We then iterate through the sorted intervals from left to right, keeping track of the previous interval’s end value as <code>prevEnd</code>, initially set to the end value of the first interval.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 4</summary>
    <p>
    We then iterate from the second interval. If the current interval doesn't overlap, we update <code>prevEnd</code> to the current interval's end and continue. Otherwise, we set <code>prevEnd</code> to the minimum of <code>prevEnd</code> and the current interval’s end, greedily removing the interval that ends last to retain as many intervals as possible.
    </p>
</details>
