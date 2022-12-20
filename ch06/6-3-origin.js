/* 
6.3 변수 추출하기
 <-> 변수 인라인하기 (반대)

*/

{
  function priceCalc() {
    return (
      order.quantity * order.itemPrice -
      Math.max(0, odrer.qunatity - 500) * order.itemPrice * 0.05 +
      Math.min(order.quantity * order.itemPrice * 0.1, 100)
    );
  }
}

// => 리팩토링
{
  function priceCalc() {
    const basePrice = order.quantity * order.itemPrice;
    const qunatityDiscount =
      Math.max(0, odrer.qunatity - 500) * order.itemPrice * 0.05;
    const shipping = Math.min(order.quantity * order.itemPrice * 0.1, 100);
    return basePrice - qunatityDiscount + shipping;
  }
}
