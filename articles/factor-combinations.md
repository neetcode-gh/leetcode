## 1. Backtracking

### Intuition

To find all unique factor combinations of `n`, we use backtracking. At each step, we take the last factor in our current list and try to split it into two smaller factors. By only considering factors greater than or equal to the previous one, we avoid generating duplicate combinations like `[2, 6]` and `[6, 2]`.

The key insight is that if we have a product, we only need to try factors up to the square root of that product. If `i` divides the product, then both `i` and `product/i` are factors, and we recursively continue with `product/i`.

### Algorithm

1. Start with `factors = [n]` and an empty result list.
2. In the backtracking function:
   - If `factors` has more than one element, it represents a valid combination, so add a copy to the result.
   - Pop the last factor (call it `lastFactor`).
   - Determine the starting point: use `2` if `factors` is empty, otherwise use the last remaining factor.
   - For each `i` from the starting point up to `sqrt(lastFactor)`:
     - If `i` divides `lastFactor`, push both `i` and `lastFactor/i`, recurse, then pop both to backtrack.
   - Restore `lastFactor` to `factors` before returning.
3. Return the result list.

::tabs-start

```python
class Solution:
    def _backtracking(self, factors: List[int], ans: List[List[int]]) -> None:
        # Got a solution.
        if len(factors) > 1:
            ans.append(factors.copy())
        
        last_factor = factors.pop()
        
        i = 2 if not factors else factors[-1]
        while i <= last_factor // i:
            if last_factor % i == 0:
                # Add i and last_factor // i.
                factors.append(i)
                factors.append(last_factor // i)
                self._backtracking(factors, ans)
                # Remove the last 2 elements in factors to restore it after the recursion returns.
                factors.pop()
                factors.pop()
            i += 1
        
        # Add last_factor back to factors to restore it.
        factors.append(last_factor)
    
    def getFactors(self, n: int) -> List[List[int]]:
        ans = []
        self._backtracking([n], ans)
        return ans
```

```java
class Solution {
    private void backtracking(final LinkedList<Integer> factors, final List<List<Integer>> ans) {
        // Got a solution.
        if (factors.size() > 1) {
            ans.add(new ArrayList(factors));
        }

        final int lastFactor = factors.removeLast();
        
        for (int i = factors.isEmpty() ? 2 : factors.peekLast(); i <=  lastFactor / i; ++i) {
            if (lastFactor % i == 0) {
                // Add i and lastFactor / i.
                factors.add(i);
                factors.add(lastFactor / i);
                backtracking(factors, ans);
                // Remove the last 2 elements in factors to restore it after the recursion returns.
                factors.removeLast();
                factors.removeLast();
            }
        }

        // Add lastFactor back to factors to restore it.
        factors.add(lastFactor);
    }

    public List<List<Integer>> getFactors(int n) {
        final List<List<Integer>> ans = new LinkedList<>();
        backtracking(new LinkedList<>(Arrays.asList(n)), ans);

        return ans;
    }
}
```

```cpp
class Solution {
    void backtracking(vector<int>& factors, vector<vector<int>>& ans) {
        // Got a solution,
        if (factors.size() > 1) {
            ans.push_back(factors);
        }

        const int lastFactor = factors.back();
        factors.pop_back();

        for (int i = factors.empty() ? 2 : factors.back(); i <= lastFactor / i; ++i) {
            if (lastFactor % i == 0) {
                // Add i and lastFactor / i.
                factors.push_back(i);
                factors.push_back(lastFactor / i);
                backtracking(factors, ans);
                // Remove the last 2 elements in factors to restore it after the recursion returns
                factors.pop_back();
                factors.pop_back();
            }
        }

        // Add lastFactor back to factors to restore it.
        factors.push_back(lastFactor);
    }

public:
    vector<vector<int>> getFactors(int n) {
        vector<int> factors = {n};
        vector<vector<int>> ans;
        backtracking(factors, ans);

        return ans;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} factors
     * @param {number[][]} ans
     */
    _backtracking(factors, ans) {
        // Got a solution.
        if (factors.length > 1) {
            ans.push([...factors]);
        }

        const lastFactor = factors.pop();

        for (let i = factors.length === 0 ? 2 : factors[factors.length - 1]; i <= Math.floor(lastFactor / i); ++i) {
            if (lastFactor % i === 0) {
                // Add i and lastFactor / i.
                factors.push(i);
                factors.push(Math.floor(lastFactor / i));
                this._backtracking(factors, ans);
                // Remove the last 2 elements in factors to restore it after the recursion returns.
                factors.pop();
                factors.pop();
            }
        }

        // Add lastFactor back to factors to restore it.
        factors.push(lastFactor);
    }

    /**
     * @param {number} n
     * @return {number[][]}
     */
    getFactors(n) {
        const ans = [];
        this._backtracking([n], ans);
        return ans;
    }
}
```

