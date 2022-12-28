type MyStack struct {
	queue []int
}


func Constructor() MyStack {
	return MyStack{}
}


func (this *MyStack) Push(x int)  {
	this.queue = append(this.queue, x)
}


func (this *MyStack) Pop() int {
	if this.Empty() {
		return 0
	}

	elem := this.queue[len(this.queue) - 1]

	this.queue = this.queue[:len(this.queue) - 1]

	return elem
}


func (this *MyStack) Top() int {
	if this.Empty() {
		return 0
	}

	return this.queue[len(this.queue) - 1]
}


func (this *MyStack) Empty() bool {
	return len(this.queue) == 0
}

