import type { Handler } from "@netlify/functions";

export const handler: Handler = async () => {
  const clientId = process.env.SPOTIFY_CLIENT_ID!;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET!;

  const tokenUrl = "https://accounts.spotify.com/api/token";
  const body = new URLSearchParams({
    grant_type: "client_credentials",
    client_id: clientId,
    client_secret: clientSecret,
  });

  const response = await fetch(tokenUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  if (!response.ok) {
    return {
      statusCode: response.status,
      body: JSON.stringify({ error: "Failed to get access token" }),
    };
  }

  const data = await response.json();
  return {
    statusCode: 200,
    body: JSON.stringify({
      access_token: data.access_token,
      expires_in: data.expires_in,
    }),
  };
};
