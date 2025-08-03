<br>
<details class="hint-accordion">  
    <summary>Recommended Time & Space Complexity</summary>
    <p>
    You should aim for a solution as good or better than <code>O(n)</code> time and <code>O(n)</code> space, where <code>n</code> is the length of the input string.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 1</summary>
    <p>
    A brute force approach would try all possibilities when encountering a <code>'*'</code> and recursively solve the problem, leading to an exponential approach. Can you think of a better way? Maybe a data structure commonly used in parenthesis problems could be useful.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    We can solve the problem using a stack-based approach. We maintain two stacks: one for tracking the indices of left parentheses and another for star indices. As we iterate through the string from left to right, we push indices onto their respective stacks when encountering a left parenthesis <code>'('</code> or a star <code>'*'</code>. Can you determine the logic for the right parentesis case?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
   If the left parenthesis stack is not empty, we pop from it. Otherwise, we pop from the star stack, treating the star as a left parenthesis to keep the string valid. After iterating the string, the stacks might be non-empty? Can you determine the logic for this case?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 4</summary>
    <p>
    Now, we try to match the remaining left parentheses with stars, ensuring the stars appear after the left parentheses in the string. We simultaneously pop from both stacks, and if the index of a left parenthesis is greater than that of a star, the string is invalid as there is no matching right parenthesis. In this case, we return <code>false</code>.
    </p>
</details>
