## 1. Brute Force

::tabs-start

```python
class Solution:
    def findCelebrity(self, n: int) -> int:
        self.n = n
        for i in range(n):
            if self.is_celebrity(i):
                return i
        return -1
    
    def is_celebrity(self, i):
        for j in range(self.n):
            if i == j: continue # Don't ask if they know themselves.
            if knows(i, j) or not knows(j, i):
                return False
        return True
```

```java
public class Solution extends Relation {
    
    private int numberOfPeople;
    
    public int findCelebrity(int n) {
        numberOfPeople = n;
        for (int i = 0; i < n; i++) {
            if (isCelebrity(i)) {
                return i;
            }
        }
        return -1;
    }
    
    private boolean isCelebrity(int i) {
        for (int j = 0; j < numberOfPeople; j++) {
            if (i == j) continue; // Don't ask if they know themselves.
            if (knows(i, j) || !knows(j, i)) {
                return false;
            }
        }
        return true;
    }
}
```

```javascript
function solution(knows) {
    function isCelebrity(i, n) {
        for (let j = 0; j < n; j++) {
            if (i === j) continue;
            if (knows(i, j) || !knows(j, i)) {
                return false;
            }
        }
        return true;
    }

    return function findCelebrity(n) {
        for (let i = 0; i < n; i++) {
            if (isCelebrity(i, n)) {
                return i;
            }
        }
        return -1;
    }
}
```

```csharp
/* The Knows API is defined in the parent class Relation.
      bool Knows(int a, int b); */

public class Solution : Relation {
    private int numberOfPeople;

    public int FindCelebrity(int n) {
        numberOfPeople = n;
        for (int i = 0; i < n; i++) {
            if (IsCelebrity(i)) {
                return i;
            }
        }
        return -1;
    }

    private bool IsCelebrity(int i) {
        for (int j = 0; j < numberOfPeople; j++) {
            if (i == j) continue;
            if (Knows(i, j) || !Knows(j, i)) {
                return false;
            }
        }
        return true;
    }
}
```

```go
/* The knows API is already defined for you.
      knows := func(a, b int) bool */

func solution(knows func(a, b int) bool) func(n int) int {
    return func(n int) int {
        isCelebrity := func(i int) bool {
            for j := 0; j < n; j++ {
                if i == j {
                    continue
                }
                if knows(i, j) || !knows(j, i) {
                    return false
                }
            }
            return true
        }

        for i := 0; i < n; i++ {
            if isCelebrity(i) {
                return i
            }
        }
        return -1
    }
}
```

```kotlin
/* The knows API is defined in the parent class Relation.
      fun knows(a: Int, b: Int): Boolean */

class Solution : Relation() {
    private var numberOfPeople = 0

    override fun findCelebrity(n: Int): Int {
        numberOfPeople = n
        for (i in 0 until n) {
            if (isCelebrity(i)) {
                return i
            }
        }
        return -1
    }

    private fun isCelebrity(i: Int): Boolean {
        for (j in 0 until numberOfPeople) {
            if (i == j) continue
            if (knows(i, j) || !knows(j, i)) {
                return false
            }
        }
        return true
    }
}
```

```swift
/* The knows API is defined in the parent class Relation.
      func knows(_ a: Int, _ b: Int) -> Bool */

class Solution : Relation {
    private var numberOfPeople = 0

    func findCelebrity(_ n: Int) -> Int {
        numberOfPeople = n
        for i in 0..<n {
            if isCelebrity(i) {
                return i
            }
        }
        return -1
    }

    private func isCelebrity(_ i: Int) -> Bool {
        for j in 0..<numberOfPeople {
            if i == j { continue }
            if knows(i, j) || !knows(j, i) {
                return false
            }
        }
        return true
    }
}
```

::tabs-end

### Time & Space Complexity

We don't know what time and space the `knows(...)` API uses. Because it's not our concern, we'll assume it's `O(1)` for the purpose of analysing our algorithm.

- Time complexity: $O(n^2)$
- Space complexity: $O(1)$

>  Where $n$ is the number of nodes in the graph.

---

## 2. Logical Deduction

::tabs-start

