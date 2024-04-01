import { theme } from "@/components/theme/theme"
import { Table, Tabs } from "@mantine/core"

export const PromoCodes = ({promocodesList}) => {
    const rows = promocodesList && promocodesList.map((element) => (
        <Table.Tr key={element.id}>
            <Table.Td>{element.id}</Table.Td>
            <Table.Td>{element.promoCode}</Table.Td>
            <Table.Td>{element.moneyValue}</Table.Td>
            <Table.Td>{element.alreadyUses}/ {element.maxUses}</Table.Td>
            <Table.Td>{element.createTime}</Table.Td>
            <Table.Td>{element.endTime}</Table.Td>
        </Table.Tr>
    ));
    return (
        <Tabs.Panel value='promocodes' p={theme.spacing.md}>
        <Table>
            <Table.Thead>
            <Table.Tr>
                <Table.Th>PROMO ID</Table.Th>
                <Table.Th>Код</Table.Th>
                <Table.Th>Тип</Table.Th>
                <Table.Th>Кол.во использований</Table.Th>
                <Table.Th>Дата создания</Table.Th>
                <Table.Th>Дата окончания</Table.Th>
                <Table.Th>Действия</Table.Th>
            </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
                {rows}
            </Table.Tbody>
        </Table>
    </Tabs.Panel>
    )
}