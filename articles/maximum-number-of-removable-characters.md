## 1. Brute Force

### Intuition

We want to find the maximum number of characters we can remove from `s` (in the order given by `removable`) while keeping `p` as a subsequence of `s`.

The simplest approach is to remove characters one at a time. After each removal, check if `p` is still a subsequence. Once `p` is no longer a subsequence, stop and return the count of successful removals.

### Algorithm

1. Maintain a set `marked` of indices that have been removed.
2. Iterate through `removable`:
   - Add the current index to `marked`.
   - Check if `p` is a subsequence of `s` (skipping marked indices).
   - If `p` is still a subsequence, increment the result counter.
   - If not, break out of the loop.
3. Return the count of successful removals.

::tabs-start

```python
class Solution:
    def maximumRemovals(self, s: str, p: str, removable: List[int]) -> int:
        n, m = len(s), len(p)
        marked = set()
        res = 0

        for removeIdx in removable:
            marked.add(removeIdx)

            sIdx = pIdx = 0
            while pIdx < m and sIdx < n:
                if sIdx not in marked and s[sIdx] == p[pIdx]:
                    pIdx += 1
                sIdx += 1
            if pIdx != m:
                break
            res += 1

        return res
```

```java
public class Solution {
    public int maximumRemovals(String s, String p, int[] removable) {
        int n = s.length(), m = p.length();
        Set<Integer> marked = new HashSet<>();
        int res = 0;

        for (int removeIdx : removable) {
            marked.add(removeIdx);

            int sIdx = 0, pIdx = 0;
            while (pIdx < m && sIdx < n) {
                if (!marked.contains(sIdx) && s.charAt(sIdx) == p.charAt(pIdx)) {
                    pIdx++;
                }
                sIdx++;
            }

            if (pIdx != m) break;
            res++;
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int maximumRemovals(string s, string p, vector<int>& removable) {
        int n = s.size(), m = p.size();
        unordered_set<int> marked;
        int res = 0;

        for (int removeIdx : removable) {
            marked.insert(removeIdx);

            int sIdx = 0, pIdx = 0;
            while (pIdx < m && sIdx < n) {
                if (marked.find(sIdx) == marked.end() && s[sIdx] == p[pIdx]) {
                    pIdx++;
                }
                sIdx++;
            }

            if (pIdx != m) break;
            res++;
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @param {string} p
     * @param {number[]} removable
     * @return {number}
     */
    maximumRemovals(s, p, removable) {
        let n = s.length,
            m = p.length;
        let marked = new Set();
        let res = 0;

        for (let removeIdx of removable) {
            marked.add(removeIdx);

            let sIdx = 0,
                pIdx = 0;
            while (pIdx < m && sIdx < n) {
                if (!marked.has(sIdx) && s[sIdx] === p[pIdx]) {
                    pIdx++;
                }
                sIdx++;
            }

            if (pIdx !== m) break;
            res++;
        }

        return res;
    }
}
```

```go
func maximumRemovals(s string, p string, removable []int) int {
    n, m := len(s), len(p)
    marked := make(map[int]bool)
    res := 0

    for _, removeIdx := range removable {
        marked[removeIdx] = true

        sIdx, pIdx := 0, 0
        for pIdx < m && sIdx < n {
            if !marked[sIdx] && s[sIdx] == p[pIdx] {
                pIdx++
            }
            sIdx++
        }

        if pIdx != m {
            break
        }
        res++
    }

    return res
}
```

```kotlin
class Solution {
    fun maximumRemovals(s: String, p: String, removable: IntArray): Int {
        val n = s.length
        val m = p.length
        val marked = mutableSetOf<Int>()
        var res = 0

        for (removeIdx in removable) {
            marked.add(removeIdx)

            var sIdx = 0
            var pIdx = 0
            while (pIdx < m && sIdx < n) {
                if (sIdx !in marked && s[sIdx] == p[pIdx]) {
                    pIdx++
                }
                sIdx++
            }

            if (pIdx != m) break
            res++
        }

        return res
    }
}
```

