import fs from 'fs';
import {split} from './tokenizer';

console.log(split(fs.readFileSync('./demo/fibonacci/fibonacci.crln').toString()));
