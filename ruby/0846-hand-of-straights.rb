def is_n_straight_hand(hand, w)
    hand = hand.sort()
    index = 0
    residual = []
    cur = []
    while(hand.length > 0)
       num = hand.shift
        if cur.size == 0
            cur << num
        else
            if num == cur[-1] + 1
                cur << num
            elsif num == cur[-1]
                residual << num
            elsif num > cur[-1] + 1
                return false
            end
        end
        if cur.length == w 
            hand = residual + hand
            cur = []
            residual = []
        end
            
    end
    return (cur.size == 0 or cur.size == w)
    
end