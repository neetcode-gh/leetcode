<br>
<details class="hint-accordion">  
    <summary>Recommended Time & Space Complexity</summary>
    <p>
    You should aim for a solution as good or better than <code>O(n^2)</code> time and <code>O(1)</code> space, where <code>n</code> is the length of the given string.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 1</summary>
    <p>
    A brute-force solution would be to check if every substring is a palindrome and return the total number of palindromic substrings. This would be an <code>O(n^3)</code> time solution. Can you think of a better way? Perhaps you should consider thinking in terms of the center of a palindrome.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    Iterate over the string with index <code>i</code> and treat the current character as the center. For this character, try to extend outward to the left and right simultaneously, but only if both characters are equal. At each iteration, we increment the count of palindromes. How would you implement this? Can you consider both cases: even-length and odd-length palindromes?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    Initialize a variable <code>res</code> to track the count of palindromes. At each index, create an odd-length palindrome starting at that index extending outward from both its left and right indices, i.e., <code>i - 1</code> and <code>i + 1</code>. How can you find the even-length palindrome for this index? 
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 4</summary>
    <p>
    For an even-length palindrome, consider expanding from indices <code>i</code> and <code>i + 1</code>. This two-pointer approach, extending from the center of the palindrome, will help find all palindromic substrings in the given string and return its count.
    </p>
</details>