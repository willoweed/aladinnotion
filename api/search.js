export default async function handler(req, res) {
  const query = req.query.q;

  if (!query) {
    return res.status(400).json({ error: "Missing query" });
  }

  const key = process.env.ALADIN_KEY;

  const url = `https://www.aladin.co.kr/ttb/api/ItemSearch.aspx?ttbkey=${key}&Query=${encodeURIComponent(
    query
  )}&QueryType=Title&MaxResults=5&output=json&Version=20131101`;

  const response = await fetch(url);
  const data = await response.json();

  res.status(200).json(data);
}
