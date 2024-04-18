import { createEvent, createStore, sample } from "effector";

export const buildModalStore =  (name) => {
    const store = createStore({
        isOpen: false
    }) 

    const open = createEvent(`${name}-modal-open`);
    const close = createEvent(`${name}-modal-close`);


    {
        sample({
            clock: open,
            fn: () => ({
                isOpen: true

            }),
            target: store
        })

        sample({
            clock: close,
            fn: () => ({
                isOpen: false

            }),
            target: store
        })
    }

    return {
        store,
        events: {
            open, 
            close
        }
    }
}