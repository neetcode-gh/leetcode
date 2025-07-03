<br>
<details class="hint-accordion">  
    <summary>Recommended Time & Space Complexity</summary>
    <p>
    You should aim for a solution with <code>O(n)</code> time and <code>O(1)</code> extra space, where <code>n</code> is the size of the input array.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 1</summary>
    <p>
    The given intervals are non-overlapping and sorted in ascending order based on the start value. Try to visualize them as line segments and consider how a new interval can be inserted. Maybe you should analyze different cases of inserting a new interval.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    First, we append all intervals to the output list that have an end value smaller than the start value of the new interval. Then, we encounter one of three cases: we have appended all intervals, we reach an interval whose start value is greater than the new interval’s end, or we find an overlapping interval. Can you think of a way to handle these cases efficiently?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    We iterate through the remaining intervals, updating the new interval if its end value is greater than or equal to the current interval's start value. We adjust the start and end of the new interval to the minimum and maximum values, respectively. After this, any remaining intervals are appended to the output list, and we return the result.
    </p>
</details>
