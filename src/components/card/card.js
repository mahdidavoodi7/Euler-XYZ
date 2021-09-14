import React, { useState, useCallback } from "react";
import styled from "styled-components";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import ShareIcon from "@material-ui/icons/Share";
import NoImage from "../../assets/no-image.svg";

const Container = styled(Card)`
  /* width: calc(33% - 10px); */
  width: 100%;
  /* background-color: ${({ theme }) => theme.palette.secondary.light}; */
  background-color: white;
  margin-bottom: 20px;
  box-shadow: none !important;
  transition: 100ms !important;
  border-radius: 16px !important;
  :hover {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 20px 0px !important;
    transform: translateY(-5px);
  }
`;
const ImageContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: pointer;
`;
const Title = styled.div`
  max-width: 80%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-weight: 700;
  font-size: 1.2rem;
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
// const LikeSpan = styled.span`
//   font-size: 0.8rem;
//   margin-left: 0.4rem;
// `;
const Image = styled.img`
  object-fit: contain;
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  border-radius: 16px 16px 0 0;
`;
const Video = styled.video`
  object-fit: contain;
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  border-radius: 16px 16px 0 0;
`;
const CoinImage = styled.img`
  height: 1rem;
  margin-left: 8px;
`;
const PriceContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const MyCard = ({ product }) => {
  const [isImageLoaded, setLoad] = useState(false);
  const imageStyle = !isImageLoaded ? { display: "none" } : {};
  const handleImageLoad = useCallback(() => {
    setLoad(true);
  }, []);
  const getCardImageUrl = () => {
    if (
      product &&
      product.image_thumbnail_url &&
      product.image_thumbnail_url.indexOf(".mp4") !== -1
    ) {
      return <Video loop autoPlay src={product.image_thumbnail_url} />;
    } else if (product && product.image_url) {
      return <Image src={product.image_url} />;
    } else if (product && product.asset_contract.image_url) {
      return <Image src={product.asset_contract.image_url} />;
    }
    return NoImage;
  };
  return (
    <Container>
      {/* <CardHeader
        avatar={
          
        }
        title={}
        subheader={}
      /> */}

      <ImageContainer>{getCardImageUrl()}</ImageContainer>
      <CardContent>
        <Title>{product.name}</Title>
        <SubtitleContainer>
          {!isImageLoaded && <Avatar>C</Avatar>}
          <Avatar
            src={product.collection.banner_image_url}
            style={imageStyle}
            imgProps={{
              onLoad: handleImageLoad
            }}
            alt="avatar"
          >
            C
          </Avatar>
          <Subtitle>{product.collection.name}</Subtitle>
        </SubtitleContainer>
      </CardContent>
      <CardActions>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <PriceContainer>
          {product.last_sale &&
            parseInt(product.last_sale.total_price) /
              Math.pow(10, parseInt(product.last_sale.payment_token.decimals))}
          <span></span>
          <CoinImage
            alt="token-icon"
            src={product.last_sale && product.last_sale.payment_token.image_url}
          />
        </PriceContainer>
      </CardActions>
    </Container>

    // <div key={`card_${index}`}>
    //   {product.image_thumbnail_url &&
    //   product.image_thumbnail_url.indexOf(".mp4") !== -1 ? (
    //     <video autoPlay src={product.image_thumbnail_url} />
    //   ) : product.image_thumbnail_url ? (
    //     <img alt="asset-icon" src={product.image_thumbnail_url} />
    //   ) : (
    //     <img alt="asset-icon" src={product.asset_contract.image_url} />
    //   )}
    //   <div>{product.name}</div>
    //   <div>{product.collection && product.collection.name}</div>
    //   <div>
    //     {product.last_sale &&
    //       parseInt(product.last_sale.total_price) /
    //         Math.pow(10, parseInt(product.last_sale.payment_token.decimals))}
    //     <span>
    //       {product.last_sale && product.last_sale.payment_token.symbol}
    //     </span>
    //     <img
    //       alt="token-icon"
    //       src={product.last_sale && product.last_sale.payment_token.image_url}
    //     />
    //   </div>
    // </div>
  );
};

export default MyCard;
