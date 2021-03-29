import styled from 'styled-components';

const Controls = styled.div`
  position: fixed;
  top: 10px;
  left: 10px;

  background-color: #ffffff33;

  box-shadow: 3px 3px #20202033;

  * {
    margin: 3px;
  }

  pre {
    text-shadow: -3px -3px #fff, -2px -2px #fff, -1px -1px #fff, 1px 1px #fff,
      2px 2px #fff, 3px 3px #fff;
  }
`;

export default Controls;
