import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class AddNewUser extends Component {
	state = {
		user: { username: '', email: '', password: '' },
		error: ''
	};
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
			email: user.email,
			password: user.password
		};
		try {
			const response = await axios.post('http://pixaflickrsearchapp.herokuapp.com/api/users', data);
			this.props.history.push('/users');
		} catch (ex) {
			if (ex.response && ex.response.status === 400) {
				this.setState({ error: ex.response.data });
			}
		}
	};
	render() {
		const { user, error } = this.state;
		return (
			<div className="container mt-5">
				<h3 className="h3">Add New User</h3>
				<hr />
				<div className="row">
					<div className="col-md-12">
						<div className="card">
							<div className="card-header">Add User</div>
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
										<label htmlFor="password" className="label-control">
											Password
										</label>
										<input
											type="password"
											name="password"
											placeholder="Password"
											className="form-control"
											value={user.password}
											onChange={this.handleChange}
										/>
									</div>

									<div className="form-group">
										<button className="btn btn-outline-primary btn-block">Add New User</button>
									</div>
								</form>
							</div>
							<div className="card-footer">
								<Link to="/users" className="btn btn-primary btn-sm">
									Go Back
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default AddNewUser;
