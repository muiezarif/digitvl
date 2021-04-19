import React from "react";
// import {SearchOutlined} from "@ant-design/icons"
class SearchBar extends React.Component{
    render() {
        return (
            <div className="custom-nav-search-bar">
                <div className="input-group mb-3">
                    {/*<i className="fas fa-search my-auto ml-5"/>*/}
                    <input type="text" className="custom-nav-search" placeholder="What are you looking for..." aria-label="Username"
                           aria-describedby="basic-addon1"/>
                </div>
            </div>
        );
    }
}

export default SearchBar;