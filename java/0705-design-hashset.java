class MyHashSet {
    boolean [] setArray;
    public MyHashSet() {
        setArray=new boolean[(int)1e6+1];
    }

    public void add(int key) {
        setArray[key]=true;
    }

    public void remove(int key) {
        setArray[key]=false;
    }

    public boolean contains(int key) {
        return setArray[key];
    }
}