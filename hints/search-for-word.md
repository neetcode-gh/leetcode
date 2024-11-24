<br>
<details class="hint-accordion">  
    <summary>Recommended Time & Space Complexity</summary>
    <p>
    You should aim for a solution with <code>O(m * (4^n))</code> time and <code>O(n)</code> space, where <code>m</code> is the number of cells in the given <code>board</code> and <code>n</code> is the size of the given <code>word</code>.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 1</summary>
    <p>
    As we can start at any cell on the board, we can explore all paths from that cell. Can you think of an algorithm to do so? Also, you should consider a way to avoid visiting a cell that has already been visited in the current path.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    We can use a hash set to avoid revisiting a cell in the current path by inserting the <code>(row, col)</code> of the visiting cell into the hash set and exploring all paths (four directions, as we can move to four neighboring cells) from that cell. Can you think of the base condition for this recursive path? Maybe you should consider the board boundaries, and also, we can extend a path if the character at the cell matches the character in the word.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    We can use backtracking, starting from each cell on the board with coordinates <code>(row, col)</code> and index <code>i</code> for the given word. We return false if <code>(row, col)</code> is out of bounds or if <code>board[row][col] != word[i]</code>. When <code>i</code> reaches the end of the word, we return true, indicating a valid path. At each step, we add <code>(row, col)</code> to a hash set to avoid revisiting cells. After exploring the four possible directions, we backtrack and remove <code>(row, col)</code> from the hash set.
    </p>
</details>