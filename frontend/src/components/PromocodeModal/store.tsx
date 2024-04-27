import { api, buildRequest } from "@/config/api";
import { buildModalStore } from "@/pageComponents/Modal/state";
import { $NotificationList } from "../roullete/store";
import { sample } from "effector";

export const {
    store,
    events: {
        open,
        close
    }
} = buildModalStore('promocodes')

export const {
    request: activePromocodeEvent, 
    store: promocodes
} = buildRequest('promocodes', {
    requestFn: (promocodes) => api.post(`/userpromo/${promocodes}`)
})


sample({
    source: promocodes,
    fn: () => {
      if($NotificationList.getState().length === 3) {
        return $NotificationList.getState()
      };
      
      return [...$NotificationList.getState(), 'Неверный промокод!' ]
    },
    filter: (store) => {
      if(store.isLoading) {
        return false;
      }
      if(!store?.status) {
        return false;
      }
      if(store?.data === 'PromoNotFound') {
        return true;
      }
  
      return false
    },
    target: $NotificationList
  })