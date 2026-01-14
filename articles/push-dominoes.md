## 1. Brute Force

### Intuition

For each standing domino (represented by `'.'`), we need to determine which force, if any, will knock it over. We look for the nearest `'R'` to the left and the nearest `'L'` to the right. If only one force reaches this domino, it falls in that direction. If both forces reach it, the closer one wins. If they are equidistant, the forces cancel out and the domino stays upright.

### Algorithm

1. Iterate through each position in the string.
2. For each `'.'`, search left to find the nearest non-`'.'` character and search right to find the nearest non-`'.'` character.
3. Determine the final state based on which forces apply:
   - If `'R'` is on the left and `'L'` is on the right, compare distances. The closer force wins, or they cancel if equidistant.
   - If only `'R'` is on the left, the domino falls right.
   - If only `'L'` is on the right, the domino falls left.
4. Return the resulting string.

::tabs-start

```python
class Solution:
    def pushDominoes(self, dominoes: str) -> str:
        n = len(dominoes)
        res = list(dominoes)

        for i in range(n):
            if dominoes[i] != '.':
                continue

            l, r = i - 1, i + 1

            while l >= 0 and dominoes[l] == '.':
                l -= 1

            while r < n and dominoes[r] == '.':
                r += 1

            left_force = dominoes[l] if l >= 0 else None
            right_force = dominoes[r] if r < n else None

            if left_force == 'R' and right_force == 'L':
                if (i - l) < (r - i):
                    res[i] = 'R'
                elif (r - i) < (i - l):
                    res[i] = 'L'
            elif left_force == 'R':
                res[i] = 'R'
            elif right_force == 'L':
                res[i] = 'L'

        return "".join(res)
```

```java
public class Solution {
    public String pushDominoes(String dominoes) {
        int n = dominoes.length();
        char[] res = dominoes.toCharArray();

        for (int i = 0; i < n; i++) {
            if (dominoes.charAt(i) != '.') continue;

            int l = i - 1, r = i + 1;

            while (l >= 0 && dominoes.charAt(l) == '.') l--;
            while (r < n && dominoes.charAt(r) == '.') r++;

            char leftForce = (l >= 0) ? dominoes.charAt(l) : ' ';
            char rightForce = (r < n) ? dominoes.charAt(r) : ' ';

            if (leftForce == 'R' && rightForce == 'L') {
                if ((i - l) < (r - i)) res[i] = 'R';
                else if ((r - i) < (i - l)) res[i] = 'L';
            } else if (leftForce == 'R') {
                res[i] = 'R';
            } else if (rightForce == 'L') {
                res[i] = 'L';
            }
        }

        return new String(res);
    }
}
```

```cpp
class Solution {
public:
    string pushDominoes(string dominoes) {
        int n = dominoes.size();
        vector<char> res(dominoes.begin(), dominoes.end());

        for (int i = 0; i < n; i++) {
            if (dominoes[i] != '.') continue;

            int l = i - 1, r = i + 1;

            while (l >= 0 && dominoes[l] == '.') l--;
            while (r < n && dominoes[r] == '.') r++;

            char leftForce = (l >= 0) ? dominoes[l] : ' ';
            char rightForce = (r < n) ? dominoes[r] : ' ';

            if (leftForce == 'R' && rightForce == 'L') {
                if ((i - l) < (r - i)) res[i] = 'R';
                else if ((r - i) < (i - l)) res[i] = 'L';
            } else if (leftForce == 'R') {
                res[i] = 'R';
            } else if (rightForce == 'L') {
                res[i] = 'L';
            }
        }

        return string(res.begin(), res.end());
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} dominoes
     * @return {string}
     */
    pushDominoes(dominoes) {
        const n = dominoes.length;
        const res = dominoes.split('');

        for (let i = 0; i < n; i++) {
            if (dominoes[i] !== '.') continue;

            let l = i - 1,
                r = i + 1;

            while (l >= 0 && dominoes[l] === '.') l--;
            while (r < n && dominoes[r] === '.') r++;

            const leftForce = l >= 0 ? dominoes[l] : null;
            const rightForce = r < n ? dominoes[r] : null;

            if (leftForce === 'R' && rightForce === 'L') {
                if (i - l < r - i) res[i] = 'R';
                else if (r - i < i - l) res[i] = 'L';
            } else if (leftForce === 'R') {
                res[i] = 'R';
            } else if (rightForce === 'L') {
                res[i] = 'L';
            }
        }

        return res.join('');
    }
}
```

