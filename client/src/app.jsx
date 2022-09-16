import { useState, useEffect } from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import Header from './components/header';
import Search from './components/search';
import Footer from './components/footer';
import Pages from './pages/pages';
import styled from 'styled-components';
import { userContext } from './context/userContext';
import {isUserLoggedIn} from './api/user';
import Swal from 'sweetalert2';

function App() {
  const [userInfo,setUserInfo]=useState(null);
//useeffect 안 쓰는 쪽으로 가자! 미들웨어 use행 netninja 참조
  useEffect(()=>{
    const unsubscribe=isUserLoggedIn().then(resp=>{
      console.log(resp)
      //   if(!resp) console.log("없음")
      //   if(!resp.error) setUserInfo(resp.username);
      //   else Swal.fire({
      //     icon:"error",
      //     text:resp.error,
      //     showConfirmButton:false,
      //     position:'top',
      //   })
      // })
      // .catch(err=> Swal.fire({
      //     icon: 'error',
      //     text: err,
      //     showConfirmButton:false,
      //     position:'top',
      // }));
    }).catch(err=>{
      return console.log("캐치 에러",err.response.data, userInfo)

    });
    
    return ()=>unsubscribe;
  },[]);

  return (
    <div>
      <Router>
        <userContext.Provider value={{userInfo, setUserInfo}}>
          <Header />
          <MainStyle>
            <Search />
            <Pages />
          </MainStyle>
          <Footer/>
        </userContext.Provider>
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
