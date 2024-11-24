<br>
<details class="hint-accordion">  
    <summary>Recommended Time & Space Complexity</summary>
    <p>
    You should aim for a solution with <code>O(n)</code> time for each function call and <code>O(t)</code> space, where <code>n</code> is the length of the given string and <code>t</code> is the total number of nodes created in the Trie.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 1</summary>
    <p>
    A Trie is structured as a tree-like data structure where each node contains a hash map (or an array for fixed character sets) to store references to its child nodes, which represent characters. Each node also includes a boolean flag to indicate whether the current node marks the end of a valid word. The Trie starts with a root node that does not hold any character and serves as the entry point for all operations. The child nodes of the root and subsequent nodes represent unique characters from the words stored in the Trie, forming a hierarchical structure based on the prefixes of the words.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    To insert a word, we iterate through the characters of the word with index <code>i</code>, starting at the root of the Trie as the current node. If the current node already contains <code>word[i]</code>, we continue to the next character and move to the node that <code>word[i]</code> points to. If <code>word[i]</code> is not present, we create a new node for <code>word[i]</code> and continue the process until we reach the end of the word. We mark the boolean variable as true as it is the end of the inserted word.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    Searching for a word is similar to inserting, but instead of creating new nodes, we return <code>false</code> if we don't find a character in the path while iterating or if the end-of-word marker is not set to <code>true</code> when we reach the end of the word.
    </p>
</details>