```csharp
public class Solution {
    public string PushDominoes(string dominoes) {
        int n = dominoes.Length;
        char[] res = dominoes.ToCharArray();

        for (int i = 0; i < n; i++) {
            if (dominoes[i] != '.') continue;

            int l = i - 1, r = i + 1;

            while (l >= 0 && dominoes[l] == '.') l--;
            while (r < n && dominoes[r] == '.') r++;

            char leftForce = (l >= 0) ? dominoes[l] : ' ';
            char rightForce = (r < n) ? dominoes[r] : ' ';

            if (leftForce == 'R' && rightForce == 'L') {
                if ((i - l) < (r - i)) res[i] = 'R';
                else if ((r - i) < (i - l)) res[i] = 'L';
            } else if (leftForce == 'R') {
                res[i] = 'R';
            } else if (rightForce == 'L') {
                res[i] = 'L';
            }
        }

        return new string(res);
    }
}
```

```go
func pushDominoes(dominoes string) string {
    n := len(dominoes)
    res := []byte(dominoes)

    for i := 0; i < n; i++ {
        if dominoes[i] != '.' {
            continue
        }

        l, r := i-1, i+1

        for l >= 0 && dominoes[l] == '.' {
            l--
        }
        for r < n && dominoes[r] == '.' {
            r++
        }

        var leftForce, rightForce byte = ' ', ' '
        if l >= 0 {
            leftForce = dominoes[l]
        }
        if r < n {
            rightForce = dominoes[r]
        }

        if leftForce == 'R' && rightForce == 'L' {
            if (i - l) < (r - i) {
                res[i] = 'R'
            } else if (r - i) < (i - l) {
                res[i] = 'L'
            }
        } else if leftForce == 'R' {
            res[i] = 'R'
        } else if rightForce == 'L' {
            res[i] = 'L'
        }
    }

    return string(res)
}
```

```kotlin
class Solution {
    fun pushDominoes(dominoes: String): String {
        val n = dominoes.length
        val res = dominoes.toCharArray()

        for (i in 0 until n) {
            if (dominoes[i] != '.') continue

            var l = i - 1
            var r = i + 1

            while (l >= 0 && dominoes[l] == '.') l--
            while (r < n && dominoes[r] == '.') r++

            val leftForce = if (l >= 0) dominoes[l] else ' '
            val rightForce = if (r < n) dominoes[r] else ' '

            if (leftForce == 'R' && rightForce == 'L') {
                if ((i - l) < (r - i)) res[i] = 'R'
                else if ((r - i) < (i - l)) res[i] = 'L'
            } else if (leftForce == 'R') {
                res[i] = 'R'
            } else if (rightForce == 'L') {
                res[i] = 'L'
            }
        }

        return String(res)
    }
}
```

```swift
class Solution {
    func pushDominoes(_ dominoes: String) -> String {
        let n = dominoes.count
        var res = Array(dominoes)
        let chars = Array(dominoes)

        for i in 0..<n {
            if chars[i] != "." { continue }

            var l = i - 1
            var r = i + 1

            while l >= 0 && chars[l] == "." { l -= 1 }
            while r < n && chars[r] == "." { r += 1 }

            let leftForce: Character = l >= 0 ? chars[l] : " "
            let rightForce: Character = r < n ? chars[r] : " "

            if leftForce == "R" && rightForce == "L" {
                if (i - l) < (r - i) { res[i] = "R" }
                else if (r - i) < (i - l) { res[i] = "L" }
            } else if leftForce == "R" {
                res[i] = "R"
            } else if rightForce == "L" {
                res[i] = "L"
            }
        }

        return String(res)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n)$ for only the output string.

---

## 2. Force From Left & Right

### Intuition

Instead of checking neighbors for each domino individually, we can precompute how far each position is from the nearest pushing force. We make two passes: one from left to right tracking distance from the last 'R', and one from right to left tracking distance from the last 'L'. At each position, we compare these distances to determine which force dominates.

### Algorithm

1. Create two arrays `left` and `right` initialized to infinity.
2. Left-to-right pass: track the distance from the most recent 'R'. Reset when hitting 'L'.
3. Right-to-left pass: track the distance from the most recent 'L'. Reset when hitting 'R'.
4. For each position, compare `left[i]` and `right[i]`:
   - If `left[i] < right[i]`, the domino falls left.
   - If `right[i] < left[i]`, the domino falls right.
   - If equal, forces cancel and it stays upright.
5. Return the result string.

::tabs-start

```python
class Solution:
    def pushDominoes(self, dominoes: str) -> str:
        n = len(dominoes)
        left = [float('inf')] * n
        right = [float('inf')] * n
        res = list(dominoes)

        force = float('inf')
        for i in range(n):
            if dominoes[i] == 'R':
                force = 0
            elif dominoes[i] == 'L':
                force = float('inf')
            else:
                force += 1
            right[i] = force

        force = float('inf')
        for i in range(n - 1, -1, -1):
            if dominoes[i] == 'L':
                force = 0
            elif dominoes[i] == 'R':
                force = float('inf')
            else:
                force += 1
            left[i] = force

        for i in range(n):
            if left[i] < right[i]:
                res[i] = 'L'
            elif right[i] < left[i]:
                res[i] = 'R'

        return "".join(res)
