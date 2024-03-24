'use server';

export const serverGet = async (ip, names = {} ) => {
    const res = await fetch('http://api.facepunch.com/api/public/serverlist', { cache: 'no-store', headers: {
        'Content-Type': 'application/json'
    } });
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.
   
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }

    const tags = (tags: string) => {
        const cp = tags.split(',').filter(item => item[0] === 'c' && item[1] === 'p')[0].split('cp')[1] 
        const born = tags.split(',').filter(item => item[0] === 'b' && item[1] === 'o' && item[2] === 'r')[0]?.split('born')[1]

        return {
            cp,
            born
        }
    }

    const data = await res.json();
    const dictionary = {}
    data.Servers.forEach((item) => {
        if(item.tags === null) return false;
        const {
            cp,
            born
        } = tags(item.tags)
        const currentUnixDate = Math.floor(new Date().getTime() / 1000)

        const left3days = currentUnixDate - 88000;

        if(dictionary.hasOwnProperty(`${item.ip}`) && Number(born) >= Number(left3days)) {
            dictionary[item.ip] = {
                ...dictionary[item.ip],
                [`${item.hostname}`]: {
                    ...item
                },
                count: dictionary[item.ip].count + 1
            }
        } else {
            dictionary[item.ip] = {
                count: 1,
                ...item
            }
        }
        
        if(item.players < 3 && Number(cp) > 20){
            return true
        }
    });

    const a = Object.keys(dictionary).reduce((acc, item) => {

        const {
            cp,
            born
        } = tags(dictionary[item].tags)
            if((dictionary[item].count > 3) || (cp > 20 && dictionary[item].players < 5)) {
                return [
                    ...acc,
                    dictionary[item]
                ]
            }
            return acc
    }, [])

    return a.sort((a, b) => {
        a.ip < b.ip
    })


    // const Servers = data.Servers.filter((item) => {
    //     if(names.hasOwnProperty([item.hostname])) {
    //         return true
    //     };

    //     return String(item.ip) === ip
    // })
    // return Servers
}