## 1. Brute Force

::tabs-start

```python
class FoodRatings:

    def __init__(self, foods: List[str], cuisines: List[str], ratings: List[int]):
        self.foodToRating = {} # food -> rating
        self.cuisineToFood = defaultdict(list) # cuisine -> [food]
        for i in range(len(foods)):
            self.foodToRating[foods[i]] = ratings[i]
            self.cuisineToFood[cuisines[i]].append(foods[i])

    def changeRating(self, food: str, newRating: int) -> None:
        self.foodToRating[food] = newRating

    def highestRated(self, cuisine: str) -> str:
        maxR, res = 0, ""
        for food in self.cuisineToFood[cuisine]:
            r = self.foodToRating[food]
            if r > maxR or (r == maxR and food < res):
                res = food
                maxR = r
        return res
```

```java
public class FoodRatings {
    private Map<String, Integer> foodToRating;
    private Map<String, List<String>> cuisineToFood;

    public FoodRatings(String[] foods, String[] cuisines, int[] ratings) {
        foodToRating = new HashMap<>();
        cuisineToFood = new HashMap<>();
        for (int i = 0; i < foods.length; i++) {
            foodToRating.put(foods[i], ratings[i]);
            cuisineToFood.computeIfAbsent(cuisines[i], k -> new ArrayList<>()).add(foods[i]);
        }
    }

    public void changeRating(String food, int newRating) {
        foodToRating.put(food, newRating);
    }

    public String highestRated(String cuisine) {
        int maxR = 0;
        String res = "";
        for (String food : cuisineToFood.get(cuisine)) {
            int r = foodToRating.get(food);
            if (r > maxR || (r == maxR && food.compareTo(res) < 0)) {
                res = food;
                maxR = r;
            }
        }
        return res;
    }
}
```

```cpp
class FoodRatings {
private:
    unordered_map<string, int> foodToRating;
    unordered_map<string, vector<string>> cuisineToFood;

public:
    FoodRatings(vector<string>& foods, vector<string>& cuisines, vector<int>& ratings) {
        for (size_t i = 0; i < foods.size(); i++) {
            foodToRating[foods[i]] = ratings[i];
            cuisineToFood[cuisines[i]].push_back(foods[i]);
        }
    }

    void changeRating(string food, int newRating) {
        foodToRating[food] = newRating;
    }

    string highestRated(string cuisine) {
        int maxR = 0;
        string res = "";
        for (const string& food : cuisineToFood[cuisine]) {
            int r = foodToRating[food];
            if (r > maxR || (r == maxR && food < res)) {
                res = food;
                maxR = r;
            }
        }
        return res;
    }
};
```

```javascript
class FoodRatings {
    /**
     * @param {string[]} foods
     * @param {string[]} cuisines
     * @param {number[]} ratings
     */
    constructor(foods, cuisines, ratings) {
        this.foodToRating = new Map();
        this.cuisineToFood = new Map();

        for (let i = 0; i < foods.length; i++) {
            this.foodToRating.set(foods[i], ratings[i]);
            if (!this.cuisineToFood.has(cuisines[i])) {
                this.cuisineToFood.set(cuisines[i], []);
            }
            this.cuisineToFood.get(cuisines[i]).push(foods[i]);
        }
    }

    /**
     * @param {string} food
     * @param {number} newRating
     * @return {void}
     */
    changeRating(food, newRating) {
        this.foodToRating.set(food, newRating);
    }

    /**
     * @param {string} cuisine
     * @return {string}
     */
    highestRated(cuisine) {
        let maxR = 0,
            res = '';
        for (let food of this.cuisineToFood.get(cuisine)) {
            let r = this.foodToRating.get(food);
            if (r > maxR || (r === maxR && food < res)) {
                res = food;
                maxR = r;
            }
        }
        return res;
    }
}
```

