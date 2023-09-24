async function findIIIFImageURL(url: string): Promise<string[]> {
  // if (manifestOK(url)) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();

    if ("@type" in data) {
      if (data["@type"] != "sc:Manifest") {
        console.log(
          "The JSON for this Manifest doesn't look like a Manifest. It should have either a @type of sc:Manifest but has a type of: " +
            data["@type"],
        );
        return [];
      } else {
        return loadv2(data);
      }
    } else if ("type" in data) {
      if (data["type"] != "Manifest") {
        console.log(
          "The JSON for this Manifest doesn't look like a Manifest. It should have either a type of Manifest but has a type of: " +
            data["type"],
        );
        return [];
      } else {
        return loadv3(data);
      }
    } else {
      console.log(
        "The JSON for this Manifest doesn't look like a Manifest. It should have either a @type or type value of Manifest",
      );
      return [];
    }
  } catch (error) {
    console.log(
      "I was unable to get the Manifest you supplied due to: " + error,
    );
    return [];
  }
  // } else {
  //   return [];
  // }
}

function isObject(variable: null) {
  return (
    typeof variable === "object" &&
    !Array.isArray(variable) &&
    variable !== null
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function loadv2(manifest: { sequences: any }): string[] {
  const iiifURLs: string[] = [];

  if ("sequences" in manifest) {
    let sequences = manifest.sequences;
    if (isObject(sequences)) {
      sequences = [sequences];
    }
    let foundCanvas = false;

    for (const sequence of sequences) {
      if ("canvases" in sequence) {
        foundCanvas = true;
        for (const canvas of sequence.canvases) {
          console.log(canvas);
          const iiifURL = canvas.images[0]?.resource?.service?.["@id"];
          if (iiifURL) {
            iiifURLs.push(iiifURL);
          }
        }
      } else {
        if (!foundCanvas) {
          console.log(
            "The manifest you supplied contains no canvases so there are no images to show.",
          );
        }
      }
    }
  } else {
    console.log(
      "The manifest you supplied contains no sequence so there are no images to show.",
    );
  }
  return iiifURLs;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function loadv3(manifest: { items: any }): string[] {
  const iiifURLs: string[] = [];
  if ("items" in manifest) {
    const canvases = manifest.items;
    for (const canvas of canvases) {
      const iiifURL = canvas.items[0].items[0].body.service[0]["@id"];
      if (iiifURL) {
        iiifURLs.push(iiifURL);
      }
    }
  } else {
    console.log(
      "The manifest you supplied contains no sequence so there are no images to show.",
    );
  }
  return iiifURLs;
}

// function manifestOK(manifest_uri: string) {
//   return !manifest_uri.startsWith("http://");
// }

function getStyle(element: Element, property: string) {
  return parseFloat(
    window.getComputedStyle(element).getPropertyValue(property),
  );
}

function getImageData(
  identifier: string,
  imageData: { width: number; height: number },
): string {
  const width = imageData.width;
  const height = imageData.height;

  const defaultWidth = 1280;

  let region = "full";
  const rotation = "0";
  const quality = "default";
  const format = ".jpg";

  const displayContainer = document.getElementsByClassName(
    "displayregioncontainer",
  )[0];
  const displayRegion = document.getElementsByClassName("displayregion")[0];
  const calculatedContainerWidth =
    (width * displayContainer.clientHeight) / height;
  const calculatedContainerLeft =
    (displayContainer.clientWidth - calculatedContainerWidth) / 2;
  const multiplier = width / calculatedContainerWidth;

  console.log(multiplier);

  console.log(`${width},${height}`);

  console.log(`${calculatedContainerWidth},${displayContainer.clientHeight}`);

  console.log(
    `${getStyle(displayRegion, "left")},${getStyle(
      displayRegion,
      "top",
    )},${Math.round(displayRegion.clientWidth + 6)},${Math.round(
      displayRegion.clientHeight + 6,
    )}`,
  );

  region = `${Math.round(
    (getStyle(displayRegion, "left") - calculatedContainerLeft) * multiplier,
  )},${Math.round(getStyle(displayRegion, "top") * multiplier)},${Math.round(
    (displayRegion.clientWidth + 9) * multiplier,
  )},${Math.round((displayRegion.clientHeight + 9) * multiplier)}`;

  const uri_decoded = `${identifier}/${region}/${defaultWidth},/${rotation}/${quality}${format}`;
  return uri_decoded;
}

export default {
  getCroppedImagePath: async (url: string) => {
    console.log(url);

    try {
      const urls = await findIIIFImageURL(url);
      console.log(urls);

      const infoUrl = urls[0] + "/info.json";
      const infoResponse = await fetch(infoUrl);
      if (!infoResponse.ok) {
        throw new Error(infoResponse.statusText);
      }
      const data = await infoResponse.json();
      const path = getImageData(urls[0], data);
      console.log(path);
      return path;
    } catch (error) {
      console.error(error);
    }
  },
};