```python
class Solution:
    def findCelebrity(self, n: int) -> int:
        self.n = n
        celebrity_candidate = 0
        for i in range(1, n):
            if knows(celebrity_candidate, i):
                celebrity_candidate = i
        if self.is_celebrity(celebrity_candidate):
            return celebrity_candidate
        return -1

    def is_celebrity(self, i):
        for j in range(self.n):
            if i == j: continue
            if knows(i, j) or not knows(j, i):
                return False
        return True
```

```java
public class Solution extends Relation {
    
    private int numberOfPeople;
    
    public int findCelebrity(int n) {
        numberOfPeople = n;
        int celebrityCandidate = 0;
        for (int i = 0; i < n; i++) {
            if (knows(celebrityCandidate, i)) {
                celebrityCandidate = i;
            }
        }
        if (isCelebrity(celebrityCandidate)) {
            return celebrityCandidate;
        }
        return -1;
    }
    
    private boolean isCelebrity(int i) {
        for (int j = 0; j < numberOfPeople; j++) {
            if (i == j) continue; // Don't ask if they know themselves.
            if (knows(i, j) || !knows(j, i)) {
                return false;
            }
        }
        return true;
    }
}
```

```cpp
class Solution {
private:
    int n;
    
    bool is_celebrity(int i) {
        for (int j = 0; j < n; j++) {
            if (i == j) continue;
            if (knows(i, j) || !knows(j, i)) {
                return false;
            }
        }
        return true;
    }
    
public:
    int findCelebrity(int n) {
        this->n = n;
        int celebrity_candidate = 0;
        
        for (int i = 1; i < n; i++) {
            if (knows(celebrity_candidate, i)) {
                celebrity_candidate = i;
            }
        }
        
        if (is_celebrity(celebrity_candidate)) {
            return celebrity_candidate;
        }
        return -1;
    }
};
```

```javascript
function solution(knows) {
    function isCelebrity(i, n) {
        for (let j = 0; j < n; j++) {
            if (i === j) continue;
            if (knows(i, j) || !knows(j, i)) {
                return false;
            }
        }
        return true;
    }

    return function findCelebrity(n) {
        let celebrityCandidate = 0;
        for (let i = 0; i < n; i++) {
            if (knows(celebrityCandidate, i)) {
                celebrityCandidate = i;
            }
        }
        if (isCelebrity(celebrityCandidate, n)) {
            return celebrityCandidate;
        }
        return -1;
    }
}
```

```csharp
/* The Knows API is defined in the parent class Relation.
      bool Knows(int a, int b); */

public class Solution : Relation {
    private int numberOfPeople;

    public int FindCelebrity(int n) {
        numberOfPeople = n;
        int celebrityCandidate = 0;
        for (int i = 0; i < n; i++) {
            if (Knows(celebrityCandidate, i)) {
                celebrityCandidate = i;
            }
        }
        if (IsCelebrity(celebrityCandidate)) {
            return celebrityCandidate;
        }
        return -1;
    }

    private bool IsCelebrity(int i) {
        for (int j = 0; j < numberOfPeople; j++) {
            if (i == j) continue;
            if (Knows(i, j) || !Knows(j, i)) {
                return false;
            }
        }
        return true;
    }
}
```

```go
/* The knows API is already defined for you.
      knows := func(a, b int) bool */

func solution(knows func(a, b int) bool) func(n int) int {
    return func(n int) int {
        isCelebrity := func(i int) bool {
            for j := 0; j < n; j++ {
                if i == j {
                    continue
                }
                if knows(i, j) || !knows(j, i) {
                    return false
                }
            }
            return true
        }

        celebrityCandidate := 0
        for i := 1; i < n; i++ {
            if knows(celebrityCandidate, i) {
                celebrityCandidate = i
            }
        }
        if isCelebrity(celebrityCandidate) {
            return celebrityCandidate
        }
        return -1
    }
}
```

```kotlin
/* The knows API is defined in the parent class Relation.
      fun knows(a: Int, b: Int): Boolean */

class Solution : Relation() {
    private var numberOfPeople = 0

    override fun findCelebrity(n: Int): Int {
        numberOfPeople = n
        var celebrityCandidate = 0
        for (i in 0 until n) {
            if (knows(celebrityCandidate, i)) {
                celebrityCandidate = i
            }
        }
        if (isCelebrity(celebrityCandidate)) {
            return celebrityCandidate
        }
        return -1
    }

    private fun isCelebrity(i: Int): Boolean {
        for (j in 0 until numberOfPeople) {
            if (i == j) continue
            if (knows(i, j) || !knows(j, i)) {
                return false
            }
        }
        return true
    }
}
```

