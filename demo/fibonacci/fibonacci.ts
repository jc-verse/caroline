/* lib */
const sum = (it: number[]) => it.reduce((acc, val) => acc + val, 0);
const range = (l: number, r: number) => Array<number>(r - l + 1).fill(0).map((v, i) => i + l);
const sigma = (l: number, r: number) => (expr: (i: number) => number) => sum(range(l, r).map(expr));
type Seq = (a: number) => number;

/* main */
const fib: Seq = (i) =>
  i == 0 || i == 1
    ? 1
    : fib(i - 1) + fib(i - 2);
// Only here because TS doesn't have broadcasting
const fib_ = (it: number[]) => it.map((i) => fib(i));

console.log(sum(fib_(range(2, 9))));
console.log(sigma(2, 9)(fib));
