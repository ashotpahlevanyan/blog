import React, { Component } from 'react';
import { Alert } from 'reactstrap';

class MessageAlert extends Component {
	constructor(props) {
		super(props);

		this.state = {
			visible : false
		};

		this.onShowAlert = this.onShowAlert.bind(this);
	}

	componentDidMount() {
		this.onShowAlert(this.props.delay);
	}

	onShowAlert(delay) {
		this.setState({visible:true},()=>{
			window.setTimeout(()=>{
				this.setState({visible:false})
			}, delay)
		});
	}

	render() {
		const { color, message } = this.props;
		return (
			<Alert color={color} isOpen={this.state.visible}>
				{message}
			</Alert>
		);
	}
}

export default MessageAlert;