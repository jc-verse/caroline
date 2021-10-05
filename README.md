# Caroline

A human-readable script language.

## Design principles

The guiding principle of Caroline is: be as close to mathematical language as possible. It will have much fewer programmatic constructs than typical languages—no first-class class support, no memory allocation details... On the other hand, structures like fractions, sets, and matrices will be natively supported and optimized.

I haven't formalized any of the syntax into a spec, but below are some random thoughts:

## Data types

This is a language mainly used for algorithms and maths. The data types are:

- **Number** `-1.6`, `1/3`;
- **Boolean** `true`;
- **String** `"Hello"`;
- **Matrix** `((1, 2, 3), (4, 5, 6))` (supports matrix operations; vectors are special names for n×1 or 1×n matrices);
- **Function**.

## Arithmetic

Apart from the typical integer and decimal types, number types also include **fractions**, **irrational numbers**, and **complex numbers**. The special number `infty` is used for sequence and function limits, as well as the result of division by zero.

Since fractions preserve more precision than decimals, whenever a fraction is involved in an expression, the result will be a fraction. Integers are special fractions with denominator of 1.

```java
Num a := 1.6;
Num b := 1/3;
Num c := a * b; // c = 8/15
Num d := 1.6 / 3; // d = 8/15
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

```java
Func squaresum := (Num a, Num b) => a^2 + b^2;

Num c := 1 squaresum 2; // c = 5
```

A number literal followed by a variable is infered to be a multiplication.

```java
Num x := 2;
Num a := 3x^2 + 2x + 1; // a = 17
```

## Declaring sequences

```java
Seq a := i => i^2; // a = 0, 1, 4, 9, 16, ...
```

**Sequences are functions.** More specifically, a sequence is defined as

```java
Type Seq := (Num) => T;
```

where the only parameter is the subscript. Unlike vectors, sequences contain an infinite number of items. `a_i` is just a syntax sugar to `a(i)` as in a function. For collections of finite number of objects, use vectors.

## Iterating sequences

The syntax `i...j` returns an iterator from `i` to `j`, inclusive. This is akin to `range(i, j)` in Python.

When an iterator is used in the index, it also returns an iterator.

```java
Seq a := i => i;
for (Num k in a_(1...3)) {
    print(k); // Out: 1 2 3
}
```

## Matrix operations

Any typical matrix operation is supported. Moreover mathematical functions treat square matrices the same as numbers.

```java
Mat a := ((1, 2, 3), (4, 5, 6), (7, 8, 9));
Mat b := cos(a);
/**
b = (( 0.38017732968947, −0.3738301457419 , −0.12783762117329),
     (−0.53120649276402,  0.39010533372492, −0.68858283978612),
     (−0.44259031521749, −0.84595918680825, −0.24932805839901))
*/
```

## Expressions

Expressions are syntax sugars for functions.

```java
Type Expr := (...T) => T;
```

This is to reduce the cumbersome typing. A type like `(num, vec) => num` can now be simply `expr`. However, I'm not sure how robustness / type safety can be achieved in this case.

## Mathematical functions

In mathematics, parameters used in functions often appear like currying to me. For example, $\sum_{k=0}^{10}k^2$ is just a function $\sum_{k=0}^{10}$ applied to an expression $k^2$.

I propose the angle brackets be used to pass parameters to functions that return a function, while round brackets are for functions that return a value.

```java
Func sum := <Num i, Num j> => {
    return (Expr f) => {
        Num s := 0;
        for (Num x in i...j) {
            s += f(x);
        }
        return s;
    }
}

Num a = sum<1, 10>(x => x^2); // a = 385
```

## Immutability

Although appearing to be a functional programming language, everything is by default mutable. Immutable objects have `const` modifiers.
