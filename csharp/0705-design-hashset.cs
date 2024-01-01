public class MyHashSet {
    private bool[] hashSet;

    public MyHashSet() {
        hashSet = new bool[1000001]; 
    }

    public void Add(int key) {
        hashSet[key] = true;
    }

    public void Remove(int key) {
        hashSet[key] = false;
    }

    public bool Contains(int key) {
        return hashSet[key];
    }
}
