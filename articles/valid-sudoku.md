## 1. Brute Force

### Intuition

A valid Sudoku board must follow three rules:

1. Each **row** can contain digits `1–9` at most once.
2. Each **column** can contain digits `1–9` at most once.
3. Each **3×3 box** can contain digits `1–9` at most once.

We can directly check all these conditions one by one.  
For every row, every column, and every 3×3 box, we keep a set of seen digits and make sure no number appears twice.  
If we ever find a duplicate in any of these three checks, the board is invalid.

### Algorithm

1. **Check all rows**:
   - For each row index `row` from `0` to `8`:
     - Create an empty set `seen`.
     - For each column index `i` from `0` to `8`:
       - Skip if the cell is `"."`.
       - If the value is already in `seen`, return `False`.
       - Otherwise, add it to `seen`.

2. **Check all columns**:
   - For each column index `col` from `0` to `8`:
     - Create an empty set `seen`.
     - For each row index `i` from `0` to `8`:
       - Skip if the cell is `"."`.
       - If the value is already in `seen`, return `False`.
       - Otherwise, add it to `seen`.

3. **Check all 3×3 boxes**:
   - Number the 3×3 boxes from `0` to `8`.
   - For each `square`:
     - Create an empty set `seen`.
     - For `i` in `0..2` and `j` in `0..2`:
       - Compute:
         - `row = (square // 3) * 3 + i`
         - `col = (square % 3) * 3 + j`
       - Skip if the cell is `"."`.
       - If the value is already in `seen`, return `False`.
       - Otherwise, add it to `seen`.

4. If all rows, columns, and 3×3 boxes pass these checks without duplicates, return `True`.

::tabs-start

```python
class Solution:
    def isValidSudoku(self, board: List[List[str]]) -> bool:
        for row in range(9):
            seen = set()
            for i in range(9):
                if board[row][i] == ".":
                    continue
                if board[row][i] in seen:
                    return False
                seen.add(board[row][i])

        for col in range(9):
            seen = set()
            for i in range(9):
                if board[i][col] == ".":
                    continue
                if board[i][col] in seen:
                    return False
                seen.add(board[i][col])

        for square in range(9):
            seen = set()
            for i in range(3):
                for j in range(3):
                    row = (square//3) * 3 + i
                    col = (square % 3) * 3 + j
                    if board[row][col] == ".":
                        continue
                    if board[row][col] in seen:
                        return False
                    seen.add(board[row][col])
        return True
```

```java
public class Solution {
    public boolean isValidSudoku(char[][] board) {
        for (int row = 0; row < 9; row++) {
            Set<Character> seen = new HashSet<>();
            for (int i = 0; i < 9; i++) {
                if (board[row][i] == '.') continue;
                if (seen.contains(board[row][i])) return false;
                seen.add(board[row][i]);
            }
        }

        for (int col = 0; col < 9; col++) {
            Set<Character> seen = new HashSet<>();
            for (int i = 0; i < 9; i++) {
                if (board[i][col] == '.') continue;
                if (seen.contains(board[i][col])) return false;
                seen.add(board[i][col]);
            }
        }

        for (int square = 0; square < 9; square++) {
            Set<Character> seen = new HashSet<>();
            for (int i = 0; i < 3; i++) {
                for (int j = 0; j < 3; j++) {
                    int row = (square / 3) * 3 + i;
                    int col = (square % 3) * 3 + j;
                    if (board[row][col] == '.') continue;
                    if (seen.contains(board[row][col])) return false;
                    seen.add(board[row][col]);
                }
            }
        }

        return true;
    }
}
```

```cpp
class Solution {
public:
    bool isValidSudoku(vector<vector<char>>& board) {
        for (int row = 0; row < 9; row++) {
            unordered_set<char> seen;
            for (int i = 0; i < 9; i++) {
                if (board[row][i] == '.') continue;
                if (seen.count(board[row][i])) return false;
                seen.insert(board[row][i]);
            }
        }

        for (int col = 0; col < 9; col++) {
            unordered_set<char> seen;
            for (int i = 0; i < 9; i++) {
                if (board[i][col] == '.') continue;
                if (seen.count(board[i][col])) return false;
                seen.insert(board[i][col]);
            }
        }

        for (int square = 0; square < 9; square++) {
            unordered_set<char> seen;
            for (int i = 0; i < 3; i++) {
                for (int j = 0; j < 3; j++) {
                    int row = (square / 3) * 3 + i;
                    int col = (square % 3) * 3 + j;
                    if (board[row][col] == '.') continue;
                    if (seen.count(board[row][col])) return false;
                    seen.insert(board[row][col]);
                }
            }
        }

        return true;
    }
};
```

