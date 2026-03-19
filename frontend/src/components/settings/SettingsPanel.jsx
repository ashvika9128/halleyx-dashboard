import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const METRICS = ['totalAmount', 'unitPrice', 'quantity', 'status', 'product', 'createdBy', 'firstName'];
const NUMERIC_METRICS = ['totalAmount', 'unitPrice', 'quantity'];
const AXIS_OPTIONS = ['product', 'quantity', 'unitPrice', 'totalAmount', 'status', 'createdBy'];
const ALL_COLUMNS = ['firstName', 'lastName', 'email', 'phone', 'product', 'quantity', 'unitPrice', 'totalAmount', 'status', 'createdBy', 'createdAt'];

export default function SettingsPanel({ widget, onClose, onSave }) {
  const [form, setForm] = useState({ ...widget });

  useEffect(() => { setForm({ ...widget }); }, [widget]);

  const set = (key, val) => setForm((f) => ({ ...f, config: { ...f.config, [key]: val } }));
  const setTop = (key, val) => setForm((f) => ({ ...f, [key]: val }));
  const setSize = (key, val) => setForm((f) => ({ ...f, size: { ...f.size, [key]: Math.max(1, Number(val)) } }));

  const { type, title, config, size } = form;
  const isChart = ['bar', 'line', 'area', 'scatter'].includes(type);

  return (
    <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-2xl border-l border-gray-200 z-50 flex flex-col">
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <h3 className="font-semibold text-gray-800">Widget Settings</h3>
        <button onClick={onClose}><X size={18} className="text-gray-400" /></button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Basic */}
        <div>
          <label className="block text-xs text-gray-500 mb-1">Widget Title</label>
          <input value={title} onChange={(e) => setTop('title', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">Widget Type</label>
          <input readOnly value={type}
            className="w-full border border-gray-200 bg-gray-50 rounded-lg px-3 py-2 text-sm text-gray-400" />
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">Description</label>
          <textarea value={config.description || ''} onChange={(e) => set('description', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" rows={2} />
        </div>

        {/* Size */}
        <div className="border-t pt-3">
          <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Widget Size</p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Width (cols)</label>
              <input type="number" min="1" max="12" value={size.w} onChange={(e) => setSize('w', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Height (rows)</label>
              <input type="number" min="1" value={size.h} onChange={(e) => setSize('h', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
            </div>
          </div>
        </div>

        {/* KPI settings */}
        {type === 'kpi' && (
          <div className="border-t pt-3 space-y-3">
            <p className="text-xs font-semibold text-gray-500 uppercase">Data Settings</p>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Select Metric</label>
              <select value={config.metric} onChange={(e) => set('metric', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
                {METRICS.map((m) => <option key={m}>{m}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Aggregation</label>
              <select value={config.aggregation}
                disabled={!NUMERIC_METRICS.includes(config.metric)}
                onChange={(e) => set('aggregation', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm disabled:opacity-40">
                {['sum', 'average', 'count'].map((a) => <option key={a}>{a}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Data Format</label>
              <select value={config.dataFormat} onChange={(e) => set('dataFormat', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
                <option value="number">Number</option>
                <option value="currency">Currency</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Decimal Precision</label>
              <input type="number" min="0" value={config.decimalPrecision}
                onChange={(e) => set('decimalPrecision', Math.max(0, Number(e.target.value)))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
            </div>
          </div>
        )}

        {/* Chart settings */}
        {isChart && (
          <div className="border-t pt-3 space-y-3">
            <p className="text-xs font-semibold text-gray-500 uppercase">Data Settings</p>
            <div>
              <label className="block text-xs text-gray-500 mb-1">X Axis</label>
              <select value={config.xAxis} onChange={(e) => set('xAxis', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
                {AXIS_OPTIONS.map((o) => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Y Axis</label>
              <select value={config.yAxis} onChange={(e) => set('yAxis', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
                {AXIS_OPTIONS.map((o) => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Chart Color</label>
              <div className="flex gap-2">
                <input type="color" value={config.color}
                  onChange={(e) => set('color', e.target.value)}
                  className="w-10 h-9 rounded border border-gray-300 cursor-pointer" />
                <input value={config.color} onChange={(e) => set('color', e.target.value)}
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm font-mono" />
              </div>
            </div>
            <label className="flex items-center gap-2 text-sm text-gray-600">
              <input type="checkbox" checked={config.showDataLabel}
                onChange={(e) => set('showDataLabel', e.target.checked)} />
              Show data labels
            </label>
          </div>
        )}

        {/* Pie settings */}
        {type === 'pie' && (
          <div className="border-t pt-3 space-y-3">
            <p className="text-xs font-semibold text-gray-500 uppercase">Data Settings</p>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Chart Data</label>
              <select value={config.dataKey} onChange={(e) => set('dataKey', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
                {AXIS_OPTIONS.map((o) => <option key={o}>{o}</option>)}
              </select>
            </div>
            <label className="flex items-center gap-2 text-sm text-gray-600">
              <input type="checkbox" checked={config.showLegend}
                onChange={(e) => set('showLegend', e.target.checked)} />
              Show legend
            </label>
          </div>
        )}

        {/* Table settings */}
        {type === 'table' && (
          <div className="border-t pt-3 space-y-3">
            <p className="text-xs font-semibold text-gray-500 uppercase">Data Settings</p>
            <div>
              <label className="block text-xs text-gray-500 mb-2">Columns</label>
              <div className="space-y-1 max-h-40 overflow-y-auto">
                {ALL_COLUMNS.map((col) => (
                  <label key={col} className="flex items-center gap-2 text-sm text-gray-600">
                    <input type="checkbox"
                      checked={config.columns?.includes(col)}
                      onChange={(e) => {
                        const cols = config.columns || [];
                        set('columns', e.target.checked ? [...cols, col] : cols.filter((c) => c !== col));
                      }} />
                    {col}
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Sort By</label>
              <select value={config.sortBy} onChange={(e) => set('sortBy', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
                <option value="">None</option>
                <option>Ascending</option>
                <option>Descending</option>
                <option>Order date</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Rows per page</label>
              <select value={config.pagination} onChange={(e) => set('pagination', Number(e.target.value))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
                {[5, 10, 15].map((n) => <option key={n}>{n}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Font Size</label>
              <input type="number" min="12" max="18" value={config.fontSize}
                onChange={(e) => set('fontSize', Number(e.target.value))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Header Background</label>
              <div className="flex gap-2">
                <input type="color" value={config.headerBg}
                  onChange={(e) => set('headerBg', e.target.value)}
                  className="w-10 h-9 rounded border border-gray-300 cursor-pointer" />
                <input value={config.headerBg} onChange={(e) => set('headerBg', e.target.value)}
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm font-mono" />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t flex gap-3">
        <button onClick={onClose}
          className="flex-1 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
          Cancel
        </button>
        <button onClick={() => onSave(form)}
          className="flex-1 py-2 text-sm bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 font-medium">
          Apply
        </button>
      </div>
    </div>
  );
}