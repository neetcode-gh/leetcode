## 1. Brute Force

### Intuition

For each character in the string, we check if it appears anywhere else. If a character has no duplicate, it is unique. The first such character we find (going left to right) is our answer.

### Algorithm

1. Iterate through each index `i` in the string.
2. For each character at `i`, compare it with every other character at index `j`.
3. If a match is found (where `i != j`), mark it as non-unique and break.
4. If no match is found after checking all positions, return `i`.
5. If no unique character exists, return `-1`.

::tabs-start

```python
class Solution:
    def firstUniqChar(self, s: str) -> int:
        for i in range(len(s)):
            flag = True
            for j in range(len(s)):
                if i == j:
                    continue
                if s[i] == s[j]:
                    flag = False
                    break
            if flag:
                return i
        return -1
```

```java
public class Solution {
    public int firstUniqChar(String s) {
        for (int i = 0; i < s.length(); i++) {
            boolean flag = true;
            for (int j = 0; j < s.length(); j++) {
                if (i == j) continue;
                if (s.charAt(i) == s.charAt(j)) {
                    flag = false;
                    break;
                }
            }
            if (flag) return i;
        }
        return -1;
    }
}
```

```cpp
class Solution {
public:
    int firstUniqChar(string s) {
        for (int i = 0; i < s.size(); i++) {
            bool flag = true;
            for (int j = 0; j < s.size(); j++) {
                if (i == j) continue;
                if (s[i] == s[j]) {
                    flag = false;
                    break;
                }
            }
            if (flag) return i;
        }
        return -1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    firstUniqChar(s) {
        for (let i = 0; i < s.length; i++) {
            let flag = true;
            for (let j = 0; j < s.length; j++) {
                if (i === j) continue;
                if (s[i] === s[j]) {
                    flag = false;
                    break;
                }
            }
            if (flag) return i;
        }
        return -1;
    }
}
```

```csharp
public class Solution {
    public int FirstUniqChar(string s) {
        for (int i = 0; i < s.Length; i++) {
            bool flag = true;
            for (int j = 0; j < s.Length; j++) {
                if (i == j) continue;
                if (s[i] == s[j]) {
                    flag = false;
                    break;
                }
            }
            if (flag) return i;
        }
        return -1;
    }
}
```

```go
func firstUniqChar(s string) int {
    for i := 0; i < len(s); i++ {
        flag := true
        for j := 0; j < len(s); j++ {
            if i == j {
                continue
            }
            if s[i] == s[j] {
                flag = false
                break
            }
        }
        if flag {
            return i
        }
    }
    return -1
}
```

```kotlin
class Solution {
    fun firstUniqChar(s: String): Int {
        for (i in s.indices) {
            var flag = true
            for (j in s.indices) {
                if (i == j) continue
                if (s[i] == s[j]) {
                    flag = false
                    break
                }
            }
            if (flag) return i
        }
        return -1
    }
}
```

```swift
class Solution {
    func firstUniqChar(_ s: String) -> Int {
        let chars = Array(s)
        for i in 0..<chars.count {
            var flag = true
            for j in 0..<chars.count {
                if i == j { continue }
                if chars[i] == chars[j] {
                    flag = false
                    break
                }
            }
            if flag { return i }
        }
        return -1
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(1)$

---

## 2. Hash Map

### Intuition

Instead of checking every pair of characters, we can count the frequency of each character in a single pass. Then, in a second pass, we find the first character whose count is exactly 1. This trades space for time.

### Algorithm

1. Create a hash map to store the count of each character.
2. First pass: iterate through the string and increment the count for each character.
3. Second pass: iterate through the string again and return the index of the first character with count equal to `1`.
4. If no unique character is found, return `-1`.

::tabs-start

```python
class Solution:
    def firstUniqChar(self, s: str) -> int:
        count = defaultdict(int)
        for c in s:
            count[c] += 1

        for i, c in enumerate(s):
            if count[c] == 1:
                return i
        return -1
