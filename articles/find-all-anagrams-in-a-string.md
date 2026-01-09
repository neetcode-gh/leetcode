## 1. Brute Force

### Intuition

An anagram is simply a rearrangement of characters. Two strings are anagrams if they contain the same characters with the same frequencies. The most direct way to check this is to sort both strings and compare them. We can slide through every substring of `s` that has the same length as `p`, sort it, and check if it matches the sorted version of `p`.

### Algorithm

1. Sort the pattern string `p`.
2. For each starting index `i` from `0` to `len(s) - len(p)`:
   - Extract the substring of length `len(p)` starting at `i`.
   - Sort this substring.
   - If it equals the sorted pattern, add `i` to the result list.
3. Return the result list.

::tabs-start

```python
class Solution:
    def findAnagrams(self, s: str, p: str) -> List[int]:
        n, m = len(s), len(p)
        p = sorted(p)
        res = []
        for i in range(n - m + 1):
            sub = sorted(s[i : i + m])
            if sub == p:
                res.append(i)
        return res
```

```java
public class Solution {
    public List<Integer> findAnagrams(String s, String p) {
        int n = s.length(), m = p.length();
        List<Integer> res = new ArrayList<>();
        char[] pArr = p.toCharArray();
        Arrays.sort(pArr);
        String sortedP = new String(pArr);

        for (int i = 0; i <= n - m; i++) {
            char[] subArr = s.substring(i, i + m).toCharArray();
            Arrays.sort(subArr);
            if (new String(subArr).equals(sortedP)) {
                res.add(i);
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> findAnagrams(string s, string p) {
        int n = s.size(), m = p.size();
        vector<int> res;
        sort(p.begin(), p.end());

        for (int i = 0; i <= n - m; i++) {
            string sub = s.substr(i, m);
            sort(sub.begin(), sub.end());
            if (sub == p) {
                res.push_back(i);
            }
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
     * @return {number[]}
     */
    findAnagrams(s, p) {
        const n = s.length,
            m = p.length;
        const res = [];
        const sortedP = p.split('').sort().join('');

        for (let i = 0; i <= n - m; i++) {
            const sub = s
                .substring(i, i + m)
                .split('')
                .sort()
                .join('');
            if (sub === sortedP) {
                res.push(i);
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public IList<int> FindAnagrams(string s, string p) {
        int n = s.Length, m = p.Length;
        List<int> res = new List<int>();
        char[] pArr = p.ToCharArray();
        Array.Sort(pArr);
        string sortedP = new string(pArr);

        for (int i = 0; i <= n - m; i++) {
            char[] subArr = s.Substring(i, m).ToCharArray();
            Array.Sort(subArr);
            if (new string(subArr) == sortedP) {
                res.Add(i);
            }
        }
        return res;
    }
}
```

