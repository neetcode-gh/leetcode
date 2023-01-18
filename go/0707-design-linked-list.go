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

type MyLinkedList struct {
	head *Node
	tail *Node
}

func Constructor() MyLinkedList {
	head := NewNode(-1, nil, nil)
	tail := NewNode(-1, head, nil)
	head.next = tail

	return MyLinkedList{
		head: head,
		tail: tail,
	}
}

func (this *MyLinkedList) Get(index int) int {
	cur := this.head.next
	for cur != nil && index > 0 {
		cur = cur.next
		index--
	}

	if cur != nil && cur != this.tail && index == 0 {
		return cur.val
	}

	return -1
}

func (this *MyLinkedList) AddAtHead(val int) {
	node := NewNode(val, this.head, this.head.next)
	this.head.next.prev = node
	this.head.next = node
}

func (this *MyLinkedList) AddAtTail(val int) {
	node := NewNode(val, this.tail.prev, this.tail)
	this.tail.prev.next = node
	this.tail.prev = node
}

func (this *MyLinkedList) AddAtIndex(index int, val int) {
	cur := this.head.next
	for cur.next != nil && index > 0 {
		cur = cur.next
		index--
	}

	if index == 0 {
		node := NewNode(val, cur.prev, cur)
		cur.prev.next = node
		cur.prev = node
	}
	return
}

func (this *MyLinkedList) DeleteAtIndex(index int) {
	cur := this.head.next

	for cur.next != nil && index > 0 {
		cur = cur.next
		index--
	}

	if index == 0 && cur != nil && cur != this.tail {
		prev, next := cur.prev, cur.next
		prev.next, next.prev = next, prev
	}
	return
}

/**
 * Your MyLinkedList object will be instantiated and called as such:
 * obj := Constructor();
 * param_1 := obj.Get(index);
 * obj.AddAtHead(val);
 * obj.AddAtTail(val);
 * obj.AddAtIndex(index,val);
 * obj.DeleteAtIndex(index);
 */
