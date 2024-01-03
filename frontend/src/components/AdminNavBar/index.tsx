import { Button, NavLink } from '@mantine/core'
import styled from './styled.module.css'

const mockLink = [
    {
        title: 'Статистика',
        children: null
    },
    {
        title: 'Управление',
        children: null
    },
    {
        title: 'Магазины',
        children: [
            {
                title: 'BlackWood',
                children: null
            }
        ]
    },
]


const getNavLinks = (links) => {
    return links.map(item => {
        if(item.children) {
            return <NavLink key={item} color="indigo" label={item.title}>{getNavLinks(item.children)}</NavLink>
        }
        return  <NavLink  key={item}  color="indigo" label={item.title} />
    })
}

export function AdminNavBar() {
 const Links = getNavLinks(mockLink)
  return (
    <nav className={styled.nav}>
        {Links}
    </nav>
  );
}