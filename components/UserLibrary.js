import React, {Component} from 'react';
import Navbar from "./Navbar";
import CurrentUserPlaylist from "./CurrentUserPlaylist";
import CurrentUserLikes from "./CurrentUserLikes";
class UserLibrary extends Component {
    state = {tab:0}
    updateState(tabNew){
        this.setState({tab:tabNew})
    }
    renderContainer(){
        if(this.state.tab === 0){
            return (<CurrentUserLikes/>
                // <CurrentUserLikes />
            );
        }else if(this.state.tab === 1){
            return (<CurrentUserPlaylist/>
                // <CurrentUserPlayList />
            );
        }else{
            return ("Loading...");
        }
    }
    render() {
        return (
            <div className="container-fluid loggedin-user-profile">
                <Navbar/>
                <div className="container mt-4">
                    <div className="row custom-row-margin">
                        <div className="col-md-12 nav-pills-bg-custom">
                            <ul className="nav nav-pills">
                                <li className="btn nav-item active">
                                    <div onClick={(e) =>this.updateState(0)} className="nav-link active" data-toggle="tab">Likes</div>
                                </li>
                                <li className="btn nav-item">
                                    <div onClick={(e) =>this.updateState(1)} className="nav-link" data-toggle="tab">Playlist</div>
                                </li>
                            </ul>
                        </div>
                        <div className="col-md-12">
                            {this.renderContainer()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserLibrary;