## 1. Indegree & Outdegree

### Intuition

The town judge is trusted by everyone else but trusts nobody. In graph terms, if we model trust relationships as directed edges, the judge has an indegree of `n - 1` (everyone trusts them) and an outdegree of 0 (they trust nobody). We simply count incoming and outgoing edges for each person and find the one matching these criteria.

### Algorithm

1. Create two arrays: `incoming` and `outgoing`, both of size `n + 1`.
2. For each trust pair `[a, b]`:
   - Increment `outgoing[a]` (person `a` trusts someone).
   - Increment `incoming[b]` (person `b` is trusted by someone).
3. Iterate through persons `1` to `n`:
   - If `outgoing[i] == 0` and `incoming[i] == n - 1`, return `i`.
4. Return `-1` if no judge found.

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

### Intuition

We can combine the two arrays into one by using the difference: `delta[i] = incoming[i] - outgoing[i]`. The judge has `n - 1` people trusting them and trusts 0 people, so their delta equals `(n - 1) - 0 = n - 1`. Anyone who trusts at least one person will have a delta less than `n - 1`.

### Algorithm

1. Create a single array `delta` of size `n + 1`.
2. For each trust pair `[a, b]`:
   - Decrement `delta[a]` (person `a` trusts someone, reducing their score).
   - Increment `delta[b]` (person `b` is trusted, increasing their score).
3. Iterate through persons `1` to `n`:
   - If `delta[i] == n - 1`, return `i`.
4. Return `-1` if no judge found.

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

---

## Common Pitfalls

### Only Checking Indegree Without Outdegree

The town judge must be trusted by everyone (indegree = n-1) AND trust nobody (outdegree = 0). A common mistake is only checking that someone is trusted by n-1 people, which would incorrectly identify a person who also trusts others.

### Off-by-One Errors with 1-Indexed People

People are labeled from 1 to n, not 0 to n-1. When using arrays indexed from 0, forgetting to iterate from 1 to n (inclusive) or incorrectly accessing array indices can cause out-of-bounds errors or missed candidates.

