// console.log("1. görev");
// console.log("2. görev");
// console.log("3. görev");

// const func1 = () => {
//   console.log("Func 1 tamamlandı");
// };

// const func2 = () => {
//   console.log("Func 2 tamamlandı");
// };

// func2();
// func1();
// //belirlenen sırayla kodlar geliyor

// const func1 = () => {
//   console.log("Func 1 tamamlandı");
//   func2();
// };

// const func2 = () => {
//   console.log("Func 2 tamamlandı");
//   func3();
// };

// const func3 = () => {
//   console.log("Func 3 tamamlandı");
// };

// func1();

// çıktısı
// Func 1 tamamlandı
// Func 2 tamamlandı
// Func 3 tamamlandı

// const func1 = () => {
//   console.log("Func 1 tamamlandı");
//   func3();
// };

// const func2 = () => {
//   console.log("Func 2 tamamlandı");
// };

// const func3 = () => {
//   console.log("Func 3 tamamlandı");
//   func2();
// };

// func1();

// çıktısı
// Func 1 tamamlandı
// Func 3 tamamlandı
// Func 2 tamamlandı

// Single Thread --- JS Senkron

// let x = 5;
// console.log("1. gelen veri: ", x);

// setTimeout(() => {
//   x = x + 5;
// }, 5000); // 5 saniye veri beklesin dedik
// console.log("2. gelen veri: ", x);

// x = x + 5;
// console.log("3. gelen veri: ", x);

// çıktısı
// 1. gelen veri:  5
// 2. gelen veri:  5
// 3. gelen veri:  10

// her zaman sıralı senkron çalışmak bize istediğimiz sonuçları vermeyebilirmiş.

// let x = 5;
// console.log("1. gelen veri: ", x);

// setTimeout(() => {
//   x = x + 5;
//   console.log("2. gelen veri: ", x);
// }, 5000); // 5 saniye veri beklesin dedik

// x = x + 5;
// console.log("3. gelen veri: ", x);

// çıktısı
// 1. gelen veri:  5
// 3. gelen veri:  10
// 2. gelen veri:  15

// setTimeout içinde console.log bir callback işlemi görüyor

const books = [
  { name: "Kitap 1", author: "Yazar 1" },
  { name: "Kitap 2", author: "Yazar 2" },
  { name: "Kitap 3", author: "Yazar 3" },
];

const listBooks = () => {
  books.map((book) => {
    console.log(book.name);
  });
};

const addBook = (newBook, callback) => {
  books.push(newBook);
  callback();
};

addBook({ name: "Kitap 4", author: "Yazar 4" }, listBooks);

// listBooks();
