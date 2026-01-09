## 1. Array or List

### Intuition

The most straightforward way to compute a moving average is to store all incoming values in a list and calculate the average of the last `size` elements each time. When a new value arrives, we append it to the list, then sum the most recent values up to the window size. This approach is simple to implement but recalculates the sum from scratch on every call.

### Algorithm

1. Initialize an empty list to store all incoming values and save the window size.
2. When `next(val)` is called, append the new value to the list.
3. Calculate the sum of the last `size` elements (or all elements if fewer than `size` exist).
4. Return the sum divided by the number of elements in the window (minimum of list length and size).

::tabs-start

```python
class MovingAverage:
    def __init__(self, size: int):
        self.size = size
        self.queue = []

    def next(self, val: int) -> float:
        size, queue = self.size, self.queue
        queue.append(val)
        # calculate the sum of the moving window
        window_sum = sum(queue[-size:])

        return window_sum / min(len(queue), size)
```

```java
class MovingAverage {

    int size;
    List queue = new ArrayList<Integer>();

    public MovingAverage(int size) {
        this.size = size;
    }

    public double next(int val) {
        queue.add(val);

        // calculate the sum of the moving window
        int windowSum = 0;
        for (
            int i = Math.max(0, queue.size() - size);
            i < queue.size();
            ++i
        ) windowSum += (int) queue.get(i);

        return (windowSum * 1.0) / Math.min(queue.size(), size);
    }
}
```

```cpp
class MovingAverage {
private:
    int size;
    vector<int> queue;

public:
    /** Initialize your data structure here. */
    MovingAverage(int size) { this->size = size; }

    double next(int val) {
        queue.push_back(val);
        // calculate the sum of the moving window
        int windowSum = 0;
        for (int i = max(0, (int)queue.size() - size); i < queue.size(); ++i)
            windowSum += queue[i];

        return windowSum * 1.0 / min((int)queue.size(), size);
    }
};
```

```javascript
class MovingAverage {
    /**
     * @param {number} size
     */
    constructor(size) {
        this.size = size;
        this.queue = [];
    }

    /**
     * @param {number} val
     * @return {number}
     */
    next(val) {
        const size = this.size;
        const queue = this.queue;

        queue.push(val);

        // calculate the sum of the moving window
        const windowSum = queue.slice(-size).reduce((sum, num) => sum + num, 0);

        return windowSum / Math.min(queue.length, size);
    }
}
```

```csharp
public class MovingAverage {
    private int size;
    private List<int> queue;

    public MovingAverage(int size) {
        this.size = size;
        this.queue = new List<int>();
    }

    public double Next(int val) {
        queue.Add(val);
        // calculate the sum of the moving window
        int windowSum = 0;
        for (int i = Math.Max(0, queue.Count - size); i < queue.Count; i++) {
            windowSum += queue[i];
        }
        return (double)windowSum / Math.Min(queue.Count, size);
    }
}
```

```go
type MovingAverage struct {
    size  int
    queue []int
}

func Constructor(size int) MovingAverage {
    return MovingAverage{size: size, queue: []int{}}
}

func (ma *MovingAverage) Next(val int) float64 {
    ma.queue = append(ma.queue, val)
    start := len(ma.queue) - ma.size
    if start < 0 {
        start = 0
    }
    windowSum := 0
    for i := start; i < len(ma.queue); i++ {
        windowSum += ma.queue[i]
    }
    count := len(ma.queue)
    if count > ma.size {
        count = ma.size
    }
    return float64(windowSum) / float64(count)
}
```

```kotlin
class MovingAverage(private val size: Int) {
    private val queue = mutableListOf<Int>()

    fun next(value: Int): Double {
        queue.add(value)
        val start = maxOf(0, queue.size - size)
        var windowSum = 0
        for (i in start until queue.size) {
            windowSum += queue[i]
        }
        return windowSum.toDouble() / minOf(queue.size, size)
    }
}
```

```swift
class MovingAverage {
    private var size: Int
    private var queue: [Int]

    init(_ size: Int) {
        self.size = size
        self.queue = []
    }

    func next(_ val: Int) -> Double {
        queue.append(val)
        let start = max(0, queue.count - size)
        var windowSum = 0
        for i in start..<queue.count {
            windowSum += queue[i]
        }
        return Double(windowSum) / Double(min(queue.count, size))
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(N \cdot M)$
- Space complexity: $O(M)$

>  Where $N$ is the size of the moving window and $M$ is the number of calls made to `next`.

---

## 2. Double-ended Queue

### Intuition

Instead of recalculating the sum each time, we can maintain a running sum and a queue that holds only the elements within the current window. When the window is full and a new element arrives, we remove the oldest element from both the queue and the running sum, then add the new element. This way, each `next()` call runs in constant time.

### Algorithm

1. Initialize a deque (double-ended queue), a running sum `window_sum`, and a count of elements seen.
2. When `next(val)` is called:
   - Increment the count and add the new value to the queue.
   - If the count exceeds the window size, remove the front element from the queue and subtract it from the running sum.
   - Add the new value to the running sum.
3. Return the running sum divided by the current window size (minimum of count and size).

::tabs-start

```python
class MovingAverage:
    def __init__(self, size: int):
        self.size = size
        self.queue = deque()
        # number of elements seen so far
        self.window_sum = 0
        self.count = 0

    def next(self, val: int) -> float:
        self.count += 1
        # calculate the new sum by shifting the window
        self.queue.append(val)
        tail = self.queue.popleft() if self.count > self.size else 0

        self.window_sum = self.window_sum - tail + val

        return self.window_sum / min(self.size, self.count)
