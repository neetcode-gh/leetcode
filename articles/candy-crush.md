## 1. Separate Steps: Find, Crush, Drop

### Intuition
We simulate the candy crush game by repeatedly performing three operations: find all candies that need to be crushed (three or more adjacent same-colored candies horizontally or vertically), crush them by setting their values to zero, and then drop remaining candies down to fill the gaps. We repeat this cycle until no more candies can be crushed.

### Algorithm
1. Implement a find function that scans the board for groups of three or more adjacent candies (horizontally and vertically) and stores their positions in a set.
2. Implement a crush function that sets all positions in the crushed set to 0.
3. Implement a drop function that, for each column, moves all non-zero candies down to fill the gaps left by crushed candies (using a lowest-zero pointer technique).
4. Repeatedly call find, crush, and drop until find returns an empty set.
5. Return the final board state.

::tabs-start

```python
class Solution:
    def candyCrush(self, board: List[List[int]]) -> List[List[int]]:
        m, n = len(board), len(board[0])

        def find():
            crushed_set = set()

            # Check vertically adjacent candies 
            for r in range(1, m - 1):
                for c in range(n):
                    if board[r][c] == 0:
                        continue
                    if board[r][c] == board[r - 1][c] == board[r + 1][c]: 
                        crushed_set.add((r, c))
                        crushed_set.add((r - 1, c))
                        crushed_set.add((r + 1, c))

            # Check horizontally adjacent candies 
            for r in range(m):
                for c in range(1, n - 1):
                    if board[r][c] == 0:
                        continue
                    if board[r][c] == board[r][c - 1] == board[r][c + 1]:
                        crushed_set.add((r, c))
                        crushed_set.add((r, c - 1))
                        crushed_set.add((r, c + 1))
            return crushed_set
        
        # Set the value of each candies to be crushed as 0
        def crush(crushed_set):
            for (r, c) in crushed_set:
                board[r][c] = 0
        
        def drop():
            for c in range(n):
                lowest_zero = -1

                # Iterate over each column
                for r in range(m - 1, -1, -1):
                    if board[r][c] == 0:
                        lowest_zero = max(lowest_zero, r)

                    # Swap current non-zero candy with the lowest zero.
                    elif lowest_zero >= 0:
                        board[r][c], board[lowest_zero][c] = board[lowest_zero][c], board[r][c]
                        lowest_zero -= 1

        # Continue with the three steps until we can no longer find any crushable candies.
        crushed_set = find()
        while crushed_set:
            crush(crushed_set)
            drop()
            crushed_set = find()

        return board
```

```java
class Solution {
    int m, n;

    Set<Pair<Integer, Integer>> find(int[][] board) {
        Set<Pair<Integer, Integer>> crushedSet = new HashSet<>();

        // Check vertically adjacent candies
        for (int r = 1; r < m - 1; r++) {
            for (int c = 0; c < n; c++) {
                if (board[r][c] == 0) {
                    continue;
                }
                if (board[r][c] == board[r - 1][c] && board[r][c] == board[r + 1][c]) {
                    crushedSet.add(new Pair<>(r, c));
                    crushedSet.add(new Pair<>(r - 1, c));
                    crushedSet.add(new Pair<>(r + 1, c));
                }
            }
        }

        // Check horizontally adjacent candies
        for (int r = 0; r < m; r++) {
            for (int c = 1; c < n - 1; c++) {
                if (board[r][c] == 0) {
                    continue;
                }
                if (board[r][c] == board[r][c - 1] && board[r][c] == board[r][c + 1]) {
                    crushedSet.add(new Pair<>(r, c));
                    crushedSet.add(new Pair<>(r, c - 1));
                    crushedSet.add(new Pair<>(r, c + 1));
                }
            }
        }
        return crushedSet;
    }

    void crush(int[][] board, Set<Pair<Integer, Integer>> crushedSet) {
        for (Pair<Integer, Integer> pair : crushedSet) {
            int r = pair.getKey();
            int c = pair.getValue();
            board[r][c] = 0;
        }
    }

    void drop(int[][] board) {
        for (int c = 0; c < n; c++) {
            int lowestZero = -1;

            // Iterate over each column
            for (int r = m - 1; r >= 0; r--) {
                if (board[r][c] == 0) {
                    lowestZero = Math.max(lowestZero, r);
                } else if (lowestZero >= 0) {
                    int temp = board[r][c];
                    board[r][c] = board[lowestZero][c];
                    board[lowestZero][c] = temp;
                    lowestZero--;
                }
            }
        }
    }

    public int[][] candyCrush(int[][] board) {
        m = board.length;
        n = board[0].length;
        Set<Pair<Integer, Integer>> crushedSet = find(board);
        while (!crushedSet.isEmpty()) {
            crush(board, crushedSet);
            drop(board);
            crushedSet = find(board);
        }

        return board;
    }
}
```

