# Caroline

A human-readable script language.

Text

## Design principles

The guiding principle of Caroline is: be as close to mathematical language as possible. It will have much fewer programmatic constructs than typical languages—no first-class class support, no memory allocation details... On the other hand, structures like fractions, sets, and matrices will be natively supported and optimized.

I haven't formalized any of the syntax into a spec ([a very rough spec is now available](./spec.md)), but below are some random thoughts:

## Data types

This is a language mainly used for algorithms and maths. The data types are:

- **Number** `-1.6`, `1/3`;
- **Boolean** `true`;
- **String** `"Hello"`;
- **Matrix** `((1, 2, 3), (4, 5, 6))` (supports matrix operations; vectors are special names for n×1 or 1×n matrices);
- **Function**;
- **Type**. Yes, types are data types themselves.

## Arithmetic

Apart from the typical integer and decimal types, number types also include **fractions**, **irrational numbers**, and **complex numbers**. The special number `infty` is used for sequence and function limits, as well as the result of division by zero.

Since fractions preserve more precision than decimals, whenever a fraction is involved in an expression, the result will be a fraction. Integers are special fractions with denominator of 1.

```
a, b, c, d ∈ Num; {{ ∈ is hard to type, I know. I would probably allow :: as well, but I'll be trying my best to not take up the room of custom operators }}
a := 1.6;
b := 1/3;
c := a * b; {{ c = 8/15 }}
d := 1.6 / 3; {{ d = 8/15 }}
```

Some operations are:

- Addition: `+`;
- Subtraction: `-`;
- Multiplication: `*`;
- Division: `/`;
- Exponentiation: `^`;
- Assignment: `:=`;
- Equality: `=`, `==`;
- Inequality: `>`, `<`, `>=`, `<=`, `!=`.

Any function with two parameters can be used as a binary operator.

```
squaresum ∈ (Num, Num) -> Num;
squaresum := (a, b) => a^2 + b^2;

c := 1 squaresum 2; {{ c = 5 }}
```

Note the implication: you can create _any_ kind of custom binary operator.

```
|> ∈ (T, U) => ((T, (T) -> U) -> U);
|> := (val, f) => f(val);
a = 2 |> exp |> cos; {{ a = 0.448356 }}
```

I'm still deciding on operator priorities. There are certain operators that can't be overridden for parsing concerns, like `:=`,  `∈`, `=>`, etc.

A number literal followed by a variable is inferred to be a multiplication.

```
x := 2;
a := 3x^2 + 2x + 1; {{ a = 17 }}
```

## Declaring sequences

```
a ∈ Seq := i => i^2; {{ a = 0, 1, 4, 9, 16, ... }}
```

**Sequences are functions.** More specifically, a sequence is defined as

```
Seq := (T) => ((Num) -> T);
```

where the only parameter is the subscript. Unlike vectors, sequences contain an infinite number of items. `a_i` is just a syntax sugar to `a(i)` as in a function. For collections of finite number of objects, use vectors.

## Iterating sequences

The syntax `i...j` returns an iterator from `i` to `j`, inclusive. This is akin to `range(i, j)` in Python.

When an iterator is used in the index, it also returns an iterator.

```
a ∈ Seq := i => i;
for (k in a_(1...3)):
  print(k); {{ Out: 1 2 3 }}
```

## Matrix operations

Any typical matrix operation is supported. Moreover mathematical functions treat square matrices the same as numbers.

```
a ∈ Mat := ((1, 2, 3), (4, 5, 6), (7, 8, 9));
b := cos(a);
{{
b = (( 0.38017732968947, −0.3738301457419 , −0.12783762117329),
     (−0.53120649276402,  0.39010533372492, −0.68858283978612),
     (−0.44259031521749, −0.84595918680825, −0.24932805839901))
}}
```

## Mathematical functions

In mathematics, parameters used in functions often appear like currying to me. For example, $\sum_{k=0}^{10}k^2$ is just a function $\sum_{k=0}^{10}$ applied to an expression $k^2$.

Angle brackets and round brackets can be used interchangeably to denote function call—I recommended that the angle brackets be used to pass parameters to functions that return a function, while round brackets are for functions that return a value.

```
Expr := (Num) -> Num;
sum ∈ (Num, Num) -> (Expr -> Num);
sum := (i, j) => {
  return (f) => {
    s := 0;
    for (x in i...j):
      s += f(x);
    return s;
  }
}

a := sum<1, 10>(x => x^2); {{ a = 385 }}
```

```
Operator := (Num, Num) -> Num;
powersum ∈ Num -> Operator;
powersum := (n) => {
  return (a, b) => a^n + b^n;
}
a := 2 powersum<3> 3; {{ a = 35 }}
```

## Type operations

Types are treated as sets in Caroline. That means, it will allow dependent typing, refinement typing, and all the intuitive manipulations one would apply to values.

```
Odd = {a: Int | a % 2 != 0};
Even = {a: Int | a % 2 = 0};
if (Odd | Even != Int):
  error("The universe disappears in a bang");

num ∈ Odd := 2; {{ Error: 2 is not assignable to Odd because 2 % 2 = 0 }}
```
