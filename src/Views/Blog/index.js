import React, { Component } from 'react';

import DBService from '../../Services/DBService';
import './index.scss';
import logo from '../../img/Logo.png';
import PostsList from '../../Components/postsList';
import Loading from '../../Components/Loading';

class Blog extends Component {
    constructor(props){
        super(props);

        this.state = {
            loadingblog: true,
            posts: [],
        }
    }
    componentDidMount(){
        this.loadData();
    }
    loadData = async () => {
        try {
        const posts = await DBService.getContent("posts");
        this.setState({posts,loadingblog:false});
        } catch(error) {
            console.error(error)
        }
    }
    render() {
        const {posts,loadingblog} = this.state;
        return (
            <main>
                <div className="Logo"><img src={logo} alt="Atomic Diplomacy"/></div>
                <h1>Blog Section</h1>
                {loadingblog?<Loading />:<PostsList posts={posts} />}
            </main>
        );
    }
}

export default Blog;