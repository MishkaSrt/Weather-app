export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ error: 'Query parameter "q" is required' });
  }

  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return response
      .status(401)
      .json({ error: "Authorization header is required" });
  }

  const accuWeatherUrl = `https://dataservice.accuweather.com/cities/autocomplete?q=${encodeURIComponent(q)}`;

  try {
    const apiResponse = await fetch(accuWeatherUrl, {
      method: "GET",
      headers: {
        Authorization: authHeader,
        Accept: "application/json",
      },
    });
    const data = await apiResponse.json();

    return res.status(apiResponse.status).json(data);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal server error fetching weather data" });
  }
}
