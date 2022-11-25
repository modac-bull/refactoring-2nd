import { invoicies, plays } from "./data.js";

console.log(invoicies);


function statement(invoice, plays) {
  let result = `Statement for ${invoice.customer}\n`;

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

  function volumeCreditsFor(aPerformance) {
    let result = 0;
    result += Math.max(aPerformance.audience - 30, 0);
    if ("comedy" === playFor(aPerformance).type)
      result += Math.floor(aPerformance.audience / 5);
    return result;

  }

  function usd(aNumber) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(aNumber / 100); // 단위 변환 로직도 이 함수 안으로 이동
  }


  function totlalVolumeCredits() {
    let result = 0; // 변수 선언(초기화)을 반복문 앞으로 이동 -> 임시 변수를 질의 함수로 바꾸기 수월해짐
    // 반복문 쪼개기 : 값 누적 로직을 별도 for문으로 분리 
    for (let perf of invoice.performances) {
      result += volumeCreditsFor(perf); // 추출한 함수를 이용해 값을 누적
    }
    return result;
  }

  // totalAmout도 앞에서와 똑같은 절차로 제거

  function totalAmount() {
    let result = 0;
    for (let perf of invoice.performances) {
      result += amountFor(perf);
    }
    return result;
  }

  // let totalAmount = 0;
  for (let perf of invoice.performances) {
    result += `  ${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience
      } seats)\n`;
    // totalAmount += amountFor(perf);
  }

  // let totalAmount = totalAmount();

  // let volumeCredits = 0; // 변수 선언(초기화)을 반복문 앞으로 이동 -> 임시 변수를 질의 함수로 바꾸기 수월해짐
  // // 반복문 쪼개기 : 값 누적 로직을 별도 for문으로 분리 
  // for ( let perf of invoice.performances) {
  //   volumeCredits += volumeCreditsFor(perf); // 추출한 함수를 이용해 값을 누적
  // }

  /* 
    volumeCredits 변수를 제거하는 작업의 단계
    1. 반복문 쪼개기로 변수 값을 누적시키는 부분을 분리한다.
    2. 문장 슬라이드하기로 변수 초기화 문장을 변수 값 누적 코드 바로 앞으로 옮긴다.
    3. 함수 추출하기로 적립 포인트 계산 부분을 별도 함수로 추출한다.
    4. 변수 인라인하기로 volumeCredits 변수를 제거한다.
  */


  result += `Amount owed is ${usd(totalAmount())}\n`; // 임시 변수였던 format을 함수 호출로 대체
  result += `You earned ${totlalVolumeCredits()} credits\n`;
  return result;
}

console.log(statement(invoicies, plays))