/* eslint global-require:0 */
/* eslint new-parens:0 */

if (typeof require === 'function') {
  require('./beer').bar();
}

console.log('');
console.log('If you are alone:');
(1).beer();

console.log('');
console.log('You and your other half:');
(2).beer();

console.log('');
console.log('With colleagues:');
(4).beer();

console.log('');
console.log('Friday\'s night:');
(4).doubleBeers();

console.log('');
console.log('Party hard!');
(30).beerPack();

console.log('');
console.log('Later:');
(-1).beerPack();

console.log('');
console.log('Saturday morning:');
(31).beerPack();

console.log('');
console.log('Coffee?');
(0).beer();

console.log('');
console.log('Is any evening a beer time?');
(new Date).isBeerTime();
