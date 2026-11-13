## 1. Reverse String

::tabs-start

```python
class Solution:
    def isStrobogrammatic(self, num: str) -> bool:
        rotated = {'0': '0', '1': '1', '6': '9', '8': '8', '9': '6'}
        res = []
        for c in reversed(num):
            if c not in rotated:
                return False
            res.append(rotated[c])
        return "".join(res) == num
```

```java
public class Solution {
    public boolean isStrobogrammatic(String num) {
        Map<Character, Character> rotated = Map.of(
            '0', '0', '1', '1', '6', '9', '8', '8', '9', '6'
        );
        StringBuilder sb = new StringBuilder();
        for (int i = num.length() - 1; i >= 0; i--) {
            char c = num.charAt(i);
            if (!rotated.containsKey(c)) {
                return false;
            }
            sb.append(rotated.get(c));
        }
        return sb.toString().equals(num);
    }
}
```

```cpp
class Solution {
public:
    bool isStrobogrammatic(string num) {
        unordered_map<char, char> rotated = {
            {'0', '0'}, {'1', '1'}, {'6', '9'}, {'8', '8'}, {'9', '6'}
        };
        string res;
        for (int i = num.size() - 1; i >= 0; i--) {
            if (!rotated.count(num[i])) {
                return false;
            }
            res += rotated[num[i]];
        }
        return res == num;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} num
     * @return {boolean}
     */
    isStrobogrammatic(num) {
        const rotated = new Map([
            ['0', '0'], ['1', '1'], ['6', '9'], ['8', '8'], ['9', '6'],
        ]);
        let res = '';
        for (let i = num.length - 1; i >= 0; i--) {
            if (!rotated.has(num[i])) {
                return false;
            }
            res += rotated.get(num[i]);
        }
        return res === num;
    }
}
```

```csharp
public class Solution {
    public bool IsStrobogrammatic(string num) {
        Dictionary<char, char> rotated = new Dictionary<char, char> {
            {'0', '0'}, {'1', '1'}, {'6', '9'}, {'8', '8'}, {'9', '6'}
        };
        int n = num.Length;
        char[] res = new char[n];
        for (int i = n - 1; i >= 0; i--) {
            if (!rotated.ContainsKey(num[i])) {
                return false;
            }
            res[n - 1 - i] = rotated[num[i]];
        }
        return new string(res) == num;
    }
}
```

```go
func isStrobogrammatic(num string) bool {
    rotated := map[byte]byte{'0': '0', '1': '1', '6': '9', '8': '8', '9': '6'}
    n := len(num)
    res := make([]byte, n)
    for i := n - 1; i >= 0; i-- {
        c, ok := rotated[num[i]]
        if !ok {
            return false
        }
        res[n-1-i] = c
    }
    return string(res) == num
}
```

```kotlin
class Solution {
    fun isStrobogrammatic(num: String): Boolean {
        val rotated = mapOf('0' to '0', '1' to '1', '6' to '9', '8' to '8', '9' to '6')
        val sb = StringBuilder()
        for (i in num.length - 1 downTo 0) {
            val c = rotated[num[i]] ?: return false
            sb.append(c)
        }
        return sb.toString() == num
    }
}
```

```swift
class Solution {
    func isStrobogrammatic(_ num: String) -> Bool {
        let rotated: [Character: Character] = [
            "0": "0", "1": "1", "6": "9", "8": "8", "9": "6"
        ]
        var res = ""
        for c in num.reversed() {
            guard let r = rotated[c] else {
                return false
            }
            res.append(r)
        }
        return res == num
    }
}
```

```rust
use std::collections::HashMap;

impl Solution {
    pub fn is_strobogrammatic(num: String) -> bool {
        let rotated = HashMap::from([
            ('0', '0'), ('1', '1'), ('6', '9'), ('8', '8'), ('9', '6'),
        ]);
        let mut res = String::new();
        for c in num.chars().rev() {
            match rotated.get(&c) {
                Some(&r) => res.push(r),
                None => return false,
            }
        }
        res == num
    }
}
```

```typescript
class Solution {
    /**
     * @param {string} num
     * @return {boolean}
     */
    isStrobogrammatic(num: string): boolean {
        const rotated = new Map<string, string>([
            ['0', '0'], ['1', '1'], ['6', '9'], ['8', '8'], ['9', '6'],
        ]);
        let res = '';
        for (let i = num.length - 1; i >= 0; i--) {
            if (!rotated.has(num[i])) {
                return false;
            }
            res += rotated.get(num[i]);
        }
        return res === num;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

> Where $n$ is the length of the string $num$.

---

## 2. Recursion

::tabs-start

```python
class Solution:
    def isStrobogrammatic(self, num: str) -> bool:
        rotated = {'0': '0', '1': '1', '6': '9', '8': '8', '9': '6'}

        def dfs(l, r):
            if l > r:
                return True
            if num[l] not in rotated or rotated[num[l]] != num[r]:
                return False
            return dfs(l + 1, r - 1)

        return dfs(0, len(num) - 1)
