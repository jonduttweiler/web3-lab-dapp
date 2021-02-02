import Web3 from 'web3';
import { CrowdfundingAbi } from '@acdi/give4forests-crowdfunding-contract';
import styled from 'styled-components';

import { useEffect, useState } from "react";

const MethodsWrapper = styled.div`
    padding:10px;
    display:flex;
    flex-direction:column;
    flex-grow:0;
`
const Row = styled.div`
    display:flex;
    align-items:center;
`
const Snack = styled.div`
    border:2px solid darkblue;
    border-radius:20px;
    padding:0px 8px;
    font-weight:bold;
    text-align:center;
    color:white;
    background-color:darkblue;
    margin:0px 3px;
`
const DLabButton = styled.div`
    cursor:pointer;
    border:2px solid tomato;
    padding:10px 15px;
    margin:10px;
    border-radius:50px;
    color: tomato;
    display:flex;
    justify-content:center;
    max-width:150px;

    :hover{
        background-color:tomato;
        color:white;
    }
`

const AddressInput = styled.input`
    ${props => {
        if(props.invalidAddress){
            return "border:1px solid red;"
        } else {
            return "border:1px solid gray;"
        }
    }}
    width:100%;
`

function CrowdfundingLab(){
    console.log("[CrowdfundingLab] render")
    const [address,setAddress] = useState("0x589F5CBd598eA7e466662909F49c95a51664B3B0");
    const [methods,setMethods] = useState([]);
    const [crowdfunding, setCrowdfunding] = useState();
    const [invalidAddress, setInvalidAddress] = useState();
    const [dacs,setDacs] = useState([]);
    const [campaigns,setCampaings] = useState([]);
    const [milestones,setMilestones] = useState([]);

    useEffect(() => {
        setDacs([]);
        setCampaings([]);
        setMilestones([]);


        setInvalidAddress(false);
        console.log("initializing crowdfunding...")
        const web3 = new Web3(window.ethereum);
        try{
            const crowdfunding = new web3.eth.Contract(CrowdfundingAbi, address);
            setCrowdfunding(crowdfunding);
            const methods = Object.keys(crowdfunding.methods);
            console.log(methods)
            setMethods(methods)
        } catch(err){
            console.log("invalid address");
            setInvalidAddress(true);
        }
        
    },[address])
    
    return(
        <div>
            <div>Test crowdfunding smart contract: 
                <AddressInput
                    invalidAddress={invalidAddress}
                    onChange={ev => setAddress(ev.target.value)}
                    value={address}>
                </AddressInput>
            </div>
            <Row>
                    <DLabButton 
                    onClick={async () => {
                        const dacs = await crowdfunding.methods.getDacIds().call();
                        setDacs(dacs);
                    }}>getDacIds</DLabButton>

                    {dacs.map((dac,idx) => <Snack key={idx}>{dac}</Snack>)}

            </Row>
            <Row>
                <DLabButton 
                    onClick={async () => {
                        const campaigns = await crowdfunding.methods.getCampaignIds().call();
                        setCampaings(campaigns);
                    }}>getCampaignIds</DLabButton>
                    {campaigns.map((campaign,idx) => <Snack key={idx}>{campaign}</Snack>)}
            </Row>
            <Row>
                <DLabButton 
                    onClick={async () => {
                        const milestones = await crowdfunding.methods.getMilestoneIds().call();
                        setMilestones(milestones);
                    }}>getMilestoneIds</DLabButton>

                    {milestones.map((milestone,idx) => <Snack key={idx}>{milestone}</Snack>)}
            </Row>
                
            
            <MethodsWrapper>
                {/* {methods.filter(m => !m.startsWith("0x")).map((method,idx) => <div key={idx}>{method}</div>)} */}
       
            </MethodsWrapper>
        </div>
    )

}

export default CrowdfundingLab;