def cloneGraph(node)
    dfs(node, {})
end

def dfs(node, clones)
    return unless node
    return clones[node] if clones.key?(node)
    
    clone = Node.new(node.val)
    clones[node] = clone
    
    node.neighbors.each do |n|
        clone.neighbors << dfs(n, clones)
    end
    
    clone
end
