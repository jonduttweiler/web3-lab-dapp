import Web3 from "web3";
import { CrowdfundingAbi } from "@acdi/give4forests-crowdfunding-contract";
import styled from "styled-components";
import { CircularProgress } from "@material-ui/core";

import { useEffect, useState } from "react";

const MethodsWrapper = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  flex-grow: 0;
`;
const Row = styled.div`
  display: flex;
  align-items: center;
`;
const Chip = styled.div`
  border: 2px solid #3584D4;
  border-radius: 20px;
  padding: 0px 8px;
  font-weight: bold;
  text-align: center;
  color: white;
  background-color: #3584D4;
  margin: 0px 3px;
`;
const DLabButton = styled.div`
  cursor: pointer;
  border: 2px solid tomato;
  padding: 10px 15px;
  margin: 10px;
  border-radius: 50px;
  color: tomato;
  display: flex;
  justify-content: center;
  align-items:center;
  max-width: 150px;

  :hover {
    background-color: tomato;
    color: white;
  }
`;

const AddressInput = styled.input`
  ${(props) => {
    if (props.invalidAddress) {
      return "border:1px solid red;";
    } else {
      return "border:1px solid gray;";
    }
  }}
  width:100%;
`;

const ErrorWrapper = styled.div`
  border: 2px solid red;
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
  const [campaigns, setCampaings] = useState([]);
  const [milestones, setMilestones] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState({
    dacs: false,
    campaigns: false,
    milestones: false,
  });

  useEffect(() => {
    setDacs([]);
    setCampaings([]);
    setMilestones([]);

    setInvalidAddress(false);
    console.log("initializing crowdfunding...");
    const web3 = new Web3(window.ethereum);
    try {
      const crowdfunding = new web3.eth.Contract(CrowdfundingAbi, address);
      setCrowdfunding(crowdfunding);
      const methods = Object.keys(crowdfunding.methods);
      console.log(methods);
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
      const dacs = await crowdfunding.methods.getDacIds().call();
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
      const campaigns = await crowdfunding.methods.getCampaignIds().call();
      setCampaings(campaigns);
    } catch (err) {
      setError(err);
    }
    setLoading({ campaigns: false });
  }

  async function loadMilestones() {
    clearError();
    try {
      setLoading({ milestones: true });
      const milestones = await crowdfunding.methods.getMilestoneIds().call();
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
          getDacIds
          {loading.dacs && (
            <CircularProgress style={{margin:"0px 5px"}} color="secondary" size={15}></CircularProgress>
          )}
        </DLabButton>

        {dacs.map((dac, idx) => (
          <Chip key={idx}>{dac}</Chip>
        ))}
      </Row>
      <Row>
        <DLabButton onClick={loadCampaigns}>
          getCampaignIds
          {loading.campaigns && (
            <CircularProgress style={{margin:"0px 5px"}} color="secondary" size={15}></CircularProgress>
          )}
        </DLabButton>
        {campaigns.map((campaign, idx) => (
          <Chip key={idx}>{campaign}</Chip>
        ))}
      </Row>
      <Row>
        <DLabButton onClick={loadMilestones}>
          getMilestoneIds
          {loading.milestones && (
            <CircularProgress style={{margin:"0px 5px"}} color="secondary" size={15}></CircularProgress>
          )}
        </DLabButton>

        {milestones.map((milestone, idx) => (
          <Chip key={idx}>{milestone}</Chip>
        ))}
      </Row>

      <MethodsWrapper>
        {/* {methods.filter(m => !m.startsWith("0x")).map((method,idx) => <div key={idx}>{method}</div>)} */}
      </MethodsWrapper>
      {error && <ErrorWrapper>{error.message}</ErrorWrapper>}
    </div>
  );
}

export default CrowdfundingLab;
