## 1. Array - I

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

::tabs-end

### Time & Space Complexity

- Time complexity:
    - $O(1)$ time for initialization.
    - $O(1)$ time for each $addCar()$ function call.
- Space complexity: $O(1)$

---

## 2. Array - II

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

::tabs-end

### Time & Space Complexity

- Time complexity:
    - $O(1)$ time for initialization.
    - $O(1)$ time for each $addCar()$ function call.
- Space complexity: $O(1)$
