import * as React from 'react';
import { Route, Switch } from "react-router-dom";
import LoginContainer from './containers/LoginContainer';
import { NotFound } from './components/NotFound';
import { RootState } from './states/AppReducer';
import ReactGA from 'react-ga';
import Const from './common/const';
import SocialLoginContainer from './containers/SocialLoginContainer';
import CategoryContainer from './containers/CategoryContainer';
import KozaContainer from './containers/KozaContainer';
import InputContainer from './containers/InputContainer';
import RirekiContainer from './containers/RirekiContainer';
import LogoutContainer from './containers/LogoutContainer';
import NaviContainer from './containers/NaviContainer';
import { isNotSocial } from './common/utils';
import SummaryContainer from './containers/SummaryContainer';
import PublicContainer from './containers/PublicContainer';

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
            {/*  <Route exact path={Const.SITE_ROOT + '/'} component={props.isLogin? MenuContainer : LoginContainer} />
            <Route path={Const.SITE_ROOT + '/menu'}  component={MenuContainer} />
            <Route exact path={Const.SITE_ROOT + '/login'} component={props.isLogin ? MenuContainer : LoginContainer} />
            <Route exact path={Const.SITE_ROOT + '/logout'} component={Logout} />
            <Route exact path={Const.SITE_ROOT + '/howto'} component={Howto} />*/}
            <Route exact path={Const.SITE_ROOT + '/'} component={LoginContainer} />
            <Route exact path={Const.SITE_ROOT + '/login'} component={LoginContainer} />
            <Route path={Const.SITE_ROOT + '/sociallogin/:token'} component={SocialLoginContainer} />
            {isNotSocial() &&
                <Route exact path={Const.SITE_ROOT + '/changepassword'} component={LoginContainer} />
            }
            {isNotSocial() &&
                <Route exact path={Const.SITE_ROOT + '/changeid'} component={LoginContainer} />
            }
            <Route exact path={Const.SITE_ROOT + '/category/shunyu'} component={CategoryContainer} />
            <Route exact path={Const.SITE_ROOT + '/category/shishutu'} component={CategoryContainer} />
            <Route exact path={Const.SITE_ROOT + '/koza'} component={KozaContainer} />
            <Route exact path={Const.SITE_ROOT + '/input/shunyu'} component={InputContainer} />
            <Route exact path={Const.SITE_ROOT + '/input/shishutu'} component={InputContainer} />
            <Route exact path={Const.SITE_ROOT + '/input/hurikae'} component={InputContainer} />
            <Route exact path={Const.SITE_ROOT + '/rireki'} component={RirekiContainer} />
            <Route exact path={Const.SITE_ROOT + '/logout'} component={LogoutContainer} />
            <Route exact path={Const.SITE_ROOT + '/summary'} component={SummaryContainer} />
            <Route exact path={Const.SITE_ROOT + '/public/:id'} component={PublicContainer} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </React.Fragment>
    </div>
  );
}
