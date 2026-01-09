## 1. Brute Force

### Intuition

A building has an ocean view if no building to its right is taller or equal in height. The ocean is to the right of all buildings. The simplest approach is to check each building individually: for every building, scan all buildings to its right and see if any of them block the view.

### Algorithm

1. Iterate through each building from left to right.
2. For each building at index i, check all buildings from index i+1 to the end.
3. If any building to the right has height greater than or equal to the current building, mark this building as having no ocean view.
4. If no taller or equal building is found to the right, add this index to the result.
5. Return all indices of buildings with ocean views.

::tabs-start

```python
class Solution:
    def findBuildings(self, heights: List[int]) -> List[int]:
        n = len(heights)
        res = []

        for i in range(n):
            flag = True
            for j in range(i + 1, n):
                if heights[i] <= heights[j]:
                    flag = False
                    break
            if flag:
                res.append(i)

        return res
```

```java
public class Solution {
    public int[] findBuildings(int[] heights) {
        int n = heights.length;
        List<Integer> temp = new ArrayList<>();

        for (int i = 0; i < n; i++) {
            boolean flag = true;
            for (int j = i + 1; j < n; j++) {
                if (heights[i] <= heights[j]) {
                    flag = false;
                    break;
                }
            }
            if (flag) temp.add(i);
        }

        int[] res = new int[temp.size()];
        for (int i = 0; i < temp.size(); i++) {
            res[i] = temp.get(i);
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> findBuildings(vector<int>& heights) {
        int n = heights.size();
        vector<int> res;

        for (int i = 0; i < n; i++) {
            bool flag = true;
            for (int j = i + 1; j < n; j++) {
                if (heights[i] <= heights[j]) {
                    flag = false;
                    break;
                }
            }
            if (flag) res.push_back(i);
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} heights
     * @return {number[]}
     */
    findBuildings(heights) {
        const n = heights.length;
        const res = [];

        for (let i = 0; i < n; i++) {
            let flag = true;
            for (let j = i + 1; j < n; j++) {
                if (heights[i] <= heights[j]) {
                    flag = false;
                    break;
                }
            }
            if (flag) res.push(i);
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int[] FindBuildings(int[] heights) {
        int n = heights.Length;
        List<int> temp = new List<int>();

        for (int i = 0; i < n; i++) {
            bool flag = true;
            for (int j = i + 1; j < n; j++) {
                if (heights[i] <= heights[j]) {
                    flag = false;
                    break;
                }
            }
            if (flag) temp.Add(i);
        }

        return temp.ToArray();
    }
}
```

```go
func findBuildings(heights []int) []int {
    n := len(heights)
    res := []int{}

    for i := 0; i < n; i++ {
        flag := true
        for j := i + 1; j < n; j++ {
            if heights[i] <= heights[j] {
                flag = false
                break
            }
        }
        if flag {
            res = append(res, i)
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun findBuildings(heights: IntArray): IntArray {
        val n = heights.size
        val res = mutableListOf<Int>()

        for (i in 0 until n) {
            var flag = true
            for (j in i + 1 until n) {
                if (heights[i] <= heights[j]) {
                    flag = false
                    break
                }
            }
            if (flag) res.add(i)
        }

        return res.toIntArray()
    }
}
```

```swift
class Solution {
    func findBuildings(_ heights: [Int]) -> [Int] {
        let n = heights.count
        var res = [Int]()

        for i in 0..<n {
            var flag = true
            for j in (i + 1)..<n {
                if heights[i] <= heights[j] {
                    flag = false
                    break
                }
            }
            if flag {
                res.append(i)
            }
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n)$ for the output array.

---

## 2. Monotonic Stack

### Intuition

We can use a monotonic decreasing stack to efficiently track buildings with ocean views. As we scan from left to right, whenever we encounter a building that is taller than or equal to the building at the top of the stack, the stack building loses its ocean view (because this new building blocks it). We pop such buildings and push the current one. The remaining buildings in the stack at the end all have ocean views.

### Algorithm

1. Initialize an empty stack to store building indices.
2. Iterate through buildings from left to right.
3. While the stack is not empty and the current building's height is greater than or equal to the height of the building at the stack top:
   - Pop from the stack (that building no longer has an ocean view).
4. Push the current building index onto the stack.
5. Return the stack contents as the result (indices are already in increasing order).

::tabs-start

```python
class Solution:
    def findBuildings(self, heights: List[int]) -> List[int]:
        stack = []

        for i, h in enumerate(heights):
            while stack and heights[stack[-1]] <= h:
                stack.pop()
            stack.append(i)

        return stack
