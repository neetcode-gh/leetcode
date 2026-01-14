## 1. Breadth First Search - I

### Intuition

Think of each lock combination as a node in a graph, where two nodes are connected if you can reach one from the other by turning a single wheel one step. Starting from "0000", we want to find the shortest path to the target while avoiding deadends.

BFS is the natural choice here because it explores all states at distance `1` before distance `2`, and so on. This guarantees that when we first reach the target, we've found the minimum number of moves. We treat deadends as blocked nodes and use a visited set to avoid revisiting the same combination.

### Algorithm

1. If "0000" is a deadend, return `-1` immediately since we cannot even start.
2. Initialize a queue with the starting state "0000" and `0` turns.
3. Add all deadends to a visited set to block them.
4. While the queue is not empty:
   - Dequeue a lock combination and its turn count.
   - If it matches the target, return the turn count.
   - Generate all `8` neighbors (each wheel can go up or down by `1`).
   - For each unvisited neighbor, mark it visited and enqueue it with `turns + 1`.
5. If the queue empties without finding the target, return `-1`.

::tabs-start

```python
class Solution:
    def openLock(self, deadends: List[str], target: str) -> int:
        if "0000" in deadends:
            return -1

        def children(lock):
            res = []
            for i in range(4):
                digit = str((int(lock[i]) + 1) % 10)
                res.append(lock[:i] + digit + lock[i+1:])
                digit = str((int(lock[i]) - 1 + 10) % 10)
                res.append(lock[:i] + digit + lock[i+1:])
            return res

        q = deque([("0000", 0)])
        visit = set(deadends)

        while q:
            lock, turns = q.popleft()
            if lock == target:
                return turns
            for child in children(lock):
                if child not in visit:
                    visit.add(child)
                    q.append((child, turns + 1))
        return -1
```

```java
public class Solution {
    public int openLock(String[] deadends, String target) {
        Set<String> visit = new HashSet<>(Arrays.asList(deadends));
        if (visit.contains("0000")) return -1;

        Queue<String> queue = new LinkedList<>();
        queue.offer("0000");
        visit.add("0000");

        int turns = 0;
        while (!queue.isEmpty()) {
            int size = queue.size();
            for (int i = 0; i < size; i++) {
                String lock = queue.poll();
                if (lock.equals(target)) return turns;

                for (String next : children(lock)) {
                    if (!visit.contains(next)) {
                        queue.offer(next);
                        visit.add(next);
                    }
                }
            }
            turns++;
        }
        return -1;
    }

    private List<String> children(String lock) {
        List<String> res = new ArrayList<>();
        for (int i = 0; i < 4; i++) {
            char[] arr = lock.toCharArray();
            arr[i] = (char) (((arr[i] - '0' + 1) % 10) + '0');
            res.add(new String(arr));

            arr = lock.toCharArray();
            arr[i] = (char) (((arr[i] - '0' - 1 + 10) % 10) + '0');
            res.add(new String(arr));
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int openLock(vector<string>& deadends, string target) {
        unordered_set<string> visit(deadends.begin(), deadends.end());
        if (visit.count("0000")) return -1;

        queue<pair<string, int>> q;
        q.push({"0000", 0});
        visit.insert("0000");

        while (!q.empty()) {
            auto [lock, turns] = q.front();
            q.pop();

            if (lock == target) return turns;
            for (string child : children(lock)) {
                if (!visit.count(child)) {
                    visit.insert(child);
                    q.push({child, turns + 1});
                }
            }
        }
        return -1;
    }

private:
    vector<string> children(string lock) {
        vector<string> res;
        for (int i = 0; i < 4; ++i) {
            string next = lock;
            next[i] = (next[i] - '0' + 1) % 10 + '0';
            res.push_back(next);

            next = lock;
            next[i] = (next[i] - '0' - 1 + 10) % 10 + '0';
            res.push_back(next);
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[]} deadends
     * @param {string} target
     * @return {number}
     */
    openLock(deadends, target) {
        const visit = new Set(deadends);
        if (visit.has('0000')) return -1;

        const children = (lock) => {
            const res = [];
            for (let i = 0; i < 4; i++) {
                const up =
                    lock.slice(0, i) +
                    ((+lock[i] + 1) % 10) +
                    lock.slice(i + 1);
                const down =
                    lock.slice(0, i) +
                    ((+lock[i] - 1 + 10) % 10) +
                    lock.slice(i + 1);
                res.push(up, down);
            }
            return res;
        };

        const queue = new Queue([['0000', 0]]);
        visit.add('0000');

        while (!queue.isEmpty()) {
            const [lock, turns] = queue.pop();
            if (lock === target) return turns;

            for (const child of children(lock)) {
                if (!visit.has(child)) {
                    visit.add(child);
                    queue.push([child, turns + 1]);
                }
            }
        }
        return -1;
    }
}
```

