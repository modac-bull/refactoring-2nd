/* 
절차
1. 함수를 새로 만들고 목적을 잘 드러내는 이름을 붙인다.
('어떻게'가 아닌 '무엇을' 하는지가 드러나야 한다.)
2. 추출할 코드를 원본 함수에서 복사하여 새 함수에 붙여넣는다.
3. 추출한 코드 중 원본 함수의 지역 변수를 참조하거나 추출한 함수의 유효범위를 벗어나는 변수는 없는지 검사한다. 있다면 매개변수로 전달한다.
4. 변수를 다 처리했다면 컴파일한다.
5. 원본 함수에서 추출한 코드 부분을 새로 만든 함수를 호출하는 문장으로 바꾼다.
(즉, 추출한 함수로 일을 위임한다.)
6. 테스트한다.
7. 다른 코드에 방금 추출한 것과 똑같거나 비슷한 코드가 없는지 살핀다. 있다면 방금 추출한 새 함수를 호출하도록 바꿀지 검토한다(인라인 코드를 함수 호출로 바꾸기)
*/

const Clock  = {
  today : '2022'
}

function printOwing(invoice) {
  let outstanding = 0;

  prtinBanner(); // 배너 출력 로직을 함수로 추출

  // 미해결 채무(outstanding)를 계산한다.
  for (const o of invoice.orders) {
    outstanding += o.amount;
  }

  // 마감일(dueDate)을 기록한다.
  const today = Clock.today;
  invoice.dueDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 30
  );

  printDetails() ; // 세부 사항 출력 로직을 함수로 추출.


  function prtinBanner() {
    console.log("#######");
    console.log("고객 채무");
    console.log("#######");
  }
  
  function printDetails() {
    console.log(`고객명 : ${invoice.customer}`);
    console.log(`채무액 : ${outstanding}`);
    console.log(`마감일 : ${invoice.dueDate.toLocaleDateString()}`);
  }
}

