import React, {Component} from 'react';
import {connect} from "react-redux";
import {fetchTrendingTracksList,playMusic,playCount,fetchRandomMusic} from "../actions";
import Link from "next/link";
import Router from "next/router";
import Navbar from "./Navbar";
import Image from "next/image";
class Trending extends Component {
    state = {trendingListResponse:{},trendingList:[],page:1}

    componentDidMount() {
        this.props.fetchTrendingTracksList(this.state.page).then(()=>{
            console.log(this.props.trendingListResponse)
            this.setState({trendingListResponse:this.props.trendingListResponse,trendingList:this.props.trendingListResponse.beats_detail})
        })
    }
    playSong(data) {
        this.props.fetchRandomMusic().then(()=>{
            console.log(this.props.randomMusicResponse)
            const filterPlaylist = this.props.randomMusicResponse.random_song_list.filter(q => !!q).map(item =>{
                if (item.song_title !== data.song_title) {
                    // console.log(item)
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
            console.log(filterPlaylist)
            const filterData = {data: data,playlist:filterPlaylist, action: "play"}
            this.props.playMusic(filterData)
            this.props.playCount(data.id)
        })
    }
    renderTrendingList=()=>{
        if (this.state.trendingList) {
            if (this.state.trendingList.length === 0) {
                return (
                    <div className="col-md-12">
                        <h3 className="text-center">No tracks trending!</h3>
                    </div>
                );
            }
            return this.state.trendingList.map(result => {
                return (
                    <div className="row col-md-12 col-sm-6 col-xs-6 pt-2 pb-2 custom-trending-item-bg">
                        <div className="col-md-2 col-sm-6">
                            <img src={result.photo_main} height="130" width="130" className="mt-2 mb-2 custom-trending-item-cover-img"/>
                        </div>
                        <div className="col-md-6 col-sm-12 col-xs-12 mt-2">
                            <div className="d-flex flex-column">
                                <div className="d-flex flex-row custom-trending-item-artist-track">
                                    <Link href={`/u-details/${result.username_slug}`}>{result.username}</Link>
                                    <i className="ml-3 mr-3">•</i>
                                    <Link href={`/m-details/${result.username_user}/${result.slug}`}>{result.song_title.slice(0, 20)}</Link>
                                    <div className="ml-3 my-auto custom-trending-item-plays-count">
                                        ▶ {result.plays_count} plays
                                    </div>
                                </div>
                                <div className="d-flex flex-row mt-2 custom-trending-item-title">
                                    Title: {result.song_title}
                                </div>
                                <div className="d-flex flex-row mt-3 custom-trending-item-description">
                                    {result.description}
                                </div>

                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6 my-auto">
                            <div className="text-center mt-2" onClick={() => this.playSong(result)}>
                                <div className="btn btn-outline-primary">▶ Play</div>
                            </div>
                        </div>
                    </div>
                );
            })
        }
    }
    render() {
        return (
            <div className="container-fluid custom-trending-page">
                <Navbar/>
                <div className="custom-trending-heading">
                    Trending
                </div>
                <div className="container mt-5 mx-auto row">
                    {this.renderTrendingList()}
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

export default connect(mapStateToProps,{fetchTrendingTracksList,playCount,playMusic,fetchRandomMusic})(Trending);