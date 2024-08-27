/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-require-imports */
const axios = require("axios");
const fs = require("fs");
const { fetchIIIFIdentifier } = require("./fetchIIIFIdentifier");

const url = "https://query.wikidata.org/sparql";
const query = `
 SELECT ?item ?itemLabel ?countryLabel ?collectionLabel ?year ?locationLabel ?creatorLabel ?iiifManifest
  WITH {
    SELECT ?item (SAMPLE(?country) as ?country) (SAMPLE(YEAR(?date)) as ?year) (SAMPLE(?location) as ?location) (SAMPLE(?creator) as ?creator) (SAMPLE(?collection) as ?collection) (SAMPLE(?iiifManifest) as ?iiifManifest)
    WHERE {
      hint:Query hint:optimizer "None".
      ?item wdt:P6108 ?iiifManifest;
            wdt:P495 ?originCountry;
            wdt:P195 ?collection;
            (wdt:P31/(wdt:P279*)) wd:Q110304307.
            hint:Prior hint:gearing "forward".

      ?collection wdt:P17 ?collectionCountry.
      BIND(COALESCE(?originCountry, ?collectionCountry) AS ?country)
      ?country wdt:P47 wd:Q183.
      
      OPTIONAL { ?item wdt:P571 ?date. }
      OPTIONAL { ?item wdt:P276 ?location. }
      OPTIONAL { ?item wdt:P170 ?creator. }
    }
    GROUP BY ?item
    LIMIT 1000
  } AS %result
  WHERE {
    INCLUDE %result.
    SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
  }
`;

const fetchImagesData = async (url, query) => {
  try {
    const response = await axios.get(url, {
      params: {
        query: query,
        format: "json",
      },
    });

    const imageData = await processImageData(response.data.results.bindings);
    await saveDataToFile("src/data.json", imageData);
    console.log("Data successfully saved in data.json.");
  } catch (error) {
    console.error("Error:", error);
  }
};

const processImageData = async (bindings) => {
  const imagePromises = bindings.map(async (element) => {
    try {
      const imageURL = await fetchIIIFIdentifier(element.iiifManifest.value);
      return imageURL ? formatImageData(element, imageURL) : null;
    } catch (error) {
      console.error("Error processing image:", error);
      return null;
    }
  });

  return (await Promise.all(imagePromises)).filter(Boolean);
};

const formatImageData = (element, imageURL) => ({
  id: element.item.value,
  name: element.itemLabel?.value || "",
  year: element.year?.value || "",
  country: element.countryLabel?.value || "",
  location: element.locationLabel?.value || "",
  creator: element.creatorLabel?.value || "",
  url: element.iiifManifest.value,
  identifier: imageURL,
  image: `${imageURL}/full/400,/0/default.jpg`,
  thumbnail: `${imageURL}/full/100,100/0/default.jpg`,
});

const saveDataToFile = async (filename, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(filename, JSON.stringify(data, null, 2), (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

fetchImagesData(url, query);
