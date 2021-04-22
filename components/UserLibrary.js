import React, {Component} from 'react';
import Navbar from "./Navbar";
class UserLibrary extends Component {
    state = {tab:0}
    updateState(tabNew){
        this.setState({tab:tabNew})
    }
    renderContainer(){
        if(this.state.tab === 0){
            return (<div></div>
                // <CurrentUserLikes />
            );
        }else if(this.state.tab === 1){
            return (<div></div>
                // <CurrentUserPlayList />
            );
        }else{
            return ("Loading...");
        }
    }
    render() {
        return (
            <div>
                
            </div>
        );
    }
}

export default UserLibrary;