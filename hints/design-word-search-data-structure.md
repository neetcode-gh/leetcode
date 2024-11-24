<br>
<details class="hint-accordion">  
    <summary>Recommended Time & Space Complexity</summary>
    <p>
    You should aim for a solution with <code>O(n)</code> time for each function call and <code>O(t + n)</code> space, where <code>n</code> is the length of the string and <code>t</code> is the total number of nodes created in the Trie.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 1</summary>
    <p>
    A brute force solution would be to store each added word in a list and search linearly through the list for a word every time. This would be an <code>O(m * n)</code> solution, where <code>m</code> is the size of the list and <code>n</code> is the length of the string. Can you think of a better way? Maybe there is a tree-like data structure.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    We can use a Trie to implement adding and searching for words efficiently. Adding a word follows the standard Trie insertion process. However, when searching for a word containing <code>'.'</code>, which can match any character, we need a different approach. Instead of directly matching, we consider all possible characters at the position of <code>'.'</code> and recursively check the rest of the word for each possibility. How would you implement it?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    We traverse the word with index <code>i</code>, starting at the root of the Trie. For normal characters, we search as usual. When encountering a dot (<code>'.'</code>), we try all possible characters by recursively extending the search in each direction. If any path leads to a valid word, we return <code>true</code>; otherwise, we return <code>false</code>. Although we try all paths for a dot, the time complexity is still <code>O(n)</code> because there are at most two dots (<code>'.'</code>) in the word, making the complexity <code>O((26^2) * n)</code>.
    </p>
</details>