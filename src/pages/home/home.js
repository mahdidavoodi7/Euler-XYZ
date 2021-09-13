import { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAssets } from "../../services/api";
import style from "./style.module.scss";

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const getProds = useCallback(async () => {
    dispatch({ type: "REQ_PRODUCTS" });
    let {
      data: { assets },
    } = await getAssets();
    dispatch({ type: "GET_PRODUCTS", data: assets });
  }, [dispatch]);

  useEffect(() => {
    getProds();
  }, [getProds]);

  return (
    <div>
      <button onClick={getProds}>click</button>
      <div className={style.row}>
        {products.map((product, index) => {
          return (
            <div key={`card_${index}`}>
              {product.image_thumbnail_url &&
              product.image_thumbnail_url.indexOf(".mp4") !== -1 ? (
                <video autoPlay src={product.image_thumbnail_url} />
              ) : product.image_thumbnail_url ?  (
                <img src={product.image_thumbnail_url} />
              ) : <img src={product.asset_contract.image_url} />}
              <div>{product.name}</div>
              <div>{product.collection && product.collection.name}</div>
              <div>
                {product.last_sale &&
                  parseInt(product.last_sale.total_price) /
                    Math.pow(
                      10,
                      parseInt(product.last_sale.payment_token.decimals)
                    )}
                <span>{product.last_sale && product.last_sale.payment_token.symbol}</span>
                <img src={ product.last_sale && product.last_sale.payment_token.image_url} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
