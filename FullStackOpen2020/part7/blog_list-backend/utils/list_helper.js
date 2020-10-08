const dummy = (blogs) => {
    return 1
    // ...
  }
  



  const totalLikes = (blogs) => {
    return blogs.reduce((total, b) => total += b.likes, 0)
  }
  
  module.exports = { dummy,totalLikes  }