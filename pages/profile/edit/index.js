import React, {Component} from 'react';
import UserProfileEdit from "../../../components/UserProfileEdit";

class Index extends Component {
    render() {
        return (
            <div>
                <UserProfileEdit/>
            </div>
        );
    }
}
export function getServerSideProps(){
    return {props: {}}
}
export default Index;