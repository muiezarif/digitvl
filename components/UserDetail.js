import React, {Component} from 'react';
import Navbar from "./Navbar";
class UserDetail extends Component {
    render() {
        return (
            <div>
                <Navbar/>
                User Detail {this.props.params.username_slug}
            </div>
        );
    }
}

export default UserDetail;