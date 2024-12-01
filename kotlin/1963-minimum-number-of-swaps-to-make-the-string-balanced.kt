// Same as below, using pointer, but more compact solution, time O(N), space O(1)
class Solution {
    fun minSwaps(s: String): Int {
        var closed = 0
        for(c in s){
            if(c == '[') closed++
            else if (closed > 0) closed--
        }
        return (closed + 1) / 2
    }
}

// Solution using pointer (since we only have 2 chars to check), time O(N), space O(1)
class Solution {
    fun minSwaps(s: String): Int {
        var mismatches = 0
        var closed = 0
        for(c in s){
            if(c == ']') 
                if(closed>0)
                    closed--
                else
                    mismatches++
            else{ 
                closed++
            }
        }
        return (mismatches + 1) / 2
    }
}

// Stack solution, time O(N), space O(N)
class Solution {
    fun minSwaps(s: String): Int {
        val stack = Stack<Char>()
        var mismatches = 0
        for(c in s){
            if(c == ']') 
                if(!stack.isEmpty())
                    stack.pop()
                else
                    mismatches++
            else{ 
                stack.push(c)
            }
        }
        return (mismatches + 1) / 2
    }
}
