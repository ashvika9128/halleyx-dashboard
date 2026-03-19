export const WIDGET_DEFAULTS = {
  bar:     { title: 'Bar Chart',    type: 'bar',     size: { w: 6, h: 4 }, config: { xAxis: 'product', yAxis: 'totalAmount', color: '#54bd95', showDataLabel: false } },
  line:    { title: 'Line Chart',   type: 'line',    size: { w: 6, h: 4 }, config: { xAxis: 'product', yAxis: 'totalAmount', color: '#3b82f6', showDataLabel: false } },
  area:    { title: 'Area Chart',   type: 'area',    size: { w: 6, h: 4 }, config: { xAxis: 'product', yAxis: 'totalAmount', color: '#8b5cf6', showDataLabel: false } },
  scatter: { title: 'Scatter Plot', type: 'scatter', size: { w: 6, h: 4 }, config: { xAxis: 'product', yAxis: 'totalAmount', color: '#f59e0b', showDataLabel: false } },
  pie:     { title: 'Pie Chart',    type: 'pie',     size: { w: 5, h: 4 }, config: { dataKey: 'product', showLegend: true } },
  table:   { title: 'Table',        type: 'table',   size: { w: 6, h: 4 }, config: { columns: ['firstName', 'product', 'totalAmount', 'status'], sortBy: '', pagination: 10, fontSize: 14, headerBg: '#54bd95' } },
  kpi:     { title: 'KPI Value',    type: 'kpi',     size: { w: 3, h: 2 }, config: { metric: 'totalAmount', aggregation: 'sum', dataFormat: 'currency', decimalPrecision: 2 } },
};

export const WIDGET_CATEGORIES = [
  { label: 'Charts', items: [
    { type: 'bar', label: 'Bar Chart' },
    { type: 'line', label: 'Line Chart' },
    { type: 'pie', label: 'Pie Chart' },
    { type: 'area', label: 'Area Chart' },
    { type: 'scatter', label: 'Scatter Plot' },
  ]},
  { label: 'Tables', items: [{ type: 'table', label: 'Table' }] },
  { label: 'KPIs', items: [{ type: 'kpi', label: 'KPI Value' }] },
];