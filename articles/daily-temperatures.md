## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Monotonic Stack** - Using a stack that maintains elements in increasing or decreasing order to efficiently find the next greater element
- **Array Traversal** - Iterating through arrays both forward and backward to compute results
- **Dynamic Programming (Basic)** - Reusing previously computed results to skip unnecessary comparisons

---

## 1. Brute Force

### Intuition

For each day, we simply look forward to find the next day with a higher temperature.  
We compare the current day with every future day until we either find a warmer one or reach the end.  
If we find a warmer day, we record how many days it took.  
If not, the answer is `0`.  
This method is easy to understand but slow because every day may scan many days ahead.

### Algorithm

1. Let `res` store the number of days until a warmer temperature.
2. For each index `i`:
   - Start checking from the next day `j = i + 1` and count how many steps it takes to find a warmer day.
   - If a warmer day is found, store the count.
   - Otherwise, store `0`.
3. Return the result array.

::tabs-start

```python
class Solution:
    def dailyTemperatures(self, temperatures: List[int]) -> List[int]:
        n = len(temperatures)
        res = []

        for i in range(n):
            count = 1
            j = i + 1
            while j < n:
                if temperatures[j] > temperatures[i]:
                    break
                j += 1
                count += 1
            count = 0 if j == n else count
            res.append(count)
        return res
```

```java
public class Solution {
    public int[] dailyTemperatures(int[] temperatures) {
        int n = temperatures.length;
        int[] res = new int[n];

        for (int i = 0; i < n; i++) {
            int count = 1;
            int j = i + 1;
            while (j < n) {
                if (temperatures[j] > temperatures[i]) {
                    break;
                }
                j++;
                count++;
            }
            count = (j == n) ? 0 : count;
            res[i] = count;
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> dailyTemperatures(vector<int>& temperatures) {
        int n = temperatures.size();
        vector<int> res(n);

        for (int i = 0; i < n; i++) {
            int count = 1;
            int j = i + 1;
            while (j < n) {
                if (temperatures[j] > temperatures[i]) {
                    break;
                }
                j++;
                count++;
            }
            count = (j == n) ? 0 : count;
            res[i] = count;
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} temperatures
     * @return {number[]}
     */
    dailyTemperatures(temperatures) {
        const n = temperatures.length;
        const res = new Array(n).fill(0);

        for (let i = 0; i < n; i++) {
            let count = 1;
            let j = i + 1;
            while (j < n) {
                if (temperatures[j] > temperatures[i]) {
                    break;
                }
                j++;
                count++;
            }
            count = j === n ? 0 : count;
            res[i] = count;
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int[] DailyTemperatures(int[] temperatures) {
        int n = temperatures.Length;
        int[] res = new int[n];

        for (int i = 0; i < n; i++) {
            int count = 1;
            int j = i + 1;
            while (j < n) {
                if (temperatures[j] > temperatures[i]) {
                    break;
                }
                j++;
                count++;
            }
            count = (j == n) ? 0 : count;
            res[i] = count;
        }
        return res;
    }
}
```

```go
func dailyTemperatures(temperatures []int) []int {
   n := len(temperatures)
   res := make([]int, 0)

   for i := 0; i < n; i++ {
       count := 1
       j := i + 1

       for j < n {
           if temperatures[j] > temperatures[i] {
               break
           }
           j++
           count++
       }

       if j == n {
           count = 0
       }

       res = append(res, count)
   }

   return res
}
```

```kotlin
class Solution {
    fun dailyTemperatures(temperatures: IntArray): IntArray {
        val n = temperatures.size
        val res = mutableListOf<Int>()

        for (i in 0 until n) {
            var count = 1
            var j = i + 1

            while (j < n) {
                if (temperatures[j] > temperatures[i]) {
                    break
                }
                j++
                count++
            }

            count = if (j == n) 0 else count
            res.add(count)
        }

        return res.toIntArray()
    }
}
```

```swift
class Solution {
    func dailyTemperatures(_ temperatures: [Int]) -> [Int] {
        let n = temperatures.count
        var res = [Int]()

        for i in 0..<n {
            var count = 1
            var j = i + 1
            while j < n {
                if temperatures[j] > temperatures[i] {
                    break
                }
                j += 1
                count += 1
            }
            count = (j == n) ? 0 : count
            res.append(count)
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity:
    - $O(1)$ extra space.
    - $O(n)$ space for the output array.

---

## 2. Stack

### Intuition

We want to know how long it takes until a warmer day for each temperature.  
A **stack** helps because it keeps track of days that are still waiting for a warmer temperature.  
As we scan forward, whenever we find a temperature higher than the one on top of the stack, it means we just discovered the “next warmer day” for that earlier day.  
We pop it, compute the difference in days, and continue.  
This way, each day is pushed and popped at most once, making the process efficient.

### Algorithm

1. Create a result list filled with zeros.
2. Use a stack to store pairs of (temperature, index) for days that haven't found a warmer day yet.
3. Iterate through the temperature list:
   - While the stack is not empty **and** the current temperature is warmer than the top of the stack:
     - Pop the top element.
     - Compute how many days passed and update the result.
   - Push the current day onto the stack.
4. Return the filled result list.

::tabs-start

```python
class Solution:
    def dailyTemperatures(self, temperatures: List[int]) -> List[int]:
        res = [0] * len(temperatures)
        stack = []  # pair: [temp, index]

        for i, t in enumerate(temperatures):
            while stack and t > stack[-1][0]:
                stackT, stackInd = stack.pop()
                res[stackInd] = i - stackInd
            stack.append((t, i))
        return res
