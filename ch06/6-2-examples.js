/* 

6.2 함수 인라인하기
* 목적이 분명히 드러나는 이름의 짤막한 함수를 이용하기를 권한다. 
  하지만 때로는 함수 본문이 이름만큼 명확한 경우도 있다. 
  또는 함수 본문 코드를 이름만큼 깔끔하게 리팩터링할 떄도 있다. 
  => 이럴 때는 그 함수를 제거한다. 
  => 간접 호출은 유용할 수도 있지만 쓸데없는 간접 호출은 거슬릴 뿐이다.
* 

*** 절차 *** 
1. 다형 메서드인지 확인한다.
  => 서브 클래스에서 오버라이드 하는 메서드는 인라인하면 안 된다.

2. 인라인할 함수를 호출하는 곳을 모두 찾는다.

3. 각 호출문을 함수 본문으로 교체한다.

4. 하나씩 교체할 때마다 테스트한다.
  => 인라인 작업을 한 번에 처리할 피요는 없다. 인라인하기가 까다로운 부분이 있다면 일단 남겨두고 여유가 생길 때마다 틈틈이 처리한다.
  
5. 함수 정의를 삭제한다.

*/

function rating(aDriver) {
  // return moreThanFiveLateDeliveries(aDriver) ? 2 : 1
  return aDriver.numberOfLateDeliveries > 5 ? 2 : 1; // 인라인하기
}

function moreThanFiveLateDeliveries(aDriver) {
  return aDriver.numberOfLateDeliveries > 5;
}

const driverTest = 5;
console.log(driverTest);

/*==========================================================
        추가 실습
===========================================================*/
function reportLines(aCustomer) {
  const lines = [];
  gatherCustomerData(lines, aCustomer);
  return lines;

  // 리팩토링 - 함수 인라인하기
  // const lines = [];
  // lines.push(["name", aCustomer.name]);
  // lines.push(["location", aCustomer.location]);
  // return lines;
}

function gatherCustomerData(out, aCustomer) {
  out.push(["name", aCustomer.name]);
  out.push(["location", aCustomer.location]);
}

const aCustomerTest = {
  name: "jihoon",
  location: "reconers",
};
console.log(reportLines(aCustomerTest));

/* 
핵심은 단계를 잘게 나눠서 처리하는 것.
한 문장씩 처리한다.
*/