```cpp
class Solution {
    int m, n;
    
    set<pair<int, int>> find(vector<vector<int>>& board) {
        set<pair<int, int>> crushedSet;
        
        // Check vertically adjacent candies
        for (int r = 1; r < m - 1; r++) {
            for (int c = 0; c < n; c++) {
                if (board[r][c] == 0) {
                    continue;
                }
                if (board[r][c] == board[r - 1][c] && board[r][c] == board[r + 1][c]) {
                    crushedSet.insert({r, c});
                    crushedSet.insert({r - 1, c});
                    crushedSet.insert({r + 1, c});
                }
            }
        }
        
        // Check horizontally adjacent candies
        for (int r = 0; r < m; r++) {
            for (int c = 1; c < n - 1; c++) {
                if (board[r][c] == 0) {
                    continue;
                }
                if (board[r][c] == board[r][c - 1] && board[r][c] == board[r][c + 1]) {
                    crushedSet.insert({r, c});
                    crushedSet.insert({r, c - 1});
                    crushedSet.insert({r, c + 1});
                }
            }
        }
        
        return crushedSet;
    }
    
    void crush(vector<vector<int>>& board, set<pair<int, int>>& crushedSet) {
        for (const auto& p : crushedSet) {
            int r = p.first;
            int c = p.second;
            board[r][c] = 0;
        }
    }
    
    void drop(vector<vector<int>>& board) {
        for (int c = 0; c < n; c++) {
            int lowestZero = -1;
            
            // Iterate over each column
            for (int r = m - 1; r >= 0; r--) {
                if (board[r][c] == 0) {
                    lowestZero = max(lowestZero, r);
                } else if (lowestZero >= 0) {
                    int temp = board[r][c];
                    board[r][c] = board[lowestZero][c];
                    board[lowestZero][c] = temp;
                    lowestZero--;
                }
            }
        }
    }
    
public:
    vector<vector<int>> candyCrush(vector<vector<int>>& board) {
        m = board.size();
        n = board[0].size();
        
        set<pair<int, int>> crushedSet = find(board);
        while (!crushedSet.empty()) {
            crush(board, crushedSet);
            drop(board);
            crushedSet = find(board);
        }
        
        return board;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} board
     * @return {number[][]}
     */
    candyCrush(board) {
        this.m = board.length;
        this.n = board[0].length;

        let crushedSet = this.find(board);
        while (crushedSet.size > 0) {
            this.crush(board, crushedSet);
            this.drop(board);
            crushedSet = this.find(board);
        }

        return board;
    }

    /**
     * @param {number[][]} board
     * @return {Set<string>}
     */
    find(board) {
        let crushedSet = new Set();

        // Check vertically adjacent candies
        for (let r = 1; r < this.m - 1; r++) {
            for (let c = 0; c < this.n; c++) {
                if (board[r][c] === 0) {
                    continue;
                }
                if (board[r][c] === board[r - 1][c] && board[r][c] === board[r + 1][c]) {
                    crushedSet.add(`${r},${c}`);
                    crushedSet.add(`${r - 1},${c}`);
                    crushedSet.add(`${r + 1},${c}`);
                }
            }
        }

        // Check horizontally adjacent candies
        for (let r = 0; r < this.m; r++) {
            for (let c = 1; c < this.n - 1; c++) {
                if (board[r][c] === 0) {
                    continue;
                }
                if (board[r][c] === board[r][c - 1] && board[r][c] === board[r][c + 1]) {
                    crushedSet.add(`${r},${c}`);
                    crushedSet.add(`${r},${c - 1}`);
                    crushedSet.add(`${r},${c + 1}`);
                }
            }
        }

        return crushedSet;
    }

    /**
     * @param {number[][]} board
     * @param {Set<string>} crushedSet
     * @return {void}
     */
    crush(board, crushedSet) {
        for (let key of crushedSet) {
            let [r, c] = key.split(',').map(Number);
            board[r][c] = 0;
        }
    }

    /**
     * @param {number[][]} board
     * @return {void}
     */
    drop(board) {
        for (let c = 0; c < this.n; c++) {
            let lowestZero = -1;

            // Iterate over each column
            for (let r = this.m - 1; r >= 0; r--) {
                if (board[r][c] === 0) {
                    lowestZero = Math.max(lowestZero, r);
                } else if (lowestZero >= 0) {
                    let temp = board[r][c];
                    board[r][c] = board[lowestZero][c];
                    board[lowestZero][c] = temp;
                    lowestZero--;
                }
            }
        }
    }
}
```

