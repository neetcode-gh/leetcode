## 1. Stack

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 2. Without Stack

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$ for the output array.