```

```java
public class Solution {
    private Map<Character, Character> rotated = Map.of(
        '0', '0', '1', '1', '6', '9', '8', '8', '9', '6'
    );

    public boolean isStrobogrammatic(String num) {
        return dfs(num, 0, num.length() - 1);
    }

    private boolean dfs(String num, int l, int r) {
        if (l > r) {
            return true;
        }
        Character c = rotated.get(num.charAt(l));
        if (c == null || c != num.charAt(r)) {
            return false;
        }
        return dfs(num, l + 1, r - 1);
    }
}
```

```cpp
class Solution {
public:
    bool isStrobogrammatic(string num) {
        return dfs(num, 0, num.size() - 1);
    }

private:
    unordered_map<char, char> rotated = {
        {'0', '0'}, {'1', '1'}, {'6', '9'}, {'8', '8'}, {'9', '6'}
    };

    bool dfs(const string& num, int l, int r) {
        if (l > r) {
            return true;
        }
        auto it = rotated.find(num[l]);
        if (it == rotated.end() || it->second != num[r]) {
            return false;
        }
        return dfs(num, l + 1, r - 1);
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} num
     * @return {boolean}
     */
    isStrobogrammatic(num) {
        const rotated = new Map([
            ['0', '0'], ['1', '1'], ['6', '9'], ['8', '8'], ['9', '6'],
        ]);

        const dfs = (l, r) => {
            if (l > r) {
                return true;
            }
            if (!rotated.has(num[l]) || rotated.get(num[l]) !== num[r]) {
                return false;
            }
            return dfs(l + 1, r - 1);
        };

        return dfs(0, num.length - 1);
    }
}
```

```csharp
public class Solution {
    private Dictionary<char, char> rotated = new Dictionary<char, char> {
        {'0', '0'}, {'1', '1'}, {'6', '9'}, {'8', '8'}, {'9', '6'}
    };

    public bool IsStrobogrammatic(string num) {
        return Dfs(num, 0, num.Length - 1);
    }

    private bool Dfs(string num, int l, int r) {
        if (l > r) {
            return true;
        }
        if (!rotated.TryGetValue(num[l], out char c) || c != num[r]) {
            return false;
        }
        return Dfs(num, l + 1, r - 1);
    }
}
```

```go
func isStrobogrammatic(num string) bool {
    rotated := map[byte]byte{'0': '0', '1': '1', '6': '9', '8': '8', '9': '6'}

    var dfs func(l, r int) bool
    dfs = func(l, r int) bool {
        if l > r {
            return true
        }
        c, ok := rotated[num[l]]
        if !ok || c != num[r] {
            return false
        }
        return dfs(l+1, r-1)
    }

    return dfs(0, len(num)-1)
}
```

```kotlin
class Solution {
    private val rotated = mapOf('0' to '0', '1' to '1', '6' to '9', '8' to '8', '9' to '6')

    fun isStrobogrammatic(num: String): Boolean {
        return dfs(num, 0, num.length - 1)
    }

    private fun dfs(num: String, l: Int, r: Int): Boolean {
        if (l > r) {
            return true
        }
        if (rotated[num[l]] != num[r]) {
            return false
        }
        return dfs(num, l + 1, r - 1)
    }
}
```

```swift
class Solution {
    private let rotated: [Character: Character] = [
        "0": "0", "1": "1", "6": "9", "8": "8", "9": "6"
    ]

    func isStrobogrammatic(_ num: String) -> Bool {
        let chars = Array(num)
        return dfs(chars, 0, chars.count - 1)
    }

    private func dfs(_ chars: [Character], _ l: Int, _ r: Int) -> Bool {
        if l > r {
            return true
        }
        guard let c = rotated[chars[l]], c == chars[r] else {
            return false
        }
        return dfs(chars, l + 1, r - 1)
    }
}
```

```rust
use std::collections::HashMap;

impl Solution {
    pub fn is_strobogrammatic(num: String) -> bool {
        let rotated = HashMap::from([
            ('0', '0'), ('1', '1'), ('6', '9'), ('8', '8'), ('9', '6'),
        ]);
        let chars: Vec<char> = num.chars().collect();
        Self::dfs(&chars, 0, chars.len() as i32 - 1, &rotated)
    }

