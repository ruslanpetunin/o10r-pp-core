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
}

export interface PaymentMethodFieldValidator {
  name: string,
  options?: Record<string, unknown>,
}

export type PaymentMethodField = PaymentMethodFieldBase;

export interface PaymentMethodFieldBase {
  name: string,
  type: PaymentMethodFieldType,
  autocomplete?: string,
  validators: PaymentMethodFieldValidator[],
}
