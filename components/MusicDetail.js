import React, {Component} from 'react';
import Navbar from "./Navbar";
import Link from "next/link"
import Image from "next/image";
import {connect} from "react-redux";
import {
    FacebookShareButton,
    TwitterShareButton,
    FacebookIcon,
    TwitterIcon,
} from "react-share";
import {
    fetchMusicDetails,
    playMusic,
    addMusicToList,
    addMusicToPlayList,
    likeMusicApi,
    fetchMusicDetailsWithToken,
    playMusicDetail,
    getMusicComments,
    addMusicComments,
    getMusicLikesList,
    playCount,
    addCoins,
    relatedTracksList
} from "../actions";
import * as ReactBootstrap from "react-bootstrap";

let userSession;
let userLoggedIn
let profileImage = "http://nicesnippets.com/demo/1499344631_malecostume.png"
class MusicDetail extends Component {
    state = {
        musicDetail: {},
        likesList: [],
        userProfilePic: "http://nicesnippets.com/demo/1499344631_malecostume.png",
        comments: [],
        commentsListResponse: {},
        relatedTracks: {},
        like: false,
        show: false,
        showAddPlaylist: false,
        ApiError: false,
        shareDescription: "",
        addComment: "",
        commentPageNo: 1,
        likesPage: 1,
        newSong: false
    }

    componentDidMount() {
        userLoggedIn = localStorage.getItem("userLoggedIn")
        userSession = localStorage.getItem("userSession")
        userSession = JSON.parse(userSession)
        if (userSession) {
            if (userSession.user) {
                this.setState({userProfilePic: userSession.user.profile.avatar})
            }
            if (userSession.profile) {
                this.setState({userProfilePic: userSession.profile.avatar})
            }
            this.props.fetchMusicDetailsWithToken(this.props.dataparams.username_slug, this.props.dataparams.track_slug, userSession).then(() => {
                console.log(this.props.fetchMusicDetail)
                this.setState({
                    musicDetail: this.props.fetchMusicDetail.beats_detail,
                    like: this.props.fetchMusicDetail.beats_detail.users_like
                })
                this.props.getMusicComments(userSession, this.props.fetchMusicDetail.beats_detail.id, this.state.commentPageNo).then(() => {
                    console.log(this.props.musicCommentsResponse)
                    this.setState({
                        commentsListResponse: this.props.musicCommentsResponse,
                        comments: this.props.musicCommentsResponse.results
                    })
                })

                this.props.getMusicLikesList(this.props.fetchMusicDetail.beats_detail.slug, this.state.likesPage).then(() => {
                    console.log(this.props.musicLikesListResponse.results)
                    this.setState({likesList: this.props.musicLikesListResponse.results})
                })
                this.props.relatedTracksList(this.props.fetchMusicDetail.beats_detail.slug).then(() => {
                    console.log("Featured")
                    console.log(this.props.relatedTracksResponse)
                    this.setState({relatedTracks: this.props.relatedTracksResponse})
                }).catch(err => {
                    alert(err)
                })
                console.log(this.props.fetchMusicDetail)
            }).catch(err => {
                this.setState({ApiError: true})
            })
        }
        if (!userSession) {
            this.props.fetchMusicDetails(this.props.dataparams.username_slug, this.props.dataparams.track_slug).then(() => {
                console.log(this.props.fetchMusicDetail)
                this.setState({
                    musicDetail: this.props.fetchMusicDetail.beats_detail,
                    like: this.props.fetchMusicDetail.beats_detail.users_like
                })
                this.props.getMusicComments(userSession, this.props.fetchMusicDetail.beats_detail.id, this.state.commentPageNo).then(() => {
                    console.log(this.props.musicCommentsResponse)
                    this.setState({
                        commentsListResponse: this.props.musicCommentsResponse,
                        comments: this.props.musicCommentsResponse.results
                    })
                })
                this.props.getMusicLikesList(this.props.fetchMusicDetail.beats_detail.slug, this.state.likesPage).then(() => {
                    console.log(this.props.musicLikesListResponse.results)
                    this.setState({likesList: this.props.musicLikesListResponse.results})
                })
                this.props.relatedTracksList(this.props.fetchMusicDetail.beats_detail.slug).then(() => {
                    console.log("Featured")
                    console.log(this.props.relatedTracksResponse)
                    this.setState({relatedTracks: this.props.relatedTracksResponse})
                }).catch(err => {
                    alert(err)
                })
                console.log(this.props.fetchMusicDetail)
            }).catch(err => {
                this.setState({ApiError: true})
            })
        }
        this.setState({newSong: false})
    }

