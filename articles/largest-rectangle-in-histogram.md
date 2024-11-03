## 1. Brute Force

::tabs-start

```python
class Solution:
    def largestRectangleArea(self, heights: List[int]) -> int:
        n = len(heights)
        maxArea = 0

        for i in range(n):
            height = heights[i]

            rightMost = i + 1
            while rightMost < n and heights[rightMost] >= height:
                rightMost += 1
            
            leftMost = i
            while leftMost >= 0 and heights[leftMost] >= height:
                leftMost -= 1
            
            rightMost -= 1
            leftMost += 1
            maxArea = max(maxArea, height * (rightMost - leftMost + 1))
        return maxArea
```

```java
public class Solution {
    public int largestRectangleArea(int[] heights) {
        int n = heights.length;
        int maxArea = 0;

        for (int i = 0; i < n; i++) {
            int height = heights[i];

            int rightMost = i + 1;
            while (rightMost < n && heights[rightMost] >= height) {
                rightMost++;
            }

            int leftMost = i;
            while (leftMost >= 0 && heights[leftMost] >= height) {
                leftMost--;
            }

            rightMost--;
            leftMost++;
            maxArea = Math.max(maxArea, height * (rightMost - leftMost + 1));
        }
        return maxArea;
    }
}
```

```cpp
class Solution {
public:
    int largestRectangleArea(vector<int>& heights) {
        int n = heights.size();
        int maxArea = 0;

        for (int i = 0; i < n; i++) {
            int height = heights[i];

            int rightMost = i + 1;
            while (rightMost < n && heights[rightMost] >= height) {
                rightMost++;
            }

            int leftMost = i;
            while (leftMost >= 0 && heights[leftMost] >= height) {
                leftMost--;
            }

            rightMost--;
            leftMost++;
            maxArea = max(maxArea, height * (rightMost - leftMost + 1));
        }
        return maxArea;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} heights
     * @return {number}
     */
    largestRectangleArea(heights) {
        const n = heights.length;
        let maxArea = 0;

        for (let i = 0; i < n; i++) {
            let height = heights[i];

            let rightMost = i + 1;
            while (rightMost < n && heights[rightMost] >= height) {
                rightMost++;
            }

            let leftMost = i;
            while (leftMost >= 0 && heights[leftMost] >= height) {
                leftMost--;
            }

            rightMost--;
            leftMost++;
            maxArea = Math.max(maxArea, height * (rightMost - leftMost + 1));
        }
        return maxArea;
    }
}
```

```csharp
public class Solution {
    public int LargestRectangleArea(int[] heights) {
        int n = heights.Length;
        int maxArea = 0;

        for (int i = 0; i < n; i++) {
            int height = heights[i];

            int rightMost = i + 1;
            while (rightMost < n && heights[rightMost] >= height) {
                rightMost++;
            }

            int leftMost = i;
            while (leftMost >= 0 && heights[leftMost] >= height) {
                leftMost--;
            }

            rightMost--;
            leftMost++;
            maxArea = Math.Max(maxArea, height * (rightMost - leftMost + 1));
        }
        return maxArea;
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n ^ 2)$
* Space complexity: $O(1)$

---

## 2. Divide And Conquer (Segment Tree)

::tabs-start

```python
class MinIdx_Segtree:
    def __init__(self, N, A):
        self.n = N
        self.INF = int(1e9)
        self.A = A
        while (self.n & (self.n - 1)) != 0:
            self.A.append(self.INF)
            self.n += 1
        self.tree = [0] * (2 * self.n)
        self.build()

    def build(self):
        for i in range(self.n):
            self.tree[self.n + i] = i
        for j in range(self.n - 1, 0, -1):
            a = self.tree[j << 1]
            b = self.tree[(j << 1) + 1]
            if self.A[a] <= self.A[b]:
                self.tree[j] = a
            else:
                self.tree[j] = b

    def update(self, i, val):
        self.A[i] = val
        j = (self.n + i) >> 1
        while j >= 1:
            a = self.tree[j << 1]
            b = self.tree[(j << 1) + 1]
            if self.A[a] <= self.A[b]:
                self.tree[j] = a
            else:
                self.tree[j] = b
            j >>= 1

    def query(self, ql, qh):
        return self._query(1, 0, self.n - 1, ql, qh)

    def _query(self, node, l, h, ql, qh):
        if ql > h or qh < l:
            return self.INF
        if l >= ql and h <= qh:
            return self.tree[node]
        a = self._query(node << 1, l, (l + h) >> 1, ql, qh)
        b = self._query((node << 1) + 1, ((l + h) >> 1) + 1, h, ql, qh)
        if a == self.INF:
            return b
        if b == self.INF:
            return a
        return a if self.A[a] <= self.A[b] else b

