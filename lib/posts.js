
export async function getSortedPostsData () {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/posts`)
  const posts = await res.json()
  return {
    props: {
      posts
    }
  }
}

// -> aca recupero todos los posibles path que para mi seria por Id
export async function getAllPostIds () {
  const posts = await getSortedPostsData()
  return posts.props.posts.map((e) => ({ params: { id: `${e.id}` } }))
}

// aca hago el llamado a la Api con el id incluido
export async function getPostData (id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/posts/${id}`)
  const data = await res.json()
  return {
    props: {
      data
    }
  }
}
