import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as apiActions from './actions/apiActions';
import * as photoActions from './actions/photoActions';
import App from './App';

const mapStateToProps = (state) => {
	return {
		apiRes: state.apiRes,
		api: state.api,
		projects: state.projects,
	    currentApi: state.currentApi,
	    powerRankings: state.powerRankings,
	    posts: state.posts,
	    comments: state.comments,
	    user: state.user
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		actions: {
			apiActions: bindActionCreators(apiActions, dispatch),
			photoActions: bindActionCreators(photoActions, dispatch)
		}
	}
}

const AppConnect = connect(
	mapStateToProps, 
	mapDispatchToProps
)(App);

export default AppConnect;