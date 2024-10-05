// fetch API
const FetchData = async (url, req) => {
  try {
    const res = await fetch(url, req);
    if (!res.ok) {
      console.log(res);
      throw new Error(`HTTP ERR, status code: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    alert("Fetch error");
  }
};

export default FetchData;
