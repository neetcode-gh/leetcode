## 1. Breadth First Search - I

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(d ^ n + m)$
- Space complexity: $O(d ^ n)$

> Where $d$ is the number of digits $(0 - 9)$, $n$ is the number of wheels $(4)$, and $m$ is the number of deadends.

---

## 2. Breadth First Search - II

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(d ^ n + m)$
- Space complexity: $O(d ^ n)$

> Where $d$ is the number of digits $(0 - 9)$, $n$ is the number of wheels $(4)$, and $m$ is the number of deadends.

---

## 3. Bidirectional Breadth First Search

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(d ^ n + m)$
- Space complexity: $O(d ^ n)$

> Where $d$ is the number of digits $(0 - 9)$, $n$ is the number of wheels $(4)$, and $m$ is the number of deadends.