```csharp
public class FoodRatings {
    private Dictionary<string, int> foodToRating;
    private Dictionary<string, List<string>> cuisineToFood;

    public FoodRatings(string[] foods, string[] cuisines, int[] ratings) {
        foodToRating = new Dictionary<string, int>();
        cuisineToFood = new Dictionary<string, List<string>>();
        for (int i = 0; i < foods.Length; i++) {
            foodToRating[foods[i]] = ratings[i];
            if (!cuisineToFood.ContainsKey(cuisines[i])) {
                cuisineToFood[cuisines[i]] = new List<string>();
            }
            cuisineToFood[cuisines[i]].Add(foods[i]);
        }
    }

    public void ChangeRating(string food, int newRating) {
        foodToRating[food] = newRating;
    }

    public string HighestRated(string cuisine) {
        int maxR = 0;
        string res = "";
        foreach (string food in cuisineToFood[cuisine]) {
            int r = foodToRating[food];
            if (r > maxR || (r == maxR && string.Compare(food, res) < 0)) {
                res = food;
                maxR = r;
            }
        }
        return res;
    }
}
```

```go
type FoodRatings struct {
    foodToRating  map[string]int
    cuisineToFood map[string][]string
}

func Constructor(foods []string, cuisines []string, ratings []int) FoodRatings {
    f := FoodRatings{
        foodToRating:  make(map[string]int),
        cuisineToFood: make(map[string][]string),
    }
    for i := 0; i < len(foods); i++ {
        f.foodToRating[foods[i]] = ratings[i]
        f.cuisineToFood[cuisines[i]] = append(f.cuisineToFood[cuisines[i]], foods[i])
    }
    return f
}

func (this *FoodRatings) ChangeRating(food string, newRating int) {
    this.foodToRating[food] = newRating
}

func (this *FoodRatings) HighestRated(cuisine string) string {
    maxR := 0
    res := ""
    for _, food := range this.cuisineToFood[cuisine] {
        r := this.foodToRating[food]
        if r > maxR || (r == maxR && food < res) {
            res = food
            maxR = r
        }
    }
    return res
}
```

```kotlin
class FoodRatings(foods: Array<String>, cuisines: Array<String>, ratings: IntArray) {
    private val foodToRating = mutableMapOf<String, Int>()
    private val cuisineToFood = mutableMapOf<String, MutableList<String>>()

    init {
        for (i in foods.indices) {
            foodToRating[foods[i]] = ratings[i]
            cuisineToFood.getOrPut(cuisines[i]) { mutableListOf() }.add(foods[i])
        }
    }

    fun changeRating(food: String, newRating: Int) {
        foodToRating[food] = newRating
    }

    fun highestRated(cuisine: String): String {
        var maxR = 0
        var res = ""
        for (food in cuisineToFood[cuisine]!!) {
            val r = foodToRating[food]!!
            if (r > maxR || (r == maxR && food < res)) {
                res = food
                maxR = r
            }
        }
        return res
    }
}
```

```swift
class FoodRatings {
    private var foodToRating: [String: Int]
    private var cuisineToFood: [String: [String]]

    init(_ foods: [String], _ cuisines: [String], _ ratings: [Int]) {
        foodToRating = [:]
        cuisineToFood = [:]
        for i in 0..<foods.count {
            foodToRating[foods[i]] = ratings[i]
            cuisineToFood[cuisines[i], default: []].append(foods[i])
        }
    }

    func changeRating(_ food: String, _ newRating: Int) {
        foodToRating[food] = newRating
    }

    func highestRated(_ cuisine: String) -> String {
        var maxR = 0
        var res = ""
        for food in cuisineToFood[cuisine]! {
            let r = foodToRating[food]!
            if r > maxR || (r == maxR && food < res) {
                res = food
                maxR = r
            }
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity:
    - $O(n)$ time for initialization.
    - $O(1)$ time for each $changeRating()$ function call.
    - $O(n)$ time for each $highestRated()$ function call.
- Space complexity: $O(n)$

---

## 2. Heap

::tabs-start

```python
class FoodRatings:

    def __init__(self, foods: List[str], cuisines: List[str], ratings: List[int]):
        self.foodToRating = {}  # food -> rating
        self.foodToCuisine = {}  # food -> cuisine
        self.cuisineToHeap = defaultdict(list)  # cuisine -> max_heap

        for i in range(len(foods)):
            self.foodToRating[foods[i]] = ratings[i]
            self.foodToCuisine[foods[i]] = cuisines[i]
            heappush(self.cuisineToHeap[cuisines[i]], (-ratings[i], foods[i]))

    def changeRating(self, food: str, newRating: int) -> None:
        cuisine = self.foodToCuisine[food]
        self.foodToRating[food] = newRating
        heappush(self.cuisineToHeap[cuisine], (-newRating, food))

    def highestRated(self, cuisine: str) -> str:
        heap = self.cuisineToHeap[cuisine]
        while heap:
            rating, food = heap[0]
            if -rating == self.foodToRating[food]:
                return food
            heappop(heap)
