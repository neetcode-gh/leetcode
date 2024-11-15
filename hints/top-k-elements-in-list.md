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
    A naive solution would be to count the frequency of each number and then sort the array based on each element’s frequency. After that, we would select the top <code>k</code> frequent elements. This would be an <code>O(nlogn)</code> solution. Though this solution is acceptable, can you think of a better way?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    Can you think of an algorithm which involves grouping numbers based on their frequency?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    Use the bucket sort algorithm to create <code>n</code> buckets, grouping numbers based on their frequencies from <code>1</code> to <code>n</code>. Then, pick the top <code>k</code> numbers from the buckets, starting from <code>n</code> down to <code>1</code>.
    </p>
</details>