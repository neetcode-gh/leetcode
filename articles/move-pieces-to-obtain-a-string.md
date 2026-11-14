## 1. Brute Force (BFS)

::tabs-start

```python
class Solution:
    def canChange(self, start: str, target: str) -> bool:
        n = len(start)
        visit = {start}
        q = deque([start])

        while q:
            cur = q.popleft()
            if cur == target:
                return True
            for i in range(n - 1):
                pair = cur[i:i + 2]
                if pair == '_L' or pair == 'R_':
                    nxt = cur[:i] + pair[::-1] + cur[i + 2:]
                    if nxt not in visit:
                        visit.add(nxt)
                        q.append(nxt)
        return False
```

```java
public class Solution {
    public boolean canChange(String start, String target) {
        int n = start.length();
        Set<String> visit = new HashSet<>();
        Queue<String> q = new LinkedList<>();
        visit.add(start);
        q.offer(start);

        while (!q.isEmpty()) {
            String cur = q.poll();
            if (cur.equals(target)) {
                return true;
            }
            for (int i = 0; i < n - 1; i++) {
                char a = cur.charAt(i);
                char b = cur.charAt(i + 1);
                if ((a == '_' && b == 'L') || (a == 'R' && b == '_')) {
                    char[] chars = cur.toCharArray();
                    chars[i] = b;
                    chars[i + 1] = a;
                    String next = new String(chars);
                    if (visit.add(next)) {
                        q.offer(next);
                    }
                }
            }
        }
        return false;
    }
}
```

```cpp
class Solution {
public:
    bool canChange(string start, string target) {
        int n = start.size();
        unordered_set<string> visit = {start};
        queue<string> q;
        q.push(start);

        while (!q.empty()) {
            string cur = q.front();
            q.pop();
            if (cur == target) {
                return true;
            }
            for (int i = 0; i < n - 1; i++) {
                if ((cur[i] == '_' && cur[i + 1] == 'L') || (cur[i] == 'R' && cur[i + 1] == '_')) {
                    string next = cur;
                    swap(next[i], next[i + 1]);
                    if (visit.insert(next).second) {
                        q.push(next);
                    }
                }
            }
        }
        return false;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} start
     * @param {string} target
     * @return {boolean}
     */
    canChange(start, target) {
        const n = start.length;
        const visit = new Set([start]);
        const q = new Queue([start]);

        while (!q.isEmpty()) {
            const cur = q.pop();
            if (cur === target) {
                return true;
            }
            for (let i = 0; i < n - 1; i++) {
                const pair = cur[i] + cur[i + 1];
                if (pair === '_L' || pair === 'R_') {
                    const next = cur.slice(0, i) + cur[i + 1] + cur[i] + cur.slice(i + 2);
                    if (!visit.has(next)) {
                        visit.add(next);
                        q.push(next);
                    }
                }
            }
        }
        return false;
    }
}
```

```csharp
public class Solution {
    public bool CanChange(string start, string target) {
        int n = start.Length;
        var visit = new HashSet<string> { start };
        var q = new Queue<string>();
        q.Enqueue(start);

        while (q.Count > 0) {
            string cur = q.Dequeue();
            if (cur == target) {
                return true;
            }
            for (int i = 0; i < n - 1; i++) {
                if ((cur[i] == '_' && cur[i + 1] == 'L') || (cur[i] == 'R' && cur[i + 1] == '_')) {
                    char[] chars = cur.ToCharArray();
                    (chars[i], chars[i + 1]) = (chars[i + 1], chars[i]);
                    string next = new string(chars);
                    if (visit.Add(next)) {
                        q.Enqueue(next);
                    }
                }
            }
        }
        return false;
    }
}
```

