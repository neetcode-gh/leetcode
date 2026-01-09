## 1. Indegree & Outdegree

::tabs-start

```python
class Solution:
    def findJudge(self, n: int, trust: List[List[int]]) -> int:
        incoming = defaultdict(int)
        outgoing = defaultdict(int)

        for src, dst in trust:
            outgoing[src] += 1
            incoming[dst] += 1

        for i in range(1, n + 1):
            if outgoing[i] == 0 and incoming[i] == n - 1:
                return i

        return -1
```

```java
public class Solution {
    public int findJudge(int n, int[][] trust) {
        int[] incoming = new int[n + 1];
        int[] outgoing = new int[n + 1];

        for (int[] t : trust) {
            outgoing[t[0]]++;
            incoming[t[1]]++;
        }

        for (int i = 1; i <= n; i++) {
            if (outgoing[i] == 0 && incoming[i] == n - 1) {
                return i;
            }
        }

        return -1;
    }
}
```

```cpp
class Solution {
public:
    int findJudge(int n, vector<vector<int>>& trust) {
        vector<int> incoming(n + 1, 0), outgoing(n + 1, 0);

        for (auto& t : trust) {
            outgoing[t[0]]++;
            incoming[t[1]]++;
        }

        for (int i = 1; i <= n; i++) {
            if (outgoing[i] == 0 && incoming[i] == n - 1)
                return i;
        }

        return -1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @param {number[][]} trust
     * @return {number}
     */
    findJudge(n, trust) {
        let incoming = new Array(n + 1).fill(0);
        let outgoing = new Array(n + 1).fill(0);

        for (let [src, dst] of trust) {
            outgoing[src]++;
            incoming[dst]++;
        }

        for (let i = 1; i <= n; i++) {
            if (outgoing[i] === 0 && incoming[i] === n - 1) {
                return i;
            }
        }

        return -1;
    }
}
```

```csharp
public class Solution {
    public int FindJudge(int n, int[][] trust) {
        int[] incoming = new int[n + 1];
        int[] outgoing = new int[n + 1];

        foreach (int[] t in trust) {
            int a = t[0];
            int b = t[1];
            outgoing[a]++;
            incoming[b]++;
        }

        for (int i = 1; i <= n; i++) {
            if (outgoing[i] == 0 && incoming[i] == n - 1) {
                return i;
            }
        }

        return -1;
    }
}
```

```go
func findJudge(n int, trust [][]int) int {
    incoming := make([]int, n+1)
    outgoing := make([]int, n+1)

    for _, t := range trust {
        outgoing[t[0]]++
        incoming[t[1]]++
    }

    for i := 1; i <= n; i++ {
        if outgoing[i] == 0 && incoming[i] == n-1 {
            return i
        }
    }

    return -1
}
```

```kotlin
class Solution {
    fun findJudge(n: Int, trust: Array<IntArray>): Int {
        val incoming = IntArray(n + 1)
        val outgoing = IntArray(n + 1)

        for (t in trust) {
            outgoing[t[0]]++
            incoming[t[1]]++
        }

        for (i in 1..n) {
            if (outgoing[i] == 0 && incoming[i] == n - 1) {
                return i
            }
        }

        return -1
    }
}
```

```swift
class Solution {
    func findJudge(_ n: Int, _ trust: [[Int]]) -> Int {
        var incoming = [Int](repeating: 0, count: n + 1)
        var outgoing = [Int](repeating: 0, count: n + 1)

        for t in trust {
            outgoing[t[0]] += 1
            incoming[t[1]] += 1
        }

        for i in 1...n {
            if outgoing[i] == 0 && incoming[i] == n - 1 {
                return i
            }
        }

        return -1
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(V + E)$
- Space complexity: $O(V)$

> Where $V$ is the number of vertices and $E$ is the number of edges.

---

## 2. Indegree & Outdegree (Optimal)

::tabs-start

```python
class Solution:
    def findJudge(self, n: int, trust: List[List[int]]) -> int:
        delta = defaultdict(int)

        for src, dst in trust:
            delta[src] -= 1
            delta[dst] += 1

        for i in range(1, n + 1):
            if delta[i] == n - 1:
                return i

        return -1
```

```java
public class Solution {
    public int findJudge(int n, int[][] trust) {
        int[] delta = new int[n + 1];

        for (int[] t : trust) {
            delta[t[0]] -= 1;
            delta[t[1]] += 1;
        }

        for (int i = 1; i <= n; i++) {
            if (delta[i] == n - 1) {
                return i;
            }
        }

        return -1;
    }
}
```

```cpp
class Solution {
public:
    int findJudge(int n, vector<vector<int>>& trust) {
        vector<int> delta(n + 1, 0);

        for (auto& t : trust) {
            delta[t[0]]--;
            delta[t[1]]++;
        }

        for (int i = 1; i <= n; i++) {
            if (delta[i] == n - 1) {
                return i;
            }
        }

        return -1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @param {number[][]} trust
     * @return {number}
     */
    findJudge(n, trust) {
        let delta = new Array(n + 1).fill(0);

        for (let [src, dst] of trust) {
            delta[src]--;
            delta[dst]++;
        }

        for (let i = 1; i <= n; i++) {
            if (delta[i] === n - 1) {
                return i;
            }
        }

        return -1;
    }
}
```

```csharp
public class Solution {
    public int FindJudge(int n, int[][] trust) {
        int[] delta = new int[n + 1];

        foreach (int[] t in trust) {
            int a = t[0];
            int b = t[1];
            delta[a]--;
            delta[b]++;
        }

        for (int i = 1; i <= n; i++) {
            if (delta[i] == n - 1) {
                return i;
            }
        }
        return -1;
    }
}
```

```go
func findJudge(n int, trust [][]int) int {
    delta := make([]int, n+1)

    for _, t := range trust {
        delta[t[0]]--
        delta[t[1]]++
    }

    for i := 1; i <= n; i++ {
        if delta[i] == n-1 {
            return i
        }
    }

    return -1
}
```

```kotlin
class Solution {
    fun findJudge(n: Int, trust: Array<IntArray>): Int {
        val delta = IntArray(n + 1)

        for (t in trust) {
            delta[t[0]]--
            delta[t[1]]++
        }

        for (i in 1..n) {
            if (delta[i] == n - 1) {
                return i
            }
        }

        return -1
    }
}
```

```swift
class Solution {
    func findJudge(_ n: Int, _ trust: [[Int]]) -> Int {
        var delta = [Int](repeating: 0, count: n + 1)

        for t in trust {
            delta[t[0]] -= 1
            delta[t[1]] += 1
        }

        for i in 1...n {
            if delta[i] == n - 1 {
                return i
            }
        }

        return -1
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(V + E)$
- Space complexity: $O(V)$

> Where $V$ is the number of vertices and $E$ is the number of edges.
