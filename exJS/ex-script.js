class Person {
  constructor(name, age ) {
    this.name = name;
    this.age = age;
  }

  testHello() {
    console.log(`${this.name} , ${this.age}`)
  }
}

const p1 = new Person('이지훈',32);

console.log(p1.name)
console.log(p1.age)
p1.testHello();

console.log(typeof Person);