import { IOutage } from '../interfaces/IOutage';
import { IOutagePost } from '../interfaces/IOutagePost';
import { ISiteInfo } from '../interfaces/ISiteInfo';


export const filterOutagesByDate = (outages: IOutage[], date: Date): IOutage[] => {
  return [];
}

export const filterOutagesByDeviceId = (outages: IOutage[], siteInfo: ISiteInfo): IOutage[] => {
  return [];
}

export const enhanceOutagesWithDeviceName = (outages: IOutage[], siteInfo: ISiteInfo): IOutagePost[] => {
  return [];
};
