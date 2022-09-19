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
          <MainStyle>
            <Header />
            <InnerStyle>
              <Search />
              <Pages />
            </InnerStyle>
            <Footer/>
          </MainStyle>
        </UserContextProvider>
      </Router>
    </div>
  );
}

const MainStyle=styled.div`
  display:flex;
  min-height:100vh;
  flex-direction:column; 
`;

const InnerStyle=styled.div`
  flex-grow:1;
  text-align:center;
`;

export default App;
