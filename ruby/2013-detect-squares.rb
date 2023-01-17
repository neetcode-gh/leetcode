class DetectSquares
    def initialize()
        @points_count = Hash.new(0)
        @points = []   
    end


    def add(point)
        @points_count[point] +=1
        @points.append(point)
    end

    def count(point)
        result = 0
        px = point[0]
        py = point[1]

        @points.each do |p|
            next if (((py-p[1]).abs != (px-p[0]).abs) || (p[0]==px) ||(p[1]==py))
            result += @points_count[[p[0],py]] * @points_count[[px,p[1]]]
        end

        return result
        
    end


end