    fn dfs(chars: &[char], l: i32, r: i32, rotated: &HashMap<char, char>) -> bool {
        if l > r {
            return true;
        }
        match rotated.get(&chars[l as usize]) {
            Some(&c) if c == chars[r as usize] => Self::dfs(chars, l + 1, r - 1, rotated),
            _ => false,
        }
    }
}
```

```typescript
class Solution {
    /**
     * @param {string} num
     * @return {boolean}
     */
    isStrobogrammatic(num: string): boolean {
        const rotated = new Map<string, string>([
            ['0', '0'], ['1', '1'], ['6', '9'], ['8', '8'], ['9', '6'],
        ]);

        const dfs = (l: number, r: number): boolean => {
            if (l > r) {
                return true;
            }
            if (!rotated.has(num[l]) || rotated.get(num[l]) !== num[r]) {
                return false;
            }
            return dfs(l + 1, r - 1);
        };

        return dfs(0, num.length - 1);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$ for the recursion stack.

> Where $n$ is the length of the string $num$.

---

## 3. Two Pointers

::tabs-start

```python
class Solution:
    def isStrobogrammatic(self, num: str) -> bool:
        rotated = {'0': '0', '1': '1', '6': '9', '8': '8', '9': '6'}
        l, r = 0, len(num) - 1
        while l <= r:
            if num[l] not in rotated or rotated[num[l]] != num[r]:
                return False
            l += 1
            r -= 1
        return True
```

```java
public class Solution {
    public boolean isStrobogrammatic(String num) {
        Map<Character, Character> rotated = Map.of(
            '0', '0', '1', '1', '6', '9', '8', '8', '9', '6'
        );
        int l = 0, r = num.length() - 1;
        while (l <= r) {
            Character c = rotated.get(num.charAt(l));
            if (c == null || c != num.charAt(r)) {
                return false;
            }
            l++;
            r--;
        }
        return true;
    }
}
```

```cpp
class Solution {
public:
    bool isStrobogrammatic(string num) {
        unordered_map<char, char> rotated = {
            {'0', '0'}, {'1', '1'}, {'6', '9'}, {'8', '8'}, {'9', '6'}
        };
        int l = 0, r = num.size() - 1;
        while (l <= r) {
            auto it = rotated.find(num[l]);
            if (it == rotated.end() || it->second != num[r]) {
                return false;
            }
            l++;
            r--;
        }
        return true;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} num
     * @return {boolean}
     */
    isStrobogrammatic(num) {
        const rotated = new Map([
            ['0', '0'], ['1', '1'], ['6', '9'], ['8', '8'], ['9', '6'],
        ]);
        let l = 0,
            r = num.length - 1;
        while (l <= r) {
            if (!rotated.has(num[l]) || rotated.get(num[l]) !== num[r]) {
                return false;
            }
            l++;
            r--;
        }
        return true;
    }
}
```

```csharp
public class Solution {
    public bool IsStrobogrammatic(string num) {
        Dictionary<char, char> rotated = new Dictionary<char, char> {
            {'0', '0'}, {'1', '1'}, {'6', '9'}, {'8', '8'}, {'9', '6'}
        };
        int l = 0, r = num.Length - 1;
        while (l <= r) {
            if (!rotated.TryGetValue(num[l], out char c) || c != num[r]) {
                return false;
            }
            l++;
            r--;
        }
        return true;
    }
}
```

```go
func isStrobogrammatic(num string) bool {
    rotated := map[byte]byte{'0': '0', '1': '1', '6': '9', '8': '8', '9': '6'}
    l, r := 0, len(num)-1
    for l <= r {
        c, ok := rotated[num[l]]
        if !ok || c != num[r] {
            return false
        }
        l++
        r--
    }
    return true
}
```

```kotlin
class Solution {
    fun isStrobogrammatic(num: String): Boolean {
        val rotated = mapOf('0' to '0', '1' to '1', '6' to '9', '8' to '8', '9' to '6')
        var l = 0
        var r = num.length - 1
        while (l <= r) {
            if (rotated[num[l]] != num[r]) {
                return false
            }
            l++
            r--
        }
        return true
    }
}
```

```swift
class Solution {
    func isStrobogrammatic(_ num: String) -> Bool {
        let rotated: [Character: Character] = [
            "0": "0", "1": "1", "6": "9", "8": "8", "9": "6"
        ]
        let chars = Array(num)
        var l = 0, r = chars.count - 1
        while l <= r {
            guard let c = rotated[chars[l]], c == chars[r] else {
                return false
            }
            l += 1
            r -= 1
        }
        return true
    }
}
```

```rust
use std::collections::HashMap;

impl Solution {
    pub fn is_strobogrammatic(num: String) -> bool {
        let rotated = HashMap::from([
            ('0', '0'), ('1', '1'), ('6', '9'), ('8', '8'), ('9', '6'),
        ]);
        let chars: Vec<char> = num.chars().collect();
        let n = chars.len();
        for l in 0..(n + 1) / 2 {
            let r = n - 1 - l;
            match rotated.get(&chars[l]) {
                Some(&c) if c == chars[r] => {}
                _ => return false,
            }
        }
        true
    }
}
```

```typescript
class Solution {
    /**
     * @param {string} num
     * @return {boolean}
     */
    isStrobogrammatic(num: string): boolean {
        const rotated = new Map<string, string>([
            ['0', '0'], ['1', '1'], ['6', '9'], ['8', '8'], ['9', '6'],
        ]);
        let l = 0,
            r = num.length - 1;
        while (l <= r) {
            if (!rotated.has(num[l]) || rotated.get(num[l]) !== num[r]) {
                return false;
            }
            l++;
            r--;
        }
        return true;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$

> Where $n$ is the length of the string $num$.