```csharp
public class Solution {
    public int OpenLock(string[] deadends, string target) {
        var dead = new HashSet<string>(deadends);
        if (dead.Contains("0000")) return -1;

        List<string> Children(string lockStr) {
            var res = new List<string>();
            for (int i = 0; i < 4; i++) {
                int digit = lockStr[i] - '0';
                string up = lockStr.Substring(0, i) + ((digit + 1) % 10) + lockStr.Substring(i + 1);
                string down = lockStr.Substring(0, i) + ((digit + 9) % 10) + lockStr.Substring(i + 1);
                res.Add(up);
                res.Add(down);
            }
            return res;
        }

        var q = new Queue<(string, int)>();
        q.Enqueue(("0000", 0));
        var visited = new HashSet<string>(dead);

        while (q.Count > 0) {
            var (lockStr, turns) = q.Dequeue();
            if (lockStr == target) return turns;
            foreach (var child in Children(lockStr)) {
                if (!visited.Contains(child)) {
                    visited.Add(child);
                    q.Enqueue((child, turns + 1));
                }
            }
        }

        return -1;
    }
}
```

```go
func openLock(deadends []string, target string) int {
    if target == "0000" {
        return 0
    }

    visit := make(map[string]bool)
    for _, d := range deadends {
        visit[d] = true
    }
    if visit["0000"] {
        return -1
    }

    children := func(lock string) []string {
        res := []string{}
        for i := 0; i < 4; i++ {
            digit := int(lock[i] - '0')
            up := lock[:i] + string('0'+byte((digit+1)%10)) + lock[i+1:]
            down := lock[:i] + string('0'+byte((digit+9)%10)) + lock[i+1:]
            res = append(res, up, down)
        }
        return res
    }

    type pair struct {
        lock  string
        turns int
    }
    q := []pair{{"0000", 0}}
    visit["0000"] = true

    for len(q) > 0 {
        cur := q[0]
        q = q[1:]
        if cur.lock == target {
            return cur.turns
        }
        for _, child := range children(cur.lock) {
            if !visit[child] {
                visit[child] = true
                q = append(q, pair{child, cur.turns + 1})
            }
        }
    }
    return -1
}
```

```kotlin
class Solution {
    fun openLock(deadends: Array<String>, target: String): Int {
        val visit = deadends.toMutableSet()
        if ("0000" in visit) return -1

        fun children(lock: String): List<String> {
            val res = mutableListOf<String>()
            for (i in 0..3) {
                val digit = lock[i] - '0'
                val up = lock.substring(0, i) + ((digit + 1) % 10) + lock.substring(i + 1)
                val down = lock.substring(0, i) + ((digit + 9) % 10) + lock.substring(i + 1)
                res.add(up)
                res.add(down)
            }
            return res
        }

        val q = ArrayDeque<Pair<String, Int>>()
        q.add("0000" to 0)
        visit.add("0000")

        while (q.isNotEmpty()) {
            val (lock, turns) = q.removeFirst()
            if (lock == target) return turns
            for (child in children(lock)) {
                if (child !in visit) {
                    visit.add(child)
                    q.add(child to turns + 1)
                }
            }
        }
        return -1
    }
}
```

