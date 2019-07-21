import styled from 'styled-components';

export const Square = styled.div`
    align-items: center;
    cursor: pointer;
    background-color: ${props => props.theme.jewelColors[props.colorIndex]};
    box-shadow: ${props => props.isActive && props.theme.boxShadow.square.active};
    display: flex;
    justify-content: center;
    transition: 1s;
    &:hover{
        box-shadow: ${props => props.theme.boxShadow.square.active};
    }
`;
