export interface ResourceClouldinary {
  asset_id: string;
  public_id: string;
  format: string;
  version: number;
  resource_type: string;
  type: string;
  created_at: Date;
  bytes: number;
  width: number;
  height: number;
  folder: string;
  url: string;
  secure_url: string;
}

export interface ListResourceClouldinary {
  resources: ResourceClouldinary[];
}
