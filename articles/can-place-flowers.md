## 1. Iteration - I

### Intuition
A flower can be planted at position i only if positions i-1, i, and i+1 are all empty. To handle edge cases at the boundaries, we pad the flowerbed with zeros at both ends. This way, we can apply the same rule uniformly across all positions without special boundary checks.

### Algorithm
1. Create a new array with a 0 prepended and appended to the original flowerbed.
2. Iterate through the padded array from index 1 to length-2 (the original positions).
3. For each position, check if the current cell and both neighbors are empty (all zeros).
4. If so, plant a flower by setting the current cell to 1, and decrement n.
5. After processing all positions, return true if n is 0 or less (we placed enough flowers).

::tabs-start

```python
class Solution:
    def canPlaceFlowers(self, flowerbed: List[int], n: int) -> bool:
        f = [0] + flowerbed + [0]

        for i in range(1, len(f) - 1):
            if f[i - 1] == 0 and f[i] == 0 and f[i + 1] == 0:
                f[i] = 1
                n -= 1

        return n <= 0
```

```java
public class Solution {
    public boolean canPlaceFlowers(int[] flowerbed, int n) {
        int[] f = new int[flowerbed.length + 2];
        for (int i = 0; i < flowerbed.length; i++) {
            f[i + 1] = flowerbed[i];
        }

        for (int i = 1; i < f.length - 1; i++) {
            if (f[i - 1] == 0 && f[i] == 0 && f[i + 1] == 0) {
                f[i] = 1;
                n--;
            }
        }
        return n <= 0;
    }
}
```

```cpp
class Solution {
public:
    bool canPlaceFlowers(vector<int>& flowerbed, int n) {
        vector<int> f(flowerbed.size() + 2, 0);
        for (int i = 0; i < flowerbed.size(); i++) {
            f[i + 1] = flowerbed[i];
        }

        for (int i = 1; i < f.size() - 1; i++) {
            if (f[i - 1] == 0 && f[i] == 0 && f[i + 1] == 0) {
                f[i] = 1;
                n--;
            }
        }
        return n <= 0;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} flowerbed
     * @param {number} n
     * @return {boolean}
     */
    canPlaceFlowers(flowerbed, n) {
        const f = [0, ...flowerbed, 0];

        for (let i = 1; i < f.length - 1; i++) {
            if (f[i - 1] === 0 && f[i] === 0 && f[i + 1] === 0) {
                f[i] = 1;
                n--;
            }
        }
        return n <= 0;
    }
}
```

```csharp
public class Solution {
    public bool CanPlaceFlowers(int[] flowerbed, int n) {
        int[] f = new int[flowerbed.Length + 2];
        for (int i = 0; i < flowerbed.Length; i++) {
            f[i + 1] = flowerbed[i];
        }

        for (int i = 1; i < f.Length - 1; i++) {
            if (f[i - 1] == 0 && f[i] == 0 && f[i + 1] == 0) {
                f[i] = 1;
                n--;
            }
        }

        return n <= 0;
    }
}
```

```go
func canPlaceFlowers(flowerbed []int, n int) bool {
    f := make([]int, 0, len(flowerbed)+2)
    f = append(f, 0)
    f = append(f, flowerbed...)
    f = append(f, 0)

    for i := 1; i < len(f)-1; i++ {
        if f[i-1] == 0 && f[i] == 0 && f[i+1] == 0 {
            f[i] = 1
            n--
        }
    }

    return n <= 0
}
```

```kotlin
class Solution {
    fun canPlaceFlowers(flowerbed: IntArray, n: Int): Boolean {
        var n = n
        val f = IntArray(flowerbed.size + 2)
        for (i in flowerbed.indices) {
            f[i + 1] = flowerbed[i]
        }

        for (i in 1 until f.size - 1) {
            if (f[i - 1] == 0 && f[i] == 0 && f[i + 1] == 0) {
                f[i] = 1
                n--
            }
        }

        return n <= 0
    }
}
```

