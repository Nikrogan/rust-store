'use client';
import { Container, Group, MantineProvider} from '@mantine/core';
import { theme } from '@/components/theme/theme';
import { ServerCardNew } from '@/components/ServerCardNew/ServerCardNew';
import { Button } from '@/ServerComponents/button';
import Link from 'next/link'

export default function News() {
  const ServerArray = [
    {
      title: 'BLACKWOOD RUST #1',
      subTitle: '[ TRIO/MAX3 | X3/LOOT+ ] FRIDAY',
      ip:'109.248.4.110:11111',
    },
    {
      title: 'BLACKWOOD RUST #2',
      subTitle: '[ CLASSIC | NO LIMIT | CLAN ] FRIDAY',
      ip:'109.248.4.124:11111',
    },
    {
      title: 'BLACKWOOD RUST #3',
      subTitle: '[ quadro | SEMI-CLASSIC ] MONDAY',
      ip:'109.248.4.125:11111',
    },
    {
      title: 'BLACKWOOD RUST #4',
      subTitle: '[ Squad | rates x5 ] MONDAY',
      ip:'109.248.4.126:11111',
    },
];
  const ServersView = ServerArray.map(item => {
    return <ServerCardNew key={item.ip} {...item} />
  })

  const ButtonList = [{title: 'Магазин', link: '/shop', type: 0}, {title: 'Календарь Вайпов'}, {title: 'discord', link: 'https://discord.gg/blackwoodrust', type: 1}];
  const ButtonView = ButtonList.map(item => {
    if(item.link) {
      return (
        <Link href={item.link} target={item.type ? '_blank' : '_self'}>
            <Button size="xl" {...item}/>
        </Link>
      )
    }
    return <Button size="xl" {...item}/>
  })
  return (
      <MantineProvider theme={theme}>
        <Container size='xl'>
          <Group justify='center' mt="xl">
              {ServersView}
          </Group>
          <Group justify='center' mt="lg">
            {ButtonView}
          </Group>
        </Container>
      </MantineProvider>
  )
}
