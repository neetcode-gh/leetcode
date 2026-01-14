## 1. Array - I

### Intuition
A parking lot has a fixed number of spaces for each car size (big, medium, small). We can represent the available slots using an array of three integers. Since car types are numbered `1`, `2`, and `3`, we map them to array indices `0`, `1`, and `2` by subtracting `1`. When a car arrives, we check if there is room for its type. If so, we decrement the count and allow parking; otherwise, we reject it.

### Algorithm
1. **Initialization:** Store the slot counts for big, medium, and small in an array `spaces` at indices `0`, `1`, and `2`.
2. **addCar(carType):** Check if `spaces[carType - 1] > 0`. If yes, decrement that slot count and return `true`. Otherwise, return `false`.

::tabs-start

```python
class ParkingSystem:

    def __init__(self, big: int, medium: int, small: int):
        self.spaces = [big, medium, small]

    def addCar(self, carType: int) -> bool:
        if self.spaces[carType - 1] > 0:
            self.spaces[carType - 1] -= 1
            return True
        return False
```

```java
public class ParkingSystem {
    private int[] spaces;

    public ParkingSystem(int big, int medium, int small) {
        spaces = new int[]{big, medium, small};
    }

    public boolean addCar(int carType) {
        if (spaces[carType - 1] > 0) {
            spaces[carType - 1]--;
            return true;
        }
        return false;
    }
}
```

```cpp
class ParkingSystem {
    int spaces[3];

public:
    ParkingSystem(int big, int medium, int small) {
        spaces[0] = big;
        spaces[1] = medium;
        spaces[2] = small;
    }

    bool addCar(int carType) {
        if (spaces[carType - 1] > 0) {
            spaces[carType - 1]--;
            return true;
        }
        return false;
    }
};
```

```javascript
class ParkingSystem {
    /**
     * @constructor
     * @param {number} big
     * @param {number} medium
     * @param {number} small
     */
    constructor(big, medium, small) {
        this.spaces = [big, medium, small];
    }

    /**
     * @param {number} carType
     * @return {boolean}
     */
    addCar(carType) {
        if (this.spaces[carType - 1] > 0) {
            this.spaces[carType - 1]--;
            return true;
        }
        return false;
    }
}
```

```csharp
public class ParkingSystem {
    private int[] spaces;

    public ParkingSystem(int big, int medium, int small) {
        spaces = new int[] { big, medium, small };
    }

    public bool AddCar(int carType) {
        if (spaces[carType - 1] > 0) {
            spaces[carType - 1]--;
            return true;
        }
        return false;
    }
}
```

```go
type ParkingSystem struct {
    spaces []int
}

func Constructor(big int, medium int, small int) ParkingSystem {
    return ParkingSystem{spaces: []int{big, medium, small}}
}

func (this *ParkingSystem) AddCar(carType int) bool {
    if this.spaces[carType-1] > 0 {
        this.spaces[carType-1]--
        return true
    }
    return false
}
```

```kotlin
class ParkingSystem(big: Int, medium: Int, small: Int) {
    private val spaces = intArrayOf(big, medium, small)

    fun addCar(carType: Int): Boolean {
        if (spaces[carType - 1] > 0) {
            spaces[carType - 1]--
            return true
        }
        return false
    }
}
```

```swift
class ParkingSystem {
    private var spaces: [Int]

    init(_ big: Int, _ medium: Int, _ small: Int) {
        spaces = [big, medium, small]
    }

    func addCar(_ carType: Int) -> Bool {
        if spaces[carType - 1] > 0 {
            spaces[carType - 1] -= 1
            return true
        }
        return false
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity:
    - $O(1)$ time for initialization.
    - $O(1)$ time for each $addCar()$ function call.
- Space complexity: $O(1)$

---

## 2. Array - II

### Intuition
This is a more concise version of the array approach. Instead of checking before decrementing, we decrement first and then check if the result is non-negative. The logic works because if there were no available slots, the count becomes negative, which we use to indicate failure. This allows the check and update to happen in a single expression.

### Algorithm
1. **Initialization:** Store the slot counts for big, medium, and small in an array `spaces`.
2. **addCar(carType):** Decrement `spaces[carType - 1]` and return `true` if the new value is greater than or equal to `0`, otherwise return `false`.

::tabs-start

```python
class ParkingSystem:

    def __init__(self, big: int, medium: int, small: int):
        self.spaces = [big, medium, small]

    def addCar(self, carType: int) -> bool:
        self.spaces[carType - 1] -= 1
        return self.spaces[carType - 1] >= 0
