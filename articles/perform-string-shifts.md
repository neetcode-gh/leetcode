## 1. Simulation

::tabs-start

```python
class Solution:
    def stringShift(self, s: str, shift: List[List[int]]) -> str:
        for direction, amount in shift:
            amount %= len(s)
            if direction == 0:
                # Move necessary amount of characters from start to end
                s = s[amount:] + s[:amount]
            else:
                # Move necessary amount of characters from end to start
                s = s[-amount:] + s[:-amount]
        return s
```

```java
class Solution {
    public String stringShift(String s, int[][] shift) {
        int len = s.length();

        for (int[] move : shift) {
            int direction = move[0];
            int amount = move[1] % len;
            if (direction == 0) {
                // Move necessary amount of characters from front to end
                s = s.substring(amount) + s.substring(0, amount);
            } else {
                // Move necessary amount of characters from end to front
                s =
                    s.substring(len - amount) +
                    s.substring(0, len - amount);
            }
        }
        return s;
    }
}
```

```cpp
class Solution {
public:
    string stringShift(string s, vector<vector<int>>& shift) {
        int len = s.length();

        for (auto move : shift) {
            int direction = move[0];
            int amount = move[1] % len;
            if (direction == 0) {
                // Move necessary amount of characters from start to end
                s = s.substr(amount) + s.substr(0, amount);
            } else {
                // Move necessary amount of characters from end to start
                s = s.substr(len - amount) +
                    s.substr(0, len - amount);
            }
        }
        return s;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @param {number[][]} shift
     * @return {string}
     */
    stringShift(s, shift) {
        const len = s.length;

        for (const move of shift) {
            const direction = move[0];
            const amount = move[1] % len;

            if (direction === 0) {
                // Move necessary amount of characters from front to end
                s = s.substring(amount) + s.substring(0, amount);
            } else {
                // Move necessary amount of characters from end to front
                s =
                    s.substring(len - amount) +
                    s.substring(0, len - amount);
            }
        }

        return s;
    }
}
```

```csharp
public class Solution {
    public string StringShift(string s, int[][] shift) {
        int len = s.Length;

        foreach (var move in shift) {
            int direction = move[0];
            int amount = move[1] % len;
            if (direction == 0) {
                // Move necessary amount of characters from front to end
                s = s.Substring(amount) + s.Substring(0, amount);
            } else {
                // Move necessary amount of characters from end to front
                s = s.Substring(len - amount) + s.Substring(0, len - amount);
            }
        }
        return s;
    }
}
```

```go
func stringShift(s string, shift [][]int) string {
    n := len(s)

    for _, move := range shift {
        direction := move[0]
        amount := move[1] % n
        if direction == 0 {
            // Move necessary amount of characters from start to end
            s = s[amount:] + s[:amount]
        } else {
            // Move necessary amount of characters from end to start
            s = s[n-amount:] + s[:n-amount]
        }
    }
    return s
}
```

```kotlin
class Solution {
    fun stringShift(s: String, shift: Array<IntArray>): String {
        var result = s
        val len = s.length

        for (move in shift) {
            val direction = move[0]
            val amount = move[1] % len
            if (direction == 0) {
                // Move necessary amount of characters from start to end
                result = result.substring(amount) + result.substring(0, amount)
            } else {
                // Move necessary amount of characters from end to start
                result = result.substring(len - amount) + result.substring(0, len - amount)
            }
        }
        return result
    }
}
```

```swift
class Solution {
    func stringShift(_ s: String, _ shift: [[Int]]) -> String {
        var str = Array(s)
        let len = str.count

        for move in shift {
            let direction = move[0]
            let amount = move[1] % len
            if direction == 0 {
                // Move necessary amount of characters from start to end
                str = Array(str[amount...]) + Array(str[..<amount])
            } else {
                // Move necessary amount of characters from end to start
                str = Array(str[(len - amount)...]) + Array(str[..<(len - amount)])
            }
        }
        return String(str)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(N * L)$
- Space complexity: $O(L)$ extra space used

>  Where $L$ is the length of the string and $N$ is the length of the `shift` array

---

## 2. Compute Net Shift

::tabs-start

```python
class Solution:
    def stringShift(self, s: str, shift: List[List[int]]) -> str:
        # Count the number of left shifts. A right shift is a negative left shift.
        left_shifts = 0
        for direction, amount in shift:
            if direction == 1:
                amount = -amount
            left_shifts += amount

        # Convert back to a positive, do left shifts, and return.
        left_shifts %= len(s)
        s = s[left_shifts:] + s[:left_shifts]
        return s
