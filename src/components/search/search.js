import styled from "styled-components";
import React, { useRef, useEffect, useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import { throttle } from "../../handler/throttle";
import { debounce } from "../../handler/debounce";
import { breakpoints } from "../../constants/breakpoints";

const SearchInput = styled.input`
  width: 100%;
  font-size: 1rem;

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

  ${breakpoints.lg} {
    font-size: ${({ small }) => (small ? "1rem" : "1.5rem")};
  }
`;

const SearchContainer = styled.div`
  width: 100%;
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
  position: static;
  top: 20px;
  
  ${breakpoints.lg} {
    position: sticky;
    width: ${({ small }) => (small ? "calc(30% - 10px)" : "100%")};
  }
  ${breakpoints.vlg} {
    width: ${({ small }) => (small ? "calc(20% - 10px)" : "100%")};
  }
`;

const Search = ({ setValue }) => {
  const searchRef = useRef();
  const [isSmall, setSmall] = useState(false);
  useEffect(() => {
    document.addEventListener("scroll", throttle(handleScroll, 100, undefined));
  }, []);
  const handleScroll = (e) => {
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
        onChange={(e) => setValue(e.target.value)}
        small={isSmall}
        placeholder="Asset contract address ..."
      ></SearchInput>
    </SearchContainer>
  );
};

function areEqual(prevProps, nextProps) {
  if (prevProps.value !== nextProps.value) {
    return false;
  }
  return true;
}

export default React.memo(Search, areEqual);
