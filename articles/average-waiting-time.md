## 1. Simulation - I

### Intuition

We simulate the chef serving customers one by one. The chef can only start a new order when they finish the previous one. If a customer arrives while the chef is busy, they wait. The waiting time for each customer is the time from arrival until their order is complete. We track the current time and accumulate total waiting time.

### Algorithm

1. Initialize `t` (current time) and `total` (total waiting time) to `0`.
2. For each customer with arrival time and order duration:
   - If the chef is still busy (`t > arrival`), add the extra wait to `total`.
   - Otherwise, update `t` to the arrival time.
   - Add the order time to both `total` and `t`.
3. Return `total` divided by the number of customers.

::tabs-start

```python
class Solution:
    def averageWaitingTime(self, customers: List[List[int]]) -> float:
        t = 0
        total = 0

        for arrival, order in customers:
            if t > arrival:
                total += t - arrival
            else:
                t = arrival
            total += order
            t += order

        return total / len(customers)
```

```java
public class Solution {
    public double averageWaitingTime(int[][] customers) {
        long t = 0, total = 0;

        for (int[] c : customers) {
            int arrival = c[0], order = c[1];
            if (t > arrival) {
                total += t - arrival;
            } else {
                t = arrival;
            }
            total += order;
            t += order;
        }

        return (double) total / customers.length;
    }
}
```

```cpp
class Solution {
public:
    double averageWaitingTime(vector<vector<int>>& customers) {
        long long t = 0, total = 0;

        for (auto& c : customers) {
            int arrival = c[0], order = c[1];
            if (t > arrival) {
                total += t - arrival;
            } else {
                t = arrival;
            }
            total += order;
            t += order;
        }

        return (double) total / customers.size();
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} customers
     * @return {number}
     */
    averageWaitingTime(customers) {
        let t = 0,
            total = 0;

        for (let [arrival, order] of customers) {
            if (t > arrival) {
                total += t - arrival;
            } else {
                t = arrival;
            }
            total += order;
            t += order;
        }

        return total / customers.length;
    }
}
```

```csharp
public class Solution {
    public double AverageWaitingTime(int[][] customers) {
        long t = 0, total = 0;

        foreach (var c in customers) {
            int arrival = c[0], order = c[1];
            if (t > arrival) {
                total += t - arrival;
            } else {
                t = arrival;
            }
            total += order;
            t += order;
        }

        return (double) total / customers.Length;
    }
}
```

```go
func averageWaitingTime(customers [][]int) float64 {
    var t, total int64 = 0, 0

    for _, c := range customers {
        arrival, order := int64(c[0]), int64(c[1])
        if t > arrival {
            total += t - arrival
        } else {
            t = arrival
        }
        total += order
        t += order
    }

    return float64(total) / float64(len(customers))
}
```

```kotlin
class Solution {
    fun averageWaitingTime(customers: Array<IntArray>): Double {
        var t: Long = 0
        var total: Long = 0

        for (c in customers) {
            val arrival = c[0].toLong()
            val order = c[1].toLong()
            if (t > arrival) {
                total += t - arrival
            } else {
                t = arrival
            }
            total += order
            t += order
        }

        return total.toDouble() / customers.size
    }
}
```

```swift
class Solution {
    func averageWaitingTime(_ customers: [[Int]]) -> Double {
        var t: Int64 = 0
        var total: Int64 = 0

        for c in customers {
            let arrival = Int64(c[0])
            let order = Int64(c[1])
            if t > arrival {
                total += t - arrival
            } else {
                t = arrival
            }
            total += order
            t += order
        }

        return Double(total) / Double(customers.count)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$

---

## 2. Simulation - II

### Intuition

This is a more concise version of the simulation. The key observation is that the chef starts cooking at whichever is later: their current finish time or the customer's arrival. The finish time becomes `max(t, arrival) + order`. The customer's waiting time is simply `finish_time - arrival`. This formula captures both cases (chef idle or busy) in one expression.

### Algorithm

1. Initialize `t` (finish time) and `total` to `0`.
2. For each customer:
   - Update `t` to `max(t, arrival) + order` (when the order finishes).
   - Add `t - arrival` to `total` (customer's wait time).
3. Return `total` divided by the number of customers.

::tabs-start

```python
class Solution:
    def averageWaitingTime(self, customers: List[List[int]]) -> float:
        t = total = 0
        for arrival, order in customers:
            t = max(t, arrival) + order
            total += t - arrival
        return total / len(customers)
```

```java
public class Solution {
    public double averageWaitingTime(int[][] customers) {
        long t = 0, total = 0;

        for (int[] c : customers) {
            int arrival = c[0], order = c[1];
            t = Math.max(t, arrival) + order;
            total += t - arrival;
        }

        return (double) total / customers.length;
    }
}
```

```cpp
class Solution {
public:
    double averageWaitingTime(vector<vector<int>>& customers) {
        long long t = 0, total = 0;

        for (auto& c : customers) {
            int arrival = c[0], order = c[1];
            t = max(t, (long long)arrival) + order;
            total += t - arrival;
        }

        return (double) total / customers.size();
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} customers
     * @return {number}
     */
    averageWaitingTime(customers) {
        let t = 0,
            total = 0;

        for (let [arrival, order] of customers) {
            t = Math.max(t, arrival) + order;
            total += t - arrival;
        }

        return total / customers.length;
    }
}
```

```csharp
public class Solution {
    public double AverageWaitingTime(int[][] customers) {
        long t = 0, total = 0;

        foreach (var c in customers) {
            int arrival = c[0], order = c[1];
            t = Math.Max(t, arrival) + order;
            total += t - arrival;
        }

        return (double) total / customers.Length;
    }
}
```

```go
func averageWaitingTime(customers [][]int) float64 {
    var t, total int64 = 0, 0

    for _, c := range customers {
        arrival, order := int64(c[0]), int64(c[1])
        if t < arrival {
            t = arrival
        }
        t += order
        total += t - arrival
    }

    return float64(total) / float64(len(customers))
}
```

```kotlin
class Solution {
    fun averageWaitingTime(customers: Array<IntArray>): Double {
        var t: Long = 0
        var total: Long = 0

        for (c in customers) {
            val arrival = c[0].toLong()
            val order = c[1].toLong()
            t = maxOf(t, arrival) + order
            total += t - arrival
        }

        return total.toDouble() / customers.size
    }
}
```

```swift
class Solution {
    func averageWaitingTime(_ customers: [[Int]]) -> Double {
        var t: Int64 = 0
        var total: Int64 = 0

        for c in customers {
            let arrival = Int64(c[0])
            let order = Int64(c[1])
            t = max(t, arrival) + order
            total += t - arrival
        }

        return Double(total) / Double(customers.count)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$

---

## Common Pitfalls

### Integer Overflow
With large arrival times and order durations, the sum of waiting times can exceed 32-bit integer limits. Use 64-bit integers for accumulating totals.
```java
// Wrong: int can overflow
int total = 0;
// Right: use long for accumulation
long total = 0;
```

### Confusing Waiting Time with Service Time
Waiting time is from arrival until the order is complete (includes cooking time), not just the time spent waiting before cooking starts.
```python
# Wrong: only counting idle wait time
wait = max(0, t - arrival)
# Right: total time from arrival to completion
wait = (max(t, arrival) + order) - arrival
```

### Forgetting to Update Current Time
When a customer arrives after the chef is idle, the current time must jump forward to the arrival time, not stay at the previous finish time.
```python
# Wrong: always adding order time to current t
t += order
# Right: chef starts at max(t, arrival)
t = max(t, arrival) + order
```