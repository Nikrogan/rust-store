'use client'
import { useUnit } from "effector-react";
import { events, $products, $modal } from "./store";
import { useEffect } from "react";
import styled from "styled-components";
import { Modal } from "@/pageComponents/Modal";
import { Roullete } from "@/components/roullete";
import { buyRoulleteEvent, productBuyEvent } from "@/components/roullete/store";
import { useParams, usePathname } from "next/navigation";
import { ProductCard } from "@/components/ProductCard";
import { ProductModal } from "./_components/ProductModal/ProductModal";
import { Button } from "@/components/Button";
import { $userStores } from "@/store/auth";
import { ProductGroupModal } from "./_components/ProductGroupModal/ProductGroupModal";



export default function Shop() {
  const {id} = useParams();
  const {isAuth} = useUnit($userStores)
  const {getProducts, openModal, closeModal} = useUnit(events);
  const products = useUnit($products);
  const { isOpen, type, content } = useUnit($modal);
  const buyRoullete = useUnit(buyRoulleteEvent);
  const isRoullete = type === 2 ? true : false;
  const productBuy = useUnit(productBuyEvent);
  let pathname = usePathname();

  useEffect(() => {
    getProducts(id)
  }, [])

  const productsView = products && products.payLoad?.map((item, i) => {
    return (
        <ProductCard onClick={openModal} key={i} {...item}/>
    )
  })

  const handleBuy = () => {

    if(!isAuth) {
      const popupWindow = window.open(
        `${process.env.NEXT_PUBLIC_API_CONFIG}user/auth`,
        "_self",
      );
      localStorage.setItem('lastPage', pathname)
      if (popupWindow?.focus) popupWindow.focus();
      return;
    }

    if(isRoullete) {
      buyRoullete(content.id);
      return;
    }

    productBuy(content.id);
    return;
  }

  return (
    <>
      <ProductsList>
          {productsView}
      </ProductsList>
      {isOpen && <Modal title={ type === 2  ? 'Испытай удачу' : `${content.title} ${content.amount > 1 ? 'x' + content.amount : ''}` } isOpen={isOpen} onClose={closeModal}>
        {type === 1 && <ProductModal {...content} />}
        {isRoullete && <Roullete winItemIndex={undefined} itemLenghtInLine={50}/>}
        {type === 3 && <ProductGroupModal {...content} />}
        <Notification>
            Что бы забрать товар, введите команду /store в чат
        </Notification>
        <FooterWrapper>
        <Price>
          <PriceTitle>Цена</PriceTitle>
          <PriceAmount>{content.price} BW</PriceAmount>
        </Price>
          <Button position="center" fontSize='16px' width='145px' onClick={handleBuy}>{isAuth ? 'Купить' : 'Авторизоваться' }</Button>
        </FooterWrapper>
      </Modal>}
    </>
  )
}

const ProductsList = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`

const FooterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`

const Price = styled.div`

`

const PriceTitle = styled.div`

`

const PriceAmount = styled.div`
  color: #E32D2D;
`

const Notification = styled.div`
  padding: 10px;
  font-size: 14px;
  font-weight: 400;
  background: rgba(183, 158, 57, 0.1);
  color: #BC9E36;
  margin-top: 16px;
`
