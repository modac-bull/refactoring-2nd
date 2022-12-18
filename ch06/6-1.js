/**
 * 6.1 함수 추출하기
 * '목적'과 '구현'을 분리하기
 */

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

function printOwing(invoice) {
  printBanner();
  let outstanding = calculateOutstanding();

  // 세부 사항 출력
  console.log(`고객명 : ${invoice.customer}`);
  console.log(`채무명 : ${outstanding}`);
}

// ==>

function printOwing(invoice) {
  printBanner();
  let outstanding = calculateOutstanding();
  printDetails(outstanding);

  // 세부 사항 출력
  function printDetails(outstanding) {
    console.log(`고객명 : ${invoice.customer}`);
    console.log(`채무명 : ${outstanding}`);
  }
}
