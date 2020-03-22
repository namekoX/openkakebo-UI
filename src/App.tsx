import * as React from 'react';
import { Route, Switch } from "react-router-dom";
import LoginContainer from './containers/LoginContainer';
import { NotFound } from './components/NotFound';
import { RootState } from './states/AppReducer';
import ReactGA from 'react-ga';
import Const from './common/const';
import SocialLoginContainer from './containers/SocialLoginContainer';
import LogoutContainer from './containers/LogoutContainer';
import NaviContainer from './containers/NaviContainer';
import PublicContainer from './containers/PublicContainer';
import MenuContainer from './containers/MenuContainer';
import { Howto } from './components/Howto';
import { Landing } from './components/Landing';

interface OwnProps {
  location?: Location;
}
interface Location {
  pathname: string;
}

type AppProps = OwnProps & RootState;

export const App: React.FC<AppProps> = (props: AppProps) => {
  React.useEffect(() => {
    if (props.location !== undefined) {
      ReactGA.set({ page: Const.SITE_ROOT + props.location.pathname });
      ReactGA.pageview(Const.SITE_ROOT + props.location.pathname);
    }
  }, [])
  return (
    <div>
      {<NaviContainer />}
      <React.Fragment>
        <br />
        <div>
          <Switch>
            <Route exact path={Const.SITE_ROOT + '/howto'} component={Howto} />
            <Route exact path={Const.SITE_ROOT + '/'} component={Landing} />
            <Route path={Const.SITE_ROOT + '/menu'}  component={props.isLogin ? MenuContainer : LoginContainer} />
            <Route exact path={Const.SITE_ROOT + '/login'} component={props.isLogin ? MenuContainer : LoginContainer} />
            <Route path={Const.SITE_ROOT + '/sociallogin/:token'} component={props.isLogin ? MenuContainer : SocialLoginContainer} />
            <Route exact path={Const.SITE_ROOT + '/logout'} component={LogoutContainer} />
            <Route exact path={Const.SITE_ROOT + '/public/:id'} component={PublicContainer} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </React.Fragment>
    </div>
  );
}
