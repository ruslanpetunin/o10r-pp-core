export interface ProjectSettingsData {
  methods: PaymentMethodData[];
}

export interface InitData {
  amount: number;
  currency: string;
  payment_id: string,
  payment_desc?: string,
  project_hash: string;
  has_saved_cards?: boolean;
}

export type TranslationData = Record<string, string>;

export interface PaymentMethodData {
  code: string,
  icon: string,
  fields: Field[]
}

export interface FieldValidationRules {
  required: [];
  pan: [];
  expiry_month: [];
  expiry_year: [string|undefined];
  cvv: [string|undefined];
  cardholder: [];
}

export interface FieldOption {
  label: string;
  value: string;
}

export interface FieldBase {
  name: string,
  value?: string;
  disabled?: boolean,
  autocomplete?: string,
  validation?: Partial<FieldValidationRules>,
}

export interface FieldText extends FieldBase {
  type:
    | 'number'
    | 'text'
    | 'email'
    | 'tel'
    | 'password';
}

export interface FieldSelect extends FieldBase {
  type: 'select';
  options: FieldOption[];
}

export interface FieldCheckbox extends FieldBase {
  type: 'checkbox';
}

export type Field =
  | FieldText
  | FieldSelect
  | FieldCheckbox;

export type PaymentStatusData =
  | { status: PaymentStatus.NOT_STARTED }
  | { status: PaymentStatus.PENDING } & PaymentStatusInfo
  | { status: PaymentStatus.AWAITING_3DS_RESULT } & PaymentStatusInfo & ThreeDS & Account
  | { status: PaymentStatus.AWAITING_REDIRECT } & PaymentStatusInfo & Redirect
  | { status: PaymentStatus.AWAITING_CLARIFICATION } & PaymentStatusInfo & Clarification
  | { status: PaymentStatus.SUCCESS } & PaymentStatusInfo
  | { status: PaymentStatus.FAILED } & PaymentStatusInfo;

export interface Account {
  account: {
    number: string;
    expiry_month: string;
    expiry_year: string;
    card_holder: string;
  }
}

export interface ThreeDS {
  threeds: { iframe: ThreeDS2Iframe } | { redirect: ThreeDS2Redirect | ThreeDS1, is_cascading?: boolean }
}

export type Clarification = {
  clarification_fields: Field[]
}

export type Redirect = {
  redirect: {
    url: string;
    method: 'GET' | 'POST';
    params?: Record<string, string>;
  }
}

export type ThreeDS1 = {
  url: string;
  params: {
    md: string;
    pa_req: string;
    term_url: string;
  }
}

export type ThreeDS2Iframe = {
  url: string;
  params: {
    threeDSMethodData: string;
    '3DSMethodData': string;
  };
}

export type ThreeDS2Redirect = {
  url: string,
  params: {
    threeDSSessionData: string,
    creq: string,
  }
}

export type PaymentStatusInfo = {
  payment_method_code: string;
}

export enum PaymentStatus {
  NOT_STARTED = 'not found',
  PENDING = 'pending',
  AWAITING_3DS_RESULT = 'awaiting 3ds result',
  AWAITING_REDIRECT = 'awaiting redirect result',
  AWAITING_CLARIFICATION = 'awaiting clarification',
  SUCCESS = 'success',
  FAILED = 'failed',
}

export interface SavedCard {
  id: number;
  type: string;
  last_four_digits: string;
  expiry_month: string;
  expiry_year: string;
}
