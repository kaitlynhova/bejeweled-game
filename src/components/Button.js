import styled from 'styled-components';

export const Button = styled.button.attrs({ id: 'reset-button' })`
    background-color: ${props => props.theme.backgroundColors.button};
    border-radius: 100%;
    border: none;
    box-shadow: ${props => props.theme.boxShadow.button.base};
    color: ${props => props.theme.fontColors.p};
    display: inline-block;
    font-size: ${props => props.theme.fontSizes.p}px;
    font-weight: bold;
    letter-spacing: 1px;
    padding: ${props => props.theme.spacing.l}px;
    position: relative;
    text-decoration: none;
    &:active {
        box-shadow: ${props => props.theme.boxShadow.button.active};
        top: 8px;
    }
    &:focus {
        outline: 0;
    }   
    &:hover{
        cursor: pointer;
    }
`;