class Solution:
    def getMaxArea(self, heights, l, r, st):
        if l > r:
            return 0
        if l == r:
            return heights[l]
        minIdx = st.query(l, r)
        return max(max(self.getMaxArea(heights, l, minIdx - 1, st),
                       self.getMaxArea(heights, minIdx + 1, r, st)),
                   (r - l + 1) * heights[minIdx])

    def largestRectangleArea(self, heights):
        n = len(heights)
        st = MinIdx_Segtree(n, heights)
        return self.getMaxArea(heights, 0, n - 1, st)
```

```java
public class MinIdx_Segtree {
    int n;
    final int INF = (int) 1e9;
    int[] A, tree;

    public MinIdx_Segtree(int N, int[] heights) {
        this.n = N;
        this.A = heights;
        while (Integer.bitCount(n) != 1) {
            A = java.util.Arrays.copyOf(A, n + 1);
            A[n] = INF;
            n++;
        }
        tree = new int[2 * n];
        build();
    }

    public void build() {
        for (int i = 0; i < n; i++) {
            tree[n + i] = i;
        }
        for (int j = n - 1; j >= 1; j--) {
            int a = tree[j << 1];
            int b = tree[(j << 1) + 1];
            if (A[a] <= A[b]) {
                tree[j] = a;
            } else {
                tree[j] = b;
            }
        }
    }

    public void update(int i, int val) {
        A[i] = val;
        for (int j = (n + i) >> 1; j >= 1; j >>= 1) {
            int a = tree[j << 1];
            int b = tree[(j << 1) + 1];
            if (A[a] <= A[b]) {
                tree[j] = a;
            } else {
                tree[j] = b;
            }
        }
    }

    public int query(int ql, int qh) {
        return query(1, 0, n - 1, ql, qh);
    }

    public int query(int node, int l, int h, int ql, int qh) {
        if (ql > h || qh < l) return INF;
        if (l >= ql && h <= qh) return tree[node];
        int a = query(node << 1, l, (l + h) >> 1, ql, qh);
        int b = query((node << 1) + 1, ((l + h) >> 1) + 1, h, ql, qh);
        if (a == INF) return b;
        if (b == INF) return a;
        return A[a] <= A[b] ? a : b;
    }
}

public class Solution {
    public int getMaxArea(int[] heights, int l, int r, MinIdx_Segtree st) {
        if (l > r) return 0;
        if (l == r) return heights[l];

        int minIdx = st.query(l, r);
        return Math.max(Math.max(getMaxArea(heights, l, minIdx - 1, st),
                                getMaxArea(heights, minIdx + 1, r, st)),
                        (r - l + 1) * heights[minIdx]);
    }

    public int largestRectangleArea(int[] heights) {
        int n = heights.length;
        MinIdx_Segtree st = new MinIdx_Segtree(n, heights);
        return getMaxArea(heights, 0, n - 1, st);
    }
}
```

```cpp
class MinIdx_Segtree {
public:
    int n;
    const int INF = 1e9;
    vector<int> A;
    vector<int> tree;
    MinIdx_Segtree(int N, vector<int>& a) {
        this->n = N;
        this->A = a;
        while (__builtin_popcount(n) != 1) {
            A.push_back(INF);
            n++;
        }
        tree.resize(2 * n);
        build();
    }

    void build() {
        for (int i = 0; i < n; i++) {
            tree[n + i] = i;
        }
        for (int j = n - 1; j >= 1; j--) {
            int a = tree[j<<1];
            int b = tree[(j<<1) + 1];
            if(A[a]<=A[b])tree[j]=a;
            else tree[j] = b;
        }
    }

    void update(int i, int val) {
        A[i] = val;
        for (int j = (n + i) >> 1; j >= 1; j >>= 1) {
            int a = tree[j<<1];
            int b = tree[(j<<1) + 1];
            if(A[a]<=A[b])tree[j]=a;
            else tree[j] = b;
        }
    }

