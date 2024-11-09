## 1. Brute Force

::tabs-start

```python
class Solution:
    def canCompleteCircuit(self, gas: List[int], cost: List[int]) -> int:
        n = len(gas)

        for i in range(n):
            tank = gas[i] - cost[i]
            if tank < 0:
                continue
            j = (i + 1) % n
            while j != i:
                tank += gas[j]
                tank -= cost[j]
                if tank < 0:
                    break
                j += 1
                j %= n
            if j == i:
                return i
        return -1
```

```java
public class Solution {
    public int canCompleteCircuit(int[] gas, int[] cost) {
        int n = gas.length;

        for (int i = 0; i < n; i++) {
            int tank = gas[i] - cost[i];
            if (tank < 0) continue;
            int j = (i + 1) % n;
            while (j != i) {
                tank += gas[j] - cost[j];
                if (tank < 0) break;
                j = (j + 1) % n;
            }
            if (j == i) return i;
        }
        return -1;
    }
}
```

```cpp
class Solution {
public:
    int canCompleteCircuit(vector<int>& gas, vector<int>& cost) {
        int n = gas.size();

        for (int i = 0; i < n; i++) {
            int tank = gas[i] - cost[i];
            if (tank < 0) continue;
            int j = (i + 1) % n;
            while (j != i) {
                tank += gas[j] - cost[j];
                if (tank < 0) break;
                j = (j + 1) % n;
            }
            if (j == i) return i;
        }
        return -1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} gas
     * @param {number[]} cost
     * @return {number}
     */
    canCompleteCircuit(gas, cost) {
        const n = gas.length;

        for (let i = 0; i < n; i++) {
            let tank = gas[i] - cost[i];
            if (tank < 0) continue;
            let j = (i + 1) % n;
            while (j !== i) {
                tank += gas[j] - cost[j];
                if (tank < 0) break;
                j = (j + 1) % n;
            }
            if (j === i) return i;
        }
        return -1;
    }
}
```

```csharp
public class Solution {
    public int CanCompleteCircuit(int[] gas, int[] cost) {
        int n = gas.Length;

        for (int i = 0; i < n; i++) {
            int tank = gas[i] - cost[i];
            if (tank < 0) continue;
            int j = (i + 1) % n;
            while (j != i) {
                tank += gas[j] - cost[j];
                if (tank < 0) break;
                j = (j + 1) % n;
            }
            if (j == i) return i;
        }
        return -1;
    }
}
```

```go
func canCompleteCircuit(gas []int, cost []int) int {
    n := len(gas)
    for i := 0; i < n; i++ {
        tank := gas[i] - cost[i]
        if tank < 0 {
            continue
        }
        j := (i + 1) % n
        for j != i {
            tank += gas[j]
            tank -= cost[j]
            if tank < 0 {
                break
            }
            j = (j + 1) % n
        }
        if j == i {
            return i
        }
    }
    return -1
}
```

```kotlin
class Solution {
    fun canCompleteCircuit(gas: IntArray, cost: IntArray): Int {
        val n = gas.size
        for (i in 0 until n) {
            var tank = gas[i] - cost[i]
            if (tank < 0) {
                continue
            }
            var j = (i + 1) % n
            while (j != i) {
                tank += gas[j]
                tank -= cost[j]
                if (tank < 0) {
                    break
                }
                j = (j + 1) % n
            }
            if (j == i) {
                return i
            }
        }
        return -1
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n ^ 2)$
* Space complexity: $O(1)$

---

## 2. Two Pointers

::tabs-start

```python
class Solution:
    def canCompleteCircuit(self, gas: List[int], cost: List[int]) -> int:
        n = len(gas)
        start, end = n - 1, 0
        tank = gas[start] - cost[start]
        while start > end:
            if tank < 0:
                start -= 1
                tank += gas[start] - cost[start]
            else:
                tank += gas[end] - cost[end]
                end += 1
        return start if tank >= 0 else -1