```

```java
public class ParkingSystem {
    int[] spaces;

    public ParkingSystem(int big, int medium, int small) {
        spaces = new int[]{big, medium, small};
    }

    public boolean addCar(int carType) {
        return spaces[carType - 1]-- > 0;
    }
}
```

```cpp
class ParkingSystem {
    int spaces[3];

public:
    ParkingSystem(int big, int medium, int small) {
        spaces[0] = big, spaces[1] = medium, spaces[2] = small;
    }

    bool addCar(int carType) {
        return spaces[carType - 1]-- > 0;
    }
};
```

```javascript
class ParkingSystem {
    /**
     * @constructor
     * @param {number} big
     * @param {number} medium
     * @param {number} small
     */
    constructor(big, medium, small) {
        this.spaces = [big, medium, small];
    }

    /**
     * @param {number} carType
     * @return {boolean}
     */
    addCar(carType) {
        return this.spaces[carType - 1]-- > 0;
    }
}
```

```csharp
public class ParkingSystem {
    private int[] spaces;

    public ParkingSystem(int big, int medium, int small) {
        spaces = new int[] { big, medium, small };
    }

    public bool AddCar(int carType) {
        return spaces[carType - 1]-- > 0;
    }
}
```

```go
type ParkingSystem struct {
    spaces []int
}

func Constructor(big int, medium int, small int) ParkingSystem {
    return ParkingSystem{spaces: []int{big, medium, small}}
}

func (this *ParkingSystem) AddCar(carType int) bool {
    this.spaces[carType-1]--
    return this.spaces[carType-1] >= 0
}
```

```kotlin
class ParkingSystem(big: Int, medium: Int, small: Int) {
    private val spaces = intArrayOf(big, medium, small)

    fun addCar(carType: Int): Boolean {
        spaces[carType - 1]--
        return spaces[carType - 1] >= 0
    }
}
```

```swift
class ParkingSystem {
    private var spaces: [Int]

    init(_ big: Int, _ medium: Int, _ small: Int) {
        spaces = [big, medium, small]
    }

    func addCar(_ carType: Int) -> Bool {
        spaces[carType - 1] -= 1
        return spaces[carType - 1] >= 0
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity:
    - $O(1)$ time for initialization.
    - $O(1)$ time for each $addCar()$ function call.
- Space complexity: $O(1)$

## Common Pitfalls

### Off-by-One Index Error

Car types are 1-indexed (`1` = big, `2` = medium, `3` = small), but arrays are 0-indexed. Forgetting to subtract 1 causes an index out of bounds error.

```python
# Wrong: carType is 1-indexed, causes IndexError for carType=3
self.spaces[carType] -= 1

# Correct: convert to 0-indexed
self.spaces[carType - 1] -= 1
```

### Decrementing Before Checking Availability

When using the concise approach that decrements first, you must check the value before decrementing (using post-decrement) or check if the result is non-negative. Checking for `> 0` after decrementing gives wrong results.

```python
# Wrong: always decrements, even when no space available
self.spaces[carType - 1] -= 1
return self.spaces[carType - 1] > 0  # Returns False when it was 1

# Correct option 1: check first, then decrement
if self.spaces[carType - 1] > 0:
    self.spaces[carType - 1] -= 1
    return True
return False

# Correct option 2: decrement and check >= 0
self.spaces[carType - 1] -= 1
return self.spaces[carType - 1] >= 0
```
