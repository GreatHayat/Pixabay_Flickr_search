import React from 'react';
import { Link } from 'react-router-dom';
const SideBar = () => {
	return (
		<div className="list-group">
			<Link to="/admin_dashboard" className="list-group-item list-group-item-action active">
				Search History
			</Link>
			<Link to="/add_new_user" className="list-group-item list-group-item-action">
				Add New User
			</Link>
			<Link to="/users" className="list-group-item list-group-item-action">
				List of users
			</Link>
			<Link to="/search_images" className="list-group-item list-group-item-action">
				Search Images
			</Link>
		</div>
	);
};

export default SideBar;
