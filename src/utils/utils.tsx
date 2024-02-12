async function fetchIIIFIdentifier(
  iiifManifest: string,
): Promise<string | null> {
  try {
    const response = await fetch(iiifManifest);
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

function getStyle(element: HTMLElement, styleProperty: string): number {
  const computedStyle = window.getComputedStyle(element);
  return parseInt(computedStyle.getPropertyValue(styleProperty), 10);
}

function getImageSelectionData(
  identifier: string | null,
  imageData: { width: number; height: number },
): string {
  const { width: imageWidth, height: imageHeight } = imageData;

  const defaultSelectionWidth = 1080;

  const selectionRotation = "0";
  const selectionQuality = "default";
  const selectionFormat = ".jpg";

  const canvasElement = document.querySelector(
    ".displayregioncontainer",
  ) as HTMLElement;
  const selectionElement = document.querySelector(
    ".displayregion",
  ) as HTMLElement;

  if (!canvasElement || !selectionElement) {
    throw new Error("Canvas or selection element not found");
  }

  const { clientWidth: canvasWidth, clientHeight: canvasHeight } =
    canvasElement;

  const calculatedCanvasWidth = (imageWidth * canvasHeight) / imageHeight;
  const calculatedCanvasLeft = (canvasWidth - calculatedCanvasWidth) / 2;
  const multiplier = imageWidth / calculatedCanvasWidth;

  const selectionBorderWidth = 9;
  const selectionX = getStyle(selectionElement, "left");
  const selectionY = getStyle(selectionElement, "top");
  const selectionWidth = Math.round(
    selectionElement.clientWidth + selectionBorderWidth,
  );
  const selectionHeight = Math.round(
    selectionElement.clientHeight + selectionBorderWidth,
  );

  const calculatedSelectionX = Math.max(
    Math.round((selectionX - calculatedCanvasLeft) * multiplier),
    0,
  );
  const calculatedSelectionY = Math.max(Math.round(selectionY * multiplier), 0);
  const calculatedSelectionWidth = Math.min(
    Math.round(selectionWidth * multiplier),
    imageWidth,
  );
  const calculatedSelectionHeight = Math.min(
    Math.round(selectionHeight * multiplier),
    imageHeight,
  );

  const selectionRegion = `${calculatedSelectionX},${calculatedSelectionY},${calculatedSelectionWidth},${calculatedSelectionHeight}`;
  console.log(
    `Calculated selection region (x, y, width, height): ${selectionRegion}`,
  );

  const selectionURL = `${identifier}/${selectionRegion}/${defaultSelectionWidth},/${selectionRotation}/${selectionQuality}${selectionFormat}`;
  return selectionURL;
}

export default {
  /*   bgRemoval: async (path: string) => {
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
  }, */
  fetchIIIFIdentifier: async (iiifManifest: string) => {
    try {
      return await fetchIIIFIdentifier(iiifManifest);
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  getCroppedImagePath: async (imageURL: string) => {
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
