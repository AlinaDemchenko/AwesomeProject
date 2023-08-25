import styled from "styled-components/native";

export const StyledRegistrationScreen = styled.View`
  flex: 1;
  background-color: white;
  justify-content: flex-start;
  align-items: center;
  min-height: 374px;
  max-height: 549px;
  width: 100%;
  padding: 92px 16px 78px;
  border-top-right-radius: 25px;
  border-top-left-radius: 25px;
  position: relative;
`;

export const StyledTitle = styled.Text`
  color: #212121;
  margin-bottom: 33px;
  letter-spacing: 0.3px;
`;

export const StyledFormField = styled.View`
position: relative;
width: 100%;
flex: 1;
align-items: stretch;
gap: 16px;
margin-bottom: 43px;

`;

export const StyledSubmitButton = styled.TouchableOpacity`
height: 51px;
background-color: #FF6C00;
width: 100%;
border-radius: 100px;
display: flex;
justify-content: center;
align-items: center;
margin-bottom: 16px;
`;

export const StyledUserImage = styled.View`
width: 120px;
height: 120px;
background-color: #F6F6F6;
border-radius: 16px;
position: absolute;
top: -60px;
`;
