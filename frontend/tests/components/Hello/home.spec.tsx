import React from 'react';
import renderer from 'react-test-renderer';

import Home from '@views/home/home';

describe('Hello component', () => {
    test('should render component properly', () => {
        // given

        // when
        const componentRenderer = renderer.create(<Home />);
        const tree = componentRenderer.toJSON();

        // then
        expect(tree).toMatchSnapshot();
    });
});
