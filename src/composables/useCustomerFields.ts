import type { Field } from "./../types/data";

export default function (): Field[] {
  return [
    { name: 'customer_email', type: 'email', validation: { required: [] } },
  ]
}
