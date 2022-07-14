package minstack

type MinStack struct {
	stack    []int
	minStack []int
}

func Constructor() MinStack {
	var stack []int
	var minStack []int
	return MinStack{
		stack:    stack,
		minStack: minStack,
	}
}

func (this *MinStack) Push(val int) {
	this.stack = append(this.stack, val)
	if len(this.minStack) == 0 {
		this.minStack = append(this.minStack, val)
	} else {
		if this.minStack[len(this.minStack)-1] < val {
			this.minStack = append(this.minStack, this.minStack[len(this.minStack)-1])
		} else {
			this.minStack = append(this.minStack, val)
		}
	}
}

func (this *MinStack) Pop() {
	if len(this.stack) > 0 {
		this.stack = this.stack[:len(this.stack)-1]
		this.minStack = this.minStack[:len(this.minStack)-1]
	}
	return
}

func (this *MinStack) Top() int {
	return this.stack[len(this.stack)-1]
}

func (this *MinStack) GetMin() int {
	return this.minStack[len(this.minStack)-1]
}

/**
 * Your MinStack object will be instantiated and called as such:
 * obj := Constructor();
 * obj.Push(val);
 * obj.Pop();
 * param_3 := obj.Top();
 * param_4 := obj.GetMin();
 */
