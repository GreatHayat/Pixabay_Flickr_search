import React from 'react';
import { Link } from 'react-router-dom';
const Home = () => {
	return (
		<div className="container mt-5">
			<div className="jumbotron">
				<h1 class="display-4">PixaBay, Flickr!</h1>
				<p className="lead">
					Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laboriosam incidunt inventore placeat
					nostrum corrupti porro est at eveniet molestias facilis iure, eum, corporis repellendus, architecto
					minus? Repellendus pariatur quo, quidem aliquid ab ducimus doloremque, delectus autem iusto
					molestiae.
				</p>
				<hr class="my-4" />
				<p>
					It uses utility classes for typography and spacing to space content out within the larger container.
				</p>
				<Link to="/search_images" class="btn btn-primary btn-lg" role="button">
					Search Images
				</Link>
			</div>
		</div>
	);
};

export default Home;
