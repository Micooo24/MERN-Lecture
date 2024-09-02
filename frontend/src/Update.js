// import React from 'react'
// import Nav from './Nav';
// import axios from 'axios'
// import { useState } from 'react';   

// const [state, setState] = useState({
//     title: '',
//     content: '',
//     user: ''
// });
// const { title, content, user } = state
// // console.log(title,content,user)

// // function handleChange(name) {

// //     return function (event) {
// //         setState({ ...state, [name]: event.target.value });
// //     };
// // }

// const handleChange = name => event => {
//     // console.log('name', name, 'event', event.target.value);
//     setState({ ...state, [name]: event.target.value });
// };

// const handleSubmit = event => {
//     event.preventDefault();
//     // console.table({ title, content, user });
//     axios
//         .post(`${process.env.REACT_APP_API}/post`, { title, content, user })
//         .then(response => {
//             console.log(response);
//             // empty state
//             setState({ ...state, title: '', content: '', user: '' });
//             // show sucess alert
//             alert(`Post titled ${response.data.title} is created`);
//         })
//         .catch(error => {
//             console.log(error.response);
//             alert(error.response.data.error);
//         });
// };
// console.log(state)

// function Update() {
//   return (
//         <div className="container p-5">
//         <Nav title="update component" name="124" />
//         <h1>Update POST</h1>
//         <br />
//         <form onSubmit={handleSubmit}>
//             <div className="form-group">
//                 <label className="text-muted">Title</label>
//                 <input type="text" className="form-control" placeholder="Post title" required value={title} onChange={handleChange('title')} />
//             </div>
//             <div className="form-group">
//                 <label className="text-muted">Content</label>
//                 <textarea type="text" className="form-control" placeholder="Write something.." required value={content} onChange={handleChange('content')} />
//             </div>
//             <div className="form-group">
//                 <label className="text-muted">User</label>
//                 <input type="text" className="form-control" placeholder="Your name" required value={user} onChange={handleChange('user')} />
//             </div>
//             <div>
//                 <button className="btn btn-primary">Create</button>
//             </div>
//         </form>
//     </div>
//     )
// }

// export default Update


import React, { useState, useEffect } from 'react';
import Nav from './Nav';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const Update = () => {
    const [state, setState] = useState({
        title: '',
        content: '',
        user: ''
    });
    const { title, content, user } = state;

    // Get the slug from the URL
    const { slug } = useParams();
    const navigate = useNavigate();

    // Fetch the post data when the component mounts
    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API}/post/${slug}`)
            .then(response => {
                const { title, content, user } = response.data;
                setState({ ...state, title, content, user });
            })
            .catch(error => {
                console.log(error.response);
                alert('Error loading post data');
            });
    }, [slug]);

    const handleChange = name => event => {
        setState({ ...state, [name]: event.target.value });
    };

    const handleSubmit = event => {
        event.preventDefault();
        axios
            .put(`${process.env.REACT_APP_API}/edit/post/${slug}`, { title, content, user })
            .then(response => {
                console.log(response);
                alert(`Post titled "${response.data.title}" is updated`);
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
        <div className="container p-5">
            <Nav title="update component" name="124" />
            <h1>UPDATE POST</h1>
            <br />
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="text-muted">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Post title"
                        required
                        value={title}
                        onChange={handleChange('title')}
                    />
                </div>
                <div className="form-group">
                    <label className="text-muted">Content</label>
                    <textarea
                        className="form-control"
                        placeholder="Write something..."
                        required
                        value={content}
                        onChange={handleChange('content')}
                    />
                </div>
                <div className="form-group">
                    <label className="text-muted">User</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Your name"
                        required
                        value={user}
                        onChange={handleChange('user')}
                    />
                </div>
                <div>
                    <button className="btn btn-primary">Update</button>
                </div>
            </form>
        </div>
    );
};

export default Update;
