
export async function getSortedPostsData () {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/posts`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const posts = await res.json()
  console.log(posts)
  return {
    props: {
      posts
    }
  }
}

export const fetcher = async (id) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/posts/all/${id}`)
  const data = await res.json()
  return data
}

// -> aca recupero todos los posibles path que para mi seria por Id
export async function getAllPostIds () {
  const posts = await getSortedPostsData()
  // console.log('futuros posts', posts)
  return posts.props.posts.map(e => ({ params: { id: `${e._id}` } }))
}

// aca hago el llamado a la Api con el id incluido
export async function getPostData (id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/posts/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const data = await res.json()
  console.log(data)
  return {
    props: {
      data
    }
  }
}
