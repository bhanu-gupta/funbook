import {connect} from 'react-redux';
import Intro from './intro';
import {updateUserInfo} from '../../actions/auth_actions';

const mdp = dispatch => {
    return {
      updateUserInfo: (formData) => dispatch(updateUserInfo(formData))
    };
}

export default connect(null, mdp)(Intro);