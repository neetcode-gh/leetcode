def max_profit(prices)
  max_profit = 0
  min = prices.first
  prices.each do |price|
    min = price if price < min
    profit = price - min
    max_profit = profit if profit > max_profit
  end
  max_profit
end
