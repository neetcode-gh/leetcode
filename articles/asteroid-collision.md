## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Stack Data Structure** - Understanding LIFO (Last In, First Out) operations: push, pop, peek
- **Array Iteration** - Processing elements sequentially from left to right
- **Simulation Problems** - Modeling real-world processes step by step in code
- **Conditional Logic** - Handling multiple cases based on element comparisons (direction and size)

---

## 1. Stack

### Intuition

Collisions only happen when a right-moving asteroid (positive) meets a left-moving one (negative). A stack naturally models this: we process asteroids left to right, and when we see a negative asteroid, it can only collide with positive asteroids already on the stack. We keep popping and comparing until either the new asteroid is destroyed, destroys all opposing asteroids, or there are no more collisions possible.

### Algorithm

1. Initialize an empty stack.
2. For each asteroid, if it's positive or the stack is empty or the top is negative, push it.
3. If the asteroid is negative and the top is positive, compare sizes:
   - If the top is smaller, pop it and continue checking.
   - If they're equal, pop the top and discard the current asteroid.
   - If the top is larger, discard the current asteroid.
4. After processing all asteroids, the stack contains the survivors.

::tabs-start

```python
class Solution:
    def asteroidCollision(self, asteroids: List[int]) -> List[int]:
        stack = []
        for a in asteroids:
            while stack and a < 0 and stack[-1] > 0:
                diff = a + stack[-1]
                if diff < 0:
                    stack.pop()
                elif diff > 0:
                    a = 0
                else:
                    a = 0
                    stack.pop()
            if a:
                stack.append(a)
        return stack
```

```java
public class Solution {
    public int[] asteroidCollision(int[] asteroids) {
        Stack<Integer> stack = new Stack<>();
        for (int a : asteroids) {
            while (!stack.isEmpty() && a < 0 && stack.peek() > 0) {
                int diff = a + stack.peek();
                if (diff < 0) {
                    stack.pop();
                } else if (diff > 0) {
                    a = 0;
                } else {
                    a = 0;
                    stack.pop();
                }
            }
            if (a != 0) {
                stack.add(a);
            }
        }
        return stack.stream().mapToInt(i -> i).toArray();
    }
}
```

```cpp
class Solution {
public:
    vector<int> asteroidCollision(vector<int>& asteroids) {
        vector<int> stack;
        for (int& a : asteroids) {
            while (!stack.empty() && a < 0 && stack.back() > 0) {
                int diff = a + stack.back();
                if (diff < 0) {
                    stack.pop_back();
                } else if (diff > 0) {
                    a = 0;
                } else {
                    a = 0;
                    stack.pop_back();
                }
            }
            if (a != 0) {
                stack.push_back(a);
            }
        }
        return stack;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} asteroids
     * @return {number[]}
     */
    asteroidCollision(asteroids) {
        const stack = [];
        for (let a of asteroids) {
            while (stack.length && a < 0 && stack[stack.length - 1] > 0) {
                const diff = a + stack[stack.length - 1];
                if (diff < 0) {
                    stack.pop();
                } else if (diff > 0) {
                    a = 0;
                } else {
                    a = 0;
                    stack.pop();
                }
            }
            if (a !== 0) {
                stack.push(a);
            }
        }
        return stack;
    }
}
```

```csharp
public class Solution {
    public int[] AsteroidCollision(int[] asteroids) {
        Stack<int> stack = new Stack<int>();

        foreach (int a in asteroids) {
            int current = a;
            while (stack.Count > 0 && current < 0 && stack.Peek() > 0) {
                int diff = current + stack.Peek();
                if (diff < 0) {
                    stack.Pop();
                } else if (diff > 0) {
                    current = 0;
                } else {
                    current = 0;
                    stack.Pop();
                }
            }
            if (current != 0) {
                stack.Push(current);
            }
        }

        int[] result = stack.Reverse().ToArray();
        return result;
    }
}
```

