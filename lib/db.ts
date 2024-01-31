// create a getWebiste function that returns a website object from the api
async function getWebsite(id: number): Promise<any> {
  // make an API call to fetch the website object
  const response = await fetch(`${process.env.BACKEND_URL}/website/${id}`);
  const website = await response.json();
  return website;
}

async function getWebsites(): Promise<any> {
  // make an API call to fetch the website object
  const response = await fetch(`${process.env.BACKEND_URL}/websites`);
  const websites = await response.json();
  return websites;
}

export { getWebsite, getWebsites };
