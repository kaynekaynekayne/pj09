import {BrowserRouter as Router} from 'react-router-dom';
import Header from './components/header';
import Search from './components/search';
import Footer from './components/footer';
import Pages from './pages/pages';
import styled from 'styled-components';

function App() {
  return (
    <div className='app'>
      <Router>
        <Header />
        <MainStyle>
          <Search />
          <Pages />
        </MainStyle>
        <Footer/>
      </Router>
    </div>
  );
}

const MainStyle=styled.div`
    width:100%;
    height:100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align:center;
`;

export default App;
