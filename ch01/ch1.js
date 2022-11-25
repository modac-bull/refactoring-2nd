import { invoicies, plays } from "./data.js";

console.log(invoicies);

// 1.4 함수 추출하기
function amountFor(aPerformance) {
  let result = 0; // 명확한 이름으로 변경
  switch (playFor(aPerformance).type) { // play를 playFor()호출로 변경
    case "tragedy":
      result = 40000;
      if (aPerformance.audience > 30) {
        result += 1000 * (aPerformance.audience - 30);
      }
      break;
    case "comedy":
      result = 30000;
      if (aPerformance.audience > 20) {
        result += 10000 + 500 * (aPerformance.audience - 20);
      }
      result += 300 * aPerformance.audience;
      break;
    default:
      throw new Error(`unknown type: ${playFor(aPerformance).type}`);  // play를 playFor()호출로 변경
  }
  return result;
}

// play 변수 제거하기 -> 임시 변수를 질의 함수로 바꾸기
function playFor(aPerformance) {
  return plays[aPerformance.playID]
}

function statement(invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `Statement for ${invoice.customer}\n`;
  const format = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format;

  console.log(invoice)
  for (let perf of invoice.performances) {
    // const play = playFor(perf); // 우변을 함수로 추출 후 제거
    
    // let thisAmount = amountFor(perf); // amountFor()에 함수 선언 바꾸기를 통해 play 매개변수 제거 + 필요없어진 playFor(perf) 매개변수 제거

    // add volume credits
    volumeCredits += Math.max(perf.audience - 30, 0);
    // add extra credit for every ten comedy attendees
    if ("comedy" === playFor(perf).type) volumeCredits += Math.floor(perf.audience / 5);

    // print line for this order
    result += `  ${playFor(perf).name}: ${format(amountFor(perf) / 100)} (${
      perf.audience
    } seats)\n`;
    totalAmount += amountFor(perf);
  }
  result += `Amount owed is ${format(totalAmount / 100)}\n`;
  result += `You earned ${volumeCredits} credits\n`;
  return result;
}

console.log(statement(invoicies, plays))