```

```java
public class FoodRatings {
    private Map<String, Integer> foodToRating;
    private Map<String, String> foodToCuisine;
    private Map<String, PriorityQueue<Food>> cuisineToHeap;

    private static class Food {
        int rating;
        String name;

        Food(int rating, String name) {
            this.rating = rating;
            this.name = name;
        }
    }

    public FoodRatings(String[] foods, String[] cuisines, int[] ratings) {
        foodToRating = new HashMap<>();
        foodToCuisine = new HashMap<>();
        cuisineToHeap = new HashMap<>();

        for (int i = 0; i < foods.length; i++) {
            foodToRating.put(foods[i], ratings[i]);
            foodToCuisine.put(foods[i], cuisines[i]);
            cuisineToHeap
                .computeIfAbsent(cuisines[i], k -> new PriorityQueue<>(
                    (a, b) -> a.rating == b.rating ? a.name.compareTo(b.name) : b.rating - a.rating))
                .offer(new Food(ratings[i], foods[i]));
        }
    }

    public void changeRating(String food, int newRating) {
        String cuisine = foodToCuisine.get(food);
        foodToRating.put(food, newRating);
        cuisineToHeap.get(cuisine).offer(new Food(newRating, food));
    }

    public String highestRated(String cuisine) {
        PriorityQueue<Food> heap = cuisineToHeap.get(cuisine);
        while (!heap.isEmpty()) {
            Food top = heap.peek();
            if (foodToRating.get(top.name) == top.rating) {
                return top.name;
            }
            heap.poll();
        }
        return "";
    }
}
```

```cpp
class FoodRatings {
    unordered_map<string, int> foodToRating;
    unordered_map<string, string> foodToCuisine;
    struct cmp {
        bool operator()(const pair<int, string>& a, const pair<int, string>& b) {
            if (a.first == b.first) return a.second > b.second;
            return a.first < b.first;
        }
    };
    unordered_map<string, priority_queue<pair<int, string>,
                    vector<pair<int, string>>, cmp>> cuisineToHeap;

public:
    FoodRatings(vector<string>& foods, vector<string>& cuisines, vector<int>& ratings) {
        for (int i = 0; i < foods.size(); i++) {
            foodToRating[foods[i]] = ratings[i];
            foodToCuisine[foods[i]] = cuisines[i];
            cuisineToHeap[cuisines[i]].push({ratings[i], foods[i]});
        }
    }

    void changeRating(string food, int newRating) {
        string cuisine = foodToCuisine[food];
        foodToRating[food] = newRating;
        cuisineToHeap[cuisine].push({newRating, food});
    }