    int query(int ql, int qh) {
        return query(1, 0, n - 1, ql, qh);
    }

    int query(int node, int l, int h, int ql, int qh) {
        if (ql > h || qh < l) return INF;
        if (l >= ql && h <= qh) return tree[node];
        int a = query(node << 1, l, (l + h) >> 1, ql, qh);
        int b = query((node << 1) + 1, ((l + h) >> 1) + 1, h, ql, qh);
        if(a==INF)return b;
        if(b==INF)return a;
        return A[a]<=A[b]?a:b;
    }
};

class Solution {
public:
    int getMaxArea(vector<int>& heights, int l, int r, MinIdx_Segtree& st) {
        if (l > r) return 0;
        if (l == r) return heights[l];

        int minIdx = st.query(l, r);
        return max(max(getMaxArea(heights, l, minIdx - 1, st),
                   getMaxArea(heights, minIdx + 1, r, st)),  
                   (r - l + 1) * heights[minIdx]);
    }
    int largestRectangleArea(vector<int>& heights) {
        int n = heights.size();
        MinIdx_Segtree st(n, heights);
        return getMaxArea(heights, 0, n - 1, st);
    }
};
```

```javascript
class MinIdx_Segtree {
    /**
     * @param {number} N
     * @param {number[]} heights
     */
    constructor(N, heights) {
        this.n = N;
        this.INF = 1e9;
        this.A = heights.slice();
        while ((this.n & (this.n - 1)) !== 0) {
            this.A.push(this.INF);
            this.n++;
        }
        this.tree = new Array(2 * this.n).fill(0);
        this.build();
    }

    build() {
        for (let i = 0; i < this.n; i++) {
            this.tree[this.n + i] = i;
        }
        for (let j = this.n - 1; j >= 1; j--) {
            let a = this.tree[j << 1];
            let b = this.tree[(j << 1) + 1];
            this.tree[j] = this.A[a] <= this.A[b] ? a : b;
        }
    }

    /**
     * @param {number} i
     * @param {number} val
     */
    update(i, val) {
        this.A[i] = val;
        for (let j = (this.n + i) >> 1; j >= 1; j >>= 1) {
            let a = this.tree[j << 1];
            let b = this.tree[(j << 1) + 1];
            this.tree[j] = this.A[a] <= this.A[b] ? a : b;
        }
    }

    /**
     * @param {number} ql
     * @param {number} qh
     * @return {number}
     */
    query(ql, qh) {
        return this._query(1, 0, this.n - 1, ql, qh);
    }

    _query(node, l, h, ql, qh) {
        if (ql > h || qh < l) return this.INF;
        if (l >= ql && h <= qh) return this.tree[node];
        let a = this._query(node << 1, l, (l + h) >> 1, ql, qh);
        let b = this._query((node << 1) + 1, ((l + h) >> 1) + 1, h, ql, qh);
        if (a === this.INF) return b;
        if (b === this.INF) return a;
        return this.A[a] <= this.A[b] ? a : b;
    }
}

class Solution {
    /**
     * @param {number[]} heights
     * @return {number}
     */
    largestRectangleArea(heights) {
        const n = heights.length;
        const st = new MinIdx_Segtree(n, heights);
        return this.getMaxArea(heights, 0, n - 1, st);
    }

    /**
     * @param {number[]} heights
     * @param {number} l
     * @param {number} r
     * @param {MinIdx_Segtree} st
     * @return {number}
     */
    getMaxArea(heights, l, r, st) {
        if (l > r) return 0;
        if (l === r) return heights[l];

        const minIdx = st.query(l, r);
        return Math.max(
            this.getMaxArea(heights, l, minIdx - 1, st),
            this.getMaxArea(heights, minIdx + 1, r, st),
            (r - l + 1) * heights[minIdx]
        );
    }
}
```

```csharp
public class MinIdx_Segtree {
    private int n;
    private readonly int INF = (int)1e9;
    private int[] A, tree;

    public MinIdx_Segtree(int N, int[] heights) {
        this.n = N;
        this.A = new int[heights.Length];
        heights.CopyTo(this.A, 0);
        while ((n & (n - 1)) != 0) {
            Array.Resize(ref A, n + 1);
            A[n] = INF;
            n++;
        }
        tree = new int[2 * n];
        Build();
    }

