import React, {Component} from 'react';
import Navbar from "./Navbar";

class Subscriptions extends Component {
    render() {
        return (
            <div className="container-fluid loggedin-user-profile">
                <Navbar/>
                <div className="row custom-row-margin px-3 mt-5">
                    <div className="col-lg-10 col-xl-9 card flex-row mx-auto px-0 custom-bg-dark">
                        <div className="container pb-5">
                            <div className="row justify-content-center section-title">
                                <h2 className="section-title-heading">Subscriptions</h2>
                            </div>
                            <div className="row d-flex justify-content-center text-center mt-5">
                                <div className="col-md-4 custom-card-about-section mx-auto">
                                    {/*<img src="images/music_icon.svg"/>*/}
                                    <p>Standard</p>
                                    <div className="row">
                                        <div className="col-md-12 text-left">
                                            <span>• Unlimited Uploads(wav or mp3) more than 15mb.</span>
                                        </div>
                                        <div className="col-md-12 text-left">
                                            <span>• Accept Artist donations.</span>
                                        </div>
                                        <div className="col-md-12 text-left">
                                            <span>• Ability to upload videos.</span>
                                        </div>
                                        <div className="col-md-12 text-left">
                                            <span>• Have badge appear next to their name throughout website.</span>
                                        </div>
                                        <div className="col-md-12 text-left">
                                            <span>• Downloading gets enabled.</span>
                                        </div>
                                        <div className="col-md-12 text-left">
                                            <span>• Users can purchase song for download.</span>
                                        </div>
                                        <div className="col-md-12 text-left">
                                            <span>• Artists set price in upload form.</span>
                                        </div>
                                        <div className="col-md-12 text-center">
                                            <span> <strike><b>$15</b></strike> sale for <b>7.99$</b></span>
                                        </div>
                                        <div className="col-md-12 mt-3">
                                            <div className="btn btn-outline-primary">Subscribe</div>
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

export default Subscriptions;