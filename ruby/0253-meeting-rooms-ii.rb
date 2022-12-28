def min_meeting_rooms(intervals)

   start = intervals.collect(&:first).sort!
   close = intervals.collect(&:last).sort!
    
   res = 0
   count = 0
   s = 0
   e = 0
    
   while (s < intervals.length)
    if(start[s] >= close[e])
     e +=1
     count -=1
    else
     s +=1
     count +=1
    end
    res = [res,count].max
   end
    return res
end