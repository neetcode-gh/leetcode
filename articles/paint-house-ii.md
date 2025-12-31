## 1. Memoization

::tabs-start

```python
from functools import lru_cache

class Solution:
    def minCostII(self, costs: List[List[int]]) -> int:
        # Start by defining n and k to make the following code cleaner.
        n = len(costs)
        if n == 0: return 0 # No houses is a valid test case!
        k = len(costs[0])

        # If you're not familiar with lru_cache, look it up in the docs as it's
        # essential to know about.
        @lru_cache(maxsize=None)
        def memo_solve(house_num, color):

            # Base case.
            if house_num == n - 1:
                return costs[house_num][color]

            # Recursive case.
            cost = math.inf
            for next_color in range(k):
                if next_color == color:
                    continue # Can't paint adjacent houses the same color!
                cost = min(cost, memo_solve(house_num + 1, next_color))
            return costs[house_num][color] + cost

        # Consider all options for painting house 0 and find the minimum.
        cost = math.inf
        for color in range(k):
            cost = min(cost, memo_solve(0, color))
        return cost
```

```java
class Solution {

    private int n;
    private int k;
    private int[][] costs;
    private Map<String, Integer> memo;

    public int minCostII(int[][] costs) {
        if (costs.length == 0) return 0;
        this.k = costs[0].length;
        this.n = costs.length;
        this.costs = costs;
        this.memo = new HashMap<>();
        int minCost = Integer.MAX_VALUE;
        for (int color = 0; color < k; color++) {
            minCost = Math.min(minCost, memoSolve(0, color));
        }
        return minCost;
    }

    private int memoSolve(int houseNumber, int color) {

        // Base case: There are no more houses after this one.
        if (houseNumber == n - 1) {
            return costs[houseNumber][color];
        }

        // Memoization lookup case: Have we already solved this subproblem?
        if (memo.containsKey(getKey(houseNumber, color))) {
            return memo.get(getKey(houseNumber, color));
        }

        // Recursive case: Determine the minimum cost for the remainder.
        int minRemainingCost = Integer.MAX_VALUE;
        for (int nextColor = 0; nextColor < k; nextColor++) {
            if (color == nextColor) continue;
            int currentRemainingCost = memoSolve(houseNumber + 1, nextColor);
            minRemainingCost = Math.min(currentRemainingCost, minRemainingCost);
        }
        int totalCost = costs[houseNumber][color] + minRemainingCost;
        memo.put(getKey(houseNumber, color), totalCost);
        return totalCost;
    }

    // Convert a house number and color into a simple string key for the memo.
    private String getKey(int n, int color) {
        return String.valueOf(n) + " " + String.valueOf(color);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \cdot k^2)$

- Space complexity: $O(n \cdot k)$

>  Where $n$ is the number of houses in a row, and $k$ is the number of colors available for painting.

---

## 2. Dynamic Programming

::tabs-start

```python
class Solution:
    def minCostII(self, costs: List[List[int]]) -> int:

        n = len(costs)
        if n == 0: return 0
        k = len(costs[0])

        for house in range(1, n):
            for color in range(k):
                best = math.inf
                for previous_color in range(k):
                    if color == previous_color: continue
                    best = min(best, costs[house - 1][previous_color])
                costs[house][color] += best

        return min(costs[-1])
