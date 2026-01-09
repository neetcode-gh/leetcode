## 1. Queue and Hash Set

::tabs-start

```python
class SnakeGame:

    def __init__(self, width: int, height: int, food: List[List[int]]):
        self.snake = collections.deque([(0,0)])    # snake head is at the front
        self.snake_set = {(0,0) : 1}
        self.width = width
        self.height = height
        self.food = food
        self.food_index = 0
        self.movement = {'U': [-1, 0], 'L': [0, -1], 'R': [0, 1], 'D': [1, 0]}
        

    def move(self, direction: str) -> int:
        newHead = (self.snake[0][0] + self.movement[direction][0],
                   self.snake[0][1] + self.movement[direction][1])
        
        # Boundary conditions.
        crosses_boundary1 = newHead[0] < 0 or newHead[0] >= self.height
        crosses_boundary2 = newHead[1] < 0 or newHead[1] >= self.width
        
        # Checking if the snake bites itself.
        bites_itself = newHead in self.snake_set and newHead != self.snake[-1]
     
        # If any of the terminal conditions are satisfied, then we exit with rcode -1.
        if crosses_boundary1 or crosses_boundary2 or bites_itself:
            return -1

        # Note the food list could be empty at this point.
        next_food_item = self.food[self.food_index] if self.food_index < len(self.food) else None
        
        # If there's an available food item and it is on the cell occupied by the snake after the move, eat it
        if self.food_index < len(self.food) and \
            next_food_item[0] == newHead[0] and \
                next_food_item[1] == newHead[1]:  # eat food
            self.food_index += 1
        else:    # not eating food: delete tail                 
            tail = self.snake.pop()  
            del self.snake_set[tail]
            
        # A new head always gets added
        self.snake.appendleft(newHead)
        
        # Also add the head to the set
        self.snake_set[newHead] = 1

        return len(self.snake) - 1
```

```java
class SnakeGame {

    HashMap<Pair<Integer, Integer>, Boolean> snakeMap;
    Deque<Pair<Integer, Integer>> snake;
    int[][] food;
    int foodIndex;
    int width;
    int height;


    public SnakeGame(int width, int height, int[][] food) {
        this.width = width;
        this.height = height;
        this.food = food;
        this.snakeMap = new HashMap<Pair<Integer, Integer>, Boolean>();
        this.snakeMap.put(new Pair<Integer, Integer>(0,0), true); // intially at [0][0]
        this.snake = new LinkedList<Pair<Integer, Integer>>();
        this.snake.offerLast(new Pair<Integer, Integer>(0,0));
    }


    public int move(String direction) {

        Pair<Integer, Integer> snakeCell = this.snake.peekFirst();
        int newHeadRow = snakeCell.getKey();
        int newHeadColumn = snakeCell.getValue();

        switch (direction) {
        case "U":
            newHeadRow--;
            break;
        case "D":
            newHeadRow++;
            break;
        case "L":
            newHeadColumn--;
            break;
        case "R":
            newHeadColumn++;
            break;
        }

        Pair<Integer, Integer> newHead = new Pair<Integer, Integer>(newHeadRow, newHeadColumn);
        Pair<Integer, Integer> currentTail = this.snake.peekLast();

        // Boundary conditions.
        boolean crossesBoundary1 = newHeadRow < 0 || newHeadRow >= this.height;
        boolean crossesBoundary2 = newHeadColumn < 0 || newHeadColumn >= this.width;

        // Checking if the snake bites itself.
        boolean bitesItself = this.snakeMap.containsKey(newHead) && !(newHead.getKey() == currentTail.getKey() && newHead.getValue() == currentTail.getValue());
        
        // If any of the terminal conditions are satisfied, then we exit with rcode -1.
        if (crossesBoundary1 || crossesBoundary2 || bitesItself) {
            return -1;
        }

        // If there's an available food item and it is on the cell occupied by the snake after the move,
        // eat it.
        if ((this.foodIndex < this.food.length)
            && (this.food[this.foodIndex][0] == newHeadRow)
            && (this.food[this.foodIndex][1] == newHeadColumn)) {
            this.foodIndex++;
        } else {
            this.snake.pollLast();
            this.snakeMap.remove(currentTail);
        }

        // A new head always gets added
        this.snake.addFirst(newHead);

        // Also add the head to the set
        this.snakeMap.put(newHead, true);

        return this.snake.size() - 1;
    }
    
}
```

