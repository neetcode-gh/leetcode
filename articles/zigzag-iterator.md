## 1. Two-Pointers

::tabs-start

```python
class ZigzagIterator:
    def __init__(self, v1: List[int], v2: List[int]):
        self.vectors = [v1, v2]

        self.p_elem = 0   # pointer to the index of element
        self.p_vec = 0    # pointer to the vector

        # variables for hasNext() function
        self.total_num = len(v1) + len(v2)
        self.output_count = 0

    def next(self) -> int:
        iter_num = 0
        ret = None

        # Iterate over the vectors
        while iter_num < len(self.vectors):
            curr_vec = self.vectors[self.p_vec]
            if self.p_elem < len(curr_vec):
                ret = curr_vec[self.p_elem]

            iter_num += 1
            self.p_vec = (self.p_vec + 1) % len(self.vectors)
            # increment the element pointer once iterating all vectors
            if self.p_vec == 0:
                self.p_elem += 1

            if ret is not None:
                self.output_count += 1
                return ret

        # no more element to output
        raise Exception


    def hasNext(self) -> bool:
        return self.output_count < self.total_num
```

```java
class ZigzagIterator {

    private List<List<Integer>> vectors = new ArrayList<>();

    // pointer to vector, and pointer to element
    private Integer pVec = 0, pElem = 0;
    private Integer totalNum = 0, outputCount = 0;

    public ZigzagIterator(List<Integer> v1, List<Integer> v2) {
        this.vectors.add(v1);
        this.vectors.add(v2);
        for (List<Integer> vec : this.vectors) {
            this.totalNum += vec.size();
        }
    }

    public int next() {
        Integer iterNum = 0, ret = null;
        while (iterNum < this.vectors.size()) {
            List<Integer> currVec = this.vectors.get(this.pVec);
            if (this.pElem < currVec.size()) {
                ret = currVec.get(this.pElem);
                this.outputCount += 1;
            }

            iterNum += 1;
            this.pVec = (this.pVec + 1) % this.vectors.size();
            // increment the element pointer once iterating all vectors
            if (this.pVec == 0)
                this.pElem += 1;

            if (ret != null)
                return ret;
        }
        // one should raise an exception here.
        return 0;
    }

    public boolean hasNext() {
        return this.outputCount < this.totalNum;
    }
}
```

```cpp
class ZigzagIterator {
private:
    vector<vector<int>> vectors;
    // pointer to vector, and pointer to element
    int pVec = 0, pElem = 0;
    int totalNum = 0, outputCount = 0;

public:
    ZigzagIterator(vector<int>& v1, vector<int>& v2) {
        vectors.push_back(v1);
        vectors.push_back(v2);
        
        for (const auto& vec : vectors) {
            totalNum += vec.size();
        }
    }

    int next() {
        int iterNum = 0;
        int ret = -1;
        bool found = false;
        
        while (iterNum < vectors.size()) {
            vector<int>& currVec = vectors[pVec];
            
            if (pElem < currVec.size()) {
                ret = currVec[pElem];
                outputCount += 1;
                found = true;
            }
            
            iterNum += 1;
            pVec = (pVec + 1) % vectors.size();
            
            // increment the element pointer once iterating all vectors
            if (pVec == 0)
                pElem += 1;
            
            if (found)
                return ret;
        }
        
        // one should raise an exception here.
        return 0;
    }

    bool hasNext() {
        return outputCount < totalNum;
    }
};
```

```javascript
class ZigzagIterator {
    /**
     * @param {Integer[]} v1
     * @param {Integer[]} v2
     */
    constructor(v1, v2) {
        this.vectors = [v1, v2];
        this.p_elem = 0;   // pointer to the index of element
        this.p_vec = 0;    // pointer to the vector

        // variables for hasNext() function
        this.total_num = v1.length + v2.length;
        this.output_count = 0;
    }

    /**
     * @returns {boolean}
     */
    hasNext() {
        return this.output_count < this.total_num;
    }

    /**
     * @returns {integer}
     */
    next() {
        let iter_num = 0;
        let ret = null;

        // Iterate over the vectors
        while (iter_num < this.vectors.length) {
            let curr_vec = this.vectors[this.p_vec];

            if (this.p_elem < curr_vec.length) {
                ret = curr_vec[this.p_elem];
            }

            iter_num++;
            this.p_vec = (this.p_vec + 1) % this.vectors.length;

            // increment the element pointer once iterating all vectors
            if (this.p_vec === 0) {
                this.p_elem++;
            }

            if (ret !== null) {
                this.output_count++;
                return ret;
            }
        }

        // no more element to output
        throw new Error("No more elements");
    }
}
```

