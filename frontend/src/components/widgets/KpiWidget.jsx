import { aggregate, formatValue } from '../../utils/aggregations';

export default function KpiWidget({ config, orders }) {
  const { metric, aggregation, dataFormat, decimalPrecision, description } = config;
  const value = aggregate(orders, metric, aggregation);
  const display = formatValue(value, dataFormat, decimalPrecision);
  return (
    <div className="h-full flex flex-col justify-center items-center p-4 bg-white rounded-xl">
      <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">{description || metric}</p>
      <p className="text-3xl font-bold text-gray-800">{display}</p>
      <p className="text-xs text-gray-400 mt-1 capitalize">{aggregation}</p>
    </div>
  );
}