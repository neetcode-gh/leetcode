## 1. Splitting the String

::tabs-start

```python
class Solution:
    def isCircularSentence(self, sentence: str) -> bool:
        w = sentence.split(" ")

        for i in range(len(w)):
            if w[i][0] != w[i - 1][-1]:
                return False

        return True
```

```java
public class Solution {
    public boolean isCircularSentence(String sentence) {
        String[] w = sentence.split(" ");
        int n = w.length;

        for (int i = 0; i < n; i++) {
            char start = w[i].charAt(0);
            char end = w[(i - 1 + n) % n].charAt(w[(i - 1 + n) % n].length() - 1);
            if (start != end) {
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
    bool isCircularSentence(string sentence) {
        vector<string> w;
        stringstream ss(sentence);
        string word;

        while (ss >> word) {
            w.push_back(word);
        }

        for (int i = 0; i < w.size(); i++) {
            char start = w[i][0];
            char end = w[(i - 1 + w.size()) % w.size()].back();
            if (start != end) {
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
     * @param {string} sentence
     * @return {boolean}
     */
    isCircularSentence(sentence) {
        const w = sentence.split(' ');

        for (let i = 0; i < w.length; i++) {
            const start = w[i][0];
            const prevEnd = w[(i - 1 + w.length) % w.length].slice(-1);
            if (start !== prevEnd) {
                return false;
            }
        }

        return true;
    }
}
```

```csharp
public class Solution {
    public bool IsCircularSentence(string sentence) {
        string[] w = sentence.Split(' ');
        int n = w.Length;

        for (int i = 0; i < n; i++) {
            char start = w[i][0];
            char end = w[(i - 1 + n) % n][w[(i - 1 + n) % n].Length - 1];
            if (start != end) {
                return false;
            }
        }

        return true;
    }
}
```

```go
func isCircularSentence(sentence string) bool {
    w := strings.Split(sentence, " ")
    n := len(w)

    for i := 0; i < n; i++ {
        start := w[i][0]
        prevIdx := (i - 1 + n) % n
        end := w[prevIdx][len(w[prevIdx])-1]
        if start != end {
            return false
        }
    }

    return true
}
```

```kotlin
class Solution {
    fun isCircularSentence(sentence: String): Boolean {
        val w = sentence.split(" ")
        val n = w.size

        for (i in 0 until n) {
            val start = w[i][0]
            val end = w[(i - 1 + n) % n].last()
            if (start != end) {
                return false
            }
        }

        return true
    }
}
```

```swift
class Solution {
    func isCircularSentence(_ sentence: String) -> Bool {
        let w = sentence.split(separator: " ").map { String($0) }
        let n = w.count

        for i in 0..<n {
            let start = w[i].first!
            let prevIdx = (i - 1 + n) % n
            let end = w[prevIdx].last!
            if start != end {
                return false
            }
        }

        return true
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 2. Iteration (Space Optimized)

::tabs-start

```python
class Solution:
    def isCircularSentence(self, sentence: str) -> bool:
        for i in range(len(sentence)):
            if sentence[i] == " " and sentence[i - 1] != sentence[i + 1]:
                return False
        return sentence[0] == sentence[-1]
```

```java
public class Solution {
    public boolean isCircularSentence(String sentence) {
        for (int i = 0; i < sentence.length(); i++) {
            if (sentence.charAt(i) == ' ' && sentence.charAt(i - 1) != sentence.charAt(i + 1)) {
                return false;
            }
        }
        return sentence.charAt(0) == sentence.charAt(sentence.length() - 1);
    }
}
```

```cpp
class Solution {
public:
    bool isCircularSentence(string sentence) {
        for (int i = 0; i < sentence.size(); i++) {
            if (sentence[i] == ' ' && sentence[i - 1] != sentence[i + 1]) {
                return false;
            }
        }
        return sentence.front() == sentence.back();
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} sentence
     * @return {boolean}
     */
    isCircularSentence(sentence) {
        for (let i = 0; i < sentence.length; i++) {
            if (sentence[i] === ' ' && sentence[i - 1] !== sentence[i + 1]) {
                return false;
            }
        }
        return sentence[0] === sentence[sentence.length - 1];
    }
}
```

```csharp
public class Solution {
    public bool IsCircularSentence(string sentence) {
        for (int i = 0; i < sentence.Length; i++) {
            if (sentence[i] == ' ' && sentence[i - 1] != sentence[i + 1]) {
                return false;
            }
        }
        return sentence[0] == sentence[sentence.Length - 1];
    }
}
```

```go
func isCircularSentence(sentence string) bool {
    for i := 0; i < len(sentence); i++ {
        if sentence[i] == ' ' && sentence[i-1] != sentence[i+1] {
            return false
        }
    }
    return sentence[0] == sentence[len(sentence)-1]
}
```

```kotlin
class Solution {
    fun isCircularSentence(sentence: String): Boolean {
        for (i in sentence.indices) {
            if (sentence[i] == ' ' && sentence[i - 1] != sentence[i + 1]) {
                return false
            }
        }
        return sentence[0] == sentence[sentence.length - 1]
    }
}
```

```swift
class Solution {
    func isCircularSentence(_ sentence: String) -> Bool {
        let chars = Array(sentence)
        for i in 0..<chars.count {
            if chars[i] == " " && chars[i - 1] != chars[i + 1] {
                return false
            }
        }
        return chars[0] == chars[chars.count - 1]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$
