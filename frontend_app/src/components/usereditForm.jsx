import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class EditForm extends Component {
	state = {
		user: { username: '', email: '' },
		error: ''
	};
	async componentDidMount() {
		const { data } = await axios.get(`http://pixaflickrsearchapp.herokuapp.com/api/users/${this.props.match.params.id}`);
		const result = {
			username: data.username,
			email: data.email
		};
		this.setState({ user: result });
	}
	handleChange = ({ currentTarget: input }) => {
		const { user } = this.state;
		user[input.name] = input.value;
		this.setState({ user });
	};
	handleSubmit = async (e) => {
		e.preventDefault();
		const { user } = this.state;
		const data = {
			username: user.username,
			email: user.email
		};
		try {
			const response = await axios.put(`http://pixaflickrsearchapp.herokuapp.com/api/users/${this.props.match.params.id}`, data, {
				headers: { 'x-auth-token': localStorage.getItem('token') }
			});
			this.props.history.push('/users');
		} catch (ex) {
			if (ex.response && ex.response.status === 404) {
				this.setState({ error: ex.response.data });
			}
		}
	};
	render() {
		const { user, error } = this.state;
		return (
			<div className="container mt-5">
				<h3 className="h3">Edit User Details</h3>
				<hr />
				<div className="row">
					<div className="col-md-12">
						<div className="card">
							<div className="card-header">Update User</div>
							{error && <div className="alert alert-danger">{error}</div>}
							<div className="card-body">
								<form onSubmit={this.handleSubmit}>
									<div className="form-group">
										<label htmlFor="username" className="label-control">
											Username
										</label>
										<input
											type="text"
											name="username"
											placeholder="Username"
											className="form-control"
											value={user.username}
											onChange={this.handleChange}
										/>
									</div>
									<div className="form-group">
										<label htmlFor="email" className="label-control">
											Email
										</label>
										<input
											type="email"
											name="email"
											placeholder="Email"
											className="form-control"
											value={user.email}
											onChange={this.handleChange}
										/>
									</div>

									<div className="form-group">
										<button className="btn btn-outline-primary btn-block">Update</button>
									</div>
								</form>
							</div>
							<div className="card-footer">
								<Link to="/users" className="text-muted">
									Go back
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default EditForm;