```csharp
public class Solution {
    int m, n;

    public int[][] CandyCrush(int[][] board) {
        m = board.Length;
        n = board[0].Length;

        var crushedSet = Find(board);
        while (crushedSet.Count > 0) {
            Crush(board, crushedSet);
            Drop(board);
            crushedSet = Find(board);
        }

        return board;
    }

    private HashSet<(int, int)> Find(int[][] board) {
        var crushedSet = new HashSet<(int, int)>();

        // Check vertically adjacent candies
        for (int r = 1; r < m - 1; r++) {
            for (int c = 0; c < n; c++) {
                if (board[r][c] == 0) continue;
                if (board[r][c] == board[r - 1][c] && board[r][c] == board[r + 1][c]) {
                    crushedSet.Add((r, c));
                    crushedSet.Add((r - 1, c));
                    crushedSet.Add((r + 1, c));
                }
            }
        }

        // Check horizontally adjacent candies
        for (int r = 0; r < m; r++) {
            for (int c = 1; c < n - 1; c++) {
                if (board[r][c] == 0) continue;
                if (board[r][c] == board[r][c - 1] && board[r][c] == board[r][c + 1]) {
                    crushedSet.Add((r, c));
                    crushedSet.Add((r, c - 1));
                    crushedSet.Add((r, c + 1));
                }
            }
        }

        return crushedSet;
    }

    private void Crush(int[][] board, HashSet<(int, int)> crushedSet) {
        foreach (var (r, c) in crushedSet) {
            board[r][c] = 0;
        }
    }

    private void Drop(int[][] board) {
        for (int c = 0; c < n; c++) {
            int lowestZero = -1;

            for (int r = m - 1; r >= 0; r--) {
                if (board[r][c] == 0) {
                    lowestZero = Math.Max(lowestZero, r);
                } else if (lowestZero >= 0) {
                    int temp = board[r][c];
                    board[r][c] = board[lowestZero][c];
                    board[lowestZero][c] = temp;
                    lowestZero--;
                }
            }
        }
    }
}
```

```go
func candyCrush(board [][]int) [][]int {
    m, n := len(board), len(board[0])

    find := func() map[[2]int]bool {
        crushedSet := make(map[[2]int]bool)

        // Check vertically adjacent candies
        for r := 1; r < m-1; r++ {
            for c := 0; c < n; c++ {
                if board[r][c] == 0 {
                    continue
                }
                if board[r][c] == board[r-1][c] && board[r][c] == board[r+1][c] {
                    crushedSet[[2]int{r, c}] = true
                    crushedSet[[2]int{r - 1, c}] = true
                    crushedSet[[2]int{r + 1, c}] = true
                }
            }
        }

        // Check horizontally adjacent candies
        for r := 0; r < m; r++ {
            for c := 1; c < n-1; c++ {
                if board[r][c] == 0 {
                    continue
                }
                if board[r][c] == board[r][c-1] && board[r][c] == board[r][c+1] {
                    crushedSet[[2]int{r, c}] = true
                    crushedSet[[2]int{r, c - 1}] = true
                    crushedSet[[2]int{r, c + 1}] = true
                }
            }
        }

        return crushedSet
    }

    crush := func(crushedSet map[[2]int]bool) {
        for pos := range crushedSet {
            board[pos[0]][pos[1]] = 0
        }
    }

    drop := func() {
        for c := 0; c < n; c++ {
            lowestZero := -1

            for r := m - 1; r >= 0; r-- {
                if board[r][c] == 0 {
                    if r > lowestZero {
                        lowestZero = r
                    }
                } else if lowestZero >= 0 {
                    board[r][c], board[lowestZero][c] = board[lowestZero][c], board[r][c]
                    lowestZero--
                }
            }
        }
    }

    crushedSet := find()
    for len(crushedSet) > 0 {
        crush(crushedSet)
        drop()
        crushedSet = find()
    }

    return board
}
```

