export const baseUrl = "http://weathermonit.ddns.net/api";

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
    console.log(err);
  }
};
