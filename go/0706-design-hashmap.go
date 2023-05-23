type node struct {
	key  int
	val  int
	next *node
}

func NewNode(key, value int) *node {
	return &node{
		key:  key,
		val:  value,
		next: nil,
	}
}

type MyHashMap struct {
	arr []*node
}

func Constructor() MyHashMap {
	hsize := 1000
	array := make([]*node, hsize)

	for i := 0; i < hsize; i++ {
		array[i] = NewNode(-1, -1)
	}

	return MyHashMap{
		arr: array,
	}
}

func (this *MyHashMap) hash(key int) int {
	return key % len(this.arr)
}

func (this *MyHashMap) Put(key int, value int) {
	cur := this.arr[this.hash(key)]

	for cur.next != nil {
		if cur.next.key == key {
			cur.next.val = value
			return
		}
		cur = cur.next
	}

	cur.next = NewNode(key, value)
}

func (this *MyHashMap) Get(key int) int {
	cur := this.arr[this.hash(key)]

	for cur.next != nil {
		if cur.next.key == key {
			return cur.next.val
		}
		cur = cur.next
	}

	return -1
}

func (this *MyHashMap) Remove(key int) {
	cur := this.arr[this.hash(key)]

	for cur != nil && cur.next != nil {
		if cur.next.key == key {
			cur.next = cur.next.next
			return
		}
		cur = cur.next
	}
}