```kotlin
class Solution {
    private var m = 0
    private var n = 0

    fun candyCrush(board: Array<IntArray>): Array<IntArray> {
        m = board.size
        n = board[0].size

        var crushedSet = find(board)
        while (crushedSet.isNotEmpty()) {
            crush(board, crushedSet)
            drop(board)
            crushedSet = find(board)
        }

        return board
    }

    private fun find(board: Array<IntArray>): Set<Pair<Int, Int>> {
        val crushedSet = mutableSetOf<Pair<Int, Int>>()

        // Check vertically adjacent candies
        for (r in 1 until m - 1) {
            for (c in 0 until n) {
                if (board[r][c] == 0) continue
                if (board[r][c] == board[r - 1][c] && board[r][c] == board[r + 1][c]) {
                    crushedSet.add(Pair(r, c))
                    crushedSet.add(Pair(r - 1, c))
                    crushedSet.add(Pair(r + 1, c))
                }
            }
        }

        // Check horizontally adjacent candies
        for (r in 0 until m) {
            for (c in 1 until n - 1) {
                if (board[r][c] == 0) continue
                if (board[r][c] == board[r][c - 1] && board[r][c] == board[r][c + 1]) {
                    crushedSet.add(Pair(r, c))
                    crushedSet.add(Pair(r, c - 1))
                    crushedSet.add(Pair(r, c + 1))
                }
            }
        }

        return crushedSet
    }

    private fun crush(board: Array<IntArray>, crushedSet: Set<Pair<Int, Int>>) {
        for ((r, c) in crushedSet) {
            board[r][c] = 0
        }
    }

    private fun drop(board: Array<IntArray>) {
        for (c in 0 until n) {
            var lowestZero = -1

            for (r in m - 1 downTo 0) {
                if (board[r][c] == 0) {
                    lowestZero = maxOf(lowestZero, r)
                } else if (lowestZero >= 0) {
                    val temp = board[r][c]
                    board[r][c] = board[lowestZero][c]
                    board[lowestZero][c] = temp
                    lowestZero--
                }
            }
        }
    }
}
```

```swift
class Solution {
    private var m = 0
    private var n = 0

    func candyCrush(_ board: [[Int]]) -> [[Int]] {
        var board = board
        m = board.count
        n = board[0].count

        var crushedSet = find(board)
        while !crushedSet.isEmpty {
            crush(&board, crushedSet)
            drop(&board)
            crushedSet = find(board)
        }

        return board
    }

    private func find(_ board: [[Int]]) -> Set<[Int]> {
        var crushedSet = Set<[Int]>()

        // Check vertically adjacent candies
        for r in 1..<(m - 1) {
            for c in 0..<n {
                if board[r][c] == 0 { continue }
                if board[r][c] == board[r - 1][c] && board[r][c] == board[r + 1][c] {
                    crushedSet.insert([r, c])
                    crushedSet.insert([r - 1, c])
                    crushedSet.insert([r + 1, c])
                }
            }
        }

        // Check horizontally adjacent candies
        for r in 0..<m {
            for c in 1..<(n - 1) {
                if board[r][c] == 0 { continue }
                if board[r][c] == board[r][c - 1] && board[r][c] == board[r][c + 1] {
                    crushedSet.insert([r, c])
                    crushedSet.insert([r, c - 1])
                    crushedSet.insert([r, c + 1])
                }
            }
        }

        return crushedSet
    }

    private func crush(_ board: inout [[Int]], _ crushedSet: Set<[Int]>) {
        for pos in crushedSet {
            board[pos[0]][pos[1]] = 0
        }
    }

    private func drop(_ board: inout [[Int]]) {
        for c in 0..<n {
            var lowestZero = -1

            for r in stride(from: m - 1, through: 0, by: -1) {
                if board[r][c] == 0 {
                    lowestZero = max(lowestZero, r)
                } else if lowestZero >= 0 {
                    let temp = board[r][c]
                    board[r][c] = board[lowestZero][c]
                    board[lowestZero][c] = temp
                    lowestZero -= 1
                }
            }
        }
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m^2 \cdot n^2)$
- Space complexity: $O(m \cdot n)$

>  Where $m × n$ is the size of the grid `board`

---

## 2. In-place Modification

### Intuition
Instead of using a separate set to track crushed candies, we can mark them in-place by negating their values. This allows us to identify candies to crush while still being able to check for matching (using absolute values). After marking, we convert all negative values to zero. This reduces space usage compared to maintaining a separate set.

### Algorithm
1. Scan the board for groups of three or more adjacent candies. When found, mark them by negating their values (making them negative). Use absolute values when comparing to handle already-marked candies.
2. After marking, convert all negative values to zero.
3. Return a flag indicating whether any candies were marked for crushing.
4. Implement the drop function to move non-zero candies down in each column.
5. Repeat the find-and-crush step followed by drop until no candies are marked for crushing.
6. Return the final board state.

::tabs-start

```python
class Solution:
    def candyCrush(self, board: List[List[int]]) -> List[List[int]]:
        m, n = len(board), len(board[0])

        def find_and_crush():
            complete = True

            # Check vertically adjacent candies 
            for r in range(1, m - 1):
                for c in range(n):
                    if board[r][c] == 0:
                        continue
                    if abs(board[r][c]) == abs(board[r - 1][c]) == abs(board[r + 1][c]): 
                        board[r][c] = -abs(board[r][c])
                        board[r - 1][c] = -abs(board[r - 1][c])
                        board[r + 1][c] = -abs(board[r + 1][c])
                        complete = False

            # Check horizontally adjacent candies 
            for r in range(m):
                for c in range(1, n - 1):
                    if board[r][c] == 0:
                        continue
                    if abs(board[r][c]) == abs(board[r][c - 1]) == abs(board[r][c + 1]): 
                        board[r][c] = -abs(board[r][c])
                        board[r][c - 1] = -abs(board[r][c - 1])
                        board[r][c + 1] = -abs(board[r][c + 1])
                        complete = False
            
            # Set the value of each candies to be crushed as 0
            for r in range(m):
                for c in range(n):
                    if board[r][c] < 0:
                        board[r][c] = 0           
            return complete
        
        def drop():
            for c in range(n):
                lowest_zero = -1

                # Iterate over each column
                for r in range(m - 1, -1, -1):
                    if board[r][c] == 0:
                        lowest_zero = max(lowest_zero, r)

                    # Swap current non-zero candy with the lowest zero.
                    elif lowest_zero >= 0:
                        board[r][c], board[lowest_zero][c] = board[lowest_zero][c], board[r][c]
                        lowest_zero -= 1

        # Continue with the three steps until we can no longer find any crushable candies.
        while not find_and_crush():
            drop()

        return board