```cpp
class SnakeGame {
    unordered_set<string> snakeSet;
    deque<pair<int, int>> snake;
    vector<vector<int>> food;
    int foodIndex;
    int width;
    int height;

    string pairToString(int row, int col) {
        return to_string(row) + "," + to_string(col);
    }

public:
    SnakeGame(int width, int height, vector<vector<int>>& food) {
        this->width = width;
        this->height = height;
        this->food = food;
        this->foodIndex = 0;
        this->snakeSet.insert(pairToString(0, 0)); // initially at [0][0]
        this->snake.push_back({0, 0});
    }

    int move(string direction) {
        pair<int, int> snakeCell = this->snake.front();
        int newHeadRow = snakeCell.first;
        int newHeadColumn = snakeCell.second;

        if (direction == "U") {
            newHeadRow--;
        } else if (direction == "D") {
            newHeadRow++;
        } else if (direction == "L") {
            newHeadColumn--;
        } else if (direction == "R") {
            newHeadColumn++;
        }

        pair<int, int> newHead = {newHeadRow, newHeadColumn};
        pair<int, int> currentTail = this->snake.back();

        // Boundary conditions.
        bool crossesBoundary1 = newHeadRow < 0 || newHeadRow >= this->height;
        bool crossesBoundary2 = newHeadColumn < 0 || newHeadColumn >= this->width;

        // Checking if the snake bites itself.
        bool bitesItself = this->snakeSet.count(pairToString(newHeadRow, newHeadColumn)) && 
                          !(newHead.first == currentTail.first && newHead.second == currentTail.second);

        // If any of the terminal conditions are satisfied, then we exit with rcode -1.
        if (crossesBoundary1 || crossesBoundary2 || bitesItself) {
            return -1;
        }

        // If there's an available food item and it is on the cell occupied by the snake after the move,
        // eat it.
        if ((this->foodIndex < this->food.size())
            && (this->food[this->foodIndex][0] == newHeadRow)
            && (this->food[this->foodIndex][1] == newHeadColumn)) {
            this->foodIndex++;
        } else {
            this->snake.pop_back();
            this->snakeSet.erase(pairToString(currentTail.first, currentTail.second));
        }

        // A new head always gets added
        this->snake.push_front(newHead);

        // Also add the head to the set
        this->snakeSet.insert(pairToString(newHeadRow, newHeadColumn));

        return this->snake.size() - 1;
    }
};
```

```javascript
class SnakeGame {
    /**
     * @param {number} width
     * @param {number} height
     * @param {number[][]} food
     */
    constructor(width, height, food) {
        this.snake = new Deque(); // Using @datastructures-js/deque
        this.snake.pushFront([0, 0]);    // snake head is at the front
        this.snakeSet = new Set();
        this.snakeSet.add('0,0');
        this.width = width;
        this.height = height;
        this.food = food;
        this.foodIndex = 0;
        this.movement = {'U': [-1, 0], 'L': [0, -1], 'R': [0, 1], 'D': [1, 0]};
    }

    /**
     * @param {string} direction
     * @return {number}
     */
    move(direction) {
        let currentHead = this.snake.front();
        let newHead = [currentHead[0] + this.movement[direction][0],
                       currentHead[1] + this.movement[direction][1]];

        // Boundary conditions.
        let crossesBoundary1 = newHead[0] < 0 || newHead[0] >= this.height;
        let crossesBoundary2 = newHead[1] < 0 || newHead[1] >= this.width;

        // Checking if the snake bites itself.
        let newHeadKey = newHead[0] + ',' + newHead[1];
        let currentTail = this.snake.back();
        let tailKey = currentTail[0] + ',' + currentTail[1];
        let bitesItself = this.snakeSet.has(newHeadKey) && newHeadKey !== tailKey;

        // If any of the terminal conditions are satisfied, then we exit with rcode -1.
        if (crossesBoundary1 || crossesBoundary2 || bitesItself) {
            return -1;
        }

        // Note the food list could be empty at this point.
        let nextFoodItem = this.foodIndex < this.food.length ? this.food[this.foodIndex] : null;

        // If there's an available food item and it is on the cell occupied by the snake after the move, eat it
        if (this.foodIndex < this.food.length &&
            nextFoodItem[0] === newHead[0] &&
            nextFoodItem[1] === newHead[1]) {  // eat food
            this.foodIndex++;
        } else {    // not eating food: delete tail
            let tail = this.snake.popBack();
            this.snakeSet.delete(tail[0] + ',' + tail[1]);
        }

        // A new head always gets added
        this.snake.pushFront(newHead);

        // Also add the head to the set
        this.snakeSet.add(newHeadKey);

        return this.snake.size() - 1;
    }
}
```

