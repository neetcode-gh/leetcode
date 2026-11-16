## 1. Backtracking (Brute Force Validation)

::tabs-start

```python
class Solution:
    def solveSudoku(self, board: List[List[str]]) -> None:
        def isValid(r, c, ch):
            for i in range(9):
                if board[r][i] == ch or board[i][c] == ch:
                    return False
                if board[3 * (r // 3) + i // 3][3 * (c // 3) + i % 3] == ch:
                    return False
            return True

        def dfs(r, c):
            if r == 9:
                return True
            if c == 9:
                return dfs(r + 1, 0)
            if board[r][c] != ".":
                return dfs(r, c + 1)

            for ch in "123456789":
                if isValid(r, c, ch):
                    board[r][c] = ch
                    if dfs(r, c + 1):
                        return True
                    board[r][c] = "."
            return False

        dfs(0, 0)
```

```java
public class Solution {
    public void solveSudoku(char[][] board) {
        dfs(board, 0, 0);
    }

    private boolean dfs(char[][] board, int r, int c) {
        if (r == 9) return true;
        if (c == 9) return dfs(board, r + 1, 0);
        if (board[r][c] != '.') return dfs(board, r, c + 1);

        for (char ch = '1'; ch <= '9'; ch++) {
            if (isValid(board, r, c, ch)) {
                board[r][c] = ch;
                if (dfs(board, r, c + 1)) return true;
                board[r][c] = '.';
            }
        }
        return false;
    }

    private boolean isValid(char[][] board, int r, int c, char ch) {
        for (int i = 0; i < 9; i++) {
            if (board[r][i] == ch || board[i][c] == ch) return false;
            if (board[3 * (r / 3) + i / 3][3 * (c / 3) + i % 3] == ch) return false;
        }
        return true;
    }
}
```

```cpp
class Solution {
public:
    void solveSudoku(vector<vector<char>>& board) {
        dfs(board, 0, 0);
    }

private:
    bool dfs(vector<vector<char>>& board, int r, int c) {
        if (r == 9) return true;
        if (c == 9) return dfs(board, r + 1, 0);
        if (board[r][c] != '.') return dfs(board, r, c + 1);

        for (char ch = '1'; ch <= '9'; ch++) {
            if (isValid(board, r, c, ch)) {
                board[r][c] = ch;
                if (dfs(board, r, c + 1)) return true;
                board[r][c] = '.';
            }
        }
        return false;
    }

    bool isValid(vector<vector<char>>& board, int r, int c, char ch) {
        for (int i = 0; i < 9; i++) {
            if (board[r][i] == ch || board[i][c] == ch) return false;
            if (board[3 * (r / 3) + i / 3][3 * (c / 3) + i % 3] == ch) return false;
        }
        return true;
    }
};
```

```javascript
class Solution {
    /**
     * @param {character[][]} board
     * @return {void} Do not return anything, modify board in-place instead.
     */
    solveSudoku(board) {
        const isValid = (r, c, ch) => {
            for (let i = 0; i < 9; i++) {
                if (board[r][i] === ch || board[i][c] === ch) return false;
                const br = 3 * Math.floor(r / 3) + Math.floor(i / 3);
                const bc = 3 * Math.floor(c / 3) + (i % 3);
                if (board[br][bc] === ch) return false;
            }
            return true;
        };

        const dfs = (r, c) => {
            if (r === 9) return true;
            if (c === 9) return dfs(r + 1, 0);
            if (board[r][c] !== '.') return dfs(r, c + 1);

            for (let d = 1; d <= 9; d++) {
                const ch = String(d);
                if (isValid(r, c, ch)) {
                    board[r][c] = ch;
                    if (dfs(r, c + 1)) return true;
                    board[r][c] = '.';
                }
            }
            return false;
        };

        dfs(0, 0);
    }
}
```

```csharp
public class Solution {
    public void SolveSudoku(char[][] board) {
        Dfs(board, 0, 0);
    }

    private bool Dfs(char[][] board, int r, int c) {
        if (r == 9) return true;
        if (c == 9) return Dfs(board, r + 1, 0);
        if (board[r][c] != '.') return Dfs(board, r, c + 1);

        for (char ch = '1'; ch <= '9'; ch++) {
            if (IsValid(board, r, c, ch)) {
                board[r][c] = ch;
                if (Dfs(board, r, c + 1)) return true;
                board[r][c] = '.';
            }
        }
        return false;
    }

    private bool IsValid(char[][] board, int r, int c, char ch) {
        for (int i = 0; i < 9; i++) {
            if (board[r][i] == ch || board[i][c] == ch) return false;
            if (board[3 * (r / 3) + i / 3][3 * (c / 3) + i % 3] == ch) return false;
        }
        return true;
    }
}
```

```go
func solveSudoku(board [][]byte) {
    isValid := func(r, c int, ch byte) bool {
        for i := 0; i < 9; i++ {
            if board[r][i] == ch || board[i][c] == ch {
                return false
            }
            if board[3*(r/3)+i/3][3*(c/3)+i%3] == ch {
                return false
            }
        }
        return true
    }

    var dfs func(r, c int) bool
    dfs = func(r, c int) bool {
        if r == 9 {
            return true
        }
        if c == 9 {
            return dfs(r+1, 0)
        }
        if board[r][c] != '.' {
            return dfs(r, c+1)
        }

        for ch := byte('1'); ch <= '9'; ch++ {
            if isValid(r, c, ch) {
                board[r][c] = ch
                if dfs(r, c+1) {
                    return true
                }
                board[r][c] = '.'
            }
        }
        return false
    }

    dfs(0, 0)
}
```

```kotlin
class Solution {
    fun solveSudoku(board: Array<CharArray>) {
        dfs(board, 0, 0)
    }

    private fun dfs(board: Array<CharArray>, r: Int, c: Int): Boolean {
        if (r == 9) return true
        if (c == 9) return dfs(board, r + 1, 0)
        if (board[r][c] != '.') return dfs(board, r, c + 1)

        for (ch in '1'..'9') {
            if (isValid(board, r, c, ch)) {
                board[r][c] = ch
                if (dfs(board, r, c + 1)) return true
                board[r][c] = '.'
            }
        }
        return false
    }

    private fun isValid(board: Array<CharArray>, r: Int, c: Int, ch: Char): Boolean {
        for (i in 0 until 9) {
            if (board[r][i] == ch || board[i][c] == ch) return false
            if (board[3 * (r / 3) + i / 3][3 * (c / 3) + i % 3] == ch) return false
        }
        return true
    }
}
```

```swift
class Solution {
    func solveSudoku(_ board: inout [[Character]]) {
        _ = dfs(&board, 0, 0)
    }

    private func dfs(_ board: inout [[Character]], _ r: Int, _ c: Int) -> Bool {
        if r == 9 { return true }
        if c == 9 { return dfs(&board, r + 1, 0) }
        if board[r][c] != "." { return dfs(&board, r, c + 1) }

        for ch in "123456789" {
            if isValid(board, r, c, ch) {
                board[r][c] = ch
                if dfs(&board, r, c + 1) { return true }
                board[r][c] = "."
            }
        }
        return false
    }

    private func isValid(_ board: [[Character]], _ r: Int, _ c: Int, _ ch: Character) -> Bool {
        for i in 0..<9 {
            if board[r][i] == ch || board[i][c] == ch { return false }
            if board[3 * (r / 3) + i / 3][3 * (c / 3) + i % 3] == ch { return false }
        }
        return true
    }
}
```

