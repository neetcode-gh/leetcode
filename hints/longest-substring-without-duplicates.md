<br>
<details class="hint-accordion">  
    <summary>Recommended Time & Space Complexity</summary>
    <p>
    You should aim for a solution with <code>O(n)</code> time and <code>O(m)</code> space, where <code>n</code> is the length of the string and <code>m</code> is the number of unique characters in the string.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 1</summary>
    <p>
    A brute force solution would be to try the substring starting at index <code>i</code> and try to find the maximum length we can form without duplicates by starting at that index. we can use a hash set to detect duplicates in <code>O(1)</code> time. Can you think of a better way?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    We can use the sliding window algorithm. Since we only care about substrings without duplicate characters, the sliding window can help us maintain valid substring with its dynamic nature.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    We can iterate through the given string with index <code>r</code> as the right boundary and <code>l</code> as the left boundary of the window. We use a hash set to check if the character is present in the window or not. When we encounter a character at index <code>r</code> that is already present in the window, we shrink the window by incrementing the <code>l</code> pointer until the window no longer contains any duplicates. Also, we remove characters from the hash set that are excluded from the window as the <code>l</code> pointer moves. At each iteration, we update the result with the length of the current window, <code>r - l + 1</code>, if this length is greater than the current result.
    </p>
</details>