## 1. Built-In Function

::tabs-start

```python
class Solution:
    def generatePossibleNextMoves(self, currentState: str) -> List[str]:
        res = []
        i = currentState.find("++")
        while i != -1:
            res.append(currentState[:i] + "--" + currentState[i + 2:])
            i = currentState.find("++", i + 1)
        return res
```

```java
public class Solution {
    public List<String> generatePossibleNextMoves(String currentState) {
        List<String> res = new ArrayList<>();
        int i = currentState.indexOf("++");
        while (i != -1) {
            res.add(currentState.substring(0, i) + "--" + currentState.substring(i + 2));
            i = currentState.indexOf("++", i + 1);
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<string> generatePossibleNextMoves(string currentState) {
        vector<string> res;
        size_t i = currentState.find("++");
        while (i != string::npos) {
            res.push_back(currentState.substr(0, i) + "--" + currentState.substr(i + 2));
            i = currentState.find("++", i + 1);
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} currentState
     * @return {string[]}
     */
    generatePossibleNextMoves(currentState) {
        const res = [];
        let i = currentState.indexOf('++');
        while (i !== -1) {
            res.push(currentState.slice(0, i) + '--' + currentState.slice(i + 2));
            i = currentState.indexOf('++', i + 1);
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public IList<string> GeneratePossibleNextMoves(string currentState) {
        var res = new List<string>();
        int i = currentState.IndexOf("++");
        while (i != -1) {
            res.Add(currentState.Substring(0, i) + "--" + currentState.Substring(i + 2));
            i = currentState.IndexOf("++", i + 1);
        }
        return res;
    }
}
```

```go
func generatePossibleNextMoves(currentState string) []string {
    res := []string{}
    start := 0
    for {
        j := strings.Index(currentState[start:], "++")
        if j == -1 {
            break
        }
        i := start + j
        res = append(res, currentState[:i]+"--"+currentState[i+2:])
        start = i + 1
    }
    return res
}
```

```kotlin
class Solution {
    fun generatePossibleNextMoves(currentState: String): List<String> {
        val res = mutableListOf<String>()
        var i = currentState.indexOf("++")
        while (i != -1) {
            res.add(currentState.substring(0, i) + "--" + currentState.substring(i + 2))
            i = currentState.indexOf("++", i + 1)
        }
        return res
    }
}
```

```swift
class Solution {
    func generatePossibleNextMoves(_ currentState: String) -> [String] {
        var res = [String]()
        var start = currentState.startIndex
        while let r = currentState.range(of: "++", range: start..<currentState.endIndex) {
            res.append(currentState.replacingCharacters(in: r, with: "--"))
            start = currentState.index(after: r.lowerBound)
        }
        return res
    }
}
```

```rust
impl Solution {
    pub fn generate_possible_next_moves(current_state: String) -> Vec<String> {
        let mut res = Vec::new();
        let mut start = 0;
        while let Some(j) = current_state[start..].find("++") {
            let i = start + j;
            res.push(format!("{}--{}", &current_state[..i], &current_state[i + 2..]));
            start = i + 1;
        }
        res
    }
}
```

```typescript
class Solution {
    /**
     * @param {string} currentState
     * @return {string[]}
     */
    generatePossibleNextMoves(currentState: string): string[] {
        const res: string[] = [];
        let i = currentState.indexOf('++');
        while (i !== -1) {
            res.push(currentState.slice(0, i) + '--' + currentState.slice(i + 2));
            i = currentState.indexOf('++', i + 1);
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity:
    - $O(1)$ extra space.
    - $O(n ^ 2)$ space for the output list.

> Where $n$ is the length of the string $currentState$.

---

## 2. Iteration

::tabs-start

```python
class Solution:
    def generatePossibleNextMoves(self, currentState: str) -> List[str]:
        res = []
        for i in range(len(currentState) - 1):
            if currentState[i] == "+" and currentState[i + 1] == "+":
                res.append(currentState[:i] + "--" + currentState[i + 2:])
        return res
