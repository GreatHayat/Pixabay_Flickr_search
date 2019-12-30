import React from 'react';
import { Route, Switch } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import Navbar from './components/navbar';
import RegisterForm from './components/registerForm';
import LoginForm from './components/loginForm';
import Logout from './components/logout';
import PrivateRoute from './commons/privateRoute';
import AdminDashboard from './components/adminDashboard';
import SearchImages from './components/searchImages';
import HistoryDetails from './components/history_details';
import Home from './components/home';
import Users from './components/usersList';
import EditForm from './components/usereditForm';
import AddNewUser from './components/addnewuser';

class App extends React.Component {
	state = {};
	componentDidMount() {
		try {
			const token = localStorage.getItem('token');
			const user = jwtDecode(token);
			this.setState({ user });
		} catch (ex) {}
	}
	render() {
		return (
			<div className="App">
				<Navbar user={this.state.user} />
				<Switch>
					<Route path="/register" component={RegisterForm} />
					<Route path="/login" component={LoginForm} />
					<Route path="/logout" component={Logout} />
					<PrivateRoute path="/admin_dashboard" component={AdminDashboard} />
					<PrivateRoute path="/search_images" component={SearchImages} />
					<PrivateRoute path="/history_detail/:id" component={HistoryDetails} />
					<PrivateRoute path="/users" component={Users} />
					<PrivateRoute path="/edit_user/:id" component={EditForm} />
					<PrivateRoute path="/add_new_user" component={AddNewUser} />
					<Route path="/" component={Home} />
				</Switch>
			</div>
		);
	}
}

export default App;
