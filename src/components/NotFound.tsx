import * as React from 'react';
import { Link } from 'react-router-dom';
import { Br } from '../common/Br';
import Const from '../common/const';

interface OwnProps {
  location?: Location;
}
interface Location {
  pathname: string;
}

export class NotFound extends React.Component {
  constructor (props:any) {
    super(props);
  }
  render () {
    return (
      <div className="padding10">
        不正なURLです
        <Br count={1} />
        <Link to= {Const.SITE_ROOT + "/menu/summary"}>トップへ戻る</Link>
      </div >
    );
  }
};
