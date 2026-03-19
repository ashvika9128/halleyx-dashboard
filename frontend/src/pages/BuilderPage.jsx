import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GridLayout from 'react-grid-layout';
import { useOrders } from '../hooks/useOrders';
import { useSaveDashboard } from '../hooks/useDashboard';
import useDashboardStore from '../store/dashboardStore';
import WidgetWrapper from '../components/widgets/WidgetWrapper';
import SettingsPanel from '../components/settings/SettingsPanel';
import { WIDGET_CATEGORIES, WIDGET_DEFAULTS } from '../utils/widgetDefaults';
import { filterByDateRange } from '../utils/dateFilter';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

let widgetCounter = Date.now();

export default function BuilderPage() {
  const navigate = useNavigate();
  const { data: orders = [] } = useOrders();
  const saveDashboard = useSaveDashboard();

  const {
    widgets, layouts, dateRange,
    setLayouts, setDateRange,
    addWidget, removeWidget, updateWidgetConfig,
  } = useDashboardStore();

  const [activeWidget, setActiveWidget] = useState(null);
  const [openCategories, setOpenCategories] = useState({ Charts: true, Tables: true, KPIs: true });
  const [saving, setSaving] = useState(false);

  const filteredOrders = filterByDateRange(orders, dateRange);

  const handleDrop = (type) => {
    const id = `w${widgetCounter++}`;
    const defaults = WIDGET_DEFAULTS[type];
    const newWidget = { i: id, ...defaults, config: { ...defaults.config } };
    const newLayout = { i: id, x: 0, y: Infinity, w: defaults.size.w, h: defaults.size.h };

    addWidget(newWidget);

    const currentLg = layouts.lg || [];
    const currentMd = layouts.md || [];
    const currentSm = layouts.sm || [];

    setLayouts({
      lg: [...currentLg, newLayout],
      md: [...currentMd, { ...newLayout, w: Math.min(newLayout.w, 8) }],
      sm: [...currentSm, { ...newLayout, w: 4 }],
    });
  };

  const handleLayoutChange = (current) => {
    const currentLayouts = useDashboardStore.getState().layouts;
    setLayouts({ ...currentLayouts, lg: current });
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const currentState = useDashboardStore.getState();
      const payload = {
        layouts: currentState.layouts,
        widgets: currentState.widgets,
      };
      console.log('Saving payload:', JSON.stringify(payload, null, 2));
      await saveDashboard.mutateAsync(payload);
      alert('Dashboard saved successfully!');
      navigate('/dashboard');
    } catch (err) {
      console.error('Save failed:', err);
      alert('Save failed: ' + (err.response?.data?.message || err.message));
    } finally {
      setSaving(false);
    }
  };

  const handleSettingsSave = (updated) => {
    updateWidgetConfig(updated.i, updated);
    const currentLayouts = useDashboardStore.getState().layouts;
    setLayouts({
      ...currentLayouts,
      lg: (currentLayouts.lg || []).map((l) =>
        l.i === updated.i ? { ...l, w: updated.size.w, h: updated.size.h } : l
      ),
    });
    setActiveWidget(null);
  };

  const currentLayout = layouts.lg || [];

  return (
    <div className="flex h-[calc(100vh-60px)] overflow-hidden">
      {/* Left sidebar */}
      <div className="w-56 bg-white border-r border-gray-200 overflow-y-auto flex-shrink-0">
        <div className="p-3 border-b">
          <p className="text-xs font-semibold text-gray-500 uppercase">Widgets</p>
        </div>
        {WIDGET_CATEGORIES.map((cat) => (
          <div key={cat.label}>
            <button
              className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              onClick={() => setOpenCategories((p) => ({ ...p, [cat.label]: !p[cat.label] }))}>
              <span>{cat.label}</span>
              <span>{openCategories[cat.label] ? '▾' : '▸'}</span>
            </button>
            {openCategories[cat.label] && cat.items.map((item) => (
              <button key={item.type} onClick={() => handleDrop(item.type)}
                className="w-full text-left px-6 py-2 text-sm text-gray-600 hover:bg-emerald-50 hover:text-emerald-700 border-b border-gray-50">
                + {item.label}
              </button>
            ))}
          </div>
        ))}
      </div>

      {/* Main canvas */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Toolbar */}
        <div className="flex items-center justify-between px-4 py-2 bg-white border-b border-gray-200">
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
          <div className="flex gap-2">
            <button onClick={() => navigate('/dashboard')}
              className="px-4 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
              Cancel
            </button>
            <button onClick={handleSave} disabled={saving}
              className="px-4 py-1.5 text-sm bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 font-medium disabled:opacity-50">
              {saving ? 'Saving...' : 'Save Configuration'}
            </button>
          </div>
        </div>

        {/* Grid canvas */}
        <div className="flex-1 overflow-auto bg-gray-50 p-4">
          {widgets.length === 0 ? (
            <div className="flex items-center justify-center h-full text-gray-400">
              <div className="text-center">
                <p className="text-4xl mb-3">📊</p>
                <p className="text-lg font-medium">Click a widget from the left panel to add it</p>
                <p className="text-sm mt-1">Then drag to rearrange and resize</p>
              </div>
            </div>
          ) : (
            <GridLayout
              className="layout"
              layout={currentLayout}
              cols={12}
              rowHeight={80}
              width={1200}
              onLayoutChange={handleLayoutChange}
              resizeHandles={['se']}
            >
              {widgets.map((widget) => (
                <div key={widget.i}>
                  <WidgetWrapper
                    widget={widget}
                    orders={filteredOrders}
                    isBuilder={true}
                    onSettings={setActiveWidget}
                    onDelete={removeWidget}
                  />
                </div>
              ))}
            </GridLayout>
          )}
        </div>
      </div>

      {/* Settings panel */}
      {activeWidget && (
        <SettingsPanel
          widget={activeWidget}
          onClose={() => setActiveWidget(null)}
          onSave={handleSettingsSave}
        />
      )}
    </div>
  );
}