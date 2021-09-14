import { useCallback, useEffect, useState, useRef } from "react";
import { getAssets } from "../../services/api";
import { useSelector, useDispatch } from "react-redux";
import MyCard from "../../components/card/card";
import styled from "styled-components";
import Search from "../../components/search/search";
import { throttle } from "../../handler/throttle";
import { debounce } from "../../handler/debounce";
import { Page } from "../../components/pa/pa";

const ContainerWrapper = styled.div`
  padding: 6%;
  display: flex;
  flex-direction: column;
`;
const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;
`;
const FakeCard = styled.i`
  width: calc(33% - 10px);
`;
const CardsContainer = styled.div`
  width: calc(70% - 10px);
`;
const FilterContainer = styled.div`
  top: 100px;
  position: sticky;
  position: -webkit-sticky;
  width: calc(30% - 10px);
  background-color: white;
  border-radius: 1rem;
  height: 600px;
  padding: 20px;
`;

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products);
  const wrapperRef = useRef();
  const [width, setWidth] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const getProds = useCallback(
    async options => {
      setLoading(true);
      let {
        data: { assets }
      } = await getAssets(options);
      setLoading(false);
      dispatch({ type: "GET_PRODUCTS", data: assets });
    },
    [dispatch]
  );

  useEffect(() => {
    getProds({ order_by: "sale_date" });
  }, [getProds]);
  const changeHandler = value => {
    // if (!loading) {
    let options = {
      order_by: "sale_date"
    };
    console.log(value);
    if (value.length > 0) {
      options.asset_contract_address = value;
    }
    getProds(options);
    // }
  };
  const debouncedChangeHandler = useCallback(
    debounce(value => changeHandler(value), 300),
    [loading]
  );

  useEffect(() => {
    window.addEventListener(
      "resize",
      throttle(setWidth(wrapperRef.current.innerWidth), 100, undefined)
    );
    setWidth(wrapperRef.current.innerWidth);
  }, []);

  return (
    <ContainerWrapper>
      {console.log(wrapperRef.current)}
      <Search setValue={debouncedChangeHandler} value={searchValue} />
      <Container>
        <FilterContainer></FilterContainer>
        <CardsContainer ref={wrapperRef}>
          <Page products={products} width={width}>
            {/* <FakeCard aria-hidden="true" />
            <FakeCard aria-hidden="true" /> */}
          </Page>
        </CardsContainer>
      </Container>
    </ContainerWrapper>
  );
};

export default Home;
