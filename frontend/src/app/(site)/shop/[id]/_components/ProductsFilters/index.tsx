import { Select } from "@/components/form/select"
import { color } from "@/config/theme"
import { useUnit } from "effector-react"
import { useEffect, useState } from "react"
import styled from "styled-components"
import { events } from "../../store"
import { $shopFilters, getShopFiltersEvent } from "@/components/ShopFilters/model"
import { $currentFilters, changeCurrentFiltersEvent } from "./store"


export const ProductsFilters = () => {
    const [currentServer, setCurrentServer] = useState('test')
    const changeCurrentFilters = useUnit(changeCurrentFiltersEvent);
    const currentFilter = useUnit($currentFilters)
    const getShopFilters = useUnit(getShopFiltersEvent)
    const {getProducts} = useUnit(events)
    const shopFilters = useUnit($shopFilters);

    useEffect(() => {
        if(currentServer === 0) {
            getProducts();
            return;
        }

        getProducts(currentServer)
    }, [currentServer])

    useEffect(() => {
        getShopFilters()
    }, [])
    return <FiltersContainer>
            <FiltersHeader>
                Selected Server 
                <SelectServer onChange={(e) => {
                    setCurrentServer(e.target.value)
                }} options={[{type: 0, title: 'All'},{type: 1, title: 'BW1'},{type: 2, title: 'BW2'},{type: 3, title: 'BW3'},{type: 4, title: 'BW4'}]}/>
            </FiltersHeader>
            <FilterContent>
                <FiltersList>
                    {shopFilters && shopFilters.map((filter) => {
                        return <Filter key={filter.id} onClick={() => changeCurrentFilters(filter.id)} isActive={currentFilter === filter.id}>{filter.title}</Filter>
                    })}
                </FiltersList>
            </FilterContent>
    </FiltersContainer>
}

const FiltersHeader = styled.div`
    height: 60px;
    background: ${color.secondary};
    display: flex;
    justify-content: center;
    align-items: center;
`

const FilterContent = styled.div`
    height: 112px;
    background: ${color.secondary};
    margin-top: 18px;
`

const FiltersContainer = styled.div`

`

const FiltersList = styled.div`
    display: flex;
    gap: 12px;
    padding: 18px;

`

const Filter = styled.button`
    font-weight: 500;
    padding: 4px 10px 2px;
    background: ${({isActive}) => isActive ? color.accent :  color.thirdly};
    font-size: 18px;
    color: ${({isActive}) => isActive ? color.primary :  color.white};
`

const SelectServer = styled(Select)`
    background: ${color.thirdly};
    width: 340px;
    color: ${color.primary};
    margin-left: 16px;
    
    option {
        padding: 8px 4px;
        margin-top: 8px;
    }
`