```

```java
class Solution {
    public String stringShift(String s, int[][] shift) {
        // Count the number of left shifts. A right shift is a negative left shift.
        int leftShifts = 0;

        for (int[] move : shift) {
            if (move[0] == 1) {
                move[1] = -move[1];
            }
            leftShifts += move[1];
        }

        // Convert back to a positive, do left shifts, and return.
        leftShifts = Math.floorMod(leftShifts, s.length());
        s = s.substring(leftShifts) + s.substring(0, leftShifts);
        return s;
    }
}
```

```cpp
class Solution {
public:
    string stringShift(string s, vector<vector<int>>& shift) {
        // Count the number of left shifts. A right shift is a negative left shift.
        int leftShifts = 0;

        for (auto& move : shift) {
            if (move[0] == 1) {
                move[1] = -move[1];
            }
            leftShifts += move[1];
        }

        // Convert back to a positive, do left shifts, and return.
        int n = s.length();
        leftShifts = ((leftShifts % n) + n) % n;
        s = s.substr(leftShifts) + s.substr(0, leftShifts);
        return s;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @param {number[][]} shift
     * @return {string}
     */
    stringShift(s, shift) {
        // Count the number of left shifts. A right shift is a negative left shift.
        let leftShifts = 0;

        for (let move of shift) {
            if (move[0] === 1) {
                move[1] = -move[1];
            }
            leftShifts += move[1];
        }

        // Convert back to a positive, do left shifts, and return.
        leftShifts = ((leftShifts % s.length) + s.length) % s.length;
        s = s.substring(leftShifts) + s.substring(0, leftShifts);
        return s;
    }
}
```

```csharp
public class Solution {
    public string StringShift(string s, int[][] shift) {
        // Count the number of left shifts. A right shift is a negative left shift.
        int leftShifts = 0;

        foreach (var move in shift) {
            if (move[0] == 1) {
                move[1] = -move[1];
            }
            leftShifts += move[1];
        }

        // Convert back to a positive, do left shifts, and return.
        int n = s.Length;
        leftShifts = ((leftShifts % n) + n) % n;
        s = s.Substring(leftShifts) + s.Substring(0, leftShifts);
        return s;
    }
}
```

```go
func stringShift(s string, shift [][]int) string {
    // Count the number of left shifts. A right shift is a negative left shift.
    leftShifts := 0

    for _, move := range shift {
        if move[0] == 1 {
            move[1] = -move[1]
        }
        leftShifts += move[1]
    }

    // Convert back to a positive, do left shifts, and return.
    n := len(s)
    leftShifts = ((leftShifts % n) + n) % n
    s = s[leftShifts:] + s[:leftShifts]
    return s
}
```

```kotlin
class Solution {
    fun stringShift(s: String, shift: Array<IntArray>): String {
        // Count the number of left shifts. A right shift is a negative left shift.
        var leftShifts = 0

        for (move in shift) {
            if (move[0] == 1) {
                move[1] = -move[1]
            }
            leftShifts += move[1]
        }

        // Convert back to a positive, do left shifts, and return.
        val n = s.length
        leftShifts = ((leftShifts % n) + n) % n
        return s.substring(leftShifts) + s.substring(0, leftShifts)
    }
}
```

```swift
class Solution {
    func stringShift(_ s: String, _ shift: [[Int]]) -> String {
        // Count the number of left shifts. A right shift is a negative left shift.
        var leftShifts = 0

        for move in shift {
            var amount = move[1]
            if move[0] == 1 {
                amount = -amount
            }
            leftShifts += amount
        }

        // Convert back to a positive, do left shifts, and return.
        let n = s.count
        leftShifts = ((leftShifts % n) + n) % n
        let arr = Array(s)
        return String(arr[leftShifts...]) + String(arr[..<leftShifts])
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(N + L)$
- Space complexity: $O(L)$ extra space used

>  Where $L$ is the length of the string and $N$ is the length of the `shift` array
