import numpy as np
# lib
def sigma(l, r):
    return lambda expr: sum(map(expr, np.arange(l, r)))

# main
fib = lambda i: 1 if i == 0 or i == 1 else fib(i - 1) + fib(i - 2)

print(sum(np.vectorize(fib)(np.arange(2, 10))))
print(sigma(2, 10)(fib))
