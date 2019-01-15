import React, { Component } from 'react';

import PostItem from './PostItem';

class PostsList extends Component {
    constructor(props){
        super(props);

        this.state={
            loading:false,
        }
    }
    componentDidMount(){
        this.setState({loading:true});
    }
    render() {
        const {posts} = this.props;
        return (
            <React.Fragment>
                {posts.map(item=><PostItem post={item} key={item.id} />)}
            </React.Fragment>
        );
    }
}

export default PostsList;