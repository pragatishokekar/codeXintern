const options = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': '4218e772d8mshd3036d10d2f0012p1a8adbjsnbdbc9d7a30a6',
    'x-rapidapi-host': 'article-extractor-and-summarizer.p.rapidapi.com'
  }
};

const btn = document.querySelector(".btn");

btn.addEventListener("click", (e) => {
  e.preventDefault();
  const input = document.querySelector(".url").value;
  const display = document.querySelector(".summary");

  display.innerText = "Please wait, the article is summarizing...";

  // URL for the API
  const apiUrl = `https://article-extractor-and-summarizer.p.rapidapi.com/summarize?url=${input}&lang=en&engine=2`;

  // Use a CORS Proxy to bypass CORS issues (for testing)
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  const url = `${proxyUrl}${apiUrl}`;

  // Regex to validate URL
  const urlRegex = /^(https?:\/\/)?([\w\-]+(\.[\w\-]+)+)(\/[\w\-._~:/?#[\]@!$&'()*+,;=%]*)?$/;

  if (!urlRegex.test(input)) {
    display.innerText = "Please enter a valid URL ...";
  } else {
    fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data); // Log the full API response
        display.innerText = data?.summary || "No summary available for this URL.";
      })
      .catch((error) => {
        console.error("Error during API call:", error);
        display.innerText = "An error occurred while summarizing the article. Please try again later.";
      });
  }
});
