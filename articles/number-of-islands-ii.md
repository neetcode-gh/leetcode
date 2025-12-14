## 1. Union Find

::tabs-start

```python
class UnionFind:
    def __init__(self, size):
        self.parent = [-1] * size
        self.rank = [0] * size
        self.count = 0
    
    def add_land(self, x):
        if self.parent[x] >= 0:
            return
        self.parent[x] = x
        self.count += 1
    
    def is_land(self, x):
        if self.parent[x] >= 0:
            return True
        else:
            return False
    
    def number_of_islands(self):
        return self.count
    
    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]
    
    def union(self, x, y):
        xset = self.find(x)
        yset = self.find(y)
        
        if xset == yset:
            return
        elif self.rank[xset] < self.rank[yset]:
            self.parent[xset] = yset
        elif self.rank[xset] > self.rank[yset]:
            self.parent[yset] = xset
        else:
            self.parent[yset] = xset
            self.rank[xset] += 1
        
        self.count -= 1


class Solution:
    def numIslands2(self, m: int, n: int, positions: List[List[int]]) -> List[int]:
        x = [-1, 1, 0, 0]
        y = [0, 0, -1, 1]
        dsu = UnionFind(m * n)
        answer = []
        
        for position in positions:
            land_position = position[0] * n + position[1]
            dsu.add_land(land_position)
            
            for i in range(4):
                neighbor_x = position[0] + x[i]
                neighbor_y = position[1] + y[i]
                neighbor_position = neighbor_x * n + neighbor_y
                
                # If neighborX and neighborY correspond to a point in the grid and there is a
                # land at that point, then merge it with the current land.
                if neighbor_x >= 0 and neighbor_x < m and neighbor_y >= 0 and neighbor_y < n and dsu.is_land(neighbor_position):
                    dsu.union(land_position, neighbor_position)
            
            answer.append(dsu.number_of_islands())
        
        return answer
```

```java
class UnionFind {
    int[] parent;
    int[] rank;
    int count;

    public UnionFind(int size) {
        parent = new int[size];
        rank = new int[size];
        for (int i = 0; i < size; i++)
            parent[i] = -1;
        count = 0;
    }

    public void addLand(int x) {
        if (parent[x] >= 0)
            return;
        parent[x] = x;
        count++;
    }

    public boolean isLand(int x) {
        if (parent[x] >= 0) {
            return true;
        } else {
            return false;
        }
    }

    int numberOfIslands() {
        return count;
    }

    public int find(int x) {
        if (parent[x] != x)
            parent[x] = find(parent[x]);
        return parent[x];
    }

    public void union(int x, int y) {
        int xset = find(x), yset = find(y);
        if (xset == yset) {
            return;
        } else if (rank[xset] < rank[yset]) {
            parent[xset] = yset;
        } else if (rank[xset] > rank[yset]) {
            parent[yset] = xset;
        } else {
            parent[yset] = xset;
            rank[xset]++;
        }
        count--;
    }
}

class Solution {
    public List<Integer> numIslands2(int m, int n, int[][] positions) {
        int x[] = { -1, 1, 0, 0 };
        int y[] = { 0, 0, -1, 1 };
        UnionFind dsu = new UnionFind(m * n);
        List<Integer> answer = new ArrayList<>();

        for (int[] position : positions) {
            int landPosition = position[0] * n + position[1];
            dsu.addLand(landPosition);

            for (int i = 0; i < 4; i++) {
                int neighborX = position[0] + x[i];
                int neighborY = position[1] + y[i];
                int neighborPosition = neighborX * n + neighborY;
                // If neighborX and neighborY correspond to a point in the grid and there is a
                // land at that point, then merge it with the current land.
                if (neighborX >= 0 && neighborX < m && neighborY >= 0 && neighborY < n &&
                        dsu.isLand(neighborPosition)) {
                    dsu.union(landPosition, neighborPosition);
                }
            }
            
            answer.add(dsu.numberOfIslands());
        }
        return answer;
    }
}
```

