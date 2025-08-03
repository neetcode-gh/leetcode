## 1. Brute Force

::tabs-start

```python
class StockSpanner:

    def __init__(self):
        self.arr = []

    def next(self, price: int) -> int:
        self.arr.append(price)
        i = len(self.arr) - 2
        while i >= 0 and self.arr[i] <= price:
            i -= 1
        return len(self.arr) - i - 1
```

```java
public class StockSpanner {
    private List<Integer> arr;

    public StockSpanner() {
        arr = new ArrayList<>();
    }

    public int next(int price) {
        arr.add(price);
        int i = arr.size() - 2;
        while (i >= 0 && arr.get(i) <= price) {
            i--;
        }
        return arr.size() - i - 1;
    }
}
```

```cpp
class StockSpanner {
    vector<int> arr;

public:
    StockSpanner() {}

    int next(int price) {
        arr.push_back(price);
        int i = arr.size() - 2;
        while (i >= 0 && arr[i] <= price) {
            i--;
        }
        return arr.size() - i - 1;
    }
};
```

```javascript
class StockSpanner {
    constructor() {
        this.arr = [];
    }

    /**
     * @param {number} price
     * @return {number}
     */
    next(price) {
        this.arr.push(price);
        let i = this.arr.length - 2;
        while (i >= 0 && this.arr[i] <= price) {
            i--;
        }
        return this.arr.length - i - 1;
    }
}
```

```csharp
public class StockSpanner {
    private List<int> arr;

    public StockSpanner() {
        arr = new List<int>();
    }

    public int Next(int price) {
        arr.Add(price);
        int i = arr.Count - 2;

        while (i >= 0 && arr[i] <= price) {
            i--;
        }

        return arr.Count - i - 1;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n)$

> Where $n$ is the number of function calls.

---

## 2. Monotonic Decreasing Stack

::tabs-start

```python
class StockSpanner:

    def __init__(self):
        self.stack = []  # pair: (price, span)

    def next(self, price: int) -> int:
        span = 1
        while self.stack and self.stack[-1][0] <= price:
            span += self.stack[-1][1]
            self.stack.pop()
        self.stack.append((price, span))
        return span
```

```java
public class StockSpanner {
    private Stack<int[]> stack; // pair: [price, span]

    public StockSpanner() {
        stack = new Stack<>();
    }

    public int next(int price) {
        int span = 1;
        while (!stack.isEmpty() && stack.peek()[0] <= price) {
            span += stack.pop()[1];
        }
        stack.push(new int[] {price, span});
        return span;
    }
}
```

```cpp
class StockSpanner {
    stack<pair<int, int>> stack; // pair: (price, span)

public:
    StockSpanner() {}

    int next(int price) {
        int span = 1;
        while (!stack.empty() && stack.top().first <= price) {
            span += stack.top().second;
            stack.pop();
        }
        stack.push({price, span});
        return span;
    }
};
```

```javascript
class StockSpanner {
    constructor() {
        this.stack = []; // pair: [price, span]
    }

    /**
     * @param {number} price
     * @return {number}
     */
    next(price) {
        let span = 1;
        while (
            this.stack.length &&
            this.stack[this.stack.length - 1][0] <= price
        ) {
            span += this.stack.pop()[1];
        }
        this.stack.push([price, span]);
        return span;
    }
}
```

```csharp
public class StockSpanner {
    private Stack<(int price, int span)> stack;

    public StockSpanner() {
        stack = new Stack<(int price, int span)>();
    }

    public int Next(int price) {
        int span = 1;
        while (stack.Count > 0 && stack.Peek().price <= price) {
            span += stack.Pop().span;
        }
        stack.Push((price, span));
        return span;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

> Where $n$ is the number of function calls.
