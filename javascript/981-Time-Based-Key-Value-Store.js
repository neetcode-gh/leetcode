/**
 * Your TimeMap object will be instantiated and called as such:
 * var obj = new TimeMap()
 * obj.set(key,value,timestamp)
 * var param_2 = obj.get(key,timestamp)
 */
class TimeMap {
    constructor() {
        this.map = {};
    }

    /**
     * @param {string} key
     * @param {string} value
     * @param {number} timestamp
     * Time O(1) | Space O(1)
     * @return {void}
     */
    set(key, value, timestamp) {
        const bucket = this.map[key] || [];

        this.map[key] = bucket;

        bucket.push([value, timestamp]);
    }

    /**
     * @param {string} key
     * @param {number} timestamp
     * Time O(log(N)) | Space O(1)
     * @return {string}
     */
    get(key, timestamp, value = '', bucket = this.map[key] || []) {
        let [left, right] = [0, bucket.length - 1];

        while (left <= right) {
            const mid = (left + right) >> 1;
            const [guessValue, guessTimestamp] = bucket[mid];

            const isTargetGreater = guessTimestamp <= timestamp;
            if (isTargetGreater) {
                value = guessValue;
                left = mid + 1;
            }

            const isTargetLess = timestamp < guessTimestamp;
            if (isTargetLess) right = mid - 1;
        }

        return value;
    }
}