```go
func canChange(start string, target string) bool {
    n := len(start)
    visit := map[string]bool{start: true}
    q := []string{start}

    for len(q) > 0 {
        cur := q[0]
        q = q[1:]
        if cur == target {
            return true
        }
        for i := 0; i < n-1; i++ {
            if (cur[i] == '_' && cur[i+1] == 'L') || (cur[i] == 'R' && cur[i+1] == '_') {
                chars := []byte(cur)
                chars[i], chars[i+1] = chars[i+1], chars[i]
                next := string(chars)
                if !visit[next] {
                    visit[next] = true
                    q = append(q, next)
                }
            }
        }
    }
    return false
}
```

```kotlin
class Solution {
    fun canChange(start: String, target: String): Boolean {
        val n = start.length
        val visit = hashSetOf(start)
        val q = ArrayDeque<String>()
        q.add(start)

        while (q.isNotEmpty()) {
            val cur = q.removeFirst()
            if (cur == target) {
                return true
            }
            for (i in 0 until n - 1) {
                if ((cur[i] == '_' && cur[i + 1] == 'L') || (cur[i] == 'R' && cur[i + 1] == '_')) {
                    val chars = cur.toCharArray()
                    chars[i] = cur[i + 1]
                    chars[i + 1] = cur[i]
                    val next = String(chars)
                    if (visit.add(next)) {
                        q.add(next)
                    }
                }
            }
        }
        return false
    }
}
```

```swift
class Solution {
    func canChange(_ start: String, _ target: String) -> Bool {
        let n = start.count
        let goal = Array(target)
        var visit: Set<[Character]> = [Array(start)]
        var q = [Array(start)]
        var head = 0

        while head < q.count {
            let cur = q[head]
            head += 1
            if cur == goal {
                return true
            }
            for i in 0..<(n - 1) {
                if (cur[i] == "_" && cur[i + 1] == "L") || (cur[i] == "R" && cur[i + 1] == "_") {
                    var next = cur
                    next.swapAt(i, i + 1)
                    if visit.insert(next).inserted {
                        q.append(next)
                    }
                }
            }
        }
        return false
    }
}
```

```rust
use std::collections::{HashSet, VecDeque};

impl Solution {
    pub fn can_change(start: String, target: String) -> bool {
        let n = start.len();
        let start = start.into_bytes();
        let target = target.into_bytes();
        let mut visit = HashSet::new();
        let mut q = VecDeque::new();
        visit.insert(start.clone());
        q.push_back(start);

        while let Some(cur) = q.pop_front() {
            if cur == target {
                return true;
            }
            for i in 0..n - 1 {
                if (cur[i] == b'_' && cur[i + 1] == b'L') || (cur[i] == b'R' && cur[i + 1] == b'_') {
                    let mut next = cur.clone();
                    next.swap(i, i + 1);
                    if visit.insert(next.clone()) {
                        q.push_back(next);
                    }
                }
            }
        }
        false
    }
}
```

```typescript
class Solution {
    /**
     * @param {string} start
     * @param {string} target
     * @return {boolean}
     */
    canChange(start: string, target: string): boolean {
        const n = start.length;
        const visit = new Set<string>([start]);
        const q = new Queue([start]);

        while (!q.isEmpty()) {
            const cur = q.pop() as string;
            if (cur === target) {
                return true;
            }
            for (let i = 0; i < n - 1; i++) {
                const pair = cur[i] + cur[i + 1];
                if (pair === '_L' || pair === 'R_') {
                    const next = cur.slice(0, i) + cur[i + 1] + cur[i] + cur.slice(i + 2);
                    if (!visit.has(next)) {
                        visit.add(next);
                        q.push(next);
                    }
                }
            }
        }
        return false;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2 * 2 ^ n)$
- Space complexity: $O(n * 2 ^ n)$

> Where $n$ is the length of the strings $start$ and $target$.

---

## 2. Queue

::tabs-start

```python
class Solution:
    def canChange(self, start: str, target: str) -> bool:
        n = len(start)
        startQ, targetQ = deque(), deque()
        for i in range(n):
            if start[i] != '_':
                startQ.append(i)
            if target[i] != '_':
                targetQ.append(i)

        if len(startQ) != len(targetQ):
            return False

        while startQ:
            i = startQ.popleft()
            j = targetQ.popleft()
            if start[i] != target[j]:
                return False
            if start[i] == 'L' and i < j:
                return False
            if start[i] == 'R' and i > j:
                return False
        return True
