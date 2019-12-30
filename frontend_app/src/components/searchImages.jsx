import React, { Component } from 'react';
import axios from 'axios';
import Pixabay from './Pixabay';
import Flickr from './Flickr';

class SearchImages extends Component {
	state = {
		search: '',
		pixabayUrls: [],
		flickrUrls: []
	};
	validator = () => {
		if (this.state.search.trim() === '') {
			return true;
		}
	};
	handleChange = (e) => {
		this.setState({ search: (e.target.name = e.target.value) });
	};

	handleSubmit = async () => {
		const { data } = await axios.get(`http://pixaflickrsearchapp.herokuapp.com/api/search/${this.state.search}`);
		this.setState({ pixabayUrls: data[0].responseFromPixabay });
		this.setState({ flickrUrls: data[1].responseFromFlickr });
		const history = {
			search_term: this.state.search,
			pixa_results: this.state.pixabayUrls.length,
			flickr_results: this.state.flickrUrls.length
		};
		const response = await axios.post('http://pixaflickrsearchapp.herokuapp.com/api/history', history);
		console.log(response);
		this.setState({ search: '' });
	};
	render() {
		return (
			<div className="container mt-5">
				<h2 className="h2">Search Images</h2>
				<hr />
				<div className="form-group">
					<input
						type="text"
						name="search"
						placeholder="Search Images"
						className="form-control"
						value={this.state.search}
						onChange={this.handleChange}
					/>
				</div>
				<div className="form-group">
					<button
						className="btn btn-outline-secondary btn-block"
						disabled={this.validator()}
						onClick={this.handleSubmit}
					>
						SEARCH
					</button>
				</div>
				<hr />

				<Pixabay urls={this.state.pixabayUrls} />
				<Flickr urls={this.state.flickrUrls} />
			</div>
		);
	}
}

export default SearchImages;
