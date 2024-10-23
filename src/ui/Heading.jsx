import styled, { css } from "styled-components";

const Heading = styled.h1`

${props => props.type === 'h1' ? css`
    background-color: #ad2424;
` :    ``}
  font-size:30px;
  font-weight:600;
 
`

export default Heading;