```

```java
class MovingAverage {

    int size, windowSum = 0, count = 0;
    Deque queue = new ArrayDeque<Integer>();

    public MovingAverage(int size) {
        this.size = size;
    }

    public double next(int val) {
        ++count;
        // calculate the new sum by shifting the window
        queue.add(val);
        int tail = count > size ? (int) queue.poll() : 0;

        windowSum = windowSum - tail + val;

        return (windowSum * 1.0) / Math.min(size, count);
    }
}
```

```cpp
class MovingAverage {
private:
    int size, windowSum = 0, count = 0;
    std::deque<int> queue;

public:
    MovingAverage(int size) { this->size = size; }

    double next(int val) {
        ++count;
        // calculate the new sum by shifting the window
        queue.push_back(val);
        int tail = count > size ? queue.front() : 0;
        if (count > size) queue.pop_front();

        windowSum = windowSum - tail + val;

        return static_cast<double>(windowSum) / std::min(size, count);
    }
};
```

```javascript
class MovingAverage {
    constructor(size) {
        this.size = size;
        this.queue = [];
        this.windowSum = 0;
        this.count = 0;
    }

    next(val) {
        this.count++;
        this.queue.push(val);
        let tail = this.count > this.size ? this.queue.shift() : 0;
        this.windowSum = this.windowSum - tail + val;
        return this.windowSum / Math.min(this.size, this.count);
    }
}
```

```csharp
public class MovingAverage {
    private int size, windowSum = 0, count = 0;
    private Queue<int> queue;

    public MovingAverage(int size) {
        this.size = size;
        this.queue = new Queue<int>();
    }

    public double Next(int val) {
        count++;
        queue.Enqueue(val);
        int tail = count > size ? queue.Dequeue() : 0;
        windowSum = windowSum - tail + val;
        return (double)windowSum / Math.Min(size, count);
    }
}
```

```go
type MovingAverage struct {
    size      int
    queue     []int
    windowSum int
    count     int
}

func Constructor(size int) MovingAverage {
    return MovingAverage{size: size, queue: []int{}, windowSum: 0, count: 0}
}

func (ma *MovingAverage) Next(val int) float64 {
    ma.count++
    ma.queue = append(ma.queue, val)
    tail := 0
    if ma.count > ma.size {
        tail = ma.queue[0]
        ma.queue = ma.queue[1:]
    }
    ma.windowSum = ma.windowSum - tail + val
    count := ma.size
    if ma.count < ma.size {
        count = ma.count
    }
    return float64(ma.windowSum) / float64(count)
}
```

```kotlin
class MovingAverage(private val size: Int) {
    private val queue = ArrayDeque<Int>()
    private var windowSum = 0
    private var count = 0

    fun next(value: Int): Double {
        count++
        queue.addLast(value)
        val tail = if (count > size) queue.removeFirst() else 0
        windowSum = windowSum - tail + value
        return windowSum.toDouble() / minOf(size, count)
    }
}
```

```swift
class MovingAverage {
    private var size: Int
    private var queue: [Int]
    private var windowSum: Int
    private var count: Int

    init(_ size: Int) {
        self.size = size
        self.queue = []
        self.windowSum = 0
        self.count = 0
    }

