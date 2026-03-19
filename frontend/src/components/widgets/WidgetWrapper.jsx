import { useState } from 'react';
import { Settings, Trash2 } from 'lucide-react';
import KpiWidget from './KpiWidget';
import ChartWidget from './ChartWidget';
import PieChartWidget from './PieChartWidget';
import TableWidget from './TableWidget';

const CHART_TYPES = ['bar', 'line', 'area', 'scatter'];

export default function WidgetWrapper({ widget, orders, onSettings, onDelete, isBuilder }) {
  const [hovered, setHovered] = useState(false);
  const { type, title, config } = widget;
  const renderWidget = () => {
    if (type === 'kpi')   return <KpiWidget config={config} orders={orders} />;
    if (type === 'pie')   return <PieChartWidget config={config} orders={orders} />;
    if (type === 'table') return <TableWidget config={config} orders={orders} />;
    if (CHART_TYPES.includes(type)) return <ChartWidget type={type} config={config} orders={orders} />;
    return null;
  };
  return (
    <div className="h-full flex flex-col bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden"
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100">
        <span className="text-sm font-medium text-gray-700 truncate">{title}</span>
        {isBuilder && hovered && (
          <div className="flex gap-1 ml-2">
            <button onClick={() => onSettings(widget)} className="p-1 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-600"><Settings size={14} /></button>
            <button onClick={() => onDelete(widget.i)} className="p-1 rounded hover:bg-red-50 text-gray-400 hover:text-red-500"><Trash2 size={14} /></button>
          </div>
        )}
      </div>
      <div className="flex-1 overflow-hidden">{renderWidget()}</div>
    </div>
  );
}
