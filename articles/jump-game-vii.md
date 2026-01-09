## 1. Brute Force (Memoization)

### Intuition

From each position, we can jump to any position within the range `[i + minJump, i + maxJump]` if that position contains `'0'`. We use recursion with memoization to explore all valid jumps. Starting from index `0`, we try every reachable position and recursively check if we can reach the end. Memoization prevents recalculating the same positions.

### Algorithm

1. Create a memoization array initialized to `null`/unknown.
2. Define a recursive function `dfs(i)`:
   - If already computed, return the cached result.
   - Mark the current position as unreachable initially.
   - Try all positions `j` in range `[i + minJump, i + maxJump]`.
   - If `s[j] == '0'` and `dfs(j)` returns `true`, mark current as reachable.
3. Return the result for index `0`.

::tabs-start

```python
class Solution:
    def canReach(self, s: str, minJump: int, maxJump: int) -> bool:
        n = len(s)
        dp = [None] * n
        dp[n - 1] = True

        def dfs(i):
            if dp[i] is not None:
                return dp[i]

            dp[i] = False
            for j in range(i + minJump, min(n, i + maxJump + 1)):
                if s[j] == '0' and dfs(j):
                    dp[i] = True
                    break

            return dp[i]

        if s[-1] == '1':
            return False
        return dfs(0)
```

```java
public class Solution {
    private Boolean[] dp;
    private int n;

    public boolean canReach(String s, int minJump, int maxJump) {
        this.n = s.length();
        this.dp = new Boolean[n];
        dp[n - 1] = true;

        if (s.charAt(n - 1) == '1') {
            return false;
        }

        return dfs(0, s, minJump, maxJump);
    }

    private boolean dfs(int i, String s, int minJump, int maxJump) {
        if (dp[i] != null) {
            return dp[i];
        }

        dp[i] = false;
        for (int j = i + minJump; j <= Math.min(n - 1, i + maxJump); j++) {
            if (s.charAt(j) == '0' && dfs(j, s, minJump, maxJump)) {
                dp[i] = true;
                break;
            }
        }
        return dp[i];
    }
}
```

```cpp
class Solution {
public:
    int n;
    vector<int> dp;

    bool canReach(string s, int minJump, int maxJump) {
        this->n = s.size();
        dp.resize(n, -1);
        dp[n - 1] = 1;

        if (s[n - 1] == '1') {
            return false;
        }

        return dfs(0, s, minJump, maxJump);
    }

private:
    bool dfs(int i, string& s, int& minJump, int& maxJump) {
        if (dp[i] != -1) {
            return dp[i];
        }

        dp[i] = 0;
        for (int j = i + minJump; j <= min(n - 1, i + maxJump); ++j) {
            if (s[j] == '0' && dfs(j, s, minJump, maxJump)) {
                dp[i] = 1;
                break;
            }
        }
        return dp[i];
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @param {number} minJump
     * @param {number} maxJump
     * @return {boolean}
     */
    canReach(s, minJump, maxJump) {
        const n = s.length;
        const dp = new Array(n).fill(null);
        dp[n - 1] = true;

        const dfs = (i) => {
            if (dp[i] !== null) {
                return dp[i];
            }

            dp[i] = false;
            for (let j = i + minJump; j <= Math.min(n - 1, i + maxJump); j++) {
                if (s[j] === '0' && dfs(j)) {
                    dp[i] = true;
                    break;
                }
            }
            return dp[i];
        };

        if (s[n - 1] === '1') {
            return false;
        }
        return dfs(0);
    }
}
```

```csharp
public class Solution {
    public bool CanReach(string s, int minJump, int maxJump) {
        int n = s.Length;
        bool?[] dp = new bool?[n];
        dp[n - 1] = true;

        bool Dfs(int i) {
            if (dp[i].HasValue) {
                return dp[i].Value;
            }

            dp[i] = false;
            for (int j = i + minJump; j <= Math.Min(n - 1, i + maxJump); j++) {
                if (s[j] == '0' && Dfs(j)) {
                    dp[i] = true;
                    break;
                }
            }

            return dp[i].Value;
        }

        if (s[n - 1] == '1') {
            return false;
        }

        return Dfs(0);
    }
}
```

```go
func canReach(s string, minJump int, maxJump int) bool {
    n := len(s)
    dp := make([]*bool, n)
    t := true
    dp[n-1] = &t

    var dfs func(i int) bool
    dfs = func(i int) bool {
        if dp[i] != nil {
            return *dp[i]
        }

        f := false
        dp[i] = &f
        for j := i + minJump; j <= min(n-1, i+maxJump); j++ {
            if s[j] == '0' && dfs(j) {
                t := true
                dp[i] = &t
                break
            }
        }
        return *dp[i]
    }

    if s[n-1] == '1' {
        return false
    }
    return dfs(0)
}

func min(a, b int) int {
    if a < b {
        return a
    }
    return b
}
```

