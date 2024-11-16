<br>
<details class="hint-accordion">  
    <summary>Recommended Time & Space Complexity</summary>
    <p>
    You should aim for a solution with <code>O(n)</code> time and <code>O(n)</code> space, where <code>n</code> is the length of the given string. 
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 1</summary>
    <p>
    A brute force solution would be to continuously remove valid brackets until no more can be removed. If the remaining string is empty, return true; otherwise, return false. This would result in an <code>O(n^2)</code> solution. Can we think of a better approach? Perhaps a data structure could help.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    We can use a stack to store characters. Iterate through the string by index. For an opening bracket, push it onto the stack. If the bracket is a closing type, check for the corresponding opening bracket at the top of the stack. If we don't find the corresponding opening bracket, immediately return false. Why does this work?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    In a valid parenthesis expression, every opening bracket must have a corresponding closing bracket. The stack is used to process the valid string, and it should be empty after the entire process. This ensures that there is a valid substring between each opening and closing bracket.
    </p>
</details>