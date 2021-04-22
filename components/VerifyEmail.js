import React, {Component} from 'react';
import {connect} from "react-redux";
import {verifyEmailApi} from "../actions";
import Link from "next/link"
class VerifyEmail extends Component {
    state = {text: ""}

    componentDidMount() {
        const formData = new FormData();
        formData.append("token",this.props.match.params.token)
        this.props.verifyEmailApi(formData).then(() => {
            if (this.props.verifyUserResponse.status) {
                this.setState({text: "Your email is verified! You can enjoy the platform now."})
            } else {
                this.setState({text: "There is something wrong.Please try again!"})
            }
        })
    }
    render() {
        return (
            <div>
                
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        verifyUserResponse: state.verifyUser.verifyUserResponseData
    }
}
export default connect(mapStateToProps, {verifyEmailApi})(VerifyEmail);