```kotlin
class Solution {
    fun canReach(s: String, minJump: Int, maxJump: Int): Boolean {
        val n = s.length
        val dp = arrayOfNulls<Boolean>(n)
        dp[n - 1] = true

        fun dfs(i: Int): Boolean {
            dp[i]?.let { return it }

            dp[i] = false
            for (j in i + minJump..minOf(n - 1, i + maxJump)) {
                if (s[j] == '0' && dfs(j)) {
                    dp[i] = true
                    break
                }
            }
            return dp[i]!!
        }

        if (s[n - 1] == '1') {
            return false
        }
        return dfs(0)
    }
}
```

```swift
class Solution {
    func canReach(_ s: String, _ minJump: Int, _ maxJump: Int) -> Bool {
        let sArr = Array(s)
        let n = sArr.count
        var dp = [Bool?](repeating: nil, count: n)
        dp[n - 1] = true

        func dfs(_ i: Int) -> Bool {
            if let val = dp[i] {
                return val
            }

            dp[i] = false
            for j in (i + minJump)...min(n - 1, i + maxJump) {
                if sArr[j] == "0" && dfs(j) {
                    dp[i] = true
                    break
                }
            }
            return dp[i]!
        }

        if sArr[n - 1] == "1" {
            return false
        }
        return dfs(0)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * m)$
- Space complexity: $O(n)$

> Where $n$ is the length of the string $s$ and $m$ is the given range of the jump $(maxJump - minJump + 1)$.

---

## 2. Breadth First Search

### Intuition

BFS naturally explores positions level by level, where each level represents positions reachable in one jump. The key optimization is tracking the farthest index we've already processed. When processing position `i`, we only need to check new positions starting from `max(i + minJump, farthest + 1)` to avoid revisiting positions already added to the queue.

### Algorithm

1. Initialize a queue with position `0` and track `farthest = 0`.
2. While the queue is not empty:
   - Dequeue position `i`.
   - Compute `start = max(i + minJump, farthest + 1)`.
   - For each `j` from `start` to `min(i + maxJump, n - 1)`:
     - If `s[j] == '0'`, enqueue `j`. If `j` is the last index, return `true`.
   - Update `farthest = i + maxJump`.
3. Return `false` if the queue empties without reaching the end.

::tabs-start

```python
class Solution:
    def canReach(self, s: str, minJump: int, maxJump: int) -> bool:
        q = deque([0])
        farthest = 0

        while q:
            i = q.popleft()
            start = max(i + minJump, farthest + 1)
            for j in range(start, min(i + maxJump + 1, len(s))):
                if s[j] == "0":
                    q.append(j)
                    if j == len(s) - 1:
                        return True
            farthest = i + maxJump

        return False
