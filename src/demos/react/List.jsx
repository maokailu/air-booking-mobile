import React from 'react';
function ListItem(props) {
    // 对啦！这里不需要指定key:
    return <li>{props.value}</li>;
}
  
export default function NumberList(props) {
    const posts = props.posts;
    return (
        <ul>
            {/* 在jsx中嵌入map() */}
        {
            posts.map((post) =>
            // 又对啦！key应该在数组的上下文中被指定
                <ListItem key={post.id} value={post.title} />
            )
        }
        </ul>
    );
}