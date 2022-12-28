type TimeMap struct {
	store map[string][]ValStamp // key : list of [val, timestamp]
}

type ValStamp struct {
	Val  string
	Time int
}

func Constructor() TimeMap {
	return TimeMap{store: make(map[string][]ValStamp)}
}

func (this *TimeMap) Set(key string, value string, timestamp int) {
	if _, ok := this.store[key]; !ok {
		this.store[key] = make([]ValStamp, 0)
	}
	this.store[key] = append(this.store[key], ValStamp{value, timestamp})
}

func (this *TimeMap) Get(key string, timestamp int) string {
	var res string
	var values []ValStamp
	if _, ok := this.store[key]; ok {
		values = this.store[key]
	}
	l, r := 0, len(values)-1
	for l <= r {
		mid := l + (r-l)/2
		if values[mid].Time <= timestamp {
			res = values[mid].Val
			l = mid + 1
		} else {
			r = mid - 1
		}
	}
	return res
}

/**
 * Your TimeMap object will be instantiated and called as such:
 * obj := Constructor();
 * obj.Set(key,value,timestamp);
 * param_2 := obj.Get(key,timestamp);
 */