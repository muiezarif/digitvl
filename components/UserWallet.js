import React, {Component} from 'react';
import Navbar from "./Navbar";
class UserWallet extends Component {
    state = {coins: 0}
    componentDidMount() {
        let userSession = localStorage.getItem("userSession")
        userSession = JSON.parse(userSession)
        this.setState({coins:userSession.user.coins})
    }
    render() {
        return (
            <div className="container-fluid loggedin-user-profile">
                <Navbar/>
                <div className="container-fluid">
                    <div className="custom-wallet-title mt-5">
                        <span>Wallet</span>
                    </div>
                    <div className="row custom-row-margin mt-5">
                        <div className="col-md-5 col-sm-6 custom-totalcoins-bg ml-5">
                            <div className="d-flex flex-column mt-5 ml-5">
                            <span className="custom-total-coins-title">Your DIGITVL Coins</span>
                            <span className="custom-total-coins">{this.state.coins}</span>
                            </div>
                        </div>
                        <div className="col-md-5 col-sm-6 custom-how-to-earn-coins ml-5 pt-5">
                            <span className="custom-earn-title ml-5">How To Earn DIGITVL Coins</span>
                            <div className="row custom-row-margin">
                                <div className="col-md-12 col-sm-6 mt-3">
                                    <p className="custom-earn-sections"><i className="ml-3 mr-3">•</i>By Uploading Music/Beats/Songs.</p>
                                    <p className="custom-earn-sections"><i className="ml-3 mr-3">•</i>By Inviting Artists and different Users on DIGITVL.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row custom-row-margin">
                        <div className="col-md-8 custom-how-to-use-digitvl-coins mt-5 ml-5 pt-5">
                            <span className="custom-earn-title ml-5">How To Use DIGITVL Coins</span>
                            <div className="row custom-row-margin">
                                <div className="col-md-12 col-sm-6 mt-3">
                                    <p className="custom-earn-sections"><i className="ml-3 mr-3">•</i>Feature your song in featured section with 100 DIGITVL coins from your profile by pressing (A) on your profile track list.</p>
                                    <p className="custom-earn-sections"><i className="ml-3 mr-3">•</i>You can get more upload time by redeeming DIGITVL coins(Coming Soon).</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserWallet;