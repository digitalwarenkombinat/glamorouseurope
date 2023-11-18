import { WBK } from "wikibase-sdk";

export default {
  sparqlQuery: () => {
    const wbk = WBK({
      instance: "https://www.wikidata.org",
      sparqlEndpoint: "https://query.wikidata.org/sparql",
    });

    const artworks = "wd:Q3305213, wd:Q11060274, wd:Q860861";
    const countriesShareBorderWithGermany =
      "wd:Q31, wd:Q213, wd:Q35, wd:Q142, wd:Q36, wd:Q39, wd:Q32, wd:Q40, wd:Q55";
    const sparql = `
      SELECT ?item ?itemLabel ?artworkLabel ?countryLabel ?genreLabel ?year ?locationLabel ?creatorLabel ?materialLabel ?depictsLabel ?collectionLabel ?copyrightLabel ?iiifManifest
      WITH {
      
        SELECT ?item (SAMPLE(?artwork) as ?artwork) (SAMPLE(?country) as ?country) (SAMPLE(?genre) as ?genre) (SAMPLE(YEAR(?inception)) as ?year) (SAMPLE(?location) as ?location) (SAMPLE(?creator) as ?creator) (SAMPLE(?material) as ?material) (SAMPLE(?depicts) as ?depicts) (SAMPLE(?collection) as ?collection) (SAMPLE(?copyright) as ?copyright) (SAMPLE(?iiifManifest) as ?iiifManifest)
      
        WHERE {
        # Find paintings
        ?item wdt:P31/wdt:P279* ?artwork.
        ?item wdt:P18 ?image. # Image exists
        ?item wdt:P6108 ?iiifManifest. # IIIF manifest exists
        ?item wdt:P17 ?country. # Get the country of the painting
      
        OPTIONAL { ?item wdt:P136 ?genre. }
        OPTIONAL { ?item wdt:P571 ?inception. }
        OPTIONAL { ?item wdt:P276 ?location. }
        OPTIONAL { ?item wdt:P170 ?creator. }
        OPTIONAL { ?item wdt:P186 ?material. }
        OPTIONAL { ?item wdt:P180 ?depicts. }
        OPTIONAL { ?item wdt:P195 ?collection. }
        OPTIONAL { ?item wdt:P6216 ?copyright. }
        
        # Filter countries that share a border with Germany
        FILTER (?country IN ( ${countriesShareBorderWithGermany} ) )
        # Filter Artwork that is one of the following: painting, print, sculpture
        FILTER (?artwork IN ( ${artworks} ) )
      
        }
        GROUP BY ?item
        #ORDER BY DESC(?year)
        LIMIT 10
            
      } AS %result
      WHERE {
        INCLUDE %result
        SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
      } ORDER BY ?itemLabel
    `;

    const queryURL = wbk.sparqlQuery(sparql);
    return queryURL;
  },
};
