export const baseUrl = "http://95.217.55.151:1323";

const globalHeaders = {
  "content-type": "application/json",
  accept: "*/*",
};

function createFullPathUrl({ url }) {
  return new URL(url, baseUrl).href;
}

export const request = async ({ url, method, body, headers, ...others }) => {
  const res = await fetch(createFullPathUrl({ url }), {
    method: method || "GET",
    body,
    headers: {
      ...globalHeaders,
      // Authorization: getAuthToken(),
      ...headers,
      ...others,
    },
  });
  if (!res) return;
  try {
    return await res.json();
  } catch (err) {
    console.err(err);
  }
};
