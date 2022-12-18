public class TimeMap {

    private Dictionary<string, List<(int timestamp, string value1)>> _dict;
    public TimeMap() {
        _dict = new Dictionary<string, List<(int, string)>>();
    }
    
    public void Set(string key, string value, int timestamp) {
        var value1 = new List<(int, string)>();
        if(!_dict.ContainsKey(key)){
            _dict.Add(key, value1);
        }
        _dict[key].Add((timestamp, value));
            
    }
    
    public string Get(string key, int timestamp) {
        if(!_dict.ContainsKey(key)){
            return "";
        }
        var value = _dict[key];
        
        var left = 0;
        var right = value.Count;
        var result = "";
        
        while(left < right){
            var mid = (left + right)/2;
            if(value[mid].timestamp == timestamp){
                result = value[mid].value1;        
                return result;
            }
            else if(value[mid].timestamp < timestamp){
                left = mid + 1;
                result = value[mid].value1;        
            }
            else{
                right = mid;
            }
                
        }
        
        return result;
    }
}

/**
 * Your TimeMap object will be instantiated and called as such:
 * TimeMap obj = new TimeMap();
 * obj.Set(key,value,timestamp);
 * string param_2 = obj.Get(key,timestamp);
 */