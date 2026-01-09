## 1. Simulation - I

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
