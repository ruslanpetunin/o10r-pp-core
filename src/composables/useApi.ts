import type { Api } from '../types/api';
import type { PaymentStatusData, ProjectSettingsData, TranslationData } from '../types/data';
import { PaymentStatus } from '../types/data';
import type { Language } from '../types/translator';
import useHttp from './useHttp';

export default function(host: string): Api {
  const { request } = useHttp();

  async function getProjectSettings(projectHash: string): Promise<ProjectSettingsData> {
    return request<ProjectSettingsData>(`${host}/project/settings/${projectHash}.json`);
  }

  async function getTranslations(language: Language): Promise<TranslationData> {
    return request<TranslationData>(`${host}/translations/${language}.json`);
  }

  let attempts = 0;
  async function getPaymentStatus(token: string): Promise<PaymentStatusData> {
    console.log(`Getting payment status via token: ${token}`);

    attempts += 1;

    const kindaRequest = new Promise<PaymentStatusData>(
      (resolve) => {
        setTimeout(() => {
          if (attempts === 1) {
            resolve({
              status: PaymentStatus.NOT_STARTED,
            });
          } else if (attempts < 5) {
            resolve({
              status: PaymentStatus.PENDING,
              payment_method_code: 'card'
            });
          }

          resolve({
            status: PaymentStatus.SUCCESS,
            payment_method_code: 'card'
          });
        }, 1000);
      }
    );

    return await kindaRequest;
  }

  async function pay(token: string, data: Record<string, unknown>): Promise<void> {
    console.log(`Pay request is not implemented yet. Token: ${token}, Data:`, data);
  }

  return {
    getProjectSettings,
    getTranslations,
    getPaymentStatus,
    pay
  }
}
