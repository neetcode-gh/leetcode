## 1. Built-In Functions

::tabs-start

```python
class Solution:
    def removeVowels(self, s: str) -> str:
        return re.sub(r"[aeiou]", "", s)
```

```java
public class Solution {
    public String removeVowels(String s) {
        return s.replaceAll("[aeiou]", "");
    }
}
```

```cpp
class Solution {
public:
    string removeVowels(string s) {
        return regex_replace(s, regex("[aeiou]"), "");
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {string}
     */
    removeVowels(s) {
        return s.replace(/[aeiou]/g, '');
    }
}
```

```csharp
public class Solution {
    public string RemoveVowels(string s) {
        return System.Text.RegularExpressions.Regex.Replace(s, "[aeiou]", "");
    }
}
```

```go
func removeVowels(s string) string {
    return regexp.MustCompile("[aeiou]").ReplaceAllString(s, "")
}
```

```kotlin
class Solution {
    fun removeVowels(s: String): String {
        return s.replace(Regex("[aeiou]"), "")
    }
}
```

```swift
class Solution {
    func removeVowels(_ s: String) -> String {
        return s.replacingOccurrences(of: "[aeiou]", with: "", options: .regularExpression)
    }
}
```

```rust
impl Solution {
    pub fn remove_vowels(s: String) -> String {
        s.replace(&['a', 'e', 'i', 'o', 'u'][..], "")
    }
}
```

```typescript
class Solution {
    /**
     * @param {string} s
     * @return {string}
     */
    removeVowels(s: string): string {
        return s.replace(/[aeiou]/g, '');
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

> Where $n$ is the length of the string $s$.

---

## 2. Hash Set

::tabs-start

```python
class Solution:
    def removeVowels(self, s: str) -> str:
        vowels = set("aeiou")
        res = []
        for c in s:
            if c not in vowels:
                res.append(c)
        return "".join(res)
