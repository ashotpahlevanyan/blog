import React from 'react';
import { shallow, mount, render } from 'enzyme';

jest.dontMock('../../js/components/PostsForm');

import PostsForm from '../../js/components/PostsForm';

describe('Component Loads Correctly with Children', function() {

	it('should render correctly in "debug" mode', () => {
		const component = shallow(<PostsForm debug />);
		expect(component).toMatchSnapshot();
	});

});