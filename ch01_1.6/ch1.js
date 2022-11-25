import { invoicies, plays } from "./data.js";

console.log(invoicies);

function usd(aNumber) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(aNumber / 100);
}

// 1.6 계산 단계와 포맷팅 단계 분리하기
function statement(invoice, plays) {
  return renderPlainText(createStatementData(invoice, plays)); // 본문 전체를 별도의 함수로 추출
}

// 최상위로 빼준다.
function createStatementData(invoice, plays) {
  // 중간 데이터 생성을 전담
  const statementData = {}; // 데이터 구조 역할을 할 객체를 만듦
  statementData.customer = invoice.customer; // 고객 데이터를 중간 데이터로 옮김
  statementData.performances = invoice.performances.map(enrichPerformance); // 공연 정보를 중간 데이터로 옮김
  statementData.totalAmount = totalAmount(statementData);
  statementData.totalVolumeCredits = totalVolumeCredits(statementData);
  return statementData;
  function enrichPerformance(aPerformance) {
    const result = Object.assign({}, aPerformance); // 얕은 복사 수행 -> 데이터를 최대한 불변 취급하기 위해 복사
    result.play = playFor(result);
    result.amount = amountFor(result);
    result.volumeCredits = volumeCreditsFor(result);
    return result;
  }

  function playFor(aPerformance) {
    return plays[aPerformance.playID];
  }

  function amountFor(aPerformance) {
    let result = 0;
    switch (aPerformance.play.type) {
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
        throw new Error(`unknown type: ${playFor(aPerformance).type}`);
    }
    return result;
  }

  function volumeCreditsFor(aPerformance) {
    let result = 0;
    result += Math.max(aPerformance.audience - 30, 0);
    if ("comedy" === aPerformance.play.type)
      result += Math.floor(aPerformance.audience / 5);
    return result;
  }

  function totalAmount(data) {
    return data.performances.reduce((total, p) => total + p.amount, 0); // for 반복문을 파일프라인으로 바꾸기
  }

  function totalVolumeCredits(data) {
    return data.performances.reduce((total, p) => total + p.volumeCredits, 0);
  }
}

// 본문 전체를 별도의 함수로 추출
function renderPlainText(data) {
  // 중간 데이터 구조를 인수로 전달
  let result = `Statement for ${data.customer}\n`;
  for (let perf of data.performances) {
    result += `  ${perf.play.name}: ${usd(perf.amount)} (${
      perf.audience
    } seats)\n`;
  }
  result += `Amount owed is ${usd(data.totalAmount)}\n`;
  result += `You earned ${data.totalVolumeCredits} credits\n`;
  return result;

  
}

function renderHtml(data) {
  let result = `<h1>Statement for ${data.customer}</h1>\n`;
  result += `<table>\n`;
  result += `<tr><th>연극</th><th>좌석 수</th><th>금액</th></tr>`;
  for (let perf of data.performances) {
    result += ` <tr><td> ${perf.play.name} </td><td> (${perf.audience} seats)</td>`;
    result += `<td>${usd(perf.amount)} </td></tr>\n`
  }
  result += "</table>\n";
  result += `<p>Amount owed is ${usd(data.totalAmount)}</p>\n`;
  result += `<p>You earned ${data.totalVolumeCredits} credits</p>\n`;
  return result;

}
console.log(statement(invoicies, plays));
console.log(renderHtml(createStatementData(invoicies, plays)))

document.querySelector('.container').innerHTML = renderHtml(createStatementData(invoicies, plays));