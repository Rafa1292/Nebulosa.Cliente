import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Layout from '@containers/Layout';
import Home from '@pages/Home';
import Login from '@pages/Login';
import PasswordRecovery from '@pages/PasswordRecovery';
import SendEmail from '@pages/SendEmail';
import NewPassword from '@pages/NewPassword';
import NotFound from '@pages/NotFound';
import CreateAccount from '@pages/CreateAccount';
import AppContext from '../context/AppContext';
import useInitialState from '../hooks/useInitialState';
import '@styles/global.css';

const App = () => {
	const initialState = useInitialState();
	return (
		<AppContext.Provider value={initialState}>
			<BrowserRouter>
				<Layout>
					<Switch>
						<Route exact path="/" component={Home} />
						<Route exact path="/login" component={Login} />
						<Route exact path="/password-recovery" component={PasswordRecovery} />
						<Route exact path="/send-email" component={SendEmail} />
						<Route exact path="/new-password/:token" component={NewPassword} />
						<Route exact path="/signup" component={CreateAccount} />
						<Route path="*" component={NotFound} />
					</Switch>
				</Layout>
			</BrowserRouter>
		</AppContext.Provider>
	);
}

export default App;
