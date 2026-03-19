export const filterByDateRange = (orders, dateRange) => {
  if (!dateRange || dateRange === 'all') return orders;
  const now = new Date();
  const start = new Date();
  if (dateRange === 'today') start.setHours(0, 0, 0, 0);
  else if (dateRange === 'last7')  start.setDate(now.getDate() - 7);
  else if (dateRange === 'last30') start.setDate(now.getDate() - 30);
  else if (dateRange === 'last90') start.setDate(now.getDate() - 90);
  return orders.filter((o) => new Date(o.createdAt) >= start);
};