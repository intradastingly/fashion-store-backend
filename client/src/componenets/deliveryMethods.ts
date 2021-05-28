export function calculateDeliveryDay(timeInHours: number) {
  const today = new Date()
  const deliveryDay = new Date(today);
  deliveryDay.setDate(deliveryDay.getDate() + timeInHours / 24);
  return deliveryDay.toISOString().split('T')[0]; 
}