```go
import "sort"

func findAnagrams(s string, p string) []int {
    n, m := len(s), len(p)
    res := []int{}
    pArr := []byte(p)
    sort.Slice(pArr, func(i, j int) bool { return pArr[i] < pArr[j] })
    sortedP := string(pArr)

    for i := 0; i <= n-m; i++ {
        subArr := []byte(s[i : i+m])
        sort.Slice(subArr, func(i, j int) bool { return subArr[i] < subArr[j] })
        if string(subArr) == sortedP {
            res = append(res, i)
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun findAnagrams(s: String, p: String): List<Int> {
        val n = s.length
        val m = p.length
        val res = mutableListOf<Int>()
        val sortedP = p.toCharArray().sorted().joinToString("")

        for (i in 0..n - m) {
            val sub = s.substring(i, i + m).toCharArray().sorted().joinToString("")
            if (sub == sortedP) {
                res.add(i)
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func findAnagrams(_ s: String, _ p: String) -> [Int] {
        let n = s.count, m = p.count
        var res = [Int]()
        let sortedP = String(p.sorted())
        let sArr = Array(s)

        for i in 0...(n - m) {
            let sub = String(sArr[i..<(i + m)].sorted())
            if sub == sortedP {
                res.append(i)
            }
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * m \log m)$
- Space complexity: $O(m)$

> Where $n$ is the length of the string $s$ and $m$ is the length of the string $p$.

---

## 2. Prefix Count + Sliding Window

### Intuition

Instead of sorting substrings repeatedly, we can precompute character frequencies using prefix sums. For each position in `s`, we maintain a cumulative count of each character seen so far. To get the character frequencies for any window, we subtract the prefix count at the start from the prefix count at the end. If the window's character counts match `p`'s counts, we found an anagram.

### Algorithm

1. Build a frequency array `pCount` for the pattern `p`.
2. Build a 2D prefix array where `prefix[i]` stores the cumulative character counts for `s[0..i-1]`.
3. Slide a window of size `len(p)` across `s`:
   - For each window position, compute character frequencies using `prefix[j+1] - prefix[i]`.
   - If all `26` character counts match `pCount`, add the starting index to the result.
4. Return the result list.

::tabs-start

```python
class Solution:
    def findAnagrams(self, s: str, p: str) -> List[int]:
        n, m = len(s), len(p)
        if m > n:
            return []
        pCount = [0] * 26
        for c in p:
            pCount[ord(c) - ord('a')] += 1

        prefix = [[0] * 26 for _ in range(n + 1)]
        for i in range(1, n + 1):
            for j in range(26):
                prefix[i][j] = prefix[i - 1][j]
            prefix[i][ord(s[i - 1]) - ord('a')] += 1

        i, j = 0, m - 1
        res = []
        while j < n:
            isValid = True
            for c in range(26):
                if prefix[j + 1][c] - prefix[i][c] != pCount[c]:
                    isValid = False
                    break
            if isValid:
                res.append(i)
            i += 1
            j += 1

        return res