```swift
/* The knows API is defined in the parent class Relation.
      func knows(_ a: Int, _ b: Int) -> Bool */

class Solution : Relation {
    private var numberOfPeople = 0

    func findCelebrity(_ n: Int) -> Int {
        numberOfPeople = n
        var celebrityCandidate = 0
        for i in 1..<n {
            if knows(celebrityCandidate, i) {
                celebrityCandidate = i
            }
        }
        if isCelebrity(celebrityCandidate) {
            return celebrityCandidate
        }
        return -1
    }

    private func isCelebrity(_ i: Int) -> Bool {
        for j in 0..<numberOfPeople {
            if i == j { continue }
            if knows(i, j) || !knows(j, i) {
                return false
            }
        }
        return true
    }
}
```

::tabs-end

### Time & Space Complexity

We don't know what time and space the `knows(...)` API uses. Because it's not our concern, we'll assume it's `O(1)` for the purpose of analysing our algorithm.

- Time complexity: $O(n)$
- Space complexity: $O(1)$

>  Where $n$ is the number of nodes in the graph.

---

## 3. Logical Deduction with Caching

::tabs-start

```python
from functools import lru_cache

class Solution:
    
    @lru_cache(maxsize=None)
    def cachedKnows(self, a, b):
        return knows(a, b)
    
    def findCelebrity(self, n: int) -> int:
        self.n = n
        celebrity_candidate = 0
        for i in range(1, n):
            if self.cachedKnows(celebrity_candidate, i):
                celebrity_candidate = i
        if self.is_celebrity(celebrity_candidate):
            return celebrity_candidate
        return -1

    def is_celebrity(self, i):
        for j in range(self.n):
            if i == j: continue
            if self.cachedKnows(i, j) or not self.cachedKnows(j, i):
                return False
        return True
```

```java
public class Solution extends Relation {
    
    private int numberOfPeople;
    private Map<Pair<Integer, Integer>, Boolean> cache = new HashMap<>(); 
    
    @Override
    public boolean knows(int a, int b) {
        if (!cache.containsKey(new Pair(a, b))) {
            cache.put(new Pair(a, b), super.knows(a, b));
        }
        return cache.get(new Pair(a, b));
    }
    
    public int findCelebrity(int n) {
        numberOfPeople = n;
        int celebrityCandidate = 0;
        for (int i = 0; i < n; i++) {
            if (knows(celebrityCandidate, i)) {
                celebrityCandidate = i;
            }
        }
        if (isCelebrity(celebrityCandidate)) {
            return celebrityCandidate;
        }
        return -1;
    }
    
    private boolean isCelebrity(int i) {
        for (int j = 0; j < numberOfPeople; j++) {
            if (i == j) continue; // Don't ask if they know themselves.
            if (knows(i, j) || !knows(j, i)) {
                return false;
            }
        }
        return true;
    }
}
```

```javascript
function cached(f) {
    const cache = new Map();
    return function(...args) {
        const cacheKey = args.join(',');
        if (!cache.has(cacheKey)) {
            const value = f(...args);
            cache.set(cacheKey, value);
        }

        return cache.get(cacheKey);
    }
}

function solution(knows) {
    knows = cached(knows);

    function isCelebrity(i, n) {
        for (let j = 0; j < n; j++) {
            if (i === j) continue;
            if (knows(i, j) || !knows(j, i)) {
                return false;
            }
        }
        return true;
    }

    return function findCelebrity(n) {
        let celebrityCandidate = 0;
        for (let i = 0; i < n; i++) {
            if (knows(celebrityCandidate, i)) {
                celebrityCandidate = i;
            }
        }
        if (isCelebrity(celebrityCandidate, n)) {
            return celebrityCandidate;
        }
        return -1;
    }
}
```

