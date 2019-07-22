import styled from 'styled-components';

export const Screen = styled.div`
    border: ${props => props.theme.spacing.l}px solid white;
    display: flex;
    flex-direction: row-reverse;
    width: ${props => props.theme.widths.screen}px;
    @media only screen and (max-width: ${props => props.theme.breakpoints.s}px) {
        display: block;
    }
`;
