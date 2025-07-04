export interface InitData {
  amount: number;
  currency: string;
  project_hash: string;
}

export interface ProjectSettings {
  methods: Method[];
}

export interface Method {
  code: string,
  icon: string,
}