    string highestRated(string cuisine) {
        auto &heap = cuisineToHeap[cuisine];
        while (!heap.empty()) {
            auto [rating, food] = heap.top();
            if (foodToRating[food] == rating) return food;
            heap.pop();
        }
        return "";
    }
};
```

```javascript
class FoodRatings {
    /**
     * @param {string[]} foods
     * @param {string[]} cuisines
     * @param {number[]} ratings
     */
    constructor(foods, cuisines, ratings) {
        this.foodToRating = new Map();
        this.foodToCuisine = new Map();
        this.cuisineToHeap = new Map();

        for (let i = 0; i < foods.length; i++) {
            this.foodToRating.set(foods[i], ratings[i]);
            this.foodToCuisine.set(foods[i], cuisines[i]);
            if (!this.cuisineToHeap.has(cuisines[i])) {
                this.cuisineToHeap.set(
                    cuisines[i],
                    new PriorityQueue(
                        (a, b) =>
                            b.rating - a.rating || a.name.localeCompare(b.name),
                    ),
                );
            }
            this.cuisineToHeap
                .get(cuisines[i])
                .enqueue({ rating: ratings[i], name: foods[i] });
        }
    }

    /**
     * @param {string} food
     * @param {number} newRating
     * @return {void}
     */
    changeRating(food, newRating) {
        let cuisine = this.foodToCuisine.get(food);
        this.foodToRating.set(food, newRating);
        this.cuisineToHeap
            .get(cuisine)
            .enqueue({ rating: newRating, name: food });
    }

    /**
     * @param {string} cuisine
     * @return {string}
     */
    highestRated(cuisine) {
        let heap = this.cuisineToHeap.get(cuisine);
        while (!heap.isEmpty()) {
            let top = heap.front();
            if (this.foodToRating.get(top.name) === top.rating) {
                return top.name;
            }
            heap.dequeue();
        }
        return '';
    }
}
```

```csharp
public class FoodRatings {
    private Dictionary<string, int> foodToRating;
    private Dictionary<string, string> foodToCuisine;
    private Dictionary<string, PriorityQueue<(string name, int rating), (int rating, string name)>> cuisineToHeap;

    public FoodRatings(string[] foods, string[] cuisines, int[] ratings) {
        foodToRating = new Dictionary<string, int>();
        foodToCuisine = new Dictionary<string, string>();
        cuisineToHeap = new Dictionary<string, PriorityQueue<(string, int), (int, string)>>();

        for (int i = 0; i < foods.Length; i++) {
            foodToRating[foods[i]] = ratings[i];
            foodToCuisine[foods[i]] = cuisines[i];
            if (!cuisineToHeap.ContainsKey(cuisines[i])) {
                cuisineToHeap[cuisines[i]] = new PriorityQueue<(string, int), (int, string)>(
                    Comparer<(int rating, string name)>.Create((a, b) => {
                        if (a.rating != b.rating) return b.rating.CompareTo(a.rating);
                        return a.name.CompareTo(b.name);
                    })
                );
            }
            cuisineToHeap[cuisines[i]].Enqueue((foods[i], ratings[i]), (-ratings[i], foods[i]));
        }
    }

    public void ChangeRating(string food, int newRating) {
        string cuisine = foodToCuisine[food];
        foodToRating[food] = newRating;
        cuisineToHeap[cuisine].Enqueue((food, newRating), (-newRating, food));
    }

    public string HighestRated(string cuisine) {
        var heap = cuisineToHeap[cuisine];
        while (heap.Count > 0) {
            var top = heap.Peek();
            if (foodToRating[top.name] == top.rating) {
                return top.name;
            }
            heap.Dequeue();
        }
        return "";
    }
}
```

```go
import (
    "container/heap"
)

type Food struct {
    rating int
    name   string
}

type MaxHeap []Food

func (h MaxHeap) Len() int { return len(h) }
func (h MaxHeap) Less(i, j int) bool {
    if h[i].rating == h[j].rating {
        return h[i].name < h[j].name
    }
    return h[i].rating > h[j].rating
}
func (h MaxHeap) Swap(i, j int) { h[i], h[j] = h[j], h[i] }
func (h *MaxHeap) Push(x interface{}) { *h = append(*h, x.(Food)) }
func (h *MaxHeap) Pop() interface{} {
    old := *h
    n := len(old)
    x := old[n-1]
    *h = old[0 : n-1]
    return x
}

type FoodRatings struct {
    foodToRating  map[string]int
    foodToCuisine map[string]string
    cuisineToHeap map[string]*MaxHeap
}

