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

::tabs-end

### Time & Space Complexity

- Time complexity:
    - $O(n \log n)$ time for initialization.
    - $O(\log n)$ time for each $changeRating()$ function call.
    - $O(1)$ in Python and $O(\log n)$ in other languages for each $highestRated()$ function call.
- Space complexity: $O(n)$
