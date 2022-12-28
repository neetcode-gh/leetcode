public class DetectSquares {

  private Dictionary<(int x, int y), int> _pointsCounter = new();
    private List<(int x, int y)> _points = new();

    public DetectSquares() { }
    
    public void Add(int[] point) {
        var p = (point[0], point[1]);
        _points.Add(p);
        _pointsCounter[p] = 1 + _pointsCounter.GetValueOrDefault(p, 0);
    }
    
    public int Count(int[] point) {
        int px = point[0], py = point[1];
        int result = 0;

        foreach (var (x, y) in _points) {
            
            if (Math.Abs(px - x) != Math.Abs(py - y) 
                || x == px || y == py) { 
                continue;
            }
            result += _pointsCounter.GetValueOrDefault((px, y), 0) * _pointsCounter.GetValueOrDefault((x, py), 0);
        }
        return result;
    }
}

/**
 * Your DetectSquares object will be instantiated and called as such:
 * DetectSquares obj = new DetectSquares();
 * obj.Add(point);
 * int param_2 = obj.Count(point);
 */