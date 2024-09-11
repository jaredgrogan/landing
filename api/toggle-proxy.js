
let proxyEnabled = true;

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { enabled } = req.body;
    proxyEnabled = enabled;
    res.status(200).json({ success: true, proxyEnabled });
  } else if (req.method === 'GET') {
    res.status(200).json({ proxyEnabled });
  } else {
    res.status(405).end();
  }
}
