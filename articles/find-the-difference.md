## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Hash Maps / Frequency Counting** - Used to count character occurrences and find the extra character
- **ASCII Values** - Understanding character-to-integer conversion for sum-based solutions
- **Bit Manipulation (XOR)** - The optimal solution uses XOR properties where a ^ a = 0 to find the unique character

---

## 1. Two Hash Maps

### Intuition

String `t` is formed by shuffling string `s` and adding one extra character. By counting the frequency of each character in both strings, the added character will have a higher count in `t` than in `s`. We can compare these counts to find the difference.

### Algorithm

1. Create two count arrays of size 26 for characters in `s` and `t`.
2. Count the frequency of each character in both strings.
3. Compare the counts. The character where `countT[i] > countS[i]` is the answer.
4. Return that character.

::tabs-start

```python
class Solution:
    def findTheDifference(self, s: str, t: str) -> str:
        count_s, count_t = Counter(s), Counter(t)
        for c in count_t:
            if c not in count_s or count_s[c] < count_t[c]:
                return c
```

```java
public class Solution {
    public char findTheDifference(String s, String t) {
        int[] countS = new int[26];
        int[] countT = new int[26];

        for (char c : s.toCharArray()) countS[c - 'a']++;
        for (char c : t.toCharArray()) countT[c - 'a']++;

        for (int i = 0; i < 26; i++) {
            if (countT[i] > countS[i]) {
                return (char) (i + 'a');
            }
        }
        return ' ';
    }
}
```

```cpp
class Solution {
public:
    char findTheDifference(string s, string t) {
        vector<int> countS(26, 0), countT(26, 0);

        for (char c : s) countS[c - 'a']++;
        for (char c : t) countT[c - 'a']++;

        for (int i = 0; i < 26; i++) {
            if (countT[i] > countS[i]) {
                return i + 'a';
            }
        }
        return ' ';
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @param {string} t
     * @return {character}
     */
    findTheDifference(s, t) {
        let countS = Array(26).fill(0);
        let countT = Array(26).fill(0);

        for (let char of s) countS[char.charCodeAt(0) - 'a'.charCodeAt(0)]++;
        for (let char of t) countT[char.charCodeAt(0) - 'a'.charCodeAt(0)]++;

        for (let i = 0; i < 26; i++) {
            if (countT[i] > countS[i]) {
                return String.fromCharCode(i + 'a'.charCodeAt(0));
            }
        }
        return '';
    }
}
```

```csharp
public class Solution {
    public char FindTheDifference(string s, string t) {
        int[] countS = new int[26];
        int[] countT = new int[26];

        foreach (char c in s) countS[c - 'a']++;
        foreach (char c in t) countT[c - 'a']++;

        for (int i = 0; i < 26; i++) {
            if (countT[i] > countS[i]) {
                return (char)(i + 'a');
            }
        }
        return ' ';
    }
}
```

```go
func findTheDifference(s string, t string) byte {
    countS := make([]int, 26)
    countT := make([]int, 26)

    for _, c := range s {
        countS[c-'a']++
    }
    for _, c := range t {
        countT[c-'a']++
    }

    for i := 0; i < 26; i++ {
        if countT[i] > countS[i] {
            return byte('a' + i)
        }
    }
    return ' '
}
```

```kotlin
class Solution {
    fun findTheDifference(s: String, t: String): Char {
        val countS = IntArray(26)
        val countT = IntArray(26)

        for (c in s) countS[c - 'a']++
        for (c in t) countT[c - 'a']++

        for (i in 0 until 26) {
            if (countT[i] > countS[i]) {
                return ('a' + i)
            }
        }
        return ' '
    }
}
```

