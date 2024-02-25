const initialImageList = [
  {
    id: "http://www.wikidata.org/entity/Q20355536",
    name: "A Street in Torello, Italy",
    year: "1890",
    country: "Denmark",
    location: "Statens Museum for Kunst",
    creator: "Peder Severin Krøyer",
    url: "https://api.smk.dk/api/v1/iiif/manifest/?id=KMS1435",
    identifier:
      "https://iip.smk.dk/iiif/jp2/z603r155c_KMS1435.tif.reconstructed.tif.jp2",
    image:
      "https://iip.smk.dk/iiif/jp2/z603r155c_KMS1435.tif.reconstructed.tif.jp2/full/400,/0/default.jpg",
    thumbnail:
      "https://iip.smk.dk/iiif/jp2/z603r155c_KMS1435.tif.reconstructed.tif.jp2/full/100,100/0/default.jpg",
  },
  {
    id: "http://www.wikidata.org/entity/Q20537703",
    name: "At the French Windows. The Artist's Wife",
    year: "1897",
    country: "Denmark",
    location: "Statens Museum for Kunst",
    creator: "Laurits Andersen Ring",
    url: "https://api.smk.dk/api/v1/iiif/manifest/?id=KMS3716",
    identifier:
      "https://iip.smk.dk/iiif/jp2/1544bs13w_kms3716.tif.reconstructed.tif.jp2",
    image:
      "https://iip.smk.dk/iiif/jp2/1544bs13w_kms3716.tif.reconstructed.tif.jp2/full/400,/0/default.jpg",
    thumbnail:
      "https://iip.smk.dk/iiif/jp2/1544bs13w_kms3716.tif.reconstructed.tif.jp2/full/100,100/0/default.jpg",
  },
  {
    id: "http://www.wikidata.org/entity/Q103297795",
    name: "Brot! (Bread!)",
    year: "1924",
    country: "Germany",
    location: "Vanderbilt University Fine Arts Gallery",
    creator: "Käthe Kollwitz",
    url: "https://iiif-manifest.library.vanderbilt.edu/gallery/1977/1977.011.json",
    identifier:
      "https://iiif.library.vanderbilt.edu/iiif/2/gallery%2F1977%2F1977.011.tif",
    image:
      "https://iiif.library.vanderbilt.edu/iiif/2/gallery%2F1977%2F1977.011.tif/full/400,/0/default.jpg",
    thumbnail:
      "https://iiif.library.vanderbilt.edu/iiif/2/gallery%2F1977%2F1977.011.tif/full/100,100/0/default.jpg",
  },
  {
    id: "http://www.wikidata.org/entity/Q103297971",
    name: "Business-Man, from Genius, Zeitschrift für werdende und alte Kunst (Magazine for Emerging and Ancient Art), Year 2, no. 1",
    year: "1920",
    country: "Belgium",
    location: "Vanderbilt University Fine Arts Gallery",
    creator: "Frans Masereel",
    url: "https://iiif-manifest.library.vanderbilt.edu/gallery/1976/1976.032.json",
    identifier:
      "https://iiif.library.vanderbilt.edu/iiif/2/gallery%2F1976%2F1976.032.med.jpg",
    image:
      "https://iiif.library.vanderbilt.edu/iiif/2/gallery%2F1976%2F1976.032.med.jpg/full/400,/0/default.jpg",
    thumbnail:
      "https://iiif.library.vanderbilt.edu/iiif/2/gallery%2F1976%2F1976.032.med.jpg/full/100,100/0/default.jpg",
  },
  // {
  //   id: "http://www.wikidata.org/entity/Q3698180",
  //   name: "Calvary",
  //   year: "1475",
  //   country: "Belgium",
  //   location: "Royal Museum of Fine Arts Antwerp",
  //   creator: "Antonello da Messina",
  //   url: "https://iiif.kmska.be/iiif/2/5/manifest.json",
  //   identifier: "https://iiif.kmska.be/c/iiif/2/public@5.tif",
  //   image:
  //     "https://iiif.kmska.be/c/iiif/2/public@5.tif/full/400,/0/default.jpg",
  //   thumbnail:
  //     "https://iiif.kmska.be/c/iiif/2/public@5.tif/full/100,100/0/default.jpg",
  // },
  {
    id: "http://www.wikidata.org/entity/Q103300860",
    name: "Half-Figure Prophet",
    year: "1450",
    country: "France",
    location: "Vanderbilt University Fine Arts Gallery",
    creator:
      "http://www.wikidata.org/.well-known/genid/d7c4865c9fae865605be887d7277ab75",
    url: "https://iiif-manifest.library.vanderbilt.edu/gallery/1975/1975.005.json",
    identifier:
      "https://iiif.library.vanderbilt.edu/iiif/2/gallery%2F1975%2F1975.005.jpg",
    image:
      "https://iiif.library.vanderbilt.edu/iiif/2/gallery%2F1975%2F1975.005.jpg/full/400,/0/default.jpg",
    thumbnail:
      "https://iiif.library.vanderbilt.edu/iiif/2/gallery%2F1975%2F1975.005.jpg/full/100,100/0/default.jpg",
  },
  {
    id: "http://www.wikidata.org/entity/Q102967848",
    name: "Landscape with Shepherds",
    year: "",
    country: "Netherlands",
    location: "Vanderbilt University Fine Arts Gallery",
    creator: "Jan Both",
    url: "https://iiif-manifest.library.vanderbilt.edu/gallery/1979/1979.0195P.json",
    identifier:
      "https://iiif.library.vanderbilt.edu/iiif/2/gallery%2F1979%2F1979.0195P.tif",
    image:
      "https://iiif.library.vanderbilt.edu/iiif/2/gallery%2F1979%2F1979.0195P.tif/full/400,/0/default.jpg",
    thumbnail:
      "https://iiif.library.vanderbilt.edu/iiif/2/gallery%2F1979%2F1979.0195P.tif/full/100,100/0/default.jpg",
  },
  {
    id: "http://www.wikidata.org/entity/Q106582838",
    name: "The Blacksmith Worker",
    year: "",
    country: "Switzerland",
    location: "Vanderbilt University Fine Arts Gallery",
    creator: "Antonello da Messina",
    url: "https://iiif-manifest.library.vanderbilt.edu/gallery/1976/1976.036.json",
    identifier:
      "https://iiif.library.vanderbilt.edu/iiif/2/gallery%2F1976%2F1976.036.tif",
    image:
      "https://iiif.library.vanderbilt.edu/iiif/2/gallery%2F1976%2F1976.036.tif/full/400,/0/default.jpg",
    thumbnail:
      "https://iiif.library.vanderbilt.edu/iiif/2/gallery%2F1976%2F1976.036.tif/full/100,100/0/default.jpg",
  },
  {
    id: "http://www.wikidata.org/entity/Q104032628",
    name: "The Empty Jug",
    year: "1653",
    country: "Netherlands",
    location: "Vanderbilt University Fine Arts Gallery",
    creator: "Adriaen van Ostade",
    url: "https://iiif-manifest.library.vanderbilt.edu/gallery/1979/1979.0845P.json",
    identifier:
      "https://iiif.library.vanderbilt.edu/iiif/2/gallery%2F1979%2F1979.0845P.tif",
    image:
      "https://iiif.library.vanderbilt.edu/iiif/2/gallery%2F1979%2F1979.0845P.tif/full/400,/0/default.jpg",
    thumbnail:
      "https://iiif.library.vanderbilt.edu/iiif/2/gallery%2F1979%2F1979.0845P.tif/full/100,100/0/default.jpg",
  },
  {
    id: "http://www.wikidata.org/entity/Q102975484",
    name: "Trostung (Consolation), from Genius, Zeitschrift für werdende und alte Kunst (Magazine for Emerging and Ancient Art), Year 2, no. 1",
    year: "1920",
    country: "Austria",
    location: "Vanderbilt University Fine Arts Gallery",
    creator: "Georg Ehrlich",
    url: "https://iiif-manifest.library.vanderbilt.edu/gallery/1976/1976.031.json",
    identifier:
      "https://iiif.library.vanderbilt.edu/iiif/2/gallery%2F1976%2F1976.031.med.jpg",
    image:
      "https://iiif.library.vanderbilt.edu/iiif/2/gallery%2F1976%2F1976.031.med.jpg/full/400,/0/default.jpg",
    thumbnail:
      "https://iiif.library.vanderbilt.edu/iiif/2/gallery%2F1976%2F1976.031.med.jpg/full/100,100/0/default.jpg",
  },
];

export default initialImageList;