```javascript
class Solution {
    /**
     * @param {character[][]} board
     * @return {boolean}
     */
    isValidSudoku(board) {
        for (let row = 0; row < 9; row++) {
            let seen = new Set();
            for (let i = 0; i < 9; i++) {
                if (board[row][i] === '.') continue;
                if (seen.has(board[row][i])) return false;
                seen.add(board[row][i]);
            }
        }

        for (let col = 0; col < 9; col++) {
            let seen = new Set();
            for (let i = 0; i < 9; i++) {
                if (board[i][col] === '.') continue;
                if (seen.has(board[i][col])) return false;
                seen.add(board[i][col]);
            }
        }

        for (let square = 0; square < 9; square++) {
            let seen = new Set();
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    let row = Math.floor(square / 3) * 3 + i;
                    let col = (square % 3) * 3 + j;
                    if (board[row][col] === '.') continue;
                    if (seen.has(board[row][col])) return false;
                    seen.add(board[row][col]);
                }
            }
        }

        return true;
    }
}
```

```csharp
public class Solution {
    public bool IsValidSudoku(char[][] board) {
        for (int row = 0; row < 9; row++) {
            HashSet<char> seen = new HashSet<char>();
            for (int i = 0; i < 9; i++) {
                if (board[row][i] == '.') continue;
                if (seen.Contains(board[row][i])) return false;
                seen.Add(board[row][i]);
            }
        }

        for (int col = 0; col < 9; col++) {
            HashSet<char> seen = new HashSet<char>();
            for (int i = 0; i < 9; i++) {
                if (board[i][col] == '.') continue;
                if (seen.Contains(board[i][col])) return false;
                seen.Add(board[i][col]);
            }
        }

        for (int square = 0; square < 9; square++) {
            HashSet<char> seen = new HashSet<char>();
            for (int i = 0; i < 3; i++) {
                for (int j = 0; j < 3; j++) {
                    int row = (square / 3) * 3 + i;
                    int col = (square % 3) * 3 + j;
                    if (board[row][col] == '.') continue;
                    if (seen.Contains(board[row][col])) return false;
                    seen.Add(board[row][col]);
                }
            }
        }

        return true;
    }
}
```

```go
func isValidSudoku(board [][]byte) bool {
    for row := 0; row < 9; row++ {
        seen := make(map[byte]bool)
        for i := 0; i < 9; i++ {
            if board[row][i] == '.' {
                continue
            }
            if seen[board[row][i]] {
                return false
            }
            seen[board[row][i]] = true
        }
    }

    for col := 0; col < 9; col++ {
        seen := make(map[byte]bool)
        for i := 0; i < 9; i++ {
            if board[i][col] == '.' {
                continue
            }
            if seen[board[i][col]] {
                return false
            }
            seen[board[i][col]] = true
        }
    }

    for square := 0; square < 9; square++ {
        seen := make(map[byte]bool)
        for i := 0; i < 3; i++ {
            for j := 0; j < 3; j++ {
                row := (square / 3) * 3 + i
                col := (square % 3) * 3 + j
                if board[row][col] == '.' {
                    continue
                }
                if seen[board[row][col]] {
                    return false
                }
                seen[board[row][col]] = true
            }
        }
    }
    return true
}
```

```kotlin
class Solution {
    fun isValidSudoku(board: Array<CharArray>): Boolean {
        for (row in 0 until 9) {
            val seen = mutableSetOf<Char>()
            for (i in 0 until 9) {
                if (board[row][i] == '.') continue
                if (board[row][i] in seen) return false
                seen.add(board[row][i])
            }
        }

        for (col in 0 until 9) {
            val seen = mutableSetOf<Char>()
            for (i in 0 until 9) {
                if (board[i][col] == '.') continue
                if (board[i][col] in seen) return false
                seen.add(board[i][col])
            }
        }

        for (square in 0 until 9) {
            val seen = mutableSetOf<Char>()
            for (i in 0 until 3) {
                for (j in 0 until 3) {
                    val row = (square / 3) * 3 + i
                    val col = (square % 3) * 3 + j
                    if (board[row][col] == '.') continue
                    if (board[row][col] in seen) return false
                    seen.add(board[row][col])
                }
            }
        }
        return true
    }
}
```

