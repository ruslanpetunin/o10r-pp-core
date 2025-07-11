export interface ProjectSettingsData {
  methods: PaymentMethodData[];
}

export interface InitData {
  amount: number;
  currency: string;
  project_hash: string;
}

export interface PaymentMethodData {
  code: string,
  icon: string,
  fields: PaymentMethodField[]
}

export enum PaymentMethodFieldType {
  NUMBER = 'number',
  TEXT = 'text',
  EMAIL = 'email',
  TEL = 'tel',
  PASSWORD = 'password',
  SELECT = 'select',
  CHECKBOX = 'checkbox',
}

export interface PaymentMethodFieldValidator {
  name: string,
  options?: Record<string, unknown>,
}

export interface PaymentMethodFieldOption {
  label: string;
  value: string;
}

export interface PaymentMethodFieldBase {
  name: string,
  autocomplete?: string,
  validators: PaymentMethodFieldValidator[],
}

export interface PaymentMethodFieldText extends PaymentMethodFieldBase {
  type:
    | PaymentMethodFieldType.NUMBER
    | PaymentMethodFieldType.TEXT
    | PaymentMethodFieldType.EMAIL
    | PaymentMethodFieldType.TEL
    | PaymentMethodFieldType.PASSWORD;
}

export interface PaymentMethodFieldSelect extends PaymentMethodFieldBase {
  type: PaymentMethodFieldType.SELECT;
  options: PaymentMethodFieldOption[];
}

export interface PaymentMethodFieldCheckbox extends PaymentMethodFieldBase {
  type: PaymentMethodFieldType.CHECKBOX;
}

export type PaymentMethodField =
  | PaymentMethodFieldText
  | PaymentMethodFieldSelect
  | PaymentMethodFieldCheckbox;
