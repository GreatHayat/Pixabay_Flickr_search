import React, { Component } from 'react';
import axios from 'axios';
import Pixabay from './Pixabay';
import Flickr from './Flickr';
class HistoryDetails extends Component {
	state = {
		pixabayUrls: [],
		flickrUrls: []
	};
	async componentDidMount() {
		const { data } = await axios.get(`http://pixaflickrsearchapp.herokuapp.com/api/history/${this.props.match.params.id}`);
		const response = await axios.get(`http://pixaflickrsearchapp.herokuapp.com/api/search/${data.search_term}`);
		this.setState({ pixabayUrls: response.data[0].responseFromPixabay });
		this.setState({ flickrUrls: response.data[1].responseFromFlickr });
	}
	render() {
		return (
			<div className="container mt-5">
				<h2 className="h2">Search Details Results</h2>
				<hr />
				<Pixabay urls={this.state.pixabayUrls} />
				<Flickr urls={this.state.flickrUrls} />
			</div>
		);
	}
}

export default HistoryDetails;
