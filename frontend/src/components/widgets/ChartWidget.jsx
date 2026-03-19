import {
  BarChart, Bar, LineChart, Line, AreaChart, Area,
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, LabelList,
} from 'recharts';
import { buildChartData } from '../../utils/aggregations';

export default function ChartWidget({ type, config, orders }) {
  const { xAxis, yAxis, color, showDataLabel } = config;
  const data = buildChartData(orders, xAxis, yAxis);
  const c = color || '#54bd95';
  const commonProps = { data, margin: { top: 10, right: 10, left: 0, bottom: 40 } };
  const Xax = <XAxis dataKey="name" tick={{ fontSize: 10 }} angle={-30} textAnchor="end" />;
  const Yax = <YAxis tick={{ fontSize: 10 }} />;
  const Grid = <CartesianGrid strokeDasharray="3 3" />;
  const Tip = <Tooltip />;
  const label = showDataLabel ? <LabelList dataKey="value" position="top" style={{ fontSize: 10 }} /> : null;

  return (
    <div className="h-full w-full p-2">
      <ResponsiveContainer width="100%" height="100%">
        {type === 'bar' ? (
          <BarChart {...commonProps}>{Grid}{Xax}{Yax}{Tip}<Bar dataKey="value" fill={c}>{label}</Bar></BarChart>
        ) : type === 'line' ? (
          <LineChart {...commonProps}>{Grid}{Xax}{Yax}{Tip}<Line type="monotone" dataKey="value" stroke={c} dot={false}>{label}</Line></LineChart>
        ) : type === 'area' ? (
          <AreaChart {...commonProps}>{Grid}{Xax}{Yax}{Tip}<Area type="monotone" dataKey="value" stroke={c} fill={c} fillOpacity={0.2}>{label}</Area></AreaChart>
        ) : (
          <ScatterChart {...commonProps}>{Grid}{Xax}{Yax}{Tip}<Scatter dataKey="value" fill={c} /></ScatterChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}