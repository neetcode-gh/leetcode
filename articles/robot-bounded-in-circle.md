## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Simulation** - Executing step-by-step instructions to track state changes
- **2D Coordinate Systems** - Working with x, y positions and direction vectors
- **Direction Vectors** - Representing and rotating directions (90-degree turns)
- **Mathematical Reasoning** - Understanding why a cycle forms based on final direction

---

## 1. Simulation

### Intuition

A robot executing the same instructions repeatedly will be bounded in a circle if and only if one of two conditions holds after one cycle: either it returns to the origin, or it is not facing north. If the robot returns to the origin, it will clearly repeat that pattern forever. If it ends up facing a different direction, the displacement vector will rotate with each cycle. After at most 4 cycles (for 90 degree turns) or 2 cycles (for 180 degree turns), the displacements cancel out and the robot returns to the origin.

### Algorithm

1. Initialize direction as north with `(dirX, dirY) = (0, 1)` and position as `(x, y) = (0, 0)`.
2. Process each instruction in the string:
   - `G`: Move forward by adding direction to position.
   - `L`: Rotate left 90 degrees by setting `(dirX, dirY) = (-dirY, dirX)`.
   - `R`: Rotate right 90 degrees by setting `(dirX, dirY) = (dirY, -dirX)`.
3. After processing all instructions, check if bounded:
   - Return `true` if position is `(0, 0)` (back at origin).
   - Return `true` if direction is not `(0, 1)` (not facing north).
   - Otherwise return `false`.

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

---

## Common Pitfalls

### Simulating Multiple Cycles Unnecessarily

A common mistake is thinking you need to simulate 4 complete cycles of instructions to check if the robot returns to the origin. The key insight is that you only need one cycle: if the robot is not facing north after one cycle, it will eventually return to the origin regardless of its position.

### Incorrect Direction Rotation Logic

Mixing up left and right rotations is a frequent error. For a left turn, the new direction is `(-dirY, dirX)`, and for a right turn, it is `(dirY, -dirX)`. Swapping these formulas or making sign errors will cause incorrect position tracking.

### Misunderstanding the Bounded Condition

The robot is bounded if it returns to the origin OR if it is not facing north after one cycle. Some solutions incorrectly require both conditions, or only check if the robot returns to the origin, missing cases where the robot faces a different direction and will eventually cycle back.