func Constructor(foods []string, cuisines []string, ratings []int) FoodRatings {
    f := FoodRatings{
        foodToRating:  make(map[string]int),
        foodToCuisine: make(map[string]string),
        cuisineToHeap: make(map[string]*MaxHeap),
    }
    for i := 0; i < len(foods); i++ {
        f.foodToRating[foods[i]] = ratings[i]
        f.foodToCuisine[foods[i]] = cuisines[i]
        if _, ok := f.cuisineToHeap[cuisines[i]]; !ok {
            f.cuisineToHeap[cuisines[i]] = &MaxHeap{}
            heap.Init(f.cuisineToHeap[cuisines[i]])
        }
        heap.Push(f.cuisineToHeap[cuisines[i]], Food{ratings[i], foods[i]})
    }
    return f
}

func (this *FoodRatings) ChangeRating(food string, newRating int) {
    cuisine := this.foodToCuisine[food]
    this.foodToRating[food] = newRating
    heap.Push(this.cuisineToHeap[cuisine], Food{newRating, food})
}

func (this *FoodRatings) HighestRated(cuisine string) string {
    h := this.cuisineToHeap[cuisine]
    for h.Len() > 0 {
        top := (*h)[0]
        if this.foodToRating[top.name] == top.rating {
            return top.name
        }
        heap.Pop(h)
    }
    return ""
}
```

```kotlin
import java.util.PriorityQueue

class FoodRatings(foods: Array<String>, cuisines: Array<String>, ratings: IntArray) {
    private val foodToRating = mutableMapOf<String, Int>()
    private val foodToCuisine = mutableMapOf<String, String>()
    private val cuisineToHeap = mutableMapOf<String, PriorityQueue<Pair<Int, String>>>()

    init {
        for (i in foods.indices) {
            foodToRating[foods[i]] = ratings[i]
            foodToCuisine[foods[i]] = cuisines[i]
            cuisineToHeap.getOrPut(cuisines[i]) {
                PriorityQueue(compareBy({ -it.first }, { it.second }))
            }.offer(Pair(ratings[i], foods[i]))
        }
    }

    fun changeRating(food: String, newRating: Int) {
        val cuisine = foodToCuisine[food]!!
        foodToRating[food] = newRating
        cuisineToHeap[cuisine]!!.offer(Pair(newRating, food))
    }

    fun highestRated(cuisine: String): String {
        val heap = cuisineToHeap[cuisine]!!
        while (heap.isNotEmpty()) {
            val top = heap.peek()
            if (foodToRating[top.second] == top.first) {
                return top.second
            }
            heap.poll()
        }
        return ""
    }
}
```

```swift
class FoodRatings {
    private var foodToRating: [String: Int]
    private var foodToCuisine: [String: String]
    private var cuisineToFood: [String: [(Int, String)]]

    init(_ foods: [String], _ cuisines: [String], _ ratings: [Int]) {
        foodToRating = [:]
        foodToCuisine = [:]
        cuisineToFood = [:]
        for i in 0..<foods.count {
            foodToRating[foods[i]] = ratings[i]
            foodToCuisine[foods[i]] = cuisines[i]
            cuisineToFood[cuisines[i], default: []].append((-ratings[i], foods[i]))
        }
        for key in cuisineToFood.keys {
            cuisineToFood[key]!.sort { $0.0 == $1.0 ? $0.1 < $1.1 : $0.0 < $1.0 }
        }
    }

    func changeRating(_ food: String, _ newRating: Int) {
        let cuisine = foodToCuisine[food]!
        foodToRating[food] = newRating
        cuisineToFood[cuisine]!.append((-newRating, food))
        cuisineToFood[cuisine]!.sort { $0.0 == $1.0 ? $0.1 < $1.1 : $0.0 < $1.0 }
    }

