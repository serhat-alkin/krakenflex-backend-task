export interface IDevice {
  id: string;
  name: string;
}

export interface ISiteInfo {
  id: string;
  name: string;
  devices: IDevice[];
}

