import React, {Component} from 'react';
import LoggedInUserProfile from "../../components/LoggedInUserProfile";

class Index extends Component {
    render() {
        return (
            <div>
                <LoggedInUserProfile />
            </div>
        );
    }
}
export function getServerSideProps(){

}
export default Index;