    private void Build() {
        for (int i = 0; i < n; i++) {
            tree[n + i] = i;
        }
        for (int j = n - 1; j >= 1; j--) {
            int a = tree[j << 1];
            int b = tree[(j << 1) + 1];
            tree[j] = A[a] <= A[b] ? a : b;
        }
    }

    public int Query(int ql, int qh) {
        return Query(1, 0, n - 1, ql, qh);
    }

    private int Query(int node, int l, int h, int ql, int qh) {
        if (ql > h || qh < l) return INF;
        if (l >= ql && h <= qh) return tree[node];
        int a = Query(node << 1, l, (l + h) >> 1, ql, qh);
        int b = Query((node << 1) + 1, ((l + h) >> 1) + 1, h, ql, qh);
        if (a == INF) return b;
        if (b == INF) return a;
        return A[a] <= A[b] ? a : b;
    }
}

public class Solution {
    public int LargestRectangleArea(int[] heights) {
        int n = heights.Length;
        MinIdx_Segtree st = new MinIdx_Segtree(n, heights);
        return GetMaxArea(heights, 0, n - 1, st);
    }

    private int GetMaxArea(int[] heights, int l, int r, MinIdx_Segtree st) {
        if (l > r) return 0;
        if (l == r) return heights[l];

        int minIdx = st.Query(l, r);
        return Math.Max(
            Math.Max(GetMaxArea(heights, l, minIdx - 1, st), 
                    GetMaxArea(heights, minIdx + 1, r, st)),
                    (r - l + 1) * heights[minIdx]);
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n \log n)$
* Space complexity: $O(n)$

---

## 3. Stack

::tabs-start

```python
class Solution:
    def largestRectangleArea(self, heights: List[int]) -> int:
        n = len(heights)
        stack = []

        leftMost = [-1] * n
        for i in range(n):
            while stack and heights[stack[-1]] >= heights[i]:
                stack.pop()
            if stack:
                leftMost[i] = stack[-1]
            stack.append(i)
        
        stack = []
        rightMost = [n] * n
        for i in range(n - 1, -1, -1):
            while stack and heights[stack[-1]] >= heights[i]:
                stack.pop()
            if stack:
                rightMost[i] = stack[-1]
            stack.append(i)
        
        maxArea = 0
        for i in range(n):
            leftMost[i] += 1
            rightMost[i] -= 1
            maxArea = max(maxArea, heights[i] * (rightMost[i] - leftMost[i] + 1))
        return maxArea
```

```java
public class Solution {
    public int largestRectangleArea(int[] heights) {
        int n = heights.length;
        int[] leftMost = new int[n];
        int[] rightMost = new int[n];
        Stack<Integer> stack = new Stack<>();
        
        for (int i = 0; i < n; i++) {
            leftMost[i] = -1;
            while (!stack.isEmpty() && heights[stack.peek()] >= heights[i]) {
                stack.pop();
            }
            if (!stack.isEmpty()) {
                leftMost[i] = stack.peek();
            }
            stack.push(i);
        }

        stack.clear();
        for (int i = n - 1; i >= 0; i--) {
            rightMost[i] = n;
            while (!stack.isEmpty() && heights[stack.peek()] >= heights[i]) {
                stack.pop();
            }
            if (!stack.isEmpty()) {
                rightMost[i] = stack.peek();
            }
            stack.push(i);
        }

        int maxArea = 0;
        for (int i = 0; i < n; i++) {
            leftMost[i] += 1;
            rightMost[i] -= 1;
            maxArea = Math.max(maxArea, heights[i] * (rightMost[i] - leftMost[i] + 1));
        }
        return maxArea;
    }
}
```

```cpp
class Solution {
public:
    int largestRectangleArea(vector<int>& heights) {
        int n = heights.size();
        vector<int> leftMost(n, -1);
        vector<int> rightMost(n, n);
        stack<int> stack;

        for (int i = 0; i < n; i++) {
            while (!stack.empty() && heights[stack.top()] >= heights[i]) {
                stack.pop();
            }
            if (!stack.empty()) {
                leftMost[i] = stack.top();
            }
            stack.push(i);
        }

        while (!stack.empty()) stack.pop();

        for (int i = n - 1; i >= 0; i--) {
            while (!stack.empty() && heights[stack.top()] >= heights[i]) {
                stack.pop();
            }
            if (!stack.empty()) {
                rightMost[i] = stack.top();
            }
            stack.push(i);
        }

        int maxArea = 0;
        for (int i = 0; i < n; i++) {
            leftMost[i] += 1;
            rightMost[i] -= 1;
            maxArea = max(maxArea, heights[i] * (rightMost[i] - leftMost[i] + 1));
        }

        return maxArea;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} heights
     * @return {number}
     */
    largestRectangleArea(heights) {
        const n = heights.length;
        const leftMost = Array(n).fill(-1);
        const rightMost = Array(n).fill(n);
        const stack = [];

        for (let i = 0; i < n; i++) {
            while (stack.length && heights[stack[stack.length - 1]] >= heights[i]) {
                stack.pop();
            }
            if (stack.length) {
                leftMost[i] = stack[stack.length - 1];
            }
            stack.push(i);
        }

        stack.length = 0;
        for (let i = n - 1; i >= 0; i--) {
            while (stack.length && heights[stack[stack.length - 1]] >= heights[i]) {
                stack.pop();
            }
            if (stack.length) {
                rightMost[i] = stack[stack.length - 1];
            }
            stack.push(i);
        }

        let maxArea = 0;
        for (let i = 0; i < n; i++) {
            leftMost[i] += 1;
            rightMost[i] -= 1;
            maxArea = Math.max(maxArea, heights[i] * (rightMost[i] - leftMost[i] + 1));
        }

        return maxArea;
    }
}
```

```csharp
public class Solution {
    public int LargestRectangleArea(int[] heights) {
        int n = heights.Length;
        int[] leftMost = new int[n];
        int[] rightMost = new int[n];
        Stack<int> stack = new Stack<int>();

        for (int i = 0; i < n; i++) {
            leftMost[i] = -1;
            while (stack.Count > 0 && heights[stack.Peek()] >= heights[i]) {
                stack.Pop();
            }
            if (stack.Count > 0) {
                leftMost[i] = stack.Peek();
            }
            stack.Push(i);
        }

        stack.Clear();
        for (int i = n - 1; i >= 0; i--) {
            rightMost[i] = n;
            while (stack.Count > 0 && heights[stack.Peek()] >= heights[i]) {
                stack.Pop();
            }
            if (stack.Count > 0) {
                rightMost[i] = stack.Peek();
            }
            stack.Push(i);
        }

        int maxArea = 0;
        for (int i = 0; i < n; i++) {
            leftMost[i] += 1;
            rightMost[i] -= 1;
            maxArea = Math.Max(maxArea, heights[i] * (rightMost[i] - leftMost[i] + 1));
        }

        return maxArea;
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(n)$

---

## 4. Stack (Optimal)

::tabs-start

```python
class Solution:
    def largestRectangleArea(self, heights: List[int]) -> int:
        maxArea = 0
        stack = []  # pair: (index, height)

