// Test
window.lotteryGrid.init({
  el: document.querySelector('#wrap1'),
  itemClassName: 'item',
  winIndex: 1,
  roundNum: 2
});

lotteryGrid.addEventListener('finish', () => {
  document.querySelector('.btn').classList.add('s-disabled');
});

document.querySelector('.btn').addEventListener('click', () => {
  const isLotteryFinished = lotteryGrid.isLotteryFinished;
  if (isLotteryFinished) {
    
  } else {
    lotteryGrid.start();
  }
});