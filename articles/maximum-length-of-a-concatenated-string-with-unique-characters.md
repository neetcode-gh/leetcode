## 1. Backtracking (Hash Set)

### Intuition

We want to find the longest concatenation of strings where all characters are unique. Since we need to try different combinations of strings, backtracking is a natural fit. For each string, we have two choices: include it (if it doesn't conflict with already chosen characters) or skip it. A hash set helps us efficiently check for character conflicts between the current selection and the next candidate string.

### Algorithm

1. Use a hash set `charSet` to track characters in the current concatenation.
2. Create a helper function `overlap` that checks if a string has duplicate characters within itself or conflicts with `charSet`.
3. Use backtracking starting from index `0`. At each index `i`:
   - If the string at `i` doesn't overlap, add its characters to `charSet`, recurse to `i + 1`, then remove the characters (backtrack).
   - Always try skipping the current string by recursing to `i + 1` without adding it.
4. Return the maximum length found when reaching the end of the array.

::tabs-start

```python
class Solution:
    def maxLength(self, arr: List[str]) -> int:
        charSet = set()

        def overlap(charSet, s):
            prev = set()
            for c in s:
                if c in charSet or c in prev:
                    return True
                prev.add(c)
            return False

        def backtrack(i):
            if i == len(arr):
                return len(charSet)

            res = 0
            if not overlap(charSet, arr[i]):
                for c in arr[i]:
                    charSet.add(c)
                res = backtrack(i + 1)
                for c in arr[i]:
                    charSet.remove(c)

            return max(res, backtrack(i + 1))

        return backtrack(0)
```

```java
public class Solution {
    public int maxLength(List<String> arr) {
        Set<Character> charSet = new HashSet<>();
        return backtrack(0, arr, charSet);
    }

    private boolean overlap(Set<Character> charSet, String s) {
        Set<Character> prev = new HashSet<>();
        for (char c : s.toCharArray()) {
            if (charSet.contains(c) || prev.contains(c)) {
                return true;
            }
            prev.add(c);
        }
        return false;
    }

    private int backtrack(int i, List<String> arr, Set<Character> charSet) {
        if (i == arr.size()) {
            return charSet.size();
        }

        int res = 0;
        if (!overlap(charSet, arr.get(i))) {
            for (char c : arr.get(i).toCharArray()) {
                charSet.add(c);
            }
            res = backtrack(i + 1, arr, charSet);
            for (char c : arr.get(i).toCharArray()) {
                charSet.remove(c);
            }
        }

        return Math.max(res, backtrack(i + 1, arr, charSet));
    }
}
```

```cpp
class Solution {
public:
    int maxLength(vector<string>& arr) {
        unordered_set<char> charSet;
        return backtrack(0, arr, charSet);
    }

private:
    bool overlap(unordered_set<char>& charSet, const string& s) {
        unordered_set<char> prev;
        for (char c : s) {
            if (charSet.count(c) || prev.count(c)) {
                return true;
            }
            prev.insert(c);
        }
        return false;
    }

    int backtrack(int i, vector<string>& arr, unordered_set<char>& charSet) {
        if (i == arr.size()) {
            return charSet.size();
        }

        int res = 0;
        if (!overlap(charSet, arr[i])) {
            for (char c : arr[i]) {
                charSet.insert(c);
            }
            res = backtrack(i + 1, arr, charSet);
            for (char c : arr[i]) {
                charSet.erase(c);
            }
        }

        return max(res, backtrack(i + 1, arr, charSet));
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[]} arr
     * @return {number}
     */
    maxLength(arr) {
        let charSet = new Set();

        const overlap = (charSet, s) => {
            let prev = new Set();
            for (const c of s) {
                if (charSet.has(c) || prev.has(c)) {
                    return true;
                }
                prev.add(c);
            }
            return false;
        };

        const backtrack = (i) => {
            if (i === arr.length) {
                return charSet.size;
            }

            let res = 0;
            if (!overlap(charSet, arr[i])) {
                for (const c of arr[i]) {
                    charSet.add(c);
                }
                res = backtrack(i + 1);
                for (const c of arr[i]) {
                    charSet.delete(c);
                }
            }

            return Math.max(res, backtrack(i + 1));
        };

        return backtrack(0);
    }
}
```

```csharp
public class Solution {
    private HashSet<char> charSet = new HashSet<char>();

    public int MaxLength(IList<string> arr) {
        return Backtrack(0, arr);
    }

    private bool Overlap(string s) {
        HashSet<char> prev = new HashSet<char>();
        foreach (char c in s) {
            if (charSet.Contains(c) || prev.Contains(c)) {
                return true;
            }
            prev.Add(c);
        }
        return false;
    }

    private int Backtrack(int i, IList<string> arr) {
        if (i == arr.Count) {
            return charSet.Count;
        }

        int res = 0;
        if (!Overlap(arr[i])) {
            foreach (char c in arr[i]) {
                charSet.Add(c);
            }
            res = Backtrack(i + 1, arr);
            foreach (char c in arr[i]) {
                charSet.Remove(c);
            }
        }

        return Math.Max(res, Backtrack(i + 1, arr));
    }
}
```

```go
func maxLength(arr []string) int {
    charSet := make(map[rune]bool)

    var overlap func(s string) bool
    overlap = func(s string) bool {
        prev := make(map[rune]bool)
        for _, c := range s {
            if charSet[c] || prev[c] {
                return true
            }
            prev[c] = true
        }
        return false
    }

    var backtrack func(i int) int
    backtrack = func(i int) int {
        if i == len(arr) {
            return len(charSet)
        }

        res := 0
        if !overlap(arr[i]) {
            for _, c := range arr[i] {
                charSet[c] = true
            }
            res = backtrack(i + 1)
            for _, c := range arr[i] {
                delete(charSet, c)
            }
        }

        skip := backtrack(i + 1)
        if skip > res {
            res = skip
        }
        return res
    }

    return backtrack(0)
}
```

```kotlin
class Solution {
    fun maxLength(arr: List<String>): Int {
        val charSet = mutableSetOf<Char>()

        fun overlap(s: String): Boolean {
            val prev = mutableSetOf<Char>()
            for (c in s) {
                if (c in charSet || c in prev) {
                    return true
                }
                prev.add(c)
            }
            return false
        }

        fun backtrack(i: Int): Int {
            if (i == arr.size) {
                return charSet.size
            }

            var res = 0
            if (!overlap(arr[i])) {
                for (c in arr[i]) {
                    charSet.add(c)
                }
                res = backtrack(i + 1)
                for (c in arr[i]) {
                    charSet.remove(c)
                }
            }

            return maxOf(res, backtrack(i + 1))
        }

        return backtrack(0)
    }
}
```

```swift
class Solution {
    func maxLength(_ arr: [String]) -> Int {
        var charSet = Set<Character>()

        func overlap(_ s: String) -> Bool {
            var prev = Set<Character>()
            for c in s {
                if charSet.contains(c) || prev.contains(c) {
                    return true
                }
                prev.insert(c)
            }
            return false
        }

        func backtrack(_ i: Int) -> Int {
            if i == arr.count {
                return charSet.count
            }

            var res = 0
            if !overlap(arr[i]) {
                for c in arr[i] {
                    charSet.insert(c)
                }
                res = backtrack(i + 1)
                for c in arr[i] {
                    charSet.remove(c)
                }
            }

            return max(res, backtrack(i + 1))
        }

        return backtrack(0)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * 2 ^ n)$
- Space complexity: $O(n)$ for recursion stack.

> Where $n$ is the number of strings and $m$ is the maximum length of a string.

---

## 2. Backtracking (Boolean Array)

### Intuition

Since we only deal with lowercase letters, we can replace the hash set with a fixed-size boolean array of length `26`. This provides faster lookups and updates while reducing memory overhead. The overlap check simultaneously marks characters as used, and if a conflict is found, we undo the partial marking before returning.

### Algorithm

1. Use a boolean array `charSet` of size `26` to track which characters are currently in use.
2. In the `overlap` function, iterate through the string. For each character, if it's already marked, undo all previous markings from this string and return `true`. Otherwise, mark it as used.
3. Use backtracking starting from index `0`. At each index `i`:
   - If the string at `i` doesn't overlap, recurse and add its length to the result, then clear its characters from `charSet`.
   - Compare with the result of skipping the current string.
4. Return the maximum total length.

::tabs-start

```python
class Solution:
    def maxLength(self, arr: List[str]) -> int:
        charSet = [False] * 26

        def getIdx(c):
            return ord(c) - ord('a')

        def overlap(charSet, s):
            for i in range(len(s)):
                c = getIdx(s[i])
                if charSet[c]:
                    for j in range(i):
                        charSet[getIdx(s[j])] = False
                    return True
                charSet[c] = True
            return False

        def backtrack(i):
            if i == len(arr):
                return 0

            res = 0
            if not overlap(charSet, arr[i]):
                res = len(arr[i]) + backtrack(i + 1)
                for c in arr[i]:
                    charSet[getIdx(c)] = False
            return max(res, backtrack(i + 1))

        return backtrack(0)
```

```java
public class Solution {
    public int maxLength(List<String> arr) {
        boolean[] charSet = new boolean[26];
        return backtrack(0, arr, charSet);
    }

    private int getIdx(char c) {
        return c - 'a';
    }

    private boolean overlap(boolean[] charSet, String s) {
        for (int i = 0; i < s.length(); i++) {
            int c = getIdx(s.charAt(i));
            if (charSet[c]) {
                for (int j = 0; j < i; j++) {
                    charSet[getIdx(s.charAt(j))] = false;
                }
                return true;
            }
            charSet[c] = true;
        }
        return false;
    }

    private int backtrack(int i, List<String> arr, boolean[] charSet) {
        if (i == arr.size()) {
            return 0;
        }

        int res = 0;
        if (!overlap(charSet, arr.get(i))) {
            res = arr.get(i).length() + backtrack(i + 1, arr, charSet);
            for (char c : arr.get(i).toCharArray()) {
                charSet[getIdx(c)] = false;
            }
        }
        return Math.max(res, backtrack(i + 1, arr, charSet));
    }
}
```

```cpp
class Solution {
public:
    int maxLength(vector<string>& arr) {
        bool charSet[26] = {false};
        return backtrack(0, arr, charSet);
    }

private:
    int getIdx(char c) {
        return c - 'a';
    }

    bool overlap(bool charSet[], const string& s) {
        for (int i = 0; i < s.length(); i++) {
            int c = getIdx(s[i]);
            if (charSet[c]) {
                for (int j = 0; j < i; j++) {
                    charSet[getIdx(s[j])] = false;
                }
                return true;
            }
            charSet[c] = true;
        }
        return false;
    }

    int backtrack(int i, vector<string>& arr, bool charSet[]) {
        if (i == arr.size()) {
            return 0;
        }

        int res = 0;
        if (!overlap(charSet, arr[i])) {
            res = arr[i].length() + backtrack(i + 1, arr, charSet);
            for (char c : arr[i]) {
                charSet[getIdx(c)] = false;
            }
        }
        return max(res, backtrack(i + 1, arr, charSet));
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[]} arr
     * @return {number}
     */
    maxLength(arr) {
        let charSet = new Array(26).fill(false);

        const getIdx = (c) => c.charCodeAt(0) - 'a'.charCodeAt(0);

        const overlap = (charSet, s) => {
            for (let i = 0; i < s.length; i++) {
                let c = getIdx(s[i]);
                if (charSet[c]) {
                    for (let j = 0; j < i; j++) {
                        charSet[getIdx(s[j])] = false;
                    }
                    return true;
                }
                charSet[c] = true;
            }
            return false;
        };

        const backtrack = (i) => {
            if (i === arr.length) {
                return 0;
            }

            let res = 0;
            if (!overlap(charSet, arr[i])) {
                res = arr[i].length + backtrack(i + 1);
                for (const c of arr[i]) {
                    charSet[getIdx(c)] = false;
                }
            }
            return Math.max(res, backtrack(i + 1));
        };

        return backtrack(0);
    }
}
```

```csharp
public class Solution {
    private bool[] charSet = new bool[26];

    public int MaxLength(IList<string> arr) {
        return Backtrack(0, arr);
    }

    private int GetIdx(char c) {
        return c - 'a';
    }

    private bool Overlap(string s) {
        for (int i = 0; i < s.Length; i++) {
            int c = GetIdx(s[i]);
            if (charSet[c]) {
                for (int j = 0; j < i; j++) {
                    charSet[GetIdx(s[j])] = false;
                }
                return true;
            }
            charSet[c] = true;
        }
        return false;
    }

    private int Backtrack(int i, IList<string> arr) {
        if (i == arr.Count) {
            return 0;
        }

        int res = 0;
        if (!Overlap(arr[i])) {
            res = arr[i].Length + Backtrack(i + 1, arr);
            foreach (char c in arr[i]) {
                charSet[GetIdx(c)] = false;
            }
        }
        return Math.Max(res, Backtrack(i + 1, arr));
    }
}
```

```go
func maxLength(arr []string) int {
    charSet := make([]bool, 26)

    getIdx := func(c rune) int {
        return int(c - 'a')
    }

    var overlap func(s string) bool
    overlap = func(s string) bool {
        runes := []rune(s)
        for i, c := range runes {
            idx := getIdx(c)
            if charSet[idx] {
                for j := 0; j < i; j++ {
                    charSet[getIdx(runes[j])] = false
                }
                return true
            }
            charSet[idx] = true
        }
        return false
    }

    var backtrack func(i int) int
    backtrack = func(i int) int {
        if i == len(arr) {
            return 0
        }

        res := 0
        if !overlap(arr[i]) {
            res = len(arr[i]) + backtrack(i+1)
            for _, c := range arr[i] {
                charSet[getIdx(c)] = false
            }
        }
        skip := backtrack(i + 1)
        if skip > res {
            res = skip
        }
        return res
    }

    return backtrack(0)
}
```

```kotlin
class Solution {
    fun maxLength(arr: List<String>): Int {
        val charSet = BooleanArray(26)

        fun getIdx(c: Char): Int = c - 'a'

        fun overlap(s: String): Boolean {
            for (i in s.indices) {
                val c = getIdx(s[i])
                if (charSet[c]) {
                    for (j in 0 until i) {
                        charSet[getIdx(s[j])] = false
                    }
                    return true
                }
                charSet[c] = true
            }
            return false
        }

        fun backtrack(i: Int): Int {
            if (i == arr.size) {
                return 0
            }

            var res = 0
            if (!overlap(arr[i])) {
                res = arr[i].length + backtrack(i + 1)
                for (c in arr[i]) {
                    charSet[getIdx(c)] = false
                }
            }
            return maxOf(res, backtrack(i + 1))
        }

        return backtrack(0)
    }
}
```

```swift
class Solution {
    func maxLength(_ arr: [String]) -> Int {
        var charSet = [Bool](repeating: false, count: 26)

        func getIdx(_ c: Character) -> Int {
            return Int(c.asciiValue! - Character("a").asciiValue!)
        }

        func overlap(_ s: String) -> Bool {
            let chars = Array(s)
            for i in 0..<chars.count {
                let c = getIdx(chars[i])
                if charSet[c] {
                    for j in 0..<i {
                        charSet[getIdx(chars[j])] = false
                    }
                    return true
                }
                charSet[c] = true
            }
            return false
        }

        func backtrack(_ i: Int) -> Int {
            if i == arr.count {
                return 0
            }

            var res = 0
            if !overlap(arr[i]) {
                res = arr[i].count + backtrack(i + 1)
                for c in arr[i] {
                    charSet[getIdx(c)] = false
                }
            }
            return max(res, backtrack(i + 1))
        }

        return backtrack(0)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * 2 ^ n)$
- Space complexity: $O(n)$ for recursion stack.

> Where $n$ is the number of strings and $m$ is the maximum length of a string.

---

## 3. Recursion (Bit Mask) - I

### Intuition

We can represent the character set of each string as a bitmask, where bit `i` is set if the character `'a' + i` is present. Two strings conflict if their bitmasks share any set bits (i.e., their AND is non-zero). This allows `O(1)` conflict detection. We preprocess strings to filter out those with internal duplicates and convert valid ones to bitmasks.

### Algorithm

1. Preprocess: for each string, build its bitmask. If any character appears twice (detected by checking if the bit is already set), skip the string. Store valid strings as pairs of `(bitmask, length)`.
2. Use recursion with parameters `i` (current index) and `subSeq` (bitmask of characters used so far).
3. At each index, first try skipping the string. Then, if the current string's mask doesn't conflict with `subSeq` (AND equals zero), try including it by OR-ing the masks and adding its length.
4. Return the maximum length found.

::tabs-start

```python
class Solution:
    def maxLength(self, arr: List[str]) -> int:
        def getIdx(c):
            return ord(c) - ord('a')

        A = []
        for s in arr:
            cur = 0
            valid = True
            for c in s:
                if cur & (1 << getIdx(c)):
                    valid = False
                    break
                cur |= (1 << getIdx(c))

            if valid:
                A.append([cur, len(s)])

        def dfs(i, subSeq):
            if i == len(A):
                return 0

            res = dfs(i + 1, subSeq)

            curSeq, length = A[i][0], A[i][1]
            if (subSeq & curSeq) == 0:
                res = max(res, length + dfs(i + 1, subSeq | curSeq))
            return res

        return dfs(0, 0)
```

```java
public class Solution {
    public int maxLength(List<String> arr) {
        List<int[]> A = new ArrayList<>();

        for (String s : arr) {
            int cur = 0;
            boolean valid = true;

            for (char c : s.toCharArray()) {
                if ((cur & (1 << (c - 'a'))) != 0) {
                    valid = false;
                    break;
                }
                cur |= (1 << (c - 'a'));
            }

            if (valid) {
                A.add(new int[]{cur, s.length()});
            }
        }

        return dfs(0, 0, A);
    }

    private int dfs(int i, int subSeq, List<int[]> A) {
        if (i == A.size()) {
            return 0;
        }

        int res = dfs(i + 1, subSeq, A);

        int curSeq = A.get(i)[0], length = A.get(i)[1];
        if ((subSeq & curSeq) == 0) {
            res = Math.max(res, length + dfs(i + 1, subSeq | curSeq, A));
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int maxLength(vector<string>& arr) {
        vector<pair<int, int>> A;

        for (const string& s : arr) {
            int cur = 0;
            bool valid = true;

            for (char c : s) {
                if (cur & (1 << (c - 'a'))) {
                    valid = false;
                    break;
                }
                cur |= (1 << (c - 'a'));
            }

            if (valid) {
                A.emplace_back(cur, s.length());
            }
        }

        return dfs(0, 0, A);
    }

private:
    int dfs(int i, int subSeq, vector<pair<int, int>>& A) {
        if (i == A.size()) {
            return 0;
        }

        int res = dfs(i + 1, subSeq, A);

        int curSeq = A[i].first, length = A[i].second;
        if ((subSeq & curSeq) == 0) {
            res = max(res, length + dfs(i + 1, subSeq | curSeq, A));
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[]} arr
     * @return {number}
     */
    maxLength(arr) {
        let A = [];

        for (const s of arr) {
            let cur = 0;
            let valid = true;

            for (const c of s) {
                if (cur & (1 << (c.charCodeAt(0) - 97))) {
                    valid = false;
                    break;
                }
                cur |= 1 << (c.charCodeAt(0) - 97);
            }

            if (valid) {
                A.push([cur, s.length]);
            }
        }

        const dfs = (i, subSeq) => {
            if (i === A.length) {
                return 0;
            }

            let res = dfs(i + 1, subSeq);

            let [curSeq, length] = A[i];
            if ((subSeq & curSeq) === 0) {
                res = Math.max(res, length + dfs(i + 1, subSeq | curSeq));
            }
            return res;
        };

        return dfs(0, 0);
    }
}
```

```csharp
public class Solution {
    private List<int[]> A = new List<int[]>();

    public int MaxLength(IList<string> arr) {
        foreach (string s in arr) {
            int cur = 0;
            bool valid = true;

            foreach (char c in s) {
                if ((cur & (1 << (c - 'a'))) != 0) {
                    valid = false;
                    break;
                }
                cur |= (1 << (c - 'a'));
            }

            if (valid) {
                A.Add(new int[] { cur, s.Length });
            }
        }

        return Dfs(0, 0);
    }

    private int Dfs(int i, int subSeq) {
        if (i == A.Count) {
            return 0;
        }

        int res = Dfs(i + 1, subSeq);

        int curSeq = A[i][0], length = A[i][1];
        if ((subSeq & curSeq) == 0) {
            res = Math.Max(res, length + Dfs(i + 1, subSeq | curSeq));
        }
        return res;
    }
}
```

```go
func maxLength(arr []string) int {
    type pair struct {
        mask   int
        length int
    }
    A := []pair{}

    for _, s := range arr {
        cur := 0
        valid := true

        for _, c := range s {
            bit := 1 << (c - 'a')
            if cur&bit != 0 {
                valid = false
                break
            }
            cur |= bit
        }

        if valid {
            A = append(A, pair{cur, len(s)})
        }
    }

    var dfs func(i, subSeq int) int
    dfs = func(i, subSeq int) int {
        if i == len(A) {
            return 0
        }

        res := dfs(i+1, subSeq)

        curSeq, length := A[i].mask, A[i].length
        if subSeq&curSeq == 0 {
            take := length + dfs(i+1, subSeq|curSeq)
            if take > res {
                res = take
            }
        }
        return res
    }

    return dfs(0, 0)
}
```

```kotlin
class Solution {
    fun maxLength(arr: List<String>): Int {
        val A = mutableListOf<IntArray>()

        for (s in arr) {
            var cur = 0
            var valid = true

            for (c in s) {
                val bit = 1 shl (c - 'a')
                if (cur and bit != 0) {
                    valid = false
                    break
                }
                cur = cur or bit
            }

            if (valid) {
                A.add(intArrayOf(cur, s.length))
            }
        }

        fun dfs(i: Int, subSeq: Int): Int {
            if (i == A.size) {
                return 0
            }

            var res = dfs(i + 1, subSeq)

            val (curSeq, length) = A[i]
            if (subSeq and curSeq == 0) {
                res = maxOf(res, length + dfs(i + 1, subSeq or curSeq))
            }
            return res
        }

        return dfs(0, 0)
    }
}
```

```swift
class Solution {
    func maxLength(_ arr: [String]) -> Int {
        var A = [(mask: Int, length: Int)]()

        for s in arr {
            var cur = 0
            var valid = true

            for c in s {
                let bit = 1 << Int(c.asciiValue! - Character("a").asciiValue!)
                if cur & bit != 0 {
                    valid = false
                    break
                }
                cur |= bit
            }

            if valid {
                A.append((cur, s.count))
            }
        }

        func dfs(_ i: Int, _ subSeq: Int) -> Int {
            if i == A.count {
                return 0
            }

            var res = dfs(i + 1, subSeq)

            let (curSeq, length) = A[i]
            if subSeq & curSeq == 0 {
                res = max(res, length + dfs(i + 1, subSeq | curSeq))
            }
            return res
        }

        return dfs(0, 0)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n + 2 ^ n)$
- Space complexity: $O(n)$

> Where $n$ is the number of strings and $m$ is the maximum length of a string.

---

## 4. Recursion (Bit Mask) - II

### Intuition

This is a variation of the bitmask recursion that uses a different traversal pattern. Instead of explicitly choosing to skip or include each string, we iterate through all remaining strings and only recurse when we find a compatible one. This approach naturally prunes branches where strings conflict, though the overall complexity remains similar.

### Algorithm

1. Preprocess strings into bitmask and length pairs, filtering out strings with duplicate characters.
2. Use recursion with parameters `i` (starting index) and `subSeq` (current character bitmask).
3. In each call, iterate from index `i` to the end. For each string whose mask doesn't conflict with `subSeq`, recurse with the combined mask and track the maximum length achieved.
4. Return the maximum result found across all branches.

::tabs-start

```python
class Solution:
    def maxLength(self, arr: List[str]) -> int:
        def getIdx(c):
            return ord(c) - ord('a')

        A = []
        for s in arr:
            cur = 0
            valid = True
            for c in s:
                if cur & (1 << getIdx(c)):
                    valid = False
                    break
                cur |= (1 << getIdx(c))

            if valid:
                A.append([cur, len(s)])

        def dfs(i, subSeq):
            res = 0
            for j in range(i, len(A)):
                curSeq, length = A[j][0], A[j][1]
                if (subSeq & curSeq) == 0:
                    res = max(res, length + dfs(j + 1, subSeq | curSeq))
            return res

        return dfs(0, 0)
```

```java
public class Solution {
    public int maxLength(List<String> arr) {
        List<int[]> A = new ArrayList<>();

        for (String s : arr) {
            int cur = 0;
            boolean valid = true;

            for (char c : s.toCharArray()) {
                if ((cur & (1 << (c - 'a'))) != 0) {
                    valid = false;
                    break;
                }
                cur |= (1 << (c - 'a'));
            }

            if (valid) {
                A.add(new int[]{cur, s.length()});
            }
        }

        return dfs(0, 0, A);
    }

    private int dfs(int i, int subSeq, List<int[]> A) {
        int res = 0;
        for (int j = i; j < A.size(); j++) {
            int curSeq = A.get(j)[0], length = A.get(j)[1];
            if ((subSeq & curSeq) == 0) {
                res = Math.max(res, length + dfs(j + 1, subSeq | curSeq, A));
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int maxLength(vector<string>& arr) {
        vector<pair<int, int>> A;

        for (const string& s : arr) {
            int cur = 0;
            bool valid = true;

            for (char c : s) {
                if (cur & (1 << (c - 'a'))) {
                    valid = false;
                    break;
                }
                cur |= (1 << (c - 'a'));
            }

            if (valid) {
                A.emplace_back(cur, s.length());
            }
        }

        return dfs(0, 0, A);
    }

private:
    int dfs(int i, int subSeq, vector<pair<int, int>>& A) {
        int res = 0;
        for (int j = i; j < A.size(); j++) {
            int curSeq = A[j].first, length = A[j].second;
            if ((subSeq & curSeq) == 0) {
                res = max(res, length + dfs(j + 1, subSeq | curSeq, A));
            }
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[]} arr
     * @return {number}
     */
    maxLength(arr) {
        let A = [];

        for (const s of arr) {
            let cur = 0;
            let valid = true;

            for (const c of s) {
                if (cur & (1 << (c.charCodeAt(0) - 97))) {
                    valid = false;
                    break;
                }
                cur |= 1 << (c.charCodeAt(0) - 97);
            }

            if (valid) {
                A.push([cur, s.length]);
            }
        }

        const dfs = (i, subSeq) => {
            let res = 0;
            for (let j = i; j < A.length; j++) {
                let [curSeq, length] = A[j];
                if ((subSeq & curSeq) === 0) {
                    res = Math.max(res, length + dfs(j + 1, subSeq | curSeq));
                }
            }
            return res;
        };

        return dfs(0, 0);
    }
}
```

```csharp
public class Solution {
    private List<int[]> A = new List<int[]>();

    public int MaxLength(IList<string> arr) {
        foreach (string s in arr) {
            int cur = 0;
            bool valid = true;

            foreach (char c in s) {
                if ((cur & (1 << (c - 'a'))) != 0) {
                    valid = false;
                    break;
                }
                cur |= (1 << (c - 'a'));
            }

            if (valid) {
                A.Add(new int[] { cur, s.Length });
            }
        }

        return Dfs(0, 0);
    }

    private int Dfs(int i, int subSeq) {
        int res = 0;
        for (int j = i; j < A.Count; j++) {
            int curSeq = A[j][0], length = A[j][1];
            if ((subSeq & curSeq) == 0) {
                res = Math.Max(res, length + Dfs(j + 1, subSeq | curSeq));
            }
        }
        return res;
    }
}
```

```go
func maxLength(arr []string) int {
    type pair struct {
        mask   int
        length int
    }
    A := []pair{}

    for _, s := range arr {
        cur := 0
        valid := true

        for _, c := range s {
            bit := 1 << (c - 'a')
            if cur&bit != 0 {
                valid = false
                break
            }
            cur |= bit
        }

        if valid {
            A = append(A, pair{cur, len(s)})
        }
    }

    var dfs func(i, subSeq int) int
    dfs = func(i, subSeq int) int {
        res := 0
        for j := i; j < len(A); j++ {
            curSeq, length := A[j].mask, A[j].length
            if subSeq&curSeq == 0 {
                take := length + dfs(j+1, subSeq|curSeq)
                if take > res {
                    res = take
                }
            }
        }
        return res
    }

    return dfs(0, 0)
}
```

```kotlin
class Solution {
    fun maxLength(arr: List<String>): Int {
        val A = mutableListOf<IntArray>()

        for (s in arr) {
            var cur = 0
            var valid = true

            for (c in s) {
                val bit = 1 shl (c - 'a')
                if (cur and bit != 0) {
                    valid = false
                    break
                }
                cur = cur or bit
            }

            if (valid) {
                A.add(intArrayOf(cur, s.length))
            }
        }

        fun dfs(i: Int, subSeq: Int): Int {
            var res = 0
            for (j in i until A.size) {
                val (curSeq, length) = A[j]
                if (subSeq and curSeq == 0) {
                    res = maxOf(res, length + dfs(j + 1, subSeq or curSeq))
                }
            }
            return res
        }

        return dfs(0, 0)
    }
}
```

```swift
class Solution {
    func maxLength(_ arr: [String]) -> Int {
        var A = [(mask: Int, length: Int)]()

        for s in arr {
            var cur = 0
            var valid = true

            for c in s {
                let bit = 1 << Int(c.asciiValue! - Character("a").asciiValue!)
                if cur & bit != 0 {
                    valid = false
                    break
                }
                cur |= bit
            }

            if valid {
                A.append((cur, s.count))
            }
        }

        func dfs(_ i: Int, _ subSeq: Int) -> Int {
            var res = 0
            for j in i..<A.count {
                let (curSeq, length) = A[j]
                if subSeq & curSeq == 0 {
                    res = max(res, length + dfs(j + 1, subSeq | curSeq))
                }
            }
            return res
        }

        return dfs(0, 0)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * (m  + 2 ^ n))$
- Space complexity: $O(n)$

> Where $n$ is the number of strings and $m$ is the maximum length of a string.

---

## 5. Dynamic Programming

### Intuition

Instead of recursion, we can build solutions iteratively. We maintain a set of all unique bitmasks we can achieve so far. For each new valid string, we try combining it with every existing bitmask in our set. If they don't conflict, we add the combined mask to our collection. The answer is the maximum number of set bits among all masks.

### Algorithm

1. Initialize a set `dp` containing just `0` (representing the empty selection).
2. For each string, compute its bitmask. Skip strings with duplicate characters.
3. For each existing mask `seq` in `dp`, check if it conflicts with the current string's mask. If not, add `seq | cur` to a new set and update the maximum bit count.
4. After processing all strings, return the maximum bit count found (which equals the maximum length since each bit represents one unique character).

::tabs-start

```python
class Solution:
    def maxLength(self, arr: List[str]) -> int:
        dp = {0}
        res = 0

        for s in arr:
            cur = 0
            valid = True

            for c in s:
                bit = 1 << (ord(c) - ord('a'))
                if cur & bit:
                    valid = False
                    break
                cur |= bit

            if not valid:
                continue

            next_dp = dp.copy()
            for seq in dp:
                if (seq & cur) or (seq | cur) in dp:
                    continue
                next_dp.add(seq | cur)
                res = max(res, bin(seq | cur).count('1'))
            dp = next_dp

        return res
```

```java
public class Solution {
    public int maxLength(List<String> arr) {
        Set<Integer> dp = new HashSet<>();
        dp.add(0);
        int res = 0;

        for (String s : arr) {
            int cur = 0;
            boolean valid = true;

            for (char c : s.toCharArray()) {
                int bit = 1 << (c - 'a');
                if ((cur & bit) != 0) {
                    valid = false;
                    break;
                }
                cur |= bit;
            }

            if (!valid) {
                continue;
            }

            Set<Integer> next_dp = new HashSet<>(dp);
            for (int seq : dp) {
                if ((seq & cur) != 0 || next_dp.contains(seq | cur)) {
                    continue;
                }
                next_dp.add(seq | cur);
                res = Math.max(res, Integer.bitCount(seq | cur));
            }
            dp = next_dp;
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int maxLength(vector<string>& arr) {
        unordered_set<int> dp;
        dp.insert(0);
        int res = 0;

        for (const string& s : arr) {
            int cur = 0;
            bool valid = true;

            for (char c : s) {
                int bit = 1 << (c - 'a');
                if (cur & bit) {
                    valid = false;
                    break;
                }
                cur |= bit;
            }

            if (!valid) {
                continue;
            }

            unordered_set<int> next_dp(dp);
            for (int seq : dp) {
                if ((seq & cur) || next_dp.count(seq | cur)) {
                    continue;
                }
                next_dp.insert(seq | cur);
                res = max(res, __builtin_popcount(seq | cur));
            }
            dp = next_dp;
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[]} arr
     * @return {number}
     */
    maxLength(arr) {
        let dp = new Set();
        dp.add(0);
        let res = 0;

        for (const s of arr) {
            let cur = 0;
            let valid = true;

            for (const c of s) {
                let bit = 1 << (c.charCodeAt(0) - 97);
                if (cur & bit) {
                    valid = false;
                    break;
                }
                cur |= bit;
            }

            if (!valid) {
                continue;
            }

            let next_dp = new Set(dp);
            for (let seq of dp) {
                if (seq & cur || next_dp.has(seq | cur)) {
                    continue;
                }
                next_dp.add(seq | cur);
                res = Math.max(
                    res,
                    (seq | cur).toString(2).split('0').join('').length,
                );
            }
            dp = next_dp;
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int MaxLength(IList<string> arr) {
        HashSet<int> dp = new HashSet<int>();
        dp.Add(0);
        int res = 0;

        foreach (string s in arr) {
            int cur = 0;
            bool valid = true;

            foreach (char c in s) {
                int bit = 1 << (c - 'a');
                if ((cur & bit) != 0) {
                    valid = false;
                    break;
                }
                cur |= bit;
            }

            if (!valid) {
                continue;
            }

            HashSet<int> nextDp = new HashSet<int>(dp);
            foreach (int seq in dp) {
                if ((seq & cur) != 0 || nextDp.Contains(seq | cur)) {
                    continue;
                }
                nextDp.Add(seq | cur);
                res = Math.Max(res, BitCount(seq | cur));
            }
            dp = nextDp;
        }

        return res;
    }

    private int BitCount(int n) {
        int count = 0;
        while (n != 0) {
            count += n & 1;
            n >>= 1;
        }
        return count;
    }
}
```

```go
func maxLength(arr []string) int {
    dp := make(map[int]bool)
    dp[0] = true
    res := 0

    popcount := func(n int) int {
        count := 0
        for n != 0 {
            count += n & 1
            n >>= 1
        }
        return count
    }

    for _, s := range arr {
        cur := 0
        valid := true

        for _, c := range s {
            bit := 1 << (c - 'a')
            if cur&bit != 0 {
                valid = false
                break
            }
            cur |= bit
        }

        if !valid {
            continue
        }

        nextDp := make(map[int]bool)
        for seq := range dp {
            nextDp[seq] = true
        }
        for seq := range dp {
            if seq&cur != 0 || nextDp[seq|cur] {
                continue
            }
            nextDp[seq|cur] = true
            cnt := popcount(seq | cur)
            if cnt > res {
                res = cnt
            }
        }
        dp = nextDp
    }

    return res
}
```

```kotlin
class Solution {
    fun maxLength(arr: List<String>): Int {
        var dp = mutableSetOf(0)
        var res = 0

        for (s in arr) {
            var cur = 0
            var valid = true

            for (c in s) {
                val bit = 1 shl (c - 'a')
                if (cur and bit != 0) {
                    valid = false
                    break
                }
                cur = cur or bit
            }

            if (!valid) {
                continue
            }

            val nextDp = dp.toMutableSet()
            for (seq in dp) {
                if (seq and cur != 0 || (seq or cur) in nextDp) {
                    continue
                }
                nextDp.add(seq or cur)
                res = maxOf(res, Integer.bitCount(seq or cur))
            }
            dp = nextDp
        }

        return res
    }
}
```

```swift
class Solution {
    func maxLength(_ arr: [String]) -> Int {
        var dp = Set<Int>([0])
        var res = 0

        func popcount(_ n: Int) -> Int {
            var count = 0
            var num = n
            while num != 0 {
                count += num & 1
                num >>= 1
            }
            return count
        }

        for s in arr {
            var cur = 0
            var valid = true

            for c in s {
                let bit = 1 << Int(c.asciiValue! - Character("a").asciiValue!)
                if cur & bit != 0 {
                    valid = false
                    break
                }
                cur |= bit
            }

            if !valid {
                continue
            }

            var nextDp = dp
            for seq in dp {
                if seq & cur != 0 || nextDp.contains(seq | cur) {
                    continue
                }
                nextDp.insert(seq | cur)
                res = max(res, popcount(seq | cur))
            }
            dp = nextDp
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * (m  + 2 ^ n))$
- Space complexity: $O(2 ^ n)$

> Where $n$ is the number of strings and $m$ is the maximum length of a string.
