/* eslint import/no-extraneous-dependencies:0 */
const test = require('ava');
const exec = require('child_process').exec;

const EMOJI = '🍺';
const DOUBLE_EMOJI = '🍻';
const ERROR = '🚨🚔🚔🚔🚨';

test.cb('The Tester comes to a bar', (t) => {
  const expression = 'const beers = require(\'./beers\');beers.bar();';
  exec(`node -e "${expression}"`, (err, stdout) => {
    const lines = stdout.split('\n');
    t.is(lines[0], 'Welcome to BeerKingdom!');
    t.end();
  });
});

test.cb('The Tester orders 1 pint of beer', (t) => {
  const expression = 'const beers = require(\'./beers\');beers.bar();(1).beers();';
  exec(`node -e "${expression}"`, (err, stdout) => {
    const lines = stdout.split('\n');
    lines[1] = lines[1].replace(/ /g, '');
    t.is(lines[1], EMOJI.repeat(1));
    t.end();
  });
});

test.cb('The Tester orders 2 pints of beer', (t) => {
  const expression = 'const beers = require(\'./beers\');beers.bar();(2).beers();';
  exec(`node -e "${expression}"`, (err, stdout) => {
    const lines = stdout.split('\n');
    lines[1] = lines[1].replace(/ /g, '');
    t.is(lines[1], EMOJI.repeat(2));
    t.end();
  });
});

test.cb('The Tester orders 0 pint of beer', (t) => {
  const expression = 'const beers = require(\'./beers\');beers.bar();(0).beers();';
  exec(`node -e "${expression}"`, (err, stdout, stderr) => {
    const lines = stderr.split('\n');
    t.is(lines[0], 'Are you sure?');
    t.end();
  });
});

test.cb('The Tester orders 999999999 pint of beer', (t) => {
  const expression = 'const beers = require(\'./beers\');beers.bar();(0).beers();';
  exec(`node -e "${expression}"`, (err, stdout, stderr) => {
    const lines = stderr.split('\n');
    t.is(lines[0], 'Are you sure?');
    t.end();
  });
});

test.cb('The Tester orders a lizard pint of beer', (t) => {
  const expression = 'const beers = require(\'./beers\');beers.bar();(\'lizard\').beers();';
  exec(`node -e "${expression}"`, (err, stdout, stderr) => {
    const lines = stderr.split('\n');
    t.is(lines[4].startsWith('TypeError'), true);
    t.end();
  });
});

test.cb('The Tester orders random rational pints of beer', (t) => {
  // i suppose 100 beers in maximum for all :)
  const random = Math.floor(Math.random() * 100) + 1;
  const expression = `const beers = require('./beers');beers.bar();(${random}).beers();`;
  exec(`node -e "${expression}"`, (err, stdout) => {
    const lines = stdout.split('\n');
    lines[1] = lines[1].replace(/ /g, '');
    t.is(lines[1], EMOJI.repeat(random));
    t.end();
  });
});

test.cb('The Tester orders random negative pints of beer', (t) => {
  const random = -Math.floor(Math.random() * 100) + 1;
  const expression = `const beers = require('./beers');beers.bar();(${random}).beers();`;
  exec(`node -e "${expression}"`, (err, stdout, stderr) => {
    const lines = stderr.split('\n');
    t.is(lines[0], 'You are drunk, go home!');
    t.end();
  });
});

test.cb('The Tester orders NaN pints of beer', (t) => {
  const expression = 'const beers = require(\'./beers\');beers.bar();(NaN).beers();';
  exec(`node -e "${expression}"`, (err, stdout, stderr) => {
    const lines = stderr.split('\n');
    t.is(lines[0], 'We pour only full bottle of beer!');
    t.end();
  });
});

test.cb('The Tester orders 0.5 pints of beer', (t) => {
  const expression = 'const beers = require(\'./beers\');beers.bar();(0.5).beers();';
  exec(`node -e "${expression}"`, (err, stdout, stderr) => {
    const lines = stderr.split('\n');
    t.is(lines[0], 'We pour only full bottle of beer!');
    t.end();
  });
});

test.cb('The Tester orders double pints of beer', (t) => {
  const expression = 'const beers = require(\'./beers\');beers.bar();(1).doubleBeers();';
  exec(`node -e "${expression}"`, (err, stdout) => {
    const lines = stdout.split('\n');
    lines[1] = lines[1].replace(/ /g, '');
    t.is(lines[1], DOUBLE_EMOJI.repeat(1));
    t.end();
  });
});

test.cb('The Tester orders double random rational pints of beer', (t) => {
  const random = Math.floor(Math.random() * 100) + 1;
  const expression = `const beers = require('./beers');beers.bar();(${random}).doubleBeers();`;
  exec(`node -e "${expression}"`, (err, stdout) => {
    const lines = stdout.split('\n');
    lines[1] = lines[1].replace(/ /g, '');
    t.is(lines[1], DOUBLE_EMOJI.repeat(random));
    t.end();
  });
});

test.cb('The Tester orders 6 packs of beer', (t) => {
  const expression = 'const beers = require(\'./beers\');beers.bar();(6).beerPack();';
  exec(`node -e "${expression}"`, (err, stdout) => {
    const lines = stdout.replace(/[\w\d\s?!]*/gi, '');
    t.is(lines, EMOJI.repeat(6));
    t.end();
  });
});

test.cb('The Tester orders 30 packs of beer', (t) => {
  const expression = 'const beers = require(\'./beers\');beers.bar();(30).beerPack();';
  exec(`node -e "${expression}"`, (err, stdout) => {
    const lines = stdout.replace(/[\w\d\s?!]*/gi, '');
    t.is(lines, EMOJI.repeat(30));
    t.end();
  });
});

test.cb('The Tester orders 31 packs of beer', (t) => {
  const expression = 'const beers = require(\'./beers\');beers.bar();(31).beerPack();';
  exec(`node -e "${expression}"`, (err, stdout, stderr) => {
    const lines = stderr.replace(/[\w\d\s?!]*/gi, '');
    t.is(lines, ERROR);
    t.end();
  });
});

test.cb('Now is a good time for beer?', (t) => {
  const expression = 'const beers = require(\'./beers\');beers.bar();'
    + 'const date = new Date();date.beer();date.isBeerTime();';
  exec(`node -e "${expression}"`, (err, stdout) => {
    const lines = stdout.split('\n');
    t.is(lines[1], 'Of course!');
    t.is(lines[2], 'Of course!');
    t.end();
  });
});
