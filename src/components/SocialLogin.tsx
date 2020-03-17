import * as React from 'react';
import { Actions } from '../containers/SocialLoginContainer';
import { RootState } from '../states/AppReducer';
import { SpinnerButton } from '../common/SpinnerButton';

interface OwnProps {
  match: Match;
  location?: Location;
}
interface Match {
  params: Params;
}
interface Params {
  token: string;
}
interface Location {
  pathname: string;
}

type UserProps = OwnProps & RootState & Actions;

export const SocialLogin: React.FC<UserProps> = (props: UserProps) => {
  React.useEffect(() => {
    const token = props.match.params.token;
    props.toTop(token);
  }, [])
  return (
    <SpinnerButton></SpinnerButton>
  );
};