type Node struct {
    key int
    val int
    prev *Node
    next *Node
}

type LRUCache struct {
    capacity int
    cache map[int]*Node
    left *Node
    right *Node
}


func Constructor(capacity int) LRUCache {
    ret := LRUCache {
        capacity: capacity,
        cache: make(map[int]*Node),
        
        left: &Node{key: 0, val: 0},
        right: &Node{key: 0, val: 0}}
    ret.left.next, ret.right.prev = ret.right, ret.left
    return ret
}

func (this *LRUCache) Remove(node *Node) {
    prev, nxt := node.prev, node.next
    prev.next, nxt.prev = nxt, prev
}

func (this *LRUCache) Insert(node *Node) {
    prev, nxt := this.right.prev, this.right
    nxt.prev = node
    prev.next = nxt.prev
    node.next, node.prev = nxt, prev
}

func (this *LRUCache) Get(key int) int {
    if _, ok := this.cache[key]; ok {
        this.Remove(this.cache[key])
        this.Insert(this.cache[key])
        return this.cache[key].val
    }
    return -1
}


func (this *LRUCache) Put(key int, value int)  {
    if _, ok := this.cache[key]; ok {
        this.Remove(this.cache[key])
    }
    this.cache[key] = &Node{key: key, val: value}
    this.Insert(this.cache[key])
    
    if len(this.cache) > this.capacity {
        // remove from the list and delete the LRU from hashmap
        lru := this.left.next
        this.Remove(lru)
        delete(this.cache, lru.key)
    }
}
