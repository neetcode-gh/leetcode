## 1. Brute Force

::tabs-start

```python
class Solution:
    def shortestDistance(self, wordsDict: List[str], word1: str, word2: str) -> int:
        n = len(wordsDict)
        res = n
        for i in range(n):
            if wordsDict[i] == word1:
                for j in range(n):
                    if wordsDict[j] == word2:
                        res = min(res, abs(i - j))
        return res
```

```java
public class Solution {
    public int shortestDistance(String[] wordsDict, String word1, String word2) {
        int n = wordsDict.length;
        int res = n;
        for (int i = 0; i < n; i++) {
            if (wordsDict[i].equals(word1)) {
                for (int j = 0; j < n; j++) {
                    if (wordsDict[j].equals(word2)) {
                        res = Math.min(res, Math.abs(i - j));
                    }
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
    int shortestDistance(vector<string>& wordsDict, string word1, string word2) {
        int n = wordsDict.size();
        int res = n;
        for (int i = 0; i < n; i++) {
            if (wordsDict[i] == word1) {
                for (int j = 0; j < n; j++) {
                    if (wordsDict[j] == word2) {
                        res = min(res, abs(i - j));
                    }
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
     * @param {string[]} wordsDict
     * @param {string} word1
     * @param {string} word2
     * @return {number}
     */
    shortestDistance(wordsDict, word1, word2) {
        const n = wordsDict.length;
        let res = n;
        for (let i = 0; i < n; i++) {
            if (wordsDict[i] === word1) {
                for (let j = 0; j < n; j++) {
                    if (wordsDict[j] === word2) {
                        res = Math.min(res, Math.abs(i - j));
                    }
                }
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int ShortestDistance(string[] wordsDict, string word1, string word2) {
        int n = wordsDict.Length;
        int res = n;
        for (int i = 0; i < n; i++) {
            if (wordsDict[i] == word1) {
                for (int j = 0; j < n; j++) {
                    if (wordsDict[j] == word2) {
                        res = Math.Min(res, Math.Abs(i - j));
                    }
                }
            }
        }
        return res;
    }
}
```

```go
func shortestDistance(wordsDict []string, word1 string, word2 string) int {
    n := len(wordsDict)
    res := n
    for i := 0; i < n; i++ {
        if wordsDict[i] == word1 {
            for j := 0; j < n; j++ {
                if wordsDict[j] == word2 {
                    d := i - j
                    if d < 0 {
                        d = -d
                    }
                    res = min(res, d)
                }
            }
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun shortestDistance(wordsDict: Array<String>, word1: String, word2: String): Int {
        val n = wordsDict.size
        var res = n
        for (i in 0 until n) {
            if (wordsDict[i] == word1) {
                for (j in 0 until n) {
                    if (wordsDict[j] == word2) {
                        res = minOf(res, Math.abs(i - j))
                    }
                }
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func shortestDistance(_ wordsDict: [String], _ word1: String, _ word2: String) -> Int {
        let n = wordsDict.count
        var res = n
        for i in 0..<n {
            if wordsDict[i] == word1 {
                for j in 0..<n {
                    if wordsDict[j] == word2 {
                        res = min(res, abs(i - j))
                    }
                }
            }
        }
        return res
    }
}
```

```rust
impl Solution {
    pub fn shortest_distance(words_dict: Vec<String>, word1: String, word2: String) -> i32 {
        let n = words_dict.len();
        let mut res = n as i32;
        for i in 0..n {
            if words_dict[i] == word1 {
                for j in 0..n {
                    if words_dict[j] == word2 {
                        res = res.min((i as i32 - j as i32).abs());
                    }
                }
            }
        }
        res
    }
}
```

