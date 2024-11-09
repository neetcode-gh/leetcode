public class NestedIterator implements Iterator<Integer> {
    Queue<NestedInteger> q; // here we use Queue in place of revesed stack

    public NestedIterator(List<NestedInteger> nestedList) {
        q = new LinkedList<>();
        dfs(nestedList);
    }

    @Override
    public Integer next() {
        return q.poll().getInteger();
    }

    @Override
    public boolean hasNext() {
        return !q.isEmpty();
    }

    private void dfs(List<NestedInteger> nestedList){
        for(NestedInteger n : nestedList){
            if(n.isInteger())
                q.add(n);
            else
                dfs(n.getList());    
        }
    }
}