```csharp
public class ZigzagIterator {
    private List<IList<int>> vectors = new List<IList<int>>();
    private int pVec = 0, pElem = 0;
    private int totalNum = 0, outputCount = 0;

    public ZigzagIterator(IList<int> v1, IList<int> v2) {
        vectors.Add(v1);
        vectors.Add(v2);
        foreach (var vec in vectors) {
            totalNum += vec.Count;
        }
    }

    public int Next() {
        int iterNum = 0;
        int? ret = null;
        while (iterNum < vectors.Count) {
            var currVec = vectors[pVec];
            if (pElem < currVec.Count) {
                ret = currVec[pElem];
                outputCount++;
            }

            iterNum++;
            pVec = (pVec + 1) % vectors.Count;
            if (pVec == 0)
                pElem++;

            if (ret != null)
                return ret.Value;
        }
        return 0;
    }

    public bool HasNext() {
        return outputCount < totalNum;
    }
}
```

```go
type ZigzagIterator struct {
    vectors     [][]int
    pVec        int
    pElem       int
    totalNum    int
    outputCount int
}

func Constructor(v1, v2 []int) *ZigzagIterator {
    return &ZigzagIterator{
        vectors:     [][]int{v1, v2},
        pVec:        0,
        pElem:       0,
        totalNum:    len(v1) + len(v2),
        outputCount: 0,
    }
}

func (this *ZigzagIterator) next() int {
    iterNum := 0
    ret := -1
    found := false

    for iterNum < len(this.vectors) {
        currVec := this.vectors[this.pVec]
        if this.pElem < len(currVec) {
            ret = currVec[this.pElem]
            this.outputCount++
            found = true
        }

        iterNum++
        this.pVec = (this.pVec + 1) % len(this.vectors)
        if this.pVec == 0 {
            this.pElem++
        }

        if found {
            return ret
        }
    }
    return 0
}

func (this *ZigzagIterator) hasNext() bool {
    return this.outputCount < this.totalNum
}
```

```kotlin
class ZigzagIterator(v1: List<Int>, v2: List<Int>) {
    private val vectors = listOf(v1, v2)
    private var pVec = 0
    private var pElem = 0
    private val totalNum = v1.size + v2.size
    private var outputCount = 0

    fun next(): Int {
        var iterNum = 0
        var ret: Int? = null

        while (iterNum < vectors.size) {
            val currVec = vectors[pVec]
            if (pElem < currVec.size) {
                ret = currVec[pElem]
                outputCount++
            }

            iterNum++
            pVec = (pVec + 1) % vectors.size
            if (pVec == 0) {
                pElem++
            }

            if (ret != null) {
                return ret
            }
        }
        return 0
    }

    fun hasNext(): Boolean {
        return outputCount < totalNum
    }
}
```

```swift
class ZigzagIterator {
    private var vectors: [[Int]]
    private var pVec: Int = 0
    private var pElem: Int = 0
    private var totalNum: Int
    private var outputCount: Int = 0

    init(_ v1: [Int], _ v2: [Int]) {
        vectors = [v1, v2]
        totalNum = v1.count + v2.count
    }

    func next() -> Int {
        var iterNum = 0
        var ret: Int? = nil

        while iterNum < vectors.count {
            let currVec = vectors[pVec]
            if pElem < currVec.count {
                ret = currVec[pElem]
                outputCount += 1
            }

            iterNum += 1
            pVec = (pVec + 1) % vectors.count
            if pVec == 0 {
                pElem += 1
            }

            if let result = ret {
                return result
            }
        }
        return 0
    }

    func hasNext() -> Bool {
        return outputCount < totalNum
    }
}
```

::tabs-end

### Time & Space Complexity

- Time Complexity:

    - For the `next()` function, at most it will take us $K$ iterations to find a valid element to output. Hence, its time complexity is $O(K)$.

    - For the `hasNext()` function, its time complexity is $O(1)$.

- Space Complexity:

    - For the `next()` function, we keep the references to all the input vectors in the variable `self.vectors`.
    - As a result, we would need $O(K)$ space for $K$ vectors.
    - In addition, we used some constant-space variables such as the pointers to the vector and the element.
    - Hence, the overall space complexity for this function is $O(K)$.

    - Note: we did not copy the input vectors, but simply keep references to them.

>  Where $K$ is the number of input vectors. Although it is always two in the setting of this problem, this variable becomes relevant once the input becomes $K$ vectors.