```

```java
class Solution {
    int m, n;
    boolean findAndCrush(int[][] board) {
        boolean complete = true;

        // Check vertically adjacent candies
        for (int r = 1; r < m - 1; r++) {
            for (int c = 0; c < n; c++) {
                if (board[r][c] == 0) {
                    continue;
                }
                if (Math.abs(board[r][c]) == Math.abs(board[r - 1][c]) && Math.abs(board[r][c]) == Math.abs(board[r + 1][c])) {
                    board[r][c] = -Math.abs(board[r][c]);
                    board[r - 1][c] = -Math.abs(board[r - 1][c]);
                    board[r + 1][c] = -Math.abs(board[r + 1][c]);
                    complete = false;
                }
            }
        }

        // Check horizontally adjacent candies
        for (int r = 0; r < m; r++) {
            for (int c = 1; c < n - 1; c++) {
                if (board[r][c] == 0) {
                    continue;
                }
                if (Math.abs(board[r][c]) == Math.abs(board[r][c - 1]) && Math.abs(board[r][c]) == Math.abs(board[r][c + 1])) {
                    board[r][c] = -Math.abs(board[r][c]);
                    board[r][c - 1] = -Math.abs(board[r][c - 1]);
                    board[r][c + 1] = -Math.abs(board[r][c + 1]);
                    complete = false;
                }
            }
        }

        // Set the value of each candy to be crushed as 0
        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                if (board[r][c] < 0) {
                    board[r][c] = 0;
                }
            }
        }

        return complete;
    }

    void drop(int[][] board) {
        for (int c = 0; c < n; c++) {
            int lowestZero = -1;

            // Iterate over each column
            for (int r = m - 1; r >= 0; r--) {
                if (board[r][c] == 0) {
                    lowestZero = Math.max(lowestZero, r);
                } else if (lowestZero >= 0) {
                    int temp = board[r][c];
                    board[r][c] = board[lowestZero][c];
                    board[lowestZero][c] = temp;
                    lowestZero--;
                }
            }
        }
    }

    public int[][] candyCrush(int[][] board) {
        m = board.length;
        n = board[0].length;

        // Continue with the three steps until we can no longer find any crushable candies.
        while (!findAndCrush(board)) {
            drop(board);
        }

        return board;
    }
}
```

```cpp
class Solution {
    int m, n;
    
