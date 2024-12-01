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
    First draw a picture of all the points which represents the positions and respective speeds of the cars. It is appropriate to represent the position and speed of each car as an array, where each cell corresponds to a car. It is also logical to sort this array based on the positions in descending order. Why?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
     Because a car can only form a fleet with another car that is ahead of it, sorting the array in descending order ensures clarity about the final speed of each car. Sorting in ascending order would create ambiguity, as the next car might form a fleet with another car while reaching the target, making it difficult to determine its final speed.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    Calculating the time for a car to reach the target is straightforward and can be done using the formula: <code>time = (target - position) / speed</code>. Now, it becomes easy to identify that two cars will form a fleet if and only if the car ahead has a time that is greater than or equal to the time of the car behind it. How can we maintain the total number of fleets happened while going through the array? Maybe a data structure is helpful.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 4</summary>
    <p>
    We can use a stack to maintain the times of the fleets. As we iterate through the array (sorted in descending order of positions), we compute the time for each car to reach the target and check if it can form a fleet with the car ahead. If the current car's time is less than or equal to the top of the stack, it joins the same fleet. Otherwise, it forms a new fleet, and we push its time onto the stack. The length of the stack at the end represents the total number of fleets formed.
    </p>
</details>