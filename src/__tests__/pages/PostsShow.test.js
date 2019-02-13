import React from 'react';
import { shallow, mount, render } from 'enzyme';

jest.mock('../../js/pages/PostsShow');

import PostsShow from '../../js/pages/PostsShow';

describe('Component Loads Correctly with Children', function() {

	it('should render correctly in "debug" mode', () => {
		const component = shallow(<PostsShow debug />);
		expect(component).toMatchSnapshot();
	});

});