<br>
<details class="hint-accordion">  
    <summary>Recommended Time & Space Complexity</summary>
    <p>
    You should aim for a solution with <code>O(m * n * 4 * (3^(t-1)) + s)</code> time and <code>O(s)</code> space, where <code>m</code> is the number of rows, <code>n</code> is the number of columns, <code>t</code> is the maximum length of any word and <code>s</code> is the sum of the lengths of all the words.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 1</summary>
    <p>
    To search for a word in the grid, we can use backtracking by starting at each cell, simultaneously iterating through the word and matching the characters with the cells, recursively visiting the neighboring cells. However, if we are given a list of words and need to search for each one, it becomes inefficient to iterate through each word and run backtracking for each. Can you think of a better way? Perhaps a data structure could help with more efficient word search and insertion.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
   We can use a Trie to efficiently search for multiple words. After inserting all words into the Trie, we traverse the grid once. For each character in the grid, we check if it exists in the current Trie node. If not, we prune the search. If we encounter an "end of word" flag in the Trie node, we know a valid word has been found. But how can we add that word to the result list? Maybe you should think about what additional information you can store in the Trie node.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    When we insert a word into the Trie, we can store the word's index. Why? Because when we want to add the word to the result list after finding a valid word, we can easily add it using the index. After adding that word, we put <code>index = -1</code> as we shouldn't add the word multiple times to the result list. How can you implement this?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 4</summary>
    <p>
    We insert all the words into the Trie with their indices marked. Then, we iterate through each cell in the grid. At each cell, we start at the root of the Trie and explore all possible paths. As we traverse, we match characters in the cell with those in the Trie nodes. If we encounter the end of a word, we take the index at that node and add the corresponding word to the result list. Afterward, we unmark that index and continue exploring further paths.
    </p>
</details>