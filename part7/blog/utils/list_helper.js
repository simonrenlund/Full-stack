const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }
  return blogs.reduce(reducer,0)
}

const favoriteBlog = (blogs) => {
  let hindex = 0
  for (let i=0;i<blogs.length;i++) {
    if (blogs[i].likes > blogs[hindex].likes) {
      hindex = i
    }
  }
  if (blogs[hindex]) {
    return {
      title: blogs[hindex].title,
      author: blogs[hindex].author,
      likes: blogs[hindex].likes
    }
  } else {
    return {}
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
