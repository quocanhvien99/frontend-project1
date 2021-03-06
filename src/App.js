import React, { useContext, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ProtectedRoute from './routes/ProtectedRoute';
import Home from './routes/Home';
import Login from './routes/Login';
import Register from './routes/Register';
import Reports from './routes/Reports';
import Users from './routes/Users';
import Statistic from './routes/Statistic';
import Content from './routes/Content';
import SideBar from './components/SideBar';
import { UserContext } from './contexts/UserContext';
import './App.css';
import NavBar from './components/NavBar';

function App() {
	const { isLogin } = useContext(UserContext);
	const [activeSideBar, setActiveSideBar] = useState(false);

	return (
		<Router>
			<div className="App">
				{isLogin && (
					<SideBar
						activeSideBar={activeSideBar}
						setActiveSideBar={setActiveSideBar}
					/>
				)}
				<div className="right-side-container">
					{isLogin && <NavBar setActiveSideBar={setActiveSideBar} />}
					<Switch>
						<ProtectedRoute exact path="/" component={Home} />
						<Route path="/login" component={Login} />
						<Route path="/register" component={Register} />
						<ProtectedRoute exact path="/reports" component={Reports} />
						<ProtectedRoute exact path="/users" component={Users} />
						<ProtectedRoute exact path="/statistic" component={Statistic} />
						<ProtectedRoute exact path="/content" component={Content} />
					</Switch>
				</div>
			</div>
		</Router>
	);
}

export default App;
