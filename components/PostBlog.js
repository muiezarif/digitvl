import React, {Component} from 'react';
import {connect} from "react-redux";
import Navbar from "./Navbar";
import {postBlog} from "../actions";
import {store} from "react-notifications-component";
class PostBlog extends Component {
    state = {blogTitle:"",youtubeLink:"",blogBody:"",imageFile:null}
    render() {
        return (
            <div>
                
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        postBlogResponse:state.postBlog.postBlogData
    }
}
export default connect(mapStateToProps,{postBlog})(PostBlog);