    bool findAndCrush(vector<vector<int>>& board) {
        bool complete = true;
        
        // Check vertically adjacent candies
        for (int r = 1; r < m - 1; r++) {
            for (int c = 0; c < n; c++) {
                if (board[r][c] == 0) {
                    continue;
                }
                if (abs(board[r][c]) == abs(board[r - 1][c]) && abs(board[r][c]) == abs(board[r + 1][c])) {
                    board[r][c] = -abs(board[r][c]);
                    board[r - 1][c] = -abs(board[r - 1][c]);
                    board[r + 1][c] = -abs(board[r + 1][c]);
                    complete = false;
                }
            }
        }
        
        // Check horizontally adjacent candies
        for (int r = 0; r < m; r++) {
            for (int c = 1; c < n - 1; c++) {
                if (board[r][c] == 0) {
                    continue;
                }
                if (abs(board[r][c]) == abs(board[r][c - 1]) && abs(board[r][c]) == abs(board[r][c + 1])) {
                    board[r][c] = -abs(board[r][c]);
                    board[r][c - 1] = -abs(board[r][c - 1]);
                    board[r][c + 1] = -abs(board[r][c + 1]);
                    complete = false;
                }
            }
        }
        
        // Set the value of each candy to be crushed as 0
        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                if (board[r][c] < 0) {
                    board[r][c] = 0;
                }
            }
        }
        
        return complete;
    }
    
    void drop(vector<vector<int>>& board) {
        for (int c = 0; c < n; c++) {
            int lowestZero = -1;
            
            // Iterate over each column
            for (int r = m - 1; r >= 0; r--) {
                if (board[r][c] == 0) {
                    lowestZero = max(lowestZero, r);
                } else if (lowestZero >= 0) {
                    int temp = board[r][c];
                    board[r][c] = board[lowestZero][c];
                    board[lowestZero][c] = temp;
                    lowestZero--;
                }
            }
        }
    }
    
public:
    vector<vector<int>> candyCrush(vector<vector<int>>& board) {
        m = board.size();
        n = board[0].size();
        
        // Continue with the three steps until we can no longer find any crushable candies.
        while (!findAndCrush(board)) {
            drop(board);
        }
        
        return board;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} board
     * @return {number[][]}
     */
    candyCrush(board) {
        this.m = board.length;
        this.n = board[0].length;

        // Continue with the three steps until we can no longer find any crushable candies.
        while (!this.findAndCrush(board)) {
            this.drop(board);
        }

        return board;
    }

    /**
     * @param {number[][]} board
     * @return {boolean}
     */
    findAndCrush(board) {
        let complete = true;

        // Check vertically adjacent candies
        for (let r = 1; r < this.m - 1; r++) {
            for (let c = 0; c < this.n; c++) {
                if (board[r][c] === 0) {
                    continue;
                }
                if (Math.abs(board[r][c]) === Math.abs(board[r - 1][c]) && Math.abs(board[r][c]) === Math.abs(board[r + 1][c])) {
                    board[r][c] = -Math.abs(board[r][c]);
                    board[r - 1][c] = -Math.abs(board[r - 1][c]);
                    board[r + 1][c] = -Math.abs(board[r + 1][c]);
                    complete = false;
                }
            }
        }

        // Check horizontally adjacent candies
        for (let r = 0; r < this.m; r++) {
            for (let c = 1; c < this.n - 1; c++) {
                if (board[r][c] === 0) {
                    continue;
                }
                if (Math.abs(board[r][c]) === Math.abs(board[r][c - 1]) && Math.abs(board[r][c]) === Math.abs(board[r][c + 1])) {
                    board[r][c] = -Math.abs(board[r][c]);
                    board[r][c - 1] = -Math.abs(board[r][c - 1]);
                    board[r][c + 1] = -Math.abs(board[r][c + 1]);
                    complete = false;
                }
            }
        }

        // Set the value of each candy to be crushed as 0
        for (let r = 0; r < this.m; r++) {
            for (let c = 0; c < this.n; c++) {
                if (board[r][c] < 0) {
                    board[r][c] = 0;
                }
            }
        }

        return complete;
    }

    /**
     * @param {number[][]} board
     * @return {void}
     */
    drop(board) {
        for (let c = 0; c < this.n; c++) {
            let lowestZero = -1;

            // Iterate over each column
            for (let r = this.m - 1; r >= 0; r--) {
                if (board[r][c] === 0) {
                    lowestZero = Math.max(lowestZero, r);
                } else if (lowestZero >= 0) {
                    let temp = board[r][c];
                    board[r][c] = board[lowestZero][c];
                    board[lowestZero][c] = temp;
                    lowestZero--;
                }
            }
        }
    }
}
```

```csharp
public class Solution {
    int m, n;

