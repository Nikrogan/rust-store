import Image from "next/image"
import styled from "styled-components"
import parse from 'html-react-parser';

export const ProductModal = ({...rest}) => {
    const { description, imageUrl} = rest
    return <Container>
        <ProductImage>
            <Image src={imageUrl || 'https://bwrust.ru/uploads/newBw/main_image.jpg'} alt={""} width={300} height={300}/>
        </ProductImage>
        <Description>{parse(description)}</Description>
    </Container>
}



const Description = styled.p`
    margin-left: 24px;
`

const ProductImage = styled.div`
    width: 300px;
    height: 300px;
    img {
        width: 300px;

    }
`

const Container = styled.div`
    display: flex;
`