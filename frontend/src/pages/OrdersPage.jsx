import { useState, useRef } from 'react';
import { useOrders, useCreateOrder, useUpdateOrder, useDeleteOrder } from '../hooks/useOrders';
import OrderForm from '../components/orders/OrderForm';
import ConfirmDialog from '../components/ui/ConfirmDialog';

const STATUS_COLORS = {
  'Pending': 'bg-yellow-100 text-yellow-700',
  'In progress': 'bg-blue-100 text-blue-700',
  'Completed': 'bg-green-100 text-green-700',
};

export default function OrdersPage() {
  const { data: orders = [], isLoading } = useOrders();
  const createOrder = useCreateOrder();
  const updateOrder = useUpdateOrder();
  const deleteOrder = useDeleteOrder();

  const [showForm, setShowForm] = useState(false);
  const [editOrder, setEditOrder] = useState(null);
  const [confirmId, setConfirmId] = useState(null);
  const [contextMenu, setContextMenu] = useState(null);

  const handleSubmit = async (data) => {
    try {
      if (editOrder) {
        await updateOrder.mutateAsync({ id: editOrder._id, ...data });
      } else {
        await createOrder.mutateAsync(data);
      }
      setShowForm(false);
      setEditOrder(null);
    } catch (err) {
      alert(JSON.stringify(err.response?.data || err.message));
    }
  };

  const handleContextMenu = (e, order) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY, order });
  };

  const closeContext = () => setContextMenu(null);

  if (isLoading) return <div className="p-8 text-gray-400">Loading orders...</div>;

  return (
    <div onClick={closeContext}>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Customer Orders</h1>
        <button
          onClick={() => { setEditOrder(null); setShowForm(true); }}
          className="bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-600"
        >
          + New Order
        </button>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-20 text-gray-400">No orders yet. Create your first one!</div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
              <tr>
                {['Name', 'Email', 'Product', 'Qty', 'Total', 'Status', 'Agent'].map((h) => (
                  <th key={h} className="px-4 py-3 text-left font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {orders.map((order) => (
                <tr
                  key={order._id}
                  onContextMenu={(e) => handleContextMenu(e, order)}
                  className="hover:bg-gray-50 cursor-context-menu"
                >
                  <td className="px-4 py-3 font-medium">{order.firstName} {order.lastName}</td>
                  <td className="px-4 py-3 text-gray-500">{order.email}</td>
                  <td className="px-4 py-3">{order.product}</td>
                  <td className="px-4 py-3">{order.quantity}</td>
                  <td className="px-4 py-3 font-medium">${order.totalAmount?.toFixed(2)}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[order.status]}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500">{order.createdBy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {contextMenu && (
        <div
          style={{ top: contextMenu.y, left: contextMenu.x }}
          className="fixed z-50 bg-white border border-gray-200 rounded-lg shadow-lg py-1 w-36"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
            onClick={() => { setEditOrder(contextMenu.order); setShowForm(true); closeContext(); }}
          >
            Edit
          </button>
          <button
            className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50"
            onClick={() => { setConfirmId(contextMenu.order._id); closeContext(); }}
          >
            Delete
          </button>
        </div>
      )}

      {showForm && (
        <OrderForm
          onSubmit={handleSubmit}
          onClose={() => { setShowForm(false); setEditOrder(null); }}
          defaultValues={editOrder}
        />
      )}

      {confirmId && (
        <ConfirmDialog
          message="Are you sure you want to delete this order?"
          onConfirm={() => { deleteOrder.mutate(confirmId); setConfirmId(null); }}
          onCancel={() => setConfirmId(null)}
        />
      )}
    </div>
  );
}