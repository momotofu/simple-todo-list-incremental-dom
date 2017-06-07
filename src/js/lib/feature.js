export function isEnabled(name) {
    return window.location.hash.split('#').includes(name);
}

export function getFeatures() {
  var features = {
    renderBottom: false,
    filter: false,
    filterTop: false
  }

  const flaggedFeatures = window.location.hash.split('#')

  Object.keys(features).map((key, index) => {
    features[key] = flaggedFeatures.includes(key);
  });

  return features
}