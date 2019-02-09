import React from 'react';
import { shallow, mount, render } from 'enzyme';

jest.dontMock('./FormContainer');

import FormContainer from './FormContainer';

describe('Component Loads Correctly with Children', function() {
	it('has a specified class', function() {
		const component = <FormContainer text='Hello' />;
		console.log(shallow(component).className);
		expect(shallow(component).is('.article-form'));
	});

	it('should render correctly in "debug" mode', () => {
		const component = shallow(<FormContainer debug />);
		expect(component).toMatchSnapshot();
	});

	it('contains a child h1', function() {
		expect(render(<FormContainer text='Hello' />).find('h1').length).toBe(1);
	});
});