```csharp
public class SnakeGame {
    private LinkedList<(int, int)> snake;
    private HashSet<string> snakeSet;
    private int[][] food;
    private int foodIndex;
    private int width;
    private int height;
    private Dictionary<char, int[]> movement;

    public SnakeGame(int width, int height, int[][] food) {
        this.width = width;
        this.height = height;
        this.food = food;
        this.foodIndex = 0;
        this.snake = new LinkedList<(int, int)>();
        this.snake.AddFirst((0, 0));
        this.snakeSet = new HashSet<string> { "0,0" };
        this.movement = new Dictionary<char, int[]> {
            {'U', new int[]{-1, 0}},
            {'D', new int[]{1, 0}},
            {'L', new int[]{0, -1}},
            {'R', new int[]{0, 1}}
        };
    }

    public int Move(string direction) {
        var head = snake.First.Value;
        int[] dir = movement[direction[0]];
        int newHeadRow = head.Item1 + dir[0];
        int newHeadCol = head.Item2 + dir[1];

        bool crossesBoundary1 = newHeadRow < 0 || newHeadRow >= height;
        bool crossesBoundary2 = newHeadCol < 0 || newHeadCol >= width;

        var tail = snake.Last.Value;
        string newHeadKey = $"{newHeadRow},{newHeadCol}";
        string tailKey = $"{tail.Item1},{tail.Item2}";
        bool bitesItself = snakeSet.Contains(newHeadKey) && newHeadKey != tailKey;

        if (crossesBoundary1 || crossesBoundary2 || bitesItself) {
            return -1;
        }

        if (foodIndex < food.Length &&
            food[foodIndex][0] == newHeadRow &&
            food[foodIndex][1] == newHeadCol) {
            foodIndex++;
        } else {
            snakeSet.Remove(tailKey);
            snake.RemoveLast();
        }

        snake.AddFirst((newHeadRow, newHeadCol));
        snakeSet.Add(newHeadKey);

        return snake.Count - 1;
    }
}
```

```go
type SnakeGame struct {
    snake     [][]int
    snakeSet  map[string]bool
    food      [][]int
    foodIndex int
    width     int
    height    int
    movement  map[string][]int
}

func Constructor(width int, height int, food [][]int) SnakeGame {
    snakeSet := make(map[string]bool)
    snakeSet["0,0"] = true
    return SnakeGame{
        snake:     [][]int{{0, 0}},
        snakeSet:  snakeSet,
        food:      food,
        foodIndex: 0,
        width:     width,
        height:    height,
        movement: map[string][]int{
            "U": {-1, 0},
            "D": {1, 0},
            "L": {0, -1},
            "R": {0, 1},
        },
    }
}

func (this *SnakeGame) Move(direction string) int {
    dir := this.movement[direction]
    head := this.snake[0]
    newHeadRow := head[0] + dir[0]
    newHeadCol := head[1] + dir[1]

    crossesBoundary1 := newHeadRow < 0 || newHeadRow >= this.height
    crossesBoundary2 := newHeadCol < 0 || newHeadCol >= this.width

    tail := this.snake[len(this.snake)-1]
    newHeadKey := fmt.Sprintf("%d,%d", newHeadRow, newHeadCol)
    tailKey := fmt.Sprintf("%d,%d", tail[0], tail[1])
    bitesItself := this.snakeSet[newHeadKey] && newHeadKey != tailKey

    if crossesBoundary1 || crossesBoundary2 || bitesItself {
        return -1
    }

    if this.foodIndex < len(this.food) &&
        this.food[this.foodIndex][0] == newHeadRow &&
        this.food[this.foodIndex][1] == newHeadCol {
        this.foodIndex++
    } else {
        delete(this.snakeSet, tailKey)
        this.snake = this.snake[:len(this.snake)-1]
    }

    this.snake = append([][]int{{newHeadRow, newHeadCol}}, this.snake...)
    this.snakeSet[newHeadKey] = true

    return len(this.snake) - 1
}
```

