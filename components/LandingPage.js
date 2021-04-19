import React from "react"
import Link from "next/link";
import Router from "next/router";
// import ReactImageAppear from "react-image-appear";
import {connect} from "react-redux";
import {fetchTrendingTracksList,playMusic,playCount,fetchRandomMusic} from "../actions"
let userLoggedIn
let userSession
class LandingPage extends React.Component {
    state = {userLoggedIn: "",trendingListResponse:{},trendingList:[],page:1}
    componentDidMount() {
        localStorage.clear()
        userLoggedIn = localStorage.getItem("userLoggedIn")
        userSession = localStorage.getItem("userSession")
        userSession = JSON.parse(userSession)
        this.setState({userLoggedIn: userLoggedIn})
        if(userLoggedIn === "true"){
            Router.push("/home")
        }
        this.props.fetchTrendingTracksList(this.state.page).then(()=>{
            console.log(this.props.trendingListResponse)
            this.setState({trendingListResponse:this.props.trendingListResponse,trendingList:this.props.trendingListResponse.beats_detail})
        })
    }
    renderTrending() {
        if (this.state.trendingList) {
            if (this.state.trendingList.length === 0) {
                return (
                    <div className="col-md-12">
                        <h3 className="text-center text-color-white">No Records To Show</h3>
                    </div>
                );
            }
            return this.state.trendingList.slice(0, 4).map(result => {
                return (
                    <div className="col-md-3 custom-trending-card">
                        <div className="trending-custom-img" onClick={() => this.playSong(result)}>
                            {/*<ReactImageAppear*/}
                            {/*    src={result.photo_main}*/}
                            {/*    animation="fadeIn"*/}
                            {/*    easing="ease-in"*/}
                            {/*    showLoader={false}*/}
                            {/*    animationDuration="1s"*/}
                            {/*    placeholder alt=""/>*/}
                            <img src={result.photo_main}/>
                        </div>
                        <div className="trending-custom-info-text">
                            <span><Link href={`/m-details/${result.username_slug}/${result.slug}`}
                                        className="music-name">{result.song_title.slice(0, 10)}</Link> by <Link href={`/u-details/${result.username_slug}`} className="user-name">{result.username}</Link></span>
                        </div>
                    </div>
                );
            });
        }
    }
    playSong(data) {
        console.log(data)
        this.props.fetchRandomMusic().then(()=>{
            const filterPlaylist = this.props.randomMusicResponse.random_song_list.filter(q => !!q).map(item =>{
                if (item.song_title !== data.song_title) {
                    return {
                        song_title: item.song_title,
                        description: item.description,
                        photo_main: item.photo_main,
                        audio_file: item.audio_file
                    }
                    if (item.song_title === data.song_title){
                        return null
                    }
                }
            }).filter(q => !!q)
            const filterData = {data: data,playlist:filterPlaylist, action: "play"}
            this.props.playMusic(filterData)
            this.props.playCount(data.id)
        })
    }

    render() {
        return (
            <div className="container-fluid">
                <div className=" custom-top-content">
                    <div className="custom-transparent-bg black-overlay">
                        <div className="custom-z-index-2000 row w-100 d-flex d-inline-flex">
                            <div className="col-md-4 custom-landing-heading">
                                <h4 className="text-color-white custom-heading-text">DIGITVL</h4>
                            </div>
                            <ul className="col-md-6 nav margin-top-68 justify-content-end">
                                <li className="nav-item custom-landing-right-nav-text"><Link href={`/home`}>Home</Link></li>
                                <li className="nav-item custom-landing-right-nav-text margin-horizontal-72"><Link
                                    href={`/login`}>Login</Link></li>
                                <li className="nav-item custom-landing-right-nav-text"><Link href={`/register`}>Register</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="custom-landing-page-center-content-style mx-md-auto text-center">
                            <h3>Hub For Independent Creators</h3>
                            <p>Share your content/music, sell merchandise, post on our forum!</p>
                            <button className="btn custom-explore-btn">Explore</button>
                        </div>
                    </div>
                </div>


                <div className="custom-landing-about-section">
                    <div className="container pb-5">
                        <div className="row justify-content-center section-title">
                            <h2 className="section-title-heading">About DIGITVL</h2>
                        </div>
                        <div className="row d-flex justify-content-center text-center mt-5">
                            <div className="col-md-4 custom-card-about-section">
                                <img src="images/music_icon.svg"/>
                                <p>Become A Creator</p>
                                <span>Gain inspiration by uploading your creative audio and sharing it. Upload music, beats or podcasts.</span>
                            </div>
                            <div className="col-md-4 custom-card-about-section2">
                                <img src="images/community_icon.svg"/>
                                <p>Socialize</p>
                                <span>Interact with other users on the platform. Grow your audience, share playlists. Earn points for interacting with others.</span>
                            </div>
                            <div className="col-md-4 custom-card-about-section3">
                                <img src="images/coins_icon.svg"/>
                                <p>Earn</p>
                                <span>Sell your music, merchandise or bundle it together! Earn digital currency for your streams. Redeem them for great perks!</span>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="custom-landing-trending-section">
                    <div className="container">
                        <div className="row justify-content-center section-title">
                            <h2 className="section-title-heading">Trending On DIGITVL</h2>
                        </div>

                        <div className="row d-flex justify-content-center text-center mt-5">
                            {this.renderTrending()}
                        </div>

                    </div>
                </div>
                <div className="custom-support-us-section">
                    <div className="container">
                        <div className="row justify-content-center section-title">
                            <h2 className="section-title-heading">Support Us</h2>
                        </div>
                        <div className="row d-flex justify-content-center text-center mt-5">
                            <div className="col-md-12 custom-donate-section">
                                <img src="images/donation_icon.svg"/>
                                <h3>Donate</h3>
                                <p>Support our efforts to support independent artists</p>
                                <button className="btn custom-donate-btn">Donate</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="custom-forcreators-section">
                    <div className="artist-section-content">
                    <div className="container row">
                        <div className="col-md-6 my-auto pl-5">
                            <h3>For Creators!</h3>
                            <p>Get on DIGITVL to socialize with your fans, share your sounds/beats/music, and grow your audience and much more!. What are you waiting for?</p>
                        </div>
                        <div className="col-md-4">
                            <img src="images/artist_image_2.png" />
                        </div>
                    </div>

                    </div>
                </div>


                <div className="custom-footer">
                    <p className="my-auto text-center pt-5">© 2021 Digitvl | All rights reserved</p>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        trendingListResponse: state.fetchTrending.trendingTracksData,
        randomMusicResponse:state.fetchRandomMusic.musicRandomFetchData
    }
}


export default connect(mapStateToProps,{fetchTrendingTracksList,playMusic,playCount,fetchRandomMusic})(LandingPage);