```

```java
public class Solution {
    public List<String> generatePossibleNextMoves(String currentState) {
        List<String> res = new ArrayList<>();
        int n = currentState.length();
        for (int i = 0; i < n - 1; i++) {
            if (currentState.charAt(i) == '+' && currentState.charAt(i + 1) == '+') {
                res.add(currentState.substring(0, i) + "--" + currentState.substring(i + 2));
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<string> generatePossibleNextMoves(string currentState) {
        vector<string> res;
        int n = currentState.size();
        for (int i = 0; i < n - 1; i++) {
            if (currentState[i] == '+' && currentState[i + 1] == '+') {
                res.push_back(currentState.substr(0, i) + "--" + currentState.substr(i + 2));
            }
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} currentState
     * @return {string[]}
     */
    generatePossibleNextMoves(currentState) {
        const res = [];
        const n = currentState.length;
        for (let i = 0; i < n - 1; i++) {
            if (currentState[i] === '+' && currentState[i + 1] === '+') {
                res.push(currentState.slice(0, i) + '--' + currentState.slice(i + 2));
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public IList<string> GeneratePossibleNextMoves(string currentState) {
        var res = new List<string>();
        int n = currentState.Length;
        for (int i = 0; i < n - 1; i++) {
            if (currentState[i] == '+' && currentState[i + 1] == '+') {
                res.Add(currentState.Substring(0, i) + "--" + currentState.Substring(i + 2));
            }
        }
        return res;
    }
}
```

```go
func generatePossibleNextMoves(currentState string) []string {
    res := []string{}
    n := len(currentState)
    for i := 0; i < n-1; i++ {
        if currentState[i] == '+' && currentState[i+1] == '+' {
            res = append(res, currentState[:i]+"--"+currentState[i+2:])
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun generatePossibleNextMoves(currentState: String): List<String> {
        val res = mutableListOf<String>()
        val n = currentState.length
        for (i in 0 until n - 1) {
            if (currentState[i] == '+' && currentState[i + 1] == '+') {
                res.add(currentState.substring(0, i) + "--" + currentState.substring(i + 2))
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func generatePossibleNextMoves(_ currentState: String) -> [String] {
        let chars = Array(currentState)
        let n = chars.count
        var res = [String]()
        for i in 0..<n - 1 {
            if chars[i] == "+" && chars[i + 1] == "+" {
                res.append(String(chars[0..<i]) + "--" + String(chars[(i + 2)...]))
            }
        }
        return res
    }
}
```

```rust
impl Solution {
    pub fn generate_possible_next_moves(current_state: String) -> Vec<String> {
        let s = current_state.as_bytes();
        let n = s.len();
        let mut res = Vec::new();
        for i in 0..n - 1 {
            if s[i] == b'+' && s[i + 1] == b'+' {
                res.push(format!("{}--{}", &current_state[..i], &current_state[i + 2..]));
            }
        }
        res
    }
}
```

```typescript
class Solution {
    /**
     * @param {string} currentState
     * @return {string[]}
     */
    generatePossibleNextMoves(currentState: string): string[] {
        const res: string[] = [];
        const n = currentState.length;
        for (let i = 0; i < n - 1; i++) {
            if (currentState[i] === '+' && currentState[i + 1] === '+') {
                res.push(currentState.slice(0, i) + '--' + currentState.slice(i + 2));
            }
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity:
    - $O(1)$ extra space.
    - $O(n ^ 2)$ space for the output list.

> Where $n$ is the length of the string $currentState$.

---

## 3. Simulation

::tabs-start

```python
class Solution:
    def generatePossibleNextMoves(self, currentState: str) -> List[str]:
        chars = list(currentState)
        res = []
        for i in range(len(chars) - 1):
            if chars[i] == "+" and chars[i + 1] == "+":
                chars[i] = chars[i + 1] = "-"
                res.append("".join(chars))
                chars[i] = chars[i + 1] = "+"
        return res
```

```java
public class Solution {
    public List<String> generatePossibleNextMoves(String currentState) {
        char[] chars = currentState.toCharArray();
        List<String> res = new ArrayList<>();
        for (int i = 0; i < chars.length - 1; i++) {
            if (chars[i] == '+' && chars[i + 1] == '+') {
                chars[i] = chars[i + 1] = '-';
                res.add(new String(chars));
                chars[i] = chars[i + 1] = '+';
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<string> generatePossibleNextMoves(string currentState) {
        vector<string> res;
        int n = currentState.size();
        for (int i = 0; i < n - 1; i++) {
            if (currentState[i] == '+' && currentState[i + 1] == '+') {
                currentState[i] = currentState[i + 1] = '-';
                res.push_back(currentState);
                currentState[i] = currentState[i + 1] = '+';
            }
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} currentState
     * @return {string[]}
     */
    generatePossibleNextMoves(currentState) {
        const chars = currentState.split('');
        const res = [];
        for (let i = 0; i < chars.length - 1; i++) {
            if (chars[i] === '+' && chars[i + 1] === '+') {
                chars[i] = chars[i + 1] = '-';
                res.push(chars.join(''));
                chars[i] = chars[i + 1] = '+';
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public IList<string> GeneratePossibleNextMoves(string currentState) {
        char[] chars = currentState.ToCharArray();
        var res = new List<string>();
        for (int i = 0; i < chars.Length - 1; i++) {
            if (chars[i] == '+' && chars[i + 1] == '+') {
                chars[i] = chars[i + 1] = '-';
                res.Add(new string(chars));
                chars[i] = chars[i + 1] = '+';
            }
        }
        return res;
    }
}
```

```go
func generatePossibleNextMoves(currentState string) []string {
    chars := []byte(currentState)
    res := []string{}
    for i := 0; i < len(chars)-1; i++ {
        if chars[i] == '+' && chars[i+1] == '+' {
            chars[i], chars[i+1] = '-', '-'
            res = append(res, string(chars))
            chars[i], chars[i+1] = '+', '+'
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun generatePossibleNextMoves(currentState: String): List<String> {
        val chars = currentState.toCharArray()
        val res = mutableListOf<String>()
        for (i in 0 until chars.size - 1) {
            if (chars[i] == '+' && chars[i + 1] == '+') {
                chars[i] = '-'
                chars[i + 1] = '-'
                res.add(String(chars))
                chars[i] = '+'
                chars[i + 1] = '+'
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func generatePossibleNextMoves(_ currentState: String) -> [String] {
        var chars = Array(currentState)
        var res = [String]()
        for i in 0..<chars.count - 1 {
            if chars[i] == "+" && chars[i + 1] == "+" {
                chars[i] = "-"
                chars[i + 1] = "-"
                res.append(String(chars))
                chars[i] = "+"
                chars[i + 1] = "+"
            }
        }
        return res
    }
}
```

```rust
impl Solution {
    pub fn generate_possible_next_moves(current_state: String) -> Vec<String> {
        let mut chars = current_state.into_bytes();
        let mut res = Vec::new();
        for i in 0..chars.len() - 1 {
            if chars[i] == b'+' && chars[i + 1] == b'+' {
                chars[i] = b'-';
                chars[i + 1] = b'-';
                res.push(String::from_utf8(chars.clone()).unwrap());
                chars[i] = b'+';
                chars[i + 1] = b'+';
            }
        }
        res
    }
}
```

```typescript
class Solution {
    /**
     * @param {string} currentState
     * @return {string[]}
     */
    generatePossibleNextMoves(currentState: string): string[] {
        const chars = currentState.split('');
        const res: string[] = [];
        for (let i = 0; i < chars.length - 1; i++) {
            if (chars[i] === '+' && chars[i + 1] === '+') {
                chars[i] = chars[i + 1] = '-';
                res.push(chars.join(''));
                chars[i] = chars[i + 1] = '+';
            }
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity:
    - $O(n)$ extra space for the character array.
    - $O(n ^ 2)$ space for the output list.

> Where $n$ is the length of the string $currentState$.
