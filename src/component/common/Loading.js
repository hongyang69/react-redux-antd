import React from "react";
import styled from "styled-components";


const Main = styled.div`
  height: 100%;
  width: 100%;
  .loading {
    height: 100%;
    width: 100%;
    position: fixed;
    background-color: #001;
    opacity: 0.05;
    z-index: 100;
  }
`;

const Loading = ({loading, children}) => {
  return <Main>
    {loading && <div className={"loading"}/>}
    {children}
  </Main>;
};

export default Loading;
