package lrucache

import "fmt"

type Node struct {
	Key  int
	Val  int
	Prev *Node
	Next *Node
}

type LRUCache struct {
	cache    map[int]*Node
	capacity int
	Left     *Node
	Right    *Node
}

func Constructor(capacity int) LRUCache {
	cache := make(map[int]*Node)
	leftNode := &Node{}
	rightNode := &Node{}
	leftNode.Next, rightNode.Prev = rightNode, leftNode
	lruCache := LRUCache{
		cache:    cache,
		capacity: capacity,
		Left:     leftNode,
		Right:    rightNode,
	}
	return lruCache
}

func (this *LRUCache) remove(node *Node) {
	if node == nil {
		return
	}
	prev, next := node.Prev, node.Next
	prev.Next, next.Prev = next, prev
}

func (this *LRUCache) insert(node *Node) {
	prev, next := this.Right.Prev, this.Right
	prev.Next = node
	next.Prev = node
	node.Next, node.Prev = next, prev
}

func (this *LRUCache) Get(key int) int {
	val, ok := this.cache[key]
	if ok {
		this.remove(val)
		this.insert(val)
		// PrintList(this.Left)
		return val.Val
	}
	return -1
}

func (this *LRUCache) Put(key int, value int) {
	_, ok := this.cache[key]
	if ok {
		this.remove(this.cache[key])
	}
	this.cache[key] = &Node{
		Key: key,
		Val: value,
	}
	this.insert(this.cache[key])
	if len(this.cache) > this.capacity {
		lru := this.Left.Next
		delete(this.cache, lru.Key)
		this.remove(lru)

	}
	// PrintList(this.Left)
}

func PrintList(node *Node) {
	fmt.Print("List L -> R ")
	for node != nil {
		fmt.Print(node.Key, " ")
		node = node.Next
	}
	fmt.Println(" ")
}
