import { theme } from "@/components/theme/theme";
import { Box, Button, Checkbox, Flex, Modal, Tabs, TabsList } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";


const simpleFilters = [
    {
        title: 'Все',
        value: 'all'
    },
    {
        title: 'Оружие',
        value: 'weapon'
    },
    {
        title: 'Ресурсы',
        value: 'resources'
    },
    {
        title: 'Боеприпасы',
        value: 'ammunition'
    },
    {
        title: 'Одежда',
        value: 'сlouthes'
    },
    {
        title: 'Конструкции',
        value: 'construction'
    },
    {
        title: 'Инструменты',
        value: 'tools'
    },
    {
        title: 'Медикаменты',
        value: 'medicines'
    },
    {
        title: 'Прочее',
        value: 'other'
    },
    {
        title: 'Электричество',
        value: 'electricity'
    },
    {
        title: 'Компоненты',
        value: 'components'
    },
    {
        title: 'Праздники',
        value: 'holidays'
    },

    {
        title: 'Фермерство',
        value: 'farming'
    },

    {
        title: 'Машины',
        value: 'cars'
    },

    {
        title: 'DLC',
        value: 'dls'
    },
]

const simpleProducts = [
    {
        ruTitle: 'тест2',
        euTitle: 'test1',
        chance: 100,
        type: 'dls',
        id: 123,
        count: 1,
        imageUrl: '11'
        },
        {
        ruTitle: 'тест2',
        euTitle: 'test1',
        chance: 100,
        type: 'dls',
        id: 124,
        count: 2,
        imageUrl: '12'
        },
        {
        ruTitle: 'тест2',
        euTitle: 'test1',
        chance: 100,
        type: 'dls',
        id: 125,
        count: 3,
        imageUrl: '13'
        },
        {
        ruTitle: 'тест2',
        euTitle: 'test1',
        chance: 100,
        type: 'dls',
        id: 126,
        count: 4,
        imageUrl: '14'
        },
        {
        ruTitle: 'тест2',
        euTitle: 'test1',
        chance: 100,
        type: 'dls',
        id: 127,
        count: 5,
        imageUrl: '15'
        },
        {
        ruTitle: 'тест2',
        euTitle: 'test1',
        chance: 100,
        type: 'cars',
        id: 128,
        count: 6,
        imageUrl: '16'
        },
        {
        ruTitle: 'тест2',
        euTitle: 'test1',
        chance: 100,
        type: 'cars',
        id: 129,
        count: 7,
        imageUrl: '17'
        },
        {
        ruTitle: 'тест2',
        euTitle: 'test1',
        chance: 100,
        type: 'cars',
        id: 130,
        count: 8,
        imageUrl: '18'
        },
        {
        ruTitle: 'тест2',
        euTitle: 'test1',
        chance: 100,
        type: 'cars',
        id: 131,
        count: 9,
        imageUrl: '19'
        },
        {
        ruTitle: 'тест2',
        euTitle: 'test1',
        chance: 100,
        type: 'cars',
        id: 132,
        count: 10,
        imageUrl: '20'
        },
        {
        ruTitle: 'тест2',
        euTitle: 'test1',
        chance: 100,
        type: 'cars',
        id: 133,
        count: 11,
        imageUrl: '21'
        },
        {
        ruTitle: 'тест2',
        euTitle: 'test1',
        chance: 100,
        type: 'cars',
        id: 134,
        count: 12,
        imageUrl: '22'
        },
        {
        ruTitle: 'тест2',
        euTitle: 'test1',
        chance: 100,
        id: 135,
        count: 13,
        imageUrl: '23'
        },
        {
        ruTitle: 'тест2',
        euTitle: 'test1',
        chance: 100,
        id: 136,
        count: 14,
        imageUrl: '24'
        },
        {
        ruTitle: 'тест2',
        euTitle: 'test1',
        chance: 100,
        id: 137,
        count: 15,
        imageUrl: '25'
        },
        {
        ruTitle: 'тест2',
        euTitle: 'test1',
        chance: 100,
        id: 138,
        count: 16,
        imageUrl: '26'
        },
        {
        ruTitle: 'тест2',
        euTitle: 'test1',
        chance: 100,
        id: 139,
        count: 17,
        imageUrl: '27'
        },
        {
        ruTitle: 'тест2',
        euTitle: 'test1',
        chance: 100,
        id: 140,
        count: 18,
        imageUrl: '28'
        },
        {
        ruTitle: 'тест2',
        euTitle: 'test1',
        chance: 100,
        id: 141,
        count: 19,
        imageUrl: '29'
        },
        {
        ruTitle: 'тест2',
        euTitle: 'test1',
        chance: 100,
        id: 142,
        count: 20,
        imageUrl: '30'
        }
]

export const StepSimpleProducts = ({children, setActiveSimpleProducts}) => {
    const [opened, { open, close }] = useDisclosure(false);
    const [checkedItems, setCheckedItems] = useState({});
    const [activeTab, setActiveTab] = useState<string | null>('all');

    return (
        <>
        <Button onClick={open}>Выбрать предметы</Button>
        <Flex gap={theme.spacing.md} mt={theme.spacing.lg} wrap="wrap" rowGap={theme.spacing.xl}>
            {children}
        </Flex>
        {opened && <Modal opened={opened} onClose={close} title="Быстрый выбор" size="75%">
            <hr/>
            <Tabs orientation="vertical" value={activeTab} onChange={setActiveTab}>
                <Tabs.List>
                    {simpleFilters.map(item => {
                        return (
                            <Tabs.Tab key={item.title} value={item.value}>
                                {item.title}
                            </Tabs.Tab>
                        )
                    })}
                </Tabs.List>
                
                {simpleFilters.map(filter => {
                    return activeTab === filter.value && (
                    <Tabs.Panel key={filter.value} value={filter.value}>
                            <Flex gap={theme.spacing.md} wrap="wrap" ml={theme.spacing.lg}>
                            {
                                
                                activeTab === 'all' ? simpleProducts.map((product) => {
                                    return (
                                        <Box key={product.id} w={50} style={{cursor: "pointer"}}  onClick={() => {
                                            setCheckedItems({
                                                ...checkedItems,
                                                [product.id]: checkedItems[product.id] ? {
                                                    ...checkedItems[product.id],
                                                    checked: !checkedItems[product.id].checked
                                                }  : {
                                                    ...product,
                                                    checked:true
                                                }
                                            })
                                        }} >
                                            {product.imageUrl}
                                            <Checkbox style={{cursor: "pointer"}} checked={!!checkedItems[product.id]?.checked}/>
                                        </Box>
                                    )
                                }) :
                                simpleProducts.filter(x => x.type === filter.value).map((product) => {
                                    return (
                                        <Box key={product.id} w={50} style={{cursor: "pointer"}}  onClick={() => {
                                            setCheckedItems({
                                                ...checkedItems,
                                                [product.id]: checkedItems[product.id] ? {
                                                    ...checkedItems[product.id],
                                                    checked: !checkedItems[product.id].checked
                                                }  : {
                                                    ...product,
                                                    checked:true
                                                }
                                            })
                                        }} >
                                            {product.imageUrl}
                                            <Checkbox style={{cursor: "pointer"}} checked={!!checkedItems[product.id]?.checked}/>
                                        </Box>
                                    )
                                })
                            }
                            </Flex>
                        </Tabs.Panel>
                        )

                    
                })}
            </Tabs>
            <Flex justify='flex-end'>
                <Button onClick={() => {
                    setActiveSimpleProducts(Object.values(checkedItems))
                    close()
                }}>Сохранить</Button>
            </Flex>

        </Modal>}
        </>
    )
}