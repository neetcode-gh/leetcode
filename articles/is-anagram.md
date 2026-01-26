## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Hash Maps** - Using dictionaries or hash tables to count character frequencies
- **Sorting** - Sorting strings or arrays to compare elements in a consistent order
- **Arrays** - Using fixed-size arrays as an efficient alternative to hash maps for limited character sets

---

## 1. Sorting

### Intuition

If two strings are anagrams, they must contain exactly the same characters with the same frequencies.  
By sorting both strings, all characters will be arranged in a consistent order.  
If the two sorted strings are identical, then every character and its count match, which means the strings are anagrams.  

### Algorithm

1. If the lengths of the two strings differ, return `false` immediately because they cannot be anagrams.
2. Sort both strings.
3. Compare the sorted versions of the strings:
   - If they are equal, return `true`.
   - Otherwise, return `false`.

::tabs-start

```python
class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        if len(s) != len(t):
            return False

        return sorted(s) == sorted(t)
```

```java
public class Solution {
    public boolean isAnagram(String s, String t) {
        if (s.length() != t.length()) {
            return false;
        }

        char[] sSort = s.toCharArray();
        char[] tSort = t.toCharArray();
        Arrays.sort(sSort);
        Arrays.sort(tSort);
        return Arrays.equals(sSort, tSort);
    }
}
```

```cpp
class Solution {
public:
    bool isAnagram(string s, string t) {
        if (s.length() != t.length()) {
            return false;
        }

        sort(s.begin(), s.end());
        sort(t.begin(), t.end());
        return s == t;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @param {string} t
     * @return {boolean}
     */
    isAnagram(s, t) {
        if (s.length !== t.length) {
            return false;
        }

        let sSort = s.split('').sort().join();
        let tSort = t.split('').sort().join();
        return sSort == tSort;
    }
}
```

```csharp
public class Solution {
    public bool IsAnagram(string s, string t) {
        if (s.Length != t.Length) {
            return false;
        }

        char[] sSort = s.ToCharArray();
        char[] tSort = t.ToCharArray();
        Array.Sort(sSort);
        Array.Sort(tSort);
        return sSort.SequenceEqual(tSort);
    }
}
```

```go
func isAnagram(s string, t string) bool {
    if len(s) != len(t) {
        return false
    }

    sRunes, tRunes := []rune(s), []rune(t)
    sort.Slice(sRunes, func(i, j int) bool {
        return sRunes[i] < sRunes[j]
    })
    sort.Slice(tRunes, func(i, j int) bool {
        return tRunes[i] < tRunes[j]
    })

    for i := range sRunes {
        if sRunes[i] != tRunes[i] {
            return false
        }
    }
    return true
}
```

```kotlin
class Solution {
    fun isAnagram(s: String, t: String): Boolean {
        if (s.length != t.length) {
            return false
        }

        return s.toCharArray().sorted() == t.toCharArray().sorted()
    }
}
```

```swift
class Solution {
    func isAnagram(_ s: String, _ t: String) -> Bool {
        return s.count == t.count && s.sorted() == t.sorted()
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n + m \log m)$
- Space complexity: $O(1)$ or $O(n + m)$ depending on the sorting algorithm.

> Where $n$ is the length of string $s$ and $m$ is the length of string $t$.

---

## 2. Hash Map

### Intuition

If two strings are anagrams, they must use the same characters with the same frequencies.  
Instead of sorting, we can count how many times each character appears in both strings.  
By using two hash maps (or dictionaries), we track the frequency of every character in each string.  
If both frequency maps match exactly, then the strings contain the same characters with same frequencies, meaning they are anagrams.

### Algorithm

1. If the two strings have different lengths, return `false` immediately.
2. Create two hash maps to store character frequencies for each string.
3. Iterate through both strings at the same time:
   - Increase the character count for `s[i]` in the first map.
   - Increase the character count for `t[i]` in the second map.
4. After building both maps, compare them:
   - If the maps are equal, return `true`.
   - Otherwise, return `false`.

::tabs-start

```python
class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        if len(s) != len(t):
            return False

        countS, countT = {}, {}

        for i in range(len(s)):
            countS[s[i]] = 1 + countS.get(s[i], 0)
            countT[t[i]] = 1 + countT.get(t[i], 0)
        return countS == countT
