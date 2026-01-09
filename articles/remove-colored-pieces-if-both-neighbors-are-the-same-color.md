## 1. Brute Force

::tabs-start

```python
class Solution:
    def winnerOfGame(self, colors: str) -> bool:
        s = list(colors)

        def removeChar(c):
            for i in range(1, len(s) - 1):
                if s[i] != c:
                    continue

                if s[i] == s[i + 1] == s[i - 1]:
                    s.pop(i)
                    return True
            return False

        while True:
            if not removeChar('A'):
                return False
            if not removeChar('B'):
                return True

        return False
```

```java
public class Solution {
    public boolean winnerOfGame(String colors) {
        StringBuilder s = new StringBuilder(colors);

        while (true) {
            if (!removeChar(s, 'A')) return false;
            if (!removeChar(s, 'B')) return true;
        }
    }

    private boolean removeChar(StringBuilder s, char c) {
        for (int i = 1; i < s.length() - 1; i++) {
            if (s.charAt(i) != c) continue;

            if (s.charAt(i - 1) == c && s.charAt(i + 1) == c) {
                s.deleteCharAt(i);
                return true;
            }
        }
        return false;
    }
}
```

```cpp
class Solution {
public:
    bool winnerOfGame(string colors) {
        while (true) {
            if (!removeChar(colors, 'A')) return false;
            if (!removeChar(colors, 'B')) return true;
        }
    }

private:
    bool removeChar(string& s, char c) {
        for (int i = 1; i < s.size() - 1; i++) {
            if (s[i] != c) continue;

            if (s[i - 1] == c && s[i + 1] == c) {
                s.erase(i, 1);
                return true;
            }
        }
        return false;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} colors
     * @return {boolean}
     */
    winnerOfGame(colors) {
        let s = colors.split('');

        const removeChar = (c) => {
            for (let i = 1; i < s.length - 1; i++) {
                if (s[i] !== c) continue;

                if (s[i - 1] === c && s[i + 1] === c) {
                    s.splice(i, 1);
                    return true;
                }
            }
            return false;
        };

        while (true) {
            if (!removeChar('A')) return false;
            if (!removeChar('B')) return true;
        }
    }
}
```

```csharp
public class Solution {
    public bool WinnerOfGame(string colors) {
        List<char> s = new List<char>(colors.ToCharArray());

        while (true) {
            if (!RemoveChar(s, 'A')) return false;
            if (!RemoveChar(s, 'B')) return true;
        }
    }

    private bool RemoveChar(List<char> s, char c) {
        for (int i = 1; i < s.Count - 1; i++) {
            if (s[i] != c) continue;

            if (s[i - 1] == c && s[i + 1] == c) {
                s.RemoveAt(i);
                return true;
            }
        }
        return false;
    }
}
```

```go
func winnerOfGame(colors string) bool {
    s := []byte(colors)

    removeChar := func(c byte) bool {
        for i := 1; i < len(s)-1; i++ {
            if s[i] != c {
                continue
            }

            if s[i-1] == c && s[i+1] == c {
                s = append(s[:i], s[i+1:]...)
                return true
            }
        }
        return false
    }

    for {
        if !removeChar('A') {
            return false
        }
        if !removeChar('B') {
            return true
        }
    }
}
```

```kotlin
class Solution {
    fun winnerOfGame(colors: String): Boolean {
        val s = StringBuilder(colors)

        fun removeChar(c: Char): Boolean {
            for (i in 1 until s.length - 1) {
                if (s[i] != c) continue

                if (s[i - 1] == c && s[i + 1] == c) {
                    s.deleteCharAt(i)
                    return true
                }
            }
            return false
        }

        while (true) {
            if (!removeChar('A')) return false
            if (!removeChar('B')) return true
        }
    }
}
```

```swift
class Solution {
    func winnerOfGame(_ colors: String) -> Bool {
        var s = Array(colors)

        func removeChar(_ c: Character) -> Bool {
            for i in 1..<s.count - 1 {
                if s[i] != c { continue }

                if s[i - 1] == c && s[i + 1] == c {
                    s.remove(at: i)
                    return true
                }
            }
            return false
        }

        while true {
            if !removeChar("A") { return false }
            if !removeChar("B") { return true }
        }
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n)$

---

## 2. Greedy + Two Pointers

::tabs-start

```python
class Solution:
    def winnerOfGame(self, colors: str) -> bool:
        alice = bob = l = 0

        for r in range(len(colors)):
            if colors[l] != colors[r]:
                l = r

            extra = r - l - 1
            if extra > 0:
                if colors[l] == 'A':
                    alice += 1
                else:
                    bob += 1

        return alice > bob