```swift
class Solution {
    func openLock(_ deadends: [String], _ target: String) -> Int {
        if target == "0000" { return 0 }

        var visit = Set(deadends)
        if visit.contains("0000") { return -1 }

        func children(_ lock: String) -> [String] {
            var res = [String]()
            let arr = Array(lock)
            for i in 0..<4 {
                let digit = Int(String(arr[i]))!
                var up = arr
                up[i] = Character(String((digit + 1) % 10))
                var down = arr
                down[i] = Character(String((digit + 9) % 10))
                res.append(String(up))
                res.append(String(down))
            }
            return res
        }

        var q: [(String, Int)] = [("0000", 0)]
        visit.insert("0000")

        while !q.isEmpty {
            let (lock, turns) = q.removeFirst()
            if lock == target { return turns }
            for child in children(lock) {
                if !visit.contains(child) {
                    visit.insert(child)
                    q.append((child, turns + 1))
                }
            }
        }
        return -1
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(d ^ n + m)$
- Space complexity: $O(d ^ n)$

> Where $d$ is the number of digits $(0 - 9)$, $n$ is the number of wheels $(4)$, and $m$ is the number of deadends.

---

## 2. Breadth First Search - II

### Intuition

This is a cleaner implementation of the same BFS approach. Instead of generating all children at once through a helper function, we iterate through each of the `4` wheels and try both directions (`+1` and `-1`) inline. The core idea remains the same: explore level by level to find the shortest path.

By processing all nodes at the current level before incrementing the step counter, we ensure the first time we reach the target corresponds to the minimum number of moves.

### Algorithm

1. Handle edge cases: if target is "0000", return `0`. If "0000" is a deadend, return `-1`.
2. Initialize a queue with "0000" and mark it visited.
3. Set steps to `0` and process level by level:
   - Increment steps at the start of each level.
   - For each lock in the current level, try all `8` possible moves.
   - If a move reaches the target, return steps.
   - Otherwise, add unvisited states to the queue.
4. Return `-1` if the target is unreachable.

::tabs-start

```python
class Solution:
    def openLock(self, deadends: List[str], target: str) -> int:
        if target == "0000":
            return 0

        visit = set(deadends)
        if "0000" in visit:
            return -1

        q = deque(["0000"])
        visit.add("0000")
        steps = 0

        while q:
            steps += 1
            for _ in range(len(q)):
                lock = q.popleft()
                for i in range(4):
                    for j in [1, -1]:
                        digit = str((int(lock[i]) + j + 10) % 10)
                        nextLock = lock[:i] + digit + lock[i+1:]
                        if nextLock in visit:
                            continue
                        if nextLock == target:
                            return steps
                        q.append(nextLock)
                        visit.add(nextLock)
        return -1
