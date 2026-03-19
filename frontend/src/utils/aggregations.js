export const aggregate = (orders, metric, method) => {
  const values = orders.map((o) => parseFloat(o[metric])).filter((v) => !isNaN(v));
  if (values.length === 0) return 0;
  if (method === 'sum')     return values.reduce((a, b) => a + b, 0);
  if (method === 'average') return values.reduce((a, b) => a + b, 0) / values.length;
  if (method === 'count')   return orders.length;
  return 0;
};

export const formatValue = (value, dataFormat, precision = 0) => {
  const num = parseFloat(value).toFixed(precision);
  if (dataFormat === 'currency') return `$${parseFloat(num).toLocaleString()}`;
  return parseFloat(num).toLocaleString();
};

export const buildChartData = (orders, xAxis, yAxis) => {
  const grouped = {};
  orders.forEach((order) => {
    const key = order[xAxis] ?? 'Unknown';
    const val = parseFloat(order[yAxis]) || 1;
    grouped[key] = (grouped[key] || 0) + val;
  });
  return Object.entries(grouped).map(([name, value]) => ({ name, value }));
};

export const buildPieData = (orders, dataKey) => {
  const grouped = {};
  orders.forEach((order) => {
    const key = order[dataKey] ?? 'Unknown';
    grouped[key] = (grouped[key] || 0) + 1;
  });
  return Object.entries(grouped).map(([name, value]) => ({ name, value }));
};