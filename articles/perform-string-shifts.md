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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(N + L)$
- Space complexity: $O(L)$ extra space used

>  Where $L$ is the length of the string and $N$ is the length of the `shift` array
