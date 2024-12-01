<br>
<details class="hint-accordion">  
    <summary>Recommended Time & Space Complexity</summary>
    <p>
    You should aim for a solution with <code>O(2^(t/m))</code> time and <code>O(t/m)</code> space, where <code>t</code> is the given <code>target</code> and <code>m</code> is the minimum value in the given array.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 1</summary>
    <p>
    Can you think of this problem in terms of a decision tree, where at each step, we have <code>n</code> decisions, where <code>n</code> is the size of the array? In this decision tree, we can observe that different combinations of paths are formed. Can you think of a base condition to stop extending a path? Maybe you should consider the target value. 
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    We can use backtracking to recursively traverse these paths and make decisions to choose an element at each step. We maintain a variable <code>sum</code>, which represents the sum of all the elements chosen in the current path. We stop this recursive path if <code>sum == target</code>, and add a copy of the chosen elements to the result. How do you implement it?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    We recursively traverse the array starting from index <code>i</code>. At each step, we select an element from <code>i</code> to the end of the array. We extend the recursive path with elements where <code>sum <= target</code> after including that element. This creates multiple recursive paths, and we append the current list to the result whenever the base condition is met.
    </p>
</details>