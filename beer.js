(() => {
  const EMOJI = '🍺 ';
  const DOUBLE_EMOJI = '🍻 ';
  const ERROR = '🚨  🚔  🚔  🚔  🚨';

  function parseBeer(clientWantsBeer) {
    const beer = parseInt(clientWantsBeer, 10);
    let response = '';
    if (beer !== Number(clientWantsBeer)) {
      response = 'We pour only full bottle of beer!';
      console.error(response);
      return false;
    }
    if (beer < 0 || !Number.isSafeInteger(beer)) {
      response = 'You are drunk, go home!';
      console.error(response);
      return false;
    }
    if (beer === 0) {
      response = 'Are you sure?';
      console.warn(response);
      return false;
    }
    return beer;
  }

  function beers() {
    const beer = parseBeer(this);
    if (beer === false) {
      return this;
    }
    const response = `${EMOJI} `.repeat(beer);
    console.log(response);
    return beer;
  }

  function doubleBeers() {
    const beer = parseBeer(this);
    if (beer === false) {
      return this;
    }
    const response = `${DOUBLE_EMOJI} `.repeat(beer);
    console.log(response);
    return beer;
  }

  function printPack(rows, cols) {
    for (let i = 0; i < rows; i += 1) {
      cols.beers();
    }
  }

  function pack() {
    const beer = parseBeer(this);
    if (beer === false) {
      return this;
    }
    switch (beer) {
      case 6:
        printPack(2, 3);
        break;
      case 12:
        printPack(2, 6);
        break;
      case 18:
        printPack(3, 6);
        break;
      case 24:
        printPack(4, 6);
        break;
      case 30:
        printPack(5, 6);
        break;
      default:
        console.error(ERROR);
        break;
    }
    return beer;
  }

  function isBeerTime() {
    const response = 'Of course!';
    console.log(response);
    return true;
  }

  function init() {
    console.info('Welcome to BeerKingdom!');
    Number.prototype.beer = beers;
    Number.prototype.beers = beers;
    Number.prototype.doubleBeers = doubleBeers;
    Number.prototype.beerPack = pack;
    Date.prototype.beer = isBeerTime;
    Date.prototype.isBeerTime = isBeerTime;
  }

  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = {
      bar: init,
    };
  } else {
    init();
  }
})();
