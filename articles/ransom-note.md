## 1. Brute Force

::tabs-start

```python
class Solution:
    def canConstruct(self, ransomNote: str, magazine: str) -> bool:
        magazine = list(magazine)

        for c in ransomNote:
            if c not in magazine:
                return False
            else:
                magazine.remove(c)
        
        return True
```

```java
public class Solution {
    public boolean canConstruct(String ransomNote, String magazine) {
        List<Character> mag = new ArrayList<>();
        for (char c : magazine.toCharArray()) {
            mag.add(c);
        }

        for (char c : ransomNote.toCharArray()) {
            if (!mag.contains(c)) return false;
            mag.remove((Character) c);
        }

        return true;
    }
}
```

```cpp
class Solution {
public:
    bool canConstruct(string ransomNote, string magazine) {
        vector<char> mag(magazine.begin(), magazine.end());

        for (char c : ransomNote) {
            auto it = find(mag.begin(), mag.end(), c);
            if (it == mag.end()) return false;
            mag.erase(it);
        }

        return true;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} ransomNote
     * @param {string} magazine
     * @return {boolean}
     */
    canConstruct(ransomNote, magazine) {
        let mag = magazine.split("");

        for (let c of ransomNote) {
            let idx = mag.indexOf(c);
            if (idx === -1) return false;
            mag.splice(idx, 1);
        }

        return true;
    }
}
```

```csharp
public class Solution {
    public bool CanConstruct(string ransomNote, string magazine) {
        List<char> mag = new List<char>(magazine);

        foreach (char c in ransomNote) {
            if (!mag.Contains(c)) return false;
            mag.Remove(c);
        }

        return true;
    }
}
```

```go
func canConstruct(ransomNote string, magazine string) bool {
    mag := []rune(magazine)

    for _, c := range ransomNote {
        found := false
        for i, m := range mag {
            if m == c {
                mag = append(mag[:i], mag[i+1:]...)
                found = true
                break
            }
        }
        if !found {
            return false
        }
    }

    return true
}
```

```kotlin
class Solution {
    fun canConstruct(ransomNote: String, magazine: String): Boolean {
        val mag = magazine.toMutableList()

        for (c in ransomNote) {
            if (!mag.contains(c)) return false
            mag.remove(c)
        }

        return true
    }
}
```

```swift
class Solution {
    func canConstruct(_ ransomNote: String, _ magazine: String) -> Bool {
        var mag = Array(magazine)

        for c in ransomNote {
            if let idx = mag.firstIndex(of: c) {
                mag.remove(at: idx)
            } else {
                return false
            }
        }

        return true
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(m * n)$
* Space complexity: $O(n)$

> Where $m$ and $n$ are the lengths of the strings $ransomNote$ and $magazine$, respectively.

---

## 2. Count Frequency

::tabs-start

```python
class Solution:
    def canConstruct(self, ransomNote: str, magazine: str) -> bool:
        countR = Counter(ransomNote)
        countM = Counter(magazine)

        for c in countR:
            if countM[c] < countR[c]:
                return False

        return True
