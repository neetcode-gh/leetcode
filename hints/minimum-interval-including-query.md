<br>
<details class="hint-accordion">  
    <summary>Recommended Time & Space Complexity</summary>
    <p>
    You should aim for a solution as good or better than <code>O(nlogn + mlogm)</code> time and <code>O(n + m)</code> space, where <code>m</code> is the size of the array <code>queries</code> and <code>n</code> is the size of the array <code>intervals</code>.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 1</summary>
    <p>
    A brute force approach would be to iterate through each query and, for each query, check all intervals to find the result. This would be an <code>O(m * n)</code> solution. Can you think of a better way? Maybe processing the queries in sorted order could help.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    We sort the intervals by start value and process the queries in ascending order. Using a pointer <code>i</code>, we add intervals to a min-heap while their start values are less than or equal to the query, storing their end values and sizes.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    The min-heap is ordered by interval size. We remove elements from the heap while the top element’s end value is less than the current query. The result for the query is the top element’s size if the heap is non-empty; otherwise, it is <code>-1</code>.
    </p>
</details>
