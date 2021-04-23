import React from "react";
import Navbar from "./Navbar";
import Link from "next/link"
import Image from "next/image";
import {
    fetchCurrentUserLikes,
    fetchHomeMusic,
    fetchHomeChillMusic,
    fetchHomeRelaxMusic,
    playMusic,
    addMusicToList,
    getWhoToFollowList,
    playCount,
    addMusicListToMediaPlayerPlaylist,
    fetchRandomMusic,
    fetchHomeFeaturedMusic
} from "../actions"
import * as ReactBootstrap from "react-bootstrap";
import {connect} from "react-redux";
import {confirmAlert} from "react-confirm-alert";
import Router from "next/router";
import {NextSeo} from "next-seo";

let userSession
let guestUser
let loggedUser

class Home extends React.Component {
    state = {
        newReleases: {},
        likes: [],
        chillReleases: {},
        relaxReleases: {},
        featuredReleases: {},
        whoToFollowList: [],
        openWhoToFollow: true,
        searchTerm: "",
        page: 1,
        translate: undefined,
        chillPage: 1,
        relaxPage: 1,
        featuredPage: 1,
        musicPlayerPlaylist: [],
        tempUserImage: "http://nicesnippets.com/demo/1499344631_malecostume.png",
    }

    componentDidMount() {
        let userLoggedIn = localStorage.getItem("userLoggedIn")
        userSession = localStorage.getItem("userSession")
        userSession = JSON.parse(userSession)
        if (userSession) {
            this.props.fetchCurrentUserLikes(userSession, 1).then(() => {
                this.setState({likes: this.props.likesResponse.results})
            })
            if (userLoggedIn === "true") {
                loggedUser = true
                guestUser = false
                if (userSession.user) {
                    this.props.getWhoToFollowList(userSession, userSession.user.profile.username_slug).then(() => {
                        console.log(this.props.whoToFollowResponse)
                        this.setState({whoToFollowList: this.props.whoToFollowResponse.result})
                    }).catch(err => {
                        const options = {
                            title: 'Error!',
                            message: 'Something is wrong with your account. Please Logout and login again',
                            buttons: [
                                {
                                    label: 'Okay',
                                    onClick: () => {
                                        // history.push("/logout")
                                    }
                                }
                            ],
                            closeOnEscape: true,
                            closeOnClickOutside: true,
                            willUnmount: () => {
                            },
                            afterClose: () => {
                            },
                            onClickOutside: () => {
                            },
                            onKeypressEscape: () => {
                            }
                        };
                        confirmAlert(options)
                    })
                }
                if (userSession.profile) {
                    this.props.getWhoToFollowList(userSession, userSession.profile.username_slug).then(() => {
                        this.setState({whoToFollowList: this.props.whoToFollowResponse.result})
                        console.log(this.props.whoToFollowResponse)
                    }).catch(err => {
                        const options = {
                            title: 'Error!',
                            message: 'Something is wrong with your account. Please Logout and login again',
                            buttons: [
                                {
                                    label: 'Okay',
                                    onClick: () => {
                                        history.push("/logout")
                                    }
                                }
                            ],
                            closeOnEscape: true,
                            closeOnClickOutside: true,
                            willUnmount: () => {
                            },
                            afterClose: () => {
                            },
                            onClickOutside: () => {
                            },
                            onKeypressEscape: () => {
                            }
                        };
                        confirmAlert(options)
                    })
                }
            } else {
                loggedUser = false
                guestUser = true
            }
        }
        this.props.fetchHomeMusic(this.state.page).then(() => {
            this.setState({
                newReleases: this.props.newReleases[0],
                musicPlayerPlaylist: this.props.newReleases[0].results
            })
        }, ({data}) => {
        })
        this.props.fetchHomeChillMusic(this.state.chillPage).then(() => {
            console.log(this.props.chillReleases[0])
            this.setState({chillReleases: this.props.chillReleases[0]})
        }, ({data}) => {
        })
        this.props.fetchHomeRelaxMusic(this.state.relaxPage).then(() => {
            this.setState({relaxReleases: this.props.relaxReleases[0]})
        }, ({data}) => {
        })
        this.props.fetchHomeFeaturedMusic(this.state.featuredPage).then(() => {
            console.log(this.props.featuredMusicResponse)
            this.setState({featuredReleases: this.props.featuredMusicResponse})
        }, ({data}) => {
        })
    }

