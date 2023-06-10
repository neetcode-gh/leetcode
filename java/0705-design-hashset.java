class MyHashSet {

    final private boolean[] ARR;

    public MyHashSet() {
        ARR = new boolean[1000001];
    }
    
    public void add(int key) {
        ARR[key] = true;
    }
    
    public void remove(int key) {
        ARR[key] = false;
    }
    
    public boolean contains(int key) {
        return ARR[key];
    }
    
}