class Solution {
    public List<String> findItinerary(List<List<String>> tickets) {
        
      LinkedList<String> itinerary = new LinkedList<>();
      Map<String, PriorityQueue<String>> graph = new HashMap<>();
      Stack<String> stack = new Stack<>();
        
      for (List<String> ticket : tickets) {
        graph.computeIfAbsent(ticket.get(0), k -> new PriorityQueue<>()).add(ticket.get(1));
      }
        
        
      stack.push("JFK");
      while (!stack.isEmpty()) {
        String nextDestination = stack.peek();
          
        if (!graph.getOrDefault(nextDestination, new PriorityQueue<>()).isEmpty()) {
            
          stack.push(graph.get(nextDestination).poll());
            
        } else {
            
          itinerary.addFirst(stack.pop());
            
        }
      }
      return itinerary;
    }
  }
  