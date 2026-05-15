import type {
  RelationSlotCategory,
  ReletionSlotsType,
  RelationSlotValues,
} from "@/core/requests/network/File/FileTypes";
import { action, makeObservable, observable } from "mobx";

export default class FileStore {
  @observable private urls: Record<
    RelationSlotCategory,
    Partial<Record<ReletionSlotsType, string>>
  > = {
    user: {},
    competition: {},
    team: {},
  };

  constructor() {
    makeObservable(this);
  }

  @action
  addUrl(url: string, slot: RelationSlotValues) {
    const [category, slotKey] = slot.split(":") as [
      RelationSlotCategory,
      ReletionSlotsType,
    ];
    this.urls[category][slotKey] = url;
  }

  @action
  clear() {
    this.urls = {
      user: {},
      competition: {},
      team: {},
    };
  }
}
