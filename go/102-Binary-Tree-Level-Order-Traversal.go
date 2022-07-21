func levelOrder(root *TreeNode) [][]int {
	// nil check
		if root == nil {
			return nil
		}
		
		var result [][]int
		level := 0
		q := make([]*TreeNode,1)
		q[0] = root
		for len(q) > 0 {
			curLen := len(q)
			//add elements to the queue per level
			for i := 0; i < curLen; i++ {
			  //queue implementation : delete element from front(1st element of slice)
				node := q[0]
				q = q[1:]
				
				if len(result) <= level {
				 //create new slice with first value of the level and append to result matrix
					result = append(result,[]int{node.Val})
				}else {
				//add values to the slice created per level
					result[level] = append(result[level],node.Val)
				}
				
				//queue implementation : add element at Back( after last element of slice by append)
				//add left node at queue
				if node.Left != nil {
					q = append(q,node.Left)
				}
				//add Right node at queue
				if node.Right != nil{
					q = append(q,node.Right)
				}
			}
			//increment the level after adding current elements to result
			level++
		}
		return result
		
	}
