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
  // console.log(`Selection region (x, y, width, height): ${selectionRegion}`);

  const selectionURL = `${identifier}/${selectionRegion}/${defaultSelectionWidth},/${selectionRotation}/${selectionQuality}${selectionFormat}`;
  return selectionURL;
}

export default {
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
