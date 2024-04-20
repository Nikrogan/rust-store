import { buildModalStore } from "@/pageComponents/Modal/state";

export const {
    store,
    events: { close, open}
} = buildModalStore('balance')