---

## 2. Queue of Pointers

::tabs-start

```python
class ZigzagIterator:
    def __init__(self, v1: List[int], v2: List[int]):
        self.vectors = [v1, v2]
        self.queue = deque()
        for index, vector in enumerate(self.vectors):
            # <index_of_vector, index_of_element_to_output>
            if len(vector) > 0:
                self.queue.append((index, 0))

    def next(self) -> int:

        if self.queue:
            vec_index, elem_index = self.queue.popleft()
            next_elem_index = elem_index + 1
            if next_elem_index < len(self.vectors[vec_index]):
                # append the pointer for the next round
                # if there are some elements left
                self.queue.append((vec_index, next_elem_index))

            return self.vectors[vec_index][elem_index]

        # no more element to output
        raise Exception

    def hasNext(self) -> bool:
        return len(self.queue) > 0
```

```java
class ZigzagIterator {

    private List<List<Integer>> vectors = new ArrayList<>();
    private LinkedList<Pair<Integer, Integer>> queue = new LinkedList<>();

    public ZigzagIterator(List<Integer> v1, List<Integer> v2) {
        this.vectors.add(v1);
        this.vectors.add(v2);
        int index = 0;
        for (List<Integer> vec : this.vectors) {
            if (vec.size() > 0)
                // <index_to_vec, index_to_element_within_vec>
                this.queue.add(new Pair<Integer, Integer>(index, 0));
            index++;
        }
    }

    public int next() {
        // <index_to_vec, index_to_element_within_vec>
        Pair<Integer, Integer> pointer = this.queue.removeFirst();
        Integer vecIndex = pointer.getKey();
        Integer elemIndex = pointer.getValue();
        Integer nextElemIndex = elemIndex + 1;
        // append the pointer for the next round
        // if there are some elements left.
        if (nextElemIndex < this.vectors.get(vecIndex).size())
            this.queue.addLast(new Pair<>(vecIndex, nextElemIndex));

        return this.vectors.get(vecIndex).get(elemIndex);
    }

    public boolean hasNext() {
        return this.queue.size() > 0;
    }
}
```

```cpp
class ZigzagIterator {
private:
    vector<vector<int>> vectors;
    queue<pair<int, int>> q;
    
public:
    ZigzagIterator(vector<int>& v1, vector<int>& v2) {
        vectors.push_back(v1);
        vectors.push_back(v2);
        
        for (int index = 0; index < vectors.size(); index++) {
            if (vectors[index].size() > 0) {
                // <index_to_vec, index_to_element_within_vec>
                q.push({index, 0});
            }
        }
    }
    
    int next() {
        // <index_to_vec, index_to_element_within_vec>
        pair<int, int> pointer = q.front();
        q.pop();
        
        int vecIndex = pointer.first;
        int elemIndex = pointer.second;
        int nextElemIndex = elemIndex + 1;
        
        // append the pointer for the next round
        // if there are some elements left.
        if (nextElemIndex < vectors[vecIndex].size()) {
            q.push({vecIndex, nextElemIndex});
        }
        
        return vectors[vecIndex][elemIndex];
    }
    
    bool hasNext() {
        return q.size() > 0;
    }
};
```

```javascript
class ZigzagIterator {
    /**
     * @param {Integer[]} v1
     * @param {Integer[]} v2
     */
    constructor(v1, v2) {
        this.vectors = [v1, v2];
        this.queue = new Deque(); // Using @datastructures-js/deque

        for (let index = 0; index < this.vectors.length; index++) {
            const vector = this.vectors[index];
            // <index_of_vector, index_of_element_to_output>
            if (vector.length > 0) {
                this.queue.pushBack([index, 0]);
            }
        }
    }

    /**
     * @returns {boolean}
     */
    hasNext() {
        return !this.queue.isEmpty();
    }

    /**
     * @returns {integer}
     */
    next() {
        if (!this.queue.isEmpty()) {
            const [vecIndex, elemIndex] = this.queue.popFront();
            const nextElemIndex = elemIndex + 1;

            if (nextElemIndex < this.vectors[vecIndex].length) {
                // append the pointer for the next round
                // if there are some elements left
                this.queue.pushBack([vecIndex, nextElemIndex]);
            }

            return this.vectors[vecIndex][elemIndex];
        }

        // no more element to output
        throw new Error("No more elements");
    }
}
```