```

```java
public class Solution {
    public int[] findBuildings(int[] heights) {
        int n = heights.length;
        Stack<Integer> stack = new Stack<>();

        for (int i = 0; i < n; i++) {
            while (!stack.isEmpty() && heights[stack.peek()] <= heights[i]) {
                stack.pop();
            }
            stack.push(i);
        }

        int[] res = new int[stack.size()];
        for (int i = stack.size() - 1; i >= 0; i--) {
            res[i] = stack.get(i);
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> findBuildings(vector<int>& heights) {
        vector<int> stack;

        for (int i = 0; i < heights.size(); i++) {
            while (!stack.empty() && heights[stack.back()] <= heights[i]) {
                stack.pop_back();
            }
            stack.push_back(i);
        }

        return stack;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} heights
     * @return {number[]}
     */
    findBuildings(heights) {
        const stack = [];

        for (let i = 0; i < heights.length; i++) {
            while (
                stack.length &&
                heights[stack[stack.length - 1]] <= heights[i]
            ) {
                stack.pop();
            }
            stack.push(i);
        }

        return stack;
    }
}
```

```csharp
public class Solution {
    public int[] FindBuildings(int[] heights) {
        List<int> stack = new List<int>();

        for (int i = 0; i < heights.Length; i++) {
            while (stack.Count > 0 && heights[stack[stack.Count - 1]] <= heights[i]) {
                stack.RemoveAt(stack.Count - 1);
            }
            stack.Add(i);
        }

        return stack.ToArray();
    }
}
```

```go
func findBuildings(heights []int) []int {
    stack := []int{}

    for i, h := range heights {
        for len(stack) > 0 && heights[stack[len(stack)-1]] <= h {
            stack = stack[:len(stack)-1]
        }
        stack = append(stack, i)
    }

    return stack
}
```

```kotlin
class Solution {
    fun findBuildings(heights: IntArray): IntArray {
        val stack = mutableListOf<Int>()

        for (i in heights.indices) {
            while (stack.isNotEmpty() && heights[stack.last()] <= heights[i]) {
                stack.removeAt(stack.size - 1)
            }
            stack.add(i)
        }

        return stack.toIntArray()
    }
}
```

```swift
class Solution {
    func findBuildings(_ heights: [Int]) -> [Int] {
        var stack = [Int]()

        for i in 0..<heights.count {
            while !stack.isEmpty && heights[stack.last!] <= heights[i] {
                stack.removeLast()
            }
            stack.append(i)
        }

        return stack
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 3. Greedy

### Intuition

The most elegant approach is to scan from right to left. A building has an ocean view if it is strictly taller than every building to its right. We only need to track the maximum height seen so far as we traverse from the rightmost building toward the left.

### Algorithm

1. Start from the rightmost building (it always has an ocean view) and add it to the result.
2. Move leftward through the buildings.
3. For each building, if its height is greater than the height of the last building added to our result (which represents the tallest building seen so far), add this building to the result.
4. Reverse the result since we collected indices from right to left but need them in increasing order.
5. Return the result.

::tabs-start

```python
class Solution:
    def findBuildings(self, heights: List[int]) -> List[int]:
        res = [len(heights) - 1]
        for i in range(len(heights) - 2, -1, -1):
            if heights[i] > heights[res[-1]]:
                res.append(i)
        res.reverse()
        return res
```

```java
public class Solution {
    public int[] findBuildings(int[] heights) {
        List<Integer> res = new ArrayList<>();
        int n = heights.length;
        res.add(n - 1);

        for (int i = n - 2; i >= 0; i--) {
            if (heights[i] > heights[res.get(res.size() - 1)]) {
                res.add(i);
            }
        }

        Collections.reverse(res);
        int[] ans = new int[res.size()];
        for (int i = 0; i < res.size(); i++) {
            ans[i] = res.get(i);
        }

        return ans;
    }
}
```

```cpp
class Solution {
public:
    vector<int> findBuildings(vector<int>& heights) {
        vector<int> res;
        int n = heights.size();
        res.push_back(n - 1);

        for (int i = n - 2; i >= 0; i--) {
            if (heights[i] > heights[res.back()]) {
                res.push_back(i);
            }
        }

        reverse(res.begin(), res.end());
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} heights
     * @return {number[]}
     */
    findBuildings(heights) {
        const n = heights.length;
        const res = [n - 1];

        for (let i = n - 2; i >= 0; i--) {
            if (heights[i] > heights[res[res.length - 1]]) {
                res.push(i);
            }
        }

        return res.reverse();
    }
}
```

```csharp
public class Solution {
    public int[] FindBuildings(int[] heights) {
        int n = heights.Length;
        List<int> res = new List<int> { n - 1 };

        for (int i = n - 2; i >= 0; i--) {
            if (heights[i] > heights[res[res.Count - 1]]) {
                res.Add(i);
            }
        }

        res.Reverse();
        return res.ToArray();
    }
}
```

```go
func findBuildings(heights []int) []int {
    n := len(heights)
    res := []int{n - 1}

    for i := n - 2; i >= 0; i-- {
        if heights[i] > heights[res[len(res)-1]] {
            res = append(res, i)
        }
    }

    for i, j := 0, len(res)-1; i < j; i, j = i+1, j-1 {
        res[i], res[j] = res[j], res[i]
    }
    return res
}
```

```kotlin
class Solution {
    fun findBuildings(heights: IntArray): IntArray {
        val n = heights.size
        val res = mutableListOf(n - 1)

        for (i in n - 2 downTo 0) {
            if (heights[i] > heights[res.last()]) {
                res.add(i)
            }
        }

        res.reverse()
        return res.toIntArray()
    }
}
```

```swift
class Solution {
    func findBuildings(_ heights: [Int]) -> [Int] {
        let n = heights.count
        var res = [n - 1]

        for i in stride(from: n - 2, through: 0, by: -1) {
            if heights[i] > heights[res.last!] {
                res.append(i)
            }
        }

        res.reverse()
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity:
    - $O(1)$ extra space.
    - $O(n)$ for the output array.
