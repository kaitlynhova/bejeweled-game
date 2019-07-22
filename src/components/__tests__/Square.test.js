import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { theme, ThemeContext } from '../../theme';
import { Square } from '../Square'

describe('Square', () => {
    it('Has an Active style from the theme', () => {
        const square = renderer.create(
            <ThemeContext>
                <Square isActive={true} />
            </ThemeContext>
        ).toJSON();
        expect(square).toHaveStyleRule('box-shadow', theme.boxShadow.square.active);
    });
    it('Has a non active style from the theme', () => {
        const square = renderer.create(
            <ThemeContext>
                <Square isActive={false} />
            </ThemeContext>
        ).toJSON();
        expect(square).toHaveStyleRule('box-shadow', undefined);
    });
});
