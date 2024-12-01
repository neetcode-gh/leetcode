<br>
<details class="hint-accordion">  
    <summary>Recommended Time & Space Complexity</summary>
    <p>
    You should aim for a solution as good or better than <code>O(n)</code> time and <code>O(n)</code> space, where <code>n</code> is the size of the input array.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 1</summary>
    <p>
    A brute force solution would involve iterating through the array with index <code>i</code> and checking how far is the next greater element to the right of <code>i</code>. This would be an <code>O(n^2)</code> solution. Can you think of a better way?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    Can you consider a reverse approach? For example, in <code>[2, 1, 1, 3]</code>, the next greater element for the numbers <code>[2, 1, 1]</code> is <code>3</code>. Instead of checking for each element individually, can you think of a way where, by standing at the element <code>3</code>, you compute the result for the elements <code>[2, 1, 1]</code>?  Maybe there's a data structure that is useful here.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
   We can use a stack to maintain indices in a monotonically decreasing order, popping indices where the values are smaller than the current element. This helps us find the result by using the difference between indices while considering the values at those indices. Can you see how the stack is useful?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 4</summary>
    <p>
    In the array <code>[2, 1, 1, 3]</code>, we don't perform any pop operations while processing <code>[2, 1, 1]</code> because these elements are already in decreasing order. However, when we reach <code>3</code>, we pop elements from the stack until the top element of the stack is no longer less than the current element. For each popped element, we compute the difference between the indices and store it in the position corresponding to the popped element.
    </p>
</details>