    onLoadMore = () => {
        const newPage = this.state.commentPageNo + 1
        this.setState({commentPageNo: newPage})
        this.fetchCommentsList(newPage)
    }
    fetchCommentsList = (pageNo) => {
        this.props.getMusicComments(userSession, this.props.fetchMusicDetail.beats_detail.id, pageNo).then(() => {
            this.setState({
                commentsListResponse: this.props.musicCommentsResponse,
                comments: [...this.state.comments, ...this.props.musicCommentsResponse.results]
            })
        }, ({data}) => {
        })
    }
    renderLoadMore = () => {
        return (
            <nav aria-label="Page navigation">
                <ul className="pagination justify-content-center">
                    {this.state.commentsListResponse.next ? <li className="page-item">
                        <button onClick={this.onLoadMore} className="page-link">Load More Comments</button>
                    </li> : null}
                </ul>
            </nav>
        );
    }
    playSong = (data) => {
        console.log(data)
        let userSession = localStorage.getItem("userSession")
        userSession = JSON.parse(userSession)
        const filterData = {data: data, action: "playDetail"}
        this.props.playMusicDetail(filterData)
        this.props.playCount(data.id)
    }
    addNextToList = (data) => {
        const filterData = {data: data, action: "addToList"}
        this.props.addMusicToList(filterData)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.dataparams.track_slug !== prevProps.dataparams.track_slug) {
            this.props.fetchMusicDetails(this.props.dataparams.username_slug, this.props.dataparams.track_slug).then(() => {
                console.log(this.props.fetchMusicDetail)
                this.setState({
                    musicDetail: this.props.fetchMusicDetail.beats_detail,
                    like: this.props.fetchMusicDetail.beats_detail.users_like
                })
                this.props.getMusicComments(userSession, this.props.fetchMusicDetail.beats_detail.id, this.state.commentPageNo).then(() => {
                    console.log(this.props.musicCommentsResponse)
                    this.setState({
                        commentsListResponse: this.props.musicCommentsResponse,
                        comments: this.props.musicCommentsResponse.results
                    })
                })
                this.props.getMusicLikesList(this.props.fetchMusicDetail.beats_detail.slug, this.state.likesPage).then(() => {
                    console.log(this.props.musicLikesListResponse.results)
                    this.setState({likesList: this.props.musicLikesListResponse.results})
                })
                this.props.relatedTracksList(this.props.fetchMusicDetail.beats_detail.slug).then(() => {
                    console.log("Featured")
                    console.log(this.props.relatedTracksResponse)
                    this.setState({relatedTracks: this.props.relatedTracksResponse})
                }).catch(err => {
                    alert(err)
                })
                console.log(this.props.fetchMusicDetail)
                this.setState({newSong: false})
            }).catch(err => {
                this.setState({ApiError: true})
            })

        }
    }

    likesMusic = (id) => {
        console.log(id)
        if (userSession) {
            if (!this.state.like) {
                // this.props.addCoins(userSession).then(() => {
                //     let userSession = localStorage.getItem("userSession")
                //     let user = JSON.parse(userSession)
                //     console.log(user)
                //     user.user.coins = this.props.addCoinsResponse.total_coins
                //     localStorage.setItem("userSession", JSON.stringify(user));
                // })
            }
            this.props.likeMusicApi(id, userSession).then(() => {
                console.log(this.props.likeMusicResponse)
                this.setState({like: this.props.likeMusicResponse.like})
                this.props.fetchMusicDetailsWithToken(this.props.dataparams.username_slug, this.props.dataparams.track_slug, userSession).then(() => {
                    this.setState({
                        musicDetail: this.props.fetchMusicDetail.beats_detail,
                        like: this.props.fetchMusicDetail.beats_detail.users_like
                    })
                    this.props.getMusicLikesList(this.props.fetchMusicDetail.beats_detail.slug, this.state.likesPage).then(() => {
                        console.log(this.props.musicLikesListResponse.results)
                        this.setState({likesList: this.props.musicLikesListResponse.results})
                    })
                })

            }).catch(err => {
            })
        } else if (!userSession) {
            history.push("/login")
        }

    }

    renderRelatedTracksList() {
        if (this.state.relatedTracks.related_song_list) {
            if (this.state.relatedTracks.related_song_list.length === 0) {
                return (
                    <div className="col-md-12">
                        <span className="text-center">Like Music To Update!</span>
                    </div>
                );
            }
            return this.state.relatedTracks.related_song_list.map(result => {
                return (
                    <div className="d-flex flex-row align-items-center mt-2">
                        <img className="rounded" src={result.photo_main} width="90"
                             height="90"/>
                        <div className="d-flex flex-column align-items-start ml-2">
                            <div className="d-flex">
                                                            <span className="font-weight-bold"><Link
                                                                href={`/m-details/${result.username}/${result.slug}`}
                                                                className="user-name">{result.song_title.slice(0, 25)}</Link></span>
                                {/*{user.profile.blue_tick_verified ?<img src={process.env.PUBLIC_URL + '/verified_check.png'} className="my-auto ml-2" alt="" width="15" height="15"/> : null}*/}
                            </div>
                            <span className="likes-count">{result.total_likes} likes</span></div>
                        <div className="d-flex flex-row justify-content-end align-items-end custom-related-tracks-item-play">
                            <div onClick={() => this.playSong(result)} className="btn btn-outline-primary btn-sm"
                                 type="button">Play
                            </div>
                        </div>
                    </div>
                )
            });
        }
    }

    renderLikeButton() {
        if (this.state.like) {
            return (
                <button onClick={() => {
                    this.likesMusic(this.state.musicDetail.id)
                }} className="btn btn-outline-primary btn-sm m-2" type="button">
                    <i className="fas fa-heart"/> Liked
                </button>
            );
        }
        if (!this.state.like) {
            return (
                <button onClick={() => {
                    this.likesMusic(this.state.musicDetail.id)
                }} className="btn btn-outline-primary btn-sm mr-2" type="button">
                    <i className="far fa-heart "/> Like</button>
            );
        }
        return false;
    }

    addUserComment = (e) => {
        e.preventDefault()
        userSession = localStorage.getItem("userSession")
        userSession = JSON.parse(userSession)
        if (this.state.addComment) {
            if (userSession) {
                const data = {body: this.state.addComment}
                this.props.addMusicComments(userSession, this.state.musicDetail.id, data).then(() => {
                    console.log(this.props.addMusicCommentResponse)
                    this.props.getMusicComments(userSession, this.state.musicDetail.id).then(() => {
                        this.setState({comments: this.props.musicCommentsResponse.results})
                    })
                    // this.props.addCoins(userSession).then(() => {
                    //     let userSession = localStorage.getItem("userSession")
                    //     let user = JSON.parse(userSession)
                    //     console.log(user)
                    //     user.user.coins = this.props.addCoinsResponse.total_coins
                    //     localStorage.setItem("userSession", JSON.stringify(user));
                    // })
                })
            }
        }
        if (!userSession) {
            history.push("/login")
        }
        this.setState({addComment: ""})
    }
    renderComments = () => {
        if (this.state.comments) {
            if (this.state.comments.length === 0) {
                return (
                    <div className="col-md-12">
                        <h5 className="text-center">No comments on this track</h5>
                    </div>
                );
            }
            return this.state.comments.map(commentdata => {
                return (
                    <div className="d-flex flex-row align-items-center mt-2"><img
                        className="rounded-circle" src={commentdata.profile_pic ? commentdata.profile_pic : profileImage} width="55"
                        height="55"/>
                        <div className="d-flex flex-column align-items-start ml-2">
                            <div className="d-flex">
                                                            <span className="font-weight-bold"><Link href={`/u-details/${commentdata.username}`}
                                                                                                     className="user-name">{commentdata.username}</Link></span>
                                {/*{user.profile.blue_tick_verified ?<img src={process.env.PUBLIC_URL + '/verified_check.png'} className="my-auto ml-2" alt="" width="15" height="15"/> : null}*/}
                            </div>
                            <span className="comment-text">{commentdata.body}</span></div>
                    </div>
                );
            })
        }
    }
    onPlayListClicked = (id, name) => {
        const newData = {name: name, is_private: ""}
        const formData = new FormData()
        formData.append("name", name)
        this.props.addMusicToPlayList(id, this.state.musicDetail.id, formData, userSession).then(() => {
            this.setState({showAddPlaylist: false})
        })
    }
    handleApiErrorClose = () => this.setState({ApiError: false});
    handleApiErrorShow = () => {
        this.setState({ApiError: true});
    }
    render() {
        return (
            <div className="container-fluid custom-music-detail-page">
                <Navbar/>
                <div className="custom-music-detail-data-section">
                    <div className="row">
                        <div className="row col-md-12">
                            <div className="col-md-3 col-sm-6 col-xs-6 custom-music-detail-img">
                                <img src={this.state.musicDetail.photo_main} className=""/>
                            </div>
                            <div className="col-md-9 col-sm-12 col-xs-12">
                                <div className="d-flex flex-column m-3">
                                    <span className="p-2 song-title">{this.state.musicDetail.song_title}</span>
                                    <span className="p-2 song-description">{this.state.musicDetail.description}</span>
                                    <span className="p-2 song-artist-name"><Link href={`/u-details/${this.state.musicDetail.username_slug}`}><a>@{this.state.musicDetail.username}</a></Link></span>
                                    <span className="p-2 likes-count"><i className="fas fa-thumbs-up"/> {this.state.musicDetail.total_likes}</span>
                                </div>
                                <div className="d-inline-block flex-row mt-2 ml-3 mb-3">
                                    {this.renderLikeButton()}
                                    <button className="btn btn-outline-primary btn-sm m-2" type="button">
                                        <i className="far fa-share-square"/> Share
                                    </button>
                                    <button className="btn btn-outline-primary btn-sm m-2" type="button">
                                        <i className="far fa-list-alt"/> Add To Next Up
                                    </button>
                                    <button className="btn btn-outline-primary btn-sm m-2"
                                            type="button">
                                        <i className="far fa-list-alt"/> Add To My PlayList
                                    </button>
                                    <a href={`/`} target="_blank"
                                       className="btn btn-outline-primary btn-sm m-2">
                                        <i className="fas fa-store"/>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="custom-music-detail-bottom-section">
                    <div className="row">
                        <div className="col-md-7">
                            <div className="custom-music-detail-comment-section">
                                <div className="custom-music-detail-input-comment">
                                    <div className="d-flex flex-row my-auto">
                                        <img src={this.state.userProfilePic? this.state.userProfilePic : profileImage} className="rounded-circle" width="60" height="60"
                                             alt=""/>
                                        <form onSubmit={this.addUserComment} className="w-100">
                                            <input type="text" className="custom-nav-search"
                                                   placeholder="Write a comment"/>
                                        </form>
                                    </div>
                                </div>
                                <div className="custom-music-detail-comment-list mt-5">
                                    <div
                                        className="cupl-container d-flex flex-row justify-content-between align-items-center mb-2">
                                        <div className="row">
                                            <div className="col-md-12">
                                                {this.renderComments()}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-8 col-xs-8">
                            <div className="custom-music-detail-related-tracks-section">
                                <span className="custom-related-tracks-heading">Related Tracks</span>
                                <div
                                    className="cupl-container d-flex flex-row justify-content-between align-items-center mb-2 mt-5">
                                    <div className="row">
                                        <div className="col-md-12">
                                            {this.renderRelatedTracksList()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        fetchMusicDetail: state.musicDetail.musicDetailData,
        likeMusicResponse: state.likeMusic.likeMusicResponseData,
        addMusicPlaylistResponse: state.addMusicPlaylist.addMusicResponseData,
        musicCommentsResponse: state.musicComments.musicCommentData,
        addMusicCommentResponse: state.addMusicComment.addMusicCommentData,
        musicLikesListResponse: state.fetchMusicLikesList.musicLikesListData,
        addCoinsResponse: state.addCoins.addCoinsData,
        relatedTracksResponse: state.relatedTracks.relatedTracksListData
    }
}

export default connect(mapStateToProps, {
    fetchMusicDetailsWithToken: fetchMusicDetailsWithToken,
    fetchMusicDetails: fetchMusicDetails,
    playMusic: playMusic,
    playMusicDetail: playMusicDetail,
    addMusicToList: addMusicToList,
    likeMusicApi: likeMusicApi,
    addMusicToPlayList,
    getMusicComments,
    addMusicComments,
    getMusicLikesList,
    playCount,
    addCoins,
    relatedTracksList
})(MusicDetail);