```csharp
public class Solution {
    private void Backtracking(List<int> factors, List<IList<int>> ans) {
        // Got a solution.
        if (factors.Count > 1) {
            ans.Add(new List<int>(factors));
        }

        int lastFactor = factors[factors.Count - 1];
        factors.RemoveAt(factors.Count - 1);

        int start = factors.Count == 0 ? 2 : factors[factors.Count - 1];
        for (int i = start; i <= lastFactor / i; i++) {
            if (lastFactor % i == 0) {
                // Add i and lastFactor / i.
                factors.Add(i);
                factors.Add(lastFactor / i);
                Backtracking(factors, ans);
                // Remove the last 2 elements in factors to restore it after the recursion returns.
                factors.RemoveAt(factors.Count - 1);
                factors.RemoveAt(factors.Count - 1);
            }
        }

        // Add lastFactor back to factors to restore it.
        factors.Add(lastFactor);
    }

    public IList<IList<int>> GetFactors(int n) {
        List<IList<int>> ans = new List<IList<int>>();
        Backtracking(new List<int> { n }, ans);
        return ans;
    }
}
```

```go
func getFactors(n int) [][]int {
    ans := [][]int{}

    var backtracking func(factors []int)
    backtracking = func(factors []int) {
        // Got a solution.
        if len(factors) > 1 {
            tmp := make([]int, len(factors))
            copy(tmp, factors)
            ans = append(ans, tmp)
        }

        lastFactor := factors[len(factors)-1]
        factors = factors[:len(factors)-1]

        start := 2
        if len(factors) > 0 {
            start = factors[len(factors)-1]
        }
        for i := start; i <= lastFactor/i; i++ {
            if lastFactor%i == 0 {
                // Add i and lastFactor / i.
                factors = append(factors, i)
                factors = append(factors, lastFactor/i)
                backtracking(factors)
                // Remove the last 2 elements in factors to restore it after the recursion returns.
                factors = factors[:len(factors)-2]
            }
        }

        // Add lastFactor back to factors to restore it.
        factors = append(factors, lastFactor)
    }

    backtracking([]int{n})
    return ans
}
```

```kotlin
class Solution {
    private fun backtracking(factors: MutableList<Int>, ans: MutableList<List<Int>>) {
        // Got a solution.
        if (factors.size > 1) {
            ans.add(factors.toList())
        }

        val lastFactor = factors.removeAt(factors.size - 1)

        val start = if (factors.isEmpty()) 2 else factors[factors.size - 1]
        var i = start
        while (i <= lastFactor / i) {
            if (lastFactor % i == 0) {
                // Add i and lastFactor / i.
                factors.add(i)
                factors.add(lastFactor / i)
                backtracking(factors, ans)
                // Remove the last 2 elements in factors to restore it after the recursion returns.
                factors.removeAt(factors.size - 1)
                factors.removeAt(factors.size - 1)
            }
            i++
        }

        // Add lastFactor back to factors to restore it.
        factors.add(lastFactor)
    }

    fun getFactors(n: Int): List<List<Int>> {
        val ans = mutableListOf<List<Int>>()
        backtracking(mutableListOf(n), ans)
        return ans
    }
}
```

