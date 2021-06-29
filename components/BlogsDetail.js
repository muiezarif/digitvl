import React, {Component} from 'react';
import {connect} from "react-redux";
import Navbar from "./Navbar";
import {getBlogDetailApi} from "../actions";
import {NextSeo} from "next-seo";
let paragraphs = []
class BlogsDetail extends Component {
    state = {blog_detail: {}}

    componentDidMount() {
        this.props.getBlogDetailApi(this.props.dataparams.slug).then(() => {
            this.setState({blog_detail: this.props.blogDetailResponse.blog_detail})
            paragraphs = this.props.blogDetailResponse.blog_detail.blog_body.split(".")
        }).catch(err => {

        })
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.blogDetailResponse.blog_detail !== prevProps.blog_detail){
            paragraphs = this.props.blogDetailResponse.blog_detail.blog_body.split(".")
        }
    }

    renderParagraph = () => {
        return paragraphs.map(result =>{
            return (<p className="text-left mt-3 custom-blog-description">{result}.</p>)
        })
    }
    render() {
        return (
            <div className="container-fluid loggedin-user-profile">
                {/*<NextSeo*/}
                {/*    title={this.state.blog_detail.blog_title}*/}
                {/*    description={this.state.blog_detail.blog_body}*/}
                {/*    openGraph={{*/}
                {/*        url: 'https://www.digitvl.com/',*/}
                {/*        title: this.state.blog_detail.blog_title,*/}
                {/*        description: this.state.blog_detail.blog_body,*/}
                {/*        site_name: 'DIGITVL',*/}
                {/*    }}*/}
                {/*    twitter={{*/}
                {/*        handle: '@digitvl',*/}
                {/*        site: '@digitvl',*/}
                {/*        cardType: 'summary_large_image',*/}
                {/*    }}*/}
                {/*/>*/}
                <Navbar/>
                <div className="container-fluid">
                    <div className="custom-trending-heading">
                        {this.state.blog_detail.blog_title}
                    </div>
                    <div className="container custom-blogs-item-bg p-5 mx-auto">
                        {this.state.blog_detail.blog_image ?<img src={this.state.blog_detail.blog_image} className="img-music-detail-bg-gradient w-100" height="200"/>:null}
                        {/*<p className="text-left mt-3 custom-blog-description">{this.state.blog_detail.blog_body}</p>*/}
                        {this.renderParagraph()}
                        { this.state.blog_detail.embedded_video_url ?
                            <div className="mt-3 d-flex embed-responsive embed-responsive-16by9">
                                <iframe className="embed-responsive-item"
                                        src={this.state.blog_detail.embedded_video_url}
                                        allowFullScreen/>
                            </div> : null}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        blogDetailResponse: state.getBlogDetail.blogDetailData
    }
}
export default connect(mapStateToProps, {getBlogDetailApi})(BlogsDetail);