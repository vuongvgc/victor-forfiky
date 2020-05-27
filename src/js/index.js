import axios from "axios";
async function getResults(query) {
  // const proxy = "https://cors-anywhere.herokuapp.com/";
  // const key = "20031996";
  try {
    const res = await axios(
      `https://forkify-api.herokuapp.com/api/search?q=pizza`
    );
    const data = res.data;
    console.log(data.recipes);
  } catch (Error) {
    console.log(Error);
  }
}
getResults("pizza");
