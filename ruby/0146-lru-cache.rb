class LRUCache

=begin
    :type capacity: Integer
=end
    def initialize(capacity)
        @capacity = capacity
        @cache = {}
        @l = Node.new()
        @r = Node.new()
        @l.next = @r
        @r.prev = @l
    end


=begin
    :type key: Integer
    :rtype: Integer
=end
    def get(key)
        return -1 unless @cache.key?(key)
        
        remove(@cache[key])
        insert(@cache[key])
        @cache[key].value
    end


=begin
    :type key: Integer
    :type value: Integer
    :rtype: Void
=end
    def put(key, value)
        remove(@cache[key]) if @cache.key?(key)
      
        @cache[key] = Node.new(key, value)
        insert(@cache[key])
        evict if @capacity < @cache.size
    end
    
    private
    def remove(node)
        prev = node.prev
        nxt = node.next
        
        prev.next = nxt
        nxt.prev = prev
    end
    
    def insert(node)
        prev = @r.prev
        prev.next = node
        @r.prev = node
        
        node.prev = prev
        node.next = @r
    end
    
    def evict
        lru = @l.next
        remove(lru)
        @cache.delete(lru.key)
    end
    
    class Node
        attr_accessor :value, :prev, :next, :key

        def initialize(key = 0, val = nil)
            self.value = val
            self.key = key
        end
    end
end
