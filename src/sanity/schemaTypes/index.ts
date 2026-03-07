
import { type SchemaTypeDefinition } from 'sanity'
import product from './products'
import orders from './order'
import shipping_form from './shipping_form'
import review from './review'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, orders, shipping_form, review],
}
