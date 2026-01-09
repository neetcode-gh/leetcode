## 1. Brute Force (Recursion)

### Intuition

A length-3 palindrome has the form `aba` where the first and third characters are the same. We can use recursion to generate all subsequences of length 3 and check which ones are palindromes. This explores all possible combinations by either including or excluding each character.

### Algorithm

1. Use a set to store unique palindromic subsequences.
2. Define a recursive function `rec(i, cur)` where `i` is the current index and `cur` is the current subsequence being built.
3. If `cur` has length `3`:
   - Check if it's a palindrome (first and last characters match).
   - If yes, add it to the set.
   - Return.
4. If `i` reaches the end of the string, return.
5. Make two recursive calls: skip the current character, or include it.
6. Start with `rec(0, "")` and return the size of the set.

::tabs-start

```python
class Solution:
    def countPalindromicSubsequence(self, s: str) -> int:
        res = set()

        def rec(i, cur):
            if len(cur) == 3:
                if cur[0] == cur[2]:
                    res.add(cur)
                return
            if i == len(s):
                return
            rec(i + 1, cur)
            rec(i + 1, cur + s[i])

        rec(0, "")
        return len(res)
```

```java
public class Solution {
    public int countPalindromicSubsequence(String s) {
        Set<String> res = new HashSet<>();
        rec(s, 0, "", res);
        return res.size();
    }

    private void rec(String s, int i, String cur, Set<String> res) {
        if (cur.length() == 3) {
            if (cur.charAt(0) == cur.charAt(2)) {
                res.add(cur);
            }
            return;
        }
        if (i == s.length()) {
            return;
        }
        rec(s, i + 1, cur, res);
        rec(s, i + 1, cur + s.charAt(i), res);
    }
}
```

```cpp
class Solution {
public:
    int countPalindromicSubsequence(string s) {
        unordered_set<string> res;
        rec(s, 0, "", res);
        return res.size();
    }

private:
    void rec(const string& s, int i, string cur, unordered_set<string>& res) {
        if (cur.length() == 3) {
            if (cur[0] == cur[2]) {
                res.insert(cur);
            }
            return;
        }
        if (i == s.length()) {
            return;
        }
        rec(s, i + 1, cur, res);
        rec(s, i + 1, cur + s[i], res);
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    countPalindromicSubsequence(s) {
        const res = new Set();

        const rec = (i, cur) => {
            if (cur.length === 3) {
                if (cur[0] === cur[2]) {
                    res.add(cur);
                }
                return;
            }
            if (i === s.length) {
                return;
            }
            rec(i + 1, cur);
            rec(i + 1, cur + s[i]);
        };

        rec(0, '');
        return res.size;
    }
}
```

```csharp
public class Solution {
    private HashSet<string> res;

    public int CountPalindromicSubsequence(string s) {
        res = new HashSet<string>();
        Rec(s, 0, "");
        return res.Count;
    }

    private void Rec(string s, int i, string cur) {
        if (cur.Length == 3) {
            if (cur[0] == cur[2]) {
                res.Add(cur);
            }
            return;
        }
        if (i == s.Length) {
            return;
        }
        Rec(s, i + 1, cur);
        Rec(s, i + 1, cur + s[i]);
    }
}
```

```go
func countPalindromicSubsequence(s string) int {
    res := make(map[string]bool)

    var rec func(i int, cur string)
    rec = func(i int, cur string) {
        if len(cur) == 3 {
            if cur[0] == cur[2] {
                res[cur] = true
            }
            return
        }
        if i == len(s) {
            return
        }
        rec(i+1, cur)
        rec(i+1, cur+string(s[i]))
    }

    rec(0, "")
    return len(res)
}
```

```kotlin
class Solution {
    fun countPalindromicSubsequence(s: String): Int {
        val res = HashSet<String>()

        fun rec(i: Int, cur: String) {
            if (cur.length == 3) {
                if (cur[0] == cur[2]) {
                    res.add(cur)
                }
                return
            }
            if (i == s.length) {
                return
            }
            rec(i + 1, cur)
            rec(i + 1, cur + s[i])
        }

        rec(0, "")
        return res.size
    }
}
```

```swift
class Solution {
    func countPalindromicSubsequence(_ s: String) -> Int {
        var res = Set<String>()
        let chars = Array(s)

        func rec(_ i: Int, _ cur: String) {
            if cur.count == 3 {
                let curArr = Array(cur)
                if curArr[0] == curArr[2] {
                    res.insert(cur)
                }
                return
            }
            if i == chars.count {
                return
            }
            rec(i + 1, cur)
            rec(i + 1, cur + String(chars[i]))
        }

        rec(0, "")
        return res.count
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(2 ^ n)$
- Space complexity: $O(n + m)$

> Where $n$ is the length of the string $s$ and $m$ is the number of unique three length pallindromic subsequences (26 \* 26 = 676).

---

## 2. Brute Force

### Intuition

Instead of generating all subsequences recursively, we can use three nested loops to pick positions for the three characters. For indices `i < j < k`, we check if `s[i] == s[k]` to form a palindrome. Using a set ensures we count each unique palindrome only once.

### Algorithm

1. Use a set to store unique palindromic subsequences.
2. For each index `i` from `0` to `n-3`:
   - For each index `j` from `i+1` to `n-2`:
     - For each index `k` from `j+1` to `n-1`:
       - If `s[i] == s[k]`, add the string `s[i] + s[j] + s[k]` to the set.
3. Return the size of the set.

::tabs-start

```python
class Solution:
    def countPalindromicSubsequence(self, s: str) -> int:
        res = set()

        for i in range(len(s) - 2):
            for j in range(i + 1, len(s) - 1):
                for k in range(j + 1, len(s)):
                    if s[i] != s[k]:
                        continue
                    res.add(s[i] + s[j] + s[k])
        return len(res)