```go
func asteroidCollision(asteroids []int) []int {
    stack := []int{}
    for _, a := range asteroids {
        for len(stack) > 0 && a < 0 && stack[len(stack)-1] > 0 {
            diff := a + stack[len(stack)-1]
            if diff < 0 {
                stack = stack[:len(stack)-1]
            } else if diff > 0 {
                a = 0
            } else {
                a = 0
                stack = stack[:len(stack)-1]
            }
        }
        if a != 0 {
            stack = append(stack, a)
        }
    }
    return stack
}
```

```kotlin
class Solution {
    fun asteroidCollision(asteroids: IntArray): IntArray {
        val stack = mutableListOf<Int>()
        for (a in asteroids) {
            var curr = a
            while (stack.isNotEmpty() && curr < 0 && stack.last() > 0) {
                val diff = curr + stack.last()
                if (diff < 0) {
                    stack.removeAt(stack.size - 1)
                } else if (diff > 0) {
                    curr = 0
                } else {
                    curr = 0
                    stack.removeAt(stack.size - 1)
                }
            }
            if (curr != 0) {
                stack.add(curr)
            }
        }
        return stack.toIntArray()
    }
}
```

```swift
class Solution {
    func asteroidCollision(_ asteroids: [Int]) -> [Int] {
        var stack = [Int]()
        for var a in asteroids {
            while !stack.isEmpty && a < 0 && stack.last! > 0 {
                let diff = a + stack.last!
                if diff < 0 {
                    stack.removeLast()
                } else if diff > 0 {
                    a = 0
                } else {
                    a = 0
                    stack.removeLast()
                }
            }
            if a != 0 {
                stack.append(a)
            }
        }
        return stack
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 2. Without Stack

### Intuition

We can simulate the stack behavior using the input array itself. We maintain a pointer `j` that tracks the "top" of our virtual stack within the array. When collisions occur, we decrement `j` (like popping). Surviving asteroids are written to position `j + 1`. This gives us O(1) extra space while maintaining the same logic.

### Algorithm

1. Use pointer `j = -1` to represent an empty stack.
2. For each asteroid, handle collisions by comparing with `asteroids[j]` when both are in opposite directions.
3. If the current asteroid survives, increment `j` and store it at `asteroids[j]`.
4. If destroyed, skip storing it.
5. Return the subarray from index `0` to `j` (inclusive).

::tabs-start

```python
class Solution:
    def asteroidCollision(self, asteroids: List[int]) -> List[int]:
        n = len(asteroids)
        j = -1

        for a in asteroids:
            while j >= 0 and asteroids[j] > 0 and a < 0:
                if asteroids[j] > abs(a):
                    a = 0
                    break
                elif asteroids[j] == abs(a):
                    j -= 1
                    a = 0
                    break
                else:
                    j -= 1
            if a:
                j += 1
                asteroids[j] = a

        return asteroids[:j + 1]
