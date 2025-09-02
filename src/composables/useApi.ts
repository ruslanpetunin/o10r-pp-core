import type { Api, ApiResponse } from '../types/api';
import type { PaymentStatusData, SavedCard, SessionData, TranslationData } from '../types/data'
import type { Language } from '../types/translator';
import useHttp from './useHttp';
import { HttpMethod } from "./../types/http";

export default function(host: string): Api {
  const { request } = useHttp();

  async function getSession(sid: string): Promise<SessionData> {
    return request<ApiResponse<SessionData>>(`${host}/v1/session?client_secret=${sid}`).then(({ data }) => data);
  }

  async function getTranslations(language: Language): Promise<TranslationData> {
    return request<TranslationData>(`/translations/${language}.json`);
  }

  async function getPaymentStatus(sid: string): Promise<PaymentStatusData> {
    return request<ApiResponse<PaymentStatusData>>(`${host}/v1/status?client_secret=${sid}`)
      .then(
        ({ data }) => {
          data.status = data.payment.status;

          return data;
        }
      );
  }

  async function removeSavedCard(sid: string, cardId: number): Promise<void> {
    console.log(`Removing saved card with ID ${cardId} via sid: ${sid}`);

    return new Promise((resolve) => setTimeout(resolve, 1000));
  }

  async function getSavedCards(sid: string): Promise<SavedCard[]> {
    console.log(`Getting saved cards via sid: ${sid}`);

    return await new Promise(
      (resolve) => {
        setTimeout(
          () => resolve([
            {
              id: 1,
              last_four_digits: '4211',
              type: 'visa',
              expiry_month: '11',
              expiry_year: '25'
            },
            {
              id: 2,
              last_four_digits: '1233',
              type: 'mastercard',
              expiry_month: '09',
              expiry_year: '26'
            },
            {
              id: 3,
              last_four_digits: '3781',
              type: 'visa',
              expiry_month: '01',
              expiry_year: '25'
            },
          ]),
          5000
        )
      }
    );
  }

  async function pay(sid: string, paymentMethodCode: string, data: Record<string, unknown>): Promise<void> {
    await request(
      `${host}/v1/session/confirm?client_secret=${sid}`,
      HttpMethod.POST,
      {
        body: {
          methodCode: paymentMethodCode,
          fields: data
        }
      }
    );
  }

  async function clarify(sid: string, data: Record<string, unknown>): Promise<void> {
    await request(
      `${host}/v1/clarification?client_secret=${sid}`,
      HttpMethod.POST,
      {
        body: {
          fields: data
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