```

```java
public class Solution {
    public int countPalindromicSubsequence(String s) {
        Set<String> res = new HashSet<>();

        for (int i = 0; i < s.length() - 2; i++) {
            for (int j = i + 1; j < s.length() - 1; j++) {
                for (int k = j + 1; k < s.length(); k++) {
                    if (s.charAt(i) != s.charAt(k)) {
                        continue;
                    }
                    res.add("" + s.charAt(i) + s.charAt(j) + s.charAt(k));
                }
            }
        }
        return res.size();
    }
}
```

```cpp
class Solution {
public:
    int countPalindromicSubsequence(string s) {
        unordered_set<string> res;

        for (int i = 0; i < s.length() - 2; i++) {
            for (int j = i + 1; j < s.length() - 1; j++) {
                for (int k = j + 1; k < s.length(); k++) {
                    if (s[i] != s[k]) {
                        continue;
                    }
                    res.insert(string() + s[i] + s[j] + s[k]);
                }
            }
        }
        return res.size();
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    countPalindromicSubsequence(s) {
        const res = new Set();

        for (let i = 0; i < s.length - 2; i++) {
            for (let j = i + 1; j < s.length - 1; j++) {
                for (let k = j + 1; k < s.length; k++) {
                    if (s[i] !== s[k]) {
                        continue;
                    }
                    res.add(s[i] + s[j] + s[k]);
                }
            }
        }
        return res.size;
    }
}
```

```csharp
public class Solution {
    public int CountPalindromicSubsequence(string s) {
        var res = new HashSet<string>();

        for (int i = 0; i < s.Length - 2; i++) {
            for (int j = i + 1; j < s.Length - 1; j++) {
                for (int k = j + 1; k < s.Length; k++) {
                    if (s[i] != s[k]) {
                        continue;
                    }
                    res.Add("" + s[i] + s[j] + s[k]);
                }
            }
        }
        return res.Count;
    }
}
```

```go
func countPalindromicSubsequence(s string) int {
    res := make(map[string]bool)

    for i := 0; i < len(s)-2; i++ {
        for j := i + 1; j < len(s)-1; j++ {
            for k := j + 1; k < len(s); k++ {
                if s[i] != s[k] {
                    continue
                }
                res[string([]byte{s[i], s[j], s[k]})] = true
            }
        }
    }
    return len(res)
}
```

```kotlin
class Solution {
    fun countPalindromicSubsequence(s: String): Int {
        val res = HashSet<String>()

        for (i in 0 until s.length - 2) {
            for (j in i + 1 until s.length - 1) {
                for (k in j + 1 until s.length) {
                    if (s[i] != s[k]) {
                        continue
                    }
                    res.add("" + s[i] + s[j] + s[k])
                }
            }
        }
        return res.size
    }
}
```

```swift
class Solution {
    func countPalindromicSubsequence(_ s: String) -> Int {
        var res = Set<String>()
        let chars = Array(s)

        for i in 0..<(chars.count - 2) {
            for j in (i + 1)..<(chars.count - 1) {
                for k in (j + 1)..<chars.count {
                    if chars[i] != chars[k] {
                        continue
                    }
                    res.insert(String([chars[i], chars[j], chars[k]]))
                }
            }
        }
        return res.count
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 3)$
- Space complexity: $O(m)$

> Where $n$ is the length of the string $s$ and $m$ is the number of unique three length pallindromic subsequences (26 \* 26 = 676).

---

## 3. Sequential Matching for Each Palindrome

### Intuition

Since we only have 26 lowercase letters, there are at most 26 * 26 = 676 possible palindromes of length 3 (26 choices for the end characters, 26 for the middle). We can check each potential palindrome by scanning the string once to see if it exists as a subsequence.

### Algorithm

1. Initialize `res = 0`.
2. For each possible end character (a to z):
   - For each possible middle character (a to z):
     - Form the palindrome string `ends + mid + ends`.
     - Scan through the input string trying to match this `3`-character sequence in order.
     - If matched, increment `res`.
3. Return `res`.

::tabs-start

```python
class Solution:
    def countPalindromicSubsequence(self, s: str) -> int:
        res = 0
        for ends in range(ord('a'), ord('z') + 1):
            for mid in range(ord('a'), ord('z') + 1):
                seq = chr(ends) + chr(mid) + chr(ends)
                idx, found = 0, 0
                for c in s:
                    if seq[idx] == c:
                        idx += 1
                        if idx == 3:
                            found = 1
                            break
                res += found
        return res
```

```java
public class Solution {
    public int countPalindromicSubsequence(String s) {
        int res = 0;
        for (char ends = 'a'; ends <= 'z'; ends++) {
            for (char mid = 'a'; mid <= 'z'; mid++) {
                String seq = "" + ends + mid + ends;
                int idx = 0, found = 0;
                for (char c : s.toCharArray()) {
                    if (seq.charAt(idx) == c) {
                        idx++;
                        if (idx == 3) {
                            found = 1;
                            break;
                        }
                    }
                }
                res += found;
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int countPalindromicSubsequence(string s) {
        int res = 0;
        for (char ends = 'a'; ends <= 'z'; ends++) {
            for (char mid = 'a'; mid <= 'z'; mid++) {
                string seq = string() + ends + mid + ends;
                int idx = 0, found = 0;
                for (char& c : s) {
                    if (seq[idx] == c) {
                        idx++;
                        if (idx == 3) {
                            found = 1;
                            break;
                        }
                    }
                }
                res += found;
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
     * @return {number}
     */
    countPalindromicSubsequence(s) {
        let res = 0;
        for (let ends = 'a'.charCodeAt(0); ends <= 'z'.charCodeAt(0); ends++) {
            for (let mid = 'a'.charCodeAt(0); mid <= 'z'.charCodeAt(0); mid++) {
                const seq =
                    String.fromCharCode(ends) +
                    String.fromCharCode(mid) +
                    String.fromCharCode(ends);
                let idx = 0,
                    found = 0;
                for (const c of s) {
                    if (seq[idx] === c) {
                        idx++;
                        if (idx === 3) {
                            found = 1;
                            break;
                        }
                    }
                }
                res += found;
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int CountPalindromicSubsequence(string s) {
        int res = 0;
        for (char ends = 'a'; ends <= 'z'; ends++) {
            for (char mid = 'a'; mid <= 'z'; mid++) {
                string seq = "" + ends + mid + ends;
                int idx = 0, found = 0;
                foreach (char c in s) {
                    if (seq[idx] == c) {
                        idx++;
                        if (idx == 3) {
                            found = 1;
                            break;
                        }
                    }
                }
                res += found;
            }
        }
        return res;
    }
}
```

```go
func countPalindromicSubsequence(s string) int {
    res := 0
    for ends := 'a'; ends <= 'z'; ends++ {
        for mid := 'a'; mid <= 'z'; mid++ {
            seq := string([]rune{ends, mid, ends})
            idx, found := 0, 0
            for _, c := range s {
                if rune(seq[idx]) == c {
                    idx++
                    if idx == 3 {
                        found = 1
                        break
                    }
                }
            }
            res += found
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun countPalindromicSubsequence(s: String): Int {
        var res = 0
        for (ends in 'a'..'z') {
            for (mid in 'a'..'z') {
                val seq = "" + ends + mid + ends
                var idx = 0
                var found = 0
                for (c in s) {
                    if (seq[idx] == c) {
                        idx++
                        if (idx == 3) {
                            found = 1
                            break
                        }
                    }
                }
                res += found
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func countPalindromicSubsequence(_ s: String) -> Int {
        var res = 0
        let chars = Array(s)
        for ends in Character("a").asciiValue!...Character("z").asciiValue! {
            for mid in Character("a").asciiValue!...Character("z").asciiValue! {
                let seq = [Character(UnicodeScalar(ends)),
                           Character(UnicodeScalar(mid)),
                           Character(UnicodeScalar(ends))]
                var idx = 0
                var found = 0
                for c in chars {
                    if seq[idx] == c {
                        idx += 1
                        if idx == 3 {
                            found = 1
                            break
                        }
                    }
                }
                res += found
            }
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * m)$
- Space complexity: $O(1)$

> Where $n$ is the length of the string $s$ and $m$ is the number of unique three length pallindromic subsequences (26 \* 26 = 676).

---

## 4. Iterate On Middle Characters

### Intuition

Instead of checking all possible palindromes, we can iterate through the string and treat each position as a potential middle character. For each middle position, we need to know which characters appear both before and after it. A palindrome exists if the same character appears on both sides.

### Algorithm

1. Count the frequency of each character in the string (this represents characters to the right).
2. Maintain a set of characters seen so far (characters to the left).
3. Use a set to store unique palindromes found.
4. For each character `s[i]` in the string:
   - Decrement its count in the right frequency array.
   - For each letter that appears in both left set and right array, add `(s[i], letter)` to the result set (representing the palindrome `letter + s[i] + letter`).
   - Add `s[i]` to the left set.
5. Return the size of the result set.

::tabs-start

```python
class Solution:
    def countPalindromicSubsequence(self, s: str) -> int:
        res = set()
        left = set()
        right = collections.Counter(s)

