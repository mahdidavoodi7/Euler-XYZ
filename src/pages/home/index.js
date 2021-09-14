import { useCallback, useEffect, useState, useRef } from "react";
import { getAssets, getOneAsset } from "../../services/api";
import { useSelector, useDispatch } from "react-redux";
import Home from "./home";
import { parseHash } from "../../handler/hash";

const HomeIndex = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const product = useSelector((state) => state.product);
  const sort = useSelector((state) => state.sort);
  const page = useSelector((state) => state.page);
  const limit = useSelector((state) => state.limit);
  const sortDirection = useSelector((state) => state.sortDirection);
  const [loading, setLoading] = useState(true);
  const [oneLoading, setOneLoading] = useState(true);
  const [isProductModalOpen, setProductModalOpen] = useState(false);

  const getProds = useCallback(
    async (options) => {
      setLoading(true);
      let {
        data: { assets },
      } = await getAssets({
        order_by: sort,
        order_direction: sortDirection,
        offset: limit * page,
        limit: limit,
        ...options,
      });
      setLoading(false);
      dispatch({ type: "GET_PRODUCTS", data: assets });
    },
    [dispatch, sort, sortDirection, limit, page]
  );
  const getOneProd = useCallback(
    async (options) => {
      setOneLoading(true);
      let { data } = await getOneAsset(options);
      setOneLoading(false);
      dispatch({ type: "GET_PRODUCT", data: data });
    },
    [dispatch]
  );
  const changeSortDirection = (value) => {
    dispatch({ type: "CHANGE_SORT_DIRECTION", data: value ? "asc" : "desc" });
  };
  const changeSort = (value) => {
    console.log(value);
    dispatch({ type: "CHANGE_SORT", data: value });
  };
  const changePage = (value) => {
    dispatch({ type: "CHANGE_PAGE", data: value });
  };
  const changeLimit = (value) => {
    dispatch({ type: "CHANGE_LIMIT", data: value });
  };
  useEffect(async () => {
    if (window.location.hash.length === 0) {
      await getProds();
    } else {
      let parsed = parseHash(window.location.hash);
      if (parsed === false) {
        window.history.replaceState(null, null, " ");
        await getProds();
      } else {
        try {
          setProductModalOpen(true);
          await getOneProd(parsed);
        } catch (err) {
          setProductModalOpen(false);
          window.history.replaceState(null, null, " ");
        }
        await getProds();
      }
    }
  }, [getProds, sort, sortDirection, page, limit]);

  return (
    <Home
      sort={sort}
      changeSort={changeSort}
      limit={limit}
      page={page}
      changePage={changePage}
      changeLimit={changeLimit}
      products={products}
      product={product}
      loading={loading}
      oneLoading={oneLoading}
      getProds={getProds}
      getOneProd={getOneProd}
      setProductModalOpen={setProductModalOpen}
      isProductModalOpen={isProductModalOpen}
      sortDirection={sortDirection}
      changeSortDirection={changeSortDirection}
    />
  );
};

export default HomeIndex;
