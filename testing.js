const myObjectOne = {name: "I am unique!"};
const myObjectTwo = {name: "I am unique!"}
console.log(myObjectOne === myObjectTwo); // returns 'false' since each variable has it's own memory location.
console.log("-----------Boundary----------");

const myObjectOneAgain = {name: "I am unique!"};
const myObjectTwoAgain = myObjectOneAgain;
console.log(myObjectOneAgain === myObjectTwoAgain);// returns 'true' since the second variable's value is the first variable's memory location.
// So basically, the value of [myObjectTwoAgain] resolves to the memory address of [myObjectOneAgain].
console.log("-----------Boundary----------");