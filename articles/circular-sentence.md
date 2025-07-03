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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$
