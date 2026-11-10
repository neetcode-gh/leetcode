type MyHashSet struct {
    present []bool
}

func Constructor() MyHashSet {
    return MyHashSet{
        present: make([]bool, 1000001),  
    }
}

func (this *MyHashSet) Add(key int) {
    if key >= 0 && key < len(this.present) {
        this.present[key] = true
    }
}

func (this *MyHashSet) Remove(key int) {
    if key >= 0 && key < len(this.present) {
        this.present[key] = false
    }
}

func (this *MyHashSet) Contains(key int) bool {
    if key < 0 || key >= len(this.present) {
        return false
    }
    return this.present[key]
}
