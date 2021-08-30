import React from "react";
import * as ReactBootstrap from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";
import SearchBar from "./SearchBar";
import Router from "next/router";
import {connect} from "react-redux";
import {fetchWebsiteAnnouncement, fetchAdData, posterRewards} from "../actions";
import dynamic from "next/dynamic";
// import AdModal from "./modals/AdModal";
const AdModal = dynamic(() => import('./modals/AdModal'), {ssr: false})


let userLoggedIn
let userSession

class Navbar extends React.Component {
    state = {
        userLoggedIn: false,
        coins: 0,
        is_staff: false,
        notificationCount: 0,
        userImage: "http://nicesnippets.com/demo/1499344631_malecostume.png",
        announcement: "",
        userSubscriptionManage: false,
        adResponseImage: "",
        adResponseDescription: "",
        adResponseRedirectUrl: "",
        adResponseId: 0
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    componentDidMount() {
        let userLoggedIn = localStorage.getItem("userLoggedIn")
        let userSession = localStorage.getItem("userSession")
        userSession = JSON.parse(userSession)

        this.interval = setInterval(() => {
            this.props.fetchAdData().then(() => {
                console.log(this.props.adDataResponse)
                if (this.props.adDataResponse.results.length > 0) {
                    this.setState({
                        adModalShow: true,
                        adResponseImage: this.props.adDataResponse.results[0].advertisement_image,
                        adResponseDescription: this.props.adDataResponse.results[0].description,
                        adResponseRedirectUrl: this.props.adDataResponse.results[0].advertisement_url,
                        adResponseId: this.props.adDataResponse.results[0].id
                    })
                }
            })
        }, 900000);
        // this.props.fetchWebsiteAnnouncement().then(() => {
        //     this.setState({announcement: this.props.announcementResponse.results[0].announcement})
        // })
        if (userLoggedIn === "true") {
            this.setState({
                userLoggedIn: true,
                coins: userSession.user.coins,
                is_staff: userSession.user.is_staff,
                userSubscriptionManage: userSession.user.membership_plan.subscription_badge
            })
            if (userSession.user) {
                this.setState({verified_blue_tick: userSession.user.profile.blue_tick_verified})
                if (userSession.user.profile.avatar) {
                    this.setState({
                        userImage: userSession.user.profile.avatar
                    })
                }
            }
            if (userSession.profile) {
                if (userSession.profile.avatar) {
                    this.setState({
                        userImage: userSession.profile.avatar
                    })
                }
            }
        }

    }

    renderLogin = () => {
        if (!this.state.userLoggedIn && (this.props.login || this.props.home)) {
            return (
                <ReactBootstrap.Nav className="my-auto mr-2"><Link className="text-color-links" href="/login">Login <i
                    className="fas fa-sign-in-alt"/></Link></ReactBootstrap.Nav>
            );
        }
    }
    renderRegister = () => {
        if (!this.state.userLoggedIn && (this.props.register || this.props.home)) {
            return (
                <ReactBootstrap.Nav className="my-auto mr-2"><Link className="text-color-links"
                                                                   href="/register">Register <i
                    className="fas fa-user-alt"/></Link></ReactBootstrap.Nav>
            );
        }
    }
    onLogoutClick = () => {
        localStorage.clear()
        Router.push("/")
    }
    onProfileClick = () => {
        Router.push("/profile")
    }
    onUploadClick = () => {
        Router.push("/upload")
    }
    onPromoteMusicClick = () => {
        window.open("https://ads.digitvl.com", "_blank")
    }
    onFeedsClick = () => {
        Router.push("/feeds")
    }
    onSupportClick = () => {
        Router.push("/support")
    }
    onRemasterClick = () => {
        Router.push("/remastering")
    }
    onBuyCoinsClick = () => {
        Router.push("/buycoins")
    }
    onRedeemClick = () => {
        Router.push("/redeem")
    }
    onSubscriptionClick = () => {
        Router.push("/subscriptions")
    }
    onManageSubscriptionClick = () => {
        Router.push("/manage-subscription")
    }
    onNotificationsClick = () => {
        Router.push("/notifications")
    }
    onLibraryClick = () => {
        Router.push("/library")
    }
    onPostBlogClick = () => {
        Router.push("/post-blog")
    }
    onWalletClick = () => {
        Router.push("/wallet")
    }
    onAdRedirect = () => {
        let userSession = localStorage.getItem("userSession")
        userSession = JSON.parse(userSession)
        this.props.posterRewards(userSession, this.state.adResponseId).then(() => {

        })
        this.setState({adModalShow: false})
        window.open(this.state.adResponseRedirectUrl, "_blank")
    }
    renderAdModel = () => {
        return (
            <AdModal open={this.state.adModalShow} onClose={() => {
                this.setState({adModalShow: false})
            }}>
                {/*<div className="card w-25">*/}
                <img src={this.state.adResponseImage} className="card-img-top img-fluid custom-ad-img"/>
                <div className="card-body">
                    <p className="card-text text-center">{this.state.adResponseDescription}</p>
                </div>
                <div className="btn btn-primary text-center" onClick={this.onAdRedirect}>Go</div>
                {/*</div>*/}
                {/*<div className="card" style="width: 8rem;">*/}
                {/*    <img className="card-img-top" src={this.state.adResponseImage} alt="Card image cap"/>*/}
                {/*        <div className="card-body">*/}
                {/*            <h5 className="card-title">Info</h5>*/}
                {/*            <p className="card-text">{this.state.adResponseDescription}</p>*/}
                {/*            <a href="#" className="btn btn-primary">Go somewhere</a>*/}
                {/*        </div>*/}
                {/*</div>*/}
            </AdModal>
        )
    }

    render() {

        return (
            <div>
                {/*{this.state.announcement ?<div className="alert alert-warning alert-dismissible fade show" role="alert">*/}
                {/*    <strong>{this.state.announcement}</strong>*/}
                {/*    <button type="button" className="close" data-dismiss="alert" aria-label="Close">*/}
                {/*        <span aria-hidden="true">&times;</span>*/}
                {/*    </button>*/}
                {/*</div>:null}*/}
                <div className="container-fluid custom-navbar-z-index">
                    <ReactBootstrap.Navbar className="custom-top-navbar-platform" collapseOnSelect
                                           expand="lg" variant="dark">
                        <Link href="/">
                            <ReactBootstrap.Navbar.Brand className="btn custom-top-navbrand my-auto">
                                <Image
                                    alt=""
                                    src={`/images/logo2.png`}
                                    width="60"
                                    height="30"
                                    className="d-inline-block my-auto mb-2"/>
                                {' '}
                                DIGITVL
                            </ReactBootstrap.Navbar.Brand>
                        </Link>
                        <ReactBootstrap.Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                        <ReactBootstrap.Navbar.Collapse id="responsive-navbar-nav">
                            {this.state.userLoggedIn ?
                                <ReactBootstrap.Nav className="my-auto mr-2 custom-navbar-top-links"><img
                                    src="/images/feeds_icon.svg" width={20} height={20} className="my-auto"/><Link
                                    href="/feeds"> Feeds</Link></ReactBootstrap.Nav> : null}
                            <ReactBootstrap.Nav className="my-auto mr-2 custom-navbar-top-links"><img
                                src="/images/home_icon.svg" width={20} height={20} className="my-auto"/><Link
                                href="/home"> Home</Link></ReactBootstrap.Nav>
                            <ReactBootstrap.Nav className="my-auto mr-2 custom-navbar-top-links"><img
                                src="/images/trending_icon.svg" width={20} height={20} className="my-auto"/><Link
                                href="/trending"> Trending</Link></ReactBootstrap.Nav>
                            <ReactBootstrap.Nav className="my-auto mr-2 custom-navbar-top-links"><img
                                src="/images/blogs_icon.svg" width={20} height={20} className="my-auto"/><Link
                                href="/blogs"> Blogs</Link></ReactBootstrap.Nav>
                            <ReactBootstrap.Nav className="my-auto mr-2 custom-navbar-top-links"><img
                                src="/images/dollar_icon.svg" width={20} height={20} className="my-auto"/><Link
                                href="/exclusive"> Exclusive</Link></ReactBootstrap.Nav>
                            {/*<ReactBootstrap.Nav className="my-auto mr-2 custom-navbar-top-links"><img*/}
                            {/*    src="/images/support_icon.svg" width={20} height={20} className="my-auto"/><Link*/}
                            {/*    href="/support"> Support</Link></ReactBootstrap.Nav>*/}
                            <ReactBootstrap.Nav className="my-auto mr-2 custom-navbar-top-links"><img
                                src="/images/shop_icon.svg" width={20} height={20} className="my-auto"/><a
                                target="_blank"
                                href="https://www.digitvl.shop"> Shop</a></ReactBootstrap.Nav>
                            <SearchBar className="my-auto"/>
                            {this.state.userLoggedIn ? <div className="navbar ml-auto custom-navbar-top-right-links">
                                {/*<ReactBootstrap.Nav className="my-auto mr-2 custom-navbar-top-links"><Link*/}
                                {/*    href="/upload">*/}
                                {/*    <div className="btn custom-upload-btn">*/}
                                {/*        Upload*/}
                                {/*    </div>*/}
                                {/*</Link>*/}
                                {/*</ReactBootstrap.Nav>*/}
                                <ReactBootstrap.Nav className="my-auto mr-2 custom-navbar-top-links">
                                    <div onClick={this.onNotificationsClick}
                                         className="btn">{this.state.notificationCount > 0 ? this.state.notificationCount : null}<i
                                        className="fas fa-bell"/></div>
                                </ReactBootstrap.Nav>
                                <ReactBootstrap.Nav className="my-auto mr-2 custom-navbar-top-links">
                                    {/*<button className="navbar-toggler" type="button" data-toggle="collapse"*/}
                                    {/*        data-target="#navbar-list-4" aria-controls="navbarNav" aria-expanded="false"*/}
                                    {/*        aria-label="Toggle navigation">*/}
                                    {/*    <span className="navbar-toggler-icon"></span>*/}
                                    {/*</button>*/}
                                    {/*<div className="collapse navbar-collapse" id="navbar-list-4">*/}
                                    {/*    <ul className="navbar-nav">*/}
                                    {/*        <li className="nav-item dropdown">*/}
                                    {/*            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink"*/}
                                    {/*               role="button" data-toggle="dropdown" aria-haspopup="true"*/}
                                    {/*               aria-expanded="false">*/}
                                    {/*                <img*/}
                                    {/*                    src={this.state.userImage}*/}
                                    {/*                    width="60" height="60" className="rounded-circle custom-rounded-circle"/>*/}
                                    {/*            </a>*/}
                                    {/*            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">*/}
                                    {/*                */}
                                    {/*                */}
                                    {/*                */}
                                    {/*                */}
                                    {/*                {this.state.is_staff ?:null}*/}
                                    {/*                */}
                                    {/*            </div>*/}
                                    {/*        </li>*/}
                                    {this.state.userLoggedIn ? (<ReactBootstrap.Dropdown>
                                        <ReactBootstrap.Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                            <img
                                                src={this.state.userImage}
                                                width="80" height="80"
                                                className="rounded-circle custom-rounded-circle"/>
                                        </ReactBootstrap.Dropdown.Toggle>

                                        <ReactBootstrap.Dropdown.Menu className="mr-5 custom-dropdown-navbar">
                                            <ReactBootstrap.Dropdown.Item>{this.state.userLoggedIn ? (
                                                <ReactBootstrap.Nav className="my-auto">
                                                    <div onClick={this.onProfileClick} className="btn dropdown-item"><i
                                                        className="fas fa-user-circle"/> Profile
                                                    </div>
                                                </ReactBootstrap.Nav>) : null}</ReactBootstrap.Dropdown.Item>
                                            <ReactBootstrap.Dropdown.Item>{this.state.userLoggedIn ? (
                                                <ReactBootstrap.Nav className="my-auto">
                                                    <div onClick={this.onUploadClick} className="btn dropdown-item"><i
                                                        className="fas fa-music"/> Upload Music
                                                    </div>
                                                </ReactBootstrap.Nav>) : null}</ReactBootstrap.Dropdown.Item>
                                            <ReactBootstrap.Dropdown.Item>{this.state.userLoggedIn ? (
                                                <ReactBootstrap.Nav className="my-auto">
                                                    <div onClick={this.onPromoteMusicClick} className="btn dropdown-item"><i
                                                        className="fas fa-ad"/> Promote your music
                                                    </div>
                                                </ReactBootstrap.Nav>) : null}</ReactBootstrap.Dropdown.Item>
                                            <ReactBootstrap.Dropdown.Item>{this.state.userLoggedIn ? (
                                                <ReactBootstrap.Nav className="my-auto mr-2">
                                                    <div onClick={this.onWalletClick} className="btn dropdown-item"><i
                                                        className="fas fa-wallet"/> Wallet
                                                    </div>
                                                </ReactBootstrap.Nav>) : null}</ReactBootstrap.Dropdown.Item>
                                            <ReactBootstrap.Dropdown.Item>{this.state.userLoggedIn ? (
                                                <ReactBootstrap.Nav className="my-auto mr-2">
                                                    <div onClick={this.onLibraryClick} className="btn dropdown-item"><i
                                                        className="fas fa-book-reader"/> Library
                                                    </div>
                                                </ReactBootstrap.Nav>) : null}</ReactBootstrap.Dropdown.Item>
                                            {/*<ReactBootstrap.Dropdown.Item>{this.state.userLoggedIn ? (<ReactBootstrap.Nav className="my-auto mr-2"><ReactBootstrap.OverlayTrigger placement="bottom" overlay={renderRedeemCoinsTooltip}><Link className="text-color-links" to="/redeem-coins"><i className="fas fa-coins"/> Redeem Coins</Link></ReactBootstrap.OverlayTrigger></ReactBootstrap.Nav>) : null}</ReactBootstrap.Dropdown.Item>*/}
                                            {/*<ReactBootstrap.Dropdown.Item>{this.state.userLoggedIn ? (<ReactBootstrap.Nav className="my-auto mr-2"><div onClick={this.onFeedsClick} className="btn dropdown-item"><i className="fas fa-rss"/> Feeds</div> </ReactBootstrap.Nav>) : null}</ReactBootstrap.Dropdown.Item>*/}
                                            <ReactBootstrap.Dropdown.Item>{this.state.userLoggedIn ? (
                                                <ReactBootstrap.Nav className="my-auto mr-2">
                                                    <div onClick={this.onSupportClick} className="btn dropdown-item"><i
                                                        className="far fa-question-circle"/> Support
                                                    </div>
                                                </ReactBootstrap.Nav>) : null}</ReactBootstrap.Dropdown.Item>
                                            <ReactBootstrap.Dropdown.Item>{this.state.userLoggedIn ? (
                                                <ReactBootstrap.Nav className="my-auto mr-2">
                                                    <div onClick={this.onSubscriptionClick}
                                                         className="btn dropdown-item"><i
                                                        className="fas fa-credit-card"/> Subscription
                                                    </div>
                                                </ReactBootstrap.Nav>) : null}</ReactBootstrap.Dropdown.Item>
                                            <ReactBootstrap.Dropdown.Item>{this.state.userLoggedIn && this.state.userSubscriptionManage ? (
                                                <ReactBootstrap.Nav className="my-auto mr-2">
                                                    <div onClick={this.onManageSubscriptionClick}
                                                         className="btn dropdown-item"><i
                                                        className="fas fa-credit-card"/> Manage Plan
                                                    </div>
                                                </ReactBootstrap.Nav>) : null}</ReactBootstrap.Dropdown.Item>
                                            {/*<ReactBootstrap.Dropdown.Item>{this.state.userLoggedIn ? (<ReactBootstrap.Nav className="my-auto mr-2"><div onClick={this.onRemasterClick} className="btn dropdown-item"><i className="fas fa-microphone-alt"/> Remaster</div> </ReactBootstrap.Nav>) : null}</ReactBootstrap.Dropdown.Item>*/}
                                            <ReactBootstrap.Dropdown.Item>{this.state.userLoggedIn ? (
                                                <ReactBootstrap.Nav className="my-auto mr-2">
                                                    <div onClick={this.onBuyCoinsClick} className="btn dropdown-item"><i
                                                        className="fas fa-coins"/> Buy Coins
                                                    </div>
                                                </ReactBootstrap.Nav>) : null}</ReactBootstrap.Dropdown.Item>
                                            {/*<ReactBootstrap.Dropdown.Item>{this.state.userLoggedIn ? (<ReactBootstrap.Nav className="my-auto mr-2"><div onClick={this.onRedeemClick} className="btn dropdown-item"><i className="fa fa-gift"/> Redeem</div> </ReactBootstrap.Nav>) : null}</ReactBootstrap.Dropdown.Item>*/}
                                            <ReactBootstrap.Dropdown.Item>{this.state.userLoggedIn && this.state.is_staff ? (
                                                <ReactBootstrap.Nav className="my-auto mr-2">
                                                    <div onClick={this.onPostBlogClick} className="btn dropdown-item"><i
                                                        className="fas fa-rss"/> Post Blog
                                                    </div>
                                                </ReactBootstrap.Nav>) : null}</ReactBootstrap.Dropdown.Item>
                                            <ReactBootstrap.Dropdown.Item>{this.state.userLoggedIn ? (
                                                <ReactBootstrap.Nav className="my-auto mr-2 text-accent">
                                                    <div className="btn dropdown-item" onClick={this.onLogoutClick}>Log
                                                        Out
                                                    </div>
                                                </ReactBootstrap.Nav>) : null}</ReactBootstrap.Dropdown.Item>
                                        </ReactBootstrap.Dropdown.Menu>
                                    </ReactBootstrap.Dropdown>) : null}
                                    {/*</ul>*/}
                                    {/*</div>*/}
                                </ReactBootstrap.Nav>
                                {/*<ReactBootstrap.Nav className="my-auto mr-2 custom-navbar-top-links-accent"><Image*/}
                                {/*    src="images/logout_icon.svg" className="my-auto"/><Link*/}
                                {/*    href="/"> Logout</Link></ReactBootstrap.Nav>*/}
                            </div> : <div className="navbar ml-auto custom-navbar-top-right-links">
                                <ReactBootstrap.Nav className="my-auto mr-2 custom-navbar-top-links"><Link
                                    href="/login"> Login</Link></ReactBootstrap.Nav>
                                <ReactBootstrap.Nav className="my-auto mr-2 custom-navbar-top-links"><Link
                                    href="/register"> Register</Link></ReactBootstrap.Nav>
                            </div>}


                        </ReactBootstrap.Navbar.Collapse>
                    </ReactBootstrap.Navbar>
                </div>
                {this.renderAdModel()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        announcementResponse: state.websiteAnnouncement.announcementData,
        adDataResponse: state.adData.adDataResponse,
        posterRewardResponse: state.posterReward.posterRewardDataResponse
    }
}
export default connect(mapStateToProps, {fetchWebsiteAnnouncement, fetchAdData, posterRewards})(Navbar);