```

```java
public class Solution {
    public String pushDominoes(String dominoes) {
        int n = dominoes.length();
        int[] left = new int[n];
        int[] right = new int[n];
        char[] res = dominoes.toCharArray();

        int force = Integer.MAX_VALUE;
        for (int i = 0; i < n; i++) {
            if (dominoes.charAt(i) == 'R') {
                force = 0;
            } else if (dominoes.charAt(i) == 'L') {
                force = Integer.MAX_VALUE;
            } else {
                force = force == Integer.MAX_VALUE ? Integer.MAX_VALUE : force + 1;
            }
            right[i] = force;
        }

        force = Integer.MAX_VALUE;
        for (int i = n - 1; i >= 0; i--) {
            if (dominoes.charAt(i) == 'L') {
                force = 0;
            } else if (dominoes.charAt(i) == 'R') {
                force = Integer.MAX_VALUE;
            } else {
                force = force == Integer.MAX_VALUE ? Integer.MAX_VALUE : force + 1;
            }
            left[i] = force;
        }

        for (int i = 0; i < n; i++) {
            if (left[i] < right[i]) {
                res[i] = 'L';
            } else if (right[i] < left[i]) {
                res[i] = 'R';
            }
        }

        return new String(res);
    }
}
```

```cpp
class Solution {
public:
    string pushDominoes(string dominoes) {
        int n = dominoes.size();
        vector<int> left(n, INT_MAX);
        vector<int> right(n, INT_MAX);
        vector<char> res(dominoes.begin(), dominoes.end());

        int force = INT_MAX;
        for (int i = 0; i < n; i++) {
            if (dominoes[i] == 'R') {
                force = 0;
            } else if (dominoes[i] == 'L') {
                force = INT_MAX;
            } else {
                force = (force == INT_MAX) ? INT_MAX : force + 1;
            }
            right[i] = force;
        }

        force = INT_MAX;
        for (int i = n - 1; i >= 0; i--) {
            if (dominoes[i] == 'L') {
                force = 0;
            } else if (dominoes[i] == 'R') {
                force = INT_MAX;
            } else {
                force = (force == INT_MAX) ? INT_MAX : force + 1;
            }
            left[i] = force;
        }

        for (int i = 0; i < n; i++) {
            if (left[i] < right[i]) {
                res[i] = 'L';
            } else if (right[i] < left[i]) {
                res[i] = 'R';
            }
        }

        return string(res.begin(), res.end());
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} dominoes
     * @return {string}
     */
    pushDominoes(dominoes) {
        const n = dominoes.length;
        const left = new Array(n).fill(Infinity);
        const right = new Array(n).fill(Infinity);
        const res = dominoes.split('');

        let force = Infinity;
        for (let i = 0; i < n; i++) {
            if (dominoes[i] === 'R') {
                force = 0;
            } else if (dominoes[i] === 'L') {
                force = Infinity;
            } else {
                force = force === Infinity ? Infinity : force + 1;
            }
            right[i] = force;
        }

        force = Infinity;
        for (let i = n - 1; i >= 0; i--) {
            if (dominoes[i] === 'L') {
                force = 0;
            } else if (dominoes[i] === 'R') {
                force = Infinity;
            } else {
                force = force === Infinity ? Infinity : force + 1;
            }
            left[i] = force;
        }

        for (let i = 0; i < n; i++) {
            if (left[i] < right[i]) {
                res[i] = 'L';
            } else if (right[i] < left[i]) {
                res[i] = 'R';
            }
        }

        return res.join('');
    }
}
```

```csharp
public class Solution {
    public string PushDominoes(string dominoes) {
        int n = dominoes.Length;
        int[] left = new int[n];
        int[] right = new int[n];
        char[] res = dominoes.ToCharArray();
        Array.Fill(left, int.MaxValue);
        Array.Fill(right, int.MaxValue);

        int force = int.MaxValue;
        for (int i = 0; i < n; i++) {
            if (dominoes[i] == 'R') {
                force = 0;
            } else if (dominoes[i] == 'L') {
                force = int.MaxValue;
            } else {
                force = force == int.MaxValue ? int.MaxValue : force + 1;
            }
            right[i] = force;
        }

        force = int.MaxValue;
        for (int i = n - 1; i >= 0; i--) {
            if (dominoes[i] == 'L') {
                force = 0;
            } else if (dominoes[i] == 'R') {
                force = int.MaxValue;
            } else {
                force = force == int.MaxValue ? int.MaxValue : force + 1;
            }
            left[i] = force;
        }

        for (int i = 0; i < n; i++) {
            if (left[i] < right[i]) {
                res[i] = 'L';
            } else if (right[i] < left[i]) {
                res[i] = 'R';
            }
        }

        return new string(res);
    }
}
```

```go
func pushDominoes(dominoes string) string {
    n := len(dominoes)
    left := make([]int, n)
    right := make([]int, n)
    res := []byte(dominoes)
    const INF = 1 << 30

    for i := range left {
        left[i] = INF
        right[i] = INF
    }

    force := INF
    for i := 0; i < n; i++ {
        if dominoes[i] == 'R' {
            force = 0
        } else if dominoes[i] == 'L' {
            force = INF
        } else {
            if force != INF {
                force++
            }
        }
        right[i] = force
    }

    force = INF
    for i := n - 1; i >= 0; i-- {
        if dominoes[i] == 'L' {
            force = 0
        } else if dominoes[i] == 'R' {
            force = INF
        } else {
            if force != INF {
                force++
            }
        }
        left[i] = force
    }

    for i := 0; i < n; i++ {
        if left[i] < right[i] {
            res[i] = 'L'
        } else if right[i] < left[i] {
            res[i] = 'R'
        }
    }

    return string(res)
}
```

```kotlin
class Solution {
    fun pushDominoes(dominoes: String): String {
        val n = dominoes.length
        val left = IntArray(n) { Int.MAX_VALUE }
        val right = IntArray(n) { Int.MAX_VALUE }
        val res = dominoes.toCharArray()

        var force = Int.MAX_VALUE
        for (i in 0 until n) {
            when (dominoes[i]) {
                'R' -> force = 0
                'L' -> force = Int.MAX_VALUE
                else -> if (force != Int.MAX_VALUE) force++
            }
            right[i] = force
        }

        force = Int.MAX_VALUE
        for (i in n - 1 downTo 0) {
            when (dominoes[i]) {
                'L' -> force = 0
                'R' -> force = Int.MAX_VALUE
                else -> if (force != Int.MAX_VALUE) force++
            }
            left[i] = force
        }

        for (i in 0 until n) {
            if (left[i] < right[i]) {
                res[i] = 'L'
            } else if (right[i] < left[i]) {
                res[i] = 'R'
            }
        }

        return String(res)
    }
}
```

```swift
class Solution {
    func pushDominoes(_ dominoes: String) -> String {
        let n = dominoes.count
        let chars = Array(dominoes)
        var left = [Int](repeating: Int.max, count: n)
        var right = [Int](repeating: Int.max, count: n)
        var res = chars

        var force = Int.max
        for i in 0..<n {
            if chars[i] == "R" {
                force = 0
            } else if chars[i] == "L" {
                force = Int.max
            } else {
                if force != Int.max { force += 1 }
            }
            right[i] = force
        }

        force = Int.max
        for i in stride(from: n - 1, through: 0, by: -1) {
            if chars[i] == "L" {
                force = 0
            } else if chars[i] == "R" {
                force = Int.max
            } else {
                if force != Int.max { force += 1 }
            }
            left[i] = force
        }

        for i in 0..<n {
            if left[i] < right[i] {
                res[i] = "L"
            } else if right[i] < left[i] {
                res[i] = "R"
            }
        }

        return String(res)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 3. Simulation (Queue)

### Intuition

We can simulate the dominoes falling in real time using a queue. Initially, all dominoes that are already pushed ('L' or 'R') are added to the queue. We process them one by one, pushing adjacent dominoes as they fall. The key insight is handling collisions: when 'R' meets 'L' with one standing domino between them, that domino stays upright.

### Algorithm

1. Initialize a queue with all positions that have 'R' or 'L'.
2. Process each element from the queue:
   - For 'L': if the position to the left is '.', mark it as 'L' and add to queue.
   - For 'R': if the position to the right is '.', check if a collision with 'L' is about to happen. If so, skip both. Otherwise, mark it as 'R' and add to queue.
3. The collision check looks two positions ahead to see if an 'L' is coming.
4. Return the modified string.

::tabs-start

```python
class Solution:
    def pushDominoes(self, dominoes: str) -> str:
        dom = list(dominoes)
        q = deque()

        for i, d in enumerate(dom):
            if d != ".":
                q.append((i, d))

        while q:
            i, d = q.popleft()

            if d == "L" and i > 0 and dom[i - 1] == ".":
                q.append((i - 1, "L"))
                dom[i - 1] = "L"
            elif d == "R":
                if i + 1 < len(dom) and dom[i + 1] == ".":
                    if i + 2 < len(dom) and dom[i + 2] == "L":
                        q.popleft()
                    else:
                        q.append((i + 1, "R"))
                        dom[i + 1] = "R"

        return "".join(dom)
```

```java
public class Solution {
    public String pushDominoes(String dominoes) {
        char[] dom = dominoes.toCharArray();
        Queue<int[]> q = new LinkedList<>();

        for (int i = 0; i < dom.length; i++) {
            if (dom[i] != '.') {
                q.add(new int[] {i, dom[i]});
            }
        }

        while (!q.isEmpty()) {
            int[] curr = q.poll();
            int i = curr[0];
            char d = (char) curr[1];

            if (d == 'L' && i > 0 && dom[i - 1] == '.') {
                q.add(new int[] {i - 1, 'L'});
                dom[i - 1] = 'L';
            } else if (d == 'R') {
                if (i + 1 < dom.length && dom[i + 1] == '.') {
                    if (i + 2 < dom.length && dom[i + 2] == 'L') {
                        q.poll();
                    } else {
                        q.add(new int[] {i + 1, 'R'});
                        dom[i + 1] = 'R';
                    }
                }
            }
        }

        return new String(dom);
    }
}
```

```cpp
class Solution {
public:
    string pushDominoes(string dominoes) {
        vector<char> dom(dominoes.begin(), dominoes.end());
        queue<pair<int, char>> q;

        for (int i = 0; i < dom.size(); i++) {
            if (dom[i] != '.') {
                q.push({i, dom[i]});
            }
        }

        while (!q.empty()) {
            auto [i, d] = q.front();
            q.pop();

            if (d == 'L' && i > 0 && dom[i - 1] == '.') {
                q.push({i - 1, 'L'});
                dom[i - 1] = 'L';
            } else if (d == 'R') {
                if (i + 1 < dom.size() && dom[i + 1] == '.') {
                    if (i + 2 < dom.size() && dom[i + 2] == 'L') {
                        q.pop();
                    } else {
                        q.push({i + 1, 'R'});
                        dom[i + 1] = 'R';
                    }
                }
            }
        }

        return string(dom.begin(), dom.end());
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} dominoes
     * @return {string}
     */
    pushDominoes(dominoes) {
        const dom = dominoes.split('');
        const q = new Queue();

        for (let i = 0; i < dom.length; i++) {
            if (dom[i] !== '.') {
                q.push([i, dom[i]]);
            }
        }

        while (!q.isEmpty()) {
            const [i, d] = q.pop();

            if (d === 'L' && i > 0 && dom[i - 1] === '.') {
                q.push([i - 1, 'L']);
                dom[i - 1] = 'L';
            } else if (d === 'R') {
                if (i + 1 < dom.length && dom[i + 1] === '.') {
                    if (i + 2 < dom.length && dom[i + 2] === 'L') {
                        q.pop();
                    } else {
                        q.push([i + 1, 'R']);
                        dom[i + 1] = 'R';
                    }
                }
            }
        }

        return dom.join('');
    }
}
```

```csharp
public class Solution {
    public string PushDominoes(string dominoes) {
        char[] dom = dominoes.ToCharArray();
        Queue<int[]> q = new Queue<int[]>();

        for (int i = 0; i < dom.Length; i++) {
            if (dom[i] != '.') {
                q.Enqueue(new int[] { i, dom[i] });
            }
        }

        while (q.Count > 0) {
            int[] curr = q.Dequeue();
            int i = curr[0];
            char d = (char)curr[1];

            if (d == 'L' && i > 0 && dom[i - 1] == '.') {
                q.Enqueue(new int[] { i - 1, 'L' });
                dom[i - 1] = 'L';
            } else if (d == 'R') {
                if (i + 1 < dom.Length && dom[i + 1] == '.') {
                    if (i + 2 < dom.Length && dom[i + 2] == 'L') {
                        q.Dequeue();
                    } else {
                        q.Enqueue(new int[] { i + 1, 'R' });
                        dom[i + 1] = 'R';
                    }
                }
            }
        }

        return new string(dom);
    }
}
```

```go
func pushDominoes(dominoes string) string {
    dom := []byte(dominoes)
    q := [][2]int{}

    for i := 0; i < len(dom); i++ {
        if dom[i] != '.' {
            q = append(q, [2]int{i, int(dom[i])})
        }
    }

    for len(q) > 0 {
        curr := q[0]
        q = q[1:]
        i, d := curr[0], byte(curr[1])

        if d == 'L' && i > 0 && dom[i-1] == '.' {
            q = append(q, [2]int{i - 1, int('L')})
            dom[i-1] = 'L'
        } else if d == 'R' {
            if i+1 < len(dom) && dom[i+1] == '.' {
                if i+2 < len(dom) && dom[i+2] == 'L' {
                    q = q[1:]
                } else {
                    q = append(q, [2]int{i + 1, int('R')})
                    dom[i+1] = 'R'
                }
            }
        }
    }

    return string(dom)
}
```

```kotlin
class Solution {
    fun pushDominoes(dominoes: String): String {
        val dom = dominoes.toCharArray()
        val q: ArrayDeque<Pair<Int, Char>> = ArrayDeque()

        for (i in dom.indices) {
            if (dom[i] != '.') {
                q.addLast(Pair(i, dom[i]))
            }
        }

        while (q.isNotEmpty()) {
            val (i, d) = q.removeFirst()

            if (d == 'L' && i > 0 && dom[i - 1] == '.') {
                q.addLast(Pair(i - 1, 'L'))
                dom[i - 1] = 'L'
            } else if (d == 'R') {
                if (i + 1 < dom.size && dom[i + 1] == '.') {
                    if (i + 2 < dom.size && dom[i + 2] == 'L') {
                        q.removeFirst()
                    } else {
                        q.addLast(Pair(i + 1, 'R'))
                        dom[i + 1] = 'R'
                    }
                }
            }
        }

        return String(dom)
    }
}
```

```swift
class Solution {
    func pushDominoes(_ dominoes: String) -> String {
        var dom = Array(dominoes)
        var q: [(Int, Character)] = []

        for i in 0..<dom.count {
            if dom[i] != "." {
                q.append((i, dom[i]))
            }
        }

        var idx = 0
        while idx < q.count {
            let (i, d) = q[idx]
            idx += 1

            if d == "L" && i > 0 && dom[i - 1] == "." {
                q.append((i - 1, "L"))
                dom[i - 1] = "L"
            } else if d == "R" {
                if i + 1 < dom.count && dom[i + 1] == "." {
                    if i + 2 < dom.count && dom[i + 2] == "L" {
                        idx += 1
                    } else {
                        q.append((i + 1, "R"))
                        dom[i + 1] = "R"
                    }
                }
            }
        }

        return String(dom)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 4. Iteration (Greedy)

### Intuition

We can process the string in one pass by tracking whether we've seen an 'R' that might affect upcoming dominoes. As we iterate, we count consecutive dots and decide their fate when we hit an 'L' or 'R'. The key cases are: dots between 'R' and 'L' split in half, dots after 'R' all fall right, and dots before 'L' (with no prior 'R') all fall left.

### Algorithm

1. Track the count of consecutive dots and whether we've seen an unresolved 'R'.
2. When encountering 'R':
   - If a previous 'R' exists, all dots since then fall right.
   - Otherwise, keep the dots as is.
   - Mark that we now have an active 'R'.
3. When encountering 'L':
   - If a previous 'R' exists, split the dots: half fall right, half fall left, with a possible middle dot staying upright if the count is odd.
   - Otherwise, all dots and the current 'L' fall left.
4. Handle trailing dots at the end based on whether an 'R' is active.
5. Return the constructed result.

::tabs-start

```python
class Solution:
    def pushDominoes(self, dominoes: str) -> str:
        res = []
        dots = 0
        R = False

        for d in dominoes:
            if d == '.':
                dots += 1
            elif d == 'R':
                if R:
                    # Previous was 'R', and current is also 'R'.
                    # Append 'R' for all the dots between them.
                    res.append('R' * (dots + 1))
                elif dots > 0:
                    # Previous was not 'R'. The previous dots remain unchanged.
                    res.append('.' * dots)
                dots = 0
                R = True  # Current is 'R'
            else:
                if R:
                    # Append the previous 'R'.
                    res.append('R')
                    if dots > 0:
                        # Half the dots are affected by the previous 'R'.
                        res.append('R' * (dots // 2))

                        # Add a '.' if there's an odd number of dots.
                        if (dots % 2) != 0:
                            res.append('.')

                        # Append half the dots as 'L'.
                        res.append('L' * (dots // 2))

                    # Append the current 'L'.
                    res.append('L')
                    R, dots = False, 0
                else:
                    # There is no 'R' on the left.
                    # Append 'L' for all the dots and the current 'L'.
                    res.append('L' * (dots + 1))
                    dots = 0

        if R:
            # Trailing dots are affected by the last 'R'.
            res.append('R' * (dots + 1))
        else:
            # Trailing dots remain unchanged as there is no previous 'R'.
            res.append('.' * dots)

        return ''.join(res)
```

```java
public class Solution {
    public String pushDominoes(String dominoes) {
        StringBuilder res = new StringBuilder();
        int dots = 0;
        boolean R = false;

        for (char d : dominoes.toCharArray()) {
            if (d == '.') {
                dots++;
            } else if (d == 'R') {
                if (R) {
                    // Previous was 'R', and current is also 'R'.
                    // Append 'R' for all the dots between them.
                    res.append("R".repeat(dots + 1));
                } else if (dots > 0) {
                    // Previous was not 'R'. The previous dots remain unchanged.
                    res.append(".".repeat(dots));
                }
                dots = 0;
                R = true; // Current is 'R'.
            } else {
                if (R) {
                    // Append the previous 'R'.
                    res.append("R");
                    if (dots > 0) {
                        // Half the dots are affected by the previous 'R'.
                        res.append("R".repeat(dots / 2));

                        // Add a '.' if there's an odd number of dots.
                        if (dots % 2 != 0) {
                            res.append(".");
                        }

                        // Append half the dots as 'L'.
                        res.append("L".repeat(dots / 2));
                    }
                    // Append the current 'L'.
                    res.append("L");
                    R = false;
                    dots = 0;
                } else {
                    // There is no 'R' on the left.
                    // Append 'L' for all the dots and the current 'L'.
                    res.append("L".repeat(dots + 1));
                    dots = 0;
                }
            }
        }

        if (R) {
            // Trailing dots are affected by the last 'R'.
            res.append("R".repeat(dots + 1));
        } else {
            // Trailing dots remain unchanged as there is no previous 'R'.
            res.append(".".repeat(dots));
        }

        return res.toString();
    }
}
```

```cpp
class Solution {
public:
    string pushDominoes(string dominoes) {
        string res = "";
        int dots = 0;
        bool R = false;

        for (char d : dominoes) {
            if (d == '.') {
                dots++;
            } else if (d == 'R') {
                if (R) {
                    // Previous was 'R', and current is also 'R'.
                    // Append 'R' for all the dots between them.
                    res += string(dots + 1, 'R');
                } else if (dots > 0) {
                    // Previous was not 'R'. The previous dots remain unchanged.
                    res += string(dots, '.');
                }
                dots = 0;
                R = true; // Current is 'R'.
            } else {
                if (R) {
                    // Append the previous 'R'.
                    res += 'R';
                    if (dots > 0) {
                        // Half the dots are affected by the previous 'R'.
                        res += string(dots / 2, 'R');

                        // Add a '.' if there's an odd number of dots.
                        if (dots % 2 != 0) {
                            res += '.';
                        }

                        // Append half the dots as 'L'.
                        res += string(dots / 2, 'L');
                    }
                    // Append the current 'L'.
                    res += 'L';
                    R = false;
                    dots = 0;
                } else {
                    // There is no 'R' on the left.
                    // Append 'L' for all the dots and the current 'L'.
                    res += string(dots + 1, 'L');
                    dots = 0;
                }
            }
        }

        if (R) {
            // Trailing dots are affected by the last 'R'.
            res += string(dots + 1, 'R');
        } else {
            // Trailing dots remain unchanged as there is no previous 'R'.
            res += string(dots, '.');
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} dominoes
     * @return {string}
     */
    pushDominoes(dominoes) {
        let res = [];
        let dots = 0;
        let R = false;

        for (let d of dominoes) {
            if (d === '.') {
                dots++;
            } else if (d === 'R') {
                if (R) {
                    // Previous was 'R', and current is also 'R'.
                    // Append 'R' for all the dots between them.
                    res.push('R'.repeat(dots + 1));
                } else if (dots > 0) {
                    // Previous was not 'R'. The previous dots remain unchanged.
                    res.push('.'.repeat(dots));
                }
                dots = 0;
                R = true; // Current is 'R'.
            } else {
                if (R) {
                    // Append the previous 'R'.
                    res.push('R');
                    if (dots > 0) {
                        // Half the dots are affected by the previous 'R'.
                        res.push('R'.repeat(Math.floor(dots / 2)));

                        // Add a '.' if there's an odd number of dots.
                        if (dots % 2 !== 0) {
                            res.push('.');
                        }

                        // Append half the dots as 'L'.
                        res.push('L'.repeat(Math.floor(dots / 2)));
                    }
                    // Append the current 'L'.
                    res.push('L');
                    R = false;
                    dots = 0;
                } else {
                    // There is no 'R' on the left.
                    // Append 'L' for all the dots and the current 'L'.
                    res.push('L'.repeat(dots + 1));
                    dots = 0;
                }
            }
        }

        if (R) {
            // Trailing dots are affected by the last 'R'.
            res.push('R'.repeat(dots + 1));
        } else {
            // Trailing dots remain unchanged as there is no previous 'R'.
            res.push('.'.repeat(dots));
        }

        return res.join('');
    }
}
```

```csharp
public class Solution {
    public string PushDominoes(string dominoes) {
        var res = new System.Text.StringBuilder();
        int dots = 0;
        bool R = false;

        foreach (char d in dominoes) {
            if (d == '.') {
                dots++;
            } else if (d == 'R') {
                if (R) {
                    res.Append(new string('R', dots + 1));
                } else if (dots > 0) {
                    res.Append(new string('.', dots));
                }
                dots = 0;
                R = true;
            } else {
                if (R) {
                    res.Append('R');
                    if (dots > 0) {
                        res.Append(new string('R', dots / 2));
                        if (dots % 2 != 0) {
                            res.Append('.');
                        }
                        res.Append(new string('L', dots / 2));
                    }
                    res.Append('L');
                    R = false;
                    dots = 0;
                } else {
                    res.Append(new string('L', dots + 1));
                    dots = 0;
                }
            }
        }

        if (R) {
            res.Append(new string('R', dots + 1));
        } else {
            res.Append(new string('.', dots));
        }

        return res.ToString();
    }
}
```

```go
func pushDominoes(dominoes string) string {
    var res strings.Builder
    dots := 0
    R := false

    for _, d := range dominoes {
        if d == '.' {
            dots++
        } else if d == 'R' {
            if R {
                res.WriteString(strings.Repeat("R", dots+1))
            } else if dots > 0 {
                res.WriteString(strings.Repeat(".", dots))
            }
            dots = 0
            R = true
        } else {
            if R {
                res.WriteByte('R')
                if dots > 0 {
                    res.WriteString(strings.Repeat("R", dots/2))
                    if dots%2 != 0 {
                        res.WriteByte('.')
                    }
                    res.WriteString(strings.Repeat("L", dots/2))
                }
                res.WriteByte('L')
                R = false
                dots = 0
            } else {
                res.WriteString(strings.Repeat("L", dots+1))
                dots = 0
            }
        }
    }

    if R {
        res.WriteString(strings.Repeat("R", dots+1))
    } else {
        res.WriteString(strings.Repeat(".", dots))
    }

    return res.String()
}
```

```kotlin
class Solution {
    fun pushDominoes(dominoes: String): String {
        val res = StringBuilder()
        var dots = 0
        var R = false

        for (d in dominoes) {
            when (d) {
                '.' -> dots++
                'R' -> {
                    if (R) {
                        res.append("R".repeat(dots + 1))
                    } else if (dots > 0) {
                        res.append(".".repeat(dots))
                    }
                    dots = 0
                    R = true
                }
                'L' -> {
                    if (R) {
                        res.append('R')
                        if (dots > 0) {
                            res.append("R".repeat(dots / 2))
                            if (dots % 2 != 0) {
                                res.append('.')
                            }
                            res.append("L".repeat(dots / 2))
                        }
                        res.append('L')
                        R = false
                        dots = 0
                    } else {
                        res.append("L".repeat(dots + 1))
                        dots = 0
                    }
                }
            }
        }

        if (R) {
            res.append("R".repeat(dots + 1))
        } else {
            res.append(".".repeat(dots))
        }

        return res.toString()
    }
}
```

```swift
class Solution {
    func pushDominoes(_ dominoes: String) -> String {
        var res = ""
        var dots = 0
        var R = false

        for d in dominoes {
            if d == "." {
                dots += 1
            } else if d == "R" {
                if R {
                    res += String(repeating: "R", count: dots + 1)
                } else if dots > 0 {
                    res += String(repeating: ".", count: dots)
                }
                dots = 0
                R = true
            } else {
                if R {
                    res += "R"
                    if dots > 0 {
                        res += String(repeating: "R", count: dots / 2)
                        if dots % 2 != 0 {
                            res += "."
                        }
                        res += String(repeating: "L", count: dots / 2)
                    }
                    res += "L"
                    R = false
                    dots = 0
                } else {
                    res += String(repeating: "L", count: dots + 1)
                    dots = 0
                }
            }
        }

        if R {
            res += String(repeating: "R", count: dots + 1)
        } else {
            res += String(repeating: ".", count: dots)
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$ for only the output string.

---

## Common Pitfalls

### Ignoring Force Cancellation

When an 'R' force from the left and an 'L' force from the right reach the same domino at equal distances, they cancel out and the domino remains upright. Failing to handle this case by always picking one direction produces incorrect results for inputs like "R...L" where the middle dot should stay as '.'.

### Not Handling Boundary Cases

Dominoes at the edges may only have force from one direction. A domino with 'R' to its left but no 'L' to its right should fall right indefinitely. Similarly, 'L' without a preceding 'R' affects all dots to its left. Forgetting to check boundary conditions leads to index errors or missed updates.

### Incorrect Distance Comparison

When comparing distances from 'R' and 'L' forces, using the wrong comparison operator or miscalculating distances leads to dominoes falling in the wrong direction. The closer force wins, so if `distanceFromR < distanceFromL`, the domino falls right, not left.