```swift
class Solution {
    func maximumRemovals(_ s: String, _ p: String, _ removable: [Int]) -> Int {
        let sArr = Array(s)
        let pArr = Array(p)
        let n = sArr.count
        let m = pArr.count
        var marked = Set<Int>()
        var res = 0

        for removeIdx in removable {
            marked.insert(removeIdx)

            var sIdx = 0
            var pIdx = 0
            while pIdx < m && sIdx < n {
                if !marked.contains(sIdx) && sArr[sIdx] == pArr[pIdx] {
                    pIdx += 1
                }
                sIdx += 1
            }

            if pIdx != m { break }
            res += 1
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(k * (n + m))$
- Space complexity: $O(k)$

> Where $n$ and $m$ are the lengths of the given strings $s$ and $p$ respectively. $k$ is the size of the array $removable$.

---

## 2. Binary Search + Hash Set

### Intuition

If removing the first `k` characters still allows `p` to be a subsequence, then removing fewer than `k` characters will also work. Conversely, if removing `k` characters breaks the subsequence property, removing more will certainly break it too.

This monotonic property makes binary search applicable. We search for the largest `k` such that after removing `removable[0..k]`, `p` remains a subsequence.

### Algorithm

1. Binary search over the number of removals `k` (range: `0` to length of `removable - 1`).
2. For each midpoint `m`:
   - Create a set of removed indices from `removable[0..m]`.
   - Check if `p` is a subsequence of `s` (skipping removed indices).
   - If yes, search the right half (try more removals).
   - If no, search the left half (try fewer removals).
3. Track the maximum valid `k` found.
4. Return the result.

::tabs-start

```python
class Solution:
    def maximumRemovals(self, s: str, p: str, removable: List[int]) -> int:
        def isSubseq(s, subseq, removed):
            i1 = i2 = 0
            while i1 < len(s) and i2 < len(subseq):
                if i1 in removed or s[i1] != subseq[i2]:
                    i1 += 1
                    continue
                i1 += 1
                i2 += 1
            return i2 == len(subseq)

        res = 0
        l, r = 0, len(removable) - 1
        while l <= r:
            m = (l + r) // 2
            removed = set(removable[:m + 1])
            if isSubseq(s, p, removed):
                res = max(res, m + 1)
                l = m + 1
            else:
                r = m - 1

        return res
```

```java
public class Solution {
    public int maximumRemovals(String s, String p, int[] removable) {
        int res = 0, l = 0, r = removable.length - 1;

        while (l <= r) {
            int m = (l + r) / 2;
            Set<Integer> removed = new HashSet<>();
            for (int i = 0; i <= m; i++) {
                removed.add(removable[i]);
            }

            if (isSubseq(s, p, removed)) {
                res = Math.max(res, m + 1);
                l = m + 1;
            } else {
                r = m - 1;
            }
        }

        return res;
    }

