import removeBackground, { Config } from "@imgly/background-removal";

const config: Config = {
  model: "small",
  progress: (key: unknown, current: unknown, total: unknown) => {
    console.log(`Downloading ${key}: ${current} of ${total}`);
  },
};

async function findIIIFImageURL(iiifURL: string): Promise<string | null> {
  try {
    const response = await fetch(iiifURL);
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
        return null;
      } else {
        return loadv2(data);
      }
    } else if ("type" in data) {
      if (data["type"] != "Manifest") {
        console.log(
          "The JSON for this Manifest doesn't look like a Manifest. It should have either a type of Manifest but has a type of: " +
            data["type"],
        );
        return null;
      } else {
        return loadv3(data);
      }
    } else {
      console.log(
        "The JSON for this Manifest doesn't look like a Manifest. It should have either a @type or type value of Manifest",
      );
      return null;
    }
  } catch (error) {
    console.log(
      "I was unable to get the Manifest you supplied due to: " + error,
    );
    return null;
  }
}

function isObject(variable: null) {
  return (
    typeof variable === "object" &&
    !Array.isArray(variable) &&
    variable !== null
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function loadv2(manifest: { sequences: any }): string | null {
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
          const iiifURL = canvas.images[0]?.resource?.service?.["@id"];
          if (iiifURL) {
            return iiifURL;
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
  return null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function loadv3(manifest: { items: any }): string | null {
  if ("items" in manifest) {
    const canvases = manifest.items;
    for (const canvas of canvases) {
      const iiifURL = canvas.items[0].items[0].body.service[0]["@id"];
      if (iiifURL) {
        return iiifURL;
      }
    }
  } else {
    console.log(
      "The manifest you supplied contains no sequence so there are no images to show.",
    );
  }
  return null;
}

function getStyle(element: Element, property: string) {
  return parseFloat(
    window.getComputedStyle(element).getPropertyValue(property),
  );
}

function getImageSelectionData(
  identifier: string | null,
  imageData: { width: number; height: number },
): string {
  const imageWidth = imageData.width;
  const imageHeight = imageData.height;

  const defaultSelectionWidth = 1280;

  let selectionRegion = "full";
  const selectionRotation = "0";
  const selectionQuality = "default";
  const selectionFormat = ".jpg";

  const canvasElement = document.getElementsByClassName(
    "displayregioncontainer",
  )[0];
  const selectionElement = document.getElementsByClassName("displayregion")[0];
  const calculatedCanvasWidth =
    (imageWidth * canvasElement.clientHeight) / imageHeight;
  const calculatedCanvasLeft =
    (canvasElement.clientWidth - calculatedCanvasWidth) / 2;
  const multiplier = imageWidth / calculatedCanvasWidth;

  console.log("Multiplier: ", multiplier);

  console.log(`Image resolution (width, height): ${imageWidth},${imageHeight}`);

  console.log(
    `Canvas resolution (width, height): ${calculatedCanvasWidth},${canvasElement.clientHeight}`,
  );

  const selectionBorderWidth = 9;
  const selectionX = getStyle(selectionElement, "left");
  const selectionY = getStyle(selectionElement, "top");
  const selectionWidth = Math.round(
    selectionElement.clientWidth + selectionBorderWidth,
  );
  const selectionHeight = Math.round(
    selectionElement.clientHeight + selectionBorderWidth,
  );

  console.log(
    `Selection region (x, y, width, height): ${selectionX},${selectionY},${selectionWidth},${selectionHeight}`,
  );

  const calculatedSelectionX = Math.round(
    (selectionX - calculatedCanvasLeft) * multiplier,
  );
  const calculatedSelectionY = Math.round(selectionY * multiplier);
  const calculatedSelectionWidth = Math.round(selectionWidth * multiplier);
  const calculatedSelectionHeight = Math.round(selectionHeight * multiplier);

  selectionRegion = `${calculatedSelectionX},${calculatedSelectionY},${calculatedSelectionWidth},${calculatedSelectionHeight}`;
  console.log(
    `Calculated selection region (x, y, width, height): ${calculatedSelectionX},${calculatedSelectionY},${calculatedSelectionWidth},${calculatedSelectionHeight}`,
  );
  const selectionURL = `${identifier}/${selectionRegion}/${defaultSelectionWidth},/${selectionRotation}/${selectionQuality}${selectionFormat}`;
  return selectionURL;
}

export default {
  bgRemoval: async (path: string) => {
    const startTime = Date.now();
    try {
      const blob: Blob = await removeBackground(path, config);
      const objectURL = URL.createObjectURL(blob);
      const timeDiffInSeconds = (Date.now() - startTime) / 1000;
      console.log("Duration for background removal: ", timeDiffInSeconds);
      console.log("Object URL: ", objectURL);
      return objectURL;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  getIIIFImageURL: async (iiifURL: string) => {
    try {
      return await findIIIFImageURL(iiifURL);
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  getCroppedImagePath: async (imageURL: string) => {
    console.log("Image URL: ", imageURL);

    try {
      const infoUrl = imageURL + "/info.json";
      const infoResponse = await fetch(infoUrl);
      if (!infoResponse.ok) {
        throw new Error(infoResponse.statusText);
      }
      const data = await infoResponse.json();
      const imageSelectionPath = getImageSelectionData(imageURL, data);
      return imageSelectionPath;
    } catch (error) {
      console.error(error);
    }
  },
};
