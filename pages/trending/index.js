import React, {Component} from 'react';
import Trending from "../../components/Trending";

class index extends Component {
    render() {
        return (
            <div>
                <Trending />
            </div>
        );
    }
}
export function getServerSideProps(){

}
export default index;