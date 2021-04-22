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
            <div>
                
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