import React, {Component} from 'react';
import {connect} from "react-redux";
import {getBlogsApi} from "../actions";
import Link from "next/link";
import Navbar from "./Navbar";
import {NextSeo} from "next-seo";
class Blogs extends Component {
    state = {blogs: {},blogsArray:[], page: 1}

    componentDidMount() {
        this.props.getBlogsApi(this.state.page).then(() => {
            console.log(this.props.blogsResponse)
            this.setState({blogs: this.props.blogsResponse,blogsArray:this.props.blogsResponse.results})
        }).catch(err => {

        })
    }
    onLoadMore = () => {
        const newPage = this.state.page + 1
        this.setState({page: newPage})
        this.fetchBlogsList(newPage)
    }
    fetchBlogsList = (page) =>{
        this.props.getBlogsApi(page).then(() => {
            console.log(this.props.blogsResponse)
            this.setState({
                blogs: this.props.blogsResponse,
                blogsArray:[...this.state.blogsArray,...this.props.blogsResponse.results]})
        }).catch(err => {

        })
    }
    renderLoadMore = () => {
        return (
            <nav aria-label="Page navigation">
                <ul className="pagination justify-content-center">
                    {this.state.blogs.next ? <li className="page-item">
                        <button onClick={this.onLoadMore} className="page-link">Load More</button>
                    </li> : null}
                </ul>
            </nav>
        );
    }

    renderBlogs = () => {
        if (this.state.blogsArray) {
            if (this.state.blogsArray.length === 0) {
                return (
                    <div className="col-md-12">
                        <h5 className="text-center">No Blogs Uploaded!</h5>
                    </div>
                );
            }
        }
        return this.state.blogsArray.map(result => {
            return (
                <div className="row col-md-12 col-sm-6 col-xs-6 pt-2 pb-2 custom-blogs-item-bg">
                    <div className="col-md-12 col-sm-6 custom-blogs-item-title">
                        {result.blog_title}
                    </div>
                    <div className="col-md-12 col-sm-6 custom-blogs-item-description">
                        {result.blog_body}
                    </div>
                    <div className="col-md-12 col-sm-6 text-right text-link-accent">
                        <Link href={`blogs/${result.get_slug}`}>Details -></Link>
                    </div>
                </div>
            );
        })
    }

    render() {
        return (
            <div className="container-fluid custom-blogs-page">
                <NextSeo
                    title="Blogs"
                    description="Get Information and updates about DIGITVL on our blogs"
                    openGraph={{
                        url: 'https://www.digitvl.com/',
                        title: 'DIGITVL',
                        description: 'Get Information and updates about DIGITVL on our blogs',
                        site_name: 'DIGITVL',
                    }}
                    twitter={{
                        handle: '@digitvl',
                        site: '@digitvl',
                        cardType: 'summary_large_image',
                    }}
                />
                <Navbar/>
                <div className="custom-blogs-heading">
                    Blogs
                </div>
                <div className="container mt-5 mx-auto row">
                    {this.renderBlogs()}
                </div>
                {this.renderLoadMore()}
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        blogsResponse: state.getBlogs.getBlogsData
    }
}
export default connect(mapStateToProps, {getBlogsApi})(Blogs);