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
    A brute force approach would be to check every pair of intervals and return <code>false</code> if any overlap is found. This would be an <code>O(n^2)</code> solution. Can you think of a better way? Maybe you should visualize the given intervals as line segments.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    We should sort the given intervals based on their start values, as this makes it easier to check for overlaps by comparing adjacent intervals. We then iterate through the intervals from left to right and return <code>false</code> if any adjacent intervals overlap.
    </p>
</details>
