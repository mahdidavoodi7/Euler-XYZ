import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { Loading } from "../loading/loading";
import NoImage from "../../assets/no-image.svg";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import { breakpoints } from "../../constants/breakpoints";

const Container = styled.div`
  width: 100%;
  height: 100%;

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  z-index: 200;
  transition: 300ms;
  visibility: ${({ open }) => (open ? "visible" : "hidden")};
  opacity: ${({ open }) => (open ? "1" : "0")};

  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none;
  }

  ${breakpoints.lg} {
    max-width: 900px;
    max-height: 600px;
    flex-direction: row;
    border-radius: 16px;
  }
`;
const LoadingContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ProductContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 12px;

  ${breakpoints.lg} {
    padding: 20px;
    flex-direction: row;
  }
`;
const LeftSide = styled.div`
  width: 100%;

  ${breakpoints.lg} {
    width: 50%;
  }
`;
const RightSide = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${breakpoints.lg} {
    padding-left: 20px;
    width: 50%;
  }
`;
const ImageContainer = styled.div`
  width: 100%;

  ${breakpoints.lg} {
    height: 70%;
  }
`;
const Underlay = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #aaa;
  transition: 300ms;
  z-index: 199;
  visibility: ${({ open }) => (open ? "visible" : "hidden")};
  opacity: ${({ open }) => (open ? "0.4" : "0")};
`;
const Video = styled.video`
  max-width: 100%;
  max-height: 100%;
  width: 100%;
  object-fit: contain;
`;
const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  width: 100%;
  object-fit: contain;
  background-color: #fafafa;
  border-radius: 16px;
`;
const Title = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  margin-top: 12px;
`;
const Description = styled.div`
  font-size: 12px;
  font-weight: 400;
  margin-top: 12px;
`;
const Subtitle = styled.div`
  max-width: 80%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-left: 1rem;
`;
const SubtitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 1rem;
`;
const Address = styled.div`
  background-color: ${({ theme }) => theme.palette.secondary.main};
  padding: 2px 12px;
  color: black;
  font-weight: 300;
  font-size: 12px;
  border-radius: 16px;
  align-self: baseline;
  width: 300px;
  color: white;
  margin-top: 12px;
`;
const CoinImage = styled.img`
  height: 1rem;
  margin-left: 8px;
`;
const PriceContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 12px;
`;
const PriceText = styled.span`
  padding-right: 8px;
`;

const MakeOfferButton = styled(Button)`
  width: 100%;
  height: 60px;
  margin-top: 24px !important;
  margin-bottom: 12px !important;

  ${breakpoints.lg} {
    margin-top: auto !important;
  }
`;
const CloseButton = styled(Button)`
  width: 100%;
  height: 60px;
  margin-bottom: 24px !important;

  ${breakpoints.lg} {
    margin-bottom: 0 !important;
  }
`;

const MyModal = ({ isOpen, close, product, loading }) => {
  const getCardImageUrl = () => {
    if (
      product &&
      product.image_preview_url &&
      product.image_preview_url.indexOf(".mp4") !== -1
    ) {
      return <Video loop autoPlay src={product.image_preview_url} />;
    } else if (product && product.image_preview_url) {
      return <Image src={product.image_preview_url} />;
    } else if (product && product.asset_contract.image_url) {
      return <Image src={product.asset_contract.image_url} />;
    }
    return NoImage;
  };
  return (
    <>
      <Underlay open={isOpen} onClick={() => close()}></Underlay>
      <Container open={isOpen}>
        {loading ? (
          <LoadingContainer>
            <Loading />
          </LoadingContainer>
        ) : product ? (
          <ProductContainer>
            <LeftSide>
              <ImageContainer>{getCardImageUrl()}</ImageContainer>
              <Title>{product.name}</Title>
              <SubtitleContainer>
                <Avatar src={product.collection.banner_image_url} alt="avatar">
                  C
                </Avatar>
                <Subtitle>{product.collection.name}</Subtitle>
              </SubtitleContainer>
              <Address>{product.asset_contract.address}</Address>
              <PriceContainer>
                <PriceText>Price:</PriceText>
                {product.last_sale &&
                  parseInt(product.last_sale.total_price) /
                    Math.pow(
                      10,
                      parseInt(product.last_sale.payment_token.decimals)
                    )}
                <CoinImage
                  alt="token-icon"
                  src={
                    product.last_sale &&
                    product.last_sale.payment_token.image_url
                  }
                />
              </PriceContainer>
            </LeftSide>
            <RightSide>
              <Description>{product.description}</Description>
              <MakeOfferButton variant="outlined" color="secondary">
                Make offer
              </MakeOfferButton>
              <CloseButton onClick={close} variant="outlined" color="default">
                Close
              </CloseButton>
            </RightSide>
          </ProductContainer>
        ) : null}
      </Container>
    </>
  );
};

export default MyModal;
