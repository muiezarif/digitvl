import React from "react";
import * as ReactBootstrap from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";
import SearchBar from "./SearchBar";
import Router from "next/router";
let userLoggedIn
let userSession
class Navbar extends React.Component {
    state = {userLoggedIn: false, coins: 0, is_staff: false, notificationCount: 0,userImage: "http://nicesnippets.com/demo/1499344631_malecostume.png"}

    componentDidMount() {
        let userLoggedIn = localStorage.getItem("userLoggedIn")
        let userSession = localStorage.getItem("userSession")
        userSession = JSON.parse(userSession)
        if(userLoggedIn === "true"){
            this.setState({userLoggedIn:true,coins:userSession.user.coins,is_staff:userSession.user.is_staff})
        }
        if (userSession.user) {
            this.setState({verified_blue_tick:userSession.user.profile.blue_tick_verified})
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
    onProfileClick = () =>{
        Router.push("/profile")
    }
    onFeedsClick = () =>{
        Router.push("/feeds")
    }
    onNotificationsClick = () =>{
        Router.push("/notifications")
    }
    onLibraryClick = () =>{
        Router.push("/library")
    }
    onPostBlogClick = () =>{
        Router.push("/post-blog")
    }
    onWalletClick = () =>{
        Router.push("/wallet")
    }
    render() {

        return (
            <div>
                <div className="container-fluid custom-navbar-z-index">
                    <ReactBootstrap.Navbar className="custom-top-navbar-platform" fixed="top" collapseOnSelect
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
                            <ReactBootstrap.Nav className="my-auto mr-2 custom-navbar-top-links"><Image
                                src="/images/home_icon.svg" width={20} height={20} className="my-auto"/><Link
                                href="/home"> Home</Link></ReactBootstrap.Nav>
                            <ReactBootstrap.Nav className="my-auto mr-2 custom-navbar-top-links"><Image
                                src="/images/trending_icon.svg" width={20} height={20} className="my-auto"/><Link
                                href="/trending"> Trending</Link></ReactBootstrap.Nav>
                            <ReactBootstrap.Nav className="my-auto mr-2 custom-navbar-top-links"><Image
                                src="/images/blogs_icon.svg" width={20} height={20} className="my-auto"/><Link
                                href="/blogs"> Blogs</Link></ReactBootstrap.Nav>
                            <ReactBootstrap.Nav className="my-auto mr-2 custom-navbar-top-links"><Image
                                src="/images/dollar_icon.svg" width={20} height={20} className="my-auto"/><Link
                                href="/donate"> Donate</Link></ReactBootstrap.Nav>
                            <ReactBootstrap.Nav className="my-auto mr-2 custom-navbar-top-links"><Image
                                src="/images/support_icon.svg" width={20} height={20} className="my-auto"/><Link
                                href="/support"> Support</Link></ReactBootstrap.Nav>
                            <ReactBootstrap.Nav className="my-auto mr-2 custom-navbar-top-links"><Image
                                src="/images/shop_icon.svg" width={20} height={20} className="my-auto"/><a target="_blank"
                                                                                   href="https://www.digitvl.shop"> Store</a></ReactBootstrap.Nav>
                            <SearchBar className="my-auto" />
                            {this.state.userLoggedIn ? <div className="navbar ml-auto custom-navbar-top-right-links">
                            <ReactBootstrap.Nav className="my-auto mr-2 custom-navbar-top-links"><Link href="/upload"><div className="btn custom-upload-btn">
                                Upload
                            </div></Link>
                            </ReactBootstrap.Nav>
                            <ReactBootstrap.Nav className="my-auto mr-2 custom-navbar-top-links"><div onClick={this.onNotificationsClick} className="btn">{this.state.notificationCount > 0?this.state.notificationCount:null}<i className="fas fa-bell"/></div></ReactBootstrap.Nav>
                            <ReactBootstrap.Nav className="my-auto mr-2 custom-navbar-top-links">
                                {/*<button className="navbar-toggler" type="button" data-toggle="collapse"*/}
                                {/*        data-target="#navbar-list-4" aria-controls="navbarNav" aria-expanded="false"*/}
                                {/*        aria-label="Toggle navigation">*/}
                                {/*    <span className="navbar-toggler-icon"></span>*/}
                                {/*</button>*/}
                                {/*<div className="collapse navbar-collapse" id="navbar-list-4">*/}
                                {/*    <ul className="navbar-nav">*/}
                                        <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink"
                                               role="button" data-toggle="dropdown" aria-haspopup="true"
                                               aria-expanded="false">
                                                <img
                                                    src={this.state.userImage}
                                                    width="60" height="60" className="rounded-circle custom-rounded-circle"/>
                                            </a>
                                            <div className="dropdown-menu pr-5 mr-5" aria-labelledby="navbarDropdownMenuLink">
                                                <div onClick={this.onProfileClick} className="btn dropdown-item">Profile</div>
                                                <div onClick={this.onWalletClick} className="btn dropdown-item">Wallet</div>
                                                <div onClick={this.onLibraryClick} className="btn dropdown-item">Library</div>
                                                <div onClick={this.onFeedsClick} className="btn dropdown-item">Feeds</div>
                                                {this.state.is_staff ?<div onClick={this.onPostBlogClick} className="dropdown-item">Post Blog</div>:null}
                                                <div className="btn dropdown-item" onClick={this.onLogoutClick}>Log Out</div>
                                            </div>
                                        </li>
                                    {/*</ul>*/}
                                {/*</div>*/}
                            </ReactBootstrap.Nav>
                                {/*<ReactBootstrap.Nav className="my-auto mr-2 custom-navbar-top-links-accent"><Image*/}
                                {/*    src="images/logout_icon.svg" className="my-auto"/><Link*/}
                                {/*    href="/"> Logout</Link></ReactBootstrap.Nav>*/}
                            </div>:<div className="navbar ml-auto custom-navbar-top-right-links">
                                <ReactBootstrap.Nav className="my-auto mr-2 custom-navbar-top-links"><Link
                                    href="/login"> Login</Link></ReactBootstrap.Nav>
                                <ReactBootstrap.Nav className="my-auto mr-2 custom-navbar-top-links"><Link
                                    href="/register"> Register</Link></ReactBootstrap.Nav>
                            </div>}


                        </ReactBootstrap.Navbar.Collapse>
                    </ReactBootstrap.Navbar>
                </div>
            </div>
        );
    }

}

export default Navbar;