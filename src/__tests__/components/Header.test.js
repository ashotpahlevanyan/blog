import React from 'react';
import { shallow, mount, render } from 'enzyme';

jest.mock('../../js/components/Header', () => "postsIndex");

import Header from '../../js/components/Header';

describe('Component Loads Correctly with Children', function() {

	it('should render correctly in "debug" mode', () => {
		const component = shallow(<Header debug />);
		expect(component).toMatchSnapshot();
	});

});