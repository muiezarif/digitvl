import React, {Component} from 'react';
import Navbar from "./Navbar";
import {NextSeo} from "next-seo";
import {connect} from "react-redux";
import {getCurrentUserDigitvlCoins} from "../actions";
class UserWallet extends Component {
    state = {coins: 0}
    componentDidMount() {
        let userSession = localStorage.getItem("userSession")
        userSession = JSON.parse(userSession)
        this.props.getCurrentUserDigitvlCoins(userSession).then(()=>{
            // console.log(this.props.userCoinsResponse)
            this.setState({coins:this.props.userCoinsResponse.coins})
        })

    }
    render() {
        return (
            <div className="container-fluid loggedin-user-profile">
                <NextSeo
                    title="Wallet"
                    description="Checkout your DIGITVL Wallet"
                    openGraph={{
                        url: 'https://www.digitvl.com/wallet',
                        title: 'DIGITVL Wallet',
                        description: 'Checkout your DIGITVL Wallet',
                        site_name: 'DIGITVL',
                        type:'website'
                    }}
                    additionalMetaTags={[
                        {
                            property:"twitter:image",
                            content:'https://www.digitvl.com/images/landing_bg_img.png'
                        },
                        {
                            property:"twitter:image:src",
                            content:'https://www.digitvl.com/images/landing_bg_img.png'
                        },
                        {
                            property:"og:image",
                            content:'https://www.digitvl.com/images/landing_bg_img.png'
                        },
                        {
                            property:"og:image:width",
                            content:800
                        },
                        {
                            property:"og:image:height",
                            content:500
                        }
                    ]}
                    twitter={{
                        handle: '@digitvl',
                        site: '@digitvl',
                        cardType: 'summary_large_image',
                        image:'https://www.digitvl.com/images/landing_bg_img.png'
                    }}
                />
                <Navbar/>
                <div className="container-fluid">
                    <div className="custom-wallet-title mt-5">
                        <span>Wallet</span>
                    </div>
                    <div className="row custom-row-margin mt-5">
                        <div className="col-md-5 col-sm-6 custom-totalcoins-bg">
                            <div className="d-flex flex-column mt-5">
                            <span className="custom-total-coins-title ml-5">Your DIGITVL Points</span>
                            <span className="custom-total-coins ml-5">{this.state.coins}</span>
                            </div>
                        </div>
                        <div className="col-md-5 col-sm-6 custom-how-to-earn-coins pt-5">
                            <span className="custom-earn-title ml-5">How To Earn DIGITVL Points</span>
                            <div className="row custom-row-margin">
                                <div className="col-md-12 col-sm-6 mt-3">
                                    <p className="custom-earn-sections"><i className="ml-3 mr-3">•</i>By Uploading Music/Beats/Songs.</p>
                                    <p className="custom-earn-sections"><i className="ml-3 mr-3">•</i>By Inviting Artists and different Users on DIGITVL.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row custom-row-margin">
                        <div className="col-md-8 custom-how-to-use-digitvl-coins mt-5 pt-5">
                            <span className="custom-earn-title ml-5">How To Use DIGITVL Points</span>
                            <div className="row custom-row-margin">
                                <div className="col-md-12 col-sm-6 mt-3">
                                    <p className="custom-earn-sections"><i className="ml-3 mr-3">•</i>Feature your song in featured section with 100 DIGITVL points from your profile by pressing (A) on your profile track list.</p>
                                    <p className="custom-earn-sections"><i className="ml-3 mr-3">•</i>You can get more upload time by redeeming DIGITVL points(Coming Soon).</p>
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
        userCoinsResponse: state.userCoins.getCoinsData
    }
}
export default connect(mapStateToProps,{getCurrentUserDigitvlCoins})(UserWallet);