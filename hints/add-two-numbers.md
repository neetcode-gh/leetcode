<br>
<details class="hint-accordion">  
    <summary>Recommended Time & Space Complexity</summary>
    <p>
    You should aim for a solution with <code>O(m + n)</code> time and <code>O(1)</code> space, where <code>m</code> is the length of list <code>l1</code> and <code>n</code> is the length of list <code>l2</code>.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 1</summary>
    <p>
    Try to visualize the addition of two numbers. We know that the addition of two numbers is done by starting at the one's digit. We add the numbers by going through digit by digit. We track the extra value as a <code>carry</code> because the addition of two digits can result in a number with two digits. The <code>carry</code> is then added to the next digits, and so on. How do you implement this in case of linked lists?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    We track the extra value, <code>carry</code>, here as well. We iterate through the lists <code>l1</code> and <code>l2</code> until both lists reach <code>null</code>. We add the values of both nodes as well as the carry. If either of the nodes is <code>null</code>, we add <code>0</code> in its place and continue the process while tracking the carry simultaneously. Once we complete the process, if we are left with any <code>carry</code>, we add an extra node with that carry value and return the head of the result list.
    </p>
</details>