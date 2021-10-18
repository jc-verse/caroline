import {parse} from '@babel/parser';

const res = parse(`var a = 1 + true; // add
var {a, b} = c;
var d = e(f, g);`, {tokens: true}).tokens;
console.log(res.map(t => [t.value, t.type]));
