export interface ProjectSettingsData {
  methods: PaymentMethodData[];
}

export interface InitData {
  amount: number;
  currency: string;
  project_hash: string;
}

export type TranslationData = Record<string, string>;

export interface PaymentMethodData {
  code: string,
  icon: string,
  fields: PaymentMethodField[]
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
    | 'number'
    | 'text'
    | 'email'
    | 'tel'
    | 'password';
}

export interface PaymentMethodFieldSelect extends PaymentMethodFieldBase {
  type: 'select';
  options: PaymentMethodFieldOption[];
}

export interface PaymentMethodFieldCheckbox extends PaymentMethodFieldBase {
  type: 'checkbox';
}

export type PaymentMethodField =
  | PaymentMethodFieldText
  | PaymentMethodFieldSelect
  | PaymentMethodFieldCheckbox;
