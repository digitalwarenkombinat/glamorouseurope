import { WBK } from "wikibase-sdk";

export default {
  sparqlQuery: () => {
    const wbk = WBK({
      instance: "https://www.wikidata.org",
      sparqlEndpoint: "https://query.wikidata.org/sparql",
    });

    const artworks =
      "wd:Q3305213, wd:Q1964917, wd:Q18761202, wd:Q93184, wd:Q11060274, wd:Q860861, wd:Q125191";
    const countriesShareBorderWithGermany =
      "wd:Q31, wd:Q213, wd:Q35, wd:Q142, wd:Q36, wd:Q39, wd:Q32, wd:Q40, wd:Q55, wd:Q183";
    const sparql = `
      SELECT ?item ?itemLabel ?artworkLabel ?countryLabel ?genreLabel ?year ?locationLabel ?creatorLabel ?materialLabel ?depictsLabel ?collectionLabel ?copyrightLabel ?iiifManifest
      WITH {    
        SELECT ?item (SAMPLE(?artwork) as ?artwork) (SAMPLE(?country) as ?country) (SAMPLE(?genre) as ?genre) (SAMPLE(YEAR(?inception)) as ?year) (SAMPLE(?location) as ?location) (SAMPLE(?creator) as ?creator) (SAMPLE(?material) as ?material) (SAMPLE(?depicts) as ?depicts) (SAMPLE(?collection) as ?collection) (SAMPLE(?copyright) as ?copyright) (SAMPLE(?iiifManifest) as ?iiifManifest)
        WHERE {
          ?item (wdt:P31/(wdt:P279*)) ?artwork;
                 wdt:P195 ?collection.
          # Filter countries that share a border with Germany including Germany
          OPTIONAL {
            ?item wdt:P495 ?countryOfOrigin.
            FILTER(?countryOfOrigin IN ( ${countriesShareBorderWithGermany} ) )
          }
          OPTIONAL {
            ?collection wdt:P17 ?country.
            FILTER(?country IN ( ${countriesShareBorderWithGermany} ) )
          }
          BIND(COALESCE(?countryOfOrigin, ?country) AS ?country)
          FILTER(BOUND(?country))
          ?item wdt:P6108 ?iiifManifest.  # Has IIIF manifest
          OPTIONAL { ?item wdt:P136 ?genre. }
          OPTIONAL { ?item wdt:P571 ?inception. }
          OPTIONAL { ?item wdt:P276 ?location. }
          OPTIONAL { ?item wdt:P170 ?creator. }
          OPTIONAL { ?item wdt:P186 ?material. }
          OPTIONAL { ?item wdt:P180 ?depicts. }
          OPTIONAL { ?item wdt:P6216 ?copyright. }
          FILTER(?artwork IN ( ${artworks} ) )
        }
        GROUP BY ?item
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
