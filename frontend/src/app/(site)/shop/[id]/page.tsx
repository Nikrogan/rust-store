'use client'
import { useUnit } from "effector-react";
import { events, $products, $modal } from "./store";
import { useEffect } from "react";
import styled from "styled-components";
import { Modal } from "@/pageComponents/Modal";
import { Roullete } from "@/components/roullete";
import { buyRoulleteEvent } from "@/components/roullete/store";
import { useParams } from "next/navigation";
import { ProductCard } from "@/components/ProductCard";



export default function Shop() {
  const {id} = useParams();
  const {getProducts, openModal, closeModal} = useUnit(events);
  const products = useUnit($products);
  const { isOpen, type, content } = useUnit($modal);
  const buyRoullete = useUnit(buyRoulleteEvent)

  useEffect(() => {
    getProducts(id)
  }, [])

  const productsView = products && products.payLoad?.map((item, i) => {
    return (
        <ProductCard key={i} {...item}/>
    )
  })

  return (
    <>
      <ProductsList>
          {productsView}
      </ProductsList>
      {isOpen && <Modal title={ type === 2  ? 'Испытай удачу' : content.title } isOpen={isOpen} onClose={closeModal}>
        {type === 2 && <Roullete winItemIndex={undefined} itemLenghtInLine={50}/>}
        <button onClick={() => buyRoullete(content.id)}>Купить</button>
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
