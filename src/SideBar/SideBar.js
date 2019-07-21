import styled from 'styled-components';
import { Button } from '../Button/Button'
import React from 'react';

const S = {
    Content: styled.div``,
    Score: styled.div`
        color: white;
        display: flex;
        font-size: ${props => props.theme.fontSizes.p}px;
        align-items: center;
        justify-content: center;
        h2{
            margin-top: 0;
            padding-right: ${props => props.theme.spacing.l}px;
        }
    `,
    Wrapper: styled.div`
        align-items: center;
        background: ${props => props.theme.backgroundColors.screen};
        display: flex;
        flex: 1;
        justify-content: center;
        padding: ${props => `${props.theme.spacing.l}px ${props.theme.spacing.m}px`};
    `,
};

export const SideBar = (props) => (
    <S.Wrapper>
        <S.Content>
            <S.Score><h2>Score: {props.score}</h2></S.Score>
            <Button onClick={() => props.resetColors()}>RESET!</Button>
        </S.Content>
    </S.Wrapper>
)