```swift
class Solution {
    func findTheDifference(_ s: String, _ t: String) -> Character {
        var countS = [Int](repeating: 0, count: 26)
        var countT = [Int](repeating: 0, count: 26)
        let aValue = Character("a").asciiValue!

        for c in s {
            countS[Int(c.asciiValue! - aValue)] += 1
        }
        for c in t {
            countT[Int(c.asciiValue! - aValue)] += 1
        }

        for i in 0..<26 {
            if countT[i] > countS[i] {
                return Character(UnicodeScalar(Int(aValue) + i)!)
            }
        }
        return " "
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ since we have at most $26$ different characters.

---

## 2. One Hash Map

### Intuition

Instead of using two separate count arrays, we can use a single array. First count all characters from `t`, then subtract counts for characters in `s`. The character left with count `1` is the added character.

### Algorithm

1. Create a count array of size 26.
2. Increment counts for each character in `t`.
3. Decrement counts for each character in `s`.
4. Find and return the character with count equal to `1`.

::tabs-start

```python
class Solution:
    def findTheDifference(self, s: str, t: str) -> str:
        count = Counter(t)
        for c in s:
            count[c] -= 1
        for c in count:
            if count[c] == 1:
                return c
```

```java
public class Solution {
    public char findTheDifference(String s, String t) {
        int[] count = new int[26];

        for (char c : t.toCharArray()) count[c - 'a']++;
        for (char c : s.toCharArray()) count[c - 'a']--;

        for (int i = 0; i < 26; i++) {
            if (count[i] == 1) {
                return (char) (i + 'a');
            }
        }
        return ' ';
    }
}
```

```cpp
class Solution {
public:
    char findTheDifference(string s, string t) {
        vector<int> count(26);

        for (char c : t) count[c - 'a']++;
        for (char c : s) count[c - 'a']--;

        for (int i = 0; i < 26; i++) {
            if (count[i] == 1) {
                return i + 'a';
            }
        }
        return ' ';
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @param {string} t
     * @return {character}
     */
    findTheDifference(s, t) {
        let count = Array(26).fill(0);

        for (let char of t) count[char.charCodeAt(0) - 'a'.charCodeAt(0)]++;
        for (let char of s) count[char.charCodeAt(0) - 'a'.charCodeAt(0)]--;

        for (let i = 0; i < 26; i++) {
            if (count[i] === 1) {
                return String.fromCharCode(i + 'a'.charCodeAt(0));
            }
        }
        return '';
    }
}
```

```csharp
public class Solution {
    public char FindTheDifference(string s, string t) {
        int[] count = new int[26];

        foreach (char c in t) count[c - 'a']++;
        foreach (char c in s) count[c - 'a']--;

        for (int i = 0; i < 26; i++) {
            if (count[i] == 1) {
                return (char)(i + 'a');
            }
        }
        return ' ';
    }
}
```

```go
func findTheDifference(s string, t string) byte {
    count := make([]int, 26)

    for _, c := range t {
        count[c-'a']++
    }
    for _, c := range s {
        count[c-'a']--
    }

    for i := 0; i < 26; i++ {
        if count[i] == 1 {
            return byte('a' + i)
        }
    }
    return ' '
}
```

```kotlin
class Solution {
    fun findTheDifference(s: String, t: String): Char {
        val count = IntArray(26)

        for (c in t) count[c - 'a']++
        for (c in s) count[c - 'a']--

        for (i in 0 until 26) {
            if (count[i] == 1) {
                return ('a' + i)
            }
        }
        return ' '
    }
}
```

```swift
class Solution {
    func findTheDifference(_ s: String, _ t: String) -> Character {
        var count = [Int](repeating: 0, count: 26)
        let aValue = Character("a").asciiValue!

        for c in t {
            count[Int(c.asciiValue! - aValue)] += 1
        }
        for c in s {
            count[Int(c.asciiValue! - aValue)] -= 1
        }

        for i in 0..<26 {
            if count[i] == 1 {
                return Character(UnicodeScalar(Int(aValue) + i)!)
            }
        }
        return " "
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ since we have at most $26$ different characters.

---

## 3. Sorting

### Intuition

After sorting both strings, corresponding characters at each position should match since `t` is a shuffled version of `s` plus one character. The first position where they differ reveals the added character. If all positions match, the added character is at the end of `t`.

### Algorithm

1. Sort both strings `s` and `t`.
2. Compare characters at each position.
3. Return the first character in `t` that differs from the corresponding character in `s`.
4. If all characters match, return the last character of `t`.

::tabs-start

```python
class Solution:
    def findTheDifference(self, s: str, t: str) -> str:
        s, t = sorted(s), sorted(t)
        for c1, c2 in zip(s, t):
            if c1 != c2:
                return c2
        return t[-1]
```

```java
public class Solution {
    public char findTheDifference(String s, String t) {
        char[] sArr = s.toCharArray();
        char[] tArr = t.toCharArray();
        Arrays.sort(sArr);
        Arrays.sort(tArr);
        for (int i = 0; i < sArr.length; i++) {
            if (sArr[i] != tArr[i]) {
                return tArr[i];
            }
        }
        return tArr[tArr.length - 1];
    }
}
```

```cpp
class Solution {
public:
    char findTheDifference(string s, string t) {
        sort(s.begin(), s.end());
        sort(t.begin(), t.end());
        for (int i = 0; i < s.size(); i++) {
            if (s[i] != t[i]) {
                return t[i];
            }
        }
        return t[t.size() - 1];
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @param {string} t
     * @return {character}
     */
    findTheDifference(s, t) {
        s = s.split('').sort();
        t = t.split('').sort();
        for (let i = 0; i < s.length; i++) {
            if (s[i] !== t[i]) {
                return t[i];
            }
        }
        return t[t.length - 1];
    }
}
```

```csharp
public class Solution {
    public char FindTheDifference(string s, string t) {
        char[] sArr = s.ToCharArray();
        char[] tArr = t.ToCharArray();
        Array.Sort(sArr);
        Array.Sort(tArr);

        for (int i = 0; i < sArr.Length; i++) {
            if (sArr[i] != tArr[i]) {
                return tArr[i];
            }
        }
        return tArr[tArr.Length - 1];
    }
}
```

```go
import "sort"

func findTheDifference(s string, t string) byte {
    sArr := []byte(s)
    tArr := []byte(t)
    sort.Slice(sArr, func(i, j int) bool { return sArr[i] < sArr[j] })
    sort.Slice(tArr, func(i, j int) bool { return tArr[i] < tArr[j] })

    for i := 0; i < len(sArr); i++ {
        if sArr[i] != tArr[i] {
            return tArr[i]
        }
    }
    return tArr[len(tArr)-1]
}
```

```kotlin
class Solution {
    fun findTheDifference(s: String, t: String): Char {
        val sArr = s.toCharArray().sortedArray()
        val tArr = t.toCharArray().sortedArray()

        for (i in sArr.indices) {
            if (sArr[i] != tArr[i]) {
                return tArr[i]
            }
        }
        return tArr[tArr.size - 1]
    }
}
```

```swift
class Solution {
    func findTheDifference(_ s: String, _ t: String) -> Character {
        let sArr = s.sorted()
        let tArr = t.sorted()

        for i in 0..<sArr.count {
            if sArr[i] != tArr[i] {
                return tArr[i]
            }
        }
        return tArr[tArr.count - 1]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(1)$ or $O(n)$ depending on the sorting algorithm.

---

## 4. Difference Between ASCII Values

### Intuition

Each character has an ASCII value. If we sum the ASCII values of all characters in `t` and subtract the sum of ASCII values in `s`, the result equals the ASCII value of the added character. This works because all matching characters cancel out.

### Algorithm

1. Compute the sum of ASCII values for all characters in `s`.
2. Compute the sum of ASCII values for all characters in `t`.
3. Subtract `sumS` from `sumT`.
4. Convert the result to a character and return it.

::tabs-start

```python
class Solution:
    def findTheDifference(self, s: str, t: str) -> str:
        sum_s, sum_t = 0, 0
        for c in s:
            sum_s += ord(c)
        for c in t:
            sum_t += ord(c)
        return chr(sum_t - sum_s)
```

```java
public class Solution {
    public char findTheDifference(String s, String t) {
        int sumS = 0, sumT = 0;
        for (int i = 0; i < s.length(); i++) {
            sumS += s.charAt(i);
        }
        for (int i = 0; i < t.length(); i++) {
            sumT += t.charAt(i);
        }
        return (char) (sumT - sumS);
    }
}
```

```cpp
class Solution {
public:
    char findTheDifference(string s, string t) {
        int sumS = 0, sumT = 0;
        for (char c : s) {
            sumS += c;
        }
        for (char c : t) {
            sumT += c;
        }
        return (char) (sumT - sumS);
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @param {string} t
     * @return {character}
     */
    findTheDifference(s, t) {
        let sumS = 0,
            sumT = 0;
        for (let char of s) {
            sumS += char.charCodeAt(0);
        }
        for (let char of t) {
            sumT += char.charCodeAt(0);
        }
        return String.fromCharCode(sumT - sumS);
    }
}
```

```csharp
public class Solution {
    public char FindTheDifference(string s, string t) {
        int sumS = 0, sumT = 0;
        for (int i = 0; i < s.Length; i++) {
            sumS += s[i];
        }
        for (int i = 0; i < t.Length; i++) {
            sumT += t[i];
        }
        return (char)(sumT - sumS);
    }
}
```

```go
func findTheDifference(s string, t string) byte {
    sumS, sumT := 0, 0
    for _, c := range s {
        sumS += int(c)
    }
    for _, c := range t {
        sumT += int(c)
    }
    return byte(sumT - sumS)
}
```

```kotlin
class Solution {
    fun findTheDifference(s: String, t: String): Char {
        var sumS = 0
        var sumT = 0
        for (c in s) {
            sumS += c.code
        }
        for (c in t) {
            sumT += c.code
        }
        return (sumT - sumS).toChar()
    }
}
```

```swift
class Solution {
    func findTheDifference(_ s: String, _ t: String) -> Character {
        var sumS = 0, sumT = 0
        for c in s {
            sumS += Int(c.asciiValue!)
        }
        for c in t {
            sumT += Int(c.asciiValue!)
        }
        return Character(UnicodeScalar(sumT - sumS)!)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.

---

## 5. Difference Between ASCII Values (Optimal)

### Intuition

We can optimize space by using a single variable instead of two separate sums. By subtracting ASCII values from `s` and adding ASCII values from `t` to the same variable, we compute the difference in one pass through both strings.

### Algorithm

1. Initialize `res = 0`.
2. For each character in `s`, subtract its ASCII value from `res`.
3. For each character in `t`, add its ASCII value to `res`.
4. Convert `res` to a character and return it.

::tabs-start

```python
class Solution:
    def findTheDifference(self, s: str, t: str) -> str:
        res = 0
        for c in s:
            res -= ord(c)
        for c in t:
            res += ord(c)
        return chr(res)
```

```java
public class Solution {
    public char findTheDifference(String s, String t) {
        int res = 0;
        for (int i = 0; i < s.length(); i++) {
            res -= s.charAt(i);
        }
        for (int i = 0; i < t.length(); i++) {
            res += t.charAt(i);
        }
        return (char) (res);
    }
}
```

```cpp
class Solution {
public:
    char findTheDifference(string s, string t) {
        int res = 0;
        for (char c : s) {
            res -= c;
        }
        for (char c : t) {
            res += c;
        }
        return (char) (res);
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @param {string} t
     * @return {character}
     */
    findTheDifference(s, t) {
        let res = 0;
        for (let char of s) {
            res -= char.charCodeAt(0);
        }
        for (let char of t) {
            res += char.charCodeAt(0);
        }
        return String.fromCharCode(res);
    }
}
```

```csharp
public class Solution {
    public char FindTheDifference(string s, string t) {
        int res = 0;
        for (int i = 0; i < s.Length; i++) {
            res -= s[i];
        }
        for (int i = 0; i < t.Length; i++) {
            res += t[i];
        }
        return (char)res;
    }
}
```

```go
func findTheDifference(s string, t string) byte {
    res := 0
    for _, c := range s {
        res -= int(c)
    }
    for _, c := range t {
        res += int(c)
    }
    return byte(res)
}
```

```kotlin
class Solution {
    fun findTheDifference(s: String, t: String): Char {
        var res = 0
        for (c in s) {
            res -= c.code
        }
        for (c in t) {
            res += c.code
        }
        return res.toChar()
    }
}
```

```swift
class Solution {
    func findTheDifference(_ s: String, _ t: String) -> Character {
        var res = 0
        for c in s {
            res -= Int(c.asciiValue!)
        }
        for c in t {
            res += Int(c.asciiValue!)
        }
        return Character(UnicodeScalar(res)!)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.

---

## 6. Bitwise XOR

### Intuition

XOR has a useful property: `a ^ a = 0` and `a ^ 0 = a`. If we XOR all characters from both strings together, each character that appears in both `s` and `t` will cancel out (XOR with itself gives `0`). The only character remaining is the added one, since it appears an odd number of times total.

### Algorithm

1. Initialize `res = 0`.
2. XOR `res` with each character's ASCII value in `s`.
3. XOR `res` with each character's ASCII value in `t`.
4. Convert `res` to a character and return it.

::tabs-start

```python
class Solution:
    def findTheDifference(self, s: str, t: str) -> str:
        res = 0
        for c in s:
            res ^= ord(c)
        for c in t:
            res ^= ord(c)
        return chr(res)
```

```java
public class Solution {
    public char findTheDifference(String s, String t) {
        int res = 0;
        for (int i = 0; i < s.length(); i++) {
            res ^= s.charAt(i);
        }
        for (int i = 0; i < t.length(); i++) {
            res ^= t.charAt(i);
        }
        return (char) (res);
    }
}
```

```cpp
class Solution {
public:
    char findTheDifference(string s, string t) {
        int res = 0;
        for (char c : s) {
            res ^= c;
        }
        for (char c : t) {
            res ^= c;
        }
        return (char) (res);
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @param {string} t
     * @return {character}
     */
    findTheDifference(s, t) {
        let res = 0;
        for (let char of s) {
            res ^= char.charCodeAt(0);
        }
        for (let char of t) {
            res ^= char.charCodeAt(0);
        }
        return String.fromCharCode(res);
    }
}
```

```csharp
public class Solution {
    public char FindTheDifference(string s, string t) {
        int res = 0;
        for (int i = 0; i < s.Length; i++) {
            res ^= s[i];
        }
        for (int i = 0; i < t.Length; i++) {
            res ^= t[i];
        }
        return (char)res;
    }
}
```

```go
func findTheDifference(s string, t string) byte {
    res := 0
    for _, c := range s {
        res ^= int(c)
    }
    for _, c := range t {
        res ^= int(c)
    }
    return byte(res)
}
```

```kotlin
class Solution {
    fun findTheDifference(s: String, t: String): Char {
        var res = 0
        for (c in s) {
            res = res xor c.code
        }
        for (c in t) {
            res = res xor c.code
        }
        return res.toChar()
    }
}
```

```swift
class Solution {
    func findTheDifference(_ s: String, _ t: String) -> Character {
        var res = 0
        for c in s {
            res ^= Int(c.asciiValue!)
        }
        for c in t {
            res ^= Int(c.asciiValue!)
        }
        return Character(UnicodeScalar(res)!)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.

---

## Common Pitfalls

### Forgetting to Handle Empty String `s`

When `s` is an empty string, `t` contains exactly one character (the added one). Solutions that iterate through `s` first or rely on finding a mismatch between sorted strings must handle this edge case. The XOR and sum-based approaches naturally handle this since XORing or summing over an empty string contributes nothing.

### Comparing Characters Instead of Counts

A common mistake is to iterate through both strings and return the first character in `t` that does not appear in `s`. This fails when the added character is a duplicate of an existing character. For example, if `s = "a"` and `t = "aa"`, the added character is `'a'`, but a naive check would miss it since `'a'` already exists in `s`.
