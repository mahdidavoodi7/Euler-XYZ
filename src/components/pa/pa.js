import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { throttle } from "../../handler/throttle";
import MyCard from "../card/card";

const ColumnsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: auto;
  padding: 20px;
`;

const Column = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  margin: 5px;
`;

export const Page = ({ products, width }) => {
  const [numOfColumns, setNumOfColumns] = useState(0);

  const handleResize = () => {
    if (width <= 576) {
      setNumOfColumns(1);
    } else if (width <= 767) {
      setNumOfColumns(2);
    } else if (width <= 991) {
      setNumOfColumns(3);
    } else {
      setNumOfColumns(4);
    }
  };

  useEffect(() => {
    handleResize();
  }, []);

  return (
    <>
      <ColumnsWrapper>
        {Array.from(Array(numOfColumns).keys()).map(modulu => (
          <Column>
            {products.filter((product, index) => index % numOfColumns == modulu).map(
              (product, index) => {
                return <MyCard key={`card_${index}`} product={product} />;
              }
            )}
          </Column>
        ))}
      </ColumnsWrapper>
    </>
  );
};
