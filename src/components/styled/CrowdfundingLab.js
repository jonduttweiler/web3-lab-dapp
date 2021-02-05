import styled from 'styled-components';

export const MethodsWrapper = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  flex-grow: 0;
`;
export const Row = styled.div`
  display: flex;
  align-items: center;
`;
export const Chip = styled.div`
  border: 2px solid #3584D4;
  border-radius: 20px;
  padding: 0px 8px;
  font-weight: bold;
  text-align: center;
  color: white;
  background-color: #3584D4;
  margin: 0px 3px;
`;
export const DLabButton = styled.div`
  cursor: pointer;
  border: 2px solid tomato;
  padding: 5px 10px;
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

export const AddressInput = styled.input`
  ${(props) => {
    if (props.invalidAddress) {
      return "border:1px solid red;";
    } else {
      return "border:1px solid gray;";
    }
  }}
  width:100%;
`;

export const ErrorWrapper = styled.div`
  border: 2px solid red;
  color:red;
  padding:5px;
  border-radius:5px;
`;

export const ErrorName = styled.div`
  font-size:20px; 
  font-weight:bold;
  margin:10px;
`


export const ErrorMessage = styled.div`
  font-size:15px; 
  font-weight:bold;
  margin-left:5px;
  
`