```swift
class Solution {
    func canPlaceFlowers(_ flowerbed: [Int], _ n: Int) -> Bool {
        var n = n
        var f = [0] + flowerbed + [0]

        for i in 1..<(f.count - 1) {
            if f[i - 1] == 0 && f[i] == 0 && f[i + 1] == 0 {
                f[i] = 1
                n -= 1
            }
        }

        return n <= 0
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 2. Iteration - II

### Intuition
Instead of checking each position individually, we can count consecutive empty plots between flowers. For a sequence of k empty plots between two flowers, we can plant (k-1)/2 flowers. At the beginning and end of the flowerbed, the formula differs slightly since there is no blocking flower on one side: we can plant k/2 flowers at the edges.

### Algorithm
1. Initialize an empty plot counter. If the first cell is empty, start the counter at 1 (treating the left boundary as open).
2. Iterate through each cell in the flowerbed.
3. When encountering a flower (1), calculate how many new flowers can fit in the empty sequence before it using (empty-1)/2, then reset the counter.
4. When encountering an empty cell (0), increment the counter.
5. After the loop, handle the trailing empty sequence using empty/2 (right boundary is open).
6. Return true if we placed at least n flowers.

::tabs-start

```python
class Solution:
    def canPlaceFlowers(self, flowerbed: List[int], n: int) -> bool:
        empty = 0 if flowerbed[0] else 1

        for f in flowerbed:
            if f:
                n -= int((empty - 1) / 2)
                empty = 0
            else:
                empty += 1

        n -= empty // 2
        return n <= 0
```

```java
public class Solution {
    public boolean canPlaceFlowers(int[] flowerbed, int n) {
        int empty = flowerbed[0] == 0 ? 1 : 0;

        for (int f : flowerbed) {
            if (f == 1) {
                n -= (empty - 1) / 2;
                empty = 0;
            } else {
                empty++;
            }
        }

        n -= empty / 2;
        return n <= 0;
    }
}
```

```cpp
class Solution {
public:
    bool canPlaceFlowers(vector<int>& flowerbed, int n) {
        int empty = flowerbed[0] == 0 ? 1 : 0;

        for (int f : flowerbed) {
            if (f == 1) {
                n -= (empty - 1) / 2;
                empty = 0;
            } else {
                empty++;
            }
        }

        n -= empty / 2;
        return n <= 0;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} flowerbed
     * @param {number} n
     * @return {boolean}
     */
    canPlaceFlowers(flowerbed, n) {
        let empty = flowerbed[0] === 0 ? 1 : 0;

        for (let f of flowerbed) {
            if (f === 1) {
                n -= Math.floor(Math.max(0, empty - 1) / 2);
                empty = 0;
            } else {
                empty++;
            }
        }

        n -= Math.floor(empty / 2);
        return n <= 0;
    }
}
```

```csharp
public class Solution {
    public bool CanPlaceFlowers(int[] flowerbed, int n) {
        int empty = flowerbed[0] == 0 ? 1 : 0;

        foreach (int f in flowerbed) {
            if (f == 1) {
                n -= (empty - 1) / 2;
                empty = 0;
            } else {
                empty++;
            }
        }

        n -= empty / 2;
        return n <= 0;
    }
}
```

```go
func canPlaceFlowers(flowerbed []int, n int) bool {
    empty := 0
    if flowerbed[0] == 0 {
        empty = 1
    }

    for _, f := range flowerbed {
        if f == 1 {
            n -= (empty - 1) / 2
            empty = 0
        } else {
            empty++
        }
    }

    n -= empty / 2
    return n <= 0
}
```

```kotlin
class Solution {
    fun canPlaceFlowers(flowerbed: IntArray, n: Int): Boolean {
        var n = n
        var empty = if (flowerbed[0] == 0) 1 else 0

        for (f in flowerbed) {
            if (f == 1) {
                n -= (empty - 1) / 2
                empty = 0
            } else {
                empty++
            }
        }

        n -= empty / 2
        return n <= 0
    }
}
```

```swift
class Solution {
    func canPlaceFlowers(_ flowerbed: [Int], _ n: Int) -> Bool {
        var n = n
        var empty = flowerbed[0] == 0 ? 1 : 0

        for f in flowerbed {
            if f == 1 {
                n -= (empty - 1) / 2
                empty = 0
            } else {
                empty += 1
            }
        }

        n -= empty / 2
        return n <= 0
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$
