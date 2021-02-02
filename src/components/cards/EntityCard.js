import styled from "styled-components";
import Card from './Card';

const Label = styled.span`
    font-weight:bold;
`;
const Value = styled.span``;

const Row = styled.div`
  white-space: nowrap; 
  width: 250px; 
  overflow: hidden;
  text-overflow: ellipsis;
  cursor:default;
`

const EntityCard = ({ entity }) => {
  const keys = Object.keys(entity).filter((key) => !key.match(/^[\d]*$/));

  return (
    <Card style={{padding:"15px",margin:"15px"}}>
      {keys.map((key, idx) => {
        if (Array.isArray(entity[key])) {
          return (
            <Row key={idx} title={JSON.stringify(entity[key])}>
              <Label>{key}</Label>:
              <Value>{JSON.stringify(entity[key])}</Value>
            </Row>
          );
        } else {
          return (
            <Row key={idx} title={entity[key]}>
              <Label>{key}</Label>: 
              <Value>{entity[key]}</Value>
            </Row>
          );
        }
      })}
    </Card>
  );
};
export default EntityCard;
