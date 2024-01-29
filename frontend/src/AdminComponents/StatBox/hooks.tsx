import { Type } from "./types"

const getCurrentColor = (type) => {
    switch(type) {
        case Type.current: {
            return '#5191EC'
        };

        case Type.halfmonth: {
            return '#F07DBD'
        };

        case Type.month: {
            return '#FFB249'
        };

        case Type.alltime: {
            return '#43C6B4'
        };
    }
}

const getTitle = (type) => {
    switch(type) {
        case Type.current: {
            return 'Сегодня'
        };

        case Type.halfmonth: {
            return 'За 14 дней'
        };

        case Type.month: {
            return 'За 30 дней'
        };

        case Type.alltime: {
            return 'За все время'
        };
    }
}

const getSubTitle = (amount) => {
    return `${amount} РУБ.`
}


const getBackgroundColor = (type) => {
    switch(type) {
        case Type.current: {
            return '#EDF4FE'
        };

        case Type.halfmonth: {
            return '#FFF6FB'
        };

        case Type.month: {
            return '#FFF7EC'
        };

        case Type.alltime: {
            return '#E5FBF8'
        };
    }
}

export const useStatData = ({type, amount}) => {
    return {
        backgroundColor: getBackgroundColor(type),
        currentColor: getCurrentColor(type),
        currentTitle: getTitle(type),
        currentSubtitle: getSubTitle(amount)
    }
}