        for i in range(len(s)):
            right[s[i]] -= 1
            if right[s[i]] == 0:
                right.pop(s[i])

            for j in range(26):
                c = chr(ord('a') + j)
                if c in left and c in right:
                    res.add((s[i], c))
            left.add(s[i])

        return len(res)
```

```java
public class Solution {
    public int countPalindromicSubsequence(String s) {
        Set<String> res = new HashSet<>();
        Set<Character> left = new HashSet<>();
        int[] right = new int[26];

        for (char c : s.toCharArray()) {
            right[c - 'a']++;
        }

        for (int i = 0; i < s.length(); i++) {
            right[s.charAt(i) - 'a']--;
            if (right[s.charAt(i) - 'a'] == 0) {
                right[s.charAt(i) - 'a'] = -1;
            }

            for (int j = 0; j < 26; j++) {
                char c = (char) (j + 'a');
                if (left.contains(c) && right[j] > 0) {
                    res.add("" + s.charAt(i) + c);
                }
            }
            left.add(s.charAt(i));
        }

        return res.size();
    }
}
```

```cpp
class Solution {
public:
    int countPalindromicSubsequence(string s) {
        unordered_set<string> res;
        unordered_set<char> left;
        vector<int> right(26, 0);

        for (char c : s) {
            right[c - 'a']++;
        }

        for (int i = 0; i < s.length(); i++) {
            right[s[i] - 'a']--;
            if (right[s[i] - 'a'] == 0) {
                right[s[i] - 'a'] = -1;
            }

            for (int j = 0; j < 26; j++) {
                char c = 'a' + j;
                if (left.count(c) && right[j] > 0) {
                    res.insert(string() + s[i] + c);
                }
            }
            left.insert(s[i]);
        }

        return res.size();
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    countPalindromicSubsequence(s) {
        const res = new Set();
        const left = new Set();
        const right = Array(26).fill(0);

        for (const c of s) {
            right[c.charCodeAt(0) - 'a'.charCodeAt(0)]++;
        }

        for (let i = 0; i < s.length; i++) {
            right[s.charCodeAt(i) - 'a'.charCodeAt(0)]--;
            if (right[s.charCodeAt(i) - 'a'.charCodeAt(0)] === 0) {
                right[s.charCodeAt(i) - 'a'.charCodeAt(0)] = -1;
            }

            for (let j = 0; j < 26; j++) {
                const c = String.fromCharCode('a'.charCodeAt(0) + j);
                if (left.has(c) && right[j] > 0) {
                    res.add(s[i] + c);
                }
            }
            left.add(s[i]);
        }

        return res.size;
    }
}
```

```csharp
public class Solution {
    public int CountPalindromicSubsequence(string s) {
        var res = new HashSet<string>();
        var left = new HashSet<char>();
        int[] right = new int[26];

        foreach (char c in s) {
            right[c - 'a']++;
        }

        for (int i = 0; i < s.Length; i++) {
            right[s[i] - 'a']--;
            if (right[s[i] - 'a'] == 0) {
                right[s[i] - 'a'] = -1;
            }

            for (int j = 0; j < 26; j++) {
                char c = (char)(j + 'a');
                if (left.Contains(c) && right[j] > 0) {
                    res.Add("" + s[i] + c);
                }
            }
            left.Add(s[i]);
        }

        return res.Count;
    }
}
```

```go
func countPalindromicSubsequence(s string) int {
    res := make(map[string]bool)
    left := make(map[byte]bool)
    right := make([]int, 26)

    for i := 0; i < len(s); i++ {
        right[s[i]-'a']++
    }

    for i := 0; i < len(s); i++ {
        right[s[i]-'a']--
        if right[s[i]-'a'] == 0 {
            right[s[i]-'a'] = -1
        }

        for j := 0; j < 26; j++ {
            c := byte('a' + j)
            if left[c] && right[j] > 0 {
                res[string([]byte{s[i], c})] = true
            }
        }
        left[s[i]] = true
    }

    return len(res)
}
```

```kotlin
class Solution {
    fun countPalindromicSubsequence(s: String): Int {
        val res = HashSet<String>()
        val left = HashSet<Char>()
        val right = IntArray(26)

        for (c in s) {
            right[c - 'a']++
        }

        for (i in s.indices) {
            right[s[i] - 'a']--
            if (right[s[i] - 'a'] == 0) {
                right[s[i] - 'a'] = -1
            }

            for (j in 0 until 26) {
                val c = ('a' + j)
                if (c in left && right[j] > 0) {
                    res.add("" + s[i] + c)
                }
            }
            left.add(s[i])
        }

        return res.size
    }
}
```

```swift
class Solution {
    func countPalindromicSubsequence(_ s: String) -> Int {
        var res = Set<String>()
        var left = Set<Character>()
        var right = [Int](repeating: 0, count: 26)
        let chars = Array(s)
        let aVal = Int(Character("a").asciiValue!)

        for c in chars {
            right[Int(c.asciiValue!) - aVal] += 1
        }

        for i in 0..<chars.count {
            let idx = Int(chars[i].asciiValue!) - aVal
            right[idx] -= 1
            if right[idx] == 0 {
                right[idx] = -1
            }

            for j in 0..<26 {
                let c = Character(UnicodeScalar(aVal + j)!)
                if left.contains(c) && right[j] > 0 {
                    res.insert(String(chars[i]) + String(c))
                }
            }
            left.insert(chars[i])
        }

        return res.count
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(26 * n)$
- Space complexity: $O(m)$

> Where $n$ is the length of the string $s$ and $m$ is the number of unique three length pallindromic subsequences (26 \* 26 = 676).

---

## 5. Prefix Count

### Intuition

We can precompute prefix counts for each character, allowing us to quickly determine how many of each character appear in any substring. For each possible end character, we find its first and last occurrence, then count distinct middle characters between them using prefix sums.

### Algorithm

1. Build a prefix count array where `prefix[i][c]` = count of character `c` in `s[0..i-1]`.
2. Track the first and last index of each character.
3. For each character that appears at least twice (has different first and last indices):
   - Let `l = firstIndex` and `r = lastIndex`.
   - For each possible middle character, check if `prefix[r][mid] - prefix[l+1][mid] > 0`.
   - If yes, that palindrome exists; increment the result.
4. Return the total count.

::tabs-start

```python
class Solution:
    def countPalindromicSubsequence(self, s: str) -> int:
        n = len(s)
        prefix = [[0] * 26 for _ in range(n + 1)]
        firstIndex = [-1] * 26
        lastIndex = [-1] * 26

        for i in range(n):
            j = ord(s[i]) - ord('a')
            if firstIndex[j] == -1:
                firstIndex[j] = i
            lastIndex[j] = i
            prefix[i + 1] = prefix[i][:]
            prefix[i + 1][j] += 1

        res = 0
        for ends in range(26):
            if firstIndex[ends] == -1 or firstIndex[ends] == lastIndex[ends]:
                continue
            l, r = firstIndex[ends], lastIndex[ends]
            for mid in range(26):
                if prefix[r][mid] - prefix[l + 1][mid] > 0:
                    res += 1
        return res
```

```java
public class Solution {
    public int countPalindromicSubsequence(String s) {
        int n = s.length();
        int[][] prefix = new int[n + 1][26];
        int[] firstIndex = new int[26];
        int[] lastIndex = new int[26];
        Arrays.fill(firstIndex, -1);
        Arrays.fill(lastIndex, -1);

        for (int i = 0; i < n; i++) {
            int j = s.charAt(i) - 'a';
            if (firstIndex[j] == -1) {
                firstIndex[j] = i;
            }
            lastIndex[j] = i;
            for (int k = 0; k < 26; k++) {
                prefix[i + 1][k] = prefix[i][k];
            }
            prefix[i + 1][j]++;
        }

        int res = 0;
        for (int ends = 0; ends < 26; ends++) {
            if (firstIndex[ends] == -1 || firstIndex[ends] == lastIndex[ends]) {
                continue;
            }
            int l = firstIndex[ends], r = lastIndex[ends];
            for (int mid = 0; mid < 26; mid++) {
                if (prefix[r][mid] - prefix[l + 1][mid] > 0) {
                    res++;
                }
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int countPalindromicSubsequence(string s) {
        int n = s.length();
        vector<vector<int>> prefix(n + 1, vector<int>(26));
        vector<int> firstIndex(26, -1);
        vector<int> lastIndex(26, -1);

        for (int i = 0; i < n; i++) {
            int j = s[i] - 'a';
            if (firstIndex[j] == -1) {
                firstIndex[j] = i;
            }
            lastIndex[j] = i;
            prefix[i + 1] = prefix[i];
            prefix[i + 1][j]++;
        }

        int res = 0;
        for (int ends = 0; ends < 26; ends++) {
            if (firstIndex[ends] == -1 || firstIndex[ends] == lastIndex[ends]) {
                continue;
            }
            int l = firstIndex[ends], r = lastIndex[ends];
            for (int mid = 0; mid < 26; mid++) {
                if (prefix[r][mid] - prefix[l + 1][mid] > 0) {
                    res++;
                }
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
     * @return {number}
     */
    countPalindromicSubsequence(s) {
        const n = s.length;
        const prefix = Array.from({ length: n + 1 }, () => Array(26).fill(0));
        const firstIndex = Array(26).fill(-1);
        const lastIndex = Array(26).fill(-1);

        for (let i = 0; i < n; i++) {
            const j = s.charCodeAt(i) - 'a'.charCodeAt(0);
            if (firstIndex[j] === -1) {
                firstIndex[j] = i;
            }
            lastIndex[j] = i;
            for (let k = 0; k < 26; k++) {
                prefix[i + 1][k] = prefix[i][k];
            }
            prefix[i + 1][j]++;
        }

        let res = 0;
        for (let ends = 0; ends < 26; ends++) {
            if (
                firstIndex[ends] === -1 ||
                firstIndex[ends] === lastIndex[ends]
            ) {
                continue;
            }
            const l = firstIndex[ends],
                r = lastIndex[ends];
            for (let mid = 0; mid < 26; mid++) {
                if (prefix[r][mid] - prefix[l + 1][mid] > 0) {
                    res++;
                }
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int CountPalindromicSubsequence(string s) {
        int n = s.Length;
        int[][] prefix = new int[n + 1][];
        for (int i = 0; i <= n; i++) {
            prefix[i] = new int[26];
        }
        int[] firstIndex = new int[26];
        int[] lastIndex = new int[26];
        Array.Fill(firstIndex, -1);
        Array.Fill(lastIndex, -1);

        for (int i = 0; i < n; i++) {
            int j = s[i] - 'a';
            if (firstIndex[j] == -1) {
                firstIndex[j] = i;
            }
            lastIndex[j] = i;
            for (int k = 0; k < 26; k++) {
                prefix[i + 1][k] = prefix[i][k];
            }
            prefix[i + 1][j]++;
        }

        int res = 0;
        for (int ends = 0; ends < 26; ends++) {
            if (firstIndex[ends] == -1 || firstIndex[ends] == lastIndex[ends]) {
                continue;
            }
            int l = firstIndex[ends], r = lastIndex[ends];
            for (int mid = 0; mid < 26; mid++) {
                if (prefix[r][mid] - prefix[l + 1][mid] > 0) {
                    res++;
                }
            }
        }
        return res;
    }
}
```

```go
func countPalindromicSubsequence(s string) int {
    n := len(s)
    prefix := make([][]int, n+1)
    for i := range prefix {
        prefix[i] = make([]int, 26)
    }
    firstIndex := make([]int, 26)
    lastIndex := make([]int, 26)
    for i := range firstIndex {
        firstIndex[i] = -1
        lastIndex[i] = -1
    }

    for i := 0; i < n; i++ {
        j := int(s[i] - 'a')
        if firstIndex[j] == -1 {
            firstIndex[j] = i
        }
        lastIndex[j] = i
        copy(prefix[i+1], prefix[i])
        prefix[i+1][j]++
    }

    res := 0
    for ends := 0; ends < 26; ends++ {
        if firstIndex[ends] == -1 || firstIndex[ends] == lastIndex[ends] {
            continue
        }
        l, r := firstIndex[ends], lastIndex[ends]
        for mid := 0; mid < 26; mid++ {
            if prefix[r][mid]-prefix[l+1][mid] > 0 {
                res++
            }
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun countPalindromicSubsequence(s: String): Int {
        val n = s.length
        val prefix = Array(n + 1) { IntArray(26) }
        val firstIndex = IntArray(26) { -1 }
        val lastIndex = IntArray(26) { -1 }

        for (i in 0 until n) {
            val j = s[i] - 'a'
            if (firstIndex[j] == -1) {
                firstIndex[j] = i
            }
            lastIndex[j] = i
            for (k in 0 until 26) {
                prefix[i + 1][k] = prefix[i][k]
            }
            prefix[i + 1][j]++
        }

        var res = 0
        for (ends in 0 until 26) {
            if (firstIndex[ends] == -1 || firstIndex[ends] == lastIndex[ends]) {
                continue
            }
            val l = firstIndex[ends]
            val r = lastIndex[ends]
            for (mid in 0 until 26) {
                if (prefix[r][mid] - prefix[l + 1][mid] > 0) {
                    res++
                }
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func countPalindromicSubsequence(_ s: String) -> Int {
        let n = s.count
        let chars = Array(s)
        var prefix = [[Int]](repeating: [Int](repeating: 0, count: 26), count: n + 1)
        var firstIndex = [Int](repeating: -1, count: 26)
        var lastIndex = [Int](repeating: -1, count: 26)
        let aVal = Int(Character("a").asciiValue!)

        for i in 0..<n {
            let j = Int(chars[i].asciiValue!) - aVal
            if firstIndex[j] == -1 {
                firstIndex[j] = i
            }
            lastIndex[j] = i
            prefix[i + 1] = prefix[i]
            prefix[i + 1][j] += 1
        }

        var res = 0
        for ends in 0..<26 {
            if firstIndex[ends] == -1 || firstIndex[ends] == lastIndex[ends] {
                continue
            }
            let l = firstIndex[ends]
            let r = lastIndex[ends]
            for mid in 0..<26 {
                if prefix[r][mid] - prefix[l + 1][mid] > 0 {
                    res += 1
                }
            }
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(26 * n)$
- Space complexity: $O(26 * n)$

---

## 6. First And Last Index

### Intuition

For a length-3 palindrome with character `c` at both ends, we need at least two occurrences of `c`. The palindrome can use any character between the first and last occurrence of `c` as the middle. By finding the first and last index of each character, we can count the distinct characters in between.

### Algorithm

1. For each character `c` from 'a' to 'z':
   - Find the first index `l` and last index `r` of `c` in the string.
   - If `c` doesn't appear twice, skip it.
   - Collect all distinct characters between indices `l+1` and `r-1` into a set.
   - Add the size of this set to the result.
2. Return the total result.

::tabs-start

```python
class Solution:
    def countPalindromicSubsequence(self, s: str) -> int:
        res = 0

        for i in range(26):
            c = chr(ord('a') + i)
            l, r = s.find(c), s.rfind(c)
            if l == -1 or l == r:
                continue

            mids = set()
            for j in range(l + 1, r):
                mids.add(s[j])
            res += len(mids)

        return res
```

```java
public class Solution {
    public int countPalindromicSubsequence(String s) {
        int res = 0;

        for (char c = 'a'; c <= 'z'; c++) {
            int l = s.indexOf(c), r = s.lastIndexOf(c);
            if (l == -1 || l == r) continue;

            Set<Character> mids = new HashSet<>();
            for (int j = l + 1; j < r; j++) {
                mids.add(s.charAt(j));
            }
            res += mids.size();
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int countPalindromicSubsequence(string s) {
        int res = 0;

        for (char c = 'a'; c <= 'z'; c++) {
            int l = s.find(c), r = s.rfind(c);
            if (l == -1 || l == r) continue;

            unordered_set<char> mids;
            for (int j = l + 1; j < r; j++) {
                mids.insert(s[j]);
            }
            res += mids.size();
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    countPalindromicSubsequence(s) {
        let res = 0;

        for (let i = 0; i < 26; i++) {
            const c = String.fromCharCode('a'.charCodeAt(0) + i);
            const l = s.indexOf(c),
                r = s.lastIndexOf(c);
            if (l === -1 || l === r) continue;

            const mids = new Set();
            for (let j = l + 1; j < r; j++) {
                mids.add(s[j]);
            }
            res += mids.size;
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int CountPalindromicSubsequence(string s) {
        int res = 0;

        for (char c = 'a'; c <= 'z'; c++) {
            int l = s.IndexOf(c), r = s.LastIndexOf(c);
            if (l == -1 || l == r) continue;

            var mids = new HashSet<char>();
            for (int j = l + 1; j < r; j++) {
                mids.Add(s[j]);
            }
            res += mids.Count;
        }

        return res;
    }
}
```

```go
func countPalindromicSubsequence(s string) int {
    res := 0

    for c := byte('a'); c <= 'z'; c++ {
        l := strings.IndexByte(s, c)
        r := strings.LastIndexByte(s, c)
        if l == -1 || l == r {
            continue
        }

        mids := make(map[byte]bool)
        for j := l + 1; j < r; j++ {
            mids[s[j]] = true
        }
        res += len(mids)
    }

    return res
}
```

```kotlin
class Solution {
    fun countPalindromicSubsequence(s: String): Int {
        var res = 0

        for (c in 'a'..'z') {
            val l = s.indexOf(c)
            val r = s.lastIndexOf(c)
            if (l == -1 || l == r) continue

            val mids = HashSet<Char>()
            for (j in l + 1 until r) {
                mids.add(s[j])
            }
            res += mids.size
        }

        return res
    }
}
```

```swift
class Solution {
    func countPalindromicSubsequence(_ s: String) -> Int {
        var res = 0
        let chars = Array(s)

        for i in 0..<26 {
            let c = Character(UnicodeScalar(Int(Character("a").asciiValue!) + i)!)
            guard let lIdx = chars.firstIndex(of: c),
                  let rIdx = chars.lastIndex(of: c),
                  lIdx != rIdx else {
                continue
            }

            var mids = Set<Character>()
            for j in (lIdx + 1)..<rIdx {
                mids.insert(chars[j])
            }
            res += mids.count
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(26 * n)$
- Space complexity: $O(1)$ since we have at most $26$ different characters.

---

## 7. First And Last Index (Optimal)

### Intuition

The previous approach uses a set to track distinct middle characters, which has some overhead. We can use a bitmask instead, where each bit represents whether a character has been seen. This provides O(1) operations for checking and adding characters.

### Algorithm

1. First pass: Record the first and last index of each character in the string.
2. For each character that appears at least twice:
   - Let `l = firstIndex` and `r = lastIndex`.
   - Initialize a bitmask `mask = 0`.
   - For each index from `l+1` to `r-1`:
     - If the character at that index is not already in the mask, add it and increment the result.
   - The mask tracks which middle characters we've already counted.
3. Return the total count.

::tabs-start

```python
class Solution:
    def countPalindromicSubsequence(self, s: str) -> int:
        firstIndex = [-1] * 26
        lastIndex = [-1] * 26

        for i in range(len(s)):
            j = ord(s[i]) - ord('a')
            if firstIndex[j] == -1:
                firstIndex[j] = i
            lastIndex[j] = i

        res = 0
        for ends in range(26):
            if firstIndex[ends] == -1 or firstIndex[ends] == lastIndex[ends]:
                continue
            l, r = firstIndex[ends], lastIndex[ends]
            mask = 0
            for i in range(l + 1, r):
                c = ord(s[i]) - ord('a')
                if mask & (1 << c):
                    continue
                mask |= (1 << c)
                res += 1

        return res
```

```java
public class Solution {
    public int countPalindromicSubsequence(String s) {
        int[] firstIndex = new int[26];
        int[] lastIndex = new int[26];
        Arrays.fill(firstIndex, -1);
        Arrays.fill(lastIndex, -1);

        for (int i = 0; i < s.length(); i++) {
            int j = s.charAt(i) - 'a';
            if (firstIndex[j] == -1) {
                firstIndex[j] = i;
            }
            lastIndex[j] = i;
        }

        int res = 0;
        for (int ends = 0; ends < 26; ends++) {
            if (firstIndex[ends] == -1 || firstIndex[ends] == lastIndex[ends]) {
                continue;
            }
            int l = firstIndex[ends], r = lastIndex[ends];
            int mask = 0;
            for (int i = l + 1; i < r; i++) {
                int c = s.charAt(i) - 'a';
                if ((mask & (1 << c)) != 0) {
                    continue;
                }
                mask |= (1 << c);
                res++;
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int countPalindromicSubsequence(string s) {
        vector<int> firstIndex(26, -1);
        vector<int> lastIndex(26, -1);

        for (int i = 0; i < s.size(); i++) {
            int j = s[i] - 'a';
            if (firstIndex[j] == -1) {
                firstIndex[j] = i;
            }
            lastIndex[j] = i;
        }

        int res = 0;
        for (int ends = 0; ends < 26; ends++) {
            if (firstIndex[ends] == -1 || firstIndex[ends] == lastIndex[ends]) {
                continue;
            }
            int l = firstIndex[ends], r = lastIndex[ends];
            int mask = 0;
            for (int i = l + 1; i < r; i++) {
                int c = s[i] - 'a';
                if (mask & (1 << c)) {
                    continue;
                }
                mask |= (1 << c);
                res++;
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
     * @return {number}
     */
    countPalindromicSubsequence(s) {
        const firstIndex = Array(26).fill(-1);
        const lastIndex = Array(26).fill(-1);

        for (let i = 0; i < s.length; i++) {
            const j = s.charCodeAt(i) - 'a'.charCodeAt(0);
            if (firstIndex[j] === -1) {
                firstIndex[j] = i;
            }
            lastIndex[j] = i;
        }

        let res = 0;
        for (let ends = 0; ends < 26; ends++) {
            if (
                firstIndex[ends] === -1 ||
                firstIndex[ends] === lastIndex[ends]
            ) {
                continue;
            }
            const l = firstIndex[ends],
                r = lastIndex[ends];
            let mask = 0;
            for (let i = l + 1; i < r; i++) {
                const c = s.charCodeAt(i) - 'a'.charCodeAt(0);
                if (mask & (1 << c)) {
                    continue;
                }
                mask |= 1 << c;
                res++;
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int CountPalindromicSubsequence(string s) {
        int[] firstIndex = new int[26];
        int[] lastIndex = new int[26];
        Array.Fill(firstIndex, -1);
        Array.Fill(lastIndex, -1);

        for (int i = 0; i < s.Length; i++) {
            int j = s[i] - 'a';
            if (firstIndex[j] == -1) {
                firstIndex[j] = i;
            }
            lastIndex[j] = i;
        }

        int res = 0;
        for (int ends = 0; ends < 26; ends++) {
            if (firstIndex[ends] == -1 || firstIndex[ends] == lastIndex[ends]) {
                continue;
            }
            int l = firstIndex[ends], r = lastIndex[ends];
            int mask = 0;
            for (int i = l + 1; i < r; i++) {
                int c = s[i] - 'a';
                if ((mask & (1 << c)) != 0) {
                    continue;
                }
                mask |= (1 << c);
                res++;
            }
        }
        return res;
    }
}
```

```go
func countPalindromicSubsequence(s string) int {
    firstIndex := make([]int, 26)
    lastIndex := make([]int, 26)
    for i := range firstIndex {
        firstIndex[i] = -1
        lastIndex[i] = -1
    }

    for i := 0; i < len(s); i++ {
        j := int(s[i] - 'a')
        if firstIndex[j] == -1 {
            firstIndex[j] = i
        }
        lastIndex[j] = i
    }

    res := 0
    for ends := 0; ends < 26; ends++ {
        if firstIndex[ends] == -1 || firstIndex[ends] == lastIndex[ends] {
            continue
        }
        l, r := firstIndex[ends], lastIndex[ends]
        mask := 0
        for i := l + 1; i < r; i++ {
            c := int(s[i] - 'a')
            if mask&(1<<c) != 0 {
                continue
            }
            mask |= (1 << c)
            res++
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun countPalindromicSubsequence(s: String): Int {
        val firstIndex = IntArray(26) { -1 }
        val lastIndex = IntArray(26) { -1 }

        for (i in s.indices) {
            val j = s[i] - 'a'
            if (firstIndex[j] == -1) {
                firstIndex[j] = i
            }
            lastIndex[j] = i
        }

        var res = 0
        for (ends in 0 until 26) {
            if (firstIndex[ends] == -1 || firstIndex[ends] == lastIndex[ends]) {
                continue
            }
            val l = firstIndex[ends]
            val r = lastIndex[ends]
            var mask = 0
            for (i in l + 1 until r) {
                val c = s[i] - 'a'
                if (mask and (1 shl c) != 0) {
                    continue
                }
                mask = mask or (1 shl c)
                res++
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func countPalindromicSubsequence(_ s: String) -> Int {
        var firstIndex = [Int](repeating: -1, count: 26)
        var lastIndex = [Int](repeating: -1, count: 26)
        let chars = Array(s)
        let aVal = Int(Character("a").asciiValue!)

        for i in 0..<chars.count {
            let j = Int(chars[i].asciiValue!) - aVal
            if firstIndex[j] == -1 {
                firstIndex[j] = i
            }
            lastIndex[j] = i
        }

        var res = 0
        for ends in 0..<26 {
            if firstIndex[ends] == -1 || firstIndex[ends] == lastIndex[ends] {
                continue
            }
            let l = firstIndex[ends]
            let r = lastIndex[ends]
            var mask = 0
            for i in (l + 1)..<r {
                let c = Int(chars[i].asciiValue!) - aVal
                if mask & (1 << c) != 0 {
                    continue
                }
                mask |= (1 << c)
                res += 1
            }
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(26 * n)$
- Space complexity: $O(1)$ since we have at most $26$ different characters.
