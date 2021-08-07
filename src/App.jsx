import React, {useEffect, useState} from 'react';
import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';
import './_app.scss';
import {useSelector} from 'react-redux';
import 'moment/locale/vi';

const HomeScreen = React.lazy(() => import('containers/homeScreen/HomeScreen'))
const LoginScreen = React.lazy(() => import('containers/loginScreen/Login'));
const WatchScreen = React.lazy(() => import('containers/watchScreen/WatchScreen'));
const SearchScreen = React.lazy(() => import('containers/searchScreen/SearchScreeen'));


function Layout({ children }) {

    const [sidebar, toggleSidebar] = useState(false);
    const handleToggleSidebar = () => toggleSidebar(!sidebar);
    const { accessToken, loading } = useSelector(state => state.auth);

    const history = useHistory();

    useEffect(() => {
        if (!loading && !accessToken) {
            history.push('/auth');
        }
    }, [accessToken, loading, history]);

    return (
        <>
            <Header toggleSidebar={handleToggleSidebar} />
            <div className="app__container">
                <Sidebar
                    sidebar={sidebar}
                    toggleSidebar={handleToggleSidebar}
                />
                <Container fluid className="app_main">
                    { children }
                </Container>
            </div>
        </>
    )
}

export default function App() {
    return (
        <>
            <Router>
                <React.Suspense
                    fallback={<div className='d-block mx-auto'>Loading...</div>}>
                    <Switch>
                        <Route path="/" exact>
                            <Layout>
                                <HomeScreen />
                            </Layout>
                        </Route>
                        <Route path="/auth" exact>
                            <LoginScreen />
                        </Route>
                        <Route path="/search/:query" exact>
                            <Layout>
                                <SearchScreen />
                            </Layout>
                        </Route>
                        <Route path="/watch/:id" exact>
                            <Layout>
                                <WatchScreen />
                            </Layout>
                        </Route>
                    </Switch>
                </React.Suspense>
            </Router>
        </>
    )
}
