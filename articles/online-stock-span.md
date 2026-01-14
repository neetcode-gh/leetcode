## 1. Brute Force

### Intuition

The stock span is the number of consecutive days (including today) where the price was less than or equal to today's price. The simplest approach is to store all prices and, for each new price, look backward through the history counting days until we find a higher price.

### Algorithm

1. Maintain an array `arr` to store all prices seen so far.
2. For each `next(price)` call:
   - Append the new price to `arr`.
   - Start from the second-to-last index and move backward.
   - Count consecutive days where `arr[i] <= price`.
   - Stop when we find a price greater than the current one or reach the beginning.
   - Return the count (current position minus the stopping index).

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

```go
type StockSpanner struct {
    arr []int
}

func Constructor() StockSpanner {
    return StockSpanner{arr: []int{}}
}

func (this *StockSpanner) Next(price int) int {
    this.arr = append(this.arr, price)
    i := len(this.arr) - 2
    for i >= 0 && this.arr[i] <= price {
        i--
    }
    return len(this.arr) - i - 1
}
```

```kotlin
class StockSpanner() {
    private val arr = mutableListOf<Int>()

    fun next(price: Int): Int {
        arr.add(price)
        var i = arr.size - 2
        while (i >= 0 && arr[i] <= price) {
            i--
        }
        return arr.size - i - 1
    }
}
```

```swift
class StockSpanner {
    private var arr: [Int]

    init() {
        arr = []
    }

    func next(_ price: Int) -> Int {
        arr.append(price)
        var i = arr.count - 2
        while i >= 0 && arr[i] <= price {
            i -= 1
        }
        return arr.count - i - 1
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

### Intuition

The brute force approach repeatedly scans the same elements. We can avoid this by using a monotonic decreasing stack that stores pairs of `(price, span)`.

When a new price arrives, we pop all entries from the stack that have prices less than or equal to the current price. The span of the current day is `1` (for today) plus the sum of spans of all popped entries. This works because those popped entries represent consecutive days that are now "covered" by the current higher price.

The stack remains in decreasing order of prices, so each element is pushed and popped at most once across all operations.

### Algorithm

1. Initialize an empty stack that stores pairs of `(price, span)`.
2. For each `next(price)` call:
   - Start with `span = 1` (counting today).
   - While the stack is not empty and the top price is less than or equal to the current price:
     - Pop the top element and add its span to the current span.
   - Push `(price, span)` onto the stack.
   - Return `span`.

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

```go
type StockSpanner struct {
    stack [][]int // [price, span]
}

func Constructor() StockSpanner {
    return StockSpanner{stack: [][]int{}}
}

func (this *StockSpanner) Next(price int) int {
    span := 1
    for len(this.stack) > 0 && this.stack[len(this.stack)-1][0] <= price {
        span += this.stack[len(this.stack)-1][1]
        this.stack = this.stack[:len(this.stack)-1]
    }
    this.stack = append(this.stack, []int{price, span})
    return span
}
```

```kotlin
class StockSpanner() {
    private val stack = ArrayDeque<IntArray>() // [price, span]

    fun next(price: Int): Int {
        var span = 1
        while (stack.isNotEmpty() && stack.last()[0] <= price) {
            span += stack.removeLast()[1]
        }
        stack.addLast(intArrayOf(price, span))
        return span
    }
}
```

```swift
class StockSpanner {
    private var stack: [(price: Int, span: Int)]

    init() {
        stack = []
    }

    func next(_ price: Int) -> Int {
        var span = 1
        while !stack.isEmpty && stack.last!.price <= price {
            span += stack.removeLast().span
        }
        stack.append((price, span))
        return span
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

> Where $n$ is the number of function calls.

---

## Common Pitfalls

### Using Strictly Less Than Instead of Less Than or Equal

The span includes all consecutive days where prices are less than or equal to the current price, not strictly less than. Using `<` instead of `<=` will undercount the span when previous days have the same price as today.

### Forgetting to Include the Current Day in the Span

The span always includes the current day itself. When initializing the span counter, start with `1` (for today) before adding spans from popped elements. Starting with `0` will result in spans that are off by one.

### Storing Only Prices Without Spans

Storing just prices on the stack requires recounting spans on every query, leading to O(n) per operation. The stack should store pairs of `(price, span)` so that when an element is popped, its accumulated span can be added directly to the current span in O(1) time.
