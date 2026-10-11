<br>
<details class="hint-accordion">  
    <summary>Recommended Time & Space Complexity</summary>
    <p>
    You should aim for a solution with <code>O(n)</code> time and <code>O(1)</code> space, where <code>n</code> is the length of the given list.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 1</summary>
    <p>
    Take note that we need to modify the array <b>in-place</b>. Also, the elements beyond the new length of the array can be anything.
    Given an element, we need to remove all its occurrences. But do we really need to <b>remove</b> it, or can we achieve the result in another way?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    Think about rearranging the array instead of removing elements. Could we collect all the elements we want to keep at the beginning of the array? Remember, we don't care about what's left at the end
    </p>

</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    What if we use two pointers? One pointer can iterate through the array, checking each element, while the other pointer can track the position to "write" valid elements.
</p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 4</summary>
    <p>
    The two-pointer approach works like this:  
    <ul>
        <li>Use one pointer (<code>fast</code>) to traverse the array and identify elements that are <b>not equal</b> to <code>val</code>.</li>
        <li>Use another pointer (<code>slow</code>) to place these valid elements in the array.</li>
    </ul>
    <p>
        By the end, everything before <code>slow</code> will be the modified array without <code>val</code>.</p>
    </p>
</details>