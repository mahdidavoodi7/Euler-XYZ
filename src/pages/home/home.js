import { useCallback, useEffect, useState, useRef } from "react";
import styled from "styled-components";
import Search from "../../components/search/search";
import { throttle } from "../../handler/throttle";
import { debounce } from "../../handler/debounce";
import Page from "../../components/page/page";
import MyModal from "../../components/modal/modal";
import { parseHash } from "../../handler/hash";
import { Loading } from "../../components/loading/loading";
import NativeSelect from "@material-ui/core/NativeSelect";
import Pagination from "@material-ui/lab/Pagination";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
import Switch from "@material-ui/core/Switch";
import { breakpoints } from "../../constants/breakpoints";

const ContainerWrapper = styled.div`
  padding: 6%;
  padding-bottom: 120px;
  display: flex;
  flex-direction: column;

  ${breakpoints.lg} {
    padding-bottom: 6%;
  }
`;
const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;
`;
const CardsContainer = styled.div`
  width: calc(100%);

  ${breakpoints.lg} {
    width: calc(70% - 10px);
  }
  ${breakpoints.vlg} {
    width: calc(80% - 10px);
  }
`;
const FilterContainer = styled.div`
  top: 100px;
  position: static;
  position: -webkit-sticky;
  background-color: white;
  padding: 20px;

  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  z-index: 300;
  transition: 300ms;
  transform: ${({ show }) => (show ? `translateX(0)` : `translateX(-100%)`)};
  
  ${breakpoints.lg} {
    z-index: 1;
    position: sticky;
    width: calc(30% - 10px);
    top: 100px;
    height: 600px;
    border-radius: 1rem;
    transform: none !important;
  }
  ${breakpoints.vlg} {
    width: calc(20% - 10px);
  }
`;
const LoadingContainer = styled.div`
  width: 100%;
  height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const FilterTitle = styled.div`
  margin-top: 20px;
  margin-bottom: 12px;
  font-size: 16px;
  font-weight: 700;
`;
const SelectWrapper = styled(NativeSelect)`
  width: 100%;
  border-color: aliceblue;
`;
const PaginationWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 32px;
`;
const MobileFilterButton = styled(Button)`
  position: fixed !important;
  width: 100%;
  height: 60px;
  bottom: 0;
  left: 0;
  color: black !important;

  ${breakpoints.lg} {
    display: none !important;
  }
`;
const FilterCloseButton = styled(Button)`
  position: absolute !important;
  width: 100%;
  height: 60px;
  bottom: 0;
  left: 0;
  color: black !important;

  ${breakpoints.lg} {
    display: none !important;
  }
`;

const Home = ({
  products,
  product,
  sort,
  changeSort,
  loading,
  oneLoading,
  getProds,
  getOneProd,
  setProductModalOpen,
  isProductModalOpen,
  sortDirection,
  changeSortDirection,
  limit,
  page,
  changePage,
  changeLimit,
}) => {
  const wrapperRef = useRef();
  const [width, setWidth] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [isFilterOpen, setFilterOpen] = useState(false);

  const openAsset = (assetAddress, tokenId) => {
    window.location.hash = `#${assetAddress}/${tokenId}`;
    getOneProd({
      asset_contract_address: assetAddress,
      token_id: tokenId,
    });
    setProductModalOpen(true);
  };
  const closeAsset = (assetAddress, tokenId) => {
    window.history.replaceState(null, null, " ");
    setProductModalOpen(false);
  };

  const changeHandler = (value) => {
    setSearchValue(value);
    let options = {};
    if (value.length > 0) {
      options.asset_contract_address = value;
    }
    getProds(options);
  };
  const debouncedChangeHandler = useCallback(
    debounce((value) => changeHandler(value), 300),
    [loading]
  );

  useEffect(() => {
    window.addEventListener(
      "resize",
      throttle(() => setWidth(wrapperRef.current.clientWidth), 200, undefined)
    );
    setWidth(wrapperRef.current.clientWidth);
  }, []);

  return (
    <ContainerWrapper>
      <MyModal
        product={product}
        loading={oneLoading}
        // isOpen={true}
        isOpen={isProductModalOpen}
        close={closeAsset}
      />
      <Search setValue={debouncedChangeHandler} />
      <Container>
        <FilterContainer show={isFilterOpen}>
          <FilterTitle>Sort:</FilterTitle>
          <SelectWrapper
            onChange={(e) => changeSort(e.target.value)}
            value={sort}
            color="primary"
          >
            <option value={"sale_price"}>Price</option>
            <option value={"sale_date"}>Date</option>
            <option value={"token_id"}>ID</option>
          </SelectWrapper>
          <FilterTitle>Sort direction:</FilterTitle>
          <FormControlLabel
            control={
              <Switch
                onClick={(e) => changeSortDirection(e.target.checked)}
                checked={sortDirection === "asc"}
                name="checkedB"
                color="primary"
              />
            }
            label="Ascending"
          />
          <FilterTitle>Limit:</FilterTitle>
          <SelectWrapper
            onChange={(e) => changeLimit(e.target.value)}
            value={limit}
            color="primary"
          >
            <option value={"20"}>20</option>
            <option value={"30"}>30</option>
            <option value={"50"}>50</option>
          </SelectWrapper>
          <FilterCloseButton
            onClick={() => setFilterOpen(false)}
            variant="contained"
            color="secondary"
          >
            Close
          </FilterCloseButton>
        </FilterContainer>
        <CardsContainer ref={wrapperRef}>
          {loading ? (
            <LoadingContainer>
              <Loading />
            </LoadingContainer>
          ) : (
            <>
              <Page products={products} width={width} openProduct={openAsset} />
              <PaginationWrapper>
                <Pagination
                  page={page + 1}
                  onChange={(e, value) => changePage(value - 1)}
                  count={10}
                  color="primary"
                />
              </PaginationWrapper>
            </>
          )}
        </CardsContainer>
      </Container>
      <MobileFilterButton
        onClick={() => setFilterOpen(true)}
        variant="contained"
        color="primary"
      >
        Filters
      </MobileFilterButton>
    </ContainerWrapper>
  );
};

export default Home;