    playSong(data) {
        console.log(data)
        let userSession = localStorage.getItem("userSession")
        userSession = JSON.parse(userSession)
        this.props.fetchRandomMusic().then(() => {
            console.log(this.props.randomMusicResponse)
            const filterPlaylist = this.props.randomMusicResponse.random_song_list.filter(q => !!q).map(item => {
                if (item.song_title !== data.song_title) {
                    // console.log(item)
                    return {
                        song_title: item.song_title,
                        description: item.description,
                        photo_main: item.photo_main,
                        audio_file: item.audio_file
                    }
                    if (item.song_title === data.song_title) {
                        return null
                    }
                }
            }).filter(q => !!q)
            console.log(filterPlaylist)
            const filterData = {data: data, playlist: filterPlaylist, action: "play"}
            this.props.playMusic(filterData)
            this.props.playCount(data.id)
        })

        // const playListFilter = {data:this.state.musicPlayerPlaylist,change:data.id}
        // this.props.addMusicListToMediaPlayerPlaylist(this.state.musicPlayerPlaylist)
        // ReactDOM.findDOMNode(this.refs.playerFocus).focus();
    }

    playFeaturedSong(data) {
        let userSession = localStorage.getItem("userSession")
        userSession = JSON.parse(userSession)
        this.props.fetchRandomMusic().then(() => {
            console.log(this.props.randomMusicResponse)
            const filterPlaylist = this.props.randomMusicResponse.random_song_list.filter(q => !!q).map(item => {
                if (item.song_title !== data.song_title) {
                    // console.log(item)
                    return {
                        song_title: item.song_title,
                        description: item.description,
                        photo_main: item.photo_main,
                        audio_file: item.audio_file
                    }
                    if (item.song_title === data.song_title) {
                        return null
                    }
                }
            }).filter(q => !!q)
            console.log(filterPlaylist)
            const filterData = {data: data, playlist: filterPlaylist, action: "play"}
            this.props.playMusic(filterData)
            this.props.playCount(data.id)
        })

        // const playListFilter = {data:this.state.musicPlayerPlaylist,change:data.id}
        // this.props.addMusicListToMediaPlayerPlaylist(this.state.musicPlayerPlaylist)
        // ReactDOM.findDOMNode(this.refs.playerFocus).focus();
    }

    addNextToList(data) {
        this.props.addMusicToList(data)
    }

    onRedirectHome = (value) => {
        this.setState({page: value})
        this.fetchMusicList(value)
        this.fetchChillMusicList(value)
        this.fetchRelaxMusicList(value)
    }

