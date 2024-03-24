import { useEffect, useState } from "react";
import styled, { css } from "styled-components";

import { keyframes } from "styled-components";

export const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(getRandomIntSecure() * (max - min)) + min;
  };
  
  export const getRandomIntUnsafe = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
  
  export const getRandomIntSecure = () => {
    const arr = new Uint32Array(2);
    crypto.getRandomValues(arr);
    const mantissa = (arr[0] * Math.pow(2, 20)) + (arr[1] >>> 12)
    const result = mantissa * Math.pow(2, -52);
    return result;
  }

export const getSlider = (pos) => {
  return keyframes`
    0% {
      transform: translateX(0);
    }

    100% {
      transform: translateX(-${pos}px);
    }`;
};


const Animation = styled.div`
  display: flex;
  animation: ${css`
    ${(props) => props.slider} ${(props) => props.time / 1000}s;
  `};
  animation-fill-mode: forwards;

  & > div {
    margin-left: 5px;
  };
`;
const ActItemIndex = 25, ItemsInLine = 50;
const test = ['1','2','3','4','5','6','7','8', 10,1685,1698,8,4,6,7]

const generateItems = () => {
    let items = [];
    for (let index = 0; index < ItemsInLine; index++) {
      if (index === ActItemIndex) {
        items.push(test[10]);
      } else {
        console.log(index, ActItemIndex)
        items.push(test[getRandomInt(0, test.length)]);
      }
    }

    return items;
  }



export const Roullete = () => {
    const [items, setItems] = useState(test)
    const [isLoad, setLoad] = useState(false);
    const [timeoutId, setTimeoutId] = useState(null)
    const [slider, setSlider] = useState(getSlider(0))
    return <>
    <div className='case-opening-sec'></div><div className='head-wrap'><div className='case-opener-bg'>
        <hr className='middle-line' />
        <div className='case-opener'>
        <Animation style={{display: 'flex'}} slider={slider} time={5000}>
            {items.map((item, index) => {
                return <div key={`${item}_${index}_123`} className="item">{item}</div>;
            })}
        </Animation>
        </div>
        <button disabled={isLoad} onClick={() => {
            setLoad(true)
            setSlider(0)
            const items = generateItems()
            setItems(items)
            setSlider(getSlider(getRandomInt(2410, 2510)))
            setTimeout(() => {
              setLoad(false)
            }, 5000)
            }}>test</button>

    </div>
    </div> 
    <style jsx>
            {`
            .item {
                width: 122px;
                border: 1px solid red;
                height: 105px;
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
            background: #605337;
            height: 100%;
            position: absolute;
            left: 50%;
            width: 3px;
            transform: translateX(-50%);
            top: 0;
            margin: 0;
            z-index: 1;
            border: none;
          }
        `}
        </style>
        </>
}