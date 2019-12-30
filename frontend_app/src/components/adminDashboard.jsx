import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SideBar from './sidebar';
class AdminDashboard extends Component {
	state = {
		searches: []
	};
	async componentDidMount() {
		const { data } = await axios.get('http://pixaflickrsearchapp.herokuapp.com/api/history');
		this.setState({ searches: data });
		console.log(this.state.searches);
	}
	render() {
		return (
			<div className="container mt-5">
				<h2 className="h2">Admin Dash Board</h2>
				<h3 className="h3 text-center">Search History</h3>
				<hr />
				<div className="row">
					<div className="col-md-4">
						<SideBar />
					</div>
					<div className="col-md-8">
						<table className="table table-bordered text-center">
							<thead>
								<tr>
									<th>Search Term</th>
									<th>Search Date</th>
									<th># of results (PixaBay)</th>
									<th># of results (Flickr)</th>
								</tr>
							</thead>
							<tbody>
								{this.state.searches.map((search) => (
									<tr key={search._id}>
										<td>
											<Link to={`/history_detail/${search._id}`}>{search.search_term}</Link>
										</td>
										<td>{search.search_date.substring(0, 10)}</td>
										<td>{search.pixa_results}</td>
										<td>{search.flickr_results}</td>
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

export default AdminDashboard;