    shuffleArray(array) {
        let i = array.length - 1;
        for (; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }

    fetchMusicList = (pageNo) => {
        this.props.fetchHomeMusic(pageNo).then(() => {
            this.setState({newReleases: this.props.newReleases[0]})
        }, ({data}) => {
        })
    }
    fetchChillMusicList = (pageNo) => {
        this.props.fetchHomeChillMusic(pageNo).then(() => {
            this.setState({chillReleases: this.props.chillReleases[0]})
        }, ({data}) => {
        })
    }
    fetchRelaxMusicList = (pageNo) => {
        this.props.fetchHomeRelaxMusic(pageNo).then(() => {
            this.setState({relaxReleases: this.props.relaxReleases[0]})
        }, ({data}) => {
        })
    }
    fetchFeaturedMusicList = (pageNo) => {
        this.props.fetchHomeFeaturedMusic(pageNo).then(() => {
            this.setState({featuredReleases: this.props.featuredMusicResponse})
        }, ({data}) => {
        })
    }

    onNextFeaturedClick = () => {
        const newPage = this.state.featuredPage + 1
        this.setState({featuredPage: newPage})
        this.fetchFeaturedMusicList(newPage)
    }
    onPreviousFeaturedClick = () => {
        const newPage = this.state.featuredPage - 1
        this.setState({featuredPage: newPage})
        this.fetchFeaturedMusicList(newPage)
    }
    onNextClick = () => {
        const newPage = this.state.page + 1
        this.setState({page: newPage})
        this.fetchMusicList(newPage)
    }
    onPreviousClick = () => {
        const newPage = this.state.page - 1
        this.setState({page: newPage})
        this.fetchMusicList(newPage)
    }
    onChillNextClick = () => {
        const newPage = this.state.chillPage + 1
        this.setState({chillPage: newPage})
        this.fetchChillMusicList(newPage)
    }

    onChillPreviousClick = () => {
        const newPage = this.state.chillPage - 1
        this.setState({chillPage: newPage})
        this.fetchChillMusicList(newPage)
    }

    onRelaxNextClick = () => {
        const newPage = this.state.relaxPage + 1
        this.setState({relaxPage: newPage})
        this.fetchRelaxMusicList(newPage)
    }
    onRelaxPreviousClick = () => {
        const newPage = this.state.relaxPage - 1
        this.setState({relaxPage: newPage})
        this.fetchRelaxMusicList(newPage)
    }


    renderPagination = () => {
        return (
            <nav aria-label="Page navigation">
                <ul className="pagination justify-content-center">
                    {this.state.newReleases.previous ? <li className="page-item">
                        {/*<button onClick={this.onPreviousClick} className="page-link">Previous</button>*/}
                        <Image src="/images/back_btn_icon.svg" onClick={this.onPreviousClick} width={30} height={30} />
                    </li> : null}
                    {this.state.newReleases.next ? <li className="page-item">
                        {/*<button onClick={this.onNextClick} className="page-link">Next</button>*/}
                        <Image src="/images/next_btn_icon.svg" onClick={this.onNextClick} width={30} height={30} />
                    </li> : null}
                </ul>
            </nav>
        );
    }
    renderFeaturedPagination = () => {
        return (
            <nav aria-label="Page navigation">
                <ul className="pagination justify-content-center">
                    {this.state.featuredReleases.previous ? <li className="page-item">
                        {/*<button onClick={this.onPreviousFeaturedClick} className="page-link">Previous</button>*/}
                        <Image src="/images/back_btn_icon.svg" onClick={this.onPreviousFeaturedClick} width={30} height={30} />
                    </li> : null}
                    {this.state.featuredReleases.next ? <li className="page-item">
                        {/*<button onClick={this.onNextFeaturedClick} className="page-link">Next</button>*/}
                        <Image src="/images/next_btn_icon.svg" onClick={this.onNextFeaturedClick} width={30} height={30} />
                    </li> : null}
                </ul>
            </nav>
        );
    }
    renderChillPagination = () => {
        return (
            <nav aria-label="Page navigation">
                <ul className="pagination justify-content-center">
                    {this.state.chillReleases.previous ? <li className="page-item">
                        {/*<button onClick={this.onChillPreviousClick} className="page-link">Previous</button>*/}
                        <Image src="/images/back_btn_icon.svg" onClick={this.onChillPreviousClick} width={30} height={30} />
                    </li> : null}
                    {this.state.chillReleases.next ? <li className="page-item">
                        {/*<button onClick={this.onChillNextClick} className="page-link">Next</button>*/}
                        <Image src="/images/next_btn_icon.svg" onClick={this.onChillNextClick} width={30} height={30} />
                    </li> : null}
                </ul>
            </nav>
        );
    }
    renderWhoToFollowList = () => {
        if (this.state.whoToFollowList){
            if (this.state.whoToFollowList.length === 0){
                return (
                    <div className="col-md-12">
                        <span className="text-center">Follow More People!</span>
                    </div>
                );
            }
            const shuffledArrayV = this.shuffleArray(this.state.whoToFollowList)
            return shuffledArrayV.slice(0,10).map(user =>{
                return (
                    <div className="cupl-container d-flex flex-row justify-content-between align-items-center mb-2">
                        <div className="d-flex flex-row align-items-center"><img
                            className="rounded-circle" src={user.profile.avatar?user.profile.avatar:this.state.tempUserImage} width="55"
                            height="55"/>
                            <div className="d-flex flex-column align-items-start ml-2">
                                <div className="d-flex">
                                                            <span className="font-weight-bold"><Link href={`/u-details/${user.profile.username_slug}`}
                                                                                                     className="user-name">{user.profile.username}</Link></span>
                                    {/*{user.profile.blue_tick_verified ?<img src={process.env.PUBLIC_URL + '/verified_check.png'} className="my-auto ml-2" alt="" width="15" height="15"/> : null}*/}
                                </div>
                                <span className="followers">{user.profile.followers_count} Followers</span></div>
                        </div>
                    </div>
                )
            })
        }
    }
    renderRelaxPagination = () => {
        return (
            <nav aria-label="Page navigation">
                <ul className="pagination justify-content-center">
                    {this.state.relaxReleases.previous ? <li className="page-item">
                        {/*<button onClick={this.onRelaxPreviousClick} className="page-link">Previous</button>*/}
                        <Image src="/images/back_btn_icon.svg" onClick={this.onRelaxPreviousClick} width={30} height={30} />
                    </li> : null}
                    {this.state.relaxReleases.next ? <li className="page-item">
                        <button onClick={this.onRelaxNextClick} className="page-link">Next</button>
                        <Image src="/images/next_btn_icon.svg" onClick={this.onRelaxNextClick} width={30} height={30} />
                    </li> : null}
                </ul>
            </nav>
        );
    }
    searchTag = (term) => {
        Router.push(`/search/${term}`)
    }
    renderFeaturedReleases = () => {
        if (this.state.featuredReleases.results) {
            if (this.state.featuredReleases.results.length === 0) {
                return (
                    <div className="col-md-12">
                        <h3 className="text-center">No Track Featured</h3>
                    </div>
                );
            }
            return this.state.featuredReleases.results.map(result => {
                return (
                    <div className={`col-md-4 custom-home-music-display mobile-track-home-margin`}>
                        <div className={`custom-home-music-img ${guestUser?"guest-view-home":null}`} onClick={() => this.playFeaturedSong(result.target)}>
                            <img src={result.target.photo_main}/>
                            <div className="play">
                                <span><i className="fa fa-play"/></span>
                            </div>
                        </div>
                        <div className="custom-home-music-text">
                            <Link href={`/m-details/${result.target.username_slug}/${result.target.slug}`}
                                  className="music-name">{result.target.song_title.slice(0, 20)}</Link> by <Link
                            href={`/u-details/${result.target.username_slug}`}
                            className="user-name">{result.target.username}</Link>
                        </div>
                    </div>
                )
            })
        }
    }

    renderLikesList() {
        if (this.state.likes) {
            if (this.state.likes.length === 0) {
                return (
                    <div className="col-md-12">
                        <span className="text-center">Like Music To Update!</span>
                    </div>
                );
            }
            return this.state.likes.slice(0, 5).map(result => {
                return (
                    <div>
                        <div
                            className="cupl-container d-flex flex-row justify-content-between align-items-center mb-3">
                            <div className="d-flex flex-row align-items-center"><img
                                className="rounded-circle" src={result.photo_main} width="55"
                                height="55"/>
                                <div className="d-flex flex-column align-items-start ml-2">
                                    <div className="d-flex">
                                                        <span className="font-weight-bold"><Link href={`/m-details/${result.username_slug}/${result.slug}`}
                                                                                                 className="user-name">{result.song_title.slice(0,16)}</Link></span>
                                        {/*{user.profile.blue_tick_verified ?<img src={process.env.PUBLIC_URL + '/verified_check.png'} className="my-auto ml-2" alt="" width="15" height="15"/> : null}*/}
                                    </div>
                                    {/*<span className="followers">100 Followers</span>*/}
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })
        }
    }

    renderNewReleases() {
        if (this.state.newReleases.results) {
            if (this.state.newReleases.results.length === 0) {
                return (
                    <div className="col-md-12">
                        <h3 className="text-center">No Records To Show</h3>
                    </div>
                );
            }
            return this.state.newReleases.results.map(result => {
                return (
                    <div className="col-md-4 custom-home-music-display mobile-track-home-margin">
                        <div className="custom-home-music-img" onClick={() => this.playSong(result)}>
                            <img src={result.photo_main}/>
                            <div className="play">
                                <span><i className="fa fa-play"/></span>
                            </div>
                        </div>
                        <div className="custom-home-music-text">
                            <Link href={`/m-details/${result.username_slug}/${result.slug}`}
                                  className="music-name">{result.song_title.slice(0, 20)}</Link> by <Link
                            href={`/u-details/${result.username_slug}`} className="user-name">{result.username}</Link>
                        </div>
                    </div>
                )
            })
        }
    }

    renderChillReleases() {
        if (this.state.chillReleases.results) {
            if (this.state.chillReleases.results.length === 0) {
                return (
                    <div className="col-md-12">
                        <h3 className="text-center">No Records To Show</h3>
                    </div>
                );
            }
            return this.state.chillReleases.results.map(result => {
                return (
                    <div className="col-md-4 custom-home-music-display mobile-track-home-margin">
                        <div className="custom-home-music-img" onClick={() => this.playSong(result)}>
                            <img src={result.photo_main}/>
                            <div className="play">
                                <span><i className="fa fa-play"/></span>
                            </div>
                        </div>
                        <div className="custom-home-music-text">
                            <Link href={`/m-details/${result.username_slug}/${result.slug}`}
                                  className="music-name">{result.song_title.slice(0, 20)}</Link> by <Link
                            href={`/u-details/${result.username_slug}`} className="user-name">{result.username}</Link>
                        </div>
                    </div>
                )
            })
        }
    }

    renderRelaxReleases() {
        const col_md_4 = "col-md-4"
        const col_md_3 = "col-md-3"
        if (this.state.relaxReleases.results) {
            if (this.state.relaxReleases.results.length === 0) {
                return (
                    <div className="col-md-12">
                        <h3 className="text-center">No Records To Show</h3>
                    </div>
                );
            }
            return this.state.relaxReleases.results.map(result => {
                return (
                    <div className="col-md-4 custom-home-music-display mobile-track-home-margin">
                        <div className="custom-home-music-img" onClick={() => this.playSong(result)}>
                            <img src={result.photo_main}/>
                            <div className="play">
                                <span><i className="fa fa-play"/></span>
                            </div>
                        </div>
                        <div className="custom-home-music-text">
                            <Link href={`/m-details/${result.username_slug}/${result.slug}`}
                                  className="music-name">{result.song_title.slice(0, 20)}</Link> by <Link
                            href={`/u-details/${result.username_slug}`} className="user-name">{result.username}</Link>
                        </div>
                    </div>
                )
            })
        }
    }

    renderLoggedInUser = () => {
        return (<div>
            <div className="custom-home-screen">
                <div className="row custom-row-setting">
                    <div className="col-md-9">
                        <div className="custom-home-headers">
                            <h3>Featured Tracks</h3>
                        </div>
                        <div className="row">
                            <div className="row col-md-12 custom-home-left-section">
                                {this.renderFeaturedReleases()}
                            </div>
                            <div className="row w-75 mt-3 align-content-end align-items-end justify-content-end">
                                {this.renderFeaturedPagination()}
                            </div>
                        </div>
                        <div className="custom-home-headers mt-5">
                            <h3>New Releases</h3>
                        </div>
                        <div className="row">
                            <div className="row col-md-12 custom-home-left-section">
                                {this.renderNewReleases()}
                            </div>
                            <div className="row w-75 mt-3 align-content-end align-items-end justify-content-end">
                                {this.renderPagination()}
                            </div>
                        </div>
                        <div className="custom-home-headers mt-5">
                            <h3>Chill Tracks</h3>
                        </div>
                        <div className="row">
                            <div className="row col-md-12 custom-home-left-section">
                                {this.renderChillReleases()}
                            </div>
                            <div className="row w-75 mt-3 align-content-end align-items-end justify-content-end">
                                {this.renderChillPagination()}
                            </div>
                        </div>
                        <div className="custom-home-headers mt-5">
                            <h3>Relax Tracks</h3>
                        </div>
                        <div className="row">
                            <div className="row col-md-12 custom-home-left-section">
                                {this.renderRelaxReleases()}
                            </div>
                            <div className="row w-75 mt-3 align-content-end align-items-end justify-content-end">
                                {this.renderRelaxPagination()}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="custom-home-right-section-wrapper">
                            <div className="row">
                                <div className="col-md-11 home-right-menu-tags-heading">
                                    <span className="span-heading">Popular Tags</span>
                                </div>
                                <div className="col-md-11 cupl home-right-menu-tags-content">
                                    <ReactBootstrap.Badge onClick={() => this.searchTag("chill")}
                                                          className="p-2 m-2 bg-accent pointer-cursor home-right-menu-tags-content-pill"
                                                          pill
                                                          variant="primary">
                                        #Chill
                                    </ReactBootstrap.Badge>
                                    <ReactBootstrap.Badge onClick={() => this.searchTag("relax")}
                                                          className="p-2 m-2 bg-accent pointer-cursor home-right-menu-tags-content-pill"
                                                          pill
                                                          variant="primary">
                                        #Relax
                                    </ReactBootstrap.Badge>
                                    <ReactBootstrap.Badge onClick={() => this.searchTag("party")}
                                                          className="p-2 m-2 bg-accent pointer-cursor home-right-menu-tags-content-pill"
                                                          pill
                                                          variant="primary">
                                        #Party
                                    </ReactBootstrap.Badge>
                                    <ReactBootstrap.Badge onClick={() => this.searchTag("hot")}
                                                          className="p-2 m-2 bg-accent pointer-cursor home-right-menu-tags-content-pill"
                                                          pill
                                                          variant="primary">
                                        #Hot
                                    </ReactBootstrap.Badge>
                                    <ReactBootstrap.Badge onClick={() => this.searchTag("disco")}
                                                          className="p-2 m-2 bg-accent pointer-cursor home-right-menu-tags-content-pill"
                                                          pill
                                                          variant="primary">
                                        #Disco
                                    </ReactBootstrap.Badge>
                                    <ReactBootstrap.Badge onClick={() => this.searchTag("love")}
                                                          className="p-2 m-2 bg-accent pointer-cursor home-right-menu-tags-content-pill"
                                                          pill
                                                          variant="primary">
                                        #Love
                                    </ReactBootstrap.Badge>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-11 home-right-menu-who-to-follow-heading">
                                        <span className="span-heading">
                                            <ReactBootstrap.Accordion
                                                className="btn text-accent font-weight-bold"
                                                onClick={() => this.setState({openWhoToFollow: !this.state.openWhoToFollow})}
                                                aria-controls="example-collapse-text"
                                                aria-expanded={this.state.openWhoToFollow}
                                            >
                                            Who To Follow?  +
                                            </ReactBootstrap.Accordion>
                                        </span>
                                </div>
                                <ReactBootstrap.Collapse in={this.state.openWhoToFollow}>
                                    <div className="home-right-menu-who-to-follow-content">
                                        {this.renderWhoToFollowList()}
                                    </div>
                                </ReactBootstrap.Collapse>
                            </div>
                            <div className="row">
                                <div className="col-md-12 home-right-menu-likes-heading">
                                    <div className="">
                                        <span className="span-heading-likes">Likes</span>
                                        {/*<p className="custom-likes-view-all">*/}
                                        <Link href="/library"><span
                                            className="btn text-link-accent custom-likes-view-all">View all</span></Link>
                                        {/*</p>*/}
                                    </div>
                                </div>
                                <div className="cupl home-right-menu-likes-content">
                                    {this.renderLikesList()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
    }
    renderGuestUser = () => {
        return (<div>
            <div className="custom-home-screen">
                <div className="row custom-row-margin custom-row-setting">
                    <div className="col-md-12 col-sm-6">
                        <div className="custom-home-headers">
                            <h3>Featured Tracks</h3>
                        </div>
                        <div className="row custom-row-margin">
                            <div className="row col-md-12 col-sm-6 custom-row-margin custom-home-left-section">
                                {this.renderFeaturedReleases()}
                            </div>
                            <div className="row w-75 mt-3 align-content-end align-items-end justify-content-end">
                                {this.renderFeaturedPagination()}
                            </div>
                        </div>
                        <div className="custom-home-headers mt-5">
                            <h3>New Releases</h3>
                        </div>
                        <div className="row custom-row-margin">
                            <div className="row col-md-12 custom-row-margin custom-home-left-section">
                                {this.renderNewReleases()}
                            </div>
                            <div className="row w-75 mt-3 align-content-end align-items-end justify-content-end">
                            {this.renderPagination()}
                            </div>
                        </div>
                        <div className="custom-home-headers mt-5">
                            <h3>Chill Tracks</h3>
                        </div>
                        <div className="row custom-row-margin">
                            <div className="row col-md-12 custom-row-margin custom-home-left-section">
                                {this.renderChillReleases()}
                            </div>
                            <div className="row w-75 mt-3 align-content-end align-items-end justify-content-end">
                                {this.renderChillPagination()}
                            </div>
                        </div>
                        <div className="custom-home-headers mt-5">
                            <h3>Relax Tracks</h3>
                        </div>
                        <div className="row custom-row-margin">
                            <div className="row col-md-12 custom-row-margin custom-home-left-section">
                                {this.renderRelaxReleases()}
                            </div>
                            <div className="row w-75 mt-3 align-content-end align-items-end justify-content-end">
                                {this.renderRelaxPagination()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
    }

    render() {
        const col_md_12 = "col-md-12"
        const col_md_9 = "col-md-9"
        const handleChange = (e) => {
            const isCheckbox = e.target.type === "checkbox";
            this.setState({[e.target.name]: isCheckbox ? e.target.checked : e.target.value})
        }
        return (
            <div className="home-screen">
                <NextSeo
                    title="Home"
                    description="Explore Hub for independent creators and their unique music art"
                    openGraph={{
                        url: 'https://www.url.ie/a',
                        title: 'Home',
                        description: 'Explore Hub for independent creators and their unique music art',
                        site_name: 'DIGITVL',
                    }}
                    twitter={{
                        handle: '@digitvl',
                        site: '@digitvl',
                        cardType: 'summary_large_image',
                    }}
                />
                <Navbar/>
                {userSession ? this.renderLoggedInUser() : this.renderGuestUser()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        newReleases: Object.values(state.fetchMusic),
        chillReleases: Object.values(state.fetchChillMusic),
        relaxReleases: Object.values(state.fetchRelaxMusic),
        likesResponse: state.likesList.likesListResponse,
        whoToFollowResponse: state.getWhoToFollow.whoToFollowListData,
        randomMusicResponse: state.fetchRandomMusic.musicRandomFetchData,
        featuredMusicResponse: state.fetchFeaturedMusic.featuredMusicData
    }
}

export default connect(mapStateToProps, {
    fetchCurrentUserLikes,
    getWhoToFollowList,
    fetchHomeMusic: fetchHomeMusic,
    fetchHomeChillMusic: fetchHomeChillMusic,
    fetchHomeRelaxMusic: fetchHomeRelaxMusic,
    playMusic: playMusic,
    addMusicToList: addMusicToList,
    playCount,
    addMusicListToMediaPlayerPlaylist,
    fetchRandomMusic,
    fetchHomeFeaturedMusic
})(Home);