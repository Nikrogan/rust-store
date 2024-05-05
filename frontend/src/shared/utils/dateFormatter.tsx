import { $lang } from "@/store/lang";
import { useUnit } from "effector-react";

export const defaultOptionsDate = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timezone: 'UTC',
};

export const DateFormatter = (date) => {
   const {currentLang} = useUnit($lang);

   return new Date(date).toLocaleString(currentLang.toLowerCase(), defaultOptionsDate)
}