```

```java
public class Solution {
    public boolean canReach(String s, int minJump, int maxJump) {
        Queue<Integer> q = new LinkedList<>();
        q.add(0);
        int farthest = 0;
        int n = s.length();

        while (!q.isEmpty()) {
            int i = q.poll();
            int start = Math.max(i + minJump, farthest + 1);

            for (int j = start; j < Math.min(i + maxJump + 1, n); j++) {
                if (s.charAt(j) == '0') {
                    q.add(j);
                    if (j == n - 1) {
                        return true;
                    }
                }
            }
            farthest = i + maxJump;
        }

        return false;
    }
}
```

```cpp
class Solution {
public:
    bool canReach(string s, int minJump, int maxJump) {
        queue<int> q;
        q.push(0);
        int farthest = 0;
        int n = s.size();

        while (!q.empty()) {
            int i = q.front();
            q.pop();
            int start = max(i + minJump, farthest + 1);

            for (int j = start; j < min(i + maxJump + 1, n); ++j) {
                if (s[j] == '0') {
                    q.push(j);
                    if (j == n - 1) {
                        return true;
                    }
                }
            }
            farthest = i + maxJump;
        }

        return false;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @param {number} minJump
     * @param {number} maxJump
     * @return {boolean}
     */
    canReach(s, minJump, maxJump) {
        const q = new Queue();
        q.push(0);
        let farthest = 0;

        while (!q.isEmpty()) {
            const i = q.pop();
            const start = Math.max(i + minJump, farthest + 1);

            for (let j = start; j < Math.min(i + maxJump + 1, s.length); j++) {
                if (s[j] === '0') {
                    q.push(j);
                    if (j === s.length - 1) {
                        return true;
                    }
                }
            }
            farthest = i + maxJump;
        }

        return false;
    }
}
```

```csharp
public class Solution {
    public bool CanReach(string s, int minJump, int maxJump) {
        int n = s.Length;
        Queue<int> q = new Queue<int>();
        q.Enqueue(0);
        int farthest = 0;

        while (q.Count > 0) {
            int i = q.Dequeue();
            int start = Math.Max(i + minJump, farthest + 1);
            for (int j = start; j <= Math.Min(i + maxJump, n - 1); j++) {
                if (s[j] == '0') {
                    if (j == n - 1) return true;
                    q.Enqueue(j);
                }
            }
            farthest = i + maxJump;
        }

        return false;
    }
}
```

```go
func canReach(s string, minJump int, maxJump int) bool {
    n := len(s)
    q := []int{0}
    farthest := 0

    for len(q) > 0 {
        i := q[0]
        q = q[1:]
        start := max(i+minJump, farthest+1)
        for j := start; j < min(i+maxJump+1, n); j++ {
            if s[j] == '0' {
                if j == n-1 {
                    return true
                }
                q = append(q, j)
            }
        }
        farthest = i + maxJump
    }

    return false
}

func max(a, b int) int {
    if a > b {
        return a
    }
    return b
}

func min(a, b int) int {
    if a < b {
        return a
    }
    return b
}
```

```kotlin
class Solution {
    fun canReach(s: String, minJump: Int, maxJump: Int): Boolean {
        val n = s.length
        val q: java.util.Queue<Int> = java.util.LinkedList()
        q.add(0)
        var farthest = 0

        while (q.isNotEmpty()) {
            val i = q.poll()
            val start = maxOf(i + minJump, farthest + 1)
            for (j in start..minOf(i + maxJump, n - 1)) {
                if (s[j] == '0') {
                    if (j == n - 1) return true
                    q.add(j)
                }
            }
            farthest = i + maxJump
        }

        return false
    }
}
```

```swift
class Solution {
    func canReach(_ s: String, _ minJump: Int, _ maxJump: Int) -> Bool {
        let sArr = Array(s)
        let n = sArr.count
        var q = [0]
        var farthest = 0

        while !q.isEmpty {
            let i = q.removeFirst()
            let start = max(i + minJump, farthest + 1)
            for j in start..<min(i + maxJump + 1, n) {
                if sArr[j] == "0" {
                    if j == n - 1 { return true }
                    q.append(j)
                }
            }
            farthest = i + maxJump
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

## 3. Dynamic Programming (Sliding Window)

### Intuition

Position `i` is reachable if any position in `[i - maxJump, i - minJump]` is reachable (and `s[i] == '0'`). Instead of checking all positions in this range for each `i`, we maintain a running count of reachable positions within the window. As we move forward, we add newly entering positions to the count and remove positions that exit the window.

### Algorithm

1. Create a DP array where `dp[i]` indicates if position `i` is reachable.
2. Set `dp[0] = true` and initialize count `cnt = 0`.
3. For each position `i` from `1` to `n - 1`:
   - If `i >= minJump` and `dp[i - minJump]` is `true`, increment `cnt`.
   - If `i > maxJump` and `dp[i - maxJump - 1]` is `true`, decrement `cnt`.
   - If `cnt > 0` and `s[i] == '0'`, set `dp[i] = true`.
4. Return `dp[n - 1]`.

::tabs-start

```python
class Solution:
    def canReach(self, s: str, minJump: int, maxJump: int) -> bool:
        n = len(s)
        if s[n - 1] == '1':
            return False

        dp = [False] * n
        dp[0] = True
        cnt = 0
        for i in range(1, n):
            if i >= minJump and dp[i - minJump]:
                cnt += 1
            if i > maxJump and dp[i - maxJump - 1]:
                cnt -= 1
            if cnt > 0 and s[i] == '0':
                dp[i] = True

        return dp[n - 1]
```

```java
public class Solution {
    public boolean canReach(String s, int minJump, int maxJump) {
        int n = s.length();
        if (s.charAt(n - 1) == '1') {
            return false;
        }

        boolean[] dp = new boolean[n];
        dp[0] = true;
        int cnt = 0;

        for (int i = 1; i < n; i++) {
            if (i >= minJump && dp[i - minJump]) {
                cnt++;
            }
            if (i > maxJump && dp[i - maxJump - 1]) {
                cnt--;
            }
            if (cnt > 0 && s.charAt(i) == '0') {
                dp[i] = true;
            }
        }

        return dp[n - 1];
    }
}
```

```cpp
class Solution {
public:
    bool canReach(string s, int minJump, int maxJump) {
        int n = s.size();
        if (s[n - 1] == '1') {
            return false;
        }

        vector<bool> dp(n, false);
        dp[0] = true;
        int cnt = 0;

        for (int i = 1; i < n; i++) {
            if (i >= minJump && dp[i - minJump]) {
                cnt++;
            }
            if (i > maxJump && dp[i - maxJump - 1]) {
                cnt--;
            }
            if (cnt > 0 && s[i] == '0') {
                dp[i] = true;
            }
        }

        return dp[n - 1];
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @param {number} minJump
     * @param {number} maxJump
     * @return {boolean}
     */
    canReach(s, minJump, maxJump) {
        const n = s.length;
        if (s[n - 1] === '1') {
            return false;
        }

        const dp = new Array(n).fill(false);
        dp[0] = true;
        let cnt = 0;

        for (let i = 1; i < n; i++) {
            if (i >= minJump && dp[i - minJump]) {
                cnt++;
            }
            if (i > maxJump && dp[i - maxJump - 1]) {
                cnt--;
            }
            if (cnt > 0 && s[i] === '0') {
                dp[i] = true;
            }
        }

        return dp[n - 1];
    }
}
```

```csharp
public class Solution {
    public bool CanReach(string s, int minJump, int maxJump) {
        int n = s.Length;
        if (s[n - 1] == '1') {
            return false;
        }

        bool[] dp = new bool[n];
        dp[0] = true;
        int cnt = 0;

        for (int i = 1; i < n; i++) {
            if (i >= minJump && dp[i - minJump]) {
                cnt++;
            }
            if (i > maxJump && dp[i - maxJump - 1]) {
                cnt--;
            }
            if (cnt > 0 && s[i] == '0') {
                dp[i] = true;
            }
        }

        return dp[n - 1];
    }
}
```

```go
func canReach(s string, minJump int, maxJump int) bool {
    n := len(s)
    if s[n-1] == '1' {
        return false
    }

    dp := make([]bool, n)
    dp[0] = true
    cnt := 0

    for i := 1; i < n; i++ {
        if i >= minJump && dp[i-minJump] {
            cnt++
        }
        if i > maxJump && dp[i-maxJump-1] {
            cnt--
        }
        if cnt > 0 && s[i] == '0' {
            dp[i] = true
        }
    }

    return dp[n-1]
}
```

```kotlin
class Solution {
    fun canReach(s: String, minJump: Int, maxJump: Int): Boolean {
        val n = s.length
        if (s[n - 1] == '1') {
            return false
        }

        val dp = BooleanArray(n)
        dp[0] = true
        var cnt = 0

        for (i in 1 until n) {
            if (i >= minJump && dp[i - minJump]) {
                cnt++
            }
            if (i > maxJump && dp[i - maxJump - 1]) {
                cnt--
            }
            if (cnt > 0 && s[i] == '0') {
                dp[i] = true
            }
        }

        return dp[n - 1]
    }
}
```

```swift
class Solution {
    func canReach(_ s: String, _ minJump: Int, _ maxJump: Int) -> Bool {
        let sArr = Array(s)
        let n = sArr.count
        if sArr[n - 1] == "1" {
            return false
        }

        var dp = [Bool](repeating: false, count: n)
        dp[0] = true
        var cnt = 0

        for i in 1..<n {
            if i >= minJump && dp[i - minJump] {
                cnt += 1
            }
            if i > maxJump && dp[i - maxJump - 1] {
                cnt -= 1
            }
            if cnt > 0 && sArr[i] == "0" {
                dp[i] = true
            }
        }

        return dp[n - 1]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 4. Dynamic Programming (Two Pointers)

### Intuition

Instead of tracking a count, we use a pointer `j` to remember the farthest position we've marked as reachable so far. From each reachable position `i`, we can mark all positions in `[i + minJump, i + maxJump]` as reachable. The pointer `j` ensures we never mark the same position twice, achieving linear time.

### Algorithm

1. Create a DP array with `dp[0] = true`. Initialize pointer `j = 0`.
2. For each position `i` from `0` to `n - 1`:
   - If `dp[i]` is `false`, skip to the next iteration.
   - Update `j = max(j, i + minJump)` to start from where we left off.
   - Mark all positions from `j` to `min(i + maxJump, n - 1)` where `s[j] == '0'` as reachable.
   - Increment `j` after processing each position.
3. Return `dp[n - 1]`.

::tabs-start

```python
class Solution:
    def canReach(self, s: str, minJump: int, maxJump: int) -> bool:
        n = len(s)
        if s[n - 1] == '1':
            return False

        dp = [False] * n
        dp[0] = True
        j = 0
        for i in range(n):
            if dp[i] == False:
                continue

            j = max(j, i + minJump)
            while j < min(i + maxJump + 1, n):
                if s[j] == '0':
                    dp[j] = True
                j += 1

        return dp[n - 1]
```

```java
public class Solution {
    public boolean canReach(String s, int minJump, int maxJump) {
        int n = s.length();
        if (s.charAt(n - 1) == '1') {
            return false;
        }

        boolean[] dp = new boolean[n];
        dp[0] = true;
        int j = 0;

        for (int i = 0; i < n; i++) {
            if (!dp[i]) {
                continue;
            }
            j = Math.max(j, i + minJump);
            while (j < Math.min(i + maxJump + 1, n)) {
                if (s.charAt(j) == '0') {
                    dp[j] = true;
                }
                j++;
            }
        }

        return dp[n - 1];
    }
}
```

```cpp
class Solution {
public:
    bool canReach(string s, int minJump, int maxJump) {
        int n = s.size();
        if (s[n - 1] == '1') {
            return false;
        }

        vector<bool> dp(n, false);
        dp[0] = true;
        int j = 0;

        for (int i = 0; i < n; i++) {
            if (!dp[i]) {
                continue;
            }
            j = max(j, i + minJump);
            while (j < min(i + maxJump + 1, n)) {
                if (s[j] == '0') {
                    dp[j] = true;
                }
                j++;
            }
        }

        return dp[n - 1];
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @param {number} minJump
     * @param {number} maxJump
     * @return {boolean}
     */
    canReach(s, minJump, maxJump) {
        const n = s.length;
        if (s[n - 1] === '1') {
            return false;
        }

        const dp = new Array(n).fill(false);
        dp[0] = true;
        let j = 0;

        for (let i = 0; i < n; i++) {
            if (!dp[i]) {
                continue;
            }
            j = Math.max(j, i + minJump);
            while (j < Math.min(i + maxJump + 1, n)) {
                if (s[j] === '0') {
                    dp[j] = true;
                }
                j++;
            }
        }

        return dp[n - 1];
    }
}
```

```csharp
public class Solution {
    public bool CanReach(string s, int minJump, int maxJump) {
        int n = s.Length;
        if (s[n - 1] == '1') {
            return false;
        }

        bool[] dp = new bool[n];
        dp[0] = true;
        int j = 0;

        for (int i = 0; i < n; i++) {
            if (!dp[i]) continue;

            j = Math.Max(j, i + minJump);
            while (j <= Math.Min(i + maxJump, n - 1)) {
                if (s[j] == '0') {
                    dp[j] = true;
                }
                j++;
            }
        }

        return dp[n - 1];
    }
}
```

```go
func canReach(s string, minJump int, maxJump int) bool {
    n := len(s)
    if s[n-1] == '1' {
        return false
    }

    dp := make([]bool, n)
    dp[0] = true
    j := 0

    for i := 0; i < n; i++ {
        if !dp[i] {
            continue
        }
        j = max(j, i+minJump)
        for j < min(i+maxJump+1, n) {
            if s[j] == '0' {
                dp[j] = true
            }
            j++
        }
    }

    return dp[n-1]
}

func max(a, b int) int {
    if a > b {
        return a
    }
    return b
}

func min(a, b int) int {
    if a < b {
        return a
    }
    return b
}
```

```kotlin
class Solution {
    fun canReach(s: String, minJump: Int, maxJump: Int): Boolean {
        val n = s.length
        if (s[n - 1] == '1') {
            return false
        }

        val dp = BooleanArray(n)
        dp[0] = true
        var j = 0

        for (i in 0 until n) {
            if (!dp[i]) continue
            j = maxOf(j, i + minJump)
            while (j <= minOf(i + maxJump, n - 1)) {
                if (s[j] == '0') {
                    dp[j] = true
                }
                j++
            }
        }

        return dp[n - 1]
    }
}
```

```swift
class Solution {
    func canReach(_ s: String, _ minJump: Int, _ maxJump: Int) -> Bool {
        let sArr = Array(s)
        let n = sArr.count
        if sArr[n - 1] == "1" {
            return false
        }

        var dp = [Bool](repeating: false, count: n)
        dp[0] = true
        var j = 0

        for i in 0..<n {
            if !dp[i] { continue }
            j = max(j, i + minJump)
            while j <= min(i + maxJump, n - 1) {
                if sArr[j] == "0" {
                    dp[j] = true
                }
                j += 1
            }
        }

        return dp[n - 1]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$
