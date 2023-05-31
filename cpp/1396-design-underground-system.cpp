class UndergroundSystem {
private:
    unordered_map<int,pair<string,int>> checkInStation;
    unordered_map<string,pair<int,int>> checkOutStation;
public:
    UndergroundSystem() {
        
    }
    
    void checkIn(int id, string stationName, int t) {
        checkInStation[id] = {stationName,t};
    }
    
    void checkOut(int id, string stationName, int t) {
        auto cIn = checkInStation[id];
        checkInStation.erase(id);
        string route = cIn.first + "_" + stationName;
        checkOutStation[route].first += t - cIn.second;
        checkOutStation[route].second++;
    }
    
    double getAverageTime(string startStation, string endStation) {
        string route = startStation + "_" + endStation;
        auto time = checkOutStation[route];
        return (double)time.first/time.second;
    }
};

/**
 * Your UndergroundSystem object will be instantiated and called as such:
 * UndergroundSystem* obj = new UndergroundSystem();
 * obj->checkIn(id,stationName,t);
 * obj->checkOut(id,stationName,t);
 * double param_3 = obj->getAverageTime(startStation,endStation);
 */