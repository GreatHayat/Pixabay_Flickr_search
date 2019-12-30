import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SideBar from './sidebar';
class Users extends Component {
	state = {
		users: []
	};
	async componentDidMount() {
		const { data } = await axios.get('http://pixaflickrsearchapp.herokuapp.com/api/users', {
			headers: { 'x-auth-token': localStorage.getItem('token') }
		});
		this.setState({ users: data });
	}
	handleDelete = async (userId) => {
		const { data } = await axios.delete(`http://pixaflickrsearchapp.herokuapp.com/api/users/${userId}`, {
			headers: { 'x-auth-token': localStorage.getItem('token') }
		});
		const users = this.state.users.filter((user) => user._id !== userId);
		this.setState({ users });
		console.log(users);
	};
	render() {
		return (
			<div className="container mt-5">
				<h3 className="h3 text-center">List of Users</h3>
				<hr />
				<div className="row">
					<div className="col-md-4">
						<SideBar />
					</div>
					<div className="col-md-8">
						<table className="table table-bordered text-center">
							<thead>
								<tr>
									<th>Username</th>
									<th>Email</th>
									<th>Admin</th>
									<th colSpan="2">Action</th>
								</tr>
							</thead>
							<tbody>
								{this.state.users.map((user) => (
									<tr key={user._id}>
										<td>{user.username}</td>
										<td>{user.email}</td>
										<td>{user.isAdmin ? 'Yes' : 'No'}</td>
										<td>
											<Link to={`/edit_user/${user._id}`} className="btn btn-warning btn-sm">
												Edit
											</Link>
										</td>
										<td>
											<button
												className="btn btn-danger btn-sm"
												onClick={() => this.handleDelete(user._id)}
											>
												Delete
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		);
	}
}

export default Users;
