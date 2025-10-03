import type { Field } from "./../types/data";
import { options } from "./useBillingFields";

export default function(allowedCountries?: string[]): Field[] {
  const filteredOptions = allowedCountries
    ? options.filter(option => allowedCountries.includes(option.value))
    : options;

  return [
    { name: 'shipping_full_name', type: 'text', validation: { required: [], cardholder: [] } },
    { name: 'shipping_country', type: 'select', options: filteredOptions, validation: { required: [] } },
    { name: 'shipping_address_line_1', type: 'text', validation: { required: [] } },
    { name: 'shipping_address_line_2', type: 'text', validation: { required: [] } },
    { name: 'shipping_postal_code', type: 'text', validation: { required: [] } },
    { name: 'shipping_city', type: 'text', validation: { required: [] } },
  ]
}
