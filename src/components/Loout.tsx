import * as React from 'react';
import { Actions } from '../containers/LogoutContainer';
import { UserState } from '../states/UserReducer';
import { Br } from '../common/Br';
import Const from '../common/const';
import { Link } from 'react-router-dom';

type UserProps = UserState & Actions;

export const Logout: React.FC<UserProps> = (props: UserProps) => {
  React.useEffect(() => {
    props.onLogout();
  }, [])
  return (
    <div className="padding10">
      ログアウトしました
      <Br count={1} />
      <Link to={Const.SITE_ROOT + "/"}>トップへ戻る</Link>
    </div >
  );
};