    public int[][] CandyCrush(int[][] board) {
        m = board.Length;
        n = board[0].Length;

        while (!FindAndCrush(board)) {
            Drop(board);
        }

        return board;
    }

    private bool FindAndCrush(int[][] board) {
        bool complete = true;

        // Check vertically adjacent candies
        for (int r = 1; r < m - 1; r++) {
            for (int c = 0; c < n; c++) {
                if (board[r][c] == 0) continue;
                if (Math.Abs(board[r][c]) == Math.Abs(board[r - 1][c]) &&
                    Math.Abs(board[r][c]) == Math.Abs(board[r + 1][c])) {
                    board[r][c] = -Math.Abs(board[r][c]);
                    board[r - 1][c] = -Math.Abs(board[r - 1][c]);
                    board[r + 1][c] = -Math.Abs(board[r + 1][c]);
                    complete = false;
                }
            }
        }

        // Check horizontally adjacent candies
        for (int r = 0; r < m; r++) {
            for (int c = 1; c < n - 1; c++) {
                if (board[r][c] == 0) continue;
                if (Math.Abs(board[r][c]) == Math.Abs(board[r][c - 1]) &&
                    Math.Abs(board[r][c]) == Math.Abs(board[r][c + 1])) {
                    board[r][c] = -Math.Abs(board[r][c]);
                    board[r][c - 1] = -Math.Abs(board[r][c - 1]);
                    board[r][c + 1] = -Math.Abs(board[r][c + 1]);
                    complete = false;
                }
            }
        }

        // Set the value of each candy to be crushed as 0
        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                if (board[r][c] < 0) {
                    board[r][c] = 0;
                }
            }
        }

        return complete;
    }

    private void Drop(int[][] board) {
        for (int c = 0; c < n; c++) {
            int lowestZero = -1;

            for (int r = m - 1; r >= 0; r--) {
                if (board[r][c] == 0) {
                    lowestZero = Math.Max(lowestZero, r);
                } else if (lowestZero >= 0) {
                    int temp = board[r][c];
                    board[r][c] = board[lowestZero][c];
                    board[lowestZero][c] = temp;
                    lowestZero--;
                }
            }
        }
    }
}
```

```go
func candyCrush(board [][]int) [][]int {
    m, n := len(board), len(board[0])

    abs := func(x int) int {
        if x < 0 {
            return -x
        }
        return x
    }

    findAndCrush := func() bool {
        complete := true

        // Check vertically adjacent candies
        for r := 1; r < m-1; r++ {
            for c := 0; c < n; c++ {
                if board[r][c] == 0 {
                    continue
                }
                if abs(board[r][c]) == abs(board[r-1][c]) && abs(board[r][c]) == abs(board[r+1][c]) {
                    board[r][c] = -abs(board[r][c])
                    board[r-1][c] = -abs(board[r-1][c])
                    board[r+1][c] = -abs(board[r+1][c])
                    complete = false
                }
            }
        }

        // Check horizontally adjacent candies
        for r := 0; r < m; r++ {
            for c := 1; c < n-1; c++ {
                if board[r][c] == 0 {
                    continue
                }
                if abs(board[r][c]) == abs(board[r][c-1]) && abs(board[r][c]) == abs(board[r][c+1]) {
                    board[r][c] = -abs(board[r][c])
                    board[r][c-1] = -abs(board[r][c-1])
                    board[r][c+1] = -abs(board[r][c+1])
                    complete = false
                }
            }
        }

        // Set the value of each candy to be crushed as 0
        for r := 0; r < m; r++ {
            for c := 0; c < n; c++ {
                if board[r][c] < 0 {
                    board[r][c] = 0
                }
            }
        }

        return complete
    }

    drop := func() {
        for c := 0; c < n; c++ {
            lowestZero := -1

            for r := m - 1; r >= 0; r-- {
                if board[r][c] == 0 {
                    if r > lowestZero {
                        lowestZero = r
                    }
                } else if lowestZero >= 0 {
                    board[r][c], board[lowestZero][c] = board[lowestZero][c], board[r][c]
                    lowestZero--
                }
            }
        }
    }

    for !findAndCrush() {
        drop()
    }

    return board
}
```

```kotlin
class Solution {
    private var m = 0
    private var n = 0

