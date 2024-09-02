import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Nav from './Nav';
import { Link } from 'react-router-dom';



const SinglePost = () => {

    const [post, setPost] = useState('');
    let { slug } = useParams();
    console.log(slug);

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API}/post/${slug}`)
            .then(response => setPost(response.data))
            // .then(response => console.log(response))
            .catch(error => alert('Error loading single post'));
    }, [slug]);


    // for delete 
    const [state, setState] = useState({
        title: '',
        content: '',
        user: ''
    });
    const { title, content, user } = state;

    // Get the slug from the URL
    // const { slug } = useParams();
    const navigate = useNavigate();

    const handleSubmit = event => {
        event.preventDefault();
        axios
            .delete(`${process.env.REACT_APP_API}/delete/post/${slug}`, { title, content, user })
            .then(response => {
                console.log(response);
                alert(`Post titled "${response.data.title}" is deleted`);
                navigate('/'); // Redirect to the list of posts
            })
            .catch(error => {
                console.log(error.response);
                alert(error.response.data.error);
            });
    };

    console.log({handleSubmit});
    console.log( title, content, user);


    return (

        <div className="container pb-5">
            <Nav />
            <br />
            <h1>{post.title}</h1>
            <p className="lead">{post.content}</p>
            <p>
                Author <span className="badge">{post.user}</span> Published on{' '}
                <span className="badge">{new Date(post.createdAt).toLocaleString()}</span>
            </p>
            <Link to={`/edit/post/${slug}`} className="btn btn-primary">
                Edit Post 
            </Link>
            <form onSubmit={handleSubmit}>
                <div>
                    <button className="btn btn-primary">Delete</button>
                </div>
            </form>
                
            {/* <Link to={`/delete/post/${slug}`} className="btn btn-primary">
                Delete Post
            </Link> */}

        </div>
    );
};

export default SinglePost;