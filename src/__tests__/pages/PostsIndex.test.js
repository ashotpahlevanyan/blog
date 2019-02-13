import React from 'react';
import { shallow, mount, render } from 'enzyme';

jest.dontMock('../../js/pages/PostsIndex');

import PostsIndex from '../../js/pages/PostsIndex';

describe('Component Loads Correctly with Children', function() {

	it('should render correctly in "debug" mode', () => {
		const component = shallow(<PostsIndex debug />);
		expect(component).toMatchSnapshot();
	});

});