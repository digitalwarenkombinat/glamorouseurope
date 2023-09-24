import { WBK } from "wikibase-sdk";

export default {
  sparqlQuery: () => {
    const wbk = WBK({
      instance: "https://www.wikidata.org",
      sparqlEndpoint: "https://query.wikidata.org/sparql",
    });

    const paintingQid = "Q3305213";
    const countriesShareBorderWithGermany =
      "wd:Q31, wd:Q213, wd:Q35, wd:Q142, wd:Q36, wd:Q39, wd:Q32, wd:Q40, wd:Q55";
    const sparql = `
    SELECT ?work ?workLabel (YEAR(?inception) as ?year) ?countryLabel ?locationLabel ?iiif
    WHERE
    {
      ?work wdt:P31 wd:${paintingQid}.
      ?work wdt:P17 ?country.
      ?work wdt:P186 wd:Q12321255.
      ?work wdt:P571 ?inception.
      ?work wdt:P276 ?location.
      ?work wdt:P6108 ?iiif
    FILTER (?country IN ( ${countriesShareBorderWithGermany} ) )
    SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en" }
    }
    ORDER BY ?year ?work ?workLabel
    LIMIT 10
    `;

    const url = wbk.sparqlQuery(sparql);
    return url;
  },
};