```

```java
class Solution {
    public int minCostII(int[][] costs) {

        if (costs.length == 0) return 0;
        int k = costs[0].length;
        int n = costs.length;

        for (int house = 1; house < n; house++) {
            for (int color = 0; color < k; color++) {
                int min = Integer.MAX_VALUE;
                for (int previousColor = 0; previousColor < k; previousColor++) {
                    if (color == previousColor) continue;
                    min = Math.min(min, costs[house - 1][previousColor]);
                }
                costs[house][color] += min;
            }
        }

        // Find the minimum in the last row.
        int min = Integer.MAX_VALUE;
        for (int c : costs[n - 1]) {
            min = Math.min(min, c);
        }

        return min;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \cdot k^2)$

- Space complexity: $O(1)$ if done in-place, $O(n \cdot k)$ if input is copied.

>  Where $n$ is the number of houses in a row, and $k$ is the number of colors available for painting.

---

## 3. Dynamic Programming with O(k) additional Space

::tabs-start

```python
def minCostII(self, costs: List[List[int]]) -> int:

    n = len(costs)
    if n == 0: return 0
    k = len(costs[0])

    previous_row = costs[0]

    for house in range(1, n):
        current_row = [0] * k
        for color in range(k):
            best = math.inf
            for previous_color in range(k):
                if color == previous_color: continue
                best = min(best, previous_row[previous_color])
            current_row[color] += costs[house][color] + best
        previous_row = current_row

    return min(previous_row)
```

```java
class Solution {

    public int minCostII(int[][] costs) {

        if (costs.length == 0) return 0;
        int k = costs[0].length;
        int n = costs.length;

        int[] previousRow = costs[0];

        for (int house = 1; house < n; house++) {
            int[] currentRow = new int[k];
            for (int color = 0; color < k; color++) {
                int min = Integer.MAX_VALUE;
                for (int previousColor = 0; previousColor < k; previousColor++) {
                    if (color == previousColor) continue;
                    min = Math.min(min, previousRow[previousColor]);
                }
                currentRow[color] += costs[house][color] += min;
            }
            previousRow = currentRow;
        }

        // Find the minimum in the last row.
        int min = Integer.MAX_VALUE;
        for (int c : previousRow) {
            min = Math.min(min, c);
        }
        return min;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \cdot k^2)$

- Space complexity: $O(k)$

>  Where $n$ is the number of houses in a row, and $k$ is the number of colors available for painting.

---

## 4. Dynamic programming with Optimized Time

::tabs-start

```python
class Solution:
    def minCostII(self, costs: List[List[int]]) -> int:

        n = len(costs)
        if n == 0: return 0
        k = len(costs[0])

        for house in range(1, n):
            # Find the colors with the minimum and second to minimum
            # in the previous row.
            min_color = second_min_color = None
            for color in range(k):
                cost = costs[house - 1][color]
                if min_color is None or cost < costs[house - 1][min_color]:
                    second_min_color = min_color
                    min_color = color
                elif second_min_color is None or cost < costs[house - 1][second_min_color]:
                    second_min_color = color
            # And now update the costs for the current row.
            for color in range(k):
                if color == min_color:
                    costs[house][color] += costs[house - 1][second_min_color]
                else:
                    costs[house][color] += costs[house - 1][min_color]

