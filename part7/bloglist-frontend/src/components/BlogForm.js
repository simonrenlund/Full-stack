import React from 'react'

const BlogForm = ({
    title,
    author,
    url,
    handleTitleChange,
    handleAuthorChange,
    handleUrlChange,
    blogPost,
}) => (
    <div>
        <h3>Create new blog.</h3>
        <form onSubmit={blogPost}>
            <div>
                title:
                <input
                    type="text"
                    value={title}
                    name="Title"
                    onChange={handleTitleChange}
                />
            </div>
            <div>
                author:
                <input
                    type="text"
                    value={author}
                    name="Author"
                    onChange={handleAuthorChange}
                />
            </div>
            <div>
                url:
                <input
                    type="text"
                    value={url}
                    name="Url"
                    onChange={handleUrlChange}
                />
            </div>
            <button type="submit">Post</button>
        </form>
    </div>
)

export default BlogForm
