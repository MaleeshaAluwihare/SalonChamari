import styled from 'styled-components';

//define style will applied to any div element wrap around <AppStyled>(in app.js)
export const AppStyled = styled.div`
  height: 100vh;
  background-image: url(${props => props.bg});
  position: relative;
`;
