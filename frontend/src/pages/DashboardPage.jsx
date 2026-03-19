import { useNavigate } from 'react-router-dom';
import GridLayout from 'react-grid-layout';
import { useOrders } from '../hooks/useOrders';
import { useDashboard } from '../hooks/useDashboard';
import { filterByDateRange } from '../utils/dateFilter';
import WidgetWrapper from '../components/widgets/WidgetWrapper';
import { useState } from 'react';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

export default function DashboardPage() {
  const navigate = useNavigate();
  const { data: orders = [] } = useOrders();
  const { data: dashboard, isLoading } = useDashboard();
  const [dateRange, setDateRange] = useState('all');

  const filteredOrders = filterByDateRange(orders, dateRange);
  const widgets = dashboard?.widgets || [];
  const layout = dashboard?.layouts?.lg || [];

  if (isLoading) return <div className="p-8 text-gray-400">Loading dashboard...</div>;

  return (
    <div>
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500">Show data for</span>
          <select value={dateRange} onChange={(e) => setDateRange(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm">
            <option value="all">All time</option>
            <option value="today">Today</option>
            <option value="last7">Last 7 Days</option>
            <option value="last30">Last 30 Days</option>
            <option value="last90">Last 90 Days</option>
          </select>
        </div>
        <button onClick={() => navigate('/dashboard/configure')}
          className="px-4 py-2 text-sm bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 font-medium">
          Configure Dashboard
        </button>
      </div>

      {widgets.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-96 text-gray-400">
          <p className="text-5xl mb-4">📊</p>
          <p className="text-xl font-medium text-gray-600">No widgets configured</p>
          <p className="text-sm mt-2 mb-6">Click Configure Dashboard to get started</p>
          <button onClick={() => navigate('/dashboard/configure')}
            className="px-6 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 text-sm font-medium">
            Configure Dashboard
          </button>
        </div>
      ) : (
        <GridLayout
          className="layout"
          layout={layout}
          cols={12}
          rowHeight={80}
          width={1200}
          isDraggable={false}
          isResizable={false}
        >
          {widgets.map((widget) => (
            <div key={widget.i}>
              <WidgetWrapper
                widget={widget}
                orders={filteredOrders}
                isBuilder={false}
                onSettings={() => {}}
                onDelete={() => {}}
              />
            </div>
          ))}
        </GridLayout>
      )}
    </div>
  );
}