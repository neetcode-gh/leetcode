## Prerequisites
Before attempting this problem, you should be comfortable with:
- **String Manipulation** - Iterating through strings and checking character patterns
- **Two Pointers** - Using pointers to track consecutive runs of characters
- **Greedy Algorithms** - Making locally optimal choices to find the global optimum
- **Game Theory Basics** - Understanding turn-based games and win conditions

---

## 1. Brute Force

### Intuition

We simulate the game turn by turn. Alice looks for a piece 'A' surrounded by two other 'A's and removes it. Then Bob does the same for 'B'. If a player cannot make a move on their turn, they lose. This straightforward simulation mirrors the actual gameplay but is slow because we repeatedly scan and modify the string.

### Algorithm

1. Convert the string to a mutable list.
2. Alternate turns between Alice (`'A'`) and Bob (`'B'`).
3. On each turn, scan for a removable piece (one that has the same color on both sides).
4. If found, remove it and continue. If not found, the current player loses.
5. Alice wins if Bob cannot move; Bob wins if Alice cannot move.

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

### Intuition

The key insight is that each player's moves are independent. Removing an 'A' from a sequence of A's doesn't affect Bob's sequences of B's, and vice versa. So instead of simulating the game, we can count how many moves each player has available. For a run of consecutive same-colored pieces of length `k`, a player can remove `k - 2` pieces (since they need neighbors on both sides). Alice wins if she has more moves than Bob.

### Algorithm

1. Use two pointers to track consecutive runs of the same color.
2. For each position, calculate how many "extra" pieces exist beyond the first two in the current run.
3. Add these extras to Alice's count if the color is `'A'`, or Bob's count if `'B'`.
4. Return `true` if Alice has more moves than Bob.

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

### Intuition

This is a cleaner way to count available moves. For each position in the middle of the string, we check if it forms a "triplet" of same-colored pieces. Each such triplet represents one potential move for that player. Since removing a piece from a longer run still leaves valid triplets, we simply count all triplet centers for each player.

### Algorithm

1. Initialize counters for Alice and Bob.
2. Iterate through positions `1` to `n-2` (excluding endpoints).
3. At each position, check if the current piece matches both its neighbors.
4. If so, increment Alice's counter for `'A'` or Bob's counter for `'B'`.
5. Return `true` if Alice's count exceeds Bob's count.

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

---

## Common Pitfalls

### Simulating the Game Turn by Turn

A common mistake is to simulate the actual game by removing pieces one at a time and alternating turns. This leads to O(n^2) time complexity because each removal requires scanning and modifying the string. The key insight is that removing an 'A' from a sequence of A's doesn't affect Bob's available moves on B sequences, and vice versa. Instead of simulating, simply count the available moves for each player upfront.

### Miscounting Available Moves

When counting moves, remember that a player can only remove a piece if it has neighbors of the same color on both sides. For a run of k consecutive same-colored pieces, the number of removable pieces is k - 2 (not k or k - 1). A run of length 1 or 2 gives zero moves. Some solutions incorrectly count individual pieces or forget to subtract 2 for the boundary pieces that cannot be removed.

### Using the Wrong Win Condition

The problem asks if Alice wins, and Alice moves first. Some solutions return `alice >= bob` instead of `alice > bob`. Since Alice needs strictly more moves than Bob to win (she goes first, so if they have equal moves, Bob makes the last move and Alice loses), the correct condition is `alice > bob`.
