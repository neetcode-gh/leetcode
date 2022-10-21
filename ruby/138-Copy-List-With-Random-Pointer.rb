# Definition for Node.
# class Node
#     attr_accessor :val, :next, :random
#     def initialize(val = 0)
#         @val = val
#		  @next = nil
#		  @random = nil
#     end
# end

# @param {Node} node
# @return {Node}
def copyRandomList(head)
    copies = {}
    
    curr = head
    while curr
        copies[curr] = Node.new(curr.val)
        curr = curr.next
    end
    
    curr = head
    while curr
        copies[curr].next = copies[curr.next]
        copies[curr].random = copies[curr.random]
        curr = curr.next
    end
    
    copies[head]
end
