import React, {Component} from 'react';
import Blogs from "../../components/Blogs";

class index extends Component {
    render() {
        return (
            <div>
                <Blogs />
            </div>
        );
    }
}
export function getServerSideProps(){

}
export default index;