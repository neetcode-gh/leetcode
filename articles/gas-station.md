## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Greedy Algorithms** - Recognizing when local decisions can determine global validity
- **Array Traversal** - Iterating through arrays while maintaining running totals
- **Two Pointers** - Using pointers from opposite ends to efficiently narrow down candidates
- **Circular Array Handling** - Working with wrap-around indices using modular arithmetic

---

## 1. Brute Force

### Intuition

We need to find a starting gas station index such that we can travel around the entire circle exactly once without the gas tank ever going negative.

The most direct (brute force) idea is:
- try starting from every station `i`
- simulate the trip around the circle
- if at any point the tank becomes negative, that start index fails
- if we return back to `i` successfully, then `i` is a valid answer

At each station:
- we gain `gas[j]`
- we spend `cost[j]` to travel to the next station
So the tank changes by `gas[j] - cost[j]`.

### Algorithm

1. Let `n` be the number of stations.
2. For each possible starting station `i` from `0` to `n - 1`:
   - Initialize `tank = gas[i] - cost[i]`
   - If `tank < 0`, we cannot even leave station `i`, so skip it
3. Set `j` to the next station `(i + 1) % n`
4. While we haven’t returned to `i`:
   - Add gas at station `j`: `tank += gas[j]`
   - Subtract travel cost to next station: `tank -= cost[j]`
   - If `tank < 0`, this start `i` fails, stop the simulation
   - Move `j` to `(j + 1) % n`
5. If we successfully return to `i` (completed the circle):
   - Return `i`
6. If no starting index works:
   - Return `-1`

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

```swift
class Solution {
    func canCompleteCircuit(_ gas: [Int], _ cost: [Int]) -> Int {
        let n = gas.count

        for i in 0..<n {
            var tank = gas[i] - cost[i]
            if tank < 0 {
                continue
            }

            var j = (i + 1) % n
            while j != i {
                tank += gas[j]
                tank -= cost[j]
                if tank < 0 {
                    break
                }
                j += 1
                j %= n
            }

            if j == i {
                return i
            }
        }

        return -1
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(1)$

---

## 2. Two Pointers

### Intuition

We need to find a gas station index from which we can complete the full circular route without the gas tank ever becoming negative.

Instead of simulating the trip from every station (brute force), this approach uses **two pointers** to narrow down the possible starting station efficiently.

Think of the route as a circle that we are trying to “cover” from both ends:
- `start` moves backward from the end of the array
- `end` moves forward from the beginning of the array
- `tank` keeps track of the current gas balance for the segment we are considering

At every step, we decide **which side to expand** based on whether the current `tank` is sufficient:
- If the `tank` is negative, the current segment cannot work, so we must include more gas by moving `start` backward
- If the `tank` is non-negative, we can safely extend the route forward by moving `end`

By doing this, we gradually merge the segment until `start` meets `end`.  
If the final `tank` is non-negative, `start` is a valid starting station.

### Algorithm

1. Let `n` be the number of gas stations.
2. Initialize two pointers:
   - `start = n - 1`
   - `end = 0`
3. Initialize `tank` with the net gas at `start`:
   - `tank = gas[start] - cost[start]`
4. While `start > end`:
   - If `tank < 0`:
     - Move `start` one step backward
     - Add the net gas of the new `start` station to `tank`
   - Else:
     - Extend the route forward by including station `end`
     - Add `gas[end] - cost[end]` to `tank`
     - Move `end` one step forward
5. After the loop ends, all stations are included in the segment
6. If `tank >= 0`, return `start` as the valid starting index.
7. Otherwise, return `-1`.

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
        let start = n - 1,
            end = 0;
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

```swift
class Solution {
    func canCompleteCircuit(_ gas: [Int], _ cost: [Int]) -> Int {
        let n = gas.count
        var start = n - 1
        var end = 0
        var tank = gas[start] - cost[start]

        while start > end {
            if tank < 0 {
                start -= 1
                tank += gas[start] - cost[start]
            } else {
                tank += gas[end] - cost[end]
                end += 1
            }
        }

        return tank >= 0 ? start : -1
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$

---

## 3. Greedy

### Intuition

We want to find a gas station index from which we can complete the entire circular route without the gas tank ever going negative.

First, notice an important fact:
- If the **total gas available** is less than the **total cost required**, then it is **impossible** to complete the circuit from any station.

If the total gas is sufficient, then there must be **exactly one valid starting station**.

The greedy idea is to scan the stations from left to right while keeping track of the **current tank balance**.
- If at some index the tank becomes negative, it means **we cannot start from any station between the previous start and this index**, because they would all run out of gas at the same point.
- So we reset the tank and try the **next station as a new starting point**.

### Algorithm

1. Check if the total gas is less than the total cost:
   - If `sum(gas) < sum(cost)`, return `-1` immediately.
2. Initialize:
   - `total = 0` to track the current gas balance.
   - `res = 0` to store the candidate starting index.
3. Iterate through all stations from index `0` to `n - 1`.
4. At each station `i`:
   - Add the net gas change:
     - `total += gas[i] - cost[i]`
5. If `total` becomes negative:
   - The current starting point cannot work.
   - Reset `total = 0`.
   - Set the next station as the new candidate start: `res = i + 1`.
6. After finishing the loop:
   - Return `res` as the valid starting station.

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
        if (
            gas.reduce((acc, val) => acc + val, 0) <
            cost.reduce((acc, val) => acc + val, 0)
        ) {
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

```swift
class Solution {
    func canCompleteCircuit(_ gas: [Int], _ cost: [Int]) -> Int {
        if gas.reduce(0, +) < cost.reduce(0, +) {
            return -1
        }

        var total = 0
        var res = 0
        for i in 0..<gas.count {
            total += (gas[i] - cost[i])

            if total < 0 {
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

- Time complexity: $O(n)$
- Space complexity: $O(1)$

---

## Common Pitfalls

### Forgetting to Check Total Gas vs Total Cost First

The greedy solution assumes a valid starting point exists if total gas is sufficient. However, skipping this global check can cause returning an invalid index when no solution exists. Always verify `sum(gas) >= sum(cost)` before applying the greedy logic, or the algorithm may return a false positive starting index.

### Resetting to an Invalid Starting Index

When the running tank goes negative at index `i`, the new candidate start should be `i + 1`. A common mistake is setting it to `i`, which is guaranteed to fail since we just proved the journey fails at that point. Additionally, when `i + 1` equals `n`, there's no valid start, but this is handled by the total gas check.

### Not Understanding Why Failed Stations Can Be Skipped

The greedy approach skips all stations between the previous start and the failing point. This works because if we cannot reach station `j` starting from station `i`, we also cannot reach `j` starting from any station between `i` and `j`. Those intermediate stations have strictly less accumulated gas when reaching `j`. Understanding this principle is key to trusting the linear-time solution.