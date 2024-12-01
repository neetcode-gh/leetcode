type Node struct {
	val  int
	prev *Node
	next *Node
}

func NewNode(val int, prev, next *Node) *Node {
	return &Node{
		val:  val,
		prev: prev,
		next: next,
	}
}

type MyCircularQueue struct {
	head     *Node
	tail     *Node
	capacity int
	length   int
}

func Constructor(k int) MyCircularQueue {
	head := NewNode(-1, nil, nil)
	tail := NewNode(-1, head, head)
	head.next, head.prev = tail, tail
	return MyCircularQueue{
		head:     head,
		tail:     tail,
		capacity: k,
		length:   0,
	}
}

func (this *MyCircularQueue) EnQueue(value int) bool {
	if this.length == this.capacity {
		return false
	}
	node := NewNode(value, this.head, this.head.next)
	this.head.next.prev = node
	this.head.next = node
	this.length++
	return true
}

func (this *MyCircularQueue) DeQueue() bool {
	if this.length == 0 {
		return false
	}
	prev, next := this.tail.prev.prev, this.tail
	prev.next, next.prev = next, prev
	this.length--
	return true
}

func (this *MyCircularQueue) Front() int {
	if this.length > 0 {
		return this.tail.prev.val
	}
	return -1
}

func (this *MyCircularQueue) Rear() int {
	if this.length > 0 {
		return this.head.next.val
	}
	return -1
}

func (this *MyCircularQueue) IsEmpty() bool {
	return this.length == 0
}

func (this *MyCircularQueue) IsFull() bool {
	return this.length == this.capacity
}

/**
 * Your MyCircularQueue object will be instantiated and called as such:
 * obj := Constructor(k);
 * param_1 := obj.EnQueue(value);
 * param_2 := obj.DeQueue();
 * param_3 := obj.Front();
 * param_4 := obj.Rear();
 * param_5 := obj.IsEmpty();
 * param_6 := obj.IsFull();
 */