```

```java
public class Solution {
    public String removeVowels(String s) {
        Set<Character> vowels = new HashSet<>(Arrays.asList('a', 'e', 'i', 'o', 'u'));
        StringBuilder res = new StringBuilder();
        for (char c : s.toCharArray()) {
            if (!vowels.contains(c)) {
                res.append(c);
            }
        }
        return res.toString();
    }
}
```

```cpp
class Solution {
public:
    string removeVowels(string s) {
        unordered_set<char> vowels = {'a', 'e', 'i', 'o', 'u'};
        string res;
        for (char c : s) {
            if (!vowels.count(c)) {
                res += c;
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
     * @return {string}
     */
    removeVowels(s) {
        const vowels = new Set(['a', 'e', 'i', 'o', 'u']);
        const res = [];
        for (const c of s) {
            if (!vowels.has(c)) {
                res.push(c);
            }
        }
        return res.join('');
    }
}
```

```csharp
public class Solution {
    public string RemoveVowels(string s) {
        HashSet<char> vowels = new HashSet<char> { 'a', 'e', 'i', 'o', 'u' };
        StringBuilder res = new StringBuilder();
        foreach (char c in s) {
            if (!vowels.Contains(c)) {
                res.Append(c);
            }
        }
        return res.ToString();
    }
}
```

```go
func removeVowels(s string) string {
    vowels := map[rune]bool{'a': true, 'e': true, 'i': true, 'o': true, 'u': true}
    var res strings.Builder
    for _, c := range s {
        if !vowels[c] {
            res.WriteRune(c)
        }
    }
    return res.String()
}
```

```kotlin
class Solution {
    fun removeVowels(s: String): String {
        val vowels = hashSetOf('a', 'e', 'i', 'o', 'u')
        val res = StringBuilder()
        for (c in s) {
            if (c !in vowels) {
                res.append(c)
            }
        }
        return res.toString()
    }
}
```

```swift
class Solution {
    func removeVowels(_ s: String) -> String {
        let vowels: Set<Character> = ["a", "e", "i", "o", "u"]
        var res = ""
        for c in s {
            if !vowels.contains(c) {
                res.append(c)
            }
        }
        return res
    }
}
```

```rust
use std::collections::HashSet;

impl Solution {
    pub fn remove_vowels(s: String) -> String {
        let vowels: HashSet<char> = ['a', 'e', 'i', 'o', 'u'].into_iter().collect();
        let mut res = String::new();
        for c in s.chars() {
            if !vowels.contains(&c) {
                res.push(c);
            }
        }
        res
    }
}
```

```typescript
class Solution {
    /**
     * @param {string} s
     * @return {string}
     */
    removeVowels(s: string): string {
        const vowels = new Set<string>(['a', 'e', 'i', 'o', 'u']);
        const res: string[] = [];
        for (const c of s) {
            if (!vowels.has(c)) {
                res.push(c);
            }
        }
        return res.join('');
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity:
    - $O(1)$ extra space.
    - $O(n)$ space for the output string.

> Where $n$ is the length of the string $s$.

---

## 3. Iteration

::tabs-start

```python
class Solution:
    def removeVowels(self, s: str) -> str:
        def isVowel(c):
            return c == "a" or c == "e" or c == "i" or c == "o" or c == "u"

        res = []
        for c in s:
            if not isVowel(c):
                res.append(c)
        return "".join(res)
```

```java
public class Solution {
    public String removeVowels(String s) {
        StringBuilder res = new StringBuilder();
        for (char c : s.toCharArray()) {
            if (!isVowel(c)) {
                res.append(c);
            }
        }
        return res.toString();
    }

    private boolean isVowel(char c) {
        return c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u';
    }
}
```

```cpp
class Solution {
public:
    string removeVowels(string s) {
        string res;
        for (char c : s) {
            if (!isVowel(c)) {
                res += c;
            }
        }
        return res;
    }

private:
    bool isVowel(char c) {
        return c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u';
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {string}
     */
    removeVowels(s) {
        let res = '';
        for (const c of s) {
            if (!this.isVowel(c)) {
                res += c;
            }
        }
        return res;
    }

    /**
     * @param {character} c
     * @return {boolean}
     */
    isVowel(c) {
        return c === 'a' || c === 'e' || c === 'i' || c === 'o' || c === 'u';
    }
}
```

```csharp
public class Solution {
    public string RemoveVowels(string s) {
        StringBuilder res = new StringBuilder();
        foreach (char c in s) {
            if (!IsVowel(c)) {
                res.Append(c);
            }
        }
        return res.ToString();
    }

    private bool IsVowel(char c) {
        return c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u';
    }
}
```

```go
func removeVowels(s string) string {
    isVowel := func(c byte) bool {
        return c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u'
    }

    res := []byte{}
    for i := 0; i < len(s); i++ {
        if !isVowel(s[i]) {
            res = append(res, s[i])
        }
    }
    return string(res)
}
```

```kotlin
class Solution {
    fun removeVowels(s: String): String {
        val res = StringBuilder()
        for (c in s) {
            if (!isVowel(c)) {
                res.append(c)
            }
        }
        return res.toString()
    }

    private fun isVowel(c: Char): Boolean {
        return c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u'
    }
}
```

```swift
class Solution {
    func removeVowels(_ s: String) -> String {
        var res = ""
        for c in s {
            if !isVowel(c) {
                res.append(c)
            }
        }
        return res
    }

    private func isVowel(_ c: Character) -> Bool {
        return c == "a" || c == "e" || c == "i" || c == "o" || c == "u"
    }
}
```

```rust
impl Solution {
    pub fn remove_vowels(s: String) -> String {
        let mut res = String::new();
        for c in s.chars() {
            if !Self::is_vowel(c) {
                res.push(c);
            }
        }
        res
    }

    fn is_vowel(c: char) -> bool {
        c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u'
    }
}
```

```typescript
class Solution {
    /**
     * @param {string} s
     * @return {string}
     */
    removeVowels(s: string): string {
        let res = '';
        for (const c of s) {
            if (!this.isVowel(c)) {
                res += c;
            }
        }
        return res;
    }

    /**
     * @param {character} c
     * @return {boolean}
     */
    isVowel(c: string): boolean {
        return c === 'a' || c === 'e' || c === 'i' || c === 'o' || c === 'u';
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity:
    - $O(1)$ extra space.
    - $O(n)$ space for the output string.

> Where $n$ is the length of the string $s$.

---

## 4. Two Pointers (In-Place)

::tabs-start

```python
class Solution:
    def removeVowels(self, s: str) -> str:
        chars = list(s)
        j = 0
        for i in range(len(chars)):
            if chars[i] not in "aeiou":
                chars[j] = chars[i]
                j += 1
        return "".join(chars[:j])
```

```java
public class Solution {
    public String removeVowels(String s) {
        char[] chars = s.toCharArray();
        int j = 0;
        for (int i = 0; i < chars.length; i++) {
            if ("aeiou".indexOf(chars[i]) == -1) {
                chars[j++] = chars[i];
            }
        }
        return new String(chars, 0, j);
    }
}
```

```cpp
class Solution {
public:
    string removeVowels(string s) {
        int j = 0;
        for (int i = 0; i < s.size(); i++) {
            if (string("aeiou").find(s[i]) == string::npos) {
                s[j++] = s[i];
            }
        }
        s.resize(j);
        return s;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {string}
     */
    removeVowels(s) {
        const chars = s.split('');
        let j = 0;
        for (let i = 0; i < chars.length; i++) {
            if (!'aeiou'.includes(chars[i])) {
                chars[j++] = chars[i];
            }
        }
        return chars.slice(0, j).join('');
    }
}
```

```csharp
public class Solution {
    public string RemoveVowels(string s) {
        char[] chars = s.ToCharArray();
        int j = 0;
        for (int i = 0; i < chars.Length; i++) {
            if ("aeiou".IndexOf(chars[i]) == -1) {
                chars[j++] = chars[i];
            }
        }
        return new string(chars, 0, j);
    }
}
```

```go
func removeVowels(s string) string {
    chars := []byte(s)
    j := 0
    for i := 0; i < len(chars); i++ {
        if !strings.ContainsRune("aeiou", rune(chars[i])) {
            chars[j] = chars[i]
            j++
        }
    }
    return string(chars[:j])
}
```

```kotlin
class Solution {
    fun removeVowels(s: String): String {
        val chars = s.toCharArray()
        var j = 0
        for (i in chars.indices) {
            if (chars[i] !in "aeiou") {
                chars[j++] = chars[i]
            }
        }
        return String(chars, 0, j)
    }
}
```

```swift
class Solution {
    func removeVowels(_ s: String) -> String {
        var chars = Array(s)
        var j = 0
        for i in 0..<chars.count {
            if !"aeiou".contains(chars[i]) {
                chars[j] = chars[i]
                j += 1
            }
        }
        return String(chars[0..<j])
    }
}
```

```rust
impl Solution {
    pub fn remove_vowels(s: String) -> String {
        let mut chars = s.into_bytes();
        let mut j = 0;
        for i in 0..chars.len() {
            if !b"aeiou".contains(&chars[i]) {
                chars[j] = chars[i];
                j += 1;
            }
        }
        chars.truncate(j);
        String::from_utf8(chars).unwrap()
    }
}
```

```typescript
class Solution {
    /**
     * @param {string} s
     * @return {string}
     */
    removeVowels(s: string): string {
        const chars = s.split('');
        let j = 0;
        for (let i = 0; i < chars.length; i++) {
            if (!'aeiou'.includes(chars[i])) {
                chars[j++] = chars[i];
            }
        }
        return chars.slice(0, j).join('');
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$ for the character array.

> Where $n$ is the length of the string $s$.
