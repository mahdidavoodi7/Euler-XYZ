import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { throttle } from "../../handler/throttle";
import MyCard from "../card/card";

const ColumnsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: auto;
`;

const Column = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  margin: 5px;
  width: ${({ col }) => `calc(${100 / col}% - 10px)`};
`;

const Page = ({ products, width, openProduct }) => {
  const [numOfColumns, setNumOfColumns] = useState(0);

  const handleResize = () => {
    if (width <= 576) {
      setNumOfColumns(1);
    } else if (width <= 767) {
      setNumOfColumns(2);
    } else {
      setNumOfColumns(3);
    }
  };

  useEffect(() => {
    handleResize();
  }, [width]);

  return (
    <>
      <ColumnsWrapper>
        {Array.from(Array(numOfColumns).keys()).map((modulu, index1) => (
          <Column key={`${index1}_column`} col={numOfColumns}>
            {products
              .filter((product, index) => index % numOfColumns == modulu)
              .map((product, index) => {
                return (
                  <MyCard
                    key={`card_${index}`}
                    product={product}
                    openProduct={openProduct}
                  />
                );
              })}
          </Column>
        ))}
      </ColumnsWrapper>
    </>
  );
};

function areEqual(prevProps, nextProps) {
  if (prevProps.products !== nextProps.products) {
    return false;
  }
  if (prevProps.width !== nextProps.width) {
    return false;
  }
  return true;
}

export default React.memo(Page, areEqual);
