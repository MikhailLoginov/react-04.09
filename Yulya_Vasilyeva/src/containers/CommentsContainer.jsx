//компоненты React
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import Comments from 'components/Comments';
import { mountEventCommentsList } from 'actions/comments';

//для проверки свойств компонента
import PropTypes from 'prop-types';

class CommentsContainer extends PureComponent {
    componentDidMount() {
        const { mountEventCommentsList } = this.props;
        mountEventCommentsList();
    }

    render() {
        const { comments } = this.props;
        return (
            <Comments comments={comments} />
        );
    }
}
function mapStateToProps(state, ownProps){
    CommentsContainer.propTypes = {
        comments: PropTypes.arrayOf(PropTypes.object) 
    }
    return{
        ...ownProps,
        comments: state.comments.commentsList,
    }
}
function mapDispatchToProps(dispatch, props){
    return{
        ...props,
        mountEventCommentsList: () => mountEventCommentsList(dispatch),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CommentsContainer);