```

```java
public class Solution {
    public boolean winnerOfGame(String colors) {
        int alice = 0, bob = 0, l = 0;

        for (int r = 0; r < colors.length(); r++) {
            if (colors.charAt(l) != colors.charAt(r)) {
                l = r;
            }

            int extra = r - l - 1;
            if (extra > 0) {
                if (colors.charAt(l) == 'A') {
                    alice++;
                } else {
                    bob++;
                }
            }
        }

        return alice > bob;
    }
}
```

```cpp
class Solution {
public:
    bool winnerOfGame(string colors) {
        int alice = 0, bob = 0, l = 0;

        for (int r = 0; r < colors.size(); r++) {
            if (colors[l] != colors[r]) {
                l = r;
            }

            int extra = r - l - 1;
            if (extra > 0) {
                if (colors[l] == 'A') {
                    alice++;
                } else {
                    bob++;
                }
            }
        }

        return alice > bob;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} colors
     * @return {boolean}
     */
    winnerOfGame(colors) {
        let alice = 0,
            bob = 0,
            l = 0;

        for (let r = 0; r < colors.length; r++) {
            if (colors[l] !== colors[r]) {
                l = r;
            }

            let extra = r - l - 1;
            if (extra > 0) {
                if (colors[l] === 'A') {
                    alice++;
                } else {
                    bob++;
                }
            }
        }

        return alice > bob;
    }
}
```

```csharp
public class Solution {
    public bool WinnerOfGame(string colors) {
        int alice = 0, bob = 0, l = 0;

        for (int r = 0; r < colors.Length; r++) {
            if (colors[l] != colors[r]) {
                l = r;
            }

            int extra = r - l - 1;
            if (extra > 0) {
                if (colors[l] == 'A') {
                    alice++;
                } else {
                    bob++;
                }
            }
        }

        return alice > bob;
    }
}
```

```go
func winnerOfGame(colors string) bool {
    alice, bob, l := 0, 0, 0

    for r := 0; r < len(colors); r++ {
        if colors[l] != colors[r] {
            l = r
        }

        extra := r - l - 1
        if extra > 0 {
            if colors[l] == 'A' {
                alice++
            } else {
                bob++
            }
        }
    }

    return alice > bob
}
```

```kotlin
class Solution {
    fun winnerOfGame(colors: String): Boolean {
        var alice = 0
        var bob = 0
        var l = 0

        for (r in colors.indices) {
            if (colors[l] != colors[r]) {
                l = r
            }

            val extra = r - l - 1
            if (extra > 0) {
                if (colors[l] == 'A') {
                    alice++
                } else {
                    bob++
                }
            }
        }

        return alice > bob
    }
}
```

```swift
class Solution {
    func winnerOfGame(_ colors: String) -> Bool {
        var alice = 0, bob = 0, l = 0
        let chars = Array(colors)

        for r in 0..<chars.count {
            if chars[l] != chars[r] {
                l = r
            }

            let extra = r - l - 1
            if extra > 0 {
                if chars[l] == "A" {
                    alice += 1
                } else {
                    bob += 1
                }
            }
        }

        return alice > bob
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.

---

## 3. Greedy

::tabs-start

```python
class Solution:
    def winnerOfGame(self, colors: str) -> bool:
        alice, bob = 0, 0

        for i in range(1, len(colors) - 1):
            if colors[i - 1] == colors[i] == colors[i + 1]:
                if colors[i] == 'A':
                    alice += 1
                if colors[i] == 'B':
                    bob += 1

        return alice > bob
```

```java
public class Solution {
    public boolean winnerOfGame(String colors) {
        int alice = 0, bob = 0;

        for (int i = 1; i < colors.length() - 1; i++) {
            if (colors.charAt(i - 1) == colors.charAt(i) &&
                colors.charAt(i) == colors.charAt(i + 1)) {
                if (colors.charAt(i) == 'A') {
                    alice++;
                }
                if (colors.charAt(i) == 'B') {
                    bob++;
                }
            }
        }

        return alice > bob;
    }
}
```

```cpp
class Solution {
public:
    bool winnerOfGame(string colors) {
        int alice = 0, bob = 0;

        for (int i = 1; i < colors.size() - 1; i++) {
            if (colors[i - 1] == colors[i] && colors[i] == colors[i + 1]) {
                if (colors[i] == 'A') {
                    alice++;
                }
                if (colors[i] == 'B') {
                    bob++;
                }
            }
        }

        return alice > bob;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} colors
     * @return {boolean}
     */
    winnerOfGame(colors) {
        let alice = 0,
            bob = 0;

        for (let i = 1; i < colors.length - 1; i++) {
            if (colors[i - 1] === colors[i] && colors[i] === colors[i + 1]) {
                if (colors[i] === 'A') {
                    alice++;
                }
                if (colors[i] === 'B') {
                    bob++;
                }
            }
        }

        return alice > bob;
    }
}
```

```csharp
public class Solution {
    public bool WinnerOfGame(string colors) {
        int alice = 0, bob = 0;

        for (int i = 1; i < colors.Length - 1; i++) {
            if (colors[i - 1] == colors[i] && colors[i] == colors[i + 1]) {
                if (colors[i] == 'A') {
                    alice++;
                }
                if (colors[i] == 'B') {
                    bob++;
                }
            }
        }

        return alice > bob;
    }
}
```

```go
func winnerOfGame(colors string) bool {
    alice, bob := 0, 0

    for i := 1; i < len(colors)-1; i++ {
        if colors[i-1] == colors[i] && colors[i] == colors[i+1] {
            if colors[i] == 'A' {
                alice++
            }
            if colors[i] == 'B' {
                bob++
            }
        }
    }

    return alice > bob
}
```

```kotlin
class Solution {
    fun winnerOfGame(colors: String): Boolean {
        var alice = 0
        var bob = 0

        for (i in 1 until colors.length - 1) {
            if (colors[i - 1] == colors[i] && colors[i] == colors[i + 1]) {
                if (colors[i] == 'A') {
                    alice++
                }
                if (colors[i] == 'B') {
                    bob++
                }
            }
        }

        return alice > bob
    }
}
```

```swift
class Solution {
    func winnerOfGame(_ colors: String) -> Bool {
        var alice = 0, bob = 0
        let chars = Array(colors)

        for i in 1..<chars.count - 1 {
            if chars[i - 1] == chars[i] && chars[i] == chars[i + 1] {
                if chars[i] == "A" {
                    alice += 1
                }
                if chars[i] == "B" {
                    bob += 1
                }
            }
        }

        return alice > bob
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.