```csharp
public class ZigzagIterator {
    private List<IList<int>> vectors = new List<IList<int>>();
    private Queue<(int, int)> queue = new Queue<(int, int)>();

    public ZigzagIterator(IList<int> v1, IList<int> v2) {
        vectors.Add(v1);
        vectors.Add(v2);
        for (int index = 0; index < vectors.Count; index++) {
            if (vectors[index].Count > 0) {
                // <index_to_vec, index_to_element_within_vec>
                queue.Enqueue((index, 0));
            }
        }
    }

    public int Next() {
        // <index_to_vec, index_to_element_within_vec>
        var (vecIndex, elemIndex) = queue.Dequeue();
        int nextElemIndex = elemIndex + 1;
        // append the pointer for the next round
        // if there are some elements left.
        if (nextElemIndex < vectors[vecIndex].Count) {
            queue.Enqueue((vecIndex, nextElemIndex));
        }

        return vectors[vecIndex][elemIndex];
    }

    public bool HasNext() {
        return queue.Count > 0;
    }
}
```

```go
type ZigzagIterator struct {
    vectors [][]int
    queue   [][2]int
}

func Constructor(v1, v2 []int) *ZigzagIterator {
    zi := &ZigzagIterator{
        vectors: [][]int{v1, v2},
        queue:   [][2]int{},
    }
    for index, vec := range zi.vectors {
        if len(vec) > 0 {
            // [index_to_vec, index_to_element_within_vec]
            zi.queue = append(zi.queue, [2]int{index, 0})
        }
    }
    return zi
}

func (this *ZigzagIterator) next() int {
    // [index_to_vec, index_to_element_within_vec]
    pointer := this.queue[0]
    this.queue = this.queue[1:]

    vecIndex := pointer[0]
    elemIndex := pointer[1]
    nextElemIndex := elemIndex + 1

    // append the pointer for the next round
    // if there are some elements left.
    if nextElemIndex < len(this.vectors[vecIndex]) {
        this.queue = append(this.queue, [2]int{vecIndex, nextElemIndex})
    }

    return this.vectors[vecIndex][elemIndex]
}

func (this *ZigzagIterator) hasNext() bool {
    return len(this.queue) > 0
}
```

```kotlin
class ZigzagIterator(v1: List<Int>, v2: List<Int>) {
    private val vectors = listOf(v1, v2)
    private val queue = ArrayDeque<Pair<Int, Int>>()

    init {
        for ((index, vec) in vectors.withIndex()) {
            if (vec.isNotEmpty()) {
                // <index_to_vec, index_to_element_within_vec>
                queue.add(Pair(index, 0))
            }
        }
    }

    fun next(): Int {
        // <index_to_vec, index_to_element_within_vec>
        val (vecIndex, elemIndex) = queue.removeFirst()
        val nextElemIndex = elemIndex + 1

        // append the pointer for the next round
        // if there are some elements left.
        if (nextElemIndex < vectors[vecIndex].size) {
            queue.add(Pair(vecIndex, nextElemIndex))
        }

        return vectors[vecIndex][elemIndex]
    }

    fun hasNext(): Boolean {
        return queue.isNotEmpty()
    }
}
```

```swift
class ZigzagIterator {
    private var vectors: [[Int]]
    private var queue: [(Int, Int)] = []

    init(_ v1: [Int], _ v2: [Int]) {
        vectors = [v1, v2]
        for (index, vec) in vectors.enumerated() {
            if !vec.isEmpty {
                // (index_to_vec, index_to_element_within_vec)
                queue.append((index, 0))
            }
        }
    }

    func next() -> Int {
        // (index_to_vec, index_to_element_within_vec)
        let (vecIndex, elemIndex) = queue.removeFirst()
        let nextElemIndex = elemIndex + 1

        // append the pointer for the next round
        // if there are some elements left.
        if nextElemIndex < vectors[vecIndex].count {
            queue.append((vecIndex, nextElemIndex))
        }

        return vectors[vecIndex][elemIndex]
    }

    func hasNext() -> Bool {
        return !queue.isEmpty
    }
}
```

::tabs-end

### Time & Space Complexity

- Time Complexity: $O(1)$

    - For both the `next()` function and the `hasNext()` function, we have a constant time complexity, as we discussed before.

- Space Complexity: $O(K)$

    - We use a queue to keep track of the *pointers* to the input vectors in the variable `self.vectors`.
    - As a result, we would need $O(K)$ space for $K$ vectors.

    - Although the size of the queue will reduce over time once we exhaust some shorter vectors, the space complexity for both functions is still $O(K)$.

>  Where $K$ is the number of input vectors. Although it is always two in the setting of this problem, this variable becomes relevant once the input becomes $K$ vectors.
