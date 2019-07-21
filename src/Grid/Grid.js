import styled from 'styled-components';

export const Grid = styled.div`
    border: ${props => props.theme.grid.gap.l}px solid ${props => props.theme.backgroundColors.grid};
    display: grid;
    flex: 2;
    grid-template-columns: repeat(8, 1fr);
    grid-template-rows: repeat(8, 1fr);
    grid-gap: ${props => props.theme.grid.gap.l}px;
    background: ${props => props.theme.backgroundColors.grid};
    &::before {
        content: '';
        width: 0;
        padding-bottom: 100%;
        grid-row: 1 / 1;
        grid-column: 1 / 1;
    }
    > *:first-child {
        grid-row: 1 / 1;
        grid-column: 1 / 1;
    }
    @media only screen and (max-width: ${props => props.theme.breakpoints.s}px) {
        border: ${props => props.theme.grid.gap.s}px solid ${props => props.theme.backgroundColors.grid};
        grid-gap: ${props => props.theme.grid.gap.s}px;
    }
`;
