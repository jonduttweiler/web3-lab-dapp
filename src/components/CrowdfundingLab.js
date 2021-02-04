import Web3 from "web3";
import { CrowdfundingAbi } from "@acdi/give4forests-crowdfunding-contract";
import styled from "styled-components";
import { CircularProgress } from "@material-ui/core";
import { useEffect, useState } from "react";

import EntityCard from "./cards/EntityCard";
import { MethodsWrapper, Row, Chip, DLabButton, AddressInput } from './styled/CrowdfundingLab';


const ErrorWrapper = styled.div`
  border: 2px solid red;
  color:red;
  padding:5px;
  border-radius:5px;
`;

function CrowdfundingLab() {
  console.log("[CrowdfundingLab] render");
  const [address, setAddress] = useState(
    "0x589F5CBd598eA7e466662909F49c95a51664B3B0"
  );
  const [methods, setMethods] = useState([]);
  const [crowdfunding, setCrowdfunding] = useState();
  const [invalidAddress, setInvalidAddress] = useState();
  const [dacs, setDacs] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [milestones, setMilestones] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState({
    dacs: false,
    campaigns: false,
    milestones: false,
  });

  useEffect(() => {
    setDacs([]);
    setCampaigns([]);
    setMilestones([]);

    setInvalidAddress(false);
    console.log("initializing crowdfunding...");
    const web3 = new Web3(window.ethereum);
    try {
      const crowdfunding = new web3.eth.Contract(CrowdfundingAbi, address);
      setCrowdfunding(crowdfunding);
      const methods = Object.keys(crowdfunding.methods);
      setMethods(methods);
    } catch (err) {
      console.log("invalid address");
      setInvalidAddress(true);
    }
  }, [address]);

  function clearError() {
    setError(undefined);
  }
  async function loadDacs() {
    clearError();
    try {
      setLoading({ dacs: true });
      const dacs = [];
      const dacsIds = await crowdfunding.methods.getDacIds().call();
      for(const dacId of dacsIds){
          const dac = await crowdfunding.methods.getDac(dacId).call();
          dacs.push(dac);
      }
      setDacs(dacs);
    } catch (err) {
      setError(err);
    }
    setLoading({ dacs: false });
  }

  async function loadCampaigns() {
    clearError();
    try {
      setLoading({ campaigns: true });
      const campaigns = [];
      const campaignsIds = await crowdfunding.methods.getCampaignIds().call();
      for(const campaignId of campaignsIds){
          const campaign = await crowdfunding.methods.getCampaign(campaignId).call();
          campaigns.push(campaign)
      }
      setCampaigns(campaigns);
    } catch (err) {
      setError(err);
    }
    setLoading({ campaigns: false });
  }

  async function loadMilestones() {
    clearError();
    try {
      setLoading({ milestones: true });
      const milestones = [];
      const milestonesIds = await crowdfunding.methods.getMilestoneIds().call();
      for(const milestoneId of milestonesIds){
          const milestone = await crowdfunding.methods.getMilestone(milestoneId).call();
          milestones.push(milestone)
      }
      window.milestones = milestones
      setMilestones(milestones);
    } catch (err) {
      setError(err);
    }
    setLoading({ milestones: false });
  }

  return (
    <div>
      <div>
        Test crowdfunding smart contract:
        <AddressInput
          invalidAddress={invalidAddress}
          onChange={(ev) => setAddress(ev.target.value)}
          value={address}
        ></AddressInput>
      </div>
      <Row>
        <DLabButton onClick={loadDacs}>
          getDacs
          {loading.dacs && (
            <CircularProgress style={{margin:"0px 5px"}} color="secondary" size={15}></CircularProgress>
          )}
        </DLabButton>

        {dacs.map((dac, idx) => (<EntityCard key={idx} entity={dac}></EntityCard>))}

      </Row>
      <Row>
        <DLabButton onClick={loadCampaigns}>
          getCampaigns
          {loading.campaigns && (
            <CircularProgress style={{margin:"0px 5px"}} color="secondary" size={15}></CircularProgress>
          )}
        </DLabButton>
        {campaigns.map((campaign, idx) => (<EntityCard key={idx} entity={campaign}></EntityCard>))}
      </Row>
      <Row>
        <DLabButton onClick={loadMilestones}>
          getMilestones
          {loading.milestones && (
            <CircularProgress style={{margin:"0px 5px"}} color="secondary" size={15}></CircularProgress>
          )}
        </DLabButton>

        {milestones.map((milestone, idx) => (<EntityCard key={idx} entity={milestone}></EntityCard>))}
      </Row>

      <MethodsWrapper>
        {/* {methods.filter(m => !m.startsWith("0x")).map((method,idx) => <div key={idx}>{method}</div>)} */}
      </MethodsWrapper>
      {error && <ErrorWrapper>{error.message}</ErrorWrapper>}
    </div>
  );
}

export default CrowdfundingLab;
