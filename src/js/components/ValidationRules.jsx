import React from 'react';
import {
	FormGroup,
	Label,
	Alert
} from 'reactstrap';
import { Field } from 'redux-form';

const required = value => (value ? undefined : 'Required');

const maxLength = max => value =>
	value && value.length > max ? `Must be ${max} characters or less` : undefined;

const maxLength15 = maxLength(15);

const minLength = min => value =>
	value && value.length < min ? `Must be ${min} characters or more` : undefined;

const minLength2 = minLength(2);

const number = value =>
	value && isNaN(Number(value)) ? 'Must be a number' : undefined;

const minValue = min => value =>
	value && value < min ? `Must be at least ${min}` : undefined;

const minValue13 = minValue(13);

const email = value =>
	value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
		? 'Invalid email address'
		: undefined;

const tooYoung = value =>
	value && value < 13
		? 'You do not meet the minimum age requirement!'
		: undefined;

const aol = value =>
	value && /.+@aol\.com/.test(value)
		? 'Really? You still use AOL for your email?'
		: undefined;

const alphaNumeric = value =>
	value && /[^a-zA-Z0-9 ]/i.test(value)
		? 'Only alphanumeric characters'
		: undefined;

const phoneNumber = value =>
	value && !/^(0|[1-9][0-9]{9})$/i.test(value)
		? 'Invalid phone number, must be 10 digits'
		: undefined;

const renderField = ({
	input,
	label,
	type,
	placeholder,
	className,
	color,
	meta: { touched, error, warning }
}) => (
	<FormGroup>
		<Label>{label}</Label>
		<input {...input} placeholder={placeholder} type={type} className={className} color={color}/>
		{touched &&
		((error && <Alert color="danger">{error}</Alert>) ||
		(warning && <Alert color="warning">{warning}</Alert>))}
	</FormGroup>
);

const renderTextArea = ({
	input,
	label,
	type,
	placeholder,
	className,
	color,
	meta: { touched, error, warning }
}) => (
	<FormGroup>
		<Label>{label}</Label>
		<textarea {...input} placeholder={placeholder} type={type} className={className} color={color}/>
		{touched &&
		((error && <Alert color="danger">{error}</Alert>) ||
		(warning && <Alert color="warning">{warning}</Alert>))}
	</FormGroup>
);

export default {
	required,
	maxLength,
	minLength,
	number,
	minValue,
	email,
	alphaNumeric,
	phoneNumber,
	renderField,
	renderTextArea,
	maxLength15,
	minLength2,
	minValue13,
	tooYoung,
	aol
};
