const { z } = require('zod');

const orderValidator = z.object({
  firstName:     z.string().min(1, 'Please fill the field'),
  lastName:      z.string().min(1, 'Please fill the field'),
  email:         z.string().min(1, 'Please fill the field').email('Invalid email'),
  phone:         z.string().min(1, 'Please fill the field'),
  streetAddress: z.string().min(1, 'Please fill the field'),
  city:          z.string().min(1, 'Please fill the field'),
  state:         z.string().min(1, 'Please fill the field'),
  postalCode:    z.string().min(1, 'Please fill the field'),
  country: z.enum(
    ['United States', 'Canada', 'Australia', 'Singapore', 'Hong Kong'],
    { errorMap: () => ({ message: 'Please fill the field' }) }
  ),
  product: z.enum(
    [
      'Fiber Internet 300 Mbps',
      '5G Unlimited Mobile Plan',
      'Fiber Internet 1 Gbps',
      'Business Internet 500 Mbps',
      'VoIP Corporate Package',
    ],
    { errorMap: () => ({ message: 'Please fill the field' }) }
  ),
  quantity:  z.number().min(1, 'Quantity cannot be less than 1'),
  unitPrice: z.number().min(0, 'Unit price cannot be negative'),
  status: z.enum(['Pending', 'In progress', 'Completed']).default('Pending'),
  createdBy: z.enum([
    'Mr. Michael Harris',
    'Mr. Ryan Cooper',
    'Ms. Olivia Carter',
    'Mr. Lucas Martin',
  ], { errorMap: () => ({ message: 'Please fill the field' }) }),
});

module.exports = orderValidator;