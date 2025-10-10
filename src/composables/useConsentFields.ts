import type { ConsentField, Field } from './../types/data'

export default function(consentFields: ConsentField[]): Field[] {
  return consentFields.map(consentField => ({
    name: consentField.key,
    label: consentField.text,
    type: 'checkbox',
    validation: { required: [] }
  }));
}
