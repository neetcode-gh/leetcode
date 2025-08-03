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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$
