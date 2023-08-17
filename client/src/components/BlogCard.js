//do rafce for initialisation

import React from 'react'
import {Link} from 'react-router-dom';

const BlogCard = () => {
  return (
    <div className="col-3">
      <div className="blog-card">
        <div className="card-image">
            <img src="images/blog-1.jpg" className="img-fluid" alt="blog" />
            {/* img fluid : 1.img automatically adjusts to fit the width of parent container
            2. maintains the original aspect ratio of the img */}
            <div className="blog-content">
                <p className="date">1 Dec, 2022</p>
                <h5 className="title">
                   A beautiful sunday morning renaissance
                </h5>
                <p className="desc">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint aperiam incidunt neque quos officiis </p>
                <Link to="" className="button">Read More</Link>
            </div>
        </div>
      </div>
    </div>
  )
}

export default BlogCard
