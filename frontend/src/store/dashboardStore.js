import { create } from 'zustand';

const useDashboardStore = create((set, get) => ({
  widgets: [],
  layouts: { lg: [], md: [], sm: [] },
  dateRange: 'all',
  setWidgets: (widgets) => set({ widgets }),
  setLayouts: (layouts) => set({ layouts }),
  setDateRange: (dateRange) => set({ dateRange }),
  addWidget: (widget) => set((state) => ({ widgets: [...state.widgets, widget] })),
  removeWidget: (id) => set((state) => ({
    widgets: state.widgets.filter((w) => w.i !== id),
    layouts: {
      lg: state.layouts.lg.filter((l) => l.i !== id),
      md: state.layouts.md.filter((l) => l.i !== id),
      sm: state.layouts.sm.filter((l) => l.i !== id),
    },
  })),
  updateWidgetConfig: (id, updated) => set((state) => ({
    widgets: state.widgets.map((w) => w.i === id ? { ...w, ...updated } : w),
  })),
}));

export default useDashboardStore;