```

```java
public class Solution {
    public int canCompleteCircuit(int[] gas, int[] cost) {
        int n = gas.length;
        int start = n - 1, end = 0;
        int tank = gas[start] - cost[start];
        while (start > end) {
            if (tank < 0) {
                start--;
                tank += gas[start] - cost[start];
            } else {
                tank += gas[end] - cost[end];
                end++;
            }
        }
        return tank >= 0 ? start : -1;
    }
}
```

```cpp
class Solution {
public:
    int canCompleteCircuit(vector<int>& gas, vector<int>& cost) {
        int n = gas.size();
        int start = n - 1, end = 0;
        int tank = gas[start] - cost[start];
        while (start > end) {
            if (tank < 0) {
                start--;
                tank += gas[start] - cost[start];
            } else {
                tank += gas[end] - cost[end];
                end++;
            }
        }
        return tank >= 0 ? start : -1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} gas
     * @param {number[]} cost
     * @return {number}
     */
    canCompleteCircuit(gas, cost) {
        const n = gas.length;
        let start = n - 1, end = 0;
        let tank = gas[start] - cost[start];
        while (start > end) {
            if (tank < 0) {
                start--;
                tank += gas[start] - cost[start];
            } else {
                tank += gas[end] - cost[end];
                end++;
            }
        }
        return tank >= 0 ? start : -1;
    }
}
```

```csharp
public class Solution {
    public int CanCompleteCircuit(int[] gas, int[] cost) {
        int n = gas.Length;
        int start = n - 1, end = 0;
        int tank = gas[start] - cost[start];
        while (start > end) {
            if (tank < 0) {
                start--;
                tank += gas[start] - cost[start];
            } else {
                tank += gas[end] - cost[end];
                end++;
            }
        }
        return tank >= 0 ? start : -1;
    }
}
```

```go
func canCompleteCircuit(gas []int, cost []int) int {
    n := len(gas)
    start, end := n-1, 0
    tank := gas[start] - cost[start]

    for start > end {
        if tank < 0 {
            start--
            tank += gas[start] - cost[start]
        } else {
            tank += gas[end] - cost[end]
            end++
        }
    }

    if tank >= 0 {
        return start
    }
    return -1
}
```

```kotlin
class Solution {
    fun canCompleteCircuit(gas: IntArray, cost: IntArray): Int {
        val n = gas.size
        var start = n - 1
        var end = 0
        var tank = gas[start] - cost[start]

        while (start > end) {
            if (tank < 0) {
                start--
                tank += gas[start] - cost[start]
            } else {
                tank += gas[end] - cost[end]
                end++
            }
        }

        return if (tank >= 0) start else -1
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(1)$

---

## 3. Greedy

::tabs-start

```python
class Solution:
    def canCompleteCircuit(self, gas: List[int], cost: List[int]) -> int:
        if sum(gas) < sum(cost):
            return -1

        total = 0
        res = 0
        for i in range(len(gas)):
            total += (gas[i] - cost[i])

            if total < 0:
                total = 0
                res = i + 1
        
        return res
```

```java
public class Solution {
    public int canCompleteCircuit(int[] gas, int[] cost) {
        if (Arrays.stream(gas).sum() < Arrays.stream(cost).sum()) {
            return -1;
        }

        int total = 0;
        int res = 0;
        for (int i = 0; i < gas.length; i++) {
            total += (gas[i] - cost[i]);

            if (total < 0) {
                total = 0;
                res = i + 1;
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int canCompleteCircuit(vector<int>& gas, vector<int>& cost) {
        if (accumulate(gas.begin(), gas.end(), 0) < 
            accumulate(cost.begin(), cost.end(), 0)) {
            return -1;
        }

        int total = 0;
        int res = 0;
        for (int i = 0; i < gas.size(); i++) {
            total += (gas[i] - cost[i]);

            if (total < 0) {
                total = 0;
                res = i + 1;
            }
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} gas
     * @param {number[]} cost
     * @return {number}
     */
    canCompleteCircuit(gas, cost) {
        if (gas.reduce((acc, val) => acc + val, 0) <
            cost.reduce((acc, val) => acc + val, 0)) {
            return -1;
        }

        let total = 0;
        let res = 0;
        for (let i = 0; i < gas.length; i++) {
            total += gas[i] - cost[i];

            if (total < 0) {
                total = 0;
                res = i + 1;
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int CanCompleteCircuit(int[] gas, int[] cost) {
        if (gas.Sum() < cost.Sum()) {
            return -1;
        }

        int total = 0;
        int res = 0;
        for (int i = 0; i < gas.Length; i++) {
            total += (gas[i] - cost[i]);

            if (total < 0) {
                total = 0;
                res = i + 1;
            }
        }

        return res;
    }
}
```

```go
func canCompleteCircuit(gas []int, cost []int) int {
    if sum(gas) < sum(cost) {
        return -1
    }

    total := 0
    res := 0

    for i := range gas {
        total += gas[i] - cost[i]
        if total < 0 {
            total = 0
            res = i + 1
        }
    }

    return res
}

func sum(nums []int) int {
    var total int
    for _, num := range nums {
        total += num
    }
    return total
}
```

```kotlin
class Solution {
    fun canCompleteCircuit(gas: IntArray, cost: IntArray): Int {
        if (gas.sum() < cost.sum()) {
            return -1
        }

        var total = 0
        var res = 0

        for (i in gas.indices) {
            total += gas[i] - cost[i]
            if (total < 0) {
                total = 0
                res = i + 1
            }
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(1)$