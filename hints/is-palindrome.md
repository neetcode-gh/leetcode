<br>
<details class="hint-accordion">  
    <summary>Recommended Time & Space Complexity</summary>
    <p>
    You should aim for a solution with <code>O(n)</code> time and <code>O(1)</code> space, where <code>n</code> is the length of the input string.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 1</summary>
    <p>
    A brute force solution would be to create a copy of the string, reverse it, and then check for equality. This would be an <code>O(n)</code> solution with extra space. Can you think of a way to do this without <code>O(n)</code> space?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    Can you find the logic by observing the definition of pallindrome or from the brute force solution? 
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    A palindrome string is a string that is read the same from the start as well as from the end. This means the character at the start should match the character at the end at the same index. We can use the two pointer algorithm to do this efficiently.
    </p>
</details>