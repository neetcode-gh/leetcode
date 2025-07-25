<br>
<details class="hint-accordion">  
    <summary>Recommended Time & Space Complexity</summary>
    <p>
    You should aim for a solution as good or better than <code>O(nlogn)</code> time and <code>O(n)</code> space, where <code>n</code> is the size of the input array.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 1</summary>
    <p>
    Sorting the given intervals in ascending order based on their start values is beneficial, as it helps in identifying overlapping intervals efficiently. How can you determine if two intervals overlap?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    If two intervals are sorted in ascending order by their start values, they overlap if the start value of the second interval is less than or equal to the end value of the first interval.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    We iterate through the sorted intervals from left to right, starting with the first interval in the output list. From the second interval onward, we compare each interval with the last appended interval. Can you determine the possible cases for this comparison?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 4</summary>
    <p>
    The two cases are: if the current interval overlaps with the last appended interval, we update its end value to the maximum of both intervals' end values and continue. Otherwise, we append the current interval and proceed.
    </p>
</details>
