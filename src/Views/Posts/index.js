import React, { Component } from 'react';

import DBService from '../../Services/DBService';
import './index.scss';
import logo from '../../img/Logo.png';
import PostsList from '../../Components/postsList';
import Loading from '../../Components/Loading';

class Posts extends Component {
    constructor(props){
        super(props);

        this.state = {
            loading: true,
            posts: [],
        }
    }
    componentDidMount(){
        this.loadData();
    }
    loadData = async () => {
        const {category} = this.props
        try {
        const posts = await DBService.getFilteredContent("posts","category",category);
        this.setState({posts,loading:false});
        } catch(error) {
            console.error(error)
        }
    }
    render() {
        const {posts,loading} = this.state;
        const {category} = this.props;
        return (
            <main className="Posts">
                <div className="Logo"><img src={logo} alt="Atomic Diplomacy"/></div>
                <h1>{category.charAt(0).toUpperCase()+category.slice(1)}</h1>
                {loading?<Loading />:<PostsList posts={posts} />}
            </main>
        );
    }
}

export default Posts;