```

```java
public class Solution {
    public boolean canChange(String start, String target) {
        int n = start.length();
        Queue<Integer> startQ = new LinkedList<>();
        Queue<Integer> targetQ = new LinkedList<>();
        for (int i = 0; i < n; i++) {
            if (start.charAt(i) != '_') {
                startQ.offer(i);
            }
            if (target.charAt(i) != '_') {
                targetQ.offer(i);
            }
        }

        if (startQ.size() != targetQ.size()) {
            return false;
        }

        while (!startQ.isEmpty()) {
            int i = startQ.poll();
            int j = targetQ.poll();
            char c = start.charAt(i);
            if (c != target.charAt(j)) {
                return false;
            }
            if (c == 'L' && i < j) {
                return false;
            }
            if (c == 'R' && i > j) {
                return false;
            }
        }
        return true;
    }
}
```

```cpp
class Solution {
public:
    bool canChange(string start, string target) {
        int n = start.size();
        queue<int> startQ, targetQ;
        for (int i = 0; i < n; i++) {
            if (start[i] != '_') {
                startQ.push(i);
            }
            if (target[i] != '_') {
                targetQ.push(i);
            }
        }

        if (startQ.size() != targetQ.size()) {
            return false;
        }

        while (!startQ.empty()) {
            int i = startQ.front();
            int j = targetQ.front();
            startQ.pop();
            targetQ.pop();
            if (start[i] != target[j]) {
                return false;
            }
            if (start[i] == 'L' && i < j) {
                return false;
            }
            if (start[i] == 'R' && i > j) {
                return false;
            }
        }
        return true;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} start
     * @param {string} target
     * @return {boolean}
     */
    canChange(start, target) {
        const n = start.length;
        const startQ = new Queue();
        const targetQ = new Queue();
        for (let i = 0; i < n; i++) {
            if (start[i] !== '_') {
                startQ.push(i);
            }
            if (target[i] !== '_') {
                targetQ.push(i);
            }
        }

        if (startQ.size() !== targetQ.size()) {
            return false;
        }

        while (!startQ.isEmpty()) {
            const i = startQ.pop();
            const j = targetQ.pop();
            if (start[i] !== target[j]) {
                return false;
            }
            if (start[i] === 'L' && i < j) {
                return false;
            }
            if (start[i] === 'R' && i > j) {
                return false;
            }
        }
        return true;
    }
}
```

```csharp
public class Solution {
    public bool CanChange(string start, string target) {
        int n = start.Length;
        var startQ = new Queue<int>();
        var targetQ = new Queue<int>();
        for (int i = 0; i < n; i++) {
            if (start[i] != '_') {
                startQ.Enqueue(i);
            }
            if (target[i] != '_') {
                targetQ.Enqueue(i);
            }
        }

        if (startQ.Count != targetQ.Count) {
            return false;
        }

        while (startQ.Count > 0) {
            int i = startQ.Dequeue();
            int j = targetQ.Dequeue();
            if (start[i] != target[j]) {
                return false;
            }
            if (start[i] == 'L' && i < j) {
                return false;
            }
            if (start[i] == 'R' && i > j) {
                return false;
            }
        }
        return true;
    }
}
```

```go
func canChange(start string, target string) bool {
    n := len(start)
    startQ, targetQ := []int{}, []int{}
    for i := 0; i < n; i++ {
        if start[i] != '_' {
            startQ = append(startQ, i)
        }
        if target[i] != '_' {
            targetQ = append(targetQ, i)
        }
    }

    if len(startQ) != len(targetQ) {
        return false
    }

    for len(startQ) > 0 {
        i, j := startQ[0], targetQ[0]
        startQ, targetQ = startQ[1:], targetQ[1:]
        if start[i] != target[j] {
            return false
        }
        if start[i] == 'L' && i < j {
            return false
        }
        if start[i] == 'R' && i > j {
            return false
        }
    }
    return true
}
```

```kotlin
class Solution {
    fun canChange(start: String, target: String): Boolean {
        val n = start.length
        val startQ = ArrayDeque<Int>()
        val targetQ = ArrayDeque<Int>()
        for (i in 0 until n) {
            if (start[i] != '_') {
                startQ.add(i)
            }
            if (target[i] != '_') {
                targetQ.add(i)
            }
        }

        if (startQ.size != targetQ.size) {
            return false
        }

        while (startQ.isNotEmpty()) {
            val i = startQ.removeFirst()
            val j = targetQ.removeFirst()
            if (start[i] != target[j]) {
                return false
            }
            if (start[i] == 'L' && i < j) {
                return false
            }
            if (start[i] == 'R' && i > j) {
                return false
            }
        }
        return true
    }
}
```

```swift
class Solution {
    func canChange(_ start: String, _ target: String) -> Bool {
        let s = Array(start), t = Array(target)
        let n = s.count
        var startQ = [Int](), targetQ = [Int]()
        for i in 0..<n {
            if s[i] != "_" {
                startQ.append(i)
            }
            if t[i] != "_" {
                targetQ.append(i)
            }
        }

        if startQ.count != targetQ.count {
            return false
        }

        var head = 0
        while head < startQ.count {
            let i = startQ[head], j = targetQ[head]
            head += 1
            if s[i] != t[j] {
                return false
            }
            if s[i] == "L" && i < j {
                return false
            }
            if s[i] == "R" && i > j {
                return false
            }
        }
        return true
    }
}
```

```rust
use std::collections::VecDeque;

