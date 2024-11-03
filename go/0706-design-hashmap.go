type Node struct {
	Key  int
	Val  int
	Next *Node
}

func NewNode(key, val int) *Node {
	return &Node{
		Key: key,
		Val: val,
	}
}

type MyHashMap struct {
	Array []*Node
}

func Constructor() MyHashMap {
	var arr []*Node
	for i := 0; i < 512; i++ {
		arr = append(arr, NewNode(-1, -1))
	}
	return MyHashMap{
		Array: arr,
	}
}

func (this *MyHashMap) hash(key int) int {
	return key % len(this.Array)
}

func (this *MyHashMap) Put(key int, value int) {
	cur := this.Array[this.hash(key)]
	for cur.Next != nil {
		if cur.Next.Key == key {
			cur.Next.Val = value
			return
		}
		cur = cur.Next
	}
	cur.Next = NewNode(key, value)
}

func (this *MyHashMap) Get(key int) int {
	cur := this.Array[this.hash(key)]
	for cur.Next != nil {
		if cur.Next.Key == key {
			return cur.Next.Val
		}
		cur = cur.Next
	}
	return -1
}

func (this *MyHashMap) Remove(key int) {
	cur := this.Array[this.hash(key)]
	for cur.Next != nil && cur.Next.Key != key {
		cur = cur.Next
	}
	if cur != nil && cur.Next != nil {
		cur.Next = cur.Next.Next
	}
}

/**
 * Your MyHashMap object will be instantiated and called as such:
 * obj := Constructor();
 * obj.Put(key,value);
 * param_2 := obj.Get(key);
 * obj.Remove(key);
 */
