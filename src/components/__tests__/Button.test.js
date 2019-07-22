import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { theme, ThemeContext } from '../../theme';
import { Button } from '../Button'

describe('Button', () => {
    it('consumes the theme', () => {
        const button = renderer.create(
            <ThemeContext>
                <Button />
            </ThemeContext>
        ).toJSON();
        expect(button).toHaveStyleRule('background-color', theme.backgroundColors.button);
    });
});
