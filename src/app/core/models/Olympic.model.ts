import { Participation } from "./Participation.model";

export interface Olympic {
  id?: number,
  country?: string,
  participations?: Participation[]
}
