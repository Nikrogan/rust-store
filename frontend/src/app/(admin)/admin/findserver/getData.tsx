'use server';

export const serverGet = async (ip) => {
    const res = await fetch('http://api.facepunch.com/api/public/serverlist', { cache: 'no-store', headers: {
        'Content-Type': 'application/json'
    } });
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.
   
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }
    const data = await res.json();
    const Servers = data.Servers.filter((item) => {
        return String(item.ip) === ip
    })
    return Servers
}