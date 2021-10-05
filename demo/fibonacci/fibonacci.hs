fib i
  | i == 0 || i == 1 = 1
  | otherwise        = fib(i - 1) + fib(i - 2)
sigma l r expr = sum(map expr [l..r])

main = do
  putStrLn (show (sum (map fib [2..9])))
  putStrLn (show (sigma 2 9 fib))
