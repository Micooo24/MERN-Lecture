import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import Create from './Create';
import Update from './Update';
import SinglePost from './SinglePost';
const RoutedApp = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" exact="true" element={<App />} />
                <Route path="/create" exact="true" element={<Create />} />
                <Route path="/post/:slug" exact="true" element={<SinglePost />} />
                <Route path="/edit/post/:slug" exact="true" element={<Update />} />
            </Routes>
        </Router>
    )
}

export default RoutedApp