```typescript
class Solution {
    /**
     * @param {string[]} wordsDict
     * @param {string} word1
     * @param {string} word2
     * @return {number}
     */
    shortestDistance(wordsDict: string[], word1: string, word2: string): number {
        const n = wordsDict.length;
        let res = n;
        for (let i = 0; i < n; i++) {
            if (wordsDict[i] === word1) {
                for (let j = 0; j < n; j++) {
                    if (wordsDict[j] === word2) {
                        res = Math.min(res, Math.abs(i - j));
                    }
                }
            }
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2 \cdot m)$
- Space complexity: $O(1)$

> Where $n$ is the number of words in $wordsDict$ and $m$ is the maximum length of a word.

---

## 2. Two Pointers

::tabs-start

```python
class Solution:
    def shortestDistance(self, wordsDict: List[str], word1: str, word2: str) -> int:
        idx1, idx2 = [], []
        for i, word in enumerate(wordsDict):
            if word == word1:
                idx1.append(i)
            elif word == word2:
                idx2.append(i)

        res = len(wordsDict)
        i = j = 0
        while i < len(idx1) and j < len(idx2):
            res = min(res, abs(idx1[i] - idx2[j]))
            if idx1[i] < idx2[j]:
                i += 1
            else:
                j += 1
        return res
