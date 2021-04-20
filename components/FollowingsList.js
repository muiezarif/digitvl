import React, {Component} from 'react';
import Navbar from "./Navbar";
import {connect} from "react-redux";
import Link from "next/link";
import {getUserFollowingList,getUserFollowingListWithoutToken} from "../actions";
import Image from "next/image";
let profileImage="http://nicesnippets.com/demo/1499344631_malecostume.png"
class FollowingsList extends Component {
    state = {followingListResponse: {}, followingList: [], page: 1}
    componentDidMount() {
        let userSession = localStorage.getItem("userSession")
        userSession = JSON.parse(userSession)
        if (userSession) {
            this.props.getUserFollowingList(this.props.dataparams.username_slug, userSession, this.state.page).then(() => {
                console.log(this.props.userFollowingListResponse)
                this.setState({
                    followingListResponse: this.props.userFollowingListResponse,
                    followingList: this.props.userFollowingListResponse.results
                })
            })
        }
        if (!userSession) {
            this.props.getUserFollowingListWithoutToken(this.props.dataparams.username_slug, this.state.page).then(() => {
                console.log(this.props.userFollowingListResponse)
                this.setState({
                    followingListResponse: this.props.userFollowingListResponse,
                    followingList: this.props.userFollowingListResponse.results
                })
            })
        }
    }
    onLoadMore = () => {
        const newPage = this.state.page + 1
        this.setState({page: newPage})
        this.fetchFollowingsList(newPage)
    }
    fetchFollowingsList = (pageNo) => {
        let userSession = localStorage.getItem("userSession")
        userSession = JSON.parse(userSession)
        if (userSession) {
            this.props.getUserFollowingList(this.props.dataparams.username_slug, userSession, pageNo).then(() => {
                this.setState({
                    followingListResponse: this.props.userFollowingListResponse,
                    followingList: [...this.state.followingList, ...this.props.userFollowingListResponse.results]
                })
            }, ({data}) => {
            })
        }
        if (!userSession) {
            this.props.getUserFollowingListWithoutToken(this.props.dataparams.username_slug, pageNo).then(() => {
                this.setState({
                    followingListResponse: this.props.userFollowingListResponse,
                    followingList: [...this.state.followingList, ...this.props.userFollowingListResponse.results]
                })
            }, ({data}) => {
            })
        }
    }
    renderLoadMore = () => {
        return (
            <nav aria-label="Page navigation">
                <ul className="pagination justify-content-center">
                    {this.state.followingListResponse.next ? <li className="page-item">
                        <button onClick={this.onLoadMore} className="page-link">Load More</button>
                    </li> : null}
                </ul>
            </nav>
        );
    }
    renderFollowingList() {
        if (this.state.followingList) {
            if (this.state.followingList.length === 0) {
                return (
                    <div className="col-md-12">
                        <h3 className="text-center">Not Following Anyone</h3>
                    </div>
                );
            }
            return this.state.followingList.map(result => {
                return (<div key={result.id} className="custom-track-list-bg p-3 mt-3">
                    <div className="row">
                        <div className="col-md-2">
                            {result.profile.avatar?<img  src={result.profile.avatar} alt="" className="rounded" width="90px" height="90px"/>:<img  src={profileImage} alt="" className="rounded p-3" width="90px" height="90px"/>}
                        </div>
                        <div className="d-flex flex-column col-md-2 my-auto">
                            {/*<div className="my-auto">*/}
                            <span className="custom-user-tracklist-track-title"><Link href={`/u-details/${result.profile.username_slug}`}>{result.profile.username}</Link></span>
                            <span className="custom-user-tracklist-track-plays">{result.profile.followers_count} Followers</span>
                            {/*</div>*/}
                        </div>
                        <div className="col-md-2 my-auto">
                            {result.profile.blue_tick_verified ?<Image src="/images/verified_check.png" width={20} height={20} className="my-auto"/>:null}
                        </div>

                    </div>
                </div>)
            })
        }
    }
    render() {
        return (
            <div className="container-fluid custom-followings-page">
                <Navbar />
                <div className="container custom-playlist-title mt-5">
                    <span>Followings</span>
                </div>
                <div className="container">
                    {this.renderFollowingList()}
                </div>
                <div className="mt-3">
                    {this.renderLoadMore()}
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        userFollowingListResponse: state.userFollowingList.userFollowingData
    }
}
export default connect(mapStateToProps, {getUserFollowingList,getUserFollowingListWithoutToken})(FollowingsList);