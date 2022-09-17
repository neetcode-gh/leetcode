public class Solution {
public class Engineer
        {
            public int speed;
            public int efficiency;
            public Engineer(int speed, int efficiency)
            {
                this.speed = speed;
                this.efficiency = efficiency;
            }

        }

        public int MaxPerformance(int n, int[] speed, int[] efficiency, int k)
        {
            List<Engineer> engineers = new();
            for (int i = 0; i < n; i++)
            {
                engineers.Add(new Engineer(speed[i], efficiency[i]));
            }

            engineers = engineers.OrderByDescending(x => x.efficiency).ToList();
            var queue = new PriorityQueue<int, int>();
            long speedTotal = 0, result = 0;
            foreach (var engineer in engineers)
            {
                if (queue.Count > k - 1)
                    speedTotal -= queue.Dequeue();
                queue.Enqueue(engineer.speed, engineer.speed);
                speedTotal += engineer.speed;
                result = Math.Max(result, speedTotal * engineer.efficiency);
            }

            return (int)(result % 1000000007);
        }
}
