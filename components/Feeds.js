import React, {Component} from 'react';
import Navbar from "./Navbar";
import {connect} from "react-redux";
import {fetchUserFeeds,tweetApi,getCurrentUserDigitvlCoins} from "../actions";
import {confirmAlert} from "react-confirm-alert";
class Feeds extends Component {
    state = {feedsListResponse: {}, feeds: [], page: 1,tweetBody:""}
    render() {
        return (
            <div>
                
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        userFeedsResponse: state.userFeeds.userFeedsData,
        tweetResponse:state.tweetFeature.tweetFeatureData
    }
}
export default connect(mapStateToProps, {fetchUserFeeds,tweetApi,getCurrentUserDigitvlCoins})(Feeds);