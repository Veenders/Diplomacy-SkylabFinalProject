import React, { Component } from 'react';

import PostItem from './PostItem';

class PostsList extends Component {
    render() {
        const {posts} = this.props;
        return (
            <div>
                { posts.map(item=><PostItem post={item} key={item.id} />) }
            </div>
        );
    }
}

export default PostsList;