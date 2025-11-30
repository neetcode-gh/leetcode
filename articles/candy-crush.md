## 1. Separate Steps: Find, Crush, Drop

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m^2 \cdot n^2)$
- Space complexity: $O(m \cdot n)$

>  Where $m × n$ is the size of the grid `board`

---

## 2. In-place Modification

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m^2 \cdot n^2)$
- Space complexity: $O(1)$ constant space

>  Where $m × n$ is the size of the grid `board`
