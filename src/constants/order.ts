export const ORDER_STATUS = {
  movedToOrder: 0, // выбранные товары и их количество ПЕРЕМЕЩЕНЫ из корзаны в заказ
  registered: 1, // заказ зарегистрирован
  movedToAssembly: 3, // заказ передан в сборку
  moveToDeliveryService: 4, // заказ передан в службу доставки
  readyToPickUp: 5, // заказ готов к выдаче
  pickedUp: 6, // заказ получен
  cancelled: 7, // заказ отменен (на любом этапе/статусе)
}