```

```java
public class Solution {
    public boolean isAnagram(String s, String t) {
        if (s.length() != t.length()) {
            return false;
        }

        HashMap<Character, Integer> countS = new HashMap<>();
        HashMap<Character, Integer> countT = new HashMap<>();
        for (int i = 0; i < s.length(); i++) {
            countS.put(s.charAt(i), countS.getOrDefault(s.charAt(i), 0) + 1);
            countT.put(t.charAt(i), countT.getOrDefault(t.charAt(i), 0) + 1);
        }
        return countS.equals(countT);
    }
}
```

```cpp
class Solution {
public:
    bool isAnagram(string s, string t) {
        if (s.length() != t.length()) {
            return false;
        }

        unordered_map<char, int> countS;
        unordered_map<char, int> countT;
        for (int i = 0; i < s.length(); i++) {
            countS[s[i]]++;
            countT[t[i]]++;
        }
        return countS == countT;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @param {string} t
     * @return {boolean}
     */
    isAnagram(s, t) {
        if (s.length !== t.length) {
            return false;
        }

        const countS = {};
        const countT = {};
        for (let i = 0; i < s.length; i++) {
            countS[s[i]] = (countS[s[i]] || 0) + 1;
            countT[t[i]] = (countT[t[i]] || 0) + 1;
        }

        for (const key in countS) {
            if (countS[key] !== countT[key]) {
                return false;
            }
        }
        return true;
    }
}
```

```csharp
public class Solution {
    public bool IsAnagram(string s, string t) {
        if (s.Length != t.Length) {
            return false;
        }

        Dictionary<char, int> countS = new Dictionary<char, int>();
        Dictionary<char, int> countT = new Dictionary<char, int>();
        for (int i = 0; i < s.Length; i++) {
            countS[s[i]] = countS.GetValueOrDefault(s[i], 0) + 1;
            countT[t[i]] = countT.GetValueOrDefault(t[i], 0) + 1;
        }
        return countS.Count == countT.Count && !countS.Except(countT).Any();
    }
}
```

```go
func isAnagram(s string, t string) bool {
    if len(s) != len(t) {
        return false
    }

    countS, countT := make(map[rune]int), make(map[rune]int)
    for i, ch := range s {
        countS[ch]++
        countT[rune(t[i])]++
    }

    for k, v := range countS {
        if countT[k] != v {
            return false
        }
    }
    return true
}
```

```kotlin
class Solution {
    fun isAnagram(s: String, t: String): Boolean {
        if (s.length != t.length) {
            return false
        }

        val countS = mutableMapOf<Char, Int>()
        val countT = mutableMapOf<Char, Int>()

        for (i in s.indices) {
            countS[s[i]] = countS.getOrDefault(s[i], 0) + 1
            countT[t[i]] = countT.getOrDefault(t[i], 0) + 1
        }

        return countS == countT
    }
}
```

```swift
class Solution {
    func isAnagram(_ s: String, _ t: String) -> Bool {
        if s.count != t.count {
            return false
        }

        var countS = [Character: Int]()
        var countT = [Character: Int]()

        let sArray = Array(s)
        let tArray = Array(t)

        for i in 0..<s.count {
            countS[sArray[i], default: 0] += 1
            countT[tArray[i], default: 0] += 1
        }

        return countS == countT
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + m)$
- Space complexity: $O(1)$ since we have at most $26$ different characters.

> Where $n$ is the length of string $s$ and $m$ is the length of string $t$.

---

## 3. Hash Table (Using Array)

### Intuition

Since the problem guarantees lowercase English letters, we can use a fixed-size array of length `26` to count character frequencies instead of a hash map.
As we iterate through both strings simultaneously, we increment the count for each character in `s` and decrement the count for each character in `t`.
If the strings are anagrams, every increment will be matched by a corresponding decrement, and all values in the array will end at `0`.
This approach is efficient because it avoids hashing and uses constant space.

### Algorithm

1. If the lengths of the strings differ, return `false` immediately.
2. Create a frequency array `count` of size `26` initialized to `0`.
3. Iterate through both strings:
   - Increment the count at the index corresponding to `s[i]`.
   - Decrement the count at the index corresponding to `t[i]`.
4. After processing both strings, scan through the `count` array:
   - If any value is not `0`, return `false` because the frequencies differ.
5. If all values are `0`, return `true` since the strings are anagrams.

::tabs-start

```python
class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        if len(s) != len(t):
            return False

        count = [0] * 26
        for i in range(len(s)):
            count[ord(s[i]) - ord('a')] += 1
            count[ord(t[i]) - ord('a')] -= 1

        for val in count:
            if val != 0:
                return False
        return True
```

```java
public class Solution {
    public boolean isAnagram(String s, String t) {
        if (s.length() != t.length()) {
            return false;
        }

        int[] count = new int[26];
        for (int i = 0; i < s.length(); i++) {
            count[s.charAt(i) - 'a']++;
            count[t.charAt(i) - 'a']--;
        }

        for (int val : count) {
            if (val != 0) {
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
    bool isAnagram(string s, string t) {
        if (s.length() != t.length()) {
            return false;
        }

        vector<int> count(26, 0);
        for (int i = 0; i < s.length(); i++) {
            count[s[i] - 'a']++;
            count[t[i] - 'a']--;
        }

        for (int val : count) {
            if (val != 0) {
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
     * @param {string} s
     * @param {string} t
     * @return {boolean}
     */
    isAnagram(s, t) {
        if (s.length !== t.length) {
            return false;
        }

        const count = new Array(26).fill(0);
        for (let i = 0; i < s.length; i++) {
            count[s.charCodeAt(i) - 'a'.charCodeAt(0)]++;
            count[t.charCodeAt(i) - 'a'.charCodeAt(0)]--;
        }
        return count.every((val) => val === 0);
    }
}
```

```csharp
public class Solution {
    public bool IsAnagram(string s, string t) {
        if (s.Length != t.Length) {
            return false;
        }

        int[] count = new int[26];
        for (int i = 0; i < s.Length; i++) {
            count[s[i] - 'a']++;
            count[t[i] - 'a']--;
        }

        foreach (int val in count) {
            if (val != 0) {
                return false;
            }
        }
        return true;
    }
}
```

```go
func isAnagram(s string, t string) bool {
    if len(s) != len(t) {
        return false
    }

    count := [26]int{}
    for i := 0; i < len(s); i++ {
        count[s[i]-'a']++
        count[t[i]-'a']--
    }

    for _, val := range count {
        if val != 0 {
            return false
        }
    }
    return true
}
```

```kotlin
class Solution {
    fun isAnagram(s: String, t: String): Boolean {
        if (s.length != t.length) {
            return false
        }

        val count = IntArray(26)
        for (i in s.indices) {
            count[s[i] - 'a']++
            count[t[i] - 'a']--
        }

        for (value in count) {
            if (value != 0) {
                return false
            }
        }
        return true
    }
}
```

```swift
class Solution {
    func isAnagram(_ s: String, _ t: String) -> Bool {
        if s.count != t.count {
            return false
        }

        var count = [Int](repeating: 0, count: 26)
        let sArray = Array(s)
        let tArray = Array(t)

        for i in 0..<s.count {
            count[Int(sArray[i].asciiValue!) - 97] += 1
            count[Int(tArray[i].asciiValue!) - 97] -= 1
        }

        for val in count {
            if val != 0 {
                return false
            }
        }
        return true
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + m)$
- Space complexity: $O(1)$ since we have at most $26$ different characters.

> Where $n$ is the length of string $s$ and $m$ is the length of string $t$.

---

## Common Pitfalls

### Forgetting to Check Length First

If two strings have different lengths, they cannot be anagrams. Skipping this early check means wasting time processing strings that could never match. Always compare lengths first and return `false` immediately if they differ.

### Case Sensitivity Issues

When the problem specifies lowercase letters only (as in this problem), case sensitivity is not an issue. However, if the problem allows mixed case, forgetting to normalize to the same case (e.g., converting both strings to lowercase) will cause incorrect results where "Listen" and "Silent" would wrongly be considered non-anagrams.
