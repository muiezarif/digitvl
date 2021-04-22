import React, {Component} from 'react';
import Navbar from "./Navbar";
import {getReadNotifications} from "../actions"
import {connect} from "react-redux";
import {confirmAlert} from "react-confirm-alert";
import Link from "next/link"
class UserNotifications extends Component {
    state = {notifications:{},notificationsArray:[], page: 1}
    componentDidMount() {
        let userSession = localStorage.getItem("userSession")
        userSession = JSON.parse(userSession)
        this.props.getReadNotifications(userSession,this.state.page).then(()=>{
            this.setState({notifications:this.props.readNotificationsResponse,notificationsArray:this.props.readNotificationsResponse.results})
        }).catch(err =>{

        })
    }
    onLoadMore = () => {
        const newPage = this.state.page + 1
        this.setState({page: newPage})
        this.fetchNotificationsList(newPage)
    }
    fetchNotificationsList = (page) =>{
        let userSession = localStorage.getItem("userSession")
        userSession = JSON.parse(userSession)
        this.props.getReadNotifications(userSession,page).then(()=>{
            this.setState({
                notifications: this.props.readNotificationsResponse,
                notificationsArray: [...this.state.notificationsArray, ...this.props.readNotificationsResponse.results]
            })
        }).catch(err =>{

        })
    }
    renderNotifications=() =>{
        if (this.state.notificationsArray){
            if (this.state.notificationsArray.length === 0){
                return (
                    <div className="col-md-12">
                        <h3 className="text-center">No Notifications!</h3>
                    </div>
                );
            }
            return this.state.notificationsArray.map(result => {
                return (<div></div>)
            })
        }
    }
    renderLoadMore = () => {
        return (
            <nav aria-label="Page navigation">
                <ul className="pagination justify-content-center">
                    {this.state.notifications.next ? <li className="page-item">
                        <button onClick={this.onLoadMore} className="page-link">Load More</button>
                    </li> : null}
                </ul>
            </nav>
        );
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
        readNotificationsResponse: state.readNotifications.readNotificationsData
    }
}
export default connect(mapStateToProps,{getReadNotifications})(UserNotifications);