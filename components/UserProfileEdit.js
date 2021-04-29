import React, {Component} from 'react';
import Navbar from "./Navbar"
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import {connect} from "react-redux"
import {editUserProfile} from "../actions";
import Router from "next/router";
import Link from "next/link";
const initialState = {
    bio: "",
    location: "",
    dob: "",
    imageFileName: "",
    coverImageFileName: "",
    startDate: new Date(),
    imageFile: null,
    coverImageFile: null,
    errors: {},
    crop: {
        aspect:16/8
    },
    cropAvatar: {
        x:0,
        y:0
    },
    adjustedAvatarImage:null,
    adjustedCoverImage:null,
    zoom:1,
    croppedArea:null
};
let userSession
class UserProfileEdit extends Component {
    state = initialState
    componentDidMount() {
        userSession = localStorage.getItem("userSession")
        userSession = JSON.parse(userSession)
        if (userSession.user) {
            this.setState({bio: userSession.user.profile.bio, location: userSession.user.profile.location})
        }
        if (userSession.profile) {
            this.setState({bio: userSession.profile.bio, location: userSession.profile.location})
        }
    }
    onChange = (e) => {
        switch (e.target.name) {
            case "avatar":
                if (e.target.files.length > 0) {
                    // const reader = new FileReader()
                    // reader.readAsDataURL(e.target.files[0])
                    // reader.addEventListener("load",() =>{
                    //
                    // })
                    this.setState({imageFileName: e.target.files[0].name, imageFile: e.target.files[0]})

                }
                break;
            case "cover":
                if (e.target.files.length > 0) {
                    this.setState({coverImageFileName: e.target.files[0].name, coverImageFile: e.target.files[0]})
                }
                break;
            default:
                const isCheckbox = e.target.type === "checkbox";
                this.setState({[e.target.name]: isCheckbox ? e.target.checked : e.target.value});
        }
    }
    getCroppedAvatarImg = () => {
        const canvas = document.createElement('canvas');
        const scaleX = this.state.imageFile.naturalWidth / this.state.imageFile.width;
        const scaleY = this.state.imageFile.naturalHeight / this.state.imageFile.height;
        canvas.width = this.state.cropAvatar.width;
        canvas.height = this.state.cropAvatar.height;
        const ctx = canvas.getContext('2d');

        ctx.drawImage(
            this.state.imageFile,
            this.state.cropAvatar.x * scaleX,
            this.state.cropAvatar.y * scaleY,
            this.state.cropAvatar.width * scaleX,
            this.state.cropAvatar.height * scaleY,
            0,
            0,
            this.state.cropAvatar.width,
            this.state.cropAvatar.height,
        );

        // As Base64 string
        const base64Image = canvas.toDataURL('image/jpeg');
        this.setState({adjustedAvatarImage:base64Image})
        // As a blob
        // return new Promise((resolve, reject) => {
        //     canvas.toBlob(blob => {
        //         blob.name = fileName;
        //         resolve(blob);
        //     }, 'image/jpeg', 1);
        // });
    }
    getCroppedCoverImg = () => {
        const canvasCover = document.createElement('canvas');
        const scaleX = this.state.coverImageFile.naturalWidth / this.state.coverImageFile.width;
        const scaleY = this.state.coverImageFile.naturalHeight / this.state.coverImageFile.height;
        canvasCover.width = this.state.crop.width;
        canvasCover.height = this.state.crop.height;
        const ctx = canvasCover.getContext('2d');

        ctx.drawImage(
            this.state.coverImageFile,
            this.state.crop.x * scaleX,
            this.state.crop.y * scaleY,
            this.state.crop.width * scaleX,
            this.state.crop.height * scaleY,
            0,
            0,
            this.state.crop.width,
            this.state.crop.height,
        );

        // As Base64 string
        const base64Image = canvasCover.toDataURL('image/jpeg');
        this.setState({adjustedAvatarImage:base64Image})
        // As a blob
        // return new Promise((resolve, reject) => {
        //     canvas.toBlob(blob => {
        //         blob.name = fileName;
        //         resolve(blob);
        //     }, 'image/jpeg', 1);
        // });
    }
    handleImageLoaded = (image) =>{
        console.log(image)
    }
    handleOnCropComplete = (crop,pixelCrop) =>{
        console.log(crop,pixelCrop)
    }
    onCropComplete = (croppedAreaPercentage,croppedAreaPixels) =>{
        this.setState({croppedArea:croppedAreaPixels})
    }
    render() {
        const handleDateChange = (date) => {
            this.setState({
                startDate: date
            });
        }
        const handleChange = (e) => {
            const isCheckbox = e.target.type === "checkbox";
            this.setState({[e.target.name]: isCheckbox ? e.target.checked : e.target.value})
        }

        const onSubmit = (e) => {
            e.preventDefault()
            let userSession = localStorage.getItem("userSession")
            userSession = JSON.parse(userSession)
            this.setState({errors: {}});
            const formData = new FormData();
            if (this.state.bio) {
                formData.append("bio", this.state.bio)
            }
            if (this.state.location) {
                formData.append("location", this.state.location)
            }
            if (this.state.dob) {
                formData.append("birth_date", this.state.dob)
            }
            if (this.state.imageFile) {
                formData.append("avatar", this.state.imageFile)
            }
            if (this.state.coverImageFile) {
                formData.append("cover_photo", this.state.coverImageFile)
            }
            this.props.editUserProfile(formData, userSession).then(() => {
                let userSession = localStorage.getItem("userSession")
                let user = JSON.parse(userSession)
                if (this.props.userProfileEditResponse.status) {
                    if (user.user) {
                        user.user = this.props.userProfileEditResponse.result.user
                        user.user.profile.avatar = this.props.userProfileEditResponse.result.user.profile.avatar
                        user.user.profile.cover_photo = this.props.userProfileEditResponse.result.user.profile.cover_photo
                        user.user.profile.bio = this.props.userProfileEditResponse.result.user.profile.bio
                        user.user.profile.location = this.props.userProfileEditResponse.result.user.profile.location
                        localStorage.setItem("userSession", JSON.stringify(user));
                    }
                    if (user.profile) {
                        user.profile = this.props.userProfileEditResponse.result.user.profile
                        user.profile.avatar = this.props.userProfileEditResponse.result.user.profile.avatar
                        user.profile.cover_photo = this.props.userProfileEditResponse.result.user.profile.cover_photo
                        user.profile.bio = this.props.userProfileEditResponse.result.user.profile.bio
                        user.profile.location = this.props.userProfileEditResponse.result.user.profile.location
                        localStorage.setItem("userSession", JSON.stringify(user));
                    }
                    // notify();
                    Router.push("/profile");
                }
                if (!this.props.userProfileEditResponse.status) {
                    this.setState({errors: this.props.userProfileEditResponse.message})
                }

            }, ({data}) => {

            });

        }
        return (
            <div className="container-fluid loggedin-user-profile">
                <Navbar/>
                <div className="container-fluid">
                    <form onSubmit={onSubmit} className="form-box pt-3 pt-sm-3">
                        <div className="container-fluid w-75 h-100 custom-login-form custom-bg-dark pb-5 mx-auto mx-md-auto mx-sm-auto">
                            <div className="text-center custom-login-heading pt-5">Edit Profile</div>
                            <div className="custom-input w-100 mt-2 text-center">
                                <input className="mx-auto w-75" name="bio" value={this.state.bio} type="text"
                                       onChange={handleChange}
                                       placeholder="Enter Bio"
                                       tabIndex="1" required/>
                            </div>
                            <div className="custom-input w-100 mt-2 text-center">
                                <input className="mx-auto w-75" name="location" onChange={handleChange} value={this.state.location}
                                       type="text"
                                       placeholder="Enter Location"
                                       tabIndex="2" required/>
                            </div>
                            <div className="custom-input form-input w-100 mt-2 text-center">
                                <label className="custom-input-label pr-2"
                                       htmlFor="image-upload">{this.state.imageFileName ? this.state.imageFileName : "Upload Avatar"}</label>
                                <input type="file" onChange={(e) => this.onChange(e)} name="avatar"
                                       accept="image/*" multiple={false} className="pt-2"
                                       id="image-upload"
                                       tabIndex="3"/>
                                <p className="input-field-custom-info">Add Image with width 150px and height 150px.(For better result)</p>
                            </div>
                            <div className="custom-input form-input w-100 mt-2 text-center">
                                <label className="custom-input-label pr-2"
                                       htmlFor="image-upload">{this.state.coverImageFileName ? this.state.coverImageFileName : "Upload Cover"}</label>
                                <input type="file" onChange={(e) => this.onChange(e)} name="cover"
                                       accept="image/*" multiple={false} className="pt-2"
                                       id="image-upload"
                                       tabIndex="4"/>
                                <p className="input-field-custom-info">Add Image with width 900px and height 300px.(For better result)</p>
                            </div>
                            <div className="w-50 mt-3 mx-auto">
                                <button type="submit" tabIndex="3" className="custom-login-button btn btn-block">Edit
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        userProfileEditResponse: state.editProfile.editResponseData
    }
}
export default connect(mapStateToProps, {editUserProfile: editUserProfile})(UserProfileEdit);