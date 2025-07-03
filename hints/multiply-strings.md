<br>
<details class="hint-accordion">  
    <summary>Recommended Time & Space Complexity</summary>
    <p>
    You should aim for a solution with <code>O(m*n)</code> time and <code>O(m+n)</code> space, where <code>m</code> is the length of the string <code>num1</code> and <code>n</code> is the length of the string <code>num2</code>.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 1</summary>
    <p>
    Implement a helper function that takes two number strings and returns their sum. Ensure that the length of <code>num1</code> is greater than <code>num2</code>, swapping them if necessary. Can you think of a way to multiply the strings? Maybe you should first consider basic multiplication, where <code>num1</code> is multiplied by each digit of <code>num2</code>.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    When multiplying <code>num1</code> with each digit of <code>num2</code>, we iterate through <code>num2</code> in reverse order. Based on the digit's position, we pad zeros to the multiplication result accordingly—no padding for the last digit, one zero for the second last, and so on. What should be the next step after each multiplication? Maybe you should implement a helper function to handle this.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    We implement a helper function that takes <code>num1</code>, a digit, and a variable <code>zeroes</code>, returning the multiplication result with <code>zeroes</code> padded at the end. A global string <code>res</code> stores the final result.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 4</summary>
    <p>
    In the main function, we iterate through <code>num2</code> in reverse order, calling the helper function to multiply <code>num1</code> with the current digit and append the appropriate number of padding zeros. We then call another helper function that takes this multiplication result and the global result string <code>res</code>, adds them, and updates <code>res</code>.
    </p>
</details>
