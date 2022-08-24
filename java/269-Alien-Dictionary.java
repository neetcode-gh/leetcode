class Solution {
    Map<Character, Set<Character>> adjList;
    Map<Character, Set<Character>> revList;
    Map<Character, Integer> degrees;
    
    // Return false if s.len < t.len condition is not met
    private boolean createEdges(String left, String right) {
        int minLen = Math.min(left.length(), right.length());
                
        for(int i=0; i<minLen; i++) {
            char first = left.charAt(i), second = right.charAt(i);

            if(first != second) {
                Set<Character> edges = this.adjList.get(first);
                edges.add(second);
                this.adjList.put(first, edges);
                
                Set<Character> revEdges = this.revList.get(second);
                revEdges.add(first);
                this.revList.put(second, revEdges);
                
                return true;
            }
        }
        
        // No difference found yet, there is a problem
        return (left.length() <= right.length());
    }

    private void initialize(String[] words) {
        // Initialize
        int n = words.length;
        this.adjList = new HashMap<>();
        this.revList = new HashMap<>();
        this.degrees = new HashMap<>();
    
        for(int i=0; i<n; i++) {
            for(char c: words[i].toCharArray()) {
                this.adjList.put(c, new HashSet<>());
                this.revList.put(c, new HashSet<>());
                this.degrees.put(c, 0);
            }
        }
    }
    
    // Return false if creating any edge leads to a problem
    private boolean createEdges(String[] words) {
        int n = words.length;
        for(int i=0; i<n-1; i++) {
            for(int j=i+1; j<n; j++) {
                if(createEdges(words[i], words[j]) == false)
                    return false;
            }
        }
        return true;
    }
    
    private void createDegrees() {
        for(char c: this.adjList.keySet()) {
            this.degrees.put(c, this.adjList.get(c).size());
        }
    }
    
    private void printDebug() {
        System.out.println(this.adjList);
        System.out.println(this.revList);
        System.out.println(this.degrees);
    } 
    
    
    private List<Character> topologicalSort() {
        // take zero degrees first into a queue
        Queue<Character> queue = new LinkedList<>();
        
        Set<Character> taken = new HashSet<>();
        List<Character> ordering = new ArrayList<>();
        
        for(char c: this.degrees.keySet()) {
            if(this.degrees.get(c) == 0) {
                queue.add(c);
            }        
        }
        
        // Case 1: Doesn't exist
        if(queue.isEmpty()) {
            return null;
        }
        
        while(!queue.isEmpty()) {
            int qSize = queue.size();
            
            // Level order traversal
            for(int i=0; i<qSize; i++) {
                char removed = queue.remove();
                
                // Put into the ordering
                ordering.add(removed);
                taken.add(removed);
                
                // In the reverse list, need to decrement for all neighbors, and if any is zero, need to put into the queue
                for(char neighbor: this.revList.get(removed)) {
                    int degree = this.degrees.get(neighbor);
                    degree--;
                    
                    if(degree == 0)
                        queue.add(neighbor); // add to queue
                    
                    this.degrees.put(neighbor, degree);
                }
                
            }
        }
        
        // Case 2: Not all vertices were ordered
        if(ordering.size() < this.revList.size()) {
            return null;
        }
        
        return ordering;
    }
    
    private String getString(List<Character> ordering) {
        StringBuilder bld = new StringBuilder();        
        for(char c: ordering)
            bld.append(c);
        return bld.reverse().toString();
    }
    
    // API
    public String alienOrder(String[] words) {
        initialize(words);
        
        // Edge case, s.len < t.len is not met
        if(createEdges(words) == false)
            return "";
        
        createDegrees();
        
        List<Character> ordering = topologicalSort();
        
        if(ordering == null)
            return "";
        
        return getString(ordering);
    }
}