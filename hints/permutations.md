<br>
<details class="hint-accordion">  
    <summary>Recommended Time & Space Complexity</summary>
    <p>
    You should aim for a solution with <code>O(n * n!)</code> time and <code>O(n)</code> space, where <code>n</code> is the size of the input array.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 1</summary>
    <p>
    A permutation is the same as the array but with the numbers arranged in a different order. The given array itself is also considered a permutation. This means we should make a decision at each step to take any element from the array that has not been chosen previously. By doing this recursively, we can generate all permutations. How do you implement it?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    We can use backtracking to explore all possible permutation paths. We initialize a temporary list to append the chosen elements and a boolean array of size <code>n</code> (the same size as the input array) to track which elements have been picked so far (<code>true</code> means the element is chosen; otherwise, <code>false</code>). At each step of recursion, we iterate through the entire array, picking elements that have not been chosen previously, and proceed further along that path. Can you think of the base condition to terminate the current recursive path?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    We observe that every permutation has the same size as the input array. Therefore, we can append a copy of the list of chosen elements in the current path to the result list if the size of the list equals the size of the input array terminating the current recursive path.
    </p>
</details>