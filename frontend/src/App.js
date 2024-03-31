import styled from 'styled-components';
import bg from './images/Pulasthi/hello.png';
import { AppStyled } from './css/Pulasthi/AppStyled'; //import AppStyled
import { MainLayout } from './css/Pulasthi/Layouts';
import Navigation from './components/Pulasthi/Navigation/Navigation'

function App() {
  return (
    <div className="App">
      
    <AppStyled bg={bg}>
      <MainLayout>
        <Navigation/>
      </MainLayout>
    </AppStyled>
    </div>
  );
}

export default App;
