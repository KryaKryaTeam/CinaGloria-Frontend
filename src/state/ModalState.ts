import { injectable } from "inversify";
import { makeAutoObservable } from "mobx";

@injectable()
export class ModalState {
  isOpen: boolean = false;
  selectedProfileId: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  openProfileModal(profileId: string) {
    this.selectedProfileId = profileId;
    this.isOpen = true;
  }

  closeModal() {
    this.isOpen = false;
    this.selectedProfileId = null;
  }
}