```csharp
/* The Knows API is defined in the parent class Relation.
      bool Knows(int a, int b); */

public class Solution : Relation {
    private int numberOfPeople;
    private Dictionary<(int, int), bool> cache = new Dictionary<(int, int), bool>();

    private bool CachedKnows(int a, int b) {
        if (!cache.ContainsKey((a, b))) {
            cache[(a, b)] = Knows(a, b);
        }
        return cache[(a, b)];
    }

    public int FindCelebrity(int n) {
        numberOfPeople = n;
        int celebrityCandidate = 0;
        for (int i = 0; i < n; i++) {
            if (CachedKnows(celebrityCandidate, i)) {
                celebrityCandidate = i;
            }
        }
        if (IsCelebrity(celebrityCandidate)) {
            return celebrityCandidate;
        }
        return -1;
    }

    private bool IsCelebrity(int i) {
        for (int j = 0; j < numberOfPeople; j++) {
            if (i == j) continue;
            if (CachedKnows(i, j) || !CachedKnows(j, i)) {
                return false;
            }
        }
        return true;
    }
}
```

```go
/* The knows API is already defined for you.
      knows := func(a, b int) bool */

func solution(knows func(a, b int) bool) func(n int) int {
    cache := make(map[[2]int]bool)

    cachedKnows := func(a, b int) bool {
        key := [2]int{a, b}
        if val, ok := cache[key]; ok {
            return val
        }
        result := knows(a, b)
        cache[key] = result
        return result
    }

    return func(n int) int {
        isCelebrity := func(i int) bool {
            for j := 0; j < n; j++ {
                if i == j {
                    continue
                }
                if cachedKnows(i, j) || !cachedKnows(j, i) {
                    return false
                }
            }
            return true
        }

        celebrityCandidate := 0
        for i := 1; i < n; i++ {
            if cachedKnows(celebrityCandidate, i) {
                celebrityCandidate = i
            }
        }
        if isCelebrity(celebrityCandidate) {
            return celebrityCandidate
        }
        return -1
    }
}
```

```kotlin
/* The knows API is defined in the parent class Relation.
      fun knows(a: Int, b: Int): Boolean */

class Solution : Relation() {
    private var numberOfPeople = 0
    private val cache = HashMap<Pair<Int, Int>, Boolean>()

    private fun cachedKnows(a: Int, b: Int): Boolean {
        return cache.getOrPut(Pair(a, b)) { knows(a, b) }
    }

    override fun findCelebrity(n: Int): Int {
        numberOfPeople = n
        var celebrityCandidate = 0
        for (i in 0 until n) {
            if (cachedKnows(celebrityCandidate, i)) {
                celebrityCandidate = i
            }
        }
        if (isCelebrity(celebrityCandidate)) {
            return celebrityCandidate
        }
        return -1
    }

    private fun isCelebrity(i: Int): Boolean {
        for (j in 0 until numberOfPeople) {
            if (i == j) continue
            if (cachedKnows(i, j) || !cachedKnows(j, i)) {
                return false
            }
        }
        return true
    }
}
```

```swift
/* The knows API is defined in the parent class Relation.
      func knows(_ a: Int, _ b: Int) -> Bool */

class Solution : Relation {
    private var numberOfPeople = 0
    private var cache = [String: Bool]()

    private func cachedKnows(_ a: Int, _ b: Int) -> Bool {
        let key = "\(a),\(b)"
        if let cached = cache[key] {
            return cached
        }
        let result = knows(a, b)
        cache[key] = result
        return result
    }

    func findCelebrity(_ n: Int) -> Int {
        numberOfPeople = n
        var celebrityCandidate = 0
        for i in 1..<n {
            if cachedKnows(celebrityCandidate, i) {
                celebrityCandidate = i
            }
        }
        if isCelebrity(celebrityCandidate) {
            return celebrityCandidate
        }
        return -1
    }

    private func isCelebrity(_ i: Int) -> Bool {
        for j in 0..<numberOfPeople {
            if i == j { continue }
            if cachedKnows(i, j) || !cachedKnows(j, i) {
                return false
            }
        }
        return true
    }
}
```

::tabs-end

### Time & Space Complexity

We don't know what time and space the `knows(...)` API uses. Because it's not our concern, we'll assume it's `O(1)` for the purpose of analysing our algorithm.

- Time complexity: $O(n)$
- Space complexity: $O(n)$

>  Where $n$ is the number of nodes in the graph.
