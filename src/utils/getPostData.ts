import readingTime from 'reading-time'

type Post = {
  title: string
  file: string
  rawContent: () => string
}

export default function getPostData(post: Post) {
  const stats = readingTime(post.rawContent())
  const minutes = Math.ceil(stats.minutes)
  
  const readingTimeText = `${minutes} min de lectura`

  return {
    slug: post.file.split('/').pop().split('.').shift(),
    readingTime: readingTimeText,
  }
}
