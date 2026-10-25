## 1. Brute Force (Backtracking)

::tabs-start

```python
class Solution:
    def getPermutation(self, n: int, k: int) -> str:
        used = [False] * (n + 1)
        path = []

        def dfs():
            nonlocal k
            if len(path) == n:
                k -= 1
                return k == 0
            for d in range(1, n + 1):
                if used[d]:
                    continue
                used[d] = True
                path.append(str(d))
                if dfs():
                    return True
                path.pop()
                used[d] = False
            return False

        dfs()
        return "".join(path)
```

```java
public class Solution {
    private int k;

    public String getPermutation(int n, int k) {
        this.k = k;
        StringBuilder path = new StringBuilder();
        dfs(n, new boolean[n + 1], path);
        return path.toString();
    }

    private boolean dfs(int n, boolean[] used, StringBuilder path) {
        if (path.length() == n) {
            return --k == 0;
        }
        for (int d = 1; d <= n; d++) {
            if (used[d]) continue;
            used[d] = true;
            path.append(d);
            if (dfs(n, used, path)) return true;
            path.deleteCharAt(path.length() - 1);
            used[d] = false;
        }
        return false;
    }
}
```

```cpp
class Solution {
public:
    string getPermutation(int n, int k) {
        vector<bool> used(n + 1, false);
        string path;
        dfs(n, k, used, path);
        return path;
    }

private:
    bool dfs(int n, int& k, vector<bool>& used, string& path) {
        if ((int)path.size() == n) {
            return --k == 0;
        }
        for (int d = 1; d <= n; d++) {
            if (used[d]) continue;
            used[d] = true;
            path.push_back('0' + d);
            if (dfs(n, k, used, path)) return true;
            path.pop_back();
            used[d] = false;
        }
        return false;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @param {number} k
     * @return {string}
     */
    getPermutation(n, k) {
        const used = new Array(n + 1).fill(false);
        const path = [];

        const dfs = () => {
            if (path.length === n) {
                k--;
                return k === 0;
            }
            for (let d = 1; d <= n; d++) {
                if (used[d]) continue;
                used[d] = true;
                path.push(d);
                if (dfs()) return true;
                path.pop();
                used[d] = false;
            }
            return false;
        };

        dfs();
        return path.join('');
    }
}
```

```csharp
public class Solution {
    private int k;

    public string GetPermutation(int n, int k) {
        this.k = k;
        var path = new StringBuilder();
        Dfs(n, new bool[n + 1], path);
        return path.ToString();
    }

    private bool Dfs(int n, bool[] used, StringBuilder path) {
        if (path.Length == n) {
            return --k == 0;
        }
        for (int d = 1; d <= n; d++) {
            if (used[d]) continue;
            used[d] = true;
            path.Append(d);
            if (Dfs(n, used, path)) return true;
            path.Length--;
            used[d] = false;
        }
        return false;
    }
}
```

```go
func getPermutation(n int, k int) string {
    used := make([]bool, n+1)
    path := []byte{}

    var dfs func() bool
    dfs = func() bool {
        if len(path) == n {
            k--
            return k == 0
        }
        for d := 1; d <= n; d++ {
            if used[d] {
                continue
            }
            used[d] = true
            path = append(path, byte('0'+d))
            if dfs() {
                return true
            }
            path = path[:len(path)-1]
            used[d] = false
        }
        return false
    }

    dfs()
    return string(path)
}
```

```kotlin
class Solution {
    private var k = 0

    fun getPermutation(n: Int, k: Int): String {
        this.k = k
        val path = StringBuilder()
        dfs(n, BooleanArray(n + 1), path)
        return path.toString()
    }

    private fun dfs(n: Int, used: BooleanArray, path: StringBuilder): Boolean {
        if (path.length == n) {
            k--
            return k == 0
        }
        for (d in 1..n) {
            if (used[d]) continue
            used[d] = true
            path.append(d)
            if (dfs(n, used, path)) return true
            path.deleteCharAt(path.length - 1)
            used[d] = false
        }
        return false
    }
}
```

