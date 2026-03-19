import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const COUNTRIES = ['United States', 'Canada', 'Australia', 'Singapore', 'Hong Kong'];
const PRODUCTS = [
  'Fiber Internet 300 Mbps', '5G Unlimited Mobile Plan',
  'Fiber Internet 1 Gbps', 'Business Internet 500 Mbps', 'VoIP Corporate Package',
];
const STATUSES = ['Pending', 'In progress', 'Completed'];
const AGENTS = ['Mr. Michael Harris', 'Mr. Ryan Cooper', 'Ms. Olivia Carter', 'Mr. Lucas Martin'];

const UNIT_PRICES = {
  'Fiber Internet 300 Mbps': 49.99,
  '5G Unlimited Mobile Plan': 39.99,
  'Fiber Internet 1 Gbps': 89.99,
  'Business Internet 500 Mbps': 129.99,
  'VoIP Corporate Package': 199.99,
};

export default function OrderForm({ onSubmit, onClose, defaultValues }) {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    defaultValues: defaultValues || { quantity: 1, status: 'Pending' },
  });

  const product = watch('product');
  const quantity = watch('quantity');

  useEffect(() => {
    if (product) setValue('unitPrice', UNIT_PRICES[product] || 0);
  }, [product, setValue]);

  const unitPrice = UNIT_PRICES[product] || 0;
  const total = (unitPrice * (Number(quantity) || 0)).toFixed(2);

  // This wraps onSubmit to coerce number fields
  const handleFormSubmit = (data) => {
    const cleaned = {
      ...data,
      quantity: Number(data.quantity),
      unitPrice: UNIT_PRICES[data.product] || 0,
    };
    onSubmit(cleaned);
  };

  const field = (name) => ({
    ...register(name, { required: 'Please fill the field' }),
  });

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">{defaultValues ? 'Edit Order' : 'Create Order'}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="p-6 space-y-6">
          {/* Customer Info */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">Customer Information</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                ['firstName', 'First Name'], ['lastName', 'Last Name'],
                ['email', 'Email'], ['phone', 'Phone'],
                ['city', 'City'], ['state', 'State'],
                ['postalCode', 'Postal Code'],
              ].map(([name, label]) => (
                <div key={name}>
                  <label className="block text-sm text-gray-600 mb-1">{label}</label>
                  <input
                    {...field(name)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  />
                  {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name].message}</p>}
                </div>
              ))}
              <div className="col-span-2">
                <label className="block text-sm text-gray-600 mb-1">Street Address</label>
                <input
                  {...field('streetAddress')}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
                {errors.streetAddress && <p className="text-red-500 text-xs mt-1">{errors.streetAddress.message}</p>}
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Country</label>
                <select {...field('country')} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400">
                  <option value="">Select country</option>
                  {COUNTRIES.map((c) => <option key={c}>{c}</option>)}
                </select>
                {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country.message}</p>}
              </div>
            </div>
          </div>

          {/* Order Info */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">Order Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-sm text-gray-600 mb-1">Product</label>
                <select {...field('product')} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400">
                  <option value="">Select product</option>
                  {PRODUCTS.map((p) => <option key={p}>{p}</option>)}
                </select>
                {errors.product && <p className="text-red-500 text-xs mt-1">{errors.product.message}</p>}
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Quantity</label>
                <input
                  type="number" min="1"
                  {...register('quantity', {
                    required: 'Please fill the field',
                    min: { value: 1, message: 'Quantity cannot be less than 1' },
                  })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
                {errors.quantity && <p className="text-red-500 text-xs mt-1">{errors.quantity.message}</p>}
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Unit Price</label>
                <input
                  readOnly value={`$${unitPrice.toFixed(2)}`}
                  className="w-full border border-gray-200 bg-gray-50 rounded-lg px-3 py-2 text-sm text-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Total Amount</label>
                <input
                  readOnly value={`$${total}`}
                  className="w-full border border-gray-200 bg-gray-50 rounded-lg px-3 py-2 text-sm text-gray-500 font-semibold"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Status</label>
                <select {...register('status')} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400">
                  {STATUSES.map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>

              <div className="col-span-2">
                <label className="block text-sm text-gray-600 mb-1">Created By</label>
                <select {...field('createdBy')} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400">
                  <option value="">Select agent</option>
                  {AGENTS.map((a) => <option key={a}>{a}</option>)}
                </select>
                {errors.createdBy && <p className="text-red-500 text-xs mt-1">{errors.createdBy.message}</p>}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="px-5 py-2 text-sm rounded-lg border border-gray-300 hover:bg-gray-50">
              Cancel
            </button>
            <button type="submit" className="px-5 py-2 text-sm rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 font-medium">
              {defaultValues ? 'Update Order' : 'Create Order'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}