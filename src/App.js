import Web3 from 'web3';
import { useEffect, useState } from 'react';
import './App.css';
import styled from 'styled-components';
import CrowdfundingLab from './components/CrowdfundingLab';
import logo from './logo.png';

const AppWrapper = styled.div`
  height:100vh;
  width:100%;
  padding:0px 10px;
  box-sizing:border-box;
`
const AppHeader = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  padding:20px;
`
const Row = styled.div`
  padding: 5px;
`

const Logo = styled.img`
  max-width:80px;
  height:auto;
`
const Title = styled.h2`
  padding:10px;
`


function App() {
  const [account, setAccount ] = useState();
  const [balance, setBalance ] = useState();
  const [netId, setNetId] = useState();
  const [web3, setWeb3] = useState();

  //EIP 1102 Connect method
  useEffect(() => {
    async function getAccounts(){
      const response = await window.ethereum.request({method:'eth_requestAccounts'});
      const accounts = response.result? response.result : response;
      setAccount(accounts[0])
    }
    getAccounts();
  },[])

   useEffect(() => {

    async function getNetId(){
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        
        setWeb3(web3);
        setNetId(await web3.eth.net.getId());

        const netVersion  = await window.ethereum.request({ method: 'net_version' });
        if (netVersion && netVersion.result){
          setNetId(netVersion.result)
        }

        if(account){
          setBalance(await web3.eth.getBalance(account));
        }

      }

    }
    getNetId();
    


  },[account]);
  

  return (
    <AppWrapper>
      <AppHeader>
        <Logo src={logo}></Logo>
        <Title>Dapps Lab</Title>
        </AppHeader>
      <Row>Account: {account}</Row>
      <Row>Net id: {netId}</Row>
      <CrowdfundingLab web3={web3}/>
    </AppWrapper>
  );
}

export default App;
