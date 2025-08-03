## 1. Hash Set

::tabs-start

```python
class Solution:
    def isPathCrossing(self, path: str) -> bool:
        dir = {
            'N': [0, 1],
            'S': [0, -1],
            'E': [1, 0],
            'W': [-1, 0]
        }

        visit = set()
        x, y = 0, 0

        for c in path:
            visit.add((x, y))
            dx, dy = dir[c]
            x, y = x + dx, y + dy
            if (x, y) in visit:
                return True

        return False
```

```java
public class Solution {
    public boolean isPathCrossing(String path) {
        Set<String> visit = new HashSet<>();
        int x = 0, y = 0;
        visit.add(x + "," + y);

        for (char c : path.toCharArray()) {
            if (c == 'N') y++;
            else if (c == 'S') y--;
            else if (c == 'E') x++;
            else if (c == 'W') x--;

            String pos = x + "," + y;
            if (visit.contains(pos)) return true;
            visit.add(pos);
        }

        return false;
    }
}
```

```cpp
class Solution {
public:
    bool isPathCrossing(string path) {
        unordered_set<string> visit;
        int x = 0, y = 0;
        visit.insert(to_string(x) + "," + to_string(y));

        for (char c : path) {
            if (c == 'N') y++;
            else if (c == 'S') y--;
            else if (c == 'E') x++;
            else if (c == 'W') x--;

            string pos = to_string(x) + "," + to_string(y);
            if (visit.count(pos)) return true;
            visit.insert(pos);
        }

        return false;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} path
     * @return {boolean}
     */
    isPathCrossing(path) {
        const visit = new Set();
        let x = 0,
            y = 0;
        visit.add(`${x},${y}`);

        for (const c of path) {
            if (c === 'N') y++;
            else if (c === 'S') y--;
            else if (c === 'E') x++;
            else if (c === 'W') x--;

            const pos = `${x},${y}`;
            if (visit.has(pos)) return true;
            visit.add(pos);
        }

        return false;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 2. Hash Set (Custom Hash)

::tabs-start

```python
class Solution:
    def isPathCrossing(self, path: str) -> bool:
        visit = set()
        x, y = 0, 0
        visit.add(self.hash(x, y))

        for c in path:
            if c == 'N':
                y += 1
            elif c == 'S':
                y -= 1
            elif c == 'E':
                x += 1
            elif c == 'W':
                x -= 1

            pos = self.hash(x, y)
            if pos in visit:
                return True
            visit.add(pos)

        return False

    def hash(self, x: int, y: int) -> int:
        return (x << 32) + y
```

```java
public class Solution {
    public boolean isPathCrossing(String path) {
        Set<Long> visit = new HashSet<>();
        int x = 0, y = 0;
        visit.add(hash(x, y));

        for (char c : path.toCharArray()) {
            if (c == 'N') y++;
            else if (c == 'S') y--;
            else if (c == 'E') x++;
            else if (c == 'W') x--;

            long pos = hash(x, y);
            if (visit.contains(pos)) return true;
            visit.add(pos);
        }

        return false;
    }

    private long hash(long x, long y) {
        return (x << 32) + y;
    }
}
```

```cpp
class Solution {
public:
    bool isPathCrossing(string path) {
        unordered_set<pair<int, int>, pair_hash> visit;
        int x = 0, y = 0;
        visit.insert({x, y});

        for (char c : path) {
            if (c == 'N') y++;
            else if (c == 'S') y--;
            else if (c == 'E') x++;
            else if (c == 'W') x--;

            if (visit.count({x, y})) return true;
            visit.insert({x, y});
        }

        return false;
    }

private:
    struct pair_hash {
        template <class T1, class T2>
        size_t operator()(const pair<T1, T2>& p) const {
            return (hash<T1>()(p.first) << 32) + hash<T2>()(p.second);
        }
    };
};
```

```javascript
class Solution {
    /**
     * @param {string} path
     * @return {boolean}
     */
    isPathCrossing(path) {
        const visit = new Set();
        let x = 0,
            y = 0;
        visit.add(this.hash(x, y));

        for (const c of path) {
            if (c === 'N') y++;
            else if (c === 'S') y--;
            else if (c === 'E') x++;
            else if (c === 'W') x--;

            const pos = this.hash(x, y);
            if (visit.has(pos)) return true;
            visit.add(pos);
        }

        return false;
    }

    /**
     * @param {number} x
     * @param {number} x
     * @return {number}
     */
    hash(x, y) {
        return (x << 16) + y;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$
