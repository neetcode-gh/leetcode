//use an hashmap for keys, then each key will have an array (increasing order because of problem rules) of timestamps with values (represented as javascript objects {key, value})
class TimeMap {
    public hash: {};

    constructor() {
        this.hash = {};
    }

    set(key: string, value: string, timestamp: number): void {
        if (key in this.hash) {
            this.hash[key].push({ timestamp, value });
        } else this.hash[key] = [{ timestamp, value }];
    }

    get(key: string, timestamp: number): string {
        //if key is not in the hashmap there are no timestamps nor values, return ""
        if (!(key in this.hash)) return '';
        let timestamps = this.hash[key];
        //if there are no timestamps or the first timestamp is already bigger than target timestamp(they are sorted so all next ones will big too), return ""
        if (timestamps.length === 0 || timestamps[0].timestamp > timestamp)
            return '';

        //starts from the first timestamp as closest
        let closest = timestamps[0];

        let [l, r] = [0, timestamps.length - 1];

        //binary search, but
        while (l <= r) {
            let mid = Math.floor((l + r) / 2);

            if (timestamps[mid].timestamp === timestamp)
                return timestamps[mid].value;
            //update closest if mid element's timestamp is still less than target timestamp
            if (timestamps[mid].timestamp < timestamp)
                closest = timestamps[mid];

            if (timestamps[mid].timestamp < timestamp) l = mid + 1;
            if (timestamps[mid].timestamp > timestamp) r = mid - 1;
        }

        return closest.value;
    }
}
