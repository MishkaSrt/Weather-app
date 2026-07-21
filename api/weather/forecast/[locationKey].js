export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const { locationKey } = req.query;
  if (!locationKey) {
    return res.status(400).json({ error: 'Query parameter "q" is required' });
  }

  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return response
      .status(401)
      .json({ error: "Authorization header is required" });
  }

  const forecastUrl = `https://dataservice.accuweather.com/forecasts/v1/daily/5day/{locationKey}?&metric=true`;

  try {
    const apiResponse = await fetch(forecastUrl, {
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
