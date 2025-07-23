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

export interface PaymentMethodFieldValidationRules {
  required: [];
  pan: [];
  expiry_month: [];
  expiry_year: [string|undefined];
  cvv: [string|undefined];
  cardholder: [];
}

export interface PaymentMethodFieldOption {
  label: string;
  value: string;
}

export interface PaymentMethodFieldBase {
  name: string,
  autocomplete?: string,
  validation?: Partial<PaymentMethodFieldValidationRules>,
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

export type PaymentStatusData =
  | { status: PaymentStatus.NOT_STARTED }
  | { status: PaymentStatus.PENDING } & PaymentStatusInfo
  | { status: PaymentStatus.SUCCESS } & PaymentStatusInfo
  | { status: PaymentStatus.FAILED } & PaymentStatusInfo;

export type PaymentStatusInfo = {
  payment_method_code: string;
}

export enum PaymentStatus {
  NOT_STARTED = 'not found',
  PENDING = 'pending',
  SUCCESS = 'success',
  FAILED = 'failed',
}
