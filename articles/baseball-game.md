## 1. Stack - I

### Intuition

A stack is perfect for this problem because each operation depends on the most recent scores. When we see `+`, we need the last two scores. When we see `D`, we need the last score. When we see `C`, we need to remove the last score. A stack gives us efficient access to these recent elements.

### Algorithm

1. Initialize an empty stack to store valid scores.
2. For each operation:
   - If it's `+`, add the sum of the top two elements to the stack.
   - If it's `D`, add double the top element to the stack.
   - If it's `C`, pop the top element.
   - Otherwise, it's a number, so push it onto the stack.
3. Return the sum of all elements in the stack.

::tabs-start

```python
class Solution:
    def calPoints(self, operations: List[str]) -> int:
        stack = []
        for op in operations:
            if op == "+":
                stack.append(stack[-1] + stack[-2])
            elif op == "D":
                stack.append(2 * stack[-1])
            elif op == "C":
                stack.pop()
            else:
                stack.append(int(op))
        return sum(stack)
```

```java
public class Solution {
    public int calPoints(String[] operations) {
        Stack<Integer> stack = new Stack<>();
        for (String op : operations) {
            if (op.equals("+")) {
                int top = stack.pop();
                int newTop = top + stack.peek();
                stack.push(top);
                stack.push(newTop);
            } else if (op.equals("D")) {
                stack.push(2 * stack.peek());
            } else if (op.equals("C")) {
                stack.pop();
            } else {
                stack.push(Integer.parseInt(op));
            }
        }
        int sum = 0;
        for (int score : stack) {
            sum += score;
        }
        return sum;
    }
}
```

```cpp
class Solution {
public:
    int calPoints(vector<string>& operations) {
        vector<int> stack;
        for (const string& op : operations) {
            if (op == "+") {
                int top = stack.back(); stack.pop_back();
                int newTop = top + stack.back();
                stack.push_back(top);
                stack.push_back(newTop);
            } else if (op == "D") {
                stack.push_back(2 * stack.back());
            } else if (op == "C") {
                stack.pop_back();
            } else {
                stack.push_back(stoi(op));
            }
        }
        return accumulate(stack.begin(), stack.end(), 0);
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[]} operations
     * @return {number}
     */
    calPoints(operations) {
        const stack = [];
        for (const op of operations) {
            if (op === '+') {
                const top = stack.pop();
                const newTop = top + stack[stack.length - 1];
                stack.push(top);
                stack.push(newTop);
            } else if (op === 'D') {
                stack.push(2 * stack[stack.length - 1]);
            } else if (op === 'C') {
                stack.pop();
            } else {
                stack.push(parseInt(op));
            }
        }
        return stack.reduce((a, b) => a + b, 0);
    }
}
```

```csharp
public class Solution {
    public int CalPoints(string[] operations) {
        Stack<int> stack = new Stack<int>();

        foreach (var op in operations) {
            if (op == "+") {
                int top = stack.Pop();
                int newTop = top + stack.Peek();
                stack.Push(top);
                stack.Push(newTop);
            } else if (op == "D") {
                stack.Push(2 * stack.Peek());
            } else if (op == "C") {
                stack.Pop();
            } else {
                stack.Push(int.Parse(op));
            }
        }

        int total = 0;
        foreach (var val in stack) {
            total += val;
        }

        return total;
    }
}
```

```go
func calPoints(operations []string) int {
    stack := []int{}
    for _, op := range operations {
        if op == "+" {
            n := len(stack)
            stack = append(stack, stack[n-1]+stack[n-2])
        } else if op == "D" {
            stack = append(stack, 2*stack[len(stack)-1])
        } else if op == "C" {
            stack = stack[:len(stack)-1]
        } else {
            num, _ := strconv.Atoi(op)
            stack = append(stack, num)
        }
    }
    sum := 0
    for _, v := range stack {
        sum += v
    }
    return sum
}
```

```kotlin
class Solution {
    fun calPoints(operations: Array<String>): Int {
        val stack = mutableListOf<Int>()
        for (op in operations) {
            when (op) {
                "+" -> {
                    val top = stack.removeLast()
                    val newTop = top + stack.last()
                    stack.add(top)
                    stack.add(newTop)
                }
                "D" -> stack.add(2 * stack.last())
                "C" -> stack.removeLast()
                else -> stack.add(op.toInt())
            }
        }
        return stack.sum()
    }
}
```

