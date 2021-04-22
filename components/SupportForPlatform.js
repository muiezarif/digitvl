import React, {Component} from 'react';
import Navbar from "./Navbar";
import * as ReactBootstrap from "react-bootstrap";
import {confirmAlert} from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';
import {supportRequest} from "../actions";
import {connect} from "react-redux";
class SupportForPlatform extends Component {
    state = {openFaqVendorRegister:false,name:"",email:"",accountHelp:"",request:""}
    render() {
        const handleChange = (e) => {
            const isCheckbox = e.target.type === "checkbox";
            this.setState({[e.target.name]: isCheckbox ? e.target.checked : e.target.value})
        }
        const onSubmit = (e) => {
            e.preventDefault();
            const formData = new FormData();
            formData.append("name", this.state.name);
            formData.append("email", this.state.email);
            formData.append("support_type", this.state.accountHelp);
            formData.append("support_message", this.state.request);
            this.props.supportRequest(formData).then(()=>{
                this.setState({name:"",email:"",accountHelp:"",request:""})
                const options = {
                    title: 'Support Team',
                    message: this.props.supportRequestResponse.message,
                    buttons: [
                        {
                            label: 'Okay',
                            onClick: () => {}
                        }
                    ],
                    closeOnEscape: true,
                    closeOnClickOutside: true,
                    willUnmount: () => {},
                    afterClose: () => {},
                    onClickOutside: () => {},
                    onKeypressEscape: () => {}
                };
                confirmAlert(options)
            }).catch(err =>{
                const options = {
                    title: 'Error',
                    message: "Something wrong with the form submitted",
                    buttons: [
                        {
                            label: 'Okay',
                            onClick: () => {}
                        }
                    ],
                    closeOnEscape: true,
                    closeOnClickOutside: true,
                    willUnmount: () => {},
                    afterClose: () => {},
                    onClickOutside: () => {},
                    onKeypressEscape: () => {}
                };
                confirmAlert(options)
            })
        }
        return (
            <div className="container-fluid loggedin-user-profile">
                <Navbar/>
                <div className="container-fluid">
                    <div className="row custom-row-margin">
                        <div className="col-md-6 col-sm-6">
                            <form onSubmit={onSubmit} className="form-box pt-3 pt-sm-3">
                                <div className="container-fluid w-75 h-100 custom-login-form custom-bg-dark pb-5 mx-auto mx-md-auto mx-sm-auto">
                                    <div className="text-center custom-login-heading pt-5">Support</div>
                                    <div className="custom-input w-100 mt-2 text-center">
                                        <input className="mx-auto w-75" name="name" type="text" onChange={handleChange} value={this.state.name} placeholder="Name" tabIndex="1" required/>
                                    </div>
                                    <div className="custom-input w-100 mt-2 text-center">
                                        <input className="mx-auto w-75" name="email" type="email" onChange={handleChange} value={this.state.email} placeholder="Email" tabIndex="2" required/>
                                    </div>
                                    <div className="form-input w-75 text-center justify-content-center align-content-center align-items-center mx-auto">
                                        <label htmlFor="exampleFormControlSelect1" className="text-accent font-weight-bold">What do you need assistance with?</label>
                                        <select className="form-control custom-option-color-white" onChange={(e) => {
                                            this.setState({accountHelp: e.target.value})
                                        }} tabIndex="3" id="exampleFormControlSelect1">
                                            <option className="custom-option-color-white">Select issue type</option>
                                            <option className="custom-option-color-white">Account Help</option>
                                            <option className="custom-option-color-white">Issue Logging in</option>
                                            <option className="custom-option-color-white">Issues with DIGITVL shop</option>
                                            <option className="custom-option-color-white">Other</option>
                                        </select>
                                    </div>
                                    <div className="form-input custom-border-accent mt-3 w-75 text-center justify-content-center align-content-center align-items-center mx-auto">
                                        <textarea name="request" value={this.state.request} onChange={handleChange} placeholder="Explain support request" className="form-control custom-border-accent" tabIndex="4" required/>
                                    </div>
                                    <div className="w-50 mt-3 mx-auto">
                                        <button type="submit" tabIndex="3" className="custom-login-button btn btn-block">
                                            Request Support
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="col-md-5 col-sm-5 custom-margin-faqs">
                            <div className="custom-faqs-bg pt-4 pb-4">
                                <span className="custom-faqs-title ml-5">FAQs</span>
                                <div className="ml-5 mt-3 custom-text-color-faqs-section">
                                <ReactBootstrap.Accordion
                                    className="text-accent font-weight-bold"
                                    onClick={() => this.setState({openFaqVendorRegister:!this.state.openFaqVendorRegister})}
                                    aria-controls="example-collapse-text"
                                    aria-expanded={this.state.openFaqVendorRegister}
                                >
                                    Vendor Registration +
                                </ReactBootstrap.Accordion>
                                <ReactBootstrap.Collapse in={this.state.openFaqVendorRegister}>
                                    <div id="example-collapse-text">
                                        <p className="font-weight-bold">Things To Know Before You <span onClick={()=> window.open("https://digitvl.shop/vendor-register/", "_blank")} className="text-link-accent pointer-cursor">Open Your Store</span></p>
                                        <p><b className="font-weight-bold">⚫</b> You MUST have an active account with music uploaded in order to be approved.</p>
                                        <p><b className="font-weight-bold">⚫</b> You MUST have a complete profile on DIGITVL.COM (profile picture, banner, album cover, mjusic uploaded)</p>
                                        <p><b className="font-weight-bold">⚫</b> Your uploaded products must relate to your music or artist brand, any other products will be deleted.</p>
                                    </div>
                                </ReactBootstrap.Collapse>
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
        supportRequestResponse:state.supportRequest.supportRequestData
    }
}
export default connect(mapStateToProps,{supportRequest})(SupportForPlatform);