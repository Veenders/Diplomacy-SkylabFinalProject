import React from 'react';

const PostItem = (props) => {
    const {title, content} = props.post;
    return (
        <article>
            <h3>{title}</h3>
            <div>{content}</div>
        </article>
    );
};

export default PostItem;