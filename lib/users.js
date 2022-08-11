
export async function getSortedUsersData () {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const users = await res.json()
  return {
    props: {
      users
    }
  }
}

// -> aca recupero todos los posibles path que para mi seria por Id
export async function getAllUserIds () {
  const users = await getSortedUsersData()
  // console.log('futuros users', users)
  return users.props.users.map(e => ({ params: { id: `${e._id}` } }))
}

// aca hago el llamado a la Api con el id incluido
export async function getUserData (id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const data = await res.json()
  return {
    props: {
      data
    }
  }
}