```

```java
public class Solution {
    public int openLock(String[] deadends, String target) {
        if (target.equals("0000")) return 0;

        Set<String> visit = new HashSet<>(Arrays.asList(deadends));
        if (visit.contains("0000")) return -1;

        Queue<String> q = new LinkedList<>();
        q.offer("0000");
        visit.add("0000");
        int steps = 0;

        while (!q.isEmpty()) {
            steps++;
            for (int i = q.size(); i > 0; i--) {
                String lock = q.poll();
                for (int j = 0; j < 4; j++) {
                    for (int move : new int[]{1, -1}) {
                        char[] arr = lock.toCharArray();
                        arr[j] = (char)((arr[j] - '0' + move + 10) % 10 + '0');
                        String nextLock = new String(arr);
                        if (visit.contains(nextLock)) continue;
                        if (nextLock.equals(target)) return steps;
                        q.offer(nextLock);
                        visit.add(nextLock);
                    }
                }
            }
        }
        return -1;
    }
}
```

```cpp
class Solution {
public:
    int openLock(vector<string>& deadends, string target) {
        if (target == "0000") return 0;

        unordered_set<string> visit(deadends.begin(), deadends.end());
        if (visit.count("0000")) return -1;

        queue<string> q;
        q.push("0000");
        visit.insert("0000");
        int steps = 0;

        while (!q.empty()) {
            steps++;
            for (int i = q.size(); i > 0; i--) {
                string lock = q.front(); q.pop();
                for (int j = 0; j < 4; j++) {
                    for (int move : {1, -1}) {
                        string nextLock = lock;
                        nextLock[j] = (nextLock[j] - '0' + move + 10) % 10 + '0';
                        if (visit.count(nextLock)) continue;
                        if (nextLock == target) return steps;
                        q.push(nextLock);
                        visit.insert(nextLock);
                    }
                }
            }
        }
        return -1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[]} deadends
     * @param {string} target
     * @return {number}
     */
    openLock(deadends, target) {
        if (target === '0000') return 0;

        const visit = new Set(deadends);
        if (visit.has('0000')) return -1;

        const q = new Queue(['0000']);
        visit.add('0000');
        let steps = 0;

        while (!q.isEmpty()) {
            steps++;
            for (let i = q.size(); i > 0; i--) {
                const lock = q.pop();
                for (let j = 0; j < 4; j++) {
                    for (let move of [1, -1]) {
                        const digit = (parseInt(lock[j]) + move + 10) % 10;
                        const nextLock =
                            lock.slice(0, j) + digit + lock.slice(j + 1);
                        if (visit.has(nextLock)) continue;
                        if (nextLock === target) return steps;
                        q.push(nextLock);
                        visit.add(nextLock);
                    }
                }
            }
        }
        return -1;
    }
}
```

```csharp
public class Solution {
    public int OpenLock(string[] deadends, string target) {
        if (target == "0000") return 0;

        var visited = new HashSet<string>(deadends);
        if (visited.Contains("0000")) return -1;

        var q = new Queue<string>();
        q.Enqueue("0000");
        visited.Add("0000");
        int steps = 0;

        while (q.Count > 0) {
            steps++;
            int size = q.Count;
            for (int i = 0; i < size; i++) {
                string lockStr = q.Dequeue();
                for (int j = 0; j < 4; j++) {
                    foreach (int move in new int[] {1, -1}) {
                        int digit = (lockStr[j] - '0' + move + 10) % 10;
                        string nextLock = lockStr.Substring(0, j) + digit.ToString() + lockStr.Substring(j + 1);
                        if (visited.Contains(nextLock)) continue;
                        if (nextLock == target) return steps;
                        q.Enqueue(nextLock);
                        visited.Add(nextLock);
                    }
                }
            }
        }

        return -1;
    }
}
```

```go
func openLock(deadends []string, target string) int {
    if target == "0000" {
        return 0
    }

    visit := make(map[string]bool)
    for _, d := range deadends {
        visit[d] = true
    }
    if visit["0000"] {
        return -1
    }

    q := []string{"0000"}
    visit["0000"] = true
    steps := 0

    for len(q) > 0 {
        steps++
        size := len(q)
        for i := 0; i < size; i++ {
            lock := q[0]
            q = q[1:]
            for j := 0; j < 4; j++ {
                for _, move := range []int{1, -1} {
                    digit := (int(lock[j]-'0') + move + 10) % 10
                    nextLock := lock[:j] + string('0'+byte(digit)) + lock[j+1:]
                    if visit[nextLock] {
                        continue
                    }
                    if nextLock == target {
                        return steps
                    }
                    q = append(q, nextLock)
                    visit[nextLock] = true
                }
            }
        }
    }
    return -1
}
```

```kotlin
class Solution {
    fun openLock(deadends: Array<String>, target: String): Int {
        if (target == "0000") return 0

        val visit = deadends.toMutableSet()
        if ("0000" in visit) return -1

        val q = ArrayDeque<String>()
        q.add("0000")
        visit.add("0000")
        var steps = 0

        while (q.isNotEmpty()) {
            steps++
            repeat(q.size) {
                val lock = q.removeFirst()
                for (j in 0..3) {
                    for (move in listOf(1, -1)) {
                        val digit = (lock[j] - '0' + move + 10) % 10
                        val nextLock = lock.substring(0, j) + digit + lock.substring(j + 1)
                        if (nextLock in visit) continue
                        if (nextLock == target) return steps
                        q.add(nextLock)
                        visit.add(nextLock)
                    }
                }
            }
        }
        return -1
    }
}
```

```swift
class Solution {
    func openLock(_ deadends: [String], _ target: String) -> Int {
        if target == "0000" { return 0 }

        var visit = Set(deadends)
        if visit.contains("0000") { return -1 }

        var q = ["0000"]
        visit.insert("0000")
        var steps = 0

        while !q.isEmpty {
            steps += 1
            let size = q.count
            for _ in 0..<size {
                let lock = q.removeFirst()
                let arr = Array(lock)
                for j in 0..<4 {
                    for move in [1, -1] {
                        let digit = (Int(String(arr[j]))! + move + 10) % 10
                        var newArr = arr
                        newArr[j] = Character(String(digit))
                        let nextLock = String(newArr)
                        if visit.contains(nextLock) { continue }
                        if nextLock == target { return steps }
                        q.append(nextLock)
                        visit.insert(nextLock)
                    }
                }
            }
        }
        return -1
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(d ^ n + m)$
- Space complexity: $O(d ^ n)$

> Where $d$ is the number of digits $(0 - 9)$, $n$ is the number of wheels $(4)$, and $m$ is the number of deadends.

---

## 3. Bidirectional Breadth First Search

### Intuition

Standard BFS explores outward from the start, which can lead to exploring many states before reaching a distant target. Bidirectional BFS improves this by searching from both ends simultaneously: one frontier starts at "0000" and another at the target. When they meet, we've found the shortest path.

The key optimization is to always expand the smaller frontier. This balances the search and reduces the total number of states explored, especially when the search space branches heavily in one direction.

### Algorithm

1. Handle edge cases for target "0000" and "0000" being a deadend.
2. Create two sets: `begin` starting from "0000" and `end` starting from target.
3. While both sets are non-empty:
   - If `begin` is larger than `end`, swap them to always expand the smaller one.
   - Increment steps and create a temporary set for the next level.
   - For each state in `begin`, generate all `8` neighbors.
   - If a neighbor is in `end`, the frontiers meet, so return steps.
   - Otherwise, if unvisited, add to the temp set and mark visited.
   - Replace `begin` with the temp set.
4. Return `-1` if the sets never meet.

::tabs-start

```python
class Solution:
    def openLock(self, deadends: List[str], target: str) -> int:
        if target == "0000":
            return 0

        visit = set(deadends)
        if "0000" in visit:
            return -1

        begin = {"0000"}
        end = {target}
        steps = 0

        while begin and end:
            if len(begin) > len(end):
                begin, end = end, begin

            steps += 1
            temp = set()
            for lock in begin:
                for i in range(4):
                    for j in [-1, 1]:
                        digit = str((int(lock[i]) + j + 10) % 10)
                        nextLock = lock[:i] + digit + lock[i+1:]

                        if nextLock in end:
                            return steps
                        if nextLock in visit:
                            continue
                        visit.add(nextLock)
                        temp.add(nextLock)
            begin = temp
        return -1
```

```java
public class Solution {
    public int openLock(String[] deadends, String target) {
        if (target.equals("0000")) return 0;

        Set<String> visit = new HashSet<>(Arrays.asList(deadends));
        if (visit.contains("0000")) return -1;

        Set<String> begin = new HashSet<>();
        begin.add("0000");
        Set<String> end = new HashSet<>();
        end.add(target);
        int steps = 0;

        while (!begin.isEmpty() && !end.isEmpty()) {
            if (begin.size() > end.size()) {
                Set<String> temp = begin;
                begin = end;
                end = temp;
            }

            steps++;
            Set<String> temp = new HashSet<>();
            for (String lock : begin) {
                for (int i = 0; i < 4; i++) {
                    for (int j : new int[]{-1, 1}) {
                        char[] chars = lock.toCharArray();
                        chars[i] = (char) ((chars[i] - '0' + j + 10) % 10 + '0');
                        String nextLock = new String(chars);

                        if (end.contains(nextLock)) return steps;
                        if (visit.contains(nextLock)) continue;

                        visit.add(nextLock);
                        temp.add(nextLock);
                    }
                }
            }
            begin = temp;
        }
        return -1;
    }
}
```

```cpp
class Solution {
public:
    int openLock(vector<string>& deadends, string target) {
        if (target == "0000") return 0;

        unordered_set<string> visit(deadends.begin(), deadends.end());
        if (visit.count("0000")) return -1;

        unordered_set<string> begin = {"0000"}, end = {target};
        int steps = 0;

        while (!begin.empty() && !end.empty()) {
            if (begin.size() > end.size()) swap(begin, end);
            steps++;
            unordered_set<string> temp;

            for (const string& lock : begin) {
                for (int i = 0; i < 4; ++i) {
                    for (int j : {-1, 1}) {
                        string nextLock = lock;
                        nextLock[i] = (nextLock[i] - '0' + j + 10) % 10 + '0';

                        if (end.count(nextLock)) return steps;
                        if (visit.count(nextLock)) continue;

                        visit.insert(nextLock);
                        temp.insert(nextLock);
                    }
                }
            }
            begin = temp;
        }
        return -1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[]} deadends
     * @param {string} target
     * @return {number}
     */
    openLock(deadends, target) {
        if (target === '0000') return 0;

        const visit = new Set(deadends);
        if (visit.has('0000')) return -1;

        let begin = new Set(['0000']);
        let end = new Set([target]);
        let steps = 0;

        while (begin.size > 0 && end.size > 0) {
            if (begin.size > end.size) [begin, end] = [end, begin];

            steps++;
            const temp = new Set();

            for (const lock of begin) {
                for (let i = 0; i < 4; i++) {
                    for (const j of [-1, 1]) {
                        const digit = (parseInt(lock[i]) + j + 10) % 10;
                        const nextLock =
                            lock.slice(0, i) + digit + lock.slice(i + 1);

                        if (end.has(nextLock)) return steps;
                        if (visit.has(nextLock)) continue;

                        visit.add(nextLock);
                        temp.add(nextLock);
                    }
                }
            }
            begin = temp;
        }
        return -1;
    }
}
```

```csharp
public class Solution {
    public int OpenLock(string[] deadends, string target) {
        if (target == "0000") return 0;

        var visit = new HashSet<string>(deadends);
        if (visit.Contains("0000")) return -1;

        var begin = new HashSet<string> { "0000" };
        var end = new HashSet<string> { target };
        int steps = 0;

        while (begin.Count > 0 && end.Count > 0) {
            if (begin.Count > end.Count) {
                var tempSet = begin;
                begin = end;
                end = tempSet;
            }

            var temp = new HashSet<string>();
            steps++;

            foreach (var lockStr in begin) {
                for (int i = 0; i < 4; i++) {
                    foreach (int j in new int[] { -1, 1 }) {
                        int digit = (lockStr[i] - '0' + j + 10) % 10;
                        string nextLock = lockStr.Substring(0, i) + digit.ToString() + lockStr.Substring(i + 1);

                        if (end.Contains(nextLock)) return steps;
                        if (visit.Contains(nextLock)) continue;

                        visit.Add(nextLock);
                        temp.Add(nextLock);
                    }
                }
            }

            begin = temp;
        }

        return -1;
    }
}
```

```go
func openLock(deadends []string, target string) int {
    if target == "0000" {
        return 0
    }

    visit := make(map[string]bool)
    for _, d := range deadends {
        visit[d] = true
    }
    if visit["0000"] {
        return -1
    }

    begin := map[string]bool{"0000": true}
    end := map[string]bool{target: true}
    steps := 0

    for len(begin) > 0 && len(end) > 0 {
        if len(begin) > len(end) {
            begin, end = end, begin
        }

        steps++
        temp := make(map[string]bool)

        for lock := range begin {
            for i := 0; i < 4; i++ {
                for _, j := range []int{-1, 1} {
                    digit := (int(lock[i]-'0') + j + 10) % 10
                    nextLock := lock[:i] + string('0'+byte(digit)) + lock[i+1:]

                    if end[nextLock] {
                        return steps
                    }
                    if visit[nextLock] {
                        continue
                    }

                    visit[nextLock] = true
                    temp[nextLock] = true
                }
            }
        }
        begin = temp
    }
    return -1
}
```

```kotlin
class Solution {
    fun openLock(deadends: Array<String>, target: String): Int {
        if (target == "0000") return 0

        val visit = deadends.toMutableSet()
        if ("0000" in visit) return -1

        var begin = mutableSetOf("0000")
        var end = mutableSetOf(target)
        var steps = 0

        while (begin.isNotEmpty() && end.isNotEmpty()) {
            if (begin.size > end.size) {
                val temp = begin
                begin = end
                end = temp
            }

            steps++
            val temp = mutableSetOf<String>()

            for (lock in begin) {
                for (i in 0..3) {
                    for (j in listOf(-1, 1)) {
                        val digit = (lock[i] - '0' + j + 10) % 10
                        val nextLock = lock.substring(0, i) + digit + lock.substring(i + 1)

                        if (nextLock in end) return steps
                        if (nextLock in visit) continue

                        visit.add(nextLock)
                        temp.add(nextLock)
                    }
                }
            }
            begin = temp
        }
        return -1
    }
}
```

```swift
class Solution {
    func openLock(_ deadends: [String], _ target: String) -> Int {
        if target == "0000" { return 0 }

        var visit = Set(deadends)
        if visit.contains("0000") { return -1 }

        var begin: Set<String> = ["0000"]
        var end: Set<String> = [target]
        var steps = 0

        while !begin.isEmpty && !end.isEmpty {
            if begin.count > end.count {
                swap(&begin, &end)
            }

            steps += 1
            var temp = Set<String>()

            for lock in begin {
                let arr = Array(lock)
                for i in 0..<4 {
                    for j in [-1, 1] {
                        let digit = (Int(String(arr[i]))! + j + 10) % 10
                        var newArr = arr
                        newArr[i] = Character(String(digit))
                        let nextLock = String(newArr)

                        if end.contains(nextLock) { return steps }
                        if visit.contains(nextLock) { continue }

                        visit.insert(nextLock)
                        temp.insert(nextLock)
                    }
                }
            }
            begin = temp
        }
        return -1
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(d ^ n + m)$
- Space complexity: $O(d ^ n)$

> Where $d$ is the number of digits $(0 - 9)$, $n$ is the number of wheels $(4)$, and $m$ is the number of deadends.

---

## Common Pitfalls

### Not Checking if Starting Position is a Deadend

The initial state "0000" might itself be a deadend. Failing to check this before starting BFS leads to incorrect exploration from an invalid starting point. Always verify "0000" is not in the deadends set before beginning the search.

### Incorrect Wheel Wraparound Logic

Turning a wheel from `9` up should go to `0`, and turning from `0` down should go to `9`. Using simple addition/subtraction without modular arithmetic causes invalid states like `-1` or `10`. Apply `(digit + move + 10) % 10` to handle wraparound correctly.

### Adding to Visited Set After Dequeuing Instead of Before Enqueuing

Marking nodes as visited when dequeuing rather than when enqueuing leads to the same state being added to the queue multiple times. This causes redundant processing and can significantly slow down the solution. Always mark a state as visited immediately when adding it to the queue.
