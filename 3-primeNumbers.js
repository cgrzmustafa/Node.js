// 1'e ve kendine bölünecek, 1 den büyük pozitif tamsayı olacak

const arguments = process.argv.slice(2); // dizi içinde 2 adet string ifade

function showPrimeNumbers(lownumber, highnumber) {
  for (let i = lownumber; i <= highnumber; i++) {
    let isPrime = true;
    for (let j = 2; j <= i; j++) {
      if (i % j === 0 && j !== i) {
        isPrime = false;
      }
    }

    if (isPrime) {
      console.log(i);
    }
  }
}

showPrimeNumbers(arguments[0] * 1, arguments[1] * 1); // stringi sayıyla çarparak dönüşüm yaptık

//console.log(process.argv.slice(2));
