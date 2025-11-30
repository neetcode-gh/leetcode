## 1. Array or List

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(N \cdot M)$
- Space complexity: $O(M)$

>  Where $N$ is the size of the moving window and $M$ is the number of calls made to `next`.

---

## 2. Double-ended Queue

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
class Deque {
    constructor() {
        this.items = {};
        this.front = 0;
        this.back = 0;
    }

    push(val) {
        this.items[this.back] = val;
        this.back++;
    }

    shift() {
        if (this.front === this.back) return undefined;
        const val = this.items[this.front];
        delete this.items[this.front];
        this.front++;
        return val;
    }

    get length() {
        return this.back - this.front;
    }
}

class MovingAverage {
    /**
     * @param {number} size
     */
    constructor(size) {
        this.size = size;
        this.queue = new Deque();
        // number of elements seen so far
        this.windowSum = 0;
        this.count = 0;
    }

    /** 
     * @param {number} val
     * @return {number}
     */
    next(val) {
        this.count += 1;
        
        // calculate the new sum by shifting the window
        this.queue.push(val);
        const tail = this.count > this.size ? this.queue.shift() : 0;
        this.windowSum = this.windowSum - tail + val;
        
        return this.windowSum / Math.min(this.size, this.count);
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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(M)$
    - Time complexity per `next()` call is $O(1)$. Therefore, the total time complexity for $M$ calls is $O(M)$
- Space complexity: $O(N)$

>  Where $N$ is the size of the moving window and $M$ is the number of calls made to `next`.
