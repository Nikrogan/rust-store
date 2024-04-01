'use client'
import { Input } from "@mantine/core";
import { useEffect, useState } from "react";
import { serverGet } from "./getData";


const mockName = {
    "NEBULARUSH -Semi-Classic | LOOT+ | ENG-": 1,
    "NexausWarlords [X1/X2 | Official | FPS+]": 1,
    "ObsidianRift [Clan | Full Wipe | PVP]": 1,
    "Jointi Uprising | semi-classic X1/X2 | nolimit | ENG": 1,
    "AuroraBlitz {RUS | SkinsDrops | Teams}": 1,
    '[ENG] Dizoffi Onslaught (LOOT+skins | x2 classic)': 1, 
    'IGNITIONLEGENDS ++ (Original | X2 | Rus)': 1, 
    'FRANCUZIO ASCENDANCY [ENG] | PVP Teams | FPS+ | Semi-Classic': 1, 
    'VortexAscension ++ (Semi-Classic | NOLIMIT | VIP)': 1, 
    'VALIANTWARFARE [FPS+ | Classic | Skins]': 1,
    'Universe Classic 2X (Max 3) Wiped: 19.03': 1,
    'RUST WOLF MAX3 (SOLO DUO TRIO) Wiped: 19.03': 1,
    'Rust Classic Max3 [Solo-Trio] Wiped: 19.03': 1,
    'ANIME RUST MAX3 (TRIO) Wiped: 19.03': 1,
    'Rust Grizzly Vanilla (SOLO DUO TRIO): 19.03': 1,
    'Rust Vanilla X2 (SOLO DUO TRIO) Wiped: 19.03': 1,
};


export default function FindPage () {
    const [type, setType] = useState(0)
    const [ip, setIp] = useState('')
    const [names, setNames] = useState(mockName)
    const [ipList, setIpList] = useState([]);
    const [name, setName] = useState('')

    return (
      <>
        <button onClick={() => setType(1)}>Name</button>
        <button onClick={() => setType(0)}>IP</button>
        <button onClick={() => serverGet(ip, names).then((data) => setIpList(data) )}>Tags</button>
        {type === 0 && <input placeholder="IP" value={ip} onChange={(e) => setIp(e.currentTarget.value)} />}
        {type === 1 && <input placeholder="name" onChange={(e) => {
            setName(e.currentTarget.value)
        }} />}
        <button onClick={() => {
            if(type === 0) {
                serverGet(ip).then((data) => setIpList(data) )
            }

            if(type === 1) {
                names[`${name}`] = 1
                setNames(names)
                serverGet(ip, names).then((data) => setIpList(data) )
            }
        }}>Submit</button>
        {!!ipList.length && <Table columns={columns} data={ipList} />}
    </>
    )
}

const columns = [
    {
        key: 'ip',
        title: 'ИП',
        element: (item) => {
            <div>{item}</div>
        },
    },
    {
        key: 'port',
        title: 'Порт',
        element: (item) => <div>{item}</div>
    },
    {
        key: 'hostname',
        title: 'Наименование сервера',
        element: (item) => <div>{item}</div>
    },
    {
        key: 'players',
        title: 'онлайн',
        element: (item) => <div>{item}</div>
    },
    {
        key: 'tags',
        title: 'Теги',
        element: (item) => <div>{item}</div>
    },
    {
        key: 'counter',
        title: 'Серверов на 1 ип',
        element: (item) => <div>{item}</div>
    },
]

const Table = ({columns, data}) => {
    return (
    <table>
        <thead>
            <tr>
                {columns.map((item => {
                    return <div>{typeof item.title === 'function' ? item.title(item) : item.title}</div>
                }))}
            </tr>
        </thead>
        <tbody>
            {data.map((dataItem) => {
                return <tr>
                    {columns.map((columnItem) => {
                        return <td>{dataItem[columnItem.key]}</td>
                    })}
                </tr>
            })}
        </tbody>
    </table>
    )
}