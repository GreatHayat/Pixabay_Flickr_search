import React from 'react';

const Pixabay = (props) => {
	if (props.urls.length === 0) {
		return null;
	} else {
		return (
			<div className="container mt-3">
				<h2 className="h2">PixaBay API Search!</h2>
				<div className="row">
					{props.urls.map((url) => (
						<div className="col-md-4" key={url}>
							<img src={url} alt="" width="100%" hspace="5" />
						</div>
					))}
				</div>
			</div>
		);
	}
};

export default Pixabay;
