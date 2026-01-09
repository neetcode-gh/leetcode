## 1. Simulation

::tabs-start

```python
class Solution:
    def isRobotBounded(self, instructions: str) -> bool:
        dirX, dirY = 0, 1
        x, y = 0, 0

        for d in instructions:
            if d == "G":
                x, y = x + dirX, y + dirY
            elif d == "L":
                dirX, dirY = -dirY, dirX
            else:
                dirX, dirY = dirY, -dirX

        return (x, y) == (0, 0) or (dirX, dirY) != (0, 1)
```

```java
public class Solution {
    public boolean isRobotBounded(String instructions) {
        int dirX = 0, dirY = 1;
        int x = 0, y = 0;

        for (int i = 0; i < instructions.length(); i++) {
            char d = instructions.charAt(i);
            if (d == 'G') {
                x += dirX;
                y += dirY;
            } else if (d == 'L') {
                int temp = dirX;
                dirX = -dirY;
                dirY = temp;
            } else {
                int temp = dirX;
                dirX = dirY;
                dirY = -temp;
            }
        }

        return (x == 0 && y == 0) || (dirX != 0 || dirY != 1);
    }
}
```

```cpp
class Solution {
public:
    bool isRobotBounded(string instructions) {
        int dirX = 0, dirY = 1;
        int x = 0, y = 0;

        for (char d : instructions) {
            if (d == 'G') {
                x += dirX;
                y += dirY;
            } else if (d == 'L') {
                int temp = dirX;
                dirX = -dirY;
                dirY = temp;
            } else {
                int temp = dirX;
                dirX = dirY;
                dirY = -temp;
            }
        }

        return (x == 0 && y == 0) || (dirX != 0 || dirY != 1);
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} instructions
     * @return {boolean}
     */
    isRobotBounded(instructions) {
        let dirX = 0,
            dirY = 1;
        let x = 0,
            y = 0;

        for (const d of instructions) {
            if (d === 'G') {
                x += dirX;
                y += dirY;
            } else if (d === 'L') {
                [dirX, dirY] = [-dirY, dirX];
            } else {
                [dirX, dirY] = [dirY, -dirX];
            }
        }

        return (x === 0 && y === 0) || dirX !== 0 || dirY !== 1;
    }
}
```

```csharp
public class Solution {
    public bool IsRobotBounded(string instructions) {
        int dirX = 0, dirY = 1;
        int x = 0, y = 0;

        foreach (char d in instructions) {
            if (d == 'G') {
                x += dirX;
                y += dirY;
            } else if (d == 'L') {
                int temp = dirX;
                dirX = -dirY;
                dirY = temp;
            } else {
                int temp = dirX;
                dirX = dirY;
                dirY = -temp;
            }
        }

        return (x == 0 && y == 0) || (dirX != 0 || dirY != 1);
    }
}
```

```go
func isRobotBounded(instructions string) bool {
    dirX, dirY := 0, 1
    x, y := 0, 0

    for _, d := range instructions {
        if d == 'G' {
            x += dirX
            y += dirY
        } else if d == 'L' {
            dirX, dirY = -dirY, dirX
        } else {
            dirX, dirY = dirY, -dirX
        }
    }

    return (x == 0 && y == 0) || (dirX != 0 || dirY != 1)
}
```

```kotlin
class Solution {
    fun isRobotBounded(instructions: String): Boolean {
        var dirX = 0
        var dirY = 1
        var x = 0
        var y = 0

        for (d in instructions) {
            if (d == 'G') {
                x += dirX
                y += dirY
            } else if (d == 'L') {
                val temp = dirX
                dirX = -dirY
                dirY = temp
            } else {
                val temp = dirX
                dirX = dirY
                dirY = -temp
            }
        }

        return (x == 0 && y == 0) || (dirX != 0 || dirY != 1)
    }
}
```

```swift
class Solution {
    func isRobotBounded(_ instructions: String) -> Bool {
        var dirX = 0, dirY = 1
        var x = 0, y = 0

        for d in instructions {
            if d == "G" {
                x += dirX
                y += dirY
            } else if d == "L" {
                let temp = dirX
                dirX = -dirY
                dirY = temp
            } else {
                let temp = dirX
                dirX = dirY
                dirY = -temp
            }
        }

        return (x == 0 && y == 0) || (dirX != 0 || dirY != 1)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.