        # The answer will now be the minimum of the last row.
        return min(costs[-1])
```

```java
class Solution {
    public int minCostII(int[][] costs) {

        if (costs.length == 0) return 0;
        int k = costs[0].length;
        int n = costs.length;

        for (int house = 1; house < n; house++) {

            // Find the minimum and second minimum color in the PREVIOUS row.
            int minColor = -1; int secondMinColor = -1;
            for (int color = 0; color < k; color++) {
                int cost = costs[house - 1][color];
                if (minColor == -1 || cost < costs[house - 1][minColor]) {
                    secondMinColor = minColor;
                    minColor = color;
                } else if (secondMinColor == -1 || cost < costs[house - 1][secondMinColor]) {
                    secondMinColor = color;
                }
            }

            // And now calculate the new costs for the current row.
            for (int color = 0; color < k; color++) {
                if (color == minColor) {
                    costs[house][color] += costs[house - 1][secondMinColor];
                } else {
                    costs[house][color] += costs[house - 1][minColor];
                }
            }
        }

        // Find the minimum in the last row.
        int min = Integer.MAX_VALUE;
        for (int c : costs[n - 1]) {
            min = Math.min(min, c);
        }
        return min;
    }
}
```

```cpp
class Solution {
public:
    int minCostII(vector<vector<int>>& costs) {
        if (costs.size() == 0) return 0;
        
        int k = costs[0].size();
        int n = costs.size();
        
        for (int house = 1; house < n; house++) {
            // Find the minimum and second minimum color in the PREVIOUS row.
            int minColor = -1;
            int secondMinColor = -1;
            
            for (int color = 0; color < k; color++) {
                int cost = costs[house - 1][color];
                
                if (minColor == -1 || cost < costs[house - 1][minColor]) {
                    secondMinColor = minColor;
                    minColor = color;
                } else if (secondMinColor == -1 || cost < costs[house - 1][secondMinColor]) {
                    secondMinColor = color;
                }
            }
            
            // And now calculate the new costs for the current row.
            for (int color = 0; color < k; color++) {
                if (color == minColor) {
                    costs[house][color] += costs[house - 1][secondMinColor];
                } else {
                    costs[house][color] += costs[house - 1][minColor];
                }
            }
        }
        
        // Find the minimum in the last row.
        int min = INT_MAX;
        for (int c : costs[n - 1]) {
            min = std::min(min, c);
        }
        
        return min;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} costs
     * @return {number}
     */
    minCostII(costs) {
        const n = costs.length;
        if (n === 0) return 0;
        
        const k = costs[0].length;
        
        for (let house = 1; house < n; house++) {
            // Find the colors with the minimum and second to minimum
            // in the previous row.
            let minColor = null;
            let secondMinColor = null;
            
            for (let color = 0; color < k; color++) {
                const cost = costs[house - 1][color];
                
                if (minColor === null || cost < costs[house - 1][minColor]) {
                    secondMinColor = minColor;
                    minColor = color;
                } else if (secondMinColor === null || cost < costs[house - 1][secondMinColor]) {
                    secondMinColor = color;
                }
            }
            
            // And now update the costs for the current row.
            for (let color = 0; color < k; color++) {
                if (color === minColor) {
                    costs[house][color] += costs[house - 1][secondMinColor];
                } else {
                    costs[house][color] += costs[house - 1][minColor];
                }
            }
        }
        
        // The answer will now be the minimum of the last row.
        return Math.min(...costs[n - 1]);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \cdot k)$

- Space complexity: $O(1)$

>  Where $n$ is the number of houses in a row, and $k$ is the number of colors available for painting.

---

## 5. Dynamic programming with Optimized Time and Space

::tabs-start

```python
class Solution:
    def minCostII(self, costs: List[List[int]]) -> int:
        n = len(costs)
        if n == 0: return 0 # This is a valid case.
        k = len(costs[0])

        # Firstly, we need to determine the 2 lowest costs of
        # the first row. We also need to remember the color of
        # the lowest.
        prev_min_cost = prev_second_min_cost = prev_min_color = None
        for color, cost in enumerate(costs[0]):
            if prev_min_cost is None or cost < prev_min_cost:
                prev_second_min_cost = prev_min_cost
                prev_min_color = color
                prev_min_cost = cost
            elif prev_second_min_cost is None or cost < prev_second_min_cost:
                prev_second_min_cost = cost

        # And now, we need to work our way down, keeping track of the minimums.
        for house in range(1, n):
            min_cost = second_min_cost = min_color = None
            for color in range(k):
                # Determime cost for this cell (without writing it into input array.)
                cost = costs[house][color]
                if color == prev_min_color:
                    cost += prev_second_min_cost
                else:
                    cost += prev_min_cost
                # And work out whether or not it is a current minimum.
                if min_cost is None or cost < min_cost:
                    second_min_cost = min_cost
                    min_color = color
                    min_cost = cost
                elif second_min_cost is None or cost < second_min_cost:
                    second_min_cost = cost
            # Transfer currents to be prevs.
            prev_min_cost = min_cost
            prev_min_color = min_color
            prev_second_min_cost = second_min_cost

        return prev_min_cost
```

```java
class Solution {

    public int minCostII(int[][] costs) {

        if (costs.length == 0) return 0;
        int k = costs[0].length;
        int n = costs.length;


        /* Firstly, we need to determine the 2 lowest costs of
         * the first row. We also need to remember the color of
         * the lowest. */
        int prevMin = -1; int prevSecondMin = -1; int prevMinColor = -1;
        for (int color = 0; color < k; color++) {
            int cost = costs[0][color];
            if (prevMin == -1 || cost < prevMin) {
                prevSecondMin = prevMin;
                prevMinColor = color;
                prevMin = cost;
            } else if (prevSecondMin == -1 || cost < prevSecondMin) {
                prevSecondMin = cost;
            }
        }

        // And now, we need to work our way down, keeping track of the minimums.
        for (int house = 1; house < n; house++) {
            int min = -1; int secondMin = -1; int minColor = -1;
            for (int color = 0; color < k; color++) {
                // Determine the cost for this cell (without writing it in).
                int cost = costs[house][color];
                if (color == prevMinColor) {
                    cost += prevSecondMin;
                } else {
                    cost += prevMin;
                }
                // Determine whether or not this current cost is also a minimum.
                if (min == -1 || cost < min) {
                    secondMin = min;
                    minColor = color;
                    min = cost;
                } else if (secondMin == -1 || cost < secondMin) {
                    secondMin = cost;
                }
            }
            // Transfer current mins to be previous mins.
            prevMin = min;
            prevSecondMin = secondMin;
            prevMinColor = minColor;
        }

        return prevMin;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \cdot k)$

- Space complexity: $O(1)$

>  Where $n$ is the number of houses in a row, and $k$ is the number of colors available for painting.
