package timebasedkeyvaluestore

type timeStampValue struct {
	value     string
	timestamp int
}

type TimeMap struct {
	timeMapKey map[string][]timeStampValue
}

func Constructor() TimeMap {
	timeMap := make(map[string][]timeStampValue)
	return TimeMap{
		timeMapKey: timeMap,
	}
}

func (this *TimeMap) Set(key string, value string, timestamp int) {
	timeStampVal := timeStampValue{
		value:     value,
		timestamp: timestamp,
	}
	val, ok := this.timeMapKey[key]
	if ok {
		this.timeMapKey[key] = append(val, timeStampVal)
	} else {
		this.timeMapKey[key] = append(this.timeMapKey[key], timeStampVal)
	}
}

func (this *TimeMap) Get(key string, timestamp int) string {
	var result string
	values, ok := this.timeMapKey[key]
	if !ok {
		return ""
	}
	left, right := 0, len(values)-1
	for left <= right {
		mid := (left + right) / 2
		if timestamp == values[mid].timestamp {
			return values[mid].value
		}
		if values[mid].timestamp <= timestamp {
			// upto this point the closest to the current target timestamp is the current
			result = values[mid].value
			left = mid + 1
		} else {
			right = mid - 1
		}
	}
	return result
}

/**
 * Your TimeMap object will be instantiated and called as such:
 * obj := Constructor();
 * obj.Set(key,value,timestamp);
 * param_2 := obj.Get(key,timestamp);
 */