```swift
class Solution {
    func getPermutation(_ n: Int, _ k: Int) -> String {
        var k = k
        var used = [Bool](repeating: false, count: n + 1)
        var path = [Character]()

        func dfs() -> Bool {
            if path.count == n {
                k -= 1
                return k == 0
            }
            for d in 1...n {
                if used[d] { continue }
                used[d] = true
                path.append(Character(String(d)))
                if dfs() { return true }
                path.removeLast()
                used[d] = false
            }
            return false
        }

        _ = dfs()
        return String(path)
    }
}
```

```rust
impl Solution {
    pub fn get_permutation(n: i32, k: i32) -> String {
        let n = n as usize;
        let mut k = k;
        let mut used = vec![false; n + 1];
        let mut path = String::new();
        Self::dfs(n, &mut k, &mut used, &mut path);
        path
    }

    fn dfs(n: usize, k: &mut i32, used: &mut Vec<bool>, path: &mut String) -> bool {
        if path.len() == n {
            *k -= 1;
            return *k == 0;
        }
        for d in 1..=n {
            if used[d] {
                continue;
            }
            used[d] = true;
            path.push((b'0' + d as u8) as char);
            if Self::dfs(n, k, used, path) {
                return true;
            }
            path.pop();
            used[d] = false;
        }
        false
    }
}
```

```typescript
class Solution {
    /**
     * @param {number} n
     * @param {number} k
     * @return {string}
     */
    getPermutation(n: number, k: number): string {
        const used: boolean[] = new Array(n + 1).fill(false);
        const path: number[] = [];

        const dfs = (): boolean => {
            if (path.length === n) {
                k--;
                return k === 0;
            }
            for (let d = 1; d <= n; d++) {
                if (used[d]) continue;
                used[d] = true;
                path.push(d);
                if (dfs()) return true;
                path.pop();
                used[d] = false;
            }
            return false;
        };

        dfs();
        return path.join('');
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n! * n)$ in the worst case ($k = n!$).
- Space complexity: $O(n)$ for the recursion stack, the `used` array and the current path.

> Where $n$ is the number of digits and $k$ is the 1-based rank of the permutation.

---

## 2. Next Permutation

::tabs-start

```python
class Solution:
    def getPermutation(self, n: int, k: int) -> str:
        perm = [str(i) for i in range(1, n + 1)]
        for _ in range(k - 1):
            i = n - 2
            while perm[i] >= perm[i + 1]:
                i -= 1
            j = n - 1
            while perm[j] <= perm[i]:
                j -= 1
            perm[i], perm[j] = perm[j], perm[i]
            perm[i + 1:] = reversed(perm[i + 1:])
        return "".join(perm)
```

```java
public class Solution {
    public String getPermutation(int n, int k) {
        char[] perm = new char[n];
        for (int i = 0; i < n; i++) {
            perm[i] = (char) ('1' + i);
        }
        for (int step = 1; step < k; step++) {
            int i = n - 2;
            while (perm[i] >= perm[i + 1]) i--;
            int j = n - 1;
            while (perm[j] <= perm[i]) j--;
            swap(perm, i, j);
            for (int l = i + 1, r = n - 1; l < r; l++, r--) {
                swap(perm, l, r);
            }
        }
        return new String(perm);
    }

