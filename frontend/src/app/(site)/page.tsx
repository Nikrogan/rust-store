'use client';
import { Container, Flex, Group,Image, MantineProvider, Title} from '@mantine/core';
import { theme } from '@/components/theme/theme';
import { ServerCardNew } from '@/components/ServerCardNew/ServerCardNew';
import { Button } from '@/ServerComponents/button';
import Link from 'next/link'
import styles from './page.module.css'
import { $userStores } from '@/store/auth';
import { useUnit } from 'effector-react';

export default function News() {
  const { value: { isAuth, isLoading, user }} = useUnit({
    value: $userStores,
  });

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
  const ButtonList = [{title: 'Магазин', link: '/shop', type: 0}, {title: 'Авторизоваться'}, {title: 'discord', link: 'https://discord.gg/blackwoodrust', type: 1}];
  const ButtonView = ButtonList.map(item => {
    if(item.title === 'Авторизоваться' && isAuth) {
      return null
    };

    if(item.link) {
      return (
        <Link key={item.title} href={item.link} target={item.type ? '_blank' : '_self'}>
            <Button size={isAuth ? 'xl' : 'md'} {...item}/>
        </Link>
      )
    }
    return <Button key={item.title} size={item.title === 'Авторизоваться' ? 'xl' : 'md'} {...item}/>
  })
  return (
      <MantineProvider theme={theme}>
        <Container size='xl'>
          <Flex direction='column' align='center' pt={128}>
            <Title className={styles.title}>Welcome to</Title>
            <Image src={'https://bwrust.ru/uploads/uploads/newBw/welcome_image.jpg'} h={108} w={700} mt={16}/>
          </Flex>
        </Container>
        <Container size='lg'>
          <Group justify='center' mt="xl" wrap='wrap'>
              {ServersView}
          </Group>
          <Group justify='center' mt="lg">
            {ButtonView}
          </Group>
        </Container>
      </MantineProvider>
  )
}