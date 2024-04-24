import styled from "styled-components"


const getSumFromPrecent = (amount, precent) => {
    if(precent < 0 || amount === 0) return amount;
    const onePrecent = amount / 100;
    const discount = onePrecent * precent;
    return amount - discount;
}

export enum ProductTypes {
  Roullete = '1',
  Shop = '1',
}

export const ProductCard = ({onClick, ...item}) => {
    const price = getSumFromPrecent(item.price, item.discount);
    const isRoullete = item.type === ProductTypes.Roullete;

    return (
    <ProductContainer type={item.type} key={item.id} onClick={() => onClick && onClick(item)}>
    {!isRoullete && <ProductPrice isFree={item.price === 0}>
      {item.discount > 0 && <OldPrice>{item.price}</OldPrice>}{price == 0 ? 'FREE': `${price} BW`}
    </ProductPrice>}
    {item.discount > 0 && !isRoullete && <ProductDiscount>{item.discount}%</ProductDiscount>}

    <StyledImg type={item.type} src={item.imageUrl} />
    <PruductDescription>{item.title} {item.type === ProductTypes.Roullete && item.chance}</PruductDescription>
 </ProductContainer>
 )
}

const StyledImg = styled.img`
  ${({type}) => type === ProductTypes.Roullete ? 'width: 100px; !important' : 'width: 180px;'};
  ${({type}) => type === ProductTypes.Roullete ? 'height: 100px; !important' : 'height: 180px;'};
`

const PruductDescription = styled.div`
  position: absolute;
  width: 100%;
  height: 35px;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`

const OldPrice = styled.div`
  font-size: 12px;
  color: #929292;
  text-decoration: line-through;
  margin-right: 4px;
`

const ProductPrice = styled.div`
  position: absolute;
  background: ${({isFree}) => isFree ? "#CD422A" : "#474747"};
  top: 2px;
  left: 2px;
  height: 24px;
  display: flex;
  align-items: center;
  padding: 0 12px 0 6px;
  justify-content: center;
`

const ProductDiscount = styled.div`
  position: absolute;
  background: #CD422A;
  top: 2px;
  right: 2px;
  height: 24px;
  display: flex;
  align-items: center;
  padding: 0 12px;
  justify-content: center;
`

const ProductContainer = styled.div`
  background: #1a1a1a;
  width: 200px;
  height: 245px;
  position: relative;
  transition: transform 0.6s;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  ${({type}) => type === ProductTypes.Roullete ? 'width: 100px;' : ''};
  ${({type}) => type === ProductTypes.Roullete ? 'height: 100px;' : ''};

  &:hover {
    ${({type}) => type !== ProductTypes.Roullete ? 'transform: scale(1.04)' : ''};
  }
`
