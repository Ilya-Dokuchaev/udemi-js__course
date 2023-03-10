// Challenge 1 BMI + Challenge 2

const mark = { weight: 78, height: 1.78, name: "Mark" };
const jonas = { weight: 92, height: 1.96, name: "Jonas" };

const persons = [mark, jonas];

function bodyMassIndexCalc() {
  const BMI = persons.map((el) =>
    Number((el.weight / Math.pow(el.height, 2)).toFixed(2))
  );
  console.log(BMI);
  return BMI[0] > BMI[1]
    ? `${persons[0].name} BMI ${BMI[0]} is bigger than ${persons[1].name} BMI ${BMI[1]}`
    : `${persons[1].name} BMI ${BMI[1]} is bigger than ${persons[0].name} BMI ${BMI[0]}`;
}

console.log(bodyMassIndexCalc());

// Challenge 3 Trophy hunt with draw

const dolphinsScore = [6, 38, 4];
const koalasScore = [92, 10, 48];
let isTrophy;

function averageScore(arr) {
  return Math.round(
    arr.reduce((accum, currentValue) => accum + currentValue) / arr.length
  );
}

const dolphinsAverage = averageScore(dolphinsScore);
const koalasAverage = averageScore(koalasScore);
isTrophy = dolphinsAverage > 10 || koalasAverage > 10;

switch (true) {
  case dolphinsAverage === koalasAverage && isTrophy:
    console.log("DRAW Prise");
    break;
  case dolphinsAverage > koalasAverage && isTrophy:
    console.log("Dolphins Prise");
    break;
  case dolphinsAverage < koalasAverage && isTrophy:
    console.log("Koalas Prise");
    break;
  default:
    console.log("no one wins");
}

console.log(averageScore(dolphinsScore));
console.log(averageScore(koalasScore));

console.log(isTrophy);

// Coding challenge #4

const bill = 50;
let tip;
tip = bill > 50 && bill < 300 ? (tip = 15) : (tip = 20);
const totalBill = (bill) => {
  return (tip / 100) * bill.toFixed(2);
};
console.log(`The bill was ${bill}$ the tip was ${tip}%
 and the total value was ${totalBill(bill) + bill}$`);