```kotlin
class SnakeGame(width: Int, height: Int, food: Array<IntArray>) {
    private val snake = ArrayDeque<Pair<Int, Int>>()
    private val snakeSet = HashSet<String>()
    private val food = food
    private var foodIndex = 0
    private val width = width
    private val height = height
    private val movement = mapOf(
        "U" to intArrayOf(-1, 0),
        "D" to intArrayOf(1, 0),
        "L" to intArrayOf(0, -1),
        "R" to intArrayOf(0, 1)
    )

    init {
        snake.addFirst(Pair(0, 0))
        snakeSet.add("0,0")
    }

    fun move(direction: String): Int {
        val dir = movement[direction]!!
        val head = snake.first()
        val newHeadRow = head.first + dir[0]
        val newHeadCol = head.second + dir[1]

        val crossesBoundary1 = newHeadRow < 0 || newHeadRow >= height
        val crossesBoundary2 = newHeadCol < 0 || newHeadCol >= width

        val tail = snake.last()
        val newHeadKey = "$newHeadRow,$newHeadCol"
        val tailKey = "${tail.first},${tail.second}"
        val bitesItself = snakeSet.contains(newHeadKey) && newHeadKey != tailKey

        if (crossesBoundary1 || crossesBoundary2 || bitesItself) {
            return -1
        }

        if (foodIndex < food.size &&
            food[foodIndex][0] == newHeadRow &&
            food[foodIndex][1] == newHeadCol) {
            foodIndex++
        } else {
            snakeSet.remove(tailKey)
            snake.removeLast()
        }

        snake.addFirst(Pair(newHeadRow, newHeadCol))
        snakeSet.add(newHeadKey)

        return snake.size - 1
    }
}
```

```swift
class SnakeGame {
    private var snake: [(Int, Int)]
    private var snakeSet: Set<String>
    private var food: [[Int]]
    private var foodIndex: Int
    private var width: Int
    private var height: Int
    private var movement: [String: [Int]]

    init(_ width: Int, _ height: Int, _ food: [[Int]]) {
        self.width = width
        self.height = height
        self.food = food
        self.foodIndex = 0
        self.snake = [(0, 0)]
        self.snakeSet = Set(["0,0"])
        self.movement = [
            "U": [-1, 0],
            "D": [1, 0],
            "L": [0, -1],
            "R": [0, 1]
        ]
    }

    func move(_ direction: String) -> Int {
        let dir = movement[direction]!
        let head = snake[0]
        let newHeadRow = head.0 + dir[0]
        let newHeadCol = head.1 + dir[1]

        let crossesBoundary1 = newHeadRow < 0 || newHeadRow >= height
        let crossesBoundary2 = newHeadCol < 0 || newHeadCol >= width

        let tail = snake[snake.count - 1]
        let newHeadKey = "\(newHeadRow),\(newHeadCol)"
        let tailKey = "\(tail.0),\(tail.1)"
        let bitesItself = snakeSet.contains(newHeadKey) && newHeadKey != tailKey

        if crossesBoundary1 || crossesBoundary2 || bitesItself {
            return -1
        }

        if foodIndex < food.count &&
            food[foodIndex][0] == newHeadRow &&
            food[foodIndex][1] == newHeadCol {
            foodIndex += 1
        } else {
            snakeSet.remove(tailKey)
            snake.removeLast()
        }

        snake.insert((newHeadRow, newHeadCol), at: 0)
        snakeSet.insert(newHeadKey)

        return snake.count - 1
    }
}
```

::tabs-end

### Time & Space Complexity

- Time Complexity: 
    - The time complexity of the `move` function is $O(1)$.
    - The time taken to calculate `bites_itself` is constant since we are using a dictionary to search for the element.
    - The time taken to add and remove an element from the queue is also constant.

- Space Complexity: $O(W \times H + N)$
    - $O(N)$ is used by the `food` data structure.
    - $O(W \times H)$ is used by the `snake` and the `snake_set` data structures. At most, we can have snake that occupies all the cells of the grid.

>  Where $W$ represents the width of the grid, $H$ represents the height of the grid, and $N$ represents the number of food items in the list.
