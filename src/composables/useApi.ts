import type { Api, ApiResponse, PayFields, FingerprintData } from '../types/api';
import type { PaymentStatusData, SavedCard, SessionData, TranslationData } from '../types/data';
import type { Language } from '../types/translator';
import useHttp from './useHttp';
import { HttpMethod, type HttpMiddleware } from '../types/http';

export default function(host: string, middleware?: HttpMiddleware): Api {
  const { request } = useHttp(middleware);

  async function getSession(sid: string): Promise<SessionData> {
    return request<ApiResponse<SessionData>>(`${host}/v1/session?client_secret=${sid}`).then(({ data }) => data);
  }

  async function getTranslations(language: Language): Promise<TranslationData> {
    return request<TranslationData>(`/translations/${language}.json`);
  }

  async function getPaymentStatus(sid: string): Promise<PaymentStatusData> {
    return request<ApiResponse<PaymentStatusData>>(
      `${host}/v1/gateway?client_secret=${sid}`,
      HttpMethod.POST,
      {
        body: {
          providerCode: 'status'
        }
      }
    )
      .then(
        ({ data }) => {
          data.status = data.payment.status;

          return data;
        }
      );
  }

  async function removeSavedCard(sid: string, cardId: number): Promise<void> {
    return request<void>(
      `${host}/v1/gateway?client_secret=${sid}`,
      HttpMethod.POST,
      {
        body: {
          providerCode: 'saved-account-delete',
          payload: {
            card_id: cardId
          }
        }
      }
    );
  }

  async function getSavedCards(sid: string): Promise<SavedCard[]> {
    return request<ApiResponse<SavedCard[]>>(
      `${host}/v1/gateway?client_secret=${sid}`,
      HttpMethod.POST,
      {
        body: {
          providerCode: 'saved-account'
        }
      }
    )
      .then(({ data }) => data);
  }

  async function pay(sid: string, paymentMethodCode: string, fingerprint: FingerprintData, data: PayFields): Promise<void> {
    await request(
      `${host}/v1/session/confirm?client_secret=${sid}`,
      HttpMethod.POST,
      {
        body: {
          methodCode: paymentMethodCode,
          fields: data,
          fingerprint
        }
      }
    );
  }

  async function clarify(sid: string, data: Record<string, unknown>): Promise<void> {
    await request(
      `${host}/v1/gateway?client_secret=${sid}`,
      HttpMethod.POST,
      {
        body: {
          providerCode: 'clarification',
          payload: {
            fields: data
          }
        }
      }
    );
  }

  return {
    getSession,
    getSavedCards,
    getTranslations,
    getPaymentStatus,
    removeSavedCard,
    pay,
    clarify
  }
}
