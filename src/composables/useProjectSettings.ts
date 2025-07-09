import type { PaymentMethodFactory, ProjectSettings } from './../types/project'
import type { Api } from './../types/api';
import type { InitData } from './../types/data';

export default async function(api: Api, initData: InitData, paymentMethodFactory: PaymentMethodFactory): Promise<ProjectSettings> {
  const projectSettings = await api.getProjectSettings(initData.project_hash);
  const methods = await paymentMethodFactory(initData, projectSettings);

  return { ...projectSettings, methods };
}
