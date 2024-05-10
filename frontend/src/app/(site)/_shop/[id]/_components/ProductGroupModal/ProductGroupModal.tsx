import { ProductCard } from "@/components/ProductCard"
import Image from "next/image"
import styled from "styled-components"

export const ProductGroupModal = ({...rest}) => {
    const { description, imageUrl, insideProducts} = rest

    const view = insideProducts?.map((item, i) => {
        return  <ProductCard  key={i} {...item}/>
    });

    return <div><Container>
        {view}
    </Container>
    <Description>{description}</Description>
    </div>
}



const Description = styled.p`
 
`

const ProductImage = styled.div`
    width: 300px;
    height: 300px;
`

const Container = styled.div`
    display: flex;
`