import React from 'react';
import { shallow, mount, render } from 'enzyme';

jest.dontMock('../../js/pages/PostsNew');

import PostsNew from '../../js/pages/PostsNew';

describe('Component Loads Correctly with Children', function() {

	it('should render correctly in "debug" mode', () => {
		const component = shallow(<PostsNew debug />);
		expect(component).toMatchSnapshot();
	});

});