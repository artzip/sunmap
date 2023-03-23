// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

window.google = {
  maps: {
    Marker: class {},
    Map: class {
      setTilt() {}
      fitBounds() {}
    },
    LatLngBounds: class {},
    places: {
      Autocomplete: class {
        addListener(eventName, callback) {
          // this is super hacky but took less time than installing and running puppeteer
          setTimeout(() => callback(), 5000);
          return {
            remove: () => {},
          };
        }
        getPlace() {
          return {
            geometry: {
              location: {
                lat: () => 40,
                lng: () => 40,
              },
            },
          };
        }
      },
      AutocompleteService: class {},
      PlacesServiceStatus: {
        INVALID_REQUEST: "INVALID_REQUEST",
        NOT_FOUND: "NOT_FOUND",
        OK: "OK",
        OVER_QUERY_LIMIT: "OVER_QUERY_LIMIT",
        REQUEST_DENIED: "REQUEST_DENIED",
        UNKNOWN_ERROR: "UNKNOWN_ERROR",
        ZERO_RESULTS: "ZERO_RESULTS",
      },
      PlacesAutocomplete: {
        INVALID_REQUEST: "INVALID_REQUEST",
        NOT_FOUND: "NOT_FOUND",
        OK: "OK",
        OVER_QUERY_LIMIT: "OVER_QUERY_LIMIT",
        REQUEST_DENIED: "REQUEST_DENIED",
        UNKNOWN_ERROR: "UNKNOWN_ERROR",
        ZERO_RESULTS: "ZERO_RESULTS",
      },
    },

    MarkerClusterer: class {},
    Geocoder: class {},
  },
};
