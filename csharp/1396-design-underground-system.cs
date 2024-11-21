public class UndergroundSystem
{
	// key: id
	// value: station, time
	private Dictionary<int, (string, int)> checked_in = new();
	// key: start and end station
	// value: total time, count
	private Dictionary<(string, string), (int, int)> backlog = new();
	public UndergroundSystem() { }

	public void CheckIn(int id, string stationName, int t)
	{
		checked_in[id] = (stationName, t);
	}

	public void CheckOut(int id, string stationName, int t)
	{
		(string station, int time) = checked_in[id];
		if (!backlog.TryAdd((station, stationName), (t - time, 1)))
		{
			(int total_time, int count) = backlog[(station, stationName)];
			backlog[(station, stationName)] = (total_time + (t - time), count + 1);
		}
	}

	public double GetAverageTime(string startStation, string endStation)
	{
		(int total_time, int count) = backlog[(startStation, endStation)];
		return (double)total_time / count;
	}
}