impl Solution {
    pub fn can_change(start: String, target: String) -> bool {
        let s = start.as_bytes();
        let t = target.as_bytes();
        let mut start_q = VecDeque::new();
        let mut target_q = VecDeque::new();
        for i in 0..s.len() {
            if s[i] != b'_' {
                start_q.push_back(i);
            }
            if t[i] != b'_' {
                target_q.push_back(i);
            }
        }

        if start_q.len() != target_q.len() {
            return false;
        }

        while let (Some(i), Some(j)) = (start_q.pop_front(), target_q.pop_front()) {
            if s[i] != t[j] {
                return false;
            }
            if s[i] == b'L' && i < j {
                return false;
            }
            if s[i] == b'R' && i > j {
                return false;
            }
        }
        true
    }
}
```

```typescript
class Solution {
    /**
     * @param {string} start
     * @param {string} target
     * @return {boolean}
     */
    canChange(start: string, target: string): boolean {
        const n = start.length;
        const startQ = new Queue();
        const targetQ = new Queue();
        for (let i = 0; i < n; i++) {
            if (start[i] !== '_') {
                startQ.push(i);
            }
            if (target[i] !== '_') {
                targetQ.push(i);
            }
        }

        if (startQ.size() !== targetQ.size()) {
            return false;
        }

        while (!startQ.isEmpty()) {
            const i = startQ.pop() as number;
            const j = targetQ.pop() as number;
            if (start[i] !== target[j]) {
                return false;
            }
            if (start[i] === 'L' && i < j) {
                return false;
            }
            if (start[i] === 'R' && i > j) {
                return false;
            }
        }
        return true;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

> Where $n$ is the length of the strings $start$ and $target$.

---

## 3. Prefix Count

::tabs-start

```python
class Solution:
    def canChange(self, start: str, target: str) -> bool:
        if start.replace('_', '') != target.replace('_', ''):
            return False

        l = r = 0
        for i in range(len(start)):
            if target[i] == 'L':
                l += 1
            if start[i] == 'L':
                l -= 1
            if start[i] == 'R':
                r += 1
            if target[i] == 'R':
                r -= 1
            if l < 0 or r < 0:
                return False
        return True
```

```java
public class Solution {
    public boolean canChange(String start, String target) {
        if (!start.replace("_", "").equals(target.replace("_", ""))) {
            return false;
        }

        int l = 0, r = 0;
        for (int i = 0; i < start.length(); i++) {
            char s = start.charAt(i), t = target.charAt(i);
            if (t == 'L') {
                l++;
            }
            if (s == 'L') {
                l--;
            }
            if (s == 'R') {
                r++;
            }
            if (t == 'R') {
                r--;
            }
            if (l < 0 || r < 0) {
                return false;
            }
        }
        return true;
    }
}
```

```cpp
class Solution {
public:
    bool canChange(string start, string target) {
        string a = start, b = target;
        a.erase(remove(a.begin(), a.end(), '_'), a.end());
        b.erase(remove(b.begin(), b.end(), '_'), b.end());
        if (a != b) {
            return false;
        }

        int l = 0, r = 0;
        for (int i = 0; i < start.size(); i++) {
            if (target[i] == 'L') {
                l++;
            }
            if (start[i] == 'L') {
                l--;
            }
            if (start[i] == 'R') {
                r++;
            }
            if (target[i] == 'R') {
                r--;
            }
            if (l < 0 || r < 0) {
                return false;
            }
        }
        return true;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} start
     * @param {string} target
     * @return {boolean}
     */
    canChange(start, target) {
        if (start.replace(/_/g, '') !== target.replace(/_/g, '')) {
            return false;
        }

        let l = 0, r = 0;
        for (let i = 0; i < start.length; i++) {
            if (target[i] === 'L') {
                l++;
            }
            if (start[i] === 'L') {
                l--;
            }
            if (start[i] === 'R') {
                r++;
            }
            if (target[i] === 'R') {
                r--;
            }
            if (l < 0 || r < 0) {
                return false;
            }
        }
        return true;
    }
}
```

```csharp
public class Solution {
    public bool CanChange(string start, string target) {
        if (start.Replace("_", "") != target.Replace("_", "")) {
            return false;
        }

        int l = 0, r = 0;
        for (int i = 0; i < start.Length; i++) {
            if (target[i] == 'L') {
                l++;
            }
            if (start[i] == 'L') {
                l--;
            }
            if (start[i] == 'R') {
                r++;
            }
            if (target[i] == 'R') {
                r--;
            }
            if (l < 0 || r < 0) {
                return false;
            }
        }
        return true;
    }
}
```

```go
func canChange(start string, target string) bool {
    if strings.ReplaceAll(start, "_", "") != strings.ReplaceAll(target, "_", "") {
        return false
    }

    l, r := 0, 0
    for i := 0; i < len(start); i++ {
        if target[i] == 'L' {
            l++
        }
        if start[i] == 'L' {
            l--
        }
        if start[i] == 'R' {
            r++
        }
        if target[i] == 'R' {
            r--
        }
        if l < 0 || r < 0 {
            return false
        }
    }
    return true
}
```

```kotlin
class Solution {
    fun canChange(start: String, target: String): Boolean {
        if (start.replace("_", "") != target.replace("_", "")) {
            return false
        }

        var l = 0
        var r = 0
        for (i in start.indices) {
            if (target[i] == 'L') {
                l++
            }
            if (start[i] == 'L') {
                l--
            }
            if (start[i] == 'R') {
                r++
            }
            if (target[i] == 'R') {
                r--
            }
            if (l < 0 || r < 0) {
                return false
            }
        }
        return true
    }
}
```

```swift
class Solution {
    func canChange(_ start: String, _ target: String) -> Bool {
        if start.filter({ $0 != "_" }) != target.filter({ $0 != "_" }) {
            return false
        }

        let s = Array(start), t = Array(target)
        var l = 0, r = 0
        for i in 0..<s.count {
            if t[i] == "L" {
                l += 1
            }
            if s[i] == "L" {
                l -= 1
            }
            if s[i] == "R" {
                r += 1
            }
            if t[i] == "R" {
                r -= 1
            }
            if l < 0 || r < 0 {
                return false
            }
        }
        return true
    }
}
```

```rust
impl Solution {
    pub fn can_change(start: String, target: String) -> bool {
        if start.replace('_', "") != target.replace('_', "") {
            return false;
        }

        let s = start.as_bytes();
        let t = target.as_bytes();
        let (mut l, mut r) = (0, 0);
        for i in 0..s.len() {
            if t[i] == b'L' {
                l += 1;
            }
            if s[i] == b'L' {
                l -= 1;
            }
            if s[i] == b'R' {
                r += 1;
            }
            if t[i] == b'R' {
                r -= 1;
            }
            if l < 0 || r < 0 {
                return false;
            }
        }
        true
    }
}
```

```typescript
class Solution {
    /**
     * @param {string} start
     * @param {string} target
     * @return {boolean}
     */
    canChange(start: string, target: string): boolean {
        if (start.replace(/_/g, '') !== target.replace(/_/g, '')) {
            return false;
        }

        let l = 0, r = 0;
        for (let i = 0; i < start.length; i++) {
            if (target[i] === 'L') {
                l++;
            }
            if (start[i] === 'L') {
                l--;
            }
            if (start[i] === 'R') {
                r++;
            }
            if (target[i] === 'R') {
                r--;
            }
            if (l < 0 || r < 0) {
                return false;
            }
        }
        return true;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

> Where $n$ is the length of the strings $start$ and $target$.

---

## 4. Two Pointers

::tabs-start

```python
class Solution:
    def canChange(self, start: str, target: str) -> bool:
        n = len(start)
        i = j = 0
        while i < n or j < n:
            while i < n and start[i] == '_':
                i += 1
            while j < n and target[j] == '_':
                j += 1

            if i == n or j == n:
                return i == n and j == n
            if start[i] != target[j]:
                return False
            if start[i] == 'L' and i < j:
                return False
            if start[i] == 'R' and i > j:
                return False
            i += 1
            j += 1
        return True
```

```java
public class Solution {
    public boolean canChange(String start, String target) {
        int n = start.length();
        int i = 0, j = 0;
        while (i < n || j < n) {
            while (i < n && start.charAt(i) == '_') i++;
            while (j < n && target.charAt(j) == '_') j++;

            if (i == n || j == n) {
                return i == n && j == n;
            }
            char c = start.charAt(i);
            if (c != target.charAt(j)) {
                return false;
            }
            if (c == 'L' && i < j) {
                return false;
            }
            if (c == 'R' && i > j) {
                return false;
            }
            i++;
            j++;
        }
        return true;
    }
}
```

```cpp
class Solution {
public:
    bool canChange(string start, string target) {
        int n = start.size();
        int i = 0, j = 0;
        while (i < n || j < n) {
            while (i < n && start[i] == '_') i++;
            while (j < n && target[j] == '_') j++;

            if (i == n || j == n) {
                return i == n && j == n;
            }
            if (start[i] != target[j]) {
                return false;
            }
            if (start[i] == 'L' && i < j) {
                return false;
            }
            if (start[i] == 'R' && i > j) {
                return false;
            }
            i++;
            j++;
        }
        return true;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} start
     * @param {string} target
     * @return {boolean}
     */
    canChange(start, target) {
        const n = start.length;
        let i = 0, j = 0;
        while (i < n || j < n) {
            while (i < n && start[i] === '_') i++;
            while (j < n && target[j] === '_') j++;

            if (i === n || j === n) {
                return i === n && j === n;
            }
            if (start[i] !== target[j]) {
                return false;
            }
            if (start[i] === 'L' && i < j) {
                return false;
            }
            if (start[i] === 'R' && i > j) {
                return false;
            }
            i++;
            j++;
        }
        return true;
    }
}
```

```csharp
public class Solution {
    public bool CanChange(string start, string target) {
        int n = start.Length;
        int i = 0, j = 0;
        while (i < n || j < n) {
            while (i < n && start[i] == '_') i++;
            while (j < n && target[j] == '_') j++;

            if (i == n || j == n) {
                return i == n && j == n;
            }
            if (start[i] != target[j]) {
                return false;
            }
            if (start[i] == 'L' && i < j) {
                return false;
            }
            if (start[i] == 'R' && i > j) {
                return false;
            }
            i++;
            j++;
        }
        return true;
    }
}
```

```go
func canChange(start string, target string) bool {
    n := len(start)
    i, j := 0, 0
    for i < n || j < n {
        for i < n && start[i] == '_' {
            i++
        }
        for j < n && target[j] == '_' {
            j++
        }

        if i == n || j == n {
            return i == n && j == n
        }
        if start[i] != target[j] {
            return false
        }
        if start[i] == 'L' && i < j {
            return false
        }
        if start[i] == 'R' && i > j {
            return false
        }
        i++
        j++
    }
    return true
}
```

```kotlin
class Solution {
    fun canChange(start: String, target: String): Boolean {
        val n = start.length
        var i = 0
        var j = 0
        while (i < n || j < n) {
            while (i < n && start[i] == '_') i++
            while (j < n && target[j] == '_') j++

            if (i == n || j == n) {
                return i == n && j == n
            }
            if (start[i] != target[j]) {
                return false
            }
            if (start[i] == 'L' && i < j) {
                return false
            }
            if (start[i] == 'R' && i > j) {
                return false
            }
            i++
            j++
        }
        return true
    }
}
```

```swift
class Solution {
    func canChange(_ start: String, _ target: String) -> Bool {
        let s = Array(start), t = Array(target)
        let n = s.count
        var i = 0, j = 0
        while i < n || j < n {
            while i < n && s[i] == "_" { i += 1 }
            while j < n && t[j] == "_" { j += 1 }

            if i == n || j == n {
                return i == n && j == n
            }
            if s[i] != t[j] {
                return false
            }
            if s[i] == "L" && i < j {
                return false
            }
            if s[i] == "R" && i > j {
                return false
            }
            i += 1
            j += 1
        }
        return true
    }
}
```

```rust
impl Solution {
    pub fn can_change(start: String, target: String) -> bool {
        let s = start.as_bytes();
        let t = target.as_bytes();
        let n = s.len();
        let (mut i, mut j) = (0, 0);
        while i < n || j < n {
            while i < n && s[i] == b'_' {
                i += 1;
            }
            while j < n && t[j] == b'_' {
                j += 1;
            }

            if i == n || j == n {
                return i == n && j == n;
            }
            if s[i] != t[j] {
                return false;
            }
            if s[i] == b'L' && i < j {
                return false;
            }
            if s[i] == b'R' && i > j {
                return false;
            }
            i += 1;
            j += 1;
        }
        true
    }
}
```

```typescript
class Solution {
    /**
     * @param {string} start
     * @param {string} target
     * @return {boolean}
     */
    canChange(start: string, target: string): boolean {
        const n = start.length;
        let i = 0, j = 0;
        while (i < n || j < n) {
            while (i < n && start[i] === '_') i++;
            while (j < n && target[j] === '_') j++;

            if (i === n || j === n) {
                return i === n && j === n;
            }
            if (start[i] !== target[j]) {
                return false;
            }
            if (start[i] === 'L' && i < j) {
                return false;
            }
            if (start[i] === 'R' && i > j) {
                return false;
            }
            i++;
            j++;
        }
        return true;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.

> Where $n$ is the length of the strings $start$ and $target$.