```swift
class Solution {
    func calPoints(_ operations: [String]) -> Int {
        var stack = [Int]()
        for op in operations {
            if op == "+" {
                let top = stack.removeLast()
                let newTop = top + stack.last!
                stack.append(top)
                stack.append(newTop)
            } else if op == "D" {
                stack.append(2 * stack.last!)
            } else if op == "C" {
                stack.removeLast()
            } else {
                stack.append(Int(op)!)
            }
        }
        return stack.reduce(0, +)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 2. Stack - II

### Intuition

This approach is similar to the first one, but we maintain a running total as we process operations instead of computing the sum at the end. Whenever we add a score, we add it to our result. When we remove a score with `C`, we subtract it. This gives us the same answer but avoids a final pass through the stack.

### Algorithm

1. Initialize an empty stack and a result variable set to 0.
2. For each operation:
   - If it's `+`, calculate the sum of the top two elements, push it, and add to result.
   - If it's `D`, calculate double the top element, push it, and add to result.
   - If it's `C`, pop the top element and subtract it from result.
   - Otherwise, parse the number, push it, and add to result.
3. Return the result.

::tabs-start

```python
class Solution:
    def calPoints(self, operations: List[str]) -> int:
        stack, res = [], 0
        for op in operations:
            if op == "+":
                res += stack[-1] + stack[-2]
                stack.append(stack[-1] + stack[-2])
            elif op == "D":
                res += (2 * stack[-1])
                stack.append(2 * stack[-1])
            elif op == "C":
                res -= stack.pop()
            else:
                res += int(op)
                stack.append(int(op))
        return res
```

```java
public class Solution {
    public int calPoints(String[] ops) {
        int res = 0;
        Stack<Integer> stack = new Stack<>();
        for (String op : ops) {
            if (op.equals("+")) {
                int top = stack.pop();
                int newTop = top + stack.peek();
                stack.push(top);
                stack.push(newTop);
                res += newTop;
            } else if (op.equals("D")) {
                stack.push(2 * stack.peek());
                res += stack.peek();
            } else if (op.equals("C")) {
                res -= stack.pop();
            } else {
                stack.push(Integer.parseInt(op));
                res += stack.peek();
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int calPoints(vector<string>& ops) {
        stack<int> stack;
        int res = 0;
        for (const string& op : ops) {
            if (op == "+") {
                int top = stack.top(); stack.pop();
                int newTop = top + stack.top();
                stack.push(top);
                stack.push(newTop);
                res += newTop;
            } else if (op == "D") {
                stack.push(2 * stack.top());
                res += stack.top();
            } else if (op == "C") {
                res -= stack.top();
                stack.pop();
            } else {
                stack.push(stoi(op));
                res += stack.top();
            }
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[]} operations
     * @return {number}
     */
    calPoints(operations) {
        const stack = [];
        let res = 0;
        for (const op of operations) {
            if (op === '+') {
                const top = stack.pop();
                const newTop = top + stack[stack.length - 1];
                stack.push(top);
                stack.push(newTop);
                res += newTop;
            } else if (op === 'D') {
                stack.push(2 * stack[stack.length - 1]);
                res += stack[stack.length - 1];
            } else if (op === 'C') {
                res -= stack.pop();
            } else {
                stack.push(parseInt(op));
                res += stack[stack.length - 1];
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int CalPoints(string[] operations) {
        Stack<int> stack = new Stack<int>();
        int res = 0;

        foreach (var op in operations) {
            if (op == "+") {
                int top = stack.Pop();
                int second = stack.Peek();
                int sum = top + second;
                stack.Push(top);
                stack.Push(sum);
                res += sum;
            } else if (op == "D") {
                int doubleVal = 2 * stack.Peek();
                stack.Push(doubleVal);
                res += doubleVal;
            } else if (op == "C") {
                res -= stack.Pop();
            } else {
                int num = int.Parse(op);
                stack.Push(num);
                res += num;
            }
        }

        return res;
    }
}
```

```go
func calPoints(operations []string) int {
    stack := []int{}
    res := 0
    for _, op := range operations {
        if op == "+" {
            n := len(stack)
            newTop := stack[n-1] + stack[n-2]
            stack = append(stack, newTop)
            res += newTop
        } else if op == "D" {
            val := 2 * stack[len(stack)-1]
            stack = append(stack, val)
            res += val
        } else if op == "C" {
            res -= stack[len(stack)-1]
            stack = stack[:len(stack)-1]
        } else {
            num, _ := strconv.Atoi(op)
            stack = append(stack, num)
            res += num
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun calPoints(operations: Array<String>): Int {
        val stack = mutableListOf<Int>()
        var res = 0
        for (op in operations) {
            when (op) {
                "+" -> {
                    val top = stack.removeLast()
                    val newTop = top + stack.last()
                    stack.add(top)
                    stack.add(newTop)
                    res += newTop
                }
                "D" -> {
                    val doubleVal = 2 * stack.last()
                    stack.add(doubleVal)
                    res += doubleVal
                }
                "C" -> res -= stack.removeLast()
                else -> {
                    val num = op.toInt()
                    stack.add(num)
                    res += num
                }
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func calPoints(_ operations: [String]) -> Int {
        var stack = [Int]()
        var res = 0
        for op in operations {
            if op == "+" {
                let top = stack.removeLast()
                let newTop = top + stack.last!
                stack.append(top)
                stack.append(newTop)
                res += newTop
            } else if op == "D" {
                let doubleVal = 2 * stack.last!
                stack.append(doubleVal)
                res += doubleVal
            } else if op == "C" {
                res -= stack.removeLast()
            } else {
                let num = Int(op)!
                stack.append(num)
                res += num
            }
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$
