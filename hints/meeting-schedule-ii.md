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
    Try to visualize the meetings as line segments on a number line representing start and end times. The number of rooms required is the maximum number of overlapping meetings at any point on the number line. Can you think of a way to determine this efficiently?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    We create two arrays, start and end, containing the start and end times of all meetings, respectively. After sorting both arrays, we use a two-pointer based approach. How do you implement this?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    We use two pointers, <code>s</code> and <code>e</code>, for the start and end arrays, respectively. We also maintain a variable <code>count</code> to track the current number of active meetings. At each iteration, we increment <code>s</code> while the start time is less than the current end time and increase <code>count</code>, as these meetings must begin before the earliest ongoing meeting ends.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 4</summary>
    <p>
    Then, we increment <code>e</code> and decrement <code>count</code> as a meeting has ended. At each step, we update the result with the maximum value of active meetings stored in <code>count</code>.
    </p>
</details>
