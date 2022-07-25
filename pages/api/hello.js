export default async function handler (req, res) {
  const { method } = req
  switch (method) {
    case 'POST':
      try {

      } catch (error) {
        res.status(400).json({ success: false, error: 'Falla del servidor' })
      }
    default:
      return res.status(500).json({ success: false, error: 'Falla del servidor' })
  }
}