    private boolean isSubseq(String s, String subseq, Set<Integer> removed) {
        int i1 = 0, i2 = 0;
        while (i1 < s.length() && i2 < subseq.length()) {
            if (removed.contains(i1) || s.charAt(i1) != subseq.charAt(i2)) {
                i1++;
                continue;
            }
            i1++;
            i2++;
        }
        return i2 == subseq.length();
    }
}
```

```cpp
class Solution {
public:
    int maximumRemovals(string s, string p, vector<int>& removable) {
        int res = 0, l = 0, r = removable.size() - 1;

        while (l <= r) {
            int m = (l + r) / 2;
            unordered_set<int> removed(removable.begin(), removable.begin() + m + 1);

            if (isSubseq(s, p, removed)) {
                res = max(res, m + 1);
                l = m + 1;
            } else {
                r = m - 1;
            }
        }

        return res;
    }

private:
    bool isSubseq(string& s, string& subseq, unordered_set<int>& removed) {
        int i1 = 0, i2 = 0;
        while (i1 < s.size() && i2 < subseq.size()) {
            if (removed.count(i1) || s[i1] != subseq[i2]) {
                i1++;
                continue;
            }
            i1++;
            i2++;
        }
        return i2 == subseq.size();
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @param {string} p
     * @param {number[]} removable
     * @return {number}
     */
    maximumRemovals(s, p, removable) {
        let res = 0,
            l = 0,
            r = removable.length - 1;

        while (l <= r) {
            let m = Math.floor((l + r) / 2);
            let removed = new Set(removable.slice(0, m + 1));

            if (this.isSubseq(s, p, removed)) {
                res = Math.max(res, m + 1);
                l = m + 1;
            } else {
                r = m - 1;
            }
        }

        return res;
    }

    /**
     * @param {string} s
     * @param {string} subseq
     * @param {Set<number>} removed
     * @return {boolean}
     */
    isSubseq(s, subseq, removed) {
        let i1 = 0,
            i2 = 0;
        while (i1 < s.length && i2 < subseq.length) {
            if (removed.has(i1) || s[i1] !== subseq[i2]) {
                i1++;
                continue;
            }
            i1++;
            i2++;
        }
        return i2 === subseq.length;
    }
}
```

```go
func maximumRemovals(s string, p string, removable []int) int {
    res, l, r := 0, 0, len(removable)-1

    isSubseq := func(s, subseq string, removed map[int]bool) bool {
        i1, i2 := 0, 0
        for i1 < len(s) && i2 < len(subseq) {
            if removed[i1] || s[i1] != subseq[i2] {
                i1++
                continue
            }
            i1++
            i2++
        }
        return i2 == len(subseq)
    }

    for l <= r {
        m := (l + r) / 2
        removed := make(map[int]bool)
        for i := 0; i <= m; i++ {
            removed[removable[i]] = true
        }

        if isSubseq(s, p, removed) {
            if m+1 > res {
                res = m + 1
            }
            l = m + 1
        } else {
            r = m - 1
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun maximumRemovals(s: String, p: String, removable: IntArray): Int {
        var res = 0
        var l = 0
        var r = removable.size - 1

        while (l <= r) {
            val m = (l + r) / 2
            val removed = removable.sliceArray(0..m).toHashSet()

            if (isSubseq(s, p, removed)) {
                res = maxOf(res, m + 1)
                l = m + 1
            } else {
                r = m - 1
            }
        }

        return res
    }

    private fun isSubseq(s: String, subseq: String, removed: Set<Int>): Boolean {
        var i1 = 0
        var i2 = 0
        while (i1 < s.length && i2 < subseq.length) {
            if (i1 in removed || s[i1] != subseq[i2]) {
                i1++
                continue
            }
            i1++
            i2++
        }
        return i2 == subseq.length
    }
}
```

```swift
class Solution {
    func maximumRemovals(_ s: String, _ p: String, _ removable: [Int]) -> Int {
        let sArr = Array(s)
        let pArr = Array(p)
        var res = 0
        var l = 0
        var r = removable.count - 1

        func isSubseq(_ removed: Set<Int>) -> Bool {
            var i1 = 0
            var i2 = 0
            while i1 < sArr.count && i2 < pArr.count {
                if removed.contains(i1) || sArr[i1] != pArr[i2] {
                    i1 += 1
                    continue
                }
                i1 += 1
                i2 += 1
            }
            return i2 == pArr.count
        }

        while l <= r {
            let m = (l + r) / 2
            let removed = Set(removable[0...m])

            if isSubseq(removed) {
                res = max(res, m + 1)
                l = m + 1
            } else {
                r = m - 1
            }
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O((n + m) * \log k)$
- Space complexity: $O(k)$

> Where $n$ and $m$ are the lengths of the given strings $s$ and $p$ respectively. $k$ is the size of the array $removable$.

---

## 3. Binary Search

### Intuition

Instead of using a hash set to track removed indices (which adds overhead), we can directly modify the string by replacing removed characters with a placeholder character (like `'#'`). This avoids hash lookups during the subsequence check.

The binary search logic remains the same, but the subsequence check becomes simpler since we just compare characters, skipping any `'#'` naturally by checking for equality.

### Algorithm

1. Binary search over the number of removals with `l = 0` and `r = length of removable`.
2. For each midpoint `mid`:
   - Create a copy of `s` as a character array.
   - Mark positions `removable[0..mid]` as `'#'`.
   - Check if `p` is a subsequence (characters equal to `'#'` will never match).
   - If yes, move `l = mid + 1`.
   - If no, move `r = mid`.
3. Return `l` as the maximum number of removals.

::tabs-start

```python
class Solution:
    def maximumRemovals(self, s: str, p: str, removable: List[int]) -> int:
        l, r = 0, len(removable)
        n, m = len(s), len(p)

        def isSubseq(tmpS):
            i1 = i2 = 0
            while i1 < n and i2 < m:
                if tmpS[i1] == p[i2]:
                    i2 += 1
                i1 += 1
            return i2 == m

        while l < r:
            mid = l + (r - l) // 2
            tmpS = list(s)

            for i in range(mid + 1):
                tmpS[removable[i]] = '#'

            if isSubseq(tmpS):
                l = mid + 1
            else:
                r = mid

        return l
```

```java
public class Solution {
    public int maximumRemovals(String s, String p, int[] removable) {
        int l = 0, r = removable.length;
        int n = s.length(), m = p.length();

        while (l < r) {
            int mid = l + (r - l) / 2;
            char[] tmpS = s.toCharArray();

            for (int i = 0; i <= mid; i++) {
                tmpS[removable[i]] = '#';
            }

            if (isSubseq(tmpS, p)) {
                l = mid + 1;
            } else {
                r = mid;
            }
        }

        return l;
    }

    private boolean isSubseq(char[] s, String p) {
        int i1 = 0, i2 = 0, n = s.length, m = p.length();

        while (i1 < n && i2 < m) {
            if (s[i1] == p.charAt(i2)) {
                i2++;
            }
            i1++;
        }
        return i2 == m;
    }
}
```

```cpp
class Solution {
public:
    int maximumRemovals(string s, string p, vector<int>& removable) {
        int l = 0, r = removable.size();
        int n = s.size(), m = p.size();

        while (l < r) {
            int mid = l + (r - l) / 2;
            string tmpS = s;

            for (int i = 0; i <= mid; i++) {
                tmpS[removable[i]] = '#';
            }

            if (isSubseq(tmpS, p)) {
                l = mid + 1;
            } else {
                r = mid;
            }
        }

        return l;
    }

private:
    bool isSubseq(const string& s, const string& p) {
        int i1 = 0, i2 = 0, n = s.size(), m = p.size();

        while (i1 < n && i2 < m) {
            if (s[i1] == p[i2]) {
                i2++;
            }
            i1++;
        }
        return i2 == m;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @param {string} p
     * @param {number[]} removable
     * @return {number}
     */
    maximumRemovals(s, p, removable) {
        let l = 0,
            r = removable.length;
        let n = s.length,
            m = p.length;

        const isSubseq = (tmpS) => {
            let i1 = 0,
                i2 = 0;
            while (i1 < n && i2 < m) {
                if (tmpS[i1] === p[i2]) {
                    i2++;
                }
                i1++;
            }
            return i2 === m;
        };

        while (l < r) {
            let mid = Math.floor(l + (r - l) / 2);
            let tmpS = s.split('');

            for (let i = 0; i <= mid; i++) {
                tmpS[removable[i]] = '#';
            }

            if (isSubseq(tmpS)) {
                l = mid + 1;
            } else {
                r = mid;
            }
        }

        return l;
    }
}
```

```go
func maximumRemovals(s string, p string, removable []int) int {
    l, r := 0, len(removable)
    n, m := len(s), len(p)

    isSubseq := func(tmpS []byte) bool {
        i1, i2 := 0, 0
        for i1 < n && i2 < m {
            if tmpS[i1] == p[i2] {
                i2++
            }
            i1++
        }
        return i2 == m
    }

    for l < r {
        mid := l + (r-l)/2
        tmpS := []byte(s)

        for i := 0; i <= mid; i++ {
            tmpS[removable[i]] = '#'
        }

        if isSubseq(tmpS) {
            l = mid + 1
        } else {
            r = mid
        }
    }

    return l
}
```

```kotlin
class Solution {
    fun maximumRemovals(s: String, p: String, removable: IntArray): Int {
        var l = 0
        var r = removable.size
        val n = s.length
        val m = p.length

        fun isSubseq(tmpS: CharArray): Boolean {
            var i1 = 0
            var i2 = 0
            while (i1 < n && i2 < m) {
                if (tmpS[i1] == p[i2]) {
                    i2++
                }
                i1++
            }
            return i2 == m
        }

        while (l < r) {
            val mid = l + (r - l) / 2
            val tmpS = s.toCharArray()

            for (i in 0..mid) {
                tmpS[removable[i]] = '#'
            }

            if (isSubseq(tmpS)) {
                l = mid + 1
            } else {
                r = mid
            }
        }

        return l
    }
}
```

```swift
class Solution {
    func maximumRemovals(_ s: String, _ p: String, _ removable: [Int]) -> Int {
        var l = 0
        var r = removable.count
        var sArr = Array(s)
        let pArr = Array(p)
        let n = sArr.count
        let m = pArr.count

        func isSubseq(_ tmpS: [Character]) -> Bool {
            var i1 = 0
            var i2 = 0
            while i1 < n && i2 < m {
                if tmpS[i1] == pArr[i2] {
                    i2 += 1
                }
                i1 += 1
            }
            return i2 == m
        }

        while l < r {
            let mid = l + (r - l) / 2
            var tmpS = sArr

            for i in 0...mid {
                tmpS[removable[i]] = "#"
            }

            if isSubseq(tmpS) {
                l = mid + 1
            } else {
                r = mid
            }
        }

        return l
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O((n + m) * \log k)$
- Space complexity: $O(n)$

> Where $n$ and $m$ are the lengths of the given strings $s$ and $p$ respectively. $k$ is the size of the array $removable$.

---

## Common Pitfalls

### Off-by-One Errors in Binary Search Bounds

When setting up binary search, a common mistake is using incorrect bounds or midpoint calculations. The search space is `0` to `len(removable)`, not `0` to `len(removable) - 1`, because we need to consider removing zero characters as a valid option. Additionally, confusing `l < r` vs `l <= r` loop conditions leads to either infinite loops or missing valid answers.

### Modifying the Original String Instead of Using a Copy

When marking characters as removed (using `'#'` or similar), forgetting to create a fresh copy of the string for each binary search iteration causes state to persist incorrectly. The removed characters from a previous iteration pollute subsequent checks, leading to wrong results.

### Incorrect Subsequence Check Logic

The subsequence check must skip removed indices while still correctly advancing through both strings. A common bug is incrementing the pattern pointer even when the current character is marked as removed, or failing to increment the source pointer when characters do not match. Both lead to incorrect subsequence determinations.