```

```java
public class Solution {
    public boolean canConstruct(String ransomNote, String magazine) {
        int[] countR = new int[26];
        int[] countM = new int[26];

        for (char c : ransomNote.toCharArray()) {
            countR[c - 'a']++;
        }

        for (char c : magazine.toCharArray()) {
            countM[c - 'a']++;
        }

        for (int i = 0; i < 26; i++) {
            if (countM[i] < countR[i]) return false;
        }

        return true;
    }
}
```

```cpp
class Solution {
public:
    bool canConstruct(string ransomNote, string magazine) {
        int countR[26] = {};
        int countM[26] = {};

        for (char c : ransomNote) {
            countR[c - 'a']++;
        }

        for (char c : magazine) {
            countM[c - 'a']++;
        }

        for (int i = 0; i < 26; ++i) {
            if (countM[i] < countR[i]) return false;
        }

        return true;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} ransomNote
     * @param {string} magazine
     * @return {boolean}
     */
    canConstruct(ransomNote, magazine) {
        const countR = Array(26).fill(0);
        const countM = Array(26).fill(0);

        for (const c of ransomNote) {
            countR[c.charCodeAt(0) - 97]++;
        }

        for (const c of magazine) {
            countM[c.charCodeAt(0) - 97]++;
        }

        for (let i = 0; i < 26; i++) {
            if (countM[i] < countR[i]) return false;
        }

        return true;
    }
}
```

```csharp
public class Solution {
    public bool CanConstruct(string ransomNote, string magazine) {
        int[] countR = new int[26];
        int[] countM = new int[26];

        foreach (char c in ransomNote) {
            countR[c - 'a']++;
        }

        foreach (char c in magazine) {
            countM[c - 'a']++;
        }

        for (int i = 0; i < 26; i++) {
            if (countM[i] < countR[i]) return false;
        }

        return true;
    }
}
```

```go
func canConstruct(ransomNote string, magazine string) bool {
    countR := make([]int, 26)
    countM := make([]int, 26)

    for _, c := range ransomNote {
        countR[c-'a']++
    }

    for _, c := range magazine {
        countM[c-'a']++
    }

    for i := 0; i < 26; i++ {
        if countM[i] < countR[i] {
            return false
        }
    }

    return true
}
```

```kotlin
class Solution {
    fun canConstruct(ransomNote: String, magazine: String): Boolean {
        val countR = IntArray(26)
        val countM = IntArray(26)

        for (c in ransomNote) {
            countR[c - 'a']++
        }

        for (c in magazine) {
            countM[c - 'a']++
        }

        for (i in 0 until 26) {
            if (countM[i] < countR[i]) return false
        }

        return true
    }
}
```

```swift
class Solution {
    func canConstruct(_ ransomNote: String, _ magazine: String) -> Bool {
        var countR = [Int](repeating: 0, count: 26)
        var countM = [Int](repeating: 0, count: 26)

        for c in ransomNote.unicodeScalars {
            countR[Int(c.value) - Int(Character("a").asciiValue!)] += 1
        }

        for c in magazine.unicodeScalars {
            countM[Int(c.value) - Int(Character("a").asciiValue!)] += 1
        }

        for i in 0..<26 {
            if countM[i] < countR[i] { return false }
        }

        return true
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(m + n)$
* Space complexity: $O(1)$ since we have at most $26$ different characters.

> Where $m$ and $n$ are the lengths of the strings $ransomNote$ and $magazine$, respectively.

---

## 3. Count Frequency (Optimal)

::tabs-start

```python
class Solution:
    def canConstruct(self, ransomNote: str, magazine: str) -> bool:
        count = [0] * 26
        for c in magazine:
            count[ord(c) - ord('a')] += 1

        for c in ransomNote:
            count[ord(c) - ord('a')] -= 1
            if count[ord(c) - ord('a')] < 0:
                return False

        return True
```

```java
public class Solution {
    public boolean canConstruct(String ransomNote, String magazine) {
        int[] count = new int[26];
        for (char c : magazine.toCharArray()) {
            count[c - 'a']++;
        }
        for (char c : ransomNote.toCharArray()) {
            if (--count[c - 'a'] < 0) return false;
        }
        return true;
    }
}
```

```cpp
class Solution {
public:
    bool canConstruct(string ransomNote, string magazine) {
        int count[26] = {};
        for (char c : magazine) {
            count[c - 'a']++;
        }
        for (char c : ransomNote) {
            if (--count[c - 'a'] < 0) return false;
        }
        return true;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} ransomNote
     * @param {string} magazine
     * @return {boolean}
     */
    canConstruct(ransomNote, magazine) {
        const count = Array(26).fill(0);
        for (const c of magazine) {
            count[c.charCodeAt(0) - 97]++;
        }
        for (const c of ransomNote) {
            if (--count[c.charCodeAt(0) - 97] < 0) return false;
        }
        return true;
    }
}
```

```csharp
public class Solution {
    public bool CanConstruct(string ransomNote, string magazine) {
        int[] count = new int[26];
        foreach (char c in magazine) {
            count[c - 'a']++;
        }
        foreach (char c in ransomNote) {
            if (--count[c - 'a'] < 0) return false;
        }
        return true;
    }
}
```

```go
func canConstruct(ransomNote string, magazine string) bool {
    count := make([]int, 26)
    for _, c := range magazine {
        count[c-'a']++
    }
    for _, c := range ransomNote {
        count[c-'a']--
        if count[c-'a'] < 0 {
            return false
        }
    }
    return true
}
```

```kotlin
class Solution {
    fun canConstruct(ransomNote: String, magazine: String): Boolean {
        val count = IntArray(26)
        for (c in magazine) {
            count[c - 'a']++
        }
        for (c in ransomNote) {
            if (--count[c - 'a'] < 0) return false
        }
        return true
    }
}
```

```swift
class Solution {
    func canConstruct(_ ransomNote: String, _ magazine: String) -> Bool {
        var count = [Int](repeating: 0, count: 26)
        let aValue = Int(Character("a").asciiValue!)

        for c in magazine.unicodeScalars {
            count[Int(c.value) - aValue] += 1
        }
        for c in ransomNote.unicodeScalars {
            count[Int(c.value) - aValue] -= 1
            if count[Int(c.value) - aValue] < 0 { return false }
        }
        return true
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(m + n)$
* Space complexity: $O(1)$ since we have at most $26$ different characters.

> Where $m$ and $n$ are the lengths of the strings $ransomNote$ and $magazine$, respectively.