```

```java
public class Solution {
    public int[] dailyTemperatures(int[] temperatures) {
        int[] res = new int[temperatures.length];
        Stack<int[]> stack = new Stack<>(); // pair: [temp, index]

        for (int i = 0; i < temperatures.length; i++) {
            int t = temperatures[i];
            while (!stack.isEmpty() && t > stack.peek()[0]) {
                int[] pair = stack.pop();
                res[pair[1]] = i - pair[1];
            }
            stack.push(new int[]{t, i});
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> dailyTemperatures(vector<int>& temperatures) {
        vector<int> res(temperatures.size(), 0);
        stack<pair<int, int>> stack; // pair: {temp, index}

        for (int i = 0; i < temperatures.size(); i++) {
            int t = temperatures[i];
            while (!stack.empty() && t > stack.top().first) {
                auto pair = stack.top();
                stack.pop();
                res[pair.second] = i - pair.second;
            }
            stack.push({t, i});
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} temperatures
     * @return {number[]}
     */
    dailyTemperatures(temperatures) {
        const res = new Array(temperatures.length).fill(0);
        const stack = []; // pair: [temp, index]

        for (let i = 0; i < temperatures.length; i++) {
            const t = temperatures[i];
            while (stack.length > 0 && t > stack[stack.length - 1][0]) {
                const [stackT, stackInd] = stack.pop();
                res[stackInd] = i - stackInd;
            }
            stack.push([t, i]);
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int[] DailyTemperatures(int[] temperatures) {
        int[] res = new int[temperatures.Length];
        Stack<int[]> stack = new Stack<int[]>(); // pair: [temp, index]

        for (int i = 0; i < temperatures.Length; i++) {
            int t = temperatures[i];
            while (stack.Count > 0 && t > stack.Peek()[0]) {
                int[] pair = stack.Pop();
                res[pair[1]] = i - pair[1];
            }
            stack.Push(new int[] { t, i });
        }
        return res;
    }
}
```

```go
func dailyTemperatures(temperatures []int) []int {
    res := make([]int, len(temperatures))
    stack := []int{}

    for i, t := range temperatures {
        for len(stack) > 0 && t > temperatures[stack[len(stack)-1]] {
            stackInd := stack[len(stack)-1]
            stack = stack[:len(stack)-1]
            res[stackInd] = i - stackInd
        }
        stack = append(stack, i)
    }

    return res
}
```

```kotlin
class Solution {
    fun dailyTemperatures(temperatures: IntArray): IntArray {
        val res = IntArray(temperatures.size) { 0 }
        val stack = mutableListOf<Int>()

        for (i in temperatures.indices) {
            while (stack.isNotEmpty() && temperatures[i] > temperatures[stack.last()]) {
                val stackInd = stack.removeAt(stack.size - 1)
                res[stackInd] = i - stackInd
            }
            stack.add(i)
        }

        return res
    }
}
```

```swift
class Solution {
    func dailyTemperatures(_ temperatures: [Int]) -> [Int] {
        var res = [Int](repeating: 0, count: temperatures.count)
        var stack = [(Int, Int)]() // Pair: (temperature, index)

        for (i, t) in temperatures.enumerated() {
            while !stack.isEmpty && t > stack.last!.0 {
                let (stackT, stackInd) = stack.removeLast()
                res[stackInd] = i - stackInd
            }
            stack.append((t, i))
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 3. Dynamic Programming

### Intuition

Instead of checking every future day one by one, we can **reuse previously computed answers**.  
If day `j` is not warmer than day `i`, we don’t need to move forward step-by-step — we can simply **jump** ahead by using the result already stored for day `j`.  
This lets us skip many unnecessary comparisons.  
By working backward and using these jumps, we efficiently find the next warmer day for each position.

### Algorithm

1. Create a result list filled with zeros.
2. Traverse the temperature list from right to left.
3. For each day `i`:
   - Start with the next day `j = i + 1`.
   - While `j` is within bounds and not warmer:
     - If `res[j]` is `0`, there is no warmer day ahead → stop.
     - Otherwise, **jump forward** by `res[j]` days.
   - If `j` is within bounds and warmer, set `res[i]` to `j - i`.
4. Return `res`.

::tabs-start

```python
class Solution:
    def dailyTemperatures(self, temperatures: List[int]) -> List[int]:
        n = len(temperatures)
        res = [0] * n

        for i in range(n - 2, -1, -1):
            j = i + 1
            while j < n and temperatures[j] <= temperatures[i]:
                if res[j] == 0:
                    j = n
                    break
                j += res[j]

            if j < n:
                res[i] = j - i
        return res
```

```java
public class Solution {
    public int[] dailyTemperatures(int[] temperatures) {
        int n = temperatures.length;
        int[] res = new int[n];

        for (int i = n - 2; i >= 0; i--) {
            int j = i + 1;
            while (j < n && temperatures[j] <= temperatures[i]) {
                if (res[j] == 0) {
                    j = n;
                    break;
                }
                j += res[j];
            }

            if (j < n) {
                res[i] = j - i;
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> dailyTemperatures(vector<int>& temperatures) {
        int n = temperatures.size();
        vector<int> res(n, 0);

        for (int i = n - 2; i >= 0; i--) {
            int j = i + 1;
            while (j < n && temperatures[j] <= temperatures[i]) {
                if (res[j] == 0) {
                    j = n;
                    break;
                }
                j += res[j];
            }

            if (j < n) {
                res[i] = j - i;
            }
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} temperatures
     * @return {number[]}
     */
    dailyTemperatures(temperatures) {
        const n = temperatures.length;
        const res = new Array(n).fill(0);

        for (let i = n - 2; i >= 0; i--) {
            let j = i + 1;
            while (j < n && temperatures[j] <= temperatures[i]) {
                if (res[j] === 0) {
                    j = n;
                    break;
                }
                j += res[j];
            }

            if (j < n) {
                res[i] = j - i;
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int[] DailyTemperatures(int[] temperatures) {
        int n = temperatures.Length;
        int[] res = new int[n];

        for (int i = n - 2; i >= 0; i--) {
            int j = i + 1;
            while (j < n && temperatures[j] <= temperatures[i]) {
                if (res[j] == 0) {
                    j = n;
                    break;
                }
                j += res[j];
            }

            if (j < n) {
                res[i] = j - i;
            }
        }
        return res;
    }
}
```

```go
func dailyTemperatures(temperatures []int) []int {
    n := len(temperatures)
    res := make([]int, n)

    for i := n - 2; i >= 0; i-- {
        j := i + 1
        for j < n && temperatures[j] <= temperatures[i] {
            if res[j] == 0 {
                j = n
                break
            }
            j += res[j]
        }

        if j < n {
            res[i] = j - i
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun dailyTemperatures(temperatures: IntArray): IntArray {
        val n = temperatures.size
        val res = IntArray(n)

        for (i in n - 2 downTo 0) {
            var j = i + 1
            while (j < n && temperatures[j] <= temperatures[i]) {
                if (res[j] == 0) {
                    j = n
                    break
                }
                j += res[j]
            }

            if (j < n) {
                res[i] = j - i
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func dailyTemperatures(_ temperatures: [Int]) -> [Int] {
        let n = temperatures.count
        var res = [Int](repeating: 0, count: n)

        for i in stride(from: n - 2, through: 0, by: -1) {
            var j = i + 1
            while j < n && temperatures[j] <= temperatures[i] {
                if res[j] == 0 {
                    j = n
                    break
                }
                j += res[j]
            }

            if j < n {
                res[i] = j - i
            }
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity:
    - $O(1)$ extra space.
    - $O(n)$ space for the output array.

---

## Common Pitfalls

### Using Greater-Than-or-Equal Instead of Strictly Greater

The problem asks for the next **warmer** day, meaning strictly greater temperature. Using `>=` instead of `>` causes the algorithm to stop at equal temperatures, producing incorrect results.

```python
# Wrong: stops at equal temperatures
while stack and t >= stack[-1][0]:
    # This pops when temperatures are equal, not just warmer

# Correct: strictly greater
while stack and t > stack[-1][0]:
    stackT, stackInd = stack.pop()
    res[stackInd] = i - stackInd
```

### Storing Only Indices Without Temperature Access

When using a stack, you need to compare temperatures. Storing only indices works if you can access `temperatures[index]`, but mixing up index and value access leads to comparison errors.

```python
# Correct: store just indices but access temperature via array
stack = []  # stores indices
for i, t in enumerate(temperatures):
    while stack and t > temperatures[stack[-1]]:
        idx = stack.pop()
        res[idx] = i - idx
    stack.append(i)
```

### Off-by-One Errors in Day Counting

The result should be the number of days to wait, which is the difference in indices. Initializing count wrong or miscalculating the difference leads to off-by-one errors.

```python
# Wrong: starting count at 0
count = 0
j = i + 1
while j < n and temperatures[j] <= temperatures[i]:
    j += 1
    count += 1  # count is now j - i - 1, off by one

# Correct: difference of indices
res[i] = j - i  # Direct index difference gives correct wait days
```
