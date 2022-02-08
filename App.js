import {Route, Router, Switch} from 'react-router-dom';
import {InputDispatcherProvider, SharedElementProvider, SpatialNavProvider, ThemeProvider} from 'context';
import {GlobalLoader, GlobalMessageBox, GlobalNavigation, GlobalPwaInstructions, GlobalStyle} from 'components';
import * as Screen from 'screens';
import history from 'app/history';
import Routes from 'app/routes';
import 'api/client';
import 'normalize.css';
import 'i18n';
import {isMobileOrTablet, isTV} from 'app/device';
import {If} from 'helpers';
import {BuildVersion} from 'components/ui/debug/BuildVersion';
import {ErrorBoundaryWrapper} from 'components/error-boundary/ErrorBoundary';

export default function App() {
    return (
        <ThemeProvider>
            <GlobalStyle/>
            <ErrorBoundaryWrapper>
                <InputDispatcherProvider>
                    <SharedElementProvider renderTo="root">
                        <SpatialNavProvider debugDraw={false} debug={false}>
                            <If condition={!isTV && process.env.REACT_APP_SHOW_BUILD_VERSION === 'true'}>
                                <BuildVersion/>
                            </If>
                            <If condition={!isTV && isMobileOrTablet && process.env.NODE_ENV !== 'development'}>
                                <GlobalPwaInstructions debug={false}/>
                            </If>
                            <GlobalLoader/>
                            <GlobalMessageBox/>
                            <GlobalNavigation/>
                            <Router history={history}>
                                <Switch>
                                    <Route exact path={Routes.LOGIN} component={Screen.LoginScreen}/>
                                    <Route path={Routes.MEGA_LOADER} component={Screen.MegaLoaderScreen}/>
                                    <Route path={Routes.TERMS_AND_CONDITIONS} component={Screen.TermsAndConditionsScreen}/>
                                    <Route path={Routes.PROFILE_SELECTION} component={Screen.ProfileSelectionScreen}/>
                                    <Route path={Routes.PROFILE_EDITOR} component={Screen.ProfileEditorScreen}/>
                                    <Route path={Routes.PASSWORD_CHECK} component={Screen.PasswordCheckScreen}/>
                                    <Route path={Routes.PIN_CODE_CHECK} component={Screen.PinCodeCheckScreen}/>
                                    <Route path={Routes.PROFILE_MANAGER} component={Screen.ProfileManagerScreen}/>
                                    <Route path={Routes.GAMES.HIGHLIGHTS} component={Screen.HighLightsScreen}/>
                                    <Route path={Routes.GAMES.CHARTS} component={Screen.ChartsScreen}/>
                                    <Route path={Routes.GAMES.CATEGORIES} component={Screen.CategoriesScreen}/>
                                    <Route path={Routes.GAMES.SEARCH} component={Screen.SearchScreen}/>
                                    <Route path={Routes.GAMES.FAVORITES} component={Screen.FavoritesScreen}/>
                                    <Route path={Routes.ACCOUNT_RECOVERY} component={Screen.AccountRecoveryScreen}/>
                                </Switch>
                            </Router>
                        </SpatialNavProvider>
                    </SharedElementProvider>
                </InputDispatcherProvider>
            </ErrorBoundaryWrapper>
        </ThemeProvider>
    );
}
