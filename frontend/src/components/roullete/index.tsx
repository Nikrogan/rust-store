import { useUnit } from "effector-react";
import { useState } from "react";
import styled, { css } from "styled-components";
import { $roullete } from "./store";



const Animation = styled.div`
  display: flex;
  animation: ${css`
    ${(props) => props.slider} ${(props) => props.time / 1000}s;
  `};
  animation-fill-mode: forwards;

  & > div {
    margin-left: 16px;
  };
`;


export const Roullete = () => {
    const { sliderWidth, items } = useUnit($roullete);

  return <>
    <div className='head-wrap'><div className='case-opener-bg'>
        <div className="middle-line">
        <svg width="20" height="12" viewBox="0 0 20 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 12L0.47372 -1.12884e-07L19.5263 -1.77851e-06L10 12Z" fill="#FF5638"/>
        </svg>
        </div>
        <div className='case-opener'>
        <Animation style={{display: 'flex'}} slider={sliderWidth} time={5000}>
            {items.map((item, index) => {
                return <div key={`${item.title}_${index}_123`} className="item">{item.title} {index} {item?.winner && "Win!"}</div>;
            })}
        </Animation>
        </div>
    </div>
    </div> 
    <style jsx>
            {`
            .item {
                width: 220px;
                border: 1px solid red;
                height: 260px;
            }
            .case-opener {
                display: flex;
                overflow: hidden;
            }
          .case-opening-sec {
            width: 100%;
            height: 50%;
            padding-top: 2rem;
            background: #121b24;
            box-shadow: 0px 0px 11px 1px rgba(0, 0, 0, 0.75);
            position: relative;
          }

          .case-opening-sec .head-wrap {
            width: 101%;
            transform: translateX(-0.5%);
            background: #10161b;
            box-shadow: 0px 0px 11px 1px rgba(0, 0, 0, 0.75);
            height: 54%;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .case-opening-sec .head-wrap .case-opener-bg {
            width: 400px;
            background: black;
            position: relative;
            padding: 16px 2px;
          }

          .case-opening-sec .head-wrap .case-opener-bg .case-opener {
            width: 100%;
            height: 102px;
            overflow: hidden;
            position: relative;
          }

          .middle-line {
            height: 100%;
            position: absolute;
            left: 50%;
            width: 3px;
            transform: translateX(-50%);
            z-index: 1;
            margin-top: -34px;
            border: none;
          }
        `}
        </style>
        </>
}