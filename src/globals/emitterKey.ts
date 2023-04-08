import { Emitter } from "mitt";
import { InjectionKey } from "vue";
import { Events } from "../types/Events";

export const emitterKey: InjectionKey<Emitter<Events>> = Symbol();
