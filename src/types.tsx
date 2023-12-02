export interface Image {
  creator: string;
  country: string;
  id: string;
  image: string;
  location: string;
  name: string;
  url: string;
  year: string;
  thumbnail: string;
}

export interface Element {
  artworkLabel: { value: string };
  collectionLabel: { value: string };
  copyrightLabel: { value: string };
  countryLabel: { value: string };
  creatorLabel: { value: string };
  depictsLabel: { value: string };
  genreLabel: { value: string };
  iiifManifest: { value: string };
  item: { value: string };
  itemLabel: { value: string };
  locationLabel: { value: string };
  materialLabel: { value: string };
  year: { value: string };
}
