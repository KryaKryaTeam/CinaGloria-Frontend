import { action, observable } from "mobx";
import { act } from "react";
import { th } from "zod/locales";

type Pos = 0 | 1;
class AuthFormStore {
    @observable pos: Pos = 0;
    constructor(){}

    @action nextPos() {
        this.pos = this.pos === 0 ? 1 : 0;
    }

}

const authFormStore = new AuthFormStore()
export default authFormStore;