```swift
class Solution {
    func getFactors(_ n: Int) -> [[Int]] {
        var ans = [[Int]]()

        func backtracking(_ factors: inout [Int]) {
            // Got a solution.
            if factors.count > 1 {
                ans.append(factors)
            }

            let lastFactor = factors.removeLast()

            let start = factors.isEmpty ? 2 : factors[factors.count - 1]
            var i = start
            while i <= lastFactor / i {
                if lastFactor % i == 0 {
                    // Add i and lastFactor / i.
                    factors.append(i)
                    factors.append(lastFactor / i)
                    backtracking(&factors)
                    // Remove the last 2 elements in factors to restore it after the recursion returns.
                    factors.removeLast()
                    factors.removeLast()
                }
                i += 1
            }

            // Add lastFactor back to factors to restore it.
            factors.append(lastFactor)
        }

        var initial = [n]
        backtracking(&initial)
        return ans
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n^{1.5})$

- Space complexity: $O(\log (n))$

>  Where $n$ is the input integer `n`.

---

## 2. Iterative DFS

### Intuition

The iterative approach uses an explicit stack instead of recursion. Each stack entry contains the current list of factors being built. We pop a state, extract its last factor, and try all valid ways to split it into two smaller factors.

This approach creates new factor lists for each branch rather than modifying and restoring a single list, which simplifies the logic but uses more memory.

### Algorithm

1. Initialize a stack with `[n]` and an empty result list.
2. While the stack is not empty:
   - Pop a factor list and extract its last element as `lastFactor`.
   - Determine the starting point: `2` if empty, otherwise the last remaining factor.
   - For each `i` from the starting point up to `sqrt(lastFactor)`:
     - If `i` divides `lastFactor`, create a new list with the remaining factors plus `i` and `lastFactor/i`.
     - Push this new list onto the stack and add it to the result.
3. Return the result list.

::tabs-start

```java
class Solution {
    public List<List<Integer>> getFactors(int n) {

        final List<List<Integer>> ans = new LinkedList<>();
        final Stack<LinkedList<Integer>> stack = new Stack<>();
        stack.push(new LinkedList<>(new LinkedList<>(Arrays.asList(n))));

        while (!stack.isEmpty()) {
            final LinkedList<Integer> factors = stack.pop();
            final int lastFactor = factors.removeLast();
            
            for (int i = factors.isEmpty() ? 2 : factors.peekLast(); i <=  lastFactor / i; ++i) {
                if (lastFactor % i == 0) {
                    // Add i and lastFactor / i.
                    LinkedList<Integer> newFactors = new LinkedList<>(factors);
                    newFactors.add(i);
                    newFactors.add(lastFactor / i);
                    stack.push(newFactors);
                    ans.add(new LinkedList<>(newFactors));
                }
            }
        }

        return ans;
    }
}
```

```cpp
class Solution {
public:
    vector<vector<int>> getFactors(int n) {
        vector<vector<int>> ans;
        stack<vector<int>> stack;
        stack.push({n});

        while (!stack.empty()) {
            auto factors = stack.top();
            stack.pop();
            const int lastFactor = factors.back();
            factors.pop_back();

            for (int i = factors.empty() ? 2 : factors.back(); i <= lastFactor / i; ++i) {
                if (lastFactor % i == 0) {
                    vector<int> newFactors = factors;
                    newFactors.push_back(i);
                    newFactors.push_back(lastFactor / i);
                    stack.push(newFactors);
                    ans.push_back(newFactors);
                }
            }
        }

        return ans;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @return {number[][]}
     */
    getFactors(n) {
        const ans = [];
        const stack = [[n]];

        while (stack.length > 0) {
            const factors = stack.pop();
            const lastFactor = factors.pop();

            const start = factors.length === 0 ? 2 : factors[factors.length - 1];
            for (let i = start; i <= Math.floor(lastFactor / i); i++) {
                if (lastFactor % i === 0) {
                    const newFactors = [...factors, i, Math.floor(lastFactor / i)];
                    stack.push(newFactors);
                    ans.push(newFactors);
                }
            }
        }

        return ans;
    }
}
```

```csharp
public class Solution {
    public IList<IList<int>> GetFactors(int n) {
        List<IList<int>> ans = new List<IList<int>>();
        Stack<List<int>> stack = new Stack<List<int>>();
        stack.Push(new List<int> { n });

        while (stack.Count > 0) {
            List<int> factors = stack.Pop();
            int lastFactor = factors[factors.Count - 1];
            factors.RemoveAt(factors.Count - 1);

            int start = factors.Count == 0 ? 2 : factors[factors.Count - 1];
            for (int i = start; i <= lastFactor / i; i++) {
                if (lastFactor % i == 0) {
                    List<int> newFactors = new List<int>(factors);
                    newFactors.Add(i);
                    newFactors.Add(lastFactor / i);
                    stack.Push(newFactors);
                    ans.Add(new List<int>(newFactors));
                }
            }
        }

        return ans;
    }
}
```

```go
func getFactors(n int) [][]int {
    ans := [][]int{}
    stack := [][]int{{n}}

    for len(stack) > 0 {
        factors := stack[len(stack)-1]
        stack = stack[:len(stack)-1]
        lastFactor := factors[len(factors)-1]
        factors = factors[:len(factors)-1]

        start := 2
        if len(factors) > 0 {
            start = factors[len(factors)-1]
        }
        for i := start; i <= lastFactor/i; i++ {
            if lastFactor%i == 0 {
                newFactors := make([]int, len(factors))
                copy(newFactors, factors)
                newFactors = append(newFactors, i, lastFactor/i)
                stack = append(stack, newFactors)
                result := make([]int, len(newFactors))
                copy(result, newFactors)
                ans = append(ans, result)
            }
        }
    }

    return ans
}
```

```kotlin
class Solution {
    fun getFactors(n: Int): List<List<Int>> {
        val ans = mutableListOf<List<Int>>()
        val stack = ArrayDeque<MutableList<Int>>()
        stack.add(mutableListOf(n))

        while (stack.isNotEmpty()) {
            val factors = stack.removeLast()
            val lastFactor = factors.removeAt(factors.size - 1)

            val start = if (factors.isEmpty()) 2 else factors[factors.size - 1]
            var i = start
            while (i <= lastFactor / i) {
                if (lastFactor % i == 0) {
                    val newFactors = factors.toMutableList()
                    newFactors.add(i)
                    newFactors.add(lastFactor / i)
                    stack.add(newFactors.toMutableList())
                    ans.add(newFactors.toList())
                }
                i++
            }
        }

        return ans
    }
}
```

```swift
class Solution {
    func getFactors(_ n: Int) -> [[Int]] {
        var ans = [[Int]]()
        var stack = [[n]]

        while !stack.isEmpty {
            var factors = stack.removeLast()
            let lastFactor = factors.removeLast()

            let start = factors.isEmpty ? 2 : factors[factors.count - 1]
            var i = start
            while i <= lastFactor / i {
                if lastFactor % i == 0 {
                    var newFactors = factors
                    newFactors.append(i)
                    newFactors.append(lastFactor / i)
                    stack.append(newFactors)
                    ans.append(newFactors)
                }
                i += 1
            }
        }

        return ans
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n^{1.5})$

- Space complexity: $O(n \cdot \log (n))$

>  Where $n$ is the input integer `n`.

---

## Common Pitfalls

### Generating Duplicate Combinations

A common mistake is generating duplicate factor combinations like `[2, 6]` and `[6, 2]`. To avoid this, always ensure factors are added in non-decreasing order by only considering factors greater than or equal to the previous factor in the current combination.

### Including 1 or n as Factors

The problem explicitly excludes `1` and `n` itself as valid factors. Forgetting this constraint leads to including trivial factorizations like `[1, n]` or just `[n]` in the result. Always start factor candidates from `2` and stop before reaching `n`.

### Inefficient Factor Search

Searching for factors up to `n` instead of `sqrt(n)` leads to unnecessary iterations. Since factors come in pairs (if `i` divides `n`, then `n/i` also divides `n`), you only need to check up to the square root of the current product to find all factor pairs efficiently.
