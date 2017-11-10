const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(new Error('We are rejecting you!'));
  }, 3000);
});

console.log('before');

promise.then((data) => {
  console.log(data);
}).catch(error => console.log(error));
