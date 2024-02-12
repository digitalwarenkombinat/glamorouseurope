import { WBK } from "wikibase-sdk";

export default {
  sparqlQuery: (favouriteMaterial: string = "") => {
    const wbk = WBK({
      instance: "https://www.wikidata.org",
      sparqlEndpoint: "https://query.wikidata.org/sparql",
    });
    const sparql = `
      SELECT ?item ?itemLabel ?artworkLabel ?countryLabel ?genreLabel ?year ?locationLabel ?creatorLabel ?materialLabel ?depictsLabel ?collectionLabel ?iiifManifest
      WITH {    
        SELECT ?item (SAMPLE(?artwork) as ?artwork) (SAMPLE(?country) as ?country) (SAMPLE(?genre) as ?genre) (SAMPLE(YEAR(?inception)) as ?year) (SAMPLE(?location) as ?location) (SAMPLE(?creator) as ?creator) (SAMPLE(?material) as ?material) (SAMPLE(?depicts) as ?depicts) (SAMPLE(?collection) as ?collection) (SAMPLE(?iiifManifest) as ?iiifManifest)
        WHERE {
          ?item wdt:P6108 ?iiifManifest ;
                wdt:P195 ?collection ;
                wdt:P31 ?artwork .
                FILTER ( ?artwork = wd:Q3305213 || ?artwork = wd:Q93184 || ?artwork = wd:Q11060274 || ?artwork = wd:Q860861 || ?artwork = wd:Q125191 )
                ${favouriteMaterial !== "" ? `FILTER ( ?material = ${favouriteMaterial} )` : ""}
                OPTIONAL {
                  ?item wdt:P495 ?countryOfOrigin.
                  FILTER(?countryOfOrigin = wd:Q31 || ?countryOfOrigin = wd:Q213 || ?countryOfOrigin = wd:Q35 || ?countryOfOrigin = wd:Q142 || ?countryOfOrigin = wd:Q36 || ?countryOfOrigin = wd:Q39 || ?countryOfOrigin = wd:Q32 || ?countryOfOrigin = wd:Q40 || ?countryOfOrigin = wd:Q55 || ?countryOfOrigin = wd:Q183 )
                }
                OPTIONAL {
                  ?collection wdt:P17 ?country.
                  FILTER(?country = wd:Q31 || ?country = wd:Q213 || ?country = wd:Q35 || ?country = wd:Q142 || ?country = wd:Q36 || ?country = wd:Q39 || ?country = wd:Q32 || ?country = wd:Q40 || ?country = wd:Q55 || ?country = wd:Q183 )
                }
                BIND(COALESCE(?countryOfOrigin, ?country) AS ?country)
                FILTER(BOUND(?country))

                OPTIONAL { ?item wdt:P136 ?genre. }
                OPTIONAL { ?item wdt:P571 ?inception. }
                OPTIONAL { ?item wdt:P276 ?location. }
                OPTIONAL { ?item wdt:P170 ?creator. }
                OPTIONAL { ?item wdt:P186 ?material. }
                OPTIONAL { ?item wdt:P180 ?depicts. }
        }
        GROUP BY ?item
        LIMIT 10
      } AS %result
      WHERE {
        INCLUDE %result.
        SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
      } ORDER BY ?itemLabel
    `;

    const queryURL = wbk.sparqlQuery(sparql);
    return queryURL;
  },
};