```

```java
public class Solution {
    public int shortestDistance(String[] wordsDict, String word1, String word2) {
        List<Integer> idx1 = new ArrayList<>();
        List<Integer> idx2 = new ArrayList<>();
        for (int i = 0; i < wordsDict.length; i++) {
            if (wordsDict[i].equals(word1)) {
                idx1.add(i);
            } else if (wordsDict[i].equals(word2)) {
                idx2.add(i);
            }
        }

        int res = wordsDict.length;
        int i = 0, j = 0;
        while (i < idx1.size() && j < idx2.size()) {
            int a = idx1.get(i), b = idx2.get(j);
            res = Math.min(res, Math.abs(a - b));
            if (a < b) {
                i++;
            } else {
                j++;
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int shortestDistance(vector<string>& wordsDict, string word1, string word2) {
        vector<int> idx1, idx2;
        for (int i = 0; i < wordsDict.size(); i++) {
            if (wordsDict[i] == word1) {
                idx1.push_back(i);
            } else if (wordsDict[i] == word2) {
                idx2.push_back(i);
            }
        }

        int res = wordsDict.size();
        int i = 0, j = 0;
        while (i < idx1.size() && j < idx2.size()) {
            res = min(res, abs(idx1[i] - idx2[j]));
            if (idx1[i] < idx2[j]) {
                i++;
            } else {
                j++;
            }
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[]} wordsDict
     * @param {string} word1
     * @param {string} word2
     * @return {number}
     */
    shortestDistance(wordsDict, word1, word2) {
        const idx1 = [];
        const idx2 = [];
        for (let i = 0; i < wordsDict.length; i++) {
            if (wordsDict[i] === word1) {
                idx1.push(i);
            } else if (wordsDict[i] === word2) {
                idx2.push(i);
            }
        }

        let res = wordsDict.length;
        let i = 0,
            j = 0;
        while (i < idx1.length && j < idx2.length) {
            res = Math.min(res, Math.abs(idx1[i] - idx2[j]));
            if (idx1[i] < idx2[j]) {
                i++;
            } else {
                j++;
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int ShortestDistance(string[] wordsDict, string word1, string word2) {
        List<int> idx1 = new List<int>();
        List<int> idx2 = new List<int>();
        for (int k = 0; k < wordsDict.Length; k++) {
            if (wordsDict[k] == word1) {
                idx1.Add(k);
            } else if (wordsDict[k] == word2) {
                idx2.Add(k);
            }
        }

        int res = wordsDict.Length;
        int i = 0, j = 0;
        while (i < idx1.Count && j < idx2.Count) {
            res = Math.Min(res, Math.Abs(idx1[i] - idx2[j]));
            if (idx1[i] < idx2[j]) {
                i++;
            } else {
                j++;
            }
        }
        return res;
    }
}
```

```go
func shortestDistance(wordsDict []string, word1 string, word2 string) int {
    idx1, idx2 := []int{}, []int{}
    for i, word := range wordsDict {
        if word == word1 {
            idx1 = append(idx1, i)
        } else if word == word2 {
            idx2 = append(idx2, i)
        }
    }

    res := len(wordsDict)
    i, j := 0, 0
    for i < len(idx1) && j < len(idx2) {
        d := idx1[i] - idx2[j]
        if d < 0 {
            d = -d
        }
        res = min(res, d)
        if idx1[i] < idx2[j] {
            i++
        } else {
            j++
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun shortestDistance(wordsDict: Array<String>, word1: String, word2: String): Int {
        val idx1 = mutableListOf<Int>()
        val idx2 = mutableListOf<Int>()
        for (k in wordsDict.indices) {
            if (wordsDict[k] == word1) {
                idx1.add(k)
            } else if (wordsDict[k] == word2) {
                idx2.add(k)
            }
        }

        var res = wordsDict.size
        var i = 0
        var j = 0
        while (i < idx1.size && j < idx2.size) {
            res = minOf(res, Math.abs(idx1[i] - idx2[j]))
            if (idx1[i] < idx2[j]) {
                i++
            } else {
                j++
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func shortestDistance(_ wordsDict: [String], _ word1: String, _ word2: String) -> Int {
        var idx1 = [Int]()
        var idx2 = [Int]()
        for (k, word) in wordsDict.enumerated() {
            if word == word1 {
                idx1.append(k)
            } else if word == word2 {
                idx2.append(k)
            }
        }

        var res = wordsDict.count
        var i = 0, j = 0
        while i < idx1.count && j < idx2.count {
            res = min(res, abs(idx1[i] - idx2[j]))
            if idx1[i] < idx2[j] {
                i += 1
            } else {
                j += 1
            }
        }
        return res
    }
}
```

```rust
impl Solution {
    pub fn shortest_distance(words_dict: Vec<String>, word1: String, word2: String) -> i32 {
        let mut idx1 = Vec::new();
        let mut idx2 = Vec::new();
        for (k, word) in words_dict.iter().enumerate() {
            if *word == word1 {
                idx1.push(k as i32);
            } else if *word == word2 {
                idx2.push(k as i32);
            }
        }

        let mut res = words_dict.len() as i32;
        let (mut i, mut j) = (0, 0);
        while i < idx1.len() && j < idx2.len() {
            res = res.min((idx1[i] - idx2[j]).abs());
            if idx1[i] < idx2[j] {
                i += 1;
            } else {
                j += 1;
            }
        }
        res
    }
}
```

```typescript
class Solution {
    /**
     * @param {string[]} wordsDict
     * @param {string} word1
     * @param {string} word2
     * @return {number}
     */
    shortestDistance(wordsDict: string[], word1: string, word2: string): number {
        const idx1: number[] = [];
        const idx2: number[] = [];
        for (let i = 0; i < wordsDict.length; i++) {
            if (wordsDict[i] === word1) {
                idx1.push(i);
            } else if (wordsDict[i] === word2) {
                idx2.push(i);
            }
        }

        let res = wordsDict.length;
        let i = 0,
            j = 0;
        while (i < idx1.length && j < idx2.length) {
            res = Math.min(res, Math.abs(idx1[i] - idx2[j]));
            if (idx1[i] < idx2[j]) {
                i++;
            } else {
                j++;
            }
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \cdot m)$
- Space complexity: $O(n)$

> Where $n$ is the number of words in $wordsDict$ and $m$ is the maximum length of a word.

---

## 3. Iteration - I

::tabs-start

```python
class Solution:
    def shortestDistance(self, wordsDict: List[str], word1: str, word2: str) -> int:
        i1 = i2 = -1
        res = len(wordsDict)
        for i, word in enumerate(wordsDict):
            if word == word1:
                i1 = i
            elif word == word2:
                i2 = i

            if i1 != -1 and i2 != -1:
                res = min(res, abs(i1 - i2))
        return res
```

```java
public class Solution {
    public int shortestDistance(String[] wordsDict, String word1, String word2) {
        int i1 = -1, i2 = -1;
        int res = wordsDict.length;
        for (int i = 0; i < wordsDict.length; i++) {
            if (wordsDict[i].equals(word1)) {
                i1 = i;
            } else if (wordsDict[i].equals(word2)) {
                i2 = i;
            }

            if (i1 != -1 && i2 != -1) {
                res = Math.min(res, Math.abs(i1 - i2));
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int shortestDistance(vector<string>& wordsDict, string word1, string word2) {
        int i1 = -1, i2 = -1;
        int res = wordsDict.size();
        for (int i = 0; i < wordsDict.size(); i++) {
            if (wordsDict[i] == word1) {
                i1 = i;
            } else if (wordsDict[i] == word2) {
                i2 = i;
            }

            if (i1 != -1 && i2 != -1) {
                res = min(res, abs(i1 - i2));
            }
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[]} wordsDict
     * @param {string} word1
     * @param {string} word2
     * @return {number}
     */
    shortestDistance(wordsDict, word1, word2) {
        let i1 = -1,
            i2 = -1;
        let res = wordsDict.length;
        for (let i = 0; i < wordsDict.length; i++) {
            if (wordsDict[i] === word1) {
                i1 = i;
            } else if (wordsDict[i] === word2) {
                i2 = i;
            }

            if (i1 !== -1 && i2 !== -1) {
                res = Math.min(res, Math.abs(i1 - i2));
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int ShortestDistance(string[] wordsDict, string word1, string word2) {
        int i1 = -1, i2 = -1;
        int res = wordsDict.Length;
        for (int i = 0; i < wordsDict.Length; i++) {
            if (wordsDict[i] == word1) {
                i1 = i;
            } else if (wordsDict[i] == word2) {
                i2 = i;
            }

            if (i1 != -1 && i2 != -1) {
                res = Math.Min(res, Math.Abs(i1 - i2));
            }
        }
        return res;
    }
}
```

```go
func shortestDistance(wordsDict []string, word1 string, word2 string) int {
    i1, i2 := -1, -1
    res := len(wordsDict)
    for i, word := range wordsDict {
        if word == word1 {
            i1 = i
        } else if word == word2 {
            i2 = i
        }

        if i1 != -1 && i2 != -1 {
            d := i1 - i2
            if d < 0 {
                d = -d
            }
            res = min(res, d)
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun shortestDistance(wordsDict: Array<String>, word1: String, word2: String): Int {
        var i1 = -1
        var i2 = -1
        var res = wordsDict.size
        for (i in wordsDict.indices) {
            if (wordsDict[i] == word1) {
                i1 = i
            } else if (wordsDict[i] == word2) {
                i2 = i
            }

            if (i1 != -1 && i2 != -1) {
                res = minOf(res, Math.abs(i1 - i2))
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func shortestDistance(_ wordsDict: [String], _ word1: String, _ word2: String) -> Int {
        var i1 = -1, i2 = -1
        var res = wordsDict.count
        for (i, word) in wordsDict.enumerated() {
            if word == word1 {
                i1 = i
            } else if word == word2 {
                i2 = i
            }

            if i1 != -1 && i2 != -1 {
                res = min(res, abs(i1 - i2))
            }
        }
        return res
    }
}
```

```rust
impl Solution {
    pub fn shortest_distance(words_dict: Vec<String>, word1: String, word2: String) -> i32 {
        let (mut i1, mut i2) = (-1i32, -1i32);
        let mut res = words_dict.len() as i32;
        for (i, word) in words_dict.iter().enumerate() {
            if *word == word1 {
                i1 = i as i32;
            } else if *word == word2 {
                i2 = i as i32;
            }

            if i1 != -1 && i2 != -1 {
                res = res.min((i1 - i2).abs());
            }
        }
        res
    }
}
```

```typescript
class Solution {
    /**
     * @param {string[]} wordsDict
     * @param {string} word1
     * @param {string} word2
     * @return {number}
     */
    shortestDistance(wordsDict: string[], word1: string, word2: string): number {
        let i1 = -1,
            i2 = -1;
        let res = wordsDict.length;
        for (let i = 0; i < wordsDict.length; i++) {
            if (wordsDict[i] === word1) {
                i1 = i;
            } else if (wordsDict[i] === word2) {
                i2 = i;
            }

            if (i1 !== -1 && i2 !== -1) {
                res = Math.min(res, Math.abs(i1 - i2));
            }
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \cdot m)$
- Space complexity: $O(1)$

> Where $n$ is the number of words in $wordsDict$ and $m$ is the maximum length of a word.

---

## 4. Iteration - II

::tabs-start

```python
class Solution:
    def shortestDistance(self, wordsDict: List[str], word1: str, word2: str) -> int:
        prev = -1
        res = len(wordsDict)
        for i, word in enumerate(wordsDict):
            if word == word1 or word == word2:
                if prev != -1 and wordsDict[prev] != word:
                    res = min(res, i - prev)
                prev = i
        return res
```

```java
public class Solution {
    public int shortestDistance(String[] wordsDict, String word1, String word2) {
        int prev = -1;
        int res = wordsDict.length;
        for (int i = 0; i < wordsDict.length; i++) {
            if (wordsDict[i].equals(word1) || wordsDict[i].equals(word2)) {
                if (prev != -1 && !wordsDict[prev].equals(wordsDict[i])) {
                    res = Math.min(res, i - prev);
                }
                prev = i;
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int shortestDistance(vector<string>& wordsDict, string word1, string word2) {
        int prev = -1;
        int res = wordsDict.size();
        for (int i = 0; i < wordsDict.size(); i++) {
            if (wordsDict[i] == word1 || wordsDict[i] == word2) {
                if (prev != -1 && wordsDict[prev] != wordsDict[i]) {
                    res = min(res, i - prev);
                }
                prev = i;
            }
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[]} wordsDict
     * @param {string} word1
     * @param {string} word2
     * @return {number}
     */
    shortestDistance(wordsDict, word1, word2) {
        let prev = -1;
        let res = wordsDict.length;
        for (let i = 0; i < wordsDict.length; i++) {
            if (wordsDict[i] === word1 || wordsDict[i] === word2) {
                if (prev !== -1 && wordsDict[prev] !== wordsDict[i]) {
                    res = Math.min(res, i - prev);
                }
                prev = i;
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int ShortestDistance(string[] wordsDict, string word1, string word2) {
        int prev = -1;
        int res = wordsDict.Length;
        for (int i = 0; i < wordsDict.Length; i++) {
            if (wordsDict[i] == word1 || wordsDict[i] == word2) {
                if (prev != -1 && wordsDict[prev] != wordsDict[i]) {
                    res = Math.Min(res, i - prev);
                }
                prev = i;
            }
        }
        return res;
    }
}
```

```go
func shortestDistance(wordsDict []string, word1 string, word2 string) int {
    prev := -1
    res := len(wordsDict)
    for i, word := range wordsDict {
        if word == word1 || word == word2 {
            if prev != -1 && wordsDict[prev] != word {
                res = min(res, i-prev)
            }
            prev = i
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun shortestDistance(wordsDict: Array<String>, word1: String, word2: String): Int {
        var prev = -1
        var res = wordsDict.size
        for (i in wordsDict.indices) {
            if (wordsDict[i] == word1 || wordsDict[i] == word2) {
                if (prev != -1 && wordsDict[prev] != wordsDict[i]) {
                    res = minOf(res, i - prev)
                }
                prev = i
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func shortestDistance(_ wordsDict: [String], _ word1: String, _ word2: String) -> Int {
        var prev = -1
        var res = wordsDict.count
        for (i, word) in wordsDict.enumerated() {
            if word == word1 || word == word2 {
                if prev != -1 && wordsDict[prev] != word {
                    res = min(res, i - prev)
                }
                prev = i
            }
        }
        return res
    }
}
```

```rust
impl Solution {
    pub fn shortest_distance(words_dict: Vec<String>, word1: String, word2: String) -> i32 {
        let mut prev: Option<usize> = None;
        let mut res = words_dict.len();
        for (i, word) in words_dict.iter().enumerate() {
            if *word == word1 || *word == word2 {
                if let Some(p) = prev {
                    if words_dict[p] != *word {
                        res = res.min(i - p);
                    }
                }
                prev = Some(i);
            }
        }
        res as i32
    }
}
```

```typescript
class Solution {
    /**
     * @param {string[]} wordsDict
     * @param {string} word1
     * @param {string} word2
     * @return {number}
     */
    shortestDistance(wordsDict: string[], word1: string, word2: string): number {
        let prev = -1;
        let res = wordsDict.length;
        for (let i = 0; i < wordsDict.length; i++) {
            if (wordsDict[i] === word1 || wordsDict[i] === word2) {
                if (prev !== -1 && wordsDict[prev] !== wordsDict[i]) {
                    res = Math.min(res, i - prev);
                }
                prev = i;
            }
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \cdot m)$
- Space complexity: $O(1)$

> Where $n$ is the number of words in $wordsDict$ and $m$ is the maximum length of a word.
