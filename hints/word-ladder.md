<br>
<details class="hint-accordion">  
    <summary>Recommended Time & Space Complexity</summary>
    <p>
    You should aim for a solution with <code>O((m ^ 2) * n)</code> time and <code>O((m ^ 2) * n)</code> space, where <code>n</code> is the number of words and <code>m</code> is the length of the word. 
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 1</summary>
    <p>
    Consider the given problem in terms of a graph, treating strings as nodes. Think of a way to build edges where two strings have an edge if they differ by a single character. A naive approach would be to consider each pair of strings and check whether an edge can be formed. Can you think of an efficient way? For example, consider a string <code>hot</code> and think about the strings that can be formed from it by changing a single letter.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    To efficiently build edges, consider transforming each word into intermediate states by replacing one character with a wildcard, like <code>*</code>. For example, the word <code>hot</code> can be transformed into <code>*ot</code>, <code>h*t</code>, and <code>ho*</code>. These intermediate states act as "parents" that connect words differing by one character. For instance, <code>*ot</code> can connect to words like <code>cot</code>. For each word in the list, generate all possible patterns by replacing each character with <code>*</code> and store the word as a child of these patterns. We can run a <code>BFS</code> starting from the <code>beginWord</code>, visiting other words while avoiding revisiting by using a hash set.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    When visiting a node during BFS, if the word matches the <code>endWord</code>, we immediately return <code>true</code>. Otherwise, we generate the pattern words that can be formed from the current word and attempt to visit the words connected to these pattern words. We add only unvisited words to the queue. If we exhaust all possibilities without finding the <code>endWord</code>, we return <code>false</code>.
    </p>
</details>
