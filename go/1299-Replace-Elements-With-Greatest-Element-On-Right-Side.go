func findMaxElement(rightMax int, lastElement int) int {
    if lastElement > rightMax {
       rightMax = lastElement
   }
   return rightMax
}

func replaceElements(arr []int) []int {
    var rightMax int = -1
    for i := len(arr) - 1; i >= 0; i-- {
        var newMax int =  findMaxElement(rightMax, arr[i]) 
        arr[i] = rightMax 
        rightMax = newMax
    }
    return arr
}
