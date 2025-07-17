import styled from 'styled-components';
import { VarableIcon } from '../../styles/variables';
import { Icon } from '../icons/Icon';

function DropDownMenu({data, top, onFunction}) {
  return (
    <Container top={top}>
      {data.map((item, index) => {
        return (
          <DropDownItem key={index} onClick={() => onFunction(item)}>
            <Icon>{item.icono}</Icon>
            <span>{item.text}</span>
          </DropDownItem>
        );
      })}
    </Container>
  )
}

const Container = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  position: absolute;
  background-color: ${({ theme }) => theme.bg3};
  border-radius: 22px;
  top: ${(props) => props.top};
  box-shadow: ${() => VarableIcon.boxshadowGray};
  z-index: 1;
`;

const DropDownItem = styled.div`
  cursor: pointer;
  padding: 8px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 10px;

  &:hover {
    background-color: ${({ theme }) => theme.bg4};
  }

  svg {
    font-size: 28px;
    display: block;
  }
`;

export default DropDownMenu