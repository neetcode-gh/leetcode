## 1. Hash Set

### Intuition

We start at the origin and follow the path character by character. At each step, we move in the indicated direction. The path crosses itself if we visit a position we've been to before. A hash set provides O(1) lookups to check if a coordinate has been visited.

### Algorithm

1. Initialize a set `visit` and add the starting position `(0, 0)`.
2. Initialize coordinates `x = 0`, `y = 0`.
3. For each character in the path:
   - Update `x` or `y` based on the direction (N, S, E, W).
   - If the new position exists in `visit`, return `true`.
   - Otherwise, add the new position to `visit`.
4. If we finish the path without revisiting any position, return `false`.

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

```csharp
public class Solution {
    public bool IsPathCrossing(string path) {
        var visit = new HashSet<string>();
        int x = 0, y = 0;
        visit.Add($"{x},{y}");

        foreach (char c in path) {
            if (c == 'N') y++;
            else if (c == 'S') y--;
            else if (c == 'E') x++;
            else if (c == 'W') x--;

            string pos = $"{x},{y}";
            if (visit.Contains(pos)) return true;
            visit.Add(pos);
        }

        return false;
    }
}
```

```go
func isPathCrossing(path string) bool {
    visit := make(map[string]bool)
    x, y := 0, 0
    visit[fmt.Sprintf("%d,%d", x, y)] = true

    for _, c := range path {
        if c == 'N' {
            y++
        } else if c == 'S' {
            y--
        } else if c == 'E' {
            x++
        } else if c == 'W' {
            x--
        }

        pos := fmt.Sprintf("%d,%d", x, y)
        if visit[pos] {
            return true
        }
        visit[pos] = true
    }

    return false
}
```

```kotlin
class Solution {
    fun isPathCrossing(path: String): Boolean {
        val visit = HashSet<String>()
        var x = 0
        var y = 0
        visit.add("$x,$y")

        for (c in path) {
            when (c) {
                'N' -> y++
                'S' -> y--
                'E' -> x++
                'W' -> x--
            }

            val pos = "$x,$y"
            if (visit.contains(pos)) return true
            visit.add(pos)
        }

        return false
    }
}
```

```swift
class Solution {
    func isPathCrossing(_ path: String) -> Bool {
        var visit = Set<String>()
        var x = 0, y = 0
        visit.insert("\(x),\(y)")

        for c in path {
            if c == "N" { y += 1 }
            else if c == "S" { y -= 1 }
            else if c == "E" { x += 1 }
            else if c == "W" { x -= 1 }

            let pos = "\(x),\(y)"
            if visit.contains(pos) { return true }
            visit.insert(pos)
        }

        return false
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 2. Hash Set (Custom Hash)

### Intuition

Instead of storing coordinates as strings or tuples, we can encode them into a single integer. By shifting one coordinate (e.g., `x << 32`) and adding the other, we create a unique hash for each position. This can improve performance by avoiding string concatenation overhead.

### Algorithm

1. Define a hash function: `hash(x, y) = (x << 32) + y`.
2. Initialize a set and add `hash(0, 0)`.
3. Track position with `x = 0`, `y = 0`.
4. For each character in the path:
   - Update coordinates based on direction.
   - Compute the `hash` of the new position.
   - If it exists in the set, return `true`.
   - Otherwise, add the `hash` to the set.
5. Return `false` if no crossing is found.

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

```csharp
public class Solution {
    public bool IsPathCrossing(string path) {
        var visit = new HashSet<long>();
        int x = 0, y = 0;
        visit.Add(Hash(x, y));

        foreach (char c in path) {
            if (c == 'N') y++;
            else if (c == 'S') y--;
            else if (c == 'E') x++;
            else if (c == 'W') x--;

            long pos = Hash(x, y);
            if (visit.Contains(pos)) return true;
            visit.Add(pos);
        }

        return false;
    }

    private long Hash(long x, long y) {
        return (x << 32) + y;
    }
}
```

```go
func isPathCrossing(path string) bool {
    visit := make(map[int64]bool)
    x, y := int64(0), int64(0)
    visit[hash(x, y)] = true

    for _, c := range path {
        if c == 'N' {
            y++
        } else if c == 'S' {
            y--
        } else if c == 'E' {
            x++
        } else if c == 'W' {
            x--
        }

        pos := hash(x, y)
        if visit[pos] {
            return true
        }
        visit[pos] = true
    }

    return false
}

func hash(x, y int64) int64 {
    return (x << 32) + y
}
```

```kotlin
class Solution {
    fun isPathCrossing(path: String): Boolean {
        val visit = HashSet<Long>()
        var x = 0L
        var y = 0L
        visit.add(hash(x, y))

        for (c in path) {
            when (c) {
                'N' -> y++
                'S' -> y--
                'E' -> x++
                'W' -> x--
            }

            val pos = hash(x, y)
            if (visit.contains(pos)) return true
            visit.add(pos)
        }

        return false
    }

    private fun hash(x: Long, y: Long): Long {
        return (x shl 32) + y
    }
}
```

```swift
class Solution {
    func isPathCrossing(_ path: String) -> Bool {
        var visit = Set<Int64>()
        var x: Int64 = 0, y: Int64 = 0
        visit.insert(hash(x, y))

        for c in path {
            if c == "N" { y += 1 }
            else if c == "S" { y -= 1 }
            else if c == "E" { x += 1 }
            else if c == "W" { x -= 1 }

            let pos = hash(x, y)
            if visit.contains(pos) { return true }
            visit.insert(pos)
        }

        return false
    }

    private func hash(_ x: Int64, _ y: Int64) -> Int64 {
        return (x << 32) + y
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## Common Pitfalls

### Forgetting to Add the Starting Position

A common mistake is forgetting to add the origin `(0, 0)` to the visited set before processing the path. The path can cross the starting point, so it must be tracked from the beginning. If you only add positions after moving, you will miss cases where the path returns to the origin.

### Incorrect Coordinate Representation

When storing coordinates in a hash set, using improper representations can cause collisions or misses. For example, concatenating coordinates as `x + y` instead of `x + "," + y` can produce identical strings for different coordinate pairs (e.g., `(1, 23)` and `(12, 3)` both become `"123"`). Always use a delimiter or tuple representation to ensure uniqueness.