    func highestRated(_ cuisine: String) -> String {
        while !cuisineToFood[cuisine]!.isEmpty {
            let top = cuisineToFood[cuisine]![0]
            if foodToRating[top.1] == -top.0 {
                return top.1
            }
            cuisineToFood[cuisine]!.removeFirst()
        }
        return ""
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity:
    - $O(n \log n)$ time for initialization.
    - $O(\log n)$ time for each $changeRating()$ function call.
    - $O(\log n)$ time for each $highestRated()$ function call.
- Space complexity: $O(n)$

---

## 3. Sorted Set

::tabs-start

```python
class FoodRatings:

    def __init__(self, foods: List[str], cuisines: List[str], ratings: List[int]):
        self.foodToRating = {} # food -> rating
        self.foodToCuisine = {} # food -> cuisine
        self.cuisineToSortedSet = defaultdict(SortedSet) # cuisine -> SortedSet[(rating, food)]

        for i in range(len(foods)):
            self.foodToRating[foods[i]] = ratings[i]
            self.foodToCuisine[foods[i]] = cuisines[i]
            self.cuisineToSortedSet[cuisines[i]].add((-ratings[i], foods[i]))

    def changeRating(self, food: str, newRating: int) -> None:
        cuisine = self.foodToCuisine[food]
        oldRating = self.foodToRating[food]

        self.cuisineToSortedSet[cuisine].remove((-oldRating, food))
        self.foodToRating[food] = newRating
        self.cuisineToSortedSet[cuisine].add((-newRating, food))

    def highestRated(self, cuisine: str) -> str:
        return self.cuisineToSortedSet[cuisine][0][1]
```

```java
public class FoodRatings {
    private Map<String, Integer> foodToRating;
    private Map<String, String> foodToCuisine;
    private Map<String, TreeSet<FoodPair>> cuisineToSortedSet;

    private static class FoodPair {
        int rating;
        String food;

        FoodPair(int rating, String food) {
            this.rating = rating;
            this.food = food;
        }
    }

    public FoodRatings(String[] foods, String[] cuisines, int[] ratings) {
        foodToRating = new HashMap<>();
        foodToCuisine = new HashMap<>();
        cuisineToSortedSet = new HashMap<>();

        for (int i = 0; i < foods.length; i++) {
            foodToRating.put(foods[i], ratings[i]);
            foodToCuisine.put(foods[i], cuisines[i]);
            cuisineToSortedSet.computeIfAbsent(cuisines[i], k -> new TreeSet<>((a, b) -> {
                if (a.rating != b.rating) return b.rating - a.rating;
                return a.food.compareTo(b.food);
            })).add(new FoodPair(ratings[i], foods[i]));
        }
    }

    public void changeRating(String food, int newRating) {
        String cuisine = foodToCuisine.get(food);
        int oldRating = foodToRating.get(food);
        TreeSet<FoodPair> set = cuisineToSortedSet.get(cuisine);
        set.remove(new FoodPair(oldRating, food));
        foodToRating.put(food, newRating);
        set.add(new FoodPair(newRating, food));
    }

    public String highestRated(String cuisine) {
        return cuisineToSortedSet.get(cuisine).first().food;
    }
}
```

```cpp
class FoodRatings {
    unordered_map<string, int> foodToRating;
    unordered_map<string, string> foodToCuisine;
    unordered_map<string, set<pair<int, string>>> cuisineToSet;

public:
    FoodRatings(vector<string>& foods, vector<string>& cuisines, vector<int>& ratings) {
        for (int i = 0; i < foods.size(); i++) {
            foodToRating[foods[i]] = ratings[i];
            foodToCuisine[foods[i]] = cuisines[i];
            cuisineToSet[cuisines[i]].insert({-ratings[i], foods[i]});
        }
    }

    void changeRating(string food, int newRating) {
        string cuisine = foodToCuisine[food];
        auto& s = cuisineToSet[cuisine];

        s.erase({-foodToRating[food], food});
        foodToRating[food] = newRating;
        s.insert({-newRating, food});
    }

    string highestRated(string cuisine) {
        return begin(cuisineToSet[cuisine])->second;
    }
};
```

```javascript
// Sorted Set implementation is not available in JavaScript standard library
// Use a Map with sorted arrays as a workaround
class FoodRatings {
    /**
     * @param {string[]} foods
     * @param {string[]} cuisines
     * @param {number[]} ratings
     */
    constructor(foods, cuisines, ratings) {
        this.foodToRating = new Map();
        this.foodToCuisine = new Map();
        this.cuisineToSet = new Map();

        for (let i = 0; i < foods.length; i++) {
            this.foodToRating.set(foods[i], ratings[i]);
            this.foodToCuisine.set(foods[i], cuisines[i]);
            if (!this.cuisineToSet.has(cuisines[i])) {
                this.cuisineToSet.set(cuisines[i], []);
            }
            this.cuisineToSet.get(cuisines[i]).push([-ratings[i], foods[i]]);
        }
        for (let [, arr] of this.cuisineToSet) {
            arr.sort((a, b) => a[0] - b[0] || a[1].localeCompare(b[1]));
        }
    }

    /**
     * @param {string} food
     * @param {number} newRating
     * @return {void}
     */
    changeRating(food, newRating) {
        let cuisine = this.foodToCuisine.get(food);
        let oldRating = this.foodToRating.get(food);
        let arr = this.cuisineToSet.get(cuisine);

        let idx = arr.findIndex(([r, f]) => r === -oldRating && f === food);
        if (idx !== -1) arr.splice(idx, 1);

        this.foodToRating.set(food, newRating);
        arr.push([-newRating, food]);
        arr.sort((a, b) => a[0] - b[0] || a[1].localeCompare(b[1]));
    }

    /**
     * @param {string} cuisine
     * @return {string}
     */
    highestRated(cuisine) {
        return this.cuisineToSet.get(cuisine)[0][1];
    }
}
```

```csharp
public class FoodRatings {
    private Dictionary<string, int> foodToRating;
    private Dictionary<string, string> foodToCuisine;
    private Dictionary<string, SortedSet<(int negRating, string food)>> cuisineToSet;

    public FoodRatings(string[] foods, string[] cuisines, int[] ratings) {
        foodToRating = new Dictionary<string, int>();
        foodToCuisine = new Dictionary<string, string>();
        cuisineToSet = new Dictionary<string, SortedSet<(int, string)>>();

        for (int i = 0; i < foods.Length; i++) {
            foodToRating[foods[i]] = ratings[i];
            foodToCuisine[foods[i]] = cuisines[i];
            if (!cuisineToSet.ContainsKey(cuisines[i])) {
                cuisineToSet[cuisines[i]] = new SortedSet<(int, string)>();
            }
            cuisineToSet[cuisines[i]].Add((-ratings[i], foods[i]));
        }
    }

    public void ChangeRating(string food, int newRating) {
        string cuisine = foodToCuisine[food];
        int oldRating = foodToRating[food];
        var set = cuisineToSet[cuisine];

        set.Remove((-oldRating, food));
        foodToRating[food] = newRating;
        set.Add((-newRating, food));
    }

    public string HighestRated(string cuisine) {
        return cuisineToSet[cuisine].Min.food;
    }
}
```

```go
import (
    "github.com/emirpasic/gods/sets/treeset"
)

type FoodRatings struct {
    foodToRating  map[string]int
    foodToCuisine map[string]string
    cuisineToSet  map[string]*treeset.Set
}

func foodComparator(a, b interface{}) int {
    fa := a.([2]interface{})
    fb := b.([2]interface{})
    ra, rb := fa[0].(int), fb[0].(int)
    na, nb := fa[1].(string), fb[1].(string)
    if ra != rb {
        return ra - rb
    }
    if na < nb {
        return -1
    }
    if na > nb {
        return 1
    }
    return 0
}

func Constructor(foods []string, cuisines []string, ratings []int) FoodRatings {
    f := FoodRatings{
        foodToRating:  make(map[string]int),
        foodToCuisine: make(map[string]string),
        cuisineToSet:  make(map[string]*treeset.Set),
    }
    for i := 0; i < len(foods); i++ {
        f.foodToRating[foods[i]] = ratings[i]
        f.foodToCuisine[foods[i]] = cuisines[i]
        if _, ok := f.cuisineToSet[cuisines[i]]; !ok {
            f.cuisineToSet[cuisines[i]] = treeset.NewWith(foodComparator)
        }
        f.cuisineToSet[cuisines[i]].Add([2]interface{}{-ratings[i], foods[i]})
    }
    return f
}

func (this *FoodRatings) ChangeRating(food string, newRating int) {
    cuisine := this.foodToCuisine[food]
    oldRating := this.foodToRating[food]
    set := this.cuisineToSet[cuisine]

    set.Remove([2]interface{}{-oldRating, food})
    this.foodToRating[food] = newRating
    set.Add([2]interface{}{-newRating, food})
}

func (this *FoodRatings) HighestRated(cuisine string) string {
    it := this.cuisineToSet[cuisine].Iterator()
    it.First()
    return it.Value().([2]interface{})[1].(string)
}
```

```kotlin
import java.util.TreeSet

class FoodRatings(foods: Array<String>, cuisines: Array<String>, ratings: IntArray) {
    private val foodToRating = mutableMapOf<String, Int>()
    private val foodToCuisine = mutableMapOf<String, String>()
    private val cuisineToSet = mutableMapOf<String, TreeSet<Pair<Int, String>>>()

    init {
        for (i in foods.indices) {
            foodToRating[foods[i]] = ratings[i]
            foodToCuisine[foods[i]] = cuisines[i]
            cuisineToSet.getOrPut(cuisines[i]) {
                TreeSet(compareBy({ it.first }, { it.second }))
            }.add(Pair(-ratings[i], foods[i]))
        }
    }

    fun changeRating(food: String, newRating: Int) {
        val cuisine = foodToCuisine[food]!!
        val oldRating = foodToRating[food]!!
        val set = cuisineToSet[cuisine]!!

        set.remove(Pair(-oldRating, food))
        foodToRating[food] = newRating
        set.add(Pair(-newRating, food))
    }

    fun highestRated(cuisine: String): String {
        return cuisineToSet[cuisine]!!.first().second
    }
}
```

```swift
class FoodRatings {
    private var foodToRating: [String: Int]
    private var foodToCuisine: [String: String]
    private var cuisineToSet: [String: [(Int, String)]]

    init(_ foods: [String], _ cuisines: [String], _ ratings: [Int]) {
        foodToRating = [:]
        foodToCuisine = [:]
        cuisineToSet = [:]
        for i in 0..<foods.count {
            foodToRating[foods[i]] = ratings[i]
            foodToCuisine[foods[i]] = cuisines[i]
            cuisineToSet[cuisines[i], default: []].append((-ratings[i], foods[i]))
        }
        for key in cuisineToSet.keys {
            cuisineToSet[key]!.sort { $0.0 == $1.0 ? $0.1 < $1.1 : $0.0 < $1.0 }
        }
    }

    func changeRating(_ food: String, _ newRating: Int) {
        let cuisine = foodToCuisine[food]!
        let oldRating = foodToRating[food]!

        if let idx = cuisineToSet[cuisine]!.firstIndex(where: { $0.0 == -oldRating && $0.1 == food }) {
            cuisineToSet[cuisine]!.remove(at: idx)
        }
        foodToRating[food] = newRating
        cuisineToSet[cuisine]!.append((-newRating, food))
        cuisineToSet[cuisine]!.sort { $0.0 == $1.0 ? $0.1 < $1.1 : $0.0 < $1.0 }
    }

    func highestRated(_ cuisine: String) -> String {
        return cuisineToSet[cuisine]![0].1
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity:
    - $O(n \log n)$ time for initialization.
    - $O(\log n)$ time for each $changeRating()$ function call.
    - $O(1)$ in Python and $O(\log n)$ in other languages for each $highestRated()$ function call.
- Space complexity: $O(n)$
