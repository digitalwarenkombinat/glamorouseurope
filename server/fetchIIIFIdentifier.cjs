/* eslint-disable no-undef */
async function fetchIIIFIdentifier(iiifManifest) {
  try {
    const manifestData = await fetchManifestData(iiifManifest);
    return parseManifest(manifestData);
  } catch (error) {
    console.error("Unable to fetch the Manifest due to:", error.message);
    return null;
  }
}

async function fetchManifestData(iiifManifest) {
  const response = await fetch(iiifManifest);
  if (!response.ok) {
    throw new Error(`Failed to fetch manifest: ${response.statusText}`);
  }
  return response.json();
}

function parseManifest(data) {
  if (data["@type"] === "sc:Manifest") {
    return extractImageURLv2(data);
  } else if (data["type"] === "Manifest") {
    return extractImageURLv3(data);
  } else {
    console.warn(
      "Manifest JSON doesn't have a recognized type. Expected '@type: sc:Manifest' or 'type: Manifest', but got:",
      data["@type"] || data["type"],
    );
    return null;
  }
}

function extractImageURLv2(manifest) {
  if (!manifest.sequences) {
    console.warn("Manifest has no sequences, so no images to display.");
    return null;
  }

  const sequences = Array.isArray(manifest.sequences)
    ? manifest.sequences
    : [manifest.sequences];

  for (const sequence of sequences) {
    if (!sequence.canvases) continue;

    for (const canvas of sequence.canvases) {
      const iiifURL = canvas.images[0]?.resource?.service?.["@id"];
      if (iiifURL) {
        return iiifURL;
      }
    }
  }

  console.warn("No canvases found in the sequences, so no images to display.");
  return null;
}

function extractImageURLv3(manifest) {
  if (!manifest.items) {
    console.warn("Manifest has no items, so no images to display.");
    return null;
  }

  for (const canvas of manifest.items) {
    const iiifURL = canvas.items[0]?.items[0]?.body?.service[0]?.["@id"];
    if (iiifURL) {
      return iiifURL;
    }
  }

  console.warn("No valid IIIF URL found in the manifest items.");
  return null;
}

exports.fetchIIIFIdentifier = fetchIIIFIdentifier;