    private void swap(char[] a, int i, int j) {
        char t = a[i];
        a[i] = a[j];
        a[j] = t;
    }
}
```

```cpp
class Solution {
public:
    string getPermutation(int n, int k) {
        string perm;
        for (int i = 1; i <= n; i++) {
            perm += char('0' + i);
        }
        for (int step = 1; step < k; step++) {
            int i = n - 2;
            while (perm[i] >= perm[i + 1]) i--;
            int j = n - 1;
            while (perm[j] <= perm[i]) j--;
            swap(perm[i], perm[j]);
            reverse(perm.begin() + i + 1, perm.end());
        }
        return perm;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @param {number} k
     * @return {string}
     */
    getPermutation(n, k) {
        const perm = [];
        for (let i = 1; i <= n; i++) {
            perm.push(i);
        }
        for (let step = 1; step < k; step++) {
            let i = n - 2;
            while (perm[i] >= perm[i + 1]) i--;
            let j = n - 1;
            while (perm[j] <= perm[i]) j--;
            [perm[i], perm[j]] = [perm[j], perm[i]];
            for (let l = i + 1, r = n - 1; l < r; l++, r--) {
                [perm[l], perm[r]] = [perm[r], perm[l]];
            }
        }
        return perm.join('');
    }
}
```

```csharp
public class Solution {
    public string GetPermutation(int n, int k) {
        char[] perm = new char[n];
        for (int i = 0; i < n; i++) {
            perm[i] = (char)('1' + i);
        }
        for (int step = 1; step < k; step++) {
            int i = n - 2;
            while (perm[i] >= perm[i + 1]) i--;
            int j = n - 1;
            while (perm[j] <= perm[i]) j--;
            (perm[i], perm[j]) = (perm[j], perm[i]);
            Array.Reverse(perm, i + 1, n - i - 1);
        }
        return new string(perm);
    }
}
```

```go
func getPermutation(n int, k int) string {
    perm := make([]byte, n)
    for i := 0; i < n; i++ {
        perm[i] = byte('1' + i)
    }
    for step := 1; step < k; step++ {
        i := n - 2
        for perm[i] >= perm[i+1] {
            i--
        }
        j := n - 1
        for perm[j] <= perm[i] {
            j--
        }
        perm[i], perm[j] = perm[j], perm[i]
        for l, r := i+1, n-1; l < r; l, r = l+1, r-1 {
            perm[l], perm[r] = perm[r], perm[l]
        }
    }
    return string(perm)
}
```

```kotlin
class Solution {
    fun getPermutation(n: Int, k: Int): String {
        val perm = CharArray(n) { '1' + it }
        for (step in 1 until k) {
            var i = n - 2
            while (perm[i] >= perm[i + 1]) i--
            var j = n - 1
            while (perm[j] <= perm[i]) j--
            perm[i] = perm[j].also { perm[j] = perm[i] }
            var l = i + 1
            var r = n - 1
            while (l < r) {
                perm[l] = perm[r].also { perm[r] = perm[l] }
                l++
                r--
            }
        }
        return String(perm)
    }
}
```

```swift
class Solution {
    func getPermutation(_ n: Int, _ k: Int) -> String {
        var perm = Array(1...n)
        for _ in 1..<k {
            var i = n - 2
            while perm[i] >= perm[i + 1] { i -= 1 }
            var j = n - 1
            while perm[j] <= perm[i] { j -= 1 }
            perm.swapAt(i, j)
            perm[(i + 1)...].reverse()
        }
        return perm.map(String.init).joined()
    }
}
```

```rust
impl Solution {
    pub fn get_permutation(n: i32, k: i32) -> String {
        let n = n as usize;
        let mut perm: Vec<u8> = (1..=n as u8).map(|d| b'0' + d).collect();
        for _ in 1..k {
            let mut i = n - 2;
            while perm[i] >= perm[i + 1] {
                i -= 1;
            }
            let mut j = n - 1;
            while perm[j] <= perm[i] {
                j -= 1;
            }
            perm.swap(i, j);
            perm[i + 1..].reverse();
        }
        String::from_utf8(perm).unwrap()
    }
}
```

```typescript
class Solution {
    /**
     * @param {number} n
     * @param {number} k
     * @return {string}
     */
    getPermutation(n: number, k: number): string {
        const perm: number[] = [];
        for (let i = 1; i <= n; i++) {
            perm.push(i);
        }
        for (let step = 1; step < k; step++) {
            let i = n - 2;
            while (perm[i] >= perm[i + 1]) i--;
            let j = n - 1;
            while (perm[j] <= perm[i]) j--;
            [perm[i], perm[j]] = [perm[j], perm[i]];
            for (let l = i + 1, r = n - 1; l < r; l++, r--) {
                [perm[l], perm[r]] = [perm[r], perm[l]];
            }
        }
        return perm.join('');
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(k * n)$, which is $O(n! * n)$ in the worst case.
- Space complexity: $O(n)$

> Where $n$ is the number of digits and $k$ is the 1-based rank of the permutation.

---

## 3. Recursion (Math)

::tabs-start

```python
class Solution:
    def getPermutation(self, n: int, k: int) -> str:
        fact = [1] * (n + 1)
        for i in range(1, n + 1):
            fact[i] = fact[i - 1] * i

        def build(digits, k):
            if not digits:
                return ""
            block = fact[len(digits) - 1]
            idx = (k - 1) // block
            d = digits.pop(idx)
            return d + build(digits, k - idx * block)

        return build([str(i) for i in range(1, n + 1)], k)
```

```java
public class Solution {
    public String getPermutation(int n, int k) {
        int[] fact = new int[n + 1];
        fact[0] = 1;
        for (int i = 1; i <= n; i++) {
            fact[i] = fact[i - 1] * i;
        }
        List<Integer> digits = new ArrayList<>();
        for (int i = 1; i <= n; i++) {
            digits.add(i);
        }
        StringBuilder res = new StringBuilder();
        build(digits, k, fact, res);
        return res.toString();
    }

    private void build(List<Integer> digits, int k, int[] fact, StringBuilder res) {
        if (digits.isEmpty()) return;
        int block = fact[digits.size() - 1];
        int idx = (k - 1) / block;
        res.append(digits.remove(idx));
        build(digits, k - idx * block, fact, res);
    }
}
```

```cpp
class Solution {
public:
    string getPermutation(int n, int k) {
        vector<int> fact(n + 1, 1);
        for (int i = 1; i <= n; i++) {
            fact[i] = fact[i - 1] * i;
        }
        string digits;
        for (int i = 1; i <= n; i++) {
            digits += char('0' + i);
        }
        string res;
        build(digits, k, fact, res);
        return res;
    }

private:
    void build(string& digits, int k, vector<int>& fact, string& res) {
        if (digits.empty()) return;
        int block = fact[digits.size() - 1];
        int idx = (k - 1) / block;
        res += digits[idx];
        digits.erase(idx, 1);
        build(digits, k - idx * block, fact, res);
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @param {number} k
     * @return {string}
     */
    getPermutation(n, k) {
        const fact = [1];
        for (let i = 1; i <= n; i++) {
            fact[i] = fact[i - 1] * i;
        }
        const digits = [];
        for (let i = 1; i <= n; i++) {
            digits.push(i);
        }

        const build = (k) => {
            if (digits.length === 0) return '';
            const block = fact[digits.length - 1];
            const idx = Math.floor((k - 1) / block);
            const d = digits.splice(idx, 1)[0];
            return String(d) + build(k - idx * block);
        };

        return build(k);
    }
}
```

```csharp
public class Solution {
    public string GetPermutation(int n, int k) {
        int[] fact = new int[n + 1];
        fact[0] = 1;
        for (int i = 1; i <= n; i++) {
            fact[i] = fact[i - 1] * i;
        }
        var digits = new List<int>();
        for (int i = 1; i <= n; i++) {
            digits.Add(i);
        }
        var res = new StringBuilder();
        Build(digits, k, fact, res);
        return res.ToString();
    }

    private void Build(List<int> digits, int k, int[] fact, StringBuilder res) {
        if (digits.Count == 0) return;
        int block = fact[digits.Count - 1];
        int idx = (k - 1) / block;
        res.Append(digits[idx]);
        digits.RemoveAt(idx);
        Build(digits, k - idx * block, fact, res);
    }
}
```

```go
func getPermutation(n int, k int) string {
    fact := make([]int, n+1)
    fact[0] = 1
    for i := 1; i <= n; i++ {
        fact[i] = fact[i-1] * i
    }
    digits := make([]byte, n)
    for i := 0; i < n; i++ {
        digits[i] = byte('1' + i)
    }

    var build func(k int) string
    build = func(k int) string {
        if len(digits) == 0 {
            return ""
        }
        block := fact[len(digits)-1]
        idx := (k - 1) / block
        d := digits[idx]
        digits = append(digits[:idx], digits[idx+1:]...)
        return string(d) + build(k-idx*block)
    }

    return build(k)
}
```

```kotlin
class Solution {
    fun getPermutation(n: Int, k: Int): String {
        val fact = IntArray(n + 1)
        fact[0] = 1
        for (i in 1..n) {
            fact[i] = fact[i - 1] * i
        }
        val digits = MutableList(n) { it + 1 }
        val res = StringBuilder()
        build(digits, k, fact, res)
        return res.toString()
    }

    private fun build(digits: MutableList<Int>, k: Int, fact: IntArray, res: StringBuilder) {
        if (digits.isEmpty()) return
        val block = fact[digits.size - 1]
        val idx = (k - 1) / block
        res.append(digits.removeAt(idx))
        build(digits, k - idx * block, fact, res)
    }
}
```

```swift
class Solution {
    func getPermutation(_ n: Int, _ k: Int) -> String {
        var fact = [Int](repeating: 1, count: n + 1)
        for i in 1...n {
            fact[i] = fact[i - 1] * i
        }
        var digits = Array(1...n)

        func build(_ k: Int) -> String {
            if digits.isEmpty { return "" }
            let block = fact[digits.count - 1]
            let idx = (k - 1) / block
            let d = digits.remove(at: idx)
            return String(d) + build(k - idx * block)
        }

        return build(k)
    }
}
```

```rust
impl Solution {
    pub fn get_permutation(n: i32, k: i32) -> String {
        let n = n as usize;
        let mut fact = vec![1; n + 1];
        for i in 1..=n {
            fact[i] = fact[i - 1] * i as i32;
        }
        let mut digits: Vec<u8> = (1..=n as u8).map(|d| b'0' + d).collect();
        let mut res = String::new();
        Self::build(&mut digits, k, &fact, &mut res);
        res
    }

    fn build(digits: &mut Vec<u8>, k: i32, fact: &Vec<i32>, res: &mut String) {
        if digits.is_empty() {
            return;
        }
        let block = fact[digits.len() - 1];
        let idx = ((k - 1) / block) as usize;
        res.push(digits.remove(idx) as char);
        Self::build(digits, k - idx as i32 * block, fact, res);
    }
}
```

```typescript
class Solution {
    /**
     * @param {number} n
     * @param {number} k
     * @return {string}
     */
    getPermutation(n: number, k: number): string {
        const fact: number[] = [1];
        for (let i = 1; i <= n; i++) {
            fact[i] = fact[i - 1] * i;
        }
        const digits: number[] = [];
        for (let i = 1; i <= n; i++) {
            digits.push(i);
        }

        const build = (k: number): string => {
            if (digits.length === 0) return '';
            const block = fact[digits.length - 1];
            const idx = Math.floor((k - 1) / block);
            const d = digits.splice(idx, 1)[0];
            return String(d) + build(k - idx * block);
        };

        return build(k);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n)$ for the recursion stack and the remaining digits.

> Where $n$ is the number of digits.

---

## 4. Factorial Number System

::tabs-start

```python
class Solution:
    def getPermutation(self, n: int, k: int) -> str:
        fact = [1] * n
        for i in range(1, n):
            fact[i] = fact[i - 1] * i
        digits = [str(i) for i in range(1, n + 1)]
        k -= 1
        res = []
        for i in range(n - 1, -1, -1):
            idx = k // fact[i]
            k %= fact[i]
            res.append(digits.pop(idx))
        return "".join(res)
```

```java
public class Solution {
    public String getPermutation(int n, int k) {
        int[] fact = new int[n];
        fact[0] = 1;
        for (int i = 1; i < n; i++) {
            fact[i] = fact[i - 1] * i;
        }
        List<Integer> digits = new ArrayList<>();
        for (int i = 1; i <= n; i++) {
            digits.add(i);
        }
        k--;
        StringBuilder res = new StringBuilder();
        for (int i = n - 1; i >= 0; i--) {
            int idx = k / fact[i];
            k %= fact[i];
            res.append(digits.remove(idx));
        }
        return res.toString();
    }
}
```

```cpp
class Solution {
public:
    string getPermutation(int n, int k) {
        vector<int> fact(n, 1);
        for (int i = 1; i < n; i++) {
            fact[i] = fact[i - 1] * i;
        }
        string digits;
        for (int i = 1; i <= n; i++) {
            digits += char('0' + i);
        }
        k--;
        string res;
        for (int i = n - 1; i >= 0; i--) {
            int idx = k / fact[i];
            k %= fact[i];
            res += digits[idx];
            digits.erase(idx, 1);
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @param {number} k
     * @return {string}
     */
    getPermutation(n, k) {
        const fact = new Array(n).fill(1);
        for (let i = 1; i < n; i++) {
            fact[i] = fact[i - 1] * i;
        }
        const digits = [];
        for (let i = 1; i <= n; i++) {
            digits.push(i);
        }
        k--;
        let res = '';
        for (let i = n - 1; i >= 0; i--) {
            const idx = Math.floor(k / fact[i]);
            k %= fact[i];
            res += digits.splice(idx, 1)[0];
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public string GetPermutation(int n, int k) {
        int[] fact = new int[n];
        fact[0] = 1;
        for (int i = 1; i < n; i++) {
            fact[i] = fact[i - 1] * i;
        }
        var digits = new List<int>();
        for (int i = 1; i <= n; i++) {
            digits.Add(i);
        }
        k--;
        var res = new StringBuilder();
        for (int i = n - 1; i >= 0; i--) {
            int idx = k / fact[i];
            k %= fact[i];
            res.Append(digits[idx]);
            digits.RemoveAt(idx);
        }
        return res.ToString();
    }
}
```

```go
func getPermutation(n int, k int) string {
    fact := make([]int, n)
    fact[0] = 1
    for i := 1; i < n; i++ {
        fact[i] = fact[i-1] * i
    }
    digits := make([]byte, n)
    for i := 0; i < n; i++ {
        digits[i] = byte('1' + i)
    }
    k--
    res := make([]byte, 0, n)
    for i := n - 1; i >= 0; i-- {
        idx := k / fact[i]
        k %= fact[i]
        res = append(res, digits[idx])
        digits = append(digits[:idx], digits[idx+1:]...)
    }
    return string(res)
}
```

```kotlin
class Solution {
    fun getPermutation(n: Int, k: Int): String {
        val fact = IntArray(n)
        fact[0] = 1
        for (i in 1 until n) {
            fact[i] = fact[i - 1] * i
        }
        val digits = MutableList(n) { it + 1 }
        var rem = k - 1
        val res = StringBuilder()
        for (i in n - 1 downTo 0) {
            val idx = rem / fact[i]
            rem %= fact[i]
            res.append(digits.removeAt(idx))
        }
        return res.toString()
    }
}
```

```swift
class Solution {
    func getPermutation(_ n: Int, _ k: Int) -> String {
        var fact = [Int](repeating: 1, count: n)
        for i in 1..<n {
            fact[i] = fact[i - 1] * i
        }
        var digits = Array(1...n)
        var k = k - 1
        var res = ""
        for i in stride(from: n - 1, through: 0, by: -1) {
            let idx = k / fact[i]
            k %= fact[i]
            res += String(digits.remove(at: idx))
        }
        return res
    }
}
```

```rust
impl Solution {
    pub fn get_permutation(n: i32, k: i32) -> String {
        let n = n as usize;
        let mut fact = vec![1; n];
        for i in 1..n {
            fact[i] = fact[i - 1] * i as i32;
        }
        let mut digits: Vec<u8> = (1..=n as u8).map(|d| b'0' + d).collect();
        let mut k = k - 1;
        let mut res = String::with_capacity(n);
        for i in (0..n).rev() {
            let idx = (k / fact[i]) as usize;
            k %= fact[i];
            res.push(digits.remove(idx) as char);
        }
        res
    }
}
```

```typescript
class Solution {
    /**
     * @param {number} n
     * @param {number} k
     * @return {string}
     */
    getPermutation(n: number, k: number): string {
        const fact: number[] = new Array(n).fill(1);
        for (let i = 1; i < n; i++) {
            fact[i] = fact[i - 1] * i;
        }
        const digits: number[] = [];
        for (let i = 1; i <= n; i++) {
            digits.push(i);
        }
        k--;
        let res = '';
        for (let i = n - 1; i >= 0; i--) {
            const idx = Math.floor(k / fact[i]);
            k %= fact[i];
            res += digits.splice(idx, 1)[0];
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n)$

> Where $n$ is the number of digits.