    fun candyCrush(board: Array<IntArray>): Array<IntArray> {
        m = board.size
        n = board[0].size

        while (!findAndCrush(board)) {
            drop(board)
        }

        return board
    }

    private fun findAndCrush(board: Array<IntArray>): Boolean {
        var complete = true

        // Check vertically adjacent candies
        for (r in 1 until m - 1) {
            for (c in 0 until n) {
                if (board[r][c] == 0) continue
                if (kotlin.math.abs(board[r][c]) == kotlin.math.abs(board[r - 1][c]) &&
                    kotlin.math.abs(board[r][c]) == kotlin.math.abs(board[r + 1][c])) {
                    board[r][c] = -kotlin.math.abs(board[r][c])
                    board[r - 1][c] = -kotlin.math.abs(board[r - 1][c])
                    board[r + 1][c] = -kotlin.math.abs(board[r + 1][c])
                    complete = false
                }
            }
        }

        // Check horizontally adjacent candies
        for (r in 0 until m) {
            for (c in 1 until n - 1) {
                if (board[r][c] == 0) continue
                if (kotlin.math.abs(board[r][c]) == kotlin.math.abs(board[r][c - 1]) &&
                    kotlin.math.abs(board[r][c]) == kotlin.math.abs(board[r][c + 1])) {
                    board[r][c] = -kotlin.math.abs(board[r][c])
                    board[r][c - 1] = -kotlin.math.abs(board[r][c - 1])
                    board[r][c + 1] = -kotlin.math.abs(board[r][c + 1])
                    complete = false
                }
            }
        }

        // Set the value of each candy to be crushed as 0
        for (r in 0 until m) {
            for (c in 0 until n) {
                if (board[r][c] < 0) {
                    board[r][c] = 0
                }
            }
        }

        return complete
    }

    private fun drop(board: Array<IntArray>) {
        for (c in 0 until n) {
            var lowestZero = -1

            for (r in m - 1 downTo 0) {
                if (board[r][c] == 0) {
                    lowestZero = maxOf(lowestZero, r)
                } else if (lowestZero >= 0) {
                    val temp = board[r][c]
                    board[r][c] = board[lowestZero][c]
                    board[lowestZero][c] = temp
                    lowestZero--
                }
            }
        }
    }
}
```

```swift
class Solution {
    private var m = 0
    private var n = 0

    func candyCrush(_ board: [[Int]]) -> [[Int]] {
        var board = board
        m = board.count
        n = board[0].count

        while !findAndCrush(&board) {
            drop(&board)
        }

        return board
    }

    private func findAndCrush(_ board: inout [[Int]]) -> Bool {
        var complete = true

        // Check vertically adjacent candies
        for r in 1..<(m - 1) {
            for c in 0..<n {
                if board[r][c] == 0 { continue }
                if abs(board[r][c]) == abs(board[r - 1][c]) && abs(board[r][c]) == abs(board[r + 1][c]) {
                    board[r][c] = -abs(board[r][c])
                    board[r - 1][c] = -abs(board[r - 1][c])
                    board[r + 1][c] = -abs(board[r + 1][c])
                    complete = false
                }
            }
        }

        // Check horizontally adjacent candies
        for r in 0..<m {
            for c in 1..<(n - 1) {
                if board[r][c] == 0 { continue }
                if abs(board[r][c]) == abs(board[r][c - 1]) && abs(board[r][c]) == abs(board[r][c + 1]) {
                    board[r][c] = -abs(board[r][c])
                    board[r][c - 1] = -abs(board[r][c - 1])
                    board[r][c + 1] = -abs(board[r][c + 1])
                    complete = false
                }
            }
        }

        // Set the value of each candy to be crushed as 0
        for r in 0..<m {
            for c in 0..<n {
                if board[r][c] < 0 {
                    board[r][c] = 0
                }
            }
        }

        return complete
    }

    private func drop(_ board: inout [[Int]]) {
        for c in 0..<n {
            var lowestZero = -1

            for r in stride(from: m - 1, through: 0, by: -1) {
                if board[r][c] == 0 {
                    lowestZero = max(lowestZero, r)
                } else if lowestZero >= 0 {
                    let temp = board[r][c]
                    board[r][c] = board[lowestZero][c]
                    board[lowestZero][c] = temp
                    lowestZero -= 1
                }
            }
        }
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m^2 \cdot n^2)$
- Space complexity: $O(1)$ constant space

>  Where $m × n$ is the size of the grid `board`
