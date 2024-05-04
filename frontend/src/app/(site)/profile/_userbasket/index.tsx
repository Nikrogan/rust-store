import { useUnit } from "effector-react"
import { useEffect } from "react"
import { $userBasket, getUserBasketEvent } from "./store"
import { ProductCard } from "@/components/ProductCard"
import styled from "styled-components"

export const UserBasket = () => {
    const getUserBasket = useUnit(getUserBasketEvent)
    const {data, isLoading} = useUnit($userBasket);
    useEffect(() => {
        getUserBasket()
    }, []);

    if(isLoading) {
        return <div>test</div>
    };

    const viewProducts = data.map((item, i) => (<ProductCard key={i} {...item}/>))

    return (
        <ProductsList>
            {viewProducts}
        </ProductsList>
    )
}


const ProductsList = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`
