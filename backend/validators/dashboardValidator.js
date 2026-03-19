const { z } = require('zod');

const dashboardValidator = z.object({
  layouts: z.object({
    lg: z.array(z.any()).default([]),
    md: z.array(z.any()).default([]),
    sm: z.array(z.any()).default([]),
  }),
  widgets: z.array(
    z.object({
      i:      z.string(),
      type:   z.string(),
      title:  z.string().default('Untitled'),
      config: z.any().default({}),
      size:   z.object({
        w: z.number().min(1),
        h: z.number().min(1),
      }).default({ w: 4, h: 4 }),
    })
  ).default([]),
});

module.exports = dashboardValidator;