import dayjs from 'dayjs'
import { z } from 'zod'

export const yearParamsSchema = z.object({
  year: z.coerce.number().int().max(dayjs().year()).min(2017),
})