    func next(_ val: Int) -> Double {
        count += 1
        queue.append(val)
        let tail = count > size ? queue.removeFirst() : 0
        windowSum = windowSum - tail + val
        return Double(windowSum) / Double(min(size, count))
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(M)$
    - Time complexity per `next()` call is $O(1)$. Therefore, the total time complexity for $M$ calls is $O(M)$
- Space complexity: $O(N)$

>  Where $N$ is the size of the moving window and $M$ is the number of calls made to `next`.

---

## 3. Circular Queue with Array

### Intuition

A circular queue (ring buffer) avoids the overhead of shifting elements when removing from the front. We use a fixed-size array where the head pointer wraps around when it reaches the end. The element being overwritten is the one leaving the window, so we subtract it from the running sum before adding the new value. This achieves constant time per operation with minimal memory overhead.

### Algorithm

1. Initialize a fixed-size array of length `size`, a head pointer, a running sum, and a count of elements seen.
2. When `next(val)` is called:
   - Increment the count.
   - Calculate the tail position as `(head + 1) % size`, which points to the oldest element that will be replaced.
   - Subtract the value at the tail position from the running sum and add the new value.
   - Move the head pointer forward: `head = (head + 1) % size`.
   - Store the new value at the head position.
3. Return the running sum divided by the current window size (minimum of count and size).

::tabs-start

```python
class MovingAverage:
    def __init__(self, size: int):
        self.size = size
        self.queue = [0] * self.size
        self.head = self.window_sum = 0

        # number of elements seen so far
        self.count = 0

    def next(self, val: int) -> float:
        self.count += 1

        # calculate the new sum by shifting the window
        tail = (self.head + 1) % self.size
        self.window_sum = self.window_sum - self.queue[tail] + val

        # move on to the next head
        self.head = (self.head + 1) % self.size
        self.queue[self.head] = val
        return self.window_sum / min(self.size, self.count)
```

```java
class MovingAverage {

    int size, head = 0, windowSum = 0, count = 0;
    int[] queue;

    public MovingAverage(int size) {
        this.size = size;
        queue = new int[size];
    }

    public double next(int val) {
        ++count;
        
        // calculate the new sum by shifting the window
        int tail = (head + 1) % size;
        windowSum = windowSum - queue[tail] + val;

        // move on to the next head
        head = (head + 1) % size;
        queue[head] = val;
        return (windowSum * 1.0) / Math.min(size, count);
    }
}
```

```cpp
class MovingAverage {
private:
    int size;
    int head = 0;
    int windowSum = 0;
    int count = 0;
    vector<int> queue;

public:
    MovingAverage(int size) {
        this->size = size;
        queue = vector<int>(size);
    }

    double next(int val) {
        ++count;

        // calculate the new sum by shifting the window
        int tail = (head + 1) % size;
        windowSum = windowSum - queue[tail] + val;

        // move on to the next head
        head = (head + 1) % size;
        queue[head] = val;
        return windowSum * 1.0 / min(size, count);
    }
};
```

```javascript
class MovingAverage {
    /**
     * @param {number} size
     */
    constructor(size) {
        this.size = size;
        this.queue = new Array(this.size).fill(0);
        this.head = 0;
        this.windowSum = 0;
        // number of elements seen so far
        this.count = 0;
    }

    /**
     * @param {number} val
     * @return {number}
     */
    next(val) {
        this.count += 1;

        // calculate the new sum by shifting the window
        const tail = (this.head + 1) % this.size;
        this.windowSum = this.windowSum - this.queue[tail] + val;

        // move on to the next head
        this.head = (this.head + 1) % this.size;
        this.queue[this.head] = val;

        return this.windowSum / Math.min(this.size, this.count);
    }
}
```

```csharp
public class MovingAverage {
    private int size, head = 0, windowSum = 0, count = 0;
    private int[] queue;

    public MovingAverage(int size) {
        this.size = size;
        this.queue = new int[size];
    }

    public double Next(int val) {
        count++;
        int tail = (head + 1) % size;
        windowSum = windowSum - queue[tail] + val;
        head = (head + 1) % size;
        queue[head] = val;
        return (double)windowSum / Math.Min(size, count);
    }
}
```

```go
type MovingAverage struct {
    size      int
    queue     []int
    head      int
    windowSum int
    count     int
}

func Constructor(size int) MovingAverage {
    return MovingAverage{
        size:      size,
        queue:     make([]int, size),
        head:      0,
        windowSum: 0,
        count:     0,
    }
}

func (ma *MovingAverage) Next(val int) float64 {
    ma.count++
    tail := (ma.head + 1) % ma.size
    ma.windowSum = ma.windowSum - ma.queue[tail] + val
    ma.head = (ma.head + 1) % ma.size
    ma.queue[ma.head] = val
    count := ma.size
    if ma.count < ma.size {
        count = ma.count
    }
    return float64(ma.windowSum) / float64(count)
}
```

```kotlin
class MovingAverage(private val size: Int) {
    private val queue = IntArray(size)
    private var head = 0
    private var windowSum = 0
    private var count = 0

    fun next(value: Int): Double {
        count++
        val tail = (head + 1) % size
        windowSum = windowSum - queue[tail] + value
        head = (head + 1) % size
        queue[head] = value
        return windowSum.toDouble() / minOf(size, count)
    }
}
```

```swift
class MovingAverage {
    private var size: Int
    private var queue: [Int]
    private var head: Int
    private var windowSum: Int
    private var count: Int

    init(_ size: Int) {
        self.size = size
        self.queue = [Int](repeating: 0, count: size)
        self.head = 0
        self.windowSum = 0
        self.count = 0
    }

    func next(_ val: Int) -> Double {
        count += 1
        let tail = (head + 1) % size
        windowSum = windowSum - queue[tail] + val
        head = (head + 1) % size
        queue[head] = val
        return Double(windowSum) / Double(min(size, count))
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(M)$
    - Time complexity per `next()` call is $O(1)$. Therefore, the total time complexity for $M$ calls is $O(M)$
- Space complexity: $O(N)$

>  Where $N$ is the size of the moving window and $M$ is the number of calls made to `next`.
