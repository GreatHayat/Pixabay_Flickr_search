import React from 'react';
import { Link } from 'react-router-dom';
const Navbar = (props) => {
	return (
		<div>
			<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
				<div className="container">
					<Link className="navbar-brand" to="/">
						Images Search App!
					</Link>
					<ul className="navbar-nav float-right">
						{!props.user && (
							<React.Fragment>
								<Link to="/register" className="btn btn-primary">
									Register
								</Link>
								<Link to="/login" className="btn btn-primary ml-3">
									Login
								</Link>
							</React.Fragment>
						)}
						{props.user && (
							<React.Fragment>
								<li className="nav-item dropdown">
									<a
										className="nav-link dropdown-toggle"
										href="#"
										id="navbarDropdownMenuLink"
										role="button"
										data-toggle="dropdown"
										aria-haspopup="true"
										aria-expanded="false"
									>
										{props.user.username}
									</a>
									<div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
										{props.user.isAdmin && (
											<Link className="dropdown-item" to="/admin_dashboard">
												Dashboard
											</Link>
										)}
										<Link className="dropdown-item" to="/search_images">
											Search Images
										</Link>
										<Link className="dropdown-item" to="/logout">
											Logout
										</Link>
									</div>
								</li>
							</React.Fragment>
						)}
					</ul>
				</div>
			</nav>
		</div>
	);
};

export default Navbar;
