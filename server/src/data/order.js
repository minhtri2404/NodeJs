// src/data/order.js
let orders = [];
export const addOrder = (order) => {
  orders.push(order);
};
export const getOrders = () => {
  return orders;
};