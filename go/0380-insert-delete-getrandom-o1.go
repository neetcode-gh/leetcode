import "math/rand"

type RandomizedSet struct {
	hash   map[int]int
	array  []int
	length int
}

func Constructor() RandomizedSet {
	return RandomizedSet{
		hash:   make(map[int]int),
		array:  []int{},
		length: 0,
	}
}

func (this *RandomizedSet) Insert(val int) bool {
	if _, ok := this.hash[val]; ok {
		return false
	}
	this.array = append(this.array, val)
	this.hash[val] = len(this.array) - 1
	this.length++
	return true
}

func (this *RandomizedSet) Remove(val int) bool {
	idx, ok := this.hash[val]
	if !ok {
		return false
	}
	last := this.array[this.length-1]
	this.array[idx] = last
	this.hash[last] = idx
	this.array = this.array[:len(this.array)-1]
	delete(this.hash, val)
	this.length--
	return true
}

func (this *RandomizedSet) GetRandom() int {
	return this.array[rand.Intn(this.length)]
}