```

```java
public class Solution {
    public List<Integer> findAnagrams(String s, String p) {
        int n = s.length(), m = p.length();
        if (m > n) return new ArrayList<>();

        int[] pCount = new int[26];
        for (char c : p.toCharArray()) {
            pCount[c - 'a']++;
        }

        int[][] prefix = new int[n + 1][26];
        for (int i = 1; i <= n; i++) {
            System.arraycopy(prefix[i - 1], 0, prefix[i], 0, 26);
            prefix[i][s.charAt(i - 1) - 'a']++;
        }

        List<Integer> res = new ArrayList<>();
        int i = 0, j = m - 1;
        while (j < n) {
            boolean isValid = true;
            for (int c = 0; c < 26; c++) {
                if (prefix[j + 1][c] - prefix[i][c] != pCount[c]) {
                    isValid = false;
                    break;
                }
            }
            if (isValid) res.add(i);
            i++;
            j++;
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> findAnagrams(string s, string p) {
        int n = s.size(), m = p.size();
        if (m > n) return {};

        vector<int> pCount(26, 0);
        for (char c : p) pCount[c - 'a']++;

        vector<vector<int>> prefix(n + 1, vector<int>(26, 0));
        for (int i = 1; i <= n; i++) {
            prefix[i] = prefix[i - 1];
            prefix[i][s[i - 1] - 'a']++;
        }

        vector<int> res;
        int i = 0, j = m - 1;
        while (j < n) {
            bool isValid = true;
            for (int c = 0; c < 26; c++) {
                if (prefix[j + 1][c] - prefix[i][c] != pCount[c]) {
                    isValid = false;
                    break;
                }
            }
            if (isValid) res.push_back(i);
            i++;
            j++;
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
     * @return {number[]}
     */
    findAnagrams(s, p) {
        const n = s.length,
            m = p.length;
        if (m > n) return [];

        const pCount = Array(26).fill(0);
        for (const c of p) {
            pCount[c.charCodeAt(0) - 97]++;
        }

        const prefix = Array.from({ length: n + 1 }, () => Array(26).fill(0));
        for (let i = 1; i <= n; i++) {
            for (let j = 0; j < 26; j++) {
                prefix[i][j] = prefix[i - 1][j];
            }
            prefix[i][s.charCodeAt(i - 1) - 97]++;
        }

        const res = [];
        let i = 0,
            j = m - 1;
        while (j < n) {
            let isValid = true;
            for (let c = 0; c < 26; c++) {
                if (prefix[j + 1][c] - prefix[i][c] !== pCount[c]) {
                    isValid = false;
                    break;
                }
            }
            if (isValid) res.push(i);
            i++;
            j++;
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public IList<int> FindAnagrams(string s, string p) {
        int n = s.Length, m = p.Length;
        if (m > n) return new List<int>();

        int[] pCount = new int[26];
        foreach (char c in p) {
            pCount[c - 'a']++;
        }

        int[][] prefix = new int[n + 1][];
        for (int i = 0; i <= n; i++) {
            prefix[i] = new int[26];
        }
        for (int i = 1; i <= n; i++) {
            Array.Copy(prefix[i - 1], prefix[i], 26);
            prefix[i][s[i - 1] - 'a']++;
        }

        List<int> res = new List<int>();
        int left = 0, right = m - 1;
        while (right < n) {
            bool isValid = true;
            for (int c = 0; c < 26; c++) {
                if (prefix[right + 1][c] - prefix[left][c] != pCount[c]) {
                    isValid = false;
                    break;
                }
            }
            if (isValid) res.Add(left);
            left++;
            right++;
        }

        return res;
    }
}
```

```go
func findAnagrams(s string, p string) []int {
    n, m := len(s), len(p)
    if m > n {
        return []int{}
    }

    pCount := make([]int, 26)
    for _, c := range p {
        pCount[c-'a']++
    }

    prefix := make([][]int, n+1)
    for i := range prefix {
        prefix[i] = make([]int, 26)
    }
    for i := 1; i <= n; i++ {
        copy(prefix[i], prefix[i-1])
        prefix[i][s[i-1]-'a']++
    }

    res := []int{}
    i, j := 0, m-1
    for j < n {
        isValid := true
        for c := 0; c < 26; c++ {
            if prefix[j+1][c]-prefix[i][c] != pCount[c] {
                isValid = false
                break
            }
        }
        if isValid {
            res = append(res, i)
        }
        i++
        j++
    }

    return res
}
```

```kotlin
class Solution {
    fun findAnagrams(s: String, p: String): List<Int> {
        val n = s.length
        val m = p.length
        if (m > n) return emptyList()

        val pCount = IntArray(26)
        for (c in p) {
            pCount[c - 'a']++
        }

        val prefix = Array(n + 1) { IntArray(26) }
        for (i in 1..n) {
            prefix[i - 1].copyInto(prefix[i])
            prefix[i][s[i - 1] - 'a']++
        }

        val res = mutableListOf<Int>()
        var i = 0
        var j = m - 1
        while (j < n) {
            var isValid = true
            for (c in 0 until 26) {
                if (prefix[j + 1][c] - prefix[i][c] != pCount[c]) {
                    isValid = false
                    break
                }
            }
            if (isValid) res.add(i)
            i++
            j++
        }

        return res
    }
}
```

```swift
class Solution {
    func findAnagrams(_ s: String, _ p: String) -> [Int] {
        let n = s.count, m = p.count
        if m > n { return [] }

        var pCount = [Int](repeating: 0, count: 26)
        for c in p {
            pCount[Int(c.asciiValue!) - 97] += 1
        }

        let sArr = Array(s)
        var prefix = [[Int]](repeating: [Int](repeating: 0, count: 26), count: n + 1)
        for i in 1...n {
            prefix[i] = prefix[i - 1]
            prefix[i][Int(sArr[i - 1].asciiValue!) - 97] += 1
        }

        var res = [Int]()
        var i = 0, j = m - 1
        while j < n {
            var isValid = true
            for c in 0..<26 {
                if prefix[j + 1][c] - prefix[i][c] != pCount[c] {
                    isValid = false
                    break
                }
            }
            if isValid { res.append(i) }
            i += 1
            j += 1
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + m)$
- Space complexity: $O(n)$

> Where $n$ is the length of the string $s$ and $m$ is the length of the string $p$.

---

## 3. Sliding Window

### Intuition

We can avoid rebuilding frequency counts from scratch by using a sliding window. Start by counting characters in the first window of size `len(p)`. As we slide the window one position to the right, we add the new character entering the window and remove the character leaving it. After each slide, we compare the window's character counts with the pattern's counts.

### Algorithm

1. Build frequency arrays `pCount` and `sCount` for `p` and the first `len(p)` characters of `s`.
2. If they match, add index `0` to the result.
3. Slide the window from position `len(p)` to the end of `s`:
   - Add the new character at the right end to `sCount`.
   - Remove the character at the left end from `sCount`.
   - Move the left pointer forward.
   - If `sCount` equals `pCount`, add the new left index to the result.
4. Return the result list.

::tabs-start

```python
class Solution:
    def findAnagrams(self, s: str, p: str) -> List[int]:
        if len(p) > len(s): return []
        pCount, sCount = {}, {}
        for i in range(len(p)):
            pCount[p[i]] = 1 + pCount.get(p[i], 0)
            sCount[s[i]] = 1+ sCount.get(s[i], 0)

        res = [0] if sCount == pCount else []
        l = 0
        for r in range(len(p), len(s)):
            sCount[s[r]] = 1+ sCount.get(s[r], 0)
            sCount[s[l]] -= 1

            if sCount[s[l]] == 0:
                sCount.pop(s[l])
            l += 1
            if sCount == pCount:
                res.append(l)
        return res
```

```java
public class Solution {
    public List<Integer> findAnagrams(String s, String p) {
        if (p.length() > s.length()) return new ArrayList<>();

        int[] pCount = new int[26];
        int[] sCount = new int[26];

        for (char c : p.toCharArray()) {
            pCount[c - 'a']++;
        }
        for (int i = 0; i < p.length(); i++) {
            sCount[s.charAt(i) - 'a']++;
        }

        List<Integer> res = new ArrayList<>();
        if (Arrays.equals(pCount, sCount)) res.add(0);

        int l = 0;
        for (int r = p.length(); r < s.length(); r++) {
            sCount[s.charAt(r) - 'a']++;
            sCount[s.charAt(l) - 'a']--;
            l++;
            if (Arrays.equals(pCount, sCount)) {
                res.add(l);
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> findAnagrams(string s, string p) {
        if (p.size() > s.size()) return {};

        vector<int> pCount(26, 0), sCount(26, 0);
        for (char c : p) {
            pCount[c - 'a']++;
        }
        for (int i = 0; i < p.size(); i++) {
            sCount[s[i] - 'a']++;
        }

        vector<int> res;
        if (pCount == sCount) res.push_back(0);

        int l = 0;
        for (int r = p.size(); r < s.size(); r++) {
            sCount[s[r] - 'a']++;
            sCount[s[l] - 'a']--;
            l++;
            if (pCount == sCount) {
                res.push_back(l);
            }
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
     * @return {number[]}
     */
    findAnagrams(s, p) {
        if (p.length > s.length) return [];

        const pCount = new Array(26).fill(0);
        const sCount = new Array(26).fill(0);

        for (const char of p) {
            pCount[char.charCodeAt(0) - 97]++;
        }
        for (let i = 0; i < p.length; i++) {
            sCount[s.charCodeAt(i) - 97]++;
        }

        const res = [];
        if (pCount.toString() === sCount.toString()) res.push(0);

        let l = 0;
        for (let r = p.length; r < s.length; r++) {
            sCount[s.charCodeAt(r) - 97]++;
            sCount[s.charCodeAt(l) - 97]--;
            l++;
            if (pCount.toString() === sCount.toString()) {
                res.push(l);
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public IList<int> FindAnagrams(string s, string p) {
        if (p.Length > s.Length) return new List<int>();

        int[] pCount = new int[26];
        int[] sCount = new int[26];

        foreach (char c in p) {
            pCount[c - 'a']++;
        }
        for (int i = 0; i < p.Length; i++) {
            sCount[s[i] - 'a']++;
        }

        List<int> res = new List<int>();
        if (pCount.SequenceEqual(sCount)) res.Add(0);

        int l = 0;
        for (int r = p.Length; r < s.Length; r++) {
            sCount[s[r] - 'a']++;
            sCount[s[l] - 'a']--;
            l++;
            if (pCount.SequenceEqual(sCount)) {
                res.Add(l);
            }
        }

        return res;
    }
}
```

```go
func findAnagrams(s string, p string) []int {
    if len(p) > len(s) {
        return []int{}
    }

    pCount := make([]int, 26)
    sCount := make([]int, 26)

    for _, c := range p {
        pCount[c-'a']++
    }
    for i := 0; i < len(p); i++ {
        sCount[s[i]-'a']++
    }

    equal := func() bool {
        for i := 0; i < 26; i++ {
            if pCount[i] != sCount[i] {
                return false
            }
        }
        return true
    }

    res := []int{}
    if equal() {
        res = append(res, 0)
    }

    l := 0
    for r := len(p); r < len(s); r++ {
        sCount[s[r]-'a']++
        sCount[s[l]-'a']--
        l++
        if equal() {
            res = append(res, l)
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun findAnagrams(s: String, p: String): List<Int> {
        if (p.length > s.length) return emptyList()

        val pCount = IntArray(26)
        val sCount = IntArray(26)

        for (c in p) {
            pCount[c - 'a']++
        }
        for (i in p.indices) {
            sCount[s[i] - 'a']++
        }

        val res = mutableListOf<Int>()
        if (pCount.contentEquals(sCount)) res.add(0)

        var l = 0
        for (r in p.length until s.length) {
            sCount[s[r] - 'a']++
            sCount[s[l] - 'a']--
            l++
            if (pCount.contentEquals(sCount)) {
                res.add(l)
            }
        }

        return res
    }
}
```

```swift
class Solution {
    func findAnagrams(_ s: String, _ p: String) -> [Int] {
        if p.count > s.count { return [] }

        var pCount = [Int](repeating: 0, count: 26)
        var sCount = [Int](repeating: 0, count: 26)
        let sArr = Array(s)
        let pArr = Array(p)

        for c in pArr {
            pCount[Int(c.asciiValue!) - 97] += 1
        }
        for i in 0..<pArr.count {
            sCount[Int(sArr[i].asciiValue!) - 97] += 1
        }

        var res = [Int]()
        if pCount == sCount { res.append(0) }

        var l = 0
        for r in pArr.count..<sArr.count {
            sCount[Int(sArr[r].asciiValue!) - 97] += 1
            sCount[Int(sArr[l].asciiValue!) - 97] -= 1
            l += 1
            if pCount == sCount {
                res.append(l)
            }
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + m)$
- Space complexity: $O(1)$ since we have at most $26$ different characters.

> Where $n$ is the length of the string $s$ and $m$ is the length of the string $p$.

---

## 4. Sliding Window (Optimal)

### Intuition

Comparing two arrays of `26` elements after every slide takes extra time. We can optimize by tracking how many of the `26` character counts currently match between the window and the pattern. When we add or remove a character, we only update the match count for that specific character. If all `26` counts match, we found an anagram.

### Algorithm

1. Build frequency arrays `pCount` and `sCount` for the initial window.
2. Count how many of the `26` characters have matching frequencies (initialize `match`).
3. If `match == 26`, add index `0` to the result.
4. Slide the window across `s`:
   - For the character leaving the window: update its count and adjust `match` accordingly.
   - For the character entering the window: update its count and adjust `match` accordingly.
   - If `match == 26`, add the current left index to the result.
5. Return the result list.

::tabs-start

```python
class Solution:
    def findAnagrams(self, s: str, p: str) -> List[int]:
        n, m = len(s), len(p)
        if m > n:
            return []

        pCount = [0] * 26
        sCount = [0] * 26
        for i in range(m):
            pCount[ord(p[i]) - ord('a')] += 1
            sCount[ord(s[i]) - ord('a')] += 1

        match = sum(1 for i in range(26) if pCount[i] == sCount[i])
        res = []
        if match == 26:
            res.append(0)

        l = 0
        for r in range(m, n):
            c = ord(s[l]) - ord('a')
            if sCount[c] == pCount[c]:
                match -= 1
            sCount[c] -= 1
            l += 1
            if sCount[c] == pCount[c]:
                match += 1

            c = ord(s[r]) - ord('a')
            if sCount[c] == pCount[c]:
                match -= 1
            sCount[c] += 1
            if sCount[c] == pCount[c]:
                match += 1

            if match == 26:
                res.append(l)

        return res
```

```java
public class Solution {
    public List<Integer> findAnagrams(String s, String p) {
        int n = s.length(), m = p.length();
        if (m > n) return new ArrayList<>();

        int[] pCount = new int[26], sCount = new int[26];
        for (int i = 0; i < m; i++) {
            pCount[p.charAt(i) - 'a']++;
            sCount[s.charAt(i) - 'a']++;
        }

        int match = 0;
        for (int i = 0; i < 26; i++) {
            if (pCount[i] == sCount[i]) match++;
        }

        List<Integer> res = new ArrayList<>();
        if (match == 26) res.add(0);

        int l = 0;
        for (int r = m; r < n; r++) {
            int c = s.charAt(l) - 'a';
            if (sCount[c] == pCount[c]) match--;
            sCount[c]--;
            l++;
            if (sCount[c] == pCount[c]) match++;

            c = s.charAt(r) - 'a';
            if (sCount[c] == pCount[c]) match--;
            sCount[c]++;
            if (sCount[c] == pCount[c]) match++;

            if (match == 26) res.add(l);
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> findAnagrams(string s, string p) {
        int n = s.size(), m = p.size();
        if (m > n) return {};

        vector<int> pCount(26, 0), sCount(26, 0);
        for (int i = 0; i < m; i++) {
            pCount[p[i] - 'a']++;
            sCount[s[i] - 'a']++;
        }

        int match = 0;
        for (int i = 0; i < 26; i++) {
            if (pCount[i] == sCount[i]) match++;
        }

        vector<int> res;
        if (match == 26) res.push_back(0);

        int l = 0;
        for (int r = m; r < n; r++) {
            int c = s[l] - 'a';
            if (sCount[c] == pCount[c]) match--;
            sCount[c]--;
            l++;
            if (sCount[c] == pCount[c]) match++;

            c = s[r] - 'a';
            if (sCount[c] == pCount[c]) match--;
            sCount[c]++;
            if (sCount[c] == pCount[c]) match++;

            if (match == 26) res.push_back(l);
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
     * @return {number[]}
     */
    findAnagrams(s, p) {
        const n = s.length,
            m = p.length;
        if (m > n) return [];

        const pCount = new Array(26).fill(0);
        const sCount = new Array(26).fill(0);

        for (let i = 0; i < m; i++) {
            pCount[p.charCodeAt(i) - 97]++;
            sCount[s.charCodeAt(i) - 97]++;
        }

        let match = 0;
        for (let i = 0; i < 26; i++) {
            if (pCount[i] === sCount[i]) match++;
        }

        const res = [];
        if (match === 26) res.push(0);

        let l = 0;
        for (let r = m; r < n; r++) {
            let c = s.charCodeAt(l) - 97;
            if (sCount[c] === pCount[c]) match--;
            sCount[c]--;
            l++;
            if (sCount[c] === pCount[c]) match++;

            c = s.charCodeAt(r) - 97;
            if (sCount[c] === pCount[c]) match--;
            sCount[c]++;
            if (sCount[c] === pCount[c]) match++;

            if (match === 26) res.push(l);
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public IList<int> FindAnagrams(string s, string p) {
        int n = s.Length, m = p.Length;
        if (m > n) return new List<int>();

        int[] pCount = new int[26], sCount = new int[26];
        for (int i = 0; i < m; i++) {
            pCount[p[i] - 'a']++;
            sCount[s[i] - 'a']++;
        }

        int match = 0;
        for (int i = 0; i < 26; i++) {
            if (pCount[i] == sCount[i]) match++;
        }

        List<int> res = new List<int>();
        if (match == 26) res.Add(0);

        int l = 0;
        for (int r = m; r < n; r++) {
            int c = s[l] - 'a';
            if (sCount[c] == pCount[c]) match--;
            sCount[c]--;
            l++;
            if (sCount[c] == pCount[c]) match++;

            c = s[r] - 'a';
            if (sCount[c] == pCount[c]) match--;
            sCount[c]++;
            if (sCount[c] == pCount[c]) match++;

            if (match == 26) res.Add(l);
        }

        return res;
    }
}
```

```go
func findAnagrams(s string, p string) []int {
    n, m := len(s), len(p)
    if m > n {
        return []int{}
    }

    pCount := make([]int, 26)
    sCount := make([]int, 26)
    for i := 0; i < m; i++ {
        pCount[p[i]-'a']++
        sCount[s[i]-'a']++
    }

    match := 0
    for i := 0; i < 26; i++ {
        if pCount[i] == sCount[i] {
            match++
        }
    }

    res := []int{}
    if match == 26 {
        res = append(res, 0)
    }

    l := 0
    for r := m; r < n; r++ {
        c := s[l] - 'a'
        if sCount[c] == pCount[c] {
            match--
        }
        sCount[c]--
        l++
        if sCount[c] == pCount[c] {
            match++
        }

        c = s[r] - 'a'
        if sCount[c] == pCount[c] {
            match--
        }
        sCount[c]++
        if sCount[c] == pCount[c] {
            match++
        }

        if match == 26 {
            res = append(res, l)
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun findAnagrams(s: String, p: String): List<Int> {
        val n = s.length
        val m = p.length
        if (m > n) return emptyList()

        val pCount = IntArray(26)
        val sCount = IntArray(26)
        for (i in 0 until m) {
            pCount[p[i] - 'a']++
            sCount[s[i] - 'a']++
        }

        var match = 0
        for (i in 0 until 26) {
            if (pCount[i] == sCount[i]) match++
        }

        val res = mutableListOf<Int>()
        if (match == 26) res.add(0)

        var l = 0
        for (r in m until n) {
            var c = s[l] - 'a'
            if (sCount[c] == pCount[c]) match--
            sCount[c]--
            l++
            if (sCount[c] == pCount[c]) match++

            c = s[r] - 'a'
            if (sCount[c] == pCount[c]) match--
            sCount[c]++
            if (sCount[c] == pCount[c]) match++

            if (match == 26) res.add(l)
        }

        return res
    }
}
```

```swift
class Solution {
    func findAnagrams(_ s: String, _ p: String) -> [Int] {
        let n = s.count, m = p.count
        if m > n { return [] }

        var pCount = [Int](repeating: 0, count: 26)
        var sCount = [Int](repeating: 0, count: 26)
        let sArr = Array(s)
        let pArr = Array(p)

        for i in 0..<m {
            pCount[Int(pArr[i].asciiValue!) - 97] += 1
            sCount[Int(sArr[i].asciiValue!) - 97] += 1
        }

        var match = 0
        for i in 0..<26 {
            if pCount[i] == sCount[i] { match += 1 }
        }

        var res = [Int]()
        if match == 26 { res.append(0) }

        var l = 0
        for r in m..<n {
            var c = Int(sArr[l].asciiValue!) - 97
            if sCount[c] == pCount[c] { match -= 1 }
            sCount[c] -= 1
            l += 1
            if sCount[c] == pCount[c] { match += 1 }

            c = Int(sArr[r].asciiValue!) - 97
            if sCount[c] == pCount[c] { match -= 1 }
            sCount[c] += 1
            if sCount[c] == pCount[c] { match += 1 }

            if match == 26 { res.append(l) }
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + m)$
- Space complexity: $O(1)$ since we have at most $26$ different characters.

> Where $n$ is the length of the string $s$ and $m$ is the length of the string $p$.