```swift
class Solution {
    func isValidSudoku(_ board: [[Character]]) -> Bool {
        for row in 0..<9 {
            var seen = Set<Character>()
            for i in 0..<9 {
                if board[row][i] == "." { continue }
                if seen.contains(board[row][i]) { return false }
                seen.insert(board[row][i])
            }
        }

        for col in 0..<9 {
            var seen = Set<Character>()
            for i in 0..<9 {
                if board[i][col] == "." { continue }
                if seen.contains(board[i][col]) { return false }
                seen.insert(board[i][col])
            }
        }

        for square in 0..<9 {
            var seen = Set<Character>()
            for i in 0..<3 {
                for j in 0..<3 {
                    let row = (square / 3) * 3 + i
                    let col = (square % 3) * 3 + j
                    if board[row][col] == "." { continue }
                    if seen.contains(board[row][col]) { return false }
                    seen.insert(board[row][col])
                }
            }
        }

        return true
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n)$

---

## 2. Hash Set (One Pass)

### Intuition

Instead of checking rows, columns, and 3×3 boxes separately, we can validate the entire Sudoku board in **one single pass**.  
For each cell, we check whether the digit has already appeared in:

1. the same **row**  
2. the same **column**  
3. the same **3×3 box**

We track these using three hash sets:
- `rows[r]` keeps digits seen in row `r`
- `cols[c]` keeps digits seen in column `c`
- `squares[(r // 3, c // 3)]` keeps digits in the 3×3 box

If a digit appears again in any of these places, the board is invalid.

### Algorithm

1. Create three hash maps of sets:
   - `rows` to track digits in each row  
   - `cols` to track digits in each column  
   - `squares` to track digits in each 3×3 sub-box, keyed by `(r // 3, c // 3)`

2. Loop through every cell in the board:
   - Skip the cell if it contains `"."`.
   - Let `val` be the digit in the cell.
   - If `val` is already in:
     - `rows[r]` → duplicate in the row  
     - `cols[c]` → duplicate in the column  
     - `squares[(r // 3, c // 3)]` → duplicate in the 3×3 box  
     Then return `False`.

3. Otherwise, add the digit to all three sets:
   - `rows[r]`
   - `cols[c]`
   - `squares[(r // 3, c // 3)]`

4. If the whole board is scanned without detecting duplicates, return `True`.

::tabs-start

```python
class Solution:
    def isValidSudoku(self, board: List[List[str]]) -> bool:
        cols = defaultdict(set)
        rows = defaultdict(set)
        squares = defaultdict(set)

        for r in range(9):
            for c in range(9):
                if board[r][c] == ".":
                    continue
                if ( board[r][c] in rows[r]
                    or board[r][c] in cols[c]
                    or board[r][c] in squares[(r // 3, c // 3)]):
                    return False

                cols[c].add(board[r][c])
                rows[r].add(board[r][c])
                squares[(r // 3, c // 3)].add(board[r][c])

        return True
```

```java
public class Solution {
    public boolean isValidSudoku(char[][] board) {
        Map<Integer, Set<Character>> cols = new HashMap<>();
        Map<Integer, Set<Character>> rows = new HashMap<>();
        Map<String, Set<Character>> squares = new HashMap<>();

        for (int r = 0; r < 9; r++) {
            for (int c = 0; c < 9; c++) {
                if (board[r][c] == '.') continue;

                String squareKey = (r / 3) + "," + (c / 3);

                if (rows.computeIfAbsent(r, k -> new HashSet<>()).contains(board[r][c]) ||
                    cols.computeIfAbsent(c, k -> new HashSet<>()).contains(board[r][c]) ||
                    squares.computeIfAbsent(squareKey, k -> new HashSet<>()).contains(board[r][c])) {
                    return false;
                }

                rows.get(r).add(board[r][c]);
                cols.get(c).add(board[r][c]);
                squares.get(squareKey).add(board[r][c]);
            }
        }
        return true;
    }
}
```

```cpp
class Solution {
public:
    bool isValidSudoku(vector<vector<char>>& board) {
        unordered_map<int, unordered_set<char>> rows, cols;
        map<pair<int, int>, unordered_set<char>> squares;

        for (int r = 0; r < 9; r++) {
            for (int c = 0; c < 9; c++) {
                if (board[r][c] == '.') continue;

                pair<int, int> squareKey = {r / 3, c / 3};

                if (rows[r].count(board[r][c]) || cols[c].count(board[r][c]) || squares[squareKey].count(board[r][c])) {
                    return false;
                }

                rows[r].insert(board[r][c]);
                cols[c].insert(board[r][c]);
                squares[squareKey].insert(board[r][c]);
            }
        }
        return true;
    }
};
```

```javascript
class Solution {
    /**
     * @param {character[][]} board
     * @return {boolean}
     */
    isValidSudoku(board) {
        const cols = new Map();
        const rows = new Map();
        const squares = new Map();

        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                if (board[r][c] === '.') continue;

                const squareKey = `${Math.floor(r / 3)},${Math.floor(c / 3)}`;

                if (
                    (rows.get(r) && rows.get(r).has(board[r][c])) ||
                    (cols.get(c) && cols.get(c).has(board[r][c])) ||
                    (squares.get(squareKey) &&
                        squares.get(squareKey).has(board[r][c]))
                ) {
                    return false;
                }

                if (!rows.has(r)) rows.set(r, new Set());
                if (!cols.has(c)) cols.set(c, new Set());
                if (!squares.has(squareKey)) squares.set(squareKey, new Set());

                rows.get(r).add(board[r][c]);
                cols.get(c).add(board[r][c]);
                squares.get(squareKey).add(board[r][c]);
            }
        }
        return true;
    }
}
```

```csharp
public class Solution {
    public bool IsValidSudoku(char[][] board) {
        Dictionary<int, HashSet<char>> cols = new Dictionary<int, HashSet<char>>();
        Dictionary<int, HashSet<char>> rows = new Dictionary<int, HashSet<char>>();
        Dictionary<string, HashSet<char>> squares = new Dictionary<string, HashSet<char>>();

        for (int r = 0; r < 9; r++) {
            for (int c = 0; c < 9; c++) {
                if (board[r][c] == '.') continue;

                string squareKey = (r / 3) + "," + (c / 3);

                if ((rows.ContainsKey(r) && rows[r].Contains(board[r][c])) ||
                    (cols.ContainsKey(c) && cols[c].Contains(board[r][c])) ||
                    (squares.ContainsKey(squareKey) && squares[squareKey].Contains(board[r][c]))) {
                    return false;
                }

                if (!rows.ContainsKey(r)) rows[r] = new HashSet<char>();
                if (!cols.ContainsKey(c)) cols[c] = new HashSet<char>();
                if (!squares.ContainsKey(squareKey)) squares[squareKey] = new HashSet<char>();

                rows[r].Add(board[r][c]);
                cols[c].Add(board[r][c]);
                squares[squareKey].Add(board[r][c]);
            }
        }
        return true;
    }
}
```

```go
func isValidSudoku(board [][]byte) bool {
    rows := make([]map[byte]bool, 9)
    cols := make([]map[byte]bool, 9)
    squares := make([]map[byte]bool, 9)

    for i := 0; i < 9; i++ {
        rows[i] = make(map[byte]bool)
        cols[i] = make(map[byte]bool)
        squares[i] = make(map[byte]bool)
    }

    for r := 0; r < 9; r++ {
        for c := 0; c < 9; c++ {
            if board[r][c] == '.' {
                continue
            }
            val := board[r][c]
            squareIdx := (r/3)*3 + c/3

            if rows[r][val] || cols[c][val] ||
               squares[squareIdx][val] {
                return false
            }

            rows[r][val] = true
            cols[c][val] = true
            squares[squareIdx][val] = true
        }
    }

    return true
}
```

```kotlin
class Solution {
    fun isValidSudoku(board: Array<CharArray>): Boolean {
        val rows = Array(9) { HashSet<Char>() }
        val cols = Array(9) { HashSet<Char>() }
        val squares = Array(9) { HashSet<Char>() }

        for (r in 0 until 9) {
            for (c in 0 until 9) {
                val value = board[r][c]
                if (value == '.') continue

                val squareIdx = (r / 3) * 3 + (c / 3)
                if (value in rows[r] || value in cols[c] ||
                    value in squares[squareIdx]) {
                    return false
                }

                rows[r].add(value)
                cols[c].add(value)
                squares[squareIdx].add(value)
            }
        }

        return true
    }
}
```

```swift
class Solution {
    func isValidSudoku(_ board: [[Character]]) -> Bool {
        var cols = [Int: Set<Character>]()
        var rows = [Int: Set<Character>]()
        var squares = [String: Set<Character>]()

        for r in 0..<9 {
            for c in 0..<9 {
                if board[r][c] == "." { continue }

                let squareKey = "\(r / 3),\(c / 3)"

                if rows[r]?.contains(board[r][c]) == true ||
                   cols[c]?.contains(board[r][c]) == true ||
                   squares[squareKey]?.contains(board[r][c]) == true {
                    return false
                }

                rows[r, default: []].insert(board[r][c])
                cols[c, default: []].insert(board[r][c])
                squares[squareKey, default: []].insert(board[r][c])
            }
        }

        return true
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n ^ 2)$

---

## 3. Bitmask

### Intuition

Every digit from `1` to `9` can be represented using a single bit in an integer.  
For example, digit `1` uses bit `0`, digit `2` uses bit `1`, …, digit `9` uses bit `8`.  
This means we can track which digits have appeared in a row, column, or 3×3 box using just **one integer per row/column/box** instead of a hash set.

When we encounter a digit, we compute its bit position and check:
- if that bit is already set in the row → duplicate in row  
- if that bit is already set in the column → duplicate in column  
- if that bit is already set in the box → duplicate in box  

If none of these checks fail, we “turn on” that bit to mark the digit as seen.  
This approach is both memory efficient and fast.

### Algorithm

1. Create three arrays of size 9:
   - `rows[i]` stores bits for digits seen in row `i`
   - `cols[i]` stores bits for digits seen in column `i`
   - `squares[i]` stores bits for digits seen in 3×3 box `i`

2. Loop through each cell `(r, c)` of the board:
   - Skip if the cell contains `"."`.
   - Convert the digit to a bit index: `val = int(board[r][c]) - 1`.
   - Compute the mask: `mask = 1 << val`.

3. Check for duplicates:
   - If `mask` is already set in `rows[r]`, return `False`.
   - If `mask` is already set in `cols[c]`, return `False`.
   - If `mask` is already set in `squares[(r // 3) * 3 + (c // 3)]`, return `False`.

4. Mark the digit as seen:
   - `rows[r] |= mask`
   - `cols[c] |= mask`
   - `squares[(r // 3) * 3 + (c // 3)] |= mask`

5. If all cells are processed without conflicts, return `True`.

::tabs-start

```python
class Solution:
    def isValidSudoku(self, board: List[List[str]]) -> bool:
        rows = [0] * 9
        cols = [0] * 9
        squares = [0] * 9

        for r in range(9):
            for c in range(9):
                if board[r][c] == ".":
                    continue

                val = int(board[r][c]) - 1
                if (1 << val) & rows[r]:
                    return False
                if (1 << val) & cols[c]:
                    return False
                if (1 << val) & squares[(r // 3) * 3 + (c // 3)]:
                    return False

                rows[r] |= (1 << val)
                cols[c] |= (1 << val)
                squares[(r // 3) * 3 + (c // 3)] |= (1 << val)

        return True
```

```java
public class Solution {
    public boolean isValidSudoku(char[][] board) {
        int[] rows = new int[9];
        int[] cols = new int[9];
        int[] squares = new int[9];

        for (int r = 0; r < 9; r++) {
            for (int c = 0; c < 9; c++) {
                if (board[r][c] == '.') continue;

                int val = board[r][c] - '1';

                if ((rows[r] & (1 << val)) > 0 || (cols[c] & (1 << val)) > 0 ||
                    (squares[(r / 3) * 3 + (c / 3)] & (1 << val)) > 0) {
                    return false;
                }

                rows[r] |= (1 << val);
                cols[c] |= (1 << val);
                squares[(r / 3) * 3 + (c / 3)] |= (1 << val);
            }
        }
        return true;
    }
}
```

```cpp
class Solution {
public:
    bool isValidSudoku(vector<vector<char>>& board) {
        int rows[9] = {0};
        int cols[9] = {0};
        int squares[9] = {0};

        for (int r = 0; r < 9; ++r) {
            for (int c = 0; c < 9; ++c) {
                if (board[r][c] == '.') continue;

                int val = board[r][c] - '1';

                if ((rows[r] & (1 << val)) || (cols[c] & (1 << val)) ||
                    (squares[(r / 3) * 3 + (c / 3)] & (1 << val))) {
                    return false;
                }

                rows[r] |= (1 << val);
                cols[c] |= (1 << val);
                squares[(r / 3) * 3 + (c / 3)] |= (1 << val);
            }
        }
        return true;
    }
};
```

```javascript
class Solution {
    isValidSudoku(board) {
        let rows = new Array(9).fill(0);
        let cols = new Array(9).fill(0);
        let squares = new Array(9).fill(0);

        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                if (board[r][c] === '.') continue;

                let val = board[r][c] - '1';

                if (
                    rows[r] & (1 << val) ||
                    cols[c] & (1 << val) ||
                    squares[Math.floor(r / 3) * 3 + Math.floor(c / 3)] &
                        (1 << val)
                ) {
                    return false;
                }

                rows[r] |= 1 << val;
                cols[c] |= 1 << val;
                squares[Math.floor(r / 3) * 3 + Math.floor(c / 3)] |= 1 << val;
            }
        }
        return true;
    }
}
```

```csharp
public class Solution {
    public bool IsValidSudoku(char[][] board) {
        int[] rows = new int[9];
        int[] cols = new int[9];
        int[] squares = new int[9];

        for (int r = 0; r < 9; r++) {
            for (int c = 0; c < 9; c++) {
                if (board[r][c] == '.') continue;

                int val = board[r][c] - '1';

                if ((rows[r] & (1 << val)) > 0 || (cols[c] & (1 << val)) > 0 ||
                    (squares[(r / 3) * 3 + (c / 3)] & (1 << val)) > 0) {
                    return false;
                }

                rows[r] |= (1 << val);
                cols[c] |= (1 << val);
                squares[(r / 3) * 3 + (c / 3)] |= (1 << val);
            }
        }
        return true;
    }
}
```

```go
func isValidSudoku(board [][]byte) bool {
    rows := make([]int, 9)
    cols := make([]int, 9)
    squares := make([]int, 9)

    for r := 0; r < 9; r++ {
        for c := 0; c < 9; c++ {
            if board[r][c] == '.' {
                continue
            }

            val := board[r][c] - '1'
            bit := 1 << val
            squareIdx := (r/3)*3 + c/3

            if rows[r]&bit != 0 || cols[c]&bit != 0 ||
               squares[squareIdx]&bit != 0 {
                return false
            }

            rows[r] |= bit
            cols[c] |= bit
            squares[squareIdx] |= bit
        }
    }

    return true
}
```

```kotlin
class Solution {
    fun isValidSudoku(board: Array<CharArray>): Boolean {
        val rows = IntArray(9)
        val cols = IntArray(9)
        val squares = IntArray(9)

        for (r in 0 until 9) {
            for (c in 0 until 9) {
                if (board[r][c] == '.') continue

                val value = board[r][c] - '1'
                val bit = 1 shl value
                val squareIdx = (r / 3) * 3 + (c / 3)

                if ((rows[r] and bit) != 0 || (cols[c] and bit) != 0 ||
                    (squares[squareIdx] and bit) != 0) {
                    return false
                }

                rows[r] = rows[r] or bit
                cols[c] = cols[c] or bit
                squares[squareIdx] = squares[squareIdx] or bit
            }
        }

        return true
    }
}
```

```swift
class Solution {
    func isValidSudoku(_ board: [[Character]]) -> Bool {
        var rows = [Int](repeating: 0, count: 9)
        var cols = [Int](repeating: 0, count: 9)
        var squares = [Int](repeating: 0, count: 9)

        for r in 0..<9 {
            for c in 0..<9 {
                if board[r][c] == "." { continue }

                let val = Int(board[r][c].asciiValue! - Character("0").asciiValue!)
                let bitmask = 1 << (val - 1)

                if (rows[r] & bitmask) != 0 { return false }
                if (cols[c] & bitmask) != 0 { return false }
                if (squares[(r / 3) * 3 + (c / 3)] & bitmask) != 0 { return false }

                rows[r] |= bitmask
                cols[c] |= bitmask
                squares[(r / 3) * 3 + (c / 3)] |= bitmask
            }
        }

        return true
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n)$
