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
    A brute force solution would be to consider every element from the array as the start of the sequence and count the length of the sequence formed with that starting element. This would be an <code>O(n^2)</code> solution. Can you think of a better way?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    Is there any way to identify the start of a sequence? For example, in <code>[1, 2, 3, 10, 11, 12]</code>, only <code>1</code> and <code>10</code> are the beginning of a sequence. Instead of trying to form a sequence for every number, we should only consider numbers like <code>1</code> and <code>10</code>.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    We can consider a number <code>num</code> as the start of a sequence if and only if <code>num - 1</code> does not exist in the given array. We iterate through the array and only start building the sequence if it is the start of a sequence. This avoids repeated work. We can use a hash set for <code>O(1)</code> lookups by converting the array to a hash set.
    </p>
</details>