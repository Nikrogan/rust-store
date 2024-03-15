import { api } from "@/config/api";
import { createEffect, createEvent, createStore, sample } from "effector";


const tableHead = {
    head: [
        "Проверяющий",
        "Стим ИД игрока",
        "Дискорд ИД Игрока",
        "Результат проверки",
        "Дата проверки",
        "Комментарии",
    ]
}

export const $playerCheck = createStore(tableHead);

export const getPlayersCheckEvent = createEvent();
export const getPlayersCheckEffect = createEffect(() => {
    return api.get('/playercheck')
})

export const createPlayerCheckEvent = createEvent();
export const createPlayerCheckFx = createEffect((data) => {
    return api.post('/playercheck', data)
})

sample({
    clock: getPlayersCheckEvent,
    target: getPlayersCheckEffect
})

sample({
    clock: getPlayersCheckEffect.doneData,
    fn: ({data}) => {
        let result = [];
        data.payLoad.forEach((item) => {
            let res = []
            res[0] = item.moderatorId
            res[1] = item.steamId
            res[2] = item.discordId
            res[3] = item.result
            res[4] = item.date
            res[5] = item.comment
            result.push(res)
        })

        return {
            ...tableHead,
            body: result
        }
    },
    target: $playerCheck
 })

 sample({
    clock: createPlayerCheckEvent,
    target: createPlayerCheckFx
})

sample({
    clock: createPlayerCheckFx.doneData,
    target: getPlayersCheckEvent
})