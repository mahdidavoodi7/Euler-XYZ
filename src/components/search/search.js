import styled from "styled-components";
import { useRef, useEffect, useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import { throttle } from "../../handler/throttle";
import { debounce } from "../../handler/debounce";

const SearchInput = styled.input`
  width: 100%;
  font-size: ${({ small }) => (small ? "1rem" : "1.5rem")};

  transition: 300ms;
  will-change: width, font-size;
  border-radius: 1rem;
  border: none;
  outline: none;
  padding: 12px;
  transition: 300ms;

  ::placeholder {
    color: #aaa;
  }
`;

const SearchContainer = styled.div`
  width: ${({ small }) => (small ? "calc(30% - 10px)" : "100%")};
  will-change: width, font-size;
  transition: 300ms;
  display: flex;
  align-items: center;
  height: 60px;
  border-radius: 1rem;
  border: none;
  outline: none;
  background-color: white;
  padding-left: 20px;
  position: sticky;
  top: 20px;
`;

const Search = ({ value, setValue }) => {
  const searchRef = useRef();
  const [isSmall, setSmall] = useState(false);
  useEffect(() => {
    document.addEventListener("scroll", throttle(handleScroll, 100, undefined));
  }, []);
  const handleScroll = e => {
    if (searchRef.current.getBoundingClientRect().top === 20) {
      setSmall(true);
    } else {
      setSmall(false);
    }
  };
  return (
    <SearchContainer ref={searchRef} small={isSmall}>
      <SearchIcon style={{ color: "#aaaaaa" }} />
      <SearchInput
        onChange={e => setValue(e.target.value)}
        small={isSmall}
        placeholder="Asset contract address ..."
      ></SearchInput>
    </SearchContainer>
  );
};

export default Search;
