import React, {Component} from 'react';
import PostBlog from "../../components/PostBlog";

class Index extends Component {
    render() {
        return (
            <div>
                <PostBlog/>
            </div>
        );
    }
}
export function getServerSideProps(){

}
export default Index;