        for i, h in enumerate(heights):
            start = i
            while stack and stack[-1][1] > h:
                index, height = stack.pop()
                maxArea = max(maxArea, height * (i - index))
                start = index
            stack.append((start, h))

        for i, h in stack:
            maxArea = max(maxArea, h * (len(heights) - i))
        return maxArea
```

```java
class Solution {
    public int largestRectangleArea(int[] heights) {
        int maxArea = 0;
        Stack<int[]> stack = new Stack<>(); // pair: (index, height)

        for (int i = 0; i < heights.length; i++) {
            int start = i;
            while (!stack.isEmpty() && stack.peek()[1] > heights[i]) {
                int[] top = stack.pop();
                int index = top[0];
                int height = top[1];
                maxArea = Math.max(maxArea, height * (i - index));
                start = index;
            }
            stack.push(new int[]{start, heights[i]});
        }

        for (int[] pair : stack) {
            int index = pair[0];
            int height = pair[1];
            maxArea = Math.max(maxArea, height * (heights.length - index));
        }
        return maxArea;
    }
}
```

```cpp
class Solution {
public:
    int largestRectangleArea(vector<int>& heights) {
        int maxArea = 0;
        stack<pair<int, int>> stack; // pair: (index, height)

        for (int i = 0; i < heights.size(); i++) {
            int start = i;
            while (!stack.empty() && stack.top().second > heights[i]) {
                pair<int, int> top = stack.top();
                int index = top.first;
                int height = top.second;
                maxArea = max(maxArea, height * (i - index));
                start = index;
                stack.pop();
            }
            stack.push({ start, heights[i] });
        }

        while (!stack.empty()) {
            int index = stack.top().first;
            int height = stack.top().second;
            maxArea = max(maxArea, height * (static_cast<int>(heights.size()) - index));
            stack.pop();
        }
        return maxArea;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} heights
     * @return {number}
     */
    largestRectangleArea(heights) {
        let maxArea = 0;
        const stack = []; // pair: (index, height)

        for (let i = 0; i < heights.length; i++) {
            let start = i;
            while (
                stack.length > 0 &&
                stack[stack.length - 1][1] > heights[i]
            ) {
                const [index, height] = stack.pop();
                maxArea = Math.max(maxArea, height * (i - index));
                start = index;
            }
            stack.push([start, heights[i]]);
        }

        for (const [index, height] of stack) {
            maxArea = Math.max(maxArea, height * (heights.length - index));
        }
        return maxArea;
    }
}
```

```csharp
public class Solution {
    public int LargestRectangleArea(int[] heights) {
        int maxArea = 0;
        Stack<int[]> stack = new Stack<int[]>(); // pair: (index, height)

        for (int i = 0; i < heights.Length; i++) {
            int start = i;
            while (stack.Count > 0 && stack.Peek()[1] > heights[i]) {
                int[] top = stack.Pop();
                int index = top[0];
                int height = top[1];
                maxArea = Math.Max(maxArea, height * (i - index));
                start = index;
            }
            stack.Push(new int[] { start, heights[i] });
        }

        foreach (int[] pair in stack) {
            int index = pair[0];
            int height = pair[1];
            maxArea = Math.Max(maxArea, height * (heights.Length - index));
        }
        return maxArea;
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(n)$

---

## 5. Stack (One Pass)

::tabs-start

```python
class Solution:
    def largestRectangleArea(self, heights: List[int]) -> int:
        n = len(heights)
        maxArea = 0
        stack = []

        for i in range(n + 1):
            while stack and (i == n  or heights[stack[-1]] >= heights[i]):
                height = heights[stack.pop()]
                width = i if not stack else i - stack[-1] - 1
                maxArea = max(maxArea, height * width)
            stack.append(i)
        return maxArea
```

```java
public class Solution {
    public int largestRectangleArea(int[] heights) {
        int n = heights.length;
        int maxArea = 0;
        Stack<Integer> stack = new Stack<>();

        for (int i = 0; i <= n; i++) {
            while (!stack.isEmpty() &&
                 (i == n || heights[stack.peek()] >= heights[i])) {
                int height = heights[stack.pop()];
                int width = stack.isEmpty() ? i : i - stack.peek() - 1;
                maxArea = Math.max(maxArea, height * width);
            }
            stack.push(i);
        }
        return maxArea;
    }
}
```

```cpp
class Solution {
public:
    int largestRectangleArea(vector<int>& heights) {
        int n = heights.size();
        int maxArea = 0;
        stack<int> stack;

        for (int i = 0; i <= n; i++) {
            while (!stack.empty() &&
                 (i == n || heights[stack.top()] >= heights[i])) {
                int height = heights[stack.top()];
                stack.pop();
                int width = stack.empty() ? i : i - stack.top() - 1;
                maxArea = max(maxArea, height * width);
            }
            stack.push(i);
        }
        return maxArea;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} heights
     * @return {number}
     */
    largestRectangleArea(heights) {
        const n = heights.length;
        let maxArea = 0;
        const stack = [];

        for (let i = 0; i <= n; i++) {
            while (stack.length && 
                (i === n || heights[stack[stack.length - 1]] >= heights[i])) {
                const height = heights[stack.pop()];
                const width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
                maxArea = Math.max(maxArea, height * width);
            }
            stack.push(i);
        }
        return maxArea;
    }
}
```

```csharp
public class Solution {
    public int LargestRectangleArea(int[] heights) {
        int n = heights.Length;
        int maxArea = 0;
        Stack<int> stack = new Stack<int>();

        for (int i = 0; i <= n; i++) {
            while (stack.Count > 0 &&
                 (i == n || heights[stack.Peek()] >= heights[i])) {
                int height = heights[stack.Pop()];
                int width = stack.Count == 0 ? i : i - stack.Peek() - 1;
                maxArea = Math.Max(maxArea, height * width);
            }
            stack.Push(i);
        }
        return maxArea;
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(n)$