```

```java
public class Solution {
    public int[] asteroidCollision(int[] asteroids) {
        int n = asteroids.length;
        int j = -1;

        for (int a : asteroids) {
            while (j >= 0 && asteroids[j] > 0 && a < 0) {
                if (asteroids[j] > Math.abs(a)) {
                    a = 0;
                    break;
                } else if (asteroids[j] == Math.abs(a)) {
                    j--;
                    a = 0;
                    break;
                } else {
                    j--;
                }
            }
            if (a != 0) {
                asteroids[++j] = a;
            }
        }

        return Arrays.copyOfRange(asteroids, 0, j + 1);
    }
}
```

```cpp
class Solution {
public:
    vector<int> asteroidCollision(vector<int>& asteroids) {
        int n = asteroids.size();
        int j = -1;

        for (int& a : asteroids) {
            while (j >= 0 && asteroids[j] > 0 && a < 0) {
                if (asteroids[j] > abs(a)) {
                    a = 0;
                    break;
                } else if (asteroids[j] == abs(a)) {
                    j--;
                    a = 0;
                    break;
                } else {
                    j--;
                }
            }
            if (a != 0) {
                asteroids[++j] = a;
            }
        }

        asteroids.resize(j + 1);
        return asteroids;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} asteroids
     * @return {number[]}
     */
    asteroidCollision(asteroids) {
        let n = asteroids.length;
        let j = -1;

        for (let a of asteroids) {
            while (j >= 0 && asteroids[j] > 0 && a < 0) {
                if (asteroids[j] > Math.abs(a)) {
                    a = 0;
                    break;
                } else if (asteroids[j] === Math.abs(a)) {
                    j--;
                    a = 0;
                    break;
                } else {
                    j--;
                }
            }
            if (a !== 0) {
                asteroids[++j] = a;
            }
        }

        return asteroids.slice(0, j + 1);
    }
}
```

```csharp
public class Solution {
    public int[] AsteroidCollision(int[] asteroids) {
        int n = asteroids.Length;
        int j = -1;

        foreach (int a in asteroids) {
            int current = a;

            while (j >= 0 && asteroids[j] > 0 && current < 0) {
                if (asteroids[j] > Math.Abs(current)) {
                    current = 0;
                    break;
                } else if (asteroids[j] == Math.Abs(current)) {
                    j--;
                    current = 0;
                    break;
                } else {
                    j--;
                }
            }

            if (current != 0) {
                asteroids[++j] = current;
            }
        }

        int[] result = new int[j + 1];
        Array.Copy(asteroids, 0, result, 0, j + 1);
        return result;
    }
}
```

```go
func asteroidCollision(asteroids []int) []int {
    j := -1

    for _, a := range asteroids {
        for j >= 0 && asteroids[j] > 0 && a < 0 {
            if asteroids[j] > -a {
                a = 0
                break
            } else if asteroids[j] == -a {
                j--
                a = 0
                break
            } else {
                j--
            }
        }
        if a != 0 {
            j++
            asteroids[j] = a
        }
    }

    return asteroids[:j+1]
}
```

```kotlin
class Solution {
    fun asteroidCollision(asteroids: IntArray): IntArray {
        var j = -1

        for (a in asteroids) {
            var curr = a
            while (j >= 0 && asteroids[j] > 0 && curr < 0) {
                if (asteroids[j] > -curr) {
                    curr = 0
                    break
                } else if (asteroids[j] == -curr) {
                    j--
                    curr = 0
                    break
                } else {
                    j--
                }
            }
            if (curr != 0) {
                j++
                asteroids[j] = curr
            }
        }

        return asteroids.copyOfRange(0, j + 1)
    }
}
```

```swift
class Solution {
    func asteroidCollision(_ asteroids: [Int]) -> [Int] {
        var asteroids = asteroids
        var j = -1

        for a in asteroids {
            var curr = a
            while j >= 0 && asteroids[j] > 0 && curr < 0 {
                if asteroids[j] > -curr {
                    curr = 0
                    break
                } else if asteroids[j] == -curr {
                    j -= 1
                    curr = 0
                    break
                } else {
                    j -= 1
                }
            }
            if curr != 0 {
                j += 1
                asteroids[j] = curr
            }
        }

        return Array(asteroids[0...(j >= 0 ? j : -1)])
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$ for the output array.

---

## Common Pitfalls

### Assuming All Asteroids Collide
Not all asteroids collide. Two asteroids moving in the same direction (both positive or both negative) never collide. A negative asteroid followed by a positive asteroid also never collide since they move apart.
```python
# Wrong: checking if signs differ without considering direction
if asteroids[i] * asteroids[j] < 0:  # collision!
# Right: collision only when positive is before negative
if stack[-1] > 0 and a < 0:  # potential collision
```

### Forgetting Chain Reactions
A single incoming asteroid can destroy multiple asteroids on the stack. You need a loop, not just a single comparison.
```python
# Wrong: only one comparison
if stack and a < 0 and stack[-1] > 0:
    # handle one collision and move on
# Right: keep checking until no more collisions
while stack and a < 0 and stack[-1] > 0:
    # handle collision, may need to pop multiple times
```

### Incorrect Size Comparison
When comparing asteroid sizes, remember that negative asteroids have negative values. Use absolute value for size comparison.
```python
# Wrong: comparing raw values
if stack[-1] > a:  # incorrect when a is negative
# Right: compare magnitudes
if stack[-1] > abs(a):  # or equivalently: stack[-1] + a > 0
```