```rust
impl Solution {
    pub fn solve_sudoku(board: &mut Vec<Vec<char>>) {
        Self::dfs(board, 0, 0);
    }

    fn dfs(board: &mut Vec<Vec<char>>, r: usize, c: usize) -> bool {
        if r == 9 {
            return true;
        }
        if c == 9 {
            return Self::dfs(board, r + 1, 0);
        }
        if board[r][c] != '.' {
            return Self::dfs(board, r, c + 1);
        }

        for ch in '1'..='9' {
            if Self::is_valid(board, r, c, ch) {
                board[r][c] = ch;
                if Self::dfs(board, r, c + 1) {
                    return true;
                }
                board[r][c] = '.';
            }
        }
        false
    }

    fn is_valid(board: &Vec<Vec<char>>, r: usize, c: usize, ch: char) -> bool {
        for i in 0..9 {
            if board[r][i] == ch || board[i][c] == ch {
                return false;
            }
            if board[3 * (r / 3) + i / 3][3 * (c / 3) + i % 3] == ch {
                return false;
            }
        }
        true
    }
}
```

```typescript
class Solution {
    /**
     * @param {character[][]} board
     * @return {void} Do not return anything, modify board in-place instead.
     */
    solveSudoku(board: string[][]): void {
        const isValid = (r: number, c: number, ch: string): boolean => {
            for (let i = 0; i < 9; i++) {
                if (board[r][i] === ch || board[i][c] === ch) return false;
                const br = 3 * Math.floor(r / 3) + Math.floor(i / 3);
                const bc = 3 * Math.floor(c / 3) + (i % 3);
                if (board[br][bc] === ch) return false;
            }
            return true;
        };

        const dfs = (r: number, c: number): boolean => {
            if (r === 9) return true;
            if (c === 9) return dfs(r + 1, 0);
            if (board[r][c] !== '.') return dfs(r, c + 1);

            for (let d = 1; d <= 9; d++) {
                const ch = String(d);
                if (isValid(r, c, ch)) {
                    board[r][c] = ch;
                    if (dfs(r, c + 1)) return true;
                    board[r][c] = '.';
                }
            }
            return false;
        };

        dfs(0, 0);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(9 ^ m * 27)$
- Space complexity: $O(m)$ for recursion stack.

> Where $m$ is the number of empty cells in the board.

---

## 2. Backtracking (Hash Set)

::tabs-start

```python
class Solution:
    def solveSudoku(self, board: List[List[str]]) -> None:
        rows = [set() for _ in range(9)]
        cols = [set() for _ in range(9)]
        boxes = [set() for _ in range(9)]
        empty = []

        for r in range(9):
            for c in range(9):
                if board[r][c] == ".":
                    empty.append((r, c))
                else:
                    ch = board[r][c]
                    rows[r].add(ch)
                    cols[c].add(ch)
                    boxes[(r // 3) * 3 + c // 3].add(ch)

        def dfs(i):
            if i == len(empty):
                return True

            r, c = empty[i]
            b = (r // 3) * 3 + c // 3
            for ch in "123456789":
                if ch in rows[r] or ch in cols[c] or ch in boxes[b]:
                    continue
                board[r][c] = ch
                rows[r].add(ch)
                cols[c].add(ch)
                boxes[b].add(ch)
                if dfs(i + 1):
                    return True
                rows[r].remove(ch)
                cols[c].remove(ch)
                boxes[b].remove(ch)
            board[r][c] = "."
            return False

        dfs(0)
```

```java
public class Solution {
    private List<Set<Character>> rows = new ArrayList<>();
    private List<Set<Character>> cols = new ArrayList<>();
    private List<Set<Character>> boxes = new ArrayList<>();
    private List<int[]> empty = new ArrayList<>();

    public void solveSudoku(char[][] board) {
        for (int i = 0; i < 9; i++) {
            rows.add(new HashSet<>());
            cols.add(new HashSet<>());
            boxes.add(new HashSet<>());
        }

        for (int r = 0; r < 9; r++) {
            for (int c = 0; c < 9; c++) {
                if (board[r][c] == '.') {
                    empty.add(new int[]{r, c});
                } else {
                    char ch = board[r][c];
                    rows.get(r).add(ch);
                    cols.get(c).add(ch);
                    boxes.get((r / 3) * 3 + c / 3).add(ch);
                }
            }
        }

        dfs(board, 0);
    }

    private boolean dfs(char[][] board, int i) {
        if (i == empty.size()) return true;

        int r = empty.get(i)[0], c = empty.get(i)[1];
        int b = (r / 3) * 3 + c / 3;
        for (char ch = '1'; ch <= '9'; ch++) {
            if (rows.get(r).contains(ch) || cols.get(c).contains(ch) ||
                boxes.get(b).contains(ch)) {
                continue;
            }
            board[r][c] = ch;
            rows.get(r).add(ch);
            cols.get(c).add(ch);
            boxes.get(b).add(ch);
            if (dfs(board, i + 1)) return true;
            rows.get(r).remove(ch);
            cols.get(c).remove(ch);
            boxes.get(b).remove(ch);
        }
        board[r][c] = '.';
        return false;
    }
}
```

```cpp
class Solution {
    vector<unordered_set<char>> rows, cols, boxes;
    vector<pair<int, int>> empty;

public:
    void solveSudoku(vector<vector<char>>& board) {
        rows.assign(9, {});
        cols.assign(9, {});
        boxes.assign(9, {});

        for (int r = 0; r < 9; r++) {
            for (int c = 0; c < 9; c++) {
                if (board[r][c] == '.') {
                    empty.push_back({r, c});
                } else {
                    char ch = board[r][c];
                    rows[r].insert(ch);
                    cols[c].insert(ch);
                    boxes[(r / 3) * 3 + c / 3].insert(ch);
                }
            }
        }

        dfs(board, 0);
    }

private:
    bool dfs(vector<vector<char>>& board, int i) {
        if (i == empty.size()) return true;

        auto [r, c] = empty[i];
        int b = (r / 3) * 3 + c / 3;
        for (char ch = '1'; ch <= '9'; ch++) {
            if (rows[r].count(ch) || cols[c].count(ch) || boxes[b].count(ch)) {
                continue;
            }
            board[r][c] = ch;
            rows[r].insert(ch);
            cols[c].insert(ch);
            boxes[b].insert(ch);
            if (dfs(board, i + 1)) return true;
            rows[r].erase(ch);
            cols[c].erase(ch);
            boxes[b].erase(ch);
        }
        board[r][c] = '.';
        return false;
    }
};
```

```javascript
class Solution {
    /**
     * @param {character[][]} board
     * @return {void} Do not return anything, modify board in-place instead.
     */
    solveSudoku(board) {
        const rows = Array.from({ length: 9 }, () => new Set());
        const cols = Array.from({ length: 9 }, () => new Set());
        const boxes = Array.from({ length: 9 }, () => new Set());
        const empty = [];

        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                if (board[r][c] === '.') {
                    empty.push([r, c]);
                } else {
                    const ch = board[r][c];
                    rows[r].add(ch);
                    cols[c].add(ch);
                    boxes[Math.floor(r / 3) * 3 + Math.floor(c / 3)].add(ch);
                }
            }
        }

        const dfs = (i) => {
            if (i === empty.length) return true;

            const [r, c] = empty[i];
            const b = Math.floor(r / 3) * 3 + Math.floor(c / 3);
            for (let d = 1; d <= 9; d++) {
                const ch = String(d);
                if (rows[r].has(ch) || cols[c].has(ch) || boxes[b].has(ch)) {
                    continue;
                }
                board[r][c] = ch;
                rows[r].add(ch);
                cols[c].add(ch);
                boxes[b].add(ch);
                if (dfs(i + 1)) return true;
                rows[r].delete(ch);
                cols[c].delete(ch);
                boxes[b].delete(ch);
            }
            board[r][c] = '.';
            return false;
        };

        dfs(0);
    }
}
```

```csharp
public class Solution {
    private HashSet<char>[] rows = new HashSet<char>[9];
    private HashSet<char>[] cols = new HashSet<char>[9];
    private HashSet<char>[] boxes = new HashSet<char>[9];
    private List<(int r, int c)> empty = new List<(int r, int c)>();

    public void SolveSudoku(char[][] board) {
        for (int i = 0; i < 9; i++) {
            rows[i] = new HashSet<char>();
            cols[i] = new HashSet<char>();
            boxes[i] = new HashSet<char>();
        }

        for (int r = 0; r < 9; r++) {
            for (int c = 0; c < 9; c++) {
                if (board[r][c] == '.') {
                    empty.Add((r, c));
                } else {
                    char ch = board[r][c];
                    rows[r].Add(ch);
                    cols[c].Add(ch);
                    boxes[(r / 3) * 3 + c / 3].Add(ch);
                }
            }
        }

        Dfs(board, 0);
    }

    private bool Dfs(char[][] board, int i) {
        if (i == empty.Count) return true;

        var (r, c) = empty[i];
        int b = (r / 3) * 3 + c / 3;
        for (char ch = '1'; ch <= '9'; ch++) {
            if (rows[r].Contains(ch) || cols[c].Contains(ch) || boxes[b].Contains(ch)) {
                continue;
            }
            board[r][c] = ch;
            rows[r].Add(ch);
            cols[c].Add(ch);
            boxes[b].Add(ch);
            if (Dfs(board, i + 1)) return true;
            rows[r].Remove(ch);
            cols[c].Remove(ch);
            boxes[b].Remove(ch);
        }
        board[r][c] = '.';
        return false;
    }
}
```

```go
func solveSudoku(board [][]byte) {
    var rows, cols, boxes [9]map[byte]bool
    for i := 0; i < 9; i++ {
        rows[i] = make(map[byte]bool)
        cols[i] = make(map[byte]bool)
        boxes[i] = make(map[byte]bool)
    }

    var empty [][2]int
    for r := 0; r < 9; r++ {
        for c := 0; c < 9; c++ {
            if board[r][c] == '.' {
                empty = append(empty, [2]int{r, c})
            } else {
                ch := board[r][c]
                rows[r][ch] = true
                cols[c][ch] = true
                boxes[(r/3)*3+c/3][ch] = true
            }
        }
    }

    var dfs func(i int) bool
    dfs = func(i int) bool {
        if i == len(empty) {
            return true
        }

        r, c := empty[i][0], empty[i][1]
        b := (r/3)*3 + c/3
        for ch := byte('1'); ch <= '9'; ch++ {
            if rows[r][ch] || cols[c][ch] || boxes[b][ch] {
                continue
            }
            board[r][c] = ch
            rows[r][ch] = true
            cols[c][ch] = true
            boxes[b][ch] = true
            if dfs(i + 1) {
                return true
            }
            delete(rows[r], ch)
            delete(cols[c], ch)
            delete(boxes[b], ch)
        }
        board[r][c] = '.'
        return false
    }

    dfs(0)
}
```

```kotlin
class Solution {
    fun solveSudoku(board: Array<CharArray>) {
        val rows = Array(9) { HashSet<Char>() }
        val cols = Array(9) { HashSet<Char>() }
        val boxes = Array(9) { HashSet<Char>() }
        val empty = mutableListOf<IntArray>()

        for (r in 0 until 9) {
            for (c in 0 until 9) {
                if (board[r][c] == '.') {
                    empty.add(intArrayOf(r, c))
                } else {
                    val ch = board[r][c]
                    rows[r].add(ch)
                    cols[c].add(ch)
                    boxes[(r / 3) * 3 + c / 3].add(ch)
                }
            }
        }

        fun dfs(i: Int): Boolean {
            if (i == empty.size) return true

            val (r, c) = empty[i]
            val b = (r / 3) * 3 + c / 3
            for (ch in '1'..'9') {
                if (ch in rows[r] || ch in cols[c] || ch in boxes[b]) continue
                board[r][c] = ch
                rows[r].add(ch)
                cols[c].add(ch)
                boxes[b].add(ch)
                if (dfs(i + 1)) return true
                rows[r].remove(ch)
                cols[c].remove(ch)
                boxes[b].remove(ch)
            }
            board[r][c] = '.'
            return false
        }

        dfs(0)
    }
}
```

```swift
class Solution {
    private var rows = [Set<Character>](repeating: [], count: 9)
    private var cols = [Set<Character>](repeating: [], count: 9)
    private var boxes = [Set<Character>](repeating: [], count: 9)
    private var empty = [(Int, Int)]()

    func solveSudoku(_ board: inout [[Character]]) {
        for r in 0..<9 {
            for c in 0..<9 {
                if board[r][c] == "." {
                    empty.append((r, c))
                } else {
                    let ch = board[r][c]
                    rows[r].insert(ch)
                    cols[c].insert(ch)
                    boxes[(r / 3) * 3 + c / 3].insert(ch)
                }
            }
        }

        _ = dfs(&board, 0)
    }

    private func dfs(_ board: inout [[Character]], _ i: Int) -> Bool {
        if i == empty.count { return true }

        let (r, c) = empty[i]
        let b = (r / 3) * 3 + c / 3
        for ch in "123456789" {
            if rows[r].contains(ch) || cols[c].contains(ch) || boxes[b].contains(ch) {
                continue
            }
            board[r][c] = ch
            rows[r].insert(ch)
            cols[c].insert(ch)
            boxes[b].insert(ch)
            if dfs(&board, i + 1) { return true }
            rows[r].remove(ch)
            cols[c].remove(ch)
            boxes[b].remove(ch)
        }
        board[r][c] = "."
        return false
    }
}
```

```rust
use std::collections::HashSet;

impl Solution {
    pub fn solve_sudoku(board: &mut Vec<Vec<char>>) {
        let mut rows = vec![HashSet::new(); 9];
        let mut cols = vec![HashSet::new(); 9];
        let mut boxes = vec![HashSet::new(); 9];
        let mut empty = Vec::new();

        for r in 0..9 {
            for c in 0..9 {
                if board[r][c] == '.' {
                    empty.push((r, c));
                } else {
                    let ch = board[r][c];
                    rows[r].insert(ch);
                    cols[c].insert(ch);
                    boxes[(r / 3) * 3 + c / 3].insert(ch);
                }
            }
        }

        Self::dfs(board, 0, &empty, &mut rows, &mut cols, &mut boxes);
    }

    fn dfs(
        board: &mut Vec<Vec<char>>,
        i: usize,
        empty: &Vec<(usize, usize)>,
        rows: &mut Vec<HashSet<char>>,
        cols: &mut Vec<HashSet<char>>,
        boxes: &mut Vec<HashSet<char>>,
    ) -> bool {
        if i == empty.len() {
            return true;
        }

        let (r, c) = empty[i];
        let b = (r / 3) * 3 + c / 3;
        for ch in '1'..='9' {
            if rows[r].contains(&ch) || cols[c].contains(&ch) || boxes[b].contains(&ch) {
                continue;
            }
            board[r][c] = ch;
            rows[r].insert(ch);
            cols[c].insert(ch);
            boxes[b].insert(ch);
            if Self::dfs(board, i + 1, empty, rows, cols, boxes) {
                return true;
            }
            rows[r].remove(&ch);
            cols[c].remove(&ch);
            boxes[b].remove(&ch);
        }
        board[r][c] = '.';
        false
    }
}
```

```typescript
class Solution {
    /**
     * @param {character[][]} board
     * @return {void} Do not return anything, modify board in-place instead.
     */
    solveSudoku(board: string[][]): void {
        const rows: Set<string>[] = Array.from({ length: 9 }, () => new Set());
        const cols: Set<string>[] = Array.from({ length: 9 }, () => new Set());
        const boxes: Set<string>[] = Array.from({ length: 9 }, () => new Set());
        const empty: [number, number][] = [];

        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                if (board[r][c] === '.') {
                    empty.push([r, c]);
                } else {
                    const ch = board[r][c];
                    rows[r].add(ch);
                    cols[c].add(ch);
                    boxes[Math.floor(r / 3) * 3 + Math.floor(c / 3)].add(ch);
                }
            }
        }

        const dfs = (i: number): boolean => {
            if (i === empty.length) return true;

            const [r, c] = empty[i];
            const b = Math.floor(r / 3) * 3 + Math.floor(c / 3);
            for (let d = 1; d <= 9; d++) {
                const ch = String(d);
                if (rows[r].has(ch) || cols[c].has(ch) || boxes[b].has(ch)) {
                    continue;
                }
                board[r][c] = ch;
                rows[r].add(ch);
                cols[c].add(ch);
                boxes[b].add(ch);
                if (dfs(i + 1)) return true;
                rows[r].delete(ch);
                cols[c].delete(ch);
                boxes[b].delete(ch);
            }
            board[r][c] = '.';
            return false;
        };

        dfs(0);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(9 ^ m)$
- Space complexity: $O(m)$

> Where $m$ is the number of empty cells in the board.

---

## 3. Backtracking (Bit Mask)

::tabs-start

```python
class Solution:
    def solveSudoku(self, board: List[List[str]]) -> None:
        rows = [0] * 9
        cols = [0] * 9
        boxes = [0] * 9
        empty = []

        for r in range(9):
            for c in range(9):
                if board[r][c] == ".":
                    empty.append((r, c))
                else:
                    bit = 1 << (int(board[r][c]) - 1)
                    rows[r] |= bit
                    cols[c] |= bit
                    boxes[(r // 3) * 3 + c // 3] |= bit

        def dfs(i):
            if i == len(empty):
                return True

            r, c = empty[i]
            b = (r // 3) * 3 + c // 3
            used = rows[r] | cols[c] | boxes[b]
            for d in range(1, 10):
                bit = 1 << (d - 1)
                if used & bit:
                    continue
                board[r][c] = str(d)
                rows[r] |= bit
                cols[c] |= bit
                boxes[b] |= bit
                if dfs(i + 1):
                    return True
                rows[r] ^= bit
                cols[c] ^= bit
                boxes[b] ^= bit
            board[r][c] = "."
            return False

        dfs(0)
```

```java
public class Solution {
    private int[] rows = new int[9];
    private int[] cols = new int[9];
    private int[] boxes = new int[9];
    private List<int[]> empty = new ArrayList<>();

    public void solveSudoku(char[][] board) {
        for (int r = 0; r < 9; r++) {
            for (int c = 0; c < 9; c++) {
                if (board[r][c] == '.') {
                    empty.add(new int[]{r, c});
                } else {
                    int bit = 1 << (board[r][c] - '1');
                    rows[r] |= bit;
                    cols[c] |= bit;
                    boxes[(r / 3) * 3 + c / 3] |= bit;
                }
            }
        }

        dfs(board, 0);
    }

    private boolean dfs(char[][] board, int i) {
        if (i == empty.size()) return true;

        int r = empty.get(i)[0], c = empty.get(i)[1];
        int b = (r / 3) * 3 + c / 3;
        int used = rows[r] | cols[c] | boxes[b];
        for (int d = 1; d <= 9; d++) {
            int bit = 1 << (d - 1);
            if ((used & bit) != 0) continue;
            board[r][c] = (char) ('0' + d);
            rows[r] |= bit;
            cols[c] |= bit;
            boxes[b] |= bit;
            if (dfs(board, i + 1)) return true;
            rows[r] ^= bit;
            cols[c] ^= bit;
            boxes[b] ^= bit;
        }
        board[r][c] = '.';
        return false;
    }
}
```

```cpp
class Solution {
    int rows[9] = {}, cols[9] = {}, boxes[9] = {};
    vector<pair<int, int>> empty;

public:
    void solveSudoku(vector<vector<char>>& board) {
        for (int r = 0; r < 9; r++) {
            for (int c = 0; c < 9; c++) {
                if (board[r][c] == '.') {
                    empty.push_back({r, c});
                } else {
                    int bit = 1 << (board[r][c] - '1');
                    rows[r] |= bit;
                    cols[c] |= bit;
                    boxes[(r / 3) * 3 + c / 3] |= bit;
                }
            }
        }

        dfs(board, 0);
    }

private:
    bool dfs(vector<vector<char>>& board, int i) {
        if (i == empty.size()) return true;

        auto [r, c] = empty[i];
        int b = (r / 3) * 3 + c / 3;
        int used = rows[r] | cols[c] | boxes[b];
        for (int d = 1; d <= 9; d++) {
            int bit = 1 << (d - 1);
            if (used & bit) continue;
            board[r][c] = '0' + d;
            rows[r] |= bit;
            cols[c] |= bit;
            boxes[b] |= bit;
            if (dfs(board, i + 1)) return true;
            rows[r] ^= bit;
            cols[c] ^= bit;
            boxes[b] ^= bit;
        }
        board[r][c] = '.';
        return false;
    }
};
```

```javascript
class Solution {
    /**
     * @param {character[][]} board
     * @return {void} Do not return anything, modify board in-place instead.
     */
    solveSudoku(board) {
        const rows = new Array(9).fill(0);
        const cols = new Array(9).fill(0);
        const boxes = new Array(9).fill(0);
        const empty = [];

        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                if (board[r][c] === '.') {
                    empty.push([r, c]);
                } else {
                    const bit = 1 << (Number(board[r][c]) - 1);
                    rows[r] |= bit;
                    cols[c] |= bit;
                    boxes[Math.floor(r / 3) * 3 + Math.floor(c / 3)] |= bit;
                }
            }
        }

        const dfs = (i) => {
            if (i === empty.length) return true;

            const [r, c] = empty[i];
            const b = Math.floor(r / 3) * 3 + Math.floor(c / 3);
            const used = rows[r] | cols[c] | boxes[b];
            for (let d = 1; d <= 9; d++) {
                const bit = 1 << (d - 1);
                if (used & bit) continue;
                board[r][c] = String(d);
                rows[r] |= bit;
                cols[c] |= bit;
                boxes[b] |= bit;
                if (dfs(i + 1)) return true;
                rows[r] ^= bit;
                cols[c] ^= bit;
                boxes[b] ^= bit;
            }
            board[r][c] = '.';
            return false;
        };

        dfs(0);
    }
}
```

```csharp
public class Solution {
    private int[] rows = new int[9];
    private int[] cols = new int[9];
    private int[] boxes = new int[9];
    private List<(int r, int c)> empty = new List<(int r, int c)>();

    public void SolveSudoku(char[][] board) {
        for (int r = 0; r < 9; r++) {
            for (int c = 0; c < 9; c++) {
                if (board[r][c] == '.') {
                    empty.Add((r, c));
                } else {
                    int bit = 1 << (board[r][c] - '1');
                    rows[r] |= bit;
                    cols[c] |= bit;
                    boxes[(r / 3) * 3 + c / 3] |= bit;
                }
            }
        }

        Dfs(board, 0);
    }

    private bool Dfs(char[][] board, int i) {
        if (i == empty.Count) return true;

        var (r, c) = empty[i];
        int b = (r / 3) * 3 + c / 3;
        int used = rows[r] | cols[c] | boxes[b];
        for (int d = 1; d <= 9; d++) {
            int bit = 1 << (d - 1);
            if ((used & bit) != 0) continue;
            board[r][c] = (char) ('0' + d);
            rows[r] |= bit;
            cols[c] |= bit;
            boxes[b] |= bit;
            if (Dfs(board, i + 1)) return true;
            rows[r] ^= bit;
            cols[c] ^= bit;
            boxes[b] ^= bit;
        }
        board[r][c] = '.';
        return false;
    }
}
```

```go
func solveSudoku(board [][]byte) {
    var rows, cols, boxes [9]int
    var empty [][2]int

    for r := 0; r < 9; r++ {
        for c := 0; c < 9; c++ {
            if board[r][c] == '.' {
                empty = append(empty, [2]int{r, c})
            } else {
                bit := 1 << int(board[r][c]-'1')
                rows[r] |= bit
                cols[c] |= bit
                boxes[(r/3)*3+c/3] |= bit
            }
        }
    }

    var dfs func(i int) bool
    dfs = func(i int) bool {
        if i == len(empty) {
            return true
        }

        r, c := empty[i][0], empty[i][1]
        b := (r/3)*3 + c/3
        used := rows[r] | cols[c] | boxes[b]
        for d := 1; d <= 9; d++ {
            bit := 1 << (d - 1)
            if used&bit != 0 {
                continue
            }
            board[r][c] = byte('0' + d)
            rows[r] |= bit
            cols[c] |= bit
            boxes[b] |= bit
            if dfs(i + 1) {
                return true
            }
            rows[r] ^= bit
            cols[c] ^= bit
            boxes[b] ^= bit
        }
        board[r][c] = '.'
        return false
    }

    dfs(0)
}
```

```kotlin
class Solution {
    fun solveSudoku(board: Array<CharArray>) {
        val rows = IntArray(9)
        val cols = IntArray(9)
        val boxes = IntArray(9)
        val empty = mutableListOf<IntArray>()

        for (r in 0 until 9) {
            for (c in 0 until 9) {
                if (board[r][c] == '.') {
                    empty.add(intArrayOf(r, c))
                } else {
                    val bit = 1 shl (board[r][c] - '1')
                    rows[r] = rows[r] or bit
                    cols[c] = cols[c] or bit
                    boxes[(r / 3) * 3 + c / 3] = boxes[(r / 3) * 3 + c / 3] or bit
                }
            }
        }

        fun dfs(i: Int): Boolean {
            if (i == empty.size) return true

            val (r, c) = empty[i]
            val b = (r / 3) * 3 + c / 3
            val used = rows[r] or cols[c] or boxes[b]
            for (d in 1..9) {
                val bit = 1 shl (d - 1)
                if ((used and bit) != 0) continue
                board[r][c] = '0' + d
                rows[r] = rows[r] or bit
                cols[c] = cols[c] or bit
                boxes[b] = boxes[b] or bit
                if (dfs(i + 1)) return true
                rows[r] = rows[r] xor bit
                cols[c] = cols[c] xor bit
                boxes[b] = boxes[b] xor bit
            }
            board[r][c] = '.'
            return false
        }

        dfs(0)
    }
}
```

```swift
class Solution {
    private var rows = [Int](repeating: 0, count: 9)
    private var cols = [Int](repeating: 0, count: 9)
    private var boxes = [Int](repeating: 0, count: 9)
    private var empty = [(Int, Int)]()
    private let digits = Array("123456789")

    func solveSudoku(_ board: inout [[Character]]) {
        for r in 0..<9 {
            for c in 0..<9 {
                if board[r][c] == "." {
                    empty.append((r, c))
                } else {
                    let bit = 1 << (board[r][c].wholeNumberValue! - 1)
                    rows[r] |= bit
                    cols[c] |= bit
                    boxes[(r / 3) * 3 + c / 3] |= bit
                }
            }
        }

        _ = dfs(&board, 0)
    }

    private func dfs(_ board: inout [[Character]], _ i: Int) -> Bool {
        if i == empty.count { return true }

        let (r, c) = empty[i]
        let b = (r / 3) * 3 + c / 3
        let used = rows[r] | cols[c] | boxes[b]
        for d in 1...9 {
            let bit = 1 << (d - 1)
            if used & bit != 0 { continue }
            board[r][c] = digits[d - 1]
            rows[r] |= bit
            cols[c] |= bit
            boxes[b] |= bit
            if dfs(&board, i + 1) { return true }
            rows[r] ^= bit
            cols[c] ^= bit
            boxes[b] ^= bit
        }
        board[r][c] = "."
        return false
    }
}
```

```rust
impl Solution {
    pub fn solve_sudoku(board: &mut Vec<Vec<char>>) {
        let mut rows = [0u16; 9];
        let mut cols = [0u16; 9];
        let mut boxes = [0u16; 9];
        let mut empty = Vec::new();

        for r in 0..9 {
            for c in 0..9 {
                if board[r][c] == '.' {
                    empty.push((r, c));
                } else {
                    let bit = 1 << (board[r][c] as u8 - b'1');
                    rows[r] |= bit;
                    cols[c] |= bit;
                    boxes[(r / 3) * 3 + c / 3] |= bit;
                }
            }
        }

        Self::dfs(board, 0, &empty, &mut rows, &mut cols, &mut boxes);
    }

    fn dfs(
        board: &mut Vec<Vec<char>>,
        i: usize,
        empty: &Vec<(usize, usize)>,
        rows: &mut [u16; 9],
        cols: &mut [u16; 9],
        boxes: &mut [u16; 9],
    ) -> bool {
        if i == empty.len() {
            return true;
        }

        let (r, c) = empty[i];
        let b = (r / 3) * 3 + c / 3;
        let used = rows[r] | cols[c] | boxes[b];
        for d in 1..=9u8 {
            let bit = 1u16 << (d - 1);
            if used & bit != 0 {
                continue;
            }
            board[r][c] = (b'0' + d) as char;
            rows[r] |= bit;
            cols[c] |= bit;
            boxes[b] |= bit;
            if Self::dfs(board, i + 1, empty, rows, cols, boxes) {
                return true;
            }
            rows[r] ^= bit;
            cols[c] ^= bit;
            boxes[b] ^= bit;
        }
        board[r][c] = '.';
        false
    }
}
```

```typescript
class Solution {
    /**
     * @param {character[][]} board
     * @return {void} Do not return anything, modify board in-place instead.
     */
    solveSudoku(board: string[][]): void {
        const rows: number[] = new Array(9).fill(0);
        const cols: number[] = new Array(9).fill(0);
        const boxes: number[] = new Array(9).fill(0);
        const empty: [number, number][] = [];

        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                if (board[r][c] === '.') {
                    empty.push([r, c]);
                } else {
                    const bit = 1 << (Number(board[r][c]) - 1);
                    rows[r] |= bit;
                    cols[c] |= bit;
                    boxes[Math.floor(r / 3) * 3 + Math.floor(c / 3)] |= bit;
                }
            }
        }

        const dfs = (i: number): boolean => {
            if (i === empty.length) return true;

            const [r, c] = empty[i];
            const b = Math.floor(r / 3) * 3 + Math.floor(c / 3);
            const used = rows[r] | cols[c] | boxes[b];
            for (let d = 1; d <= 9; d++) {
                const bit = 1 << (d - 1);
                if (used & bit) continue;
                board[r][c] = String(d);
                rows[r] |= bit;
                cols[c] |= bit;
                boxes[b] |= bit;
                if (dfs(i + 1)) return true;
                rows[r] ^= bit;
                cols[c] ^= bit;
                boxes[b] ^= bit;
            }
            board[r][c] = '.';
            return false;
        };

        dfs(0);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(9 ^ m)$
- Space complexity: $O(m)$

> Where $m$ is the number of empty cells in the board.

---

## 4. Backtracking (Bit Mask + Most Constrained Cell)

::tabs-start

```python
class Solution:
    def solveSudoku(self, board: List[List[str]]) -> None:
        rows = [0] * 9
        cols = [0] * 9
        boxes = [0] * 9
        empty = []

        for r in range(9):
            for c in range(9):
                if board[r][c] == ".":
                    empty.append((r, c))
                else:
                    bit = 1 << (int(board[r][c]) - 1)
                    rows[r] |= bit
                    cols[c] |= bit
                    boxes[(r // 3) * 3 + c // 3] |= bit

        def dfs(i):
            if i == len(empty):
                return True

            best, bestCnt = i, 10
            for j in range(i, len(empty)):
                r, c = empty[j]
                used = rows[r] | cols[c] | boxes[(r // 3) * 3 + c // 3]
                cnt = 9 - bin(used).count("1")
                if cnt < bestCnt:
                    best, bestCnt = j, cnt
                    if cnt <= 1:
                        break
            empty[i], empty[best] = empty[best], empty[i]

            r, c = empty[i]
            b = (r // 3) * 3 + c // 3
            used = rows[r] | cols[c] | boxes[b]
            for d in range(1, 10):
                bit = 1 << (d - 1)
                if used & bit:
                    continue
                board[r][c] = str(d)
                rows[r] |= bit
                cols[c] |= bit
                boxes[b] |= bit
                if dfs(i + 1):
                    return True
                rows[r] ^= bit
                cols[c] ^= bit
                boxes[b] ^= bit
            board[r][c] = "."
            return False

        dfs(0)
```

```java
public class Solution {
    private int[] rows = new int[9];
    private int[] cols = new int[9];
    private int[] boxes = new int[9];
    private List<int[]> empty = new ArrayList<>();

    public void solveSudoku(char[][] board) {
        for (int r = 0; r < 9; r++) {
            for (int c = 0; c < 9; c++) {
                if (board[r][c] == '.') {
                    empty.add(new int[]{r, c});
                } else {
                    int bit = 1 << (board[r][c] - '1');
                    rows[r] |= bit;
                    cols[c] |= bit;
                    boxes[(r / 3) * 3 + c / 3] |= bit;
                }
            }
        }

        dfs(board, 0);
    }

    private boolean dfs(char[][] board, int i) {
        if (i == empty.size()) return true;

        int best = i, bestCnt = 10;
        for (int j = i; j < empty.size(); j++) {
            int r = empty.get(j)[0], c = empty.get(j)[1];
            int used = rows[r] | cols[c] | boxes[(r / 3) * 3 + c / 3];
            int cnt = 9 - Integer.bitCount(used);
            if (cnt < bestCnt) {
                best = j;
                bestCnt = cnt;
                if (cnt <= 1) break;
            }
        }
        Collections.swap(empty, i, best);

        int r = empty.get(i)[0], c = empty.get(i)[1];
        int b = (r / 3) * 3 + c / 3;
        int used = rows[r] | cols[c] | boxes[b];
        for (int d = 1; d <= 9; d++) {
            int bit = 1 << (d - 1);
            if ((used & bit) != 0) continue;
            board[r][c] = (char) ('0' + d);
            rows[r] |= bit;
            cols[c] |= bit;
            boxes[b] |= bit;
            if (dfs(board, i + 1)) return true;
            rows[r] ^= bit;
            cols[c] ^= bit;
            boxes[b] ^= bit;
        }
        board[r][c] = '.';
        return false;
    }
}
```

```cpp
class Solution {
    int rows[9] = {}, cols[9] = {}, boxes[9] = {};
    vector<pair<int, int>> empty;

public:
    void solveSudoku(vector<vector<char>>& board) {
        for (int r = 0; r < 9; r++) {
            for (int c = 0; c < 9; c++) {
                if (board[r][c] == '.') {
                    empty.push_back({r, c});
                } else {
                    int bit = 1 << (board[r][c] - '1');
                    rows[r] |= bit;
                    cols[c] |= bit;
                    boxes[(r / 3) * 3 + c / 3] |= bit;
                }
            }
        }

        dfs(board, 0);
    }

private:
    bool dfs(vector<vector<char>>& board, int i) {
        if (i == empty.size()) return true;

        int best = i, bestCnt = 10;
        for (int j = i; j < empty.size(); j++) {
            auto [r, c] = empty[j];
            int used = rows[r] | cols[c] | boxes[(r / 3) * 3 + c / 3];
            int cnt = 9 - __builtin_popcount(used);
            if (cnt < bestCnt) {
                best = j;
                bestCnt = cnt;
                if (cnt <= 1) break;
            }
        }
        swap(empty[i], empty[best]);

        auto [r, c] = empty[i];
        int b = (r / 3) * 3 + c / 3;
        int used = rows[r] | cols[c] | boxes[b];
        for (int d = 1; d <= 9; d++) {
            int bit = 1 << (d - 1);
            if (used & bit) continue;
            board[r][c] = '0' + d;
            rows[r] |= bit;
            cols[c] |= bit;
            boxes[b] |= bit;
            if (dfs(board, i + 1)) return true;
            rows[r] ^= bit;
            cols[c] ^= bit;
            boxes[b] ^= bit;
        }
        board[r][c] = '.';
        return false;
    }
};
```

```javascript
class Solution {
    /**
     * @param {character[][]} board
     * @return {void} Do not return anything, modify board in-place instead.
     */
    solveSudoku(board) {
        const rows = new Array(9).fill(0);
        const cols = new Array(9).fill(0);
        const boxes = new Array(9).fill(0);
        const empty = [];

        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                if (board[r][c] === '.') {
                    empty.push([r, c]);
                } else {
                    const bit = 1 << (Number(board[r][c]) - 1);
                    rows[r] |= bit;
                    cols[c] |= bit;
                    boxes[Math.floor(r / 3) * 3 + Math.floor(c / 3)] |= bit;
                }
            }
        }

        const bitCount = (x) => {
            let cnt = 0;
            while (x) {
                x &= x - 1;
                cnt++;
            }
            return cnt;
        };

        const dfs = (i) => {
            if (i === empty.length) return true;

            let best = i,
                bestCnt = 10;
            for (let j = i; j < empty.length; j++) {
                const [r, c] = empty[j];
                const box = Math.floor(r / 3) * 3 + Math.floor(c / 3);
                const cnt = 9 - bitCount(rows[r] | cols[c] | boxes[box]);
                if (cnt < bestCnt) {
                    best = j;
                    bestCnt = cnt;
                    if (cnt <= 1) break;
                }
            }
            [empty[i], empty[best]] = [empty[best], empty[i]];

            const [r, c] = empty[i];
            const b = Math.floor(r / 3) * 3 + Math.floor(c / 3);
            const used = rows[r] | cols[c] | boxes[b];
            for (let d = 1; d <= 9; d++) {
                const bit = 1 << (d - 1);
                if (used & bit) continue;
                board[r][c] = String(d);
                rows[r] |= bit;
                cols[c] |= bit;
                boxes[b] |= bit;
                if (dfs(i + 1)) return true;
                rows[r] ^= bit;
                cols[c] ^= bit;
                boxes[b] ^= bit;
            }
            board[r][c] = '.';
            return false;
        };

        dfs(0);
    }
}
```

```csharp
public class Solution {
    private int[] rows = new int[9];
    private int[] cols = new int[9];
    private int[] boxes = new int[9];
    private List<(int r, int c)> empty = new List<(int r, int c)>();

    public void SolveSudoku(char[][] board) {
        for (int r = 0; r < 9; r++) {
            for (int c = 0; c < 9; c++) {
                if (board[r][c] == '.') {
                    empty.Add((r, c));
                } else {
                    int bit = 1 << (board[r][c] - '1');
                    rows[r] |= bit;
                    cols[c] |= bit;
                    boxes[(r / 3) * 3 + c / 3] |= bit;
                }
            }
        }

        Dfs(board, 0);
    }

    private bool Dfs(char[][] board, int i) {
        if (i == empty.Count) return true;

        int best = i, bestCnt = 10;
        for (int j = i; j < empty.Count; j++) {
            var (er, ec) = empty[j];
            int mask = rows[er] | cols[ec] | boxes[(er / 3) * 3 + ec / 3];
            int cnt = 9 - System.Numerics.BitOperations.PopCount((uint) mask);
            if (cnt < bestCnt) {
                best = j;
                bestCnt = cnt;
                if (cnt <= 1) break;
            }
        }
        (empty[i], empty[best]) = (empty[best], empty[i]);

        var (r, c) = empty[i];
        int b = (r / 3) * 3 + c / 3;
        int used = rows[r] | cols[c] | boxes[b];
        for (int d = 1; d <= 9; d++) {
            int bit = 1 << (d - 1);
            if ((used & bit) != 0) continue;
            board[r][c] = (char) ('0' + d);
            rows[r] |= bit;
            cols[c] |= bit;
            boxes[b] |= bit;
            if (Dfs(board, i + 1)) return true;
            rows[r] ^= bit;
            cols[c] ^= bit;
            boxes[b] ^= bit;
        }
        board[r][c] = '.';
        return false;
    }
}
```

```go
func solveSudoku(board [][]byte) {
    var rows, cols, boxes [9]int
    var empty [][2]int

    for r := 0; r < 9; r++ {
        for c := 0; c < 9; c++ {
            if board[r][c] == '.' {
                empty = append(empty, [2]int{r, c})
            } else {
                bit := 1 << int(board[r][c]-'1')
                rows[r] |= bit
                cols[c] |= bit
                boxes[(r/3)*3+c/3] |= bit
            }
        }
    }

    var dfs func(i int) bool
    dfs = func(i int) bool {
        if i == len(empty) {
            return true
        }

        best, bestCnt := i, 10
        for j := i; j < len(empty); j++ {
            r, c := empty[j][0], empty[j][1]
            used := rows[r] | cols[c] | boxes[(r/3)*3+c/3]
            cnt := 9 - bits.OnesCount(uint(used))
            if cnt < bestCnt {
                best, bestCnt = j, cnt
                if cnt <= 1 {
                    break
                }
            }
        }
        empty[i], empty[best] = empty[best], empty[i]

        r, c := empty[i][0], empty[i][1]
        b := (r/3)*3 + c/3
        used := rows[r] | cols[c] | boxes[b]
        for d := 1; d <= 9; d++ {
            bit := 1 << (d - 1)
            if used&bit != 0 {
                continue
            }
            board[r][c] = byte('0' + d)
            rows[r] |= bit
            cols[c] |= bit
            boxes[b] |= bit
            if dfs(i + 1) {
                return true
            }
            rows[r] ^= bit
            cols[c] ^= bit
            boxes[b] ^= bit
        }
        board[r][c] = '.'
        return false
    }

    dfs(0)
}
```

```kotlin
class Solution {
    fun solveSudoku(board: Array<CharArray>) {
        val rows = IntArray(9)
        val cols = IntArray(9)
        val boxes = IntArray(9)
        val empty = mutableListOf<IntArray>()

        for (r in 0 until 9) {
            for (c in 0 until 9) {
                if (board[r][c] == '.') {
                    empty.add(intArrayOf(r, c))
                } else {
                    val bit = 1 shl (board[r][c] - '1')
                    rows[r] = rows[r] or bit
                    cols[c] = cols[c] or bit
                    boxes[(r / 3) * 3 + c / 3] = boxes[(r / 3) * 3 + c / 3] or bit
                }
            }
        }

        fun dfs(i: Int): Boolean {
            if (i == empty.size) return true

            var best = i
            var bestCnt = 10
            for (j in i until empty.size) {
                val (r, c) = empty[j]
                val used = rows[r] or cols[c] or boxes[(r / 3) * 3 + c / 3]
                val cnt = 9 - Integer.bitCount(used)
                if (cnt < bestCnt) {
                    best = j
                    bestCnt = cnt
                    if (cnt <= 1) break
                }
            }
            java.util.Collections.swap(empty, i, best)

            val (r, c) = empty[i]
            val b = (r / 3) * 3 + c / 3
            val used = rows[r] or cols[c] or boxes[b]
            for (d in 1..9) {
                val bit = 1 shl (d - 1)
                if ((used and bit) != 0) continue
                board[r][c] = '0' + d
                rows[r] = rows[r] or bit
                cols[c] = cols[c] or bit
                boxes[b] = boxes[b] or bit
                if (dfs(i + 1)) return true
                rows[r] = rows[r] xor bit
                cols[c] = cols[c] xor bit
                boxes[b] = boxes[b] xor bit
            }
            board[r][c] = '.'
            return false
        }

        dfs(0)
    }
}
```

```swift
class Solution {
    private var rows = [Int](repeating: 0, count: 9)
    private var cols = [Int](repeating: 0, count: 9)
    private var boxes = [Int](repeating: 0, count: 9)
    private var empty = [(Int, Int)]()
    private let digits = Array("123456789")

    func solveSudoku(_ board: inout [[Character]]) {
        for r in 0..<9 {
            for c in 0..<9 {
                if board[r][c] == "." {
                    empty.append((r, c))
                } else {
                    let bit = 1 << (board[r][c].wholeNumberValue! - 1)
                    rows[r] |= bit
                    cols[c] |= bit
                    boxes[(r / 3) * 3 + c / 3] |= bit
                }
            }
        }

        _ = dfs(&board, 0)
    }

    private func dfs(_ board: inout [[Character]], _ i: Int) -> Bool {
        if i == empty.count { return true }

        var best = i, bestCnt = 10
        for j in i..<empty.count {
            let (r, c) = empty[j]
            let used = rows[r] | cols[c] | boxes[(r / 3) * 3 + c / 3]
            let cnt = 9 - used.nonzeroBitCount
            if cnt < bestCnt {
                best = j
                bestCnt = cnt
                if cnt <= 1 { break }
            }
        }
        empty.swapAt(i, best)

        let (r, c) = empty[i]
        let b = (r / 3) * 3 + c / 3
        let used = rows[r] | cols[c] | boxes[b]
        for d in 1...9 {
            let bit = 1 << (d - 1)
            if used & bit != 0 { continue }
            board[r][c] = digits[d - 1]
            rows[r] |= bit
            cols[c] |= bit
            boxes[b] |= bit
            if dfs(&board, i + 1) { return true }
            rows[r] ^= bit
            cols[c] ^= bit
            boxes[b] ^= bit
        }
        board[r][c] = "."
        return false
    }
}
```

```rust
impl Solution {
    pub fn solve_sudoku(board: &mut Vec<Vec<char>>) {
        let mut rows = [0u16; 9];
        let mut cols = [0u16; 9];
        let mut boxes = [0u16; 9];
        let mut empty = Vec::new();

        for r in 0..9 {
            for c in 0..9 {
                if board[r][c] == '.' {
                    empty.push((r, c));
                } else {
                    let bit = 1 << (board[r][c] as u8 - b'1');
                    rows[r] |= bit;
                    cols[c] |= bit;
                    boxes[(r / 3) * 3 + c / 3] |= bit;
                }
            }
        }

        Self::dfs(board, 0, &mut empty, &mut rows, &mut cols, &mut boxes);
    }

    fn dfs(
        board: &mut Vec<Vec<char>>,
        i: usize,
        empty: &mut Vec<(usize, usize)>,
        rows: &mut [u16; 9],
        cols: &mut [u16; 9],
        boxes: &mut [u16; 9],
    ) -> bool {
        if i == empty.len() {
            return true;
        }

        let (mut best, mut best_cnt) = (i, 10);
        for j in i..empty.len() {
            let (r, c) = empty[j];
            let used = rows[r] | cols[c] | boxes[(r / 3) * 3 + c / 3];
            let cnt = 9 - used.count_ones();
            if cnt < best_cnt {
                best = j;
                best_cnt = cnt;
                if cnt <= 1 {
                    break;
                }
            }
        }
        empty.swap(i, best);

        let (r, c) = empty[i];
        let b = (r / 3) * 3 + c / 3;
        let used = rows[r] | cols[c] | boxes[b];
        for d in 1..=9u8 {
            let bit = 1u16 << (d - 1);
            if used & bit != 0 {
                continue;
            }
            board[r][c] = (b'0' + d) as char;
            rows[r] |= bit;
            cols[c] |= bit;
            boxes[b] |= bit;
            if Self::dfs(board, i + 1, empty, rows, cols, boxes) {
                return true;
            }
            rows[r] ^= bit;
            cols[c] ^= bit;
            boxes[b] ^= bit;
        }
        board[r][c] = '.';
        false
    }
}
```

```typescript
class Solution {
    /**
     * @param {character[][]} board
     * @return {void} Do not return anything, modify board in-place instead.
     */
    solveSudoku(board: string[][]): void {
        const rows: number[] = new Array(9).fill(0);
        const cols: number[] = new Array(9).fill(0);
        const boxes: number[] = new Array(9).fill(0);
        const empty: [number, number][] = [];

        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                if (board[r][c] === '.') {
                    empty.push([r, c]);
                } else {
                    const bit = 1 << (Number(board[r][c]) - 1);
                    rows[r] |= bit;
                    cols[c] |= bit;
                    boxes[Math.floor(r / 3) * 3 + Math.floor(c / 3)] |= bit;
                }
            }
        }

        const bitCount = (x: number): number => {
            let cnt = 0;
            while (x) {
                x &= x - 1;
                cnt++;
            }
            return cnt;
        };

        const dfs = (i: number): boolean => {
            if (i === empty.length) return true;

            let best = i,
                bestCnt = 10;
            for (let j = i; j < empty.length; j++) {
                const [r, c] = empty[j];
                const box = Math.floor(r / 3) * 3 + Math.floor(c / 3);
                const cnt = 9 - bitCount(rows[r] | cols[c] | boxes[box]);
                if (cnt < bestCnt) {
                    best = j;
                    bestCnt = cnt;
                    if (cnt <= 1) break;
                }
            }
            [empty[i], empty[best]] = [empty[best], empty[i]];

            const [r, c] = empty[i];
            const b = Math.floor(r / 3) * 3 + Math.floor(c / 3);
            const used = rows[r] | cols[c] | boxes[b];
            for (let d = 1; d <= 9; d++) {
                const bit = 1 << (d - 1);
                if (used & bit) continue;
                board[r][c] = String(d);
                rows[r] |= bit;
                cols[c] |= bit;
                boxes[b] |= bit;
                if (dfs(i + 1)) return true;
                rows[r] ^= bit;
                cols[c] ^= bit;
                boxes[b] ^= bit;
            }
            board[r][c] = '.';
            return false;
        };

        dfs(0);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * 9 ^ m)$ in the worst case, but choosing the most constrained cell first prunes the search tree drastically in practice.
- Space complexity: $O(m)$

> Where $m$ is the number of empty cells in the board.