```

```java
public class Solution {
    public int firstUniqChar(String s) {
        Map<Character, Integer> count = new HashMap<>();
        for (char c : s.toCharArray()) {
            count.put(c, count.getOrDefault(c, 0) + 1);
        }

        for (int i = 0; i < s.length(); i++) {
            if (count.get(s.charAt(i)) == 1) {
                return i;
            }
        }
        return -1;
    }
}
```

```cpp
class Solution {
public:
    int firstUniqChar(string s) {
        unordered_map<char, int> count;
        for (char c : s) {
            count[c]++;
        }

        for (int i = 0; i < s.size(); i++) {
            if (count[s[i]] == 1) {
                return i;
            }
        }
        return -1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    firstUniqChar(s) {
        const count = new Map();
        for (const c of s) {
            count.set(c, (count.get(c) || 0) + 1);
        }

        for (let i = 0; i < s.length; i++) {
            if (count.get(s[i]) === 1) {
                return i;
            }
        }
        return -1;
    }
}
```

```csharp
public class Solution {
    public int FirstUniqChar(string s) {
        Dictionary<char, int> count = new Dictionary<char, int>();
        foreach (char c in s) {
            if (!count.ContainsKey(c)) {
                count[c] = 0;
            }
            count[c]++;
        }

        for (int i = 0; i < s.Length; i++) {
            if (count[s[i]] == 1) {
                return i;
            }
        }
        return -1;
    }
}
```

```go
func firstUniqChar(s string) int {
    count := make(map[rune]int)
    for _, c := range s {
        count[c]++
    }

    for i, c := range s {
        if count[c] == 1 {
            return i
        }
    }
    return -1
}
```

```kotlin
class Solution {
    fun firstUniqChar(s: String): Int {
        val count = mutableMapOf<Char, Int>()
        for (c in s) {
            count[c] = count.getOrDefault(c, 0) + 1
        }

        for (i in s.indices) {
            if (count[s[i]] == 1) {
                return i
            }
        }
        return -1
    }
}
```

```swift
class Solution {
    func firstUniqChar(_ s: String) -> Int {
        var count = [Character: Int]()
        for c in s {
            count[c, default: 0] += 1
        }

        for (i, c) in s.enumerated() {
            if count[c] == 1 {
                return i
            }
        }
        return -1
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ since we have at most $26$ different characters.

---

## 3. Hash Map (Optimal)

### Intuition

We can optimize the second pass by iterating over the hash map instead of the string. For each character, we store its first occurrence index. If the character appears again, we mark it as non-unique by setting its index to `n` (string length). Finally, we find the minimum index among all unique characters.

### Algorithm

1. Create a hash map where each character maps to its first occurrence index.
2. Iterate through the string:
   - If the character is not in the map, store its index.
   - If it already exists, mark it as non-unique by setting the value to `n`.
3. Find the minimum value in the hash map.
4. Return the minimum index if it's less than `n`, otherwise return `-1`.

::tabs-start

```python
class Solution:
    def firstUniqChar(self, s: str) -> int:
        n = len(s)
        count = defaultdict(int)
        for i, c in enumerate(s):
            if c not in count:
                count[c] = i
            else:
                count[c] = n

        res = n
        for c in count:
            res = min(res, count[c])

        return -1 if res == n else res
```

```java
public class Solution {
    public int firstUniqChar(String s) {
        int n = s.length();
        Map<Character, Integer> count = new HashMap<>();

        for (int i = 0; i < n; i++) {
            char c = s.charAt(i);
            if (!count.containsKey(c)) {
                count.put(c, i);
            } else {
                count.put(c, n);
            }
        }

        int res = n;
        for (int index : count.values()) {
            res = Math.min(res, index);
        }

        return res == n ? -1 : res;
    }
}
```

```cpp
class Solution {
public:
    int firstUniqChar(string s) {
        int n = s.size();
        unordered_map<char, int> count;

        for (int i = 0; i < n; i++) {
            if (count.find(s[i]) == count.end()) {
                count[s[i]] = i;
            } else {
                count[s[i]] = n;
            }
        }

        int res = n;
        for (auto& [key, index] : count) {
            res = min(res, index);
        }

        return res == n ? -1 : res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    firstUniqChar(s) {
        const n = s.length;
        const count = new Map();

        for (let i = 0; i < n; i++) {
            const c = s[i];
            if (!count.has(c)) {
                count.set(c, i);
            } else {
                count.set(c, n);
            }
        }

        let res = n;
        for (const index of count.values()) {
            res = Math.min(res, index);
        }

        return res === n ? -1 : res;
    }
}
```

```csharp
public class Solution {
    public int FirstUniqChar(string s) {
        int n = s.Length;
        Dictionary<char, int> count = new Dictionary<char, int>();

        for (int i = 0; i < n; i++) {
            char c = s[i];
            if (!count.ContainsKey(c)) {
                count[c] = i;
            } else {
                count[c] = n;
            }
        }

        int res = n;
        foreach (var kvp in count) {
            res = Math.Min(res, kvp.Value);
        }

        return res == n ? -1 : res;
    }
}
```

```go
func firstUniqChar(s string) int {
    n := len(s)
    count := make(map[rune]int)

    for i, c := range s {
        if _, exists := count[c]; !exists {
            count[c] = i
        } else {
            count[c] = n
        }
    }

    res := n
    for _, index := range count {
        if index < res {
            res = index
        }
    }

    if res == n {
        return -1
    }
    return res
}
```

```kotlin
class Solution {
    fun firstUniqChar(s: String): Int {
        val n = s.length
        val count = mutableMapOf<Char, Int>()

        for (i in s.indices) {
            val c = s[i]
            if (c !in count) {
                count[c] = i
            } else {
                count[c] = n
            }
        }

        var res = n
        for (index in count.values) {
            res = minOf(res, index)
        }

        return if (res == n) -1 else res
    }
}
```

```swift
class Solution {
    func firstUniqChar(_ s: String) -> Int {
        let n = s.count
        let chars = Array(s)
        var count = [Character: Int]()

        for i in 0..<n {
            let c = chars[i]
            if count[c] == nil {
                count[c] = i
            } else {
                count[c] = n
            }
        }

        var res = n
        for index in count.values {
            res = min(res, index)
        }

        return res == n ? -1 : res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ since we have at most $26$ different characters.

---

## 4. Iteration

### Intuition

Since the string contains only lowercase letters, we can iterate through all 26 characters and find the first occurrence of each. If a character's first and last occurrence are the same index, it appears exactly once. We track the minimum such index across all characters.

### Algorithm

1. Initialize `res` to the string length `n`.
2. For each character from `'a'` to `'z'`:
   - Find its first occurrence index using `indexOf` (or equivalent).
   - Find its last occurrence index using `lastIndexOf`.
   - If both indices are equal and the character exists, update `res` with the minimum.
3. Return `res` if it's less than `n`, otherwise return `-1`.

::tabs-start

```python
class Solution:
    def firstUniqChar(self, s: str) -> int:
        res = n = len(s)
        for ch in range(ord('a'), ord('z') + 1):
            index = s.find(chr(ch))
            if index != -1 and s.rfind(chr(ch)) == index:
                res = min(res, index)

        return -1 if res == n else res
```

```java
public class Solution {
    public int firstUniqChar(String s) {
        int res = s.length();

        for (char ch = 'a'; ch <= 'z'; ch++) {
            int firstIndex = s.indexOf(ch);
            if (firstIndex != -1 && s.lastIndexOf(ch) == firstIndex) {
                res = Math.min(res, firstIndex);
            }
        }

        return res == s.length() ? -1 : res;
    }
}
```

```cpp
class Solution {
public:
    int firstUniqChar(string s) {
        int res = s.size();

        for (char ch = 'a'; ch <= 'z'; ch++) {
            int firstIndex = s.find(ch);
            if (firstIndex != string::npos && s.rfind(ch) == firstIndex) {
                res = min(res, firstIndex);
            }
        }

        return res == s.size() ? -1 : res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    firstUniqChar(s) {
        let res = s.length;

        for (let ch = 'a'.charCodeAt(0); ch <= 'z'.charCodeAt(0); ch++) {
            const char = String.fromCharCode(ch);
            const firstIndex = s.indexOf(char);
            if (firstIndex !== -1 && s.lastIndexOf(char) === firstIndex) {
                res = Math.min(res, firstIndex);
            }
        }

        return res === s.length ? -1 : res;
    }
}
```

```csharp
public class Solution {
    public int FirstUniqChar(string s) {
        int n = s.Length;
        int res = n;

        for (char ch = 'a'; ch <= 'z'; ch++) {
            int index = s.IndexOf(ch);
            if (index != -1 && s.LastIndexOf(ch) == index) {
                res = Math.Min(res, index);
            }
        }

        return res == n ? -1 : res;
    }
}
```

```go
func firstUniqChar(s string) int {
    n := len(s)
    res := n

    for ch := 'a'; ch <= 'z'; ch++ {
        firstIndex := strings.IndexRune(s, ch)
        if firstIndex != -1 && strings.LastIndex(s, string(ch)) == firstIndex {
            if firstIndex < res {
                res = firstIndex
            }
        }
    }

    if res == n {
        return -1
    }
    return res
}
```

```kotlin
class Solution {
    fun firstUniqChar(s: String): Int {
        var res = s.length

        for (ch in 'a'..'z') {
            val firstIndex = s.indexOf(ch)
            if (firstIndex != -1 && s.lastIndexOf(ch) == firstIndex) {
                res = minOf(res, firstIndex)
            }
        }

        return if (res == s.length) -1 else res
    }
}
```

```swift
class Solution {
    func firstUniqChar(_ s: String) -> Int {
        let n = s.count
        var res = n
        let chars = Array(s)

        for ch in "abcdefghijklmnopqrstuvwxyz" {
            if let firstIndex = chars.firstIndex(of: ch),
               let lastIndex = chars.lastIndex(of: ch),
               firstIndex == lastIndex {
                res = min(res, firstIndex)
            }
        }

        return res == n ? -1 : res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(26 * n)$ since we have at most $26$ different characters.
- Space complexity: $O(1)$
