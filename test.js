import fs from "fs"
const input = fs.readFileSync(0, 'utf-8').trim();
const [a, b] = input.split(' ').map(Number);
console.log(a + b);