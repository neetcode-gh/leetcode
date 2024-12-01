<br>
<details class="hint-accordion">  
    <summary>Recommended Time & Space Complexity</summary>
    <p>
    You should aim for a solution with <code>O(n)</code> time and <code>O(n)</code> space, where <code>n</code> is the size of the input array.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 1</summary>
    <p>
    A brute force solution would involve repeatedly finding an operator <code>+ - * /</code> in the array and modifying the array by computing the result for that operator and two operands to its left. This would be an <code>O(n^2)</code> solution. Can you think of a better way? Maybe we can use a data structure to handle operations efficiently.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    We can use a stack. We iterate through the array, and if we encounter a number, we push it onto the stack. If we encounter an operator, we pop two elements from the stack, treat them as operands, and solve the equation using the current operator. Then, we push the result back onto the stack. Why does this work?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    As the array has postfix expression, stack helps us to maintain the correct order of operations by ensuring that we always use the most recent operands (those closest to the operator) when performing the operation. After the iteration, the final result is left in the stack.
    </p>
</details>