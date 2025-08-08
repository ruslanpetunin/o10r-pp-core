import type { InitData } from '../types/data';

function isInitData(data: unknown): data is InitData {
  if (typeof data === 'object' && data !== null) {
    const record = data as Record<string, unknown>;

    return (
      typeof record.amount === 'number' &&
      typeof record.currency === 'string' &&
      typeof record.payment_id === 'string' &&
      typeof record.project_hash === 'string' &&
      ['boolean', 'undefined'].includes(typeof record.has_saved_cards) &&
      ['string', 'undefined'].includes(typeof record.payment_desc)
    );
  }

  return false;
}

export default function(token: string): InitData {
  const parts = token.split('.');

  if (parts.length === 3) {
    const base64Payload = parts[1];
    const jsonPayload = atob(base64Payload);
    const payload: unknown = JSON.parse(jsonPayload);

    if (!isInitData(payload)) {
      throw new Error('Invalid payload structure. Expected InitData.');
    }

    return payload;
  } else {
    throw new Error('Invalid token format. Expected 3 parts separated by dots.');
  }
}