```cpp
class UnionFind {
private:
    vector<int> parent, rank;
    int count;

public:
    UnionFind(int size) {
        parent.resize(size, -1);
        rank.resize(size, 0);
        count = 0;
    }

    void addLand(int x) {
        if (parent[x] >= 0) return;
        parent[x] = x;
        count++;
    }

    bool isLand(int x) {
        if (parent[x] >= 0) {
            return true;
        } else {
            return false;
        }
    }

    int numberOfIslands() { return count; }

    int find(int x) {
        if (parent[x] != x) {
            parent[x] = find(parent[x]);
        }
        return parent[x];
    }

    void union_set(int x, int y) {
        int xset = find(x), yset = find(y);
        if (xset == yset) {
            return;
        } else if (rank[xset] < rank[yset]) {
            parent[xset] = yset;
        } else if (rank[xset] > rank[yset]) {
            parent[yset] = xset;
        } else {
            parent[yset] = xset;
            rank[xset]++;
        }
        count--;
    }
};

class Solution {
public:
    vector<int> numIslands2(int m, int n, vector<vector<int>>& positions) {
        int x[] = {-1, 1, 0, 0};
        int y[] = {0, 0, -1, 1};
        UnionFind dsu(m * n);
        vector<int> answer;

        for (auto& position : positions) {
            int landPosition = position[0] * n + position[1];
            dsu.addLand(landPosition);

            for (int i = 0; i < 4; i++) {
                int neighborX = position[0] + x[i];
                int neighborY = position[1] + y[i];
                int neighborPosition = neighborX * n + neighborY;
                // If neighborX and neighborY correspond to a point in the grid and there is a land
                // at that point, then merge it with the current land.
                if (neighborX >= 0 && neighborX < m && neighborY >= 0 && neighborY < n &&
                    dsu.isLand(neighborPosition)) {
                    dsu.union_set(landPosition, neighborPosition);
                }
            }
            answer.push_back(dsu.numberOfIslands());
        }
        return answer;
    }
};
```

```javascript
class UnionFind {
    /**
     * @param {number} size
     */
    constructor(size) {
        this.parent = new Array(size).fill(-1);
        this.rank = new Array(size).fill(0);
        this.count = 0;
    }
    
    /**
     * @param {number} x
     * @return {void}
     */
    addLand(x) {
        if (this.parent[x] >= 0) return;
        this.parent[x] = x;
        this.count++;
    }
    
    /**
     * @param {number} x
     * @return {boolean}
     */
    isLand(x) {
        if (this.parent[x] >= 0) {
            return true;
        } else {
            return false;
        }
    }
    
    /**
     * @return {number}
     */
    numberOfIslands() {
        return this.count;
    }
    
    /**
     * @param {number} x
     * @return {number}
     */
    find(x) {
        if (this.parent[x] !== x)
            this.parent[x] = this.find(this.parent[x]);
        return this.parent[x];
    }
    
    /**
     * @param {number} x
     * @param {number} y
     * @return {void}
     */
    union(x, y) {
        let xset = this.find(x);
        let yset = this.find(y);
        
        if (xset === yset) {
            return;
        } else if (this.rank[xset] < this.rank[yset]) {
            this.parent[xset] = yset;
        } else if (this.rank[xset] > this.rank[yset]) {
            this.parent[yset] = xset;
        } else {
            this.parent[yset] = xset;
            this.rank[xset]++;
        }
        
        this.count--;
    }
}

class Solution {
    /**
     * @param {number} m
     * @param {number} n
     * @param {number[][]} positions
     * @return {number[]}
     */
    numIslands2(m, n, positions) {
        let x = [-1, 1, 0, 0];
        let y = [0, 0, -1, 1];
        let dsu = new UnionFind(m * n);
        let answer = [];
        
        for (let position of positions) {
            let landPosition = position[0] * n + position[1];
            dsu.addLand(landPosition);
            
            for (let i = 0; i < 4; i++) {
                let neighborX = position[0] + x[i];
                let neighborY = position[1] + y[i];
                let neighborPosition = neighborX * n + neighborY;
                
                // If neighborX and neighborY correspond to a point in the grid and there is a
                // land at that point, then merge it with the current land.
                if (neighborX >= 0 && neighborX < m && neighborY >= 0 && neighborY < n && dsu.isLand(neighborPosition)) {
                    dsu.union(landPosition, neighborPosition);
                }
            }
            
            answer.push(dsu.numberOfIslands());
        }
        
        return answer;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m \cdot n + l)$
- Space complexity: $O(m \cdot n)$

>  Where $m$ and $n$ are the number of rows and columns in the given grid, and $l$ is the size of `positions`.
