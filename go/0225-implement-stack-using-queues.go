type MyStack struct {
    Queue Queue
}

type Queue struct {
    Elems []int
}

func (q *Queue) Push(e int) {
    q.Elems = append(q.Elems, e)
}

func (q *Queue) Pop() int {
    n := q.Elems[0]
    q.Elems = q.Elems[1:]
    return n
}

func Constructor() MyStack {
    return MyStack{}
}


func (this *MyStack) Push(x int)  {
    this.Queue.Push(x)
}


func (this *MyStack) Pop() int {
    k := len(this.Queue.Elems)
    for i:=0; i<k-1; i++ {
        n := this.Queue.Pop()
        this.Queue.Push(n)
    }
    return this.Queue.Pop()
}


func (this *MyStack) Top() int {
    k := len(this.Queue.Elems)
    for i:=0; i<k-1; i++ {
        n := this.Queue.Pop()
        this.Queue.Push(n)
    }
    n := this.Queue.Pop()
    this.Queue.Push(n)
    return n
}


func (this *MyStack) Empty() bool {
    return len(this.Queue.Elems) == 0
}
