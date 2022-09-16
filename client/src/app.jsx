import {BrowserRouter as Router} from 'react-router-dom';
import Header from './components/header';
import Search from './components/search';
import Footer from './components/footer';
import Pages from './pages/pages';
import styled from 'styled-components';
import { UserContextProvider } from './context/userContext';

function App() {

  return (
    <div>
      <Router>
        <UserContextProvider>
          <Header />
          <MainStyle>
            <Search />
            <Pages />
          </MainStyle>
          <Footer/>
        </UserContextProvider>
      </Router>
    </div>
  );
}

const MainStyle=styled.div`
    width:100%;
    // height:100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align:center;
`;

export default App;
