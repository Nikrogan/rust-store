'use client'
import { Input } from "@mantine/core";
import { useEffect, useState } from "react";
import { serverGet } from "./getData";

export default function FindPage () {
    const [ip, setIp] = useState('')
    
    const [ipList, setIpList] = useState([]);
        useEffect(() => {
            if(ip.length > 10) {
                serverGet(ip).then((data) => setIpList(data) )
            }
            
        },[ip])

        const ServersView = ipList.map(item => {
        return <div key={item.port + item.ip}>IP: {item.ip} PORT: {item.port} QueryPort: {item.query_port} Players: {item.players} HostName: {item.hostname}</div>
    })
    return (
      <>
        <input value={ip} onChange={(e) => setIp(e.currentTarget.value)} />
        {ServersView}
    </>
    )
}