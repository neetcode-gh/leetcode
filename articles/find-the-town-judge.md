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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(V + E)$
- Space complexity: $O(V)$

> Where $V$ is the number of vertices and $E$ is the number of edges.
