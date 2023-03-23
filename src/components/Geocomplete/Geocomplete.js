import { useEffect } from "react";
import TextField from "../_controls/TextField";

function Geocomplete({ onFocus, onLocationChanged }) {
  useEffect(() => {
    const addressField = document.querySelector("#address-field");
    const autocomplete = new window.google.maps.places.Autocomplete(
      addressField,
      {
        fields: ["address_components", "geometry"],
        types: ["geocode"],
      }
    );

    const listener = autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      onLocationChanged({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      });
      addressField.blur();
    });

    return () => {
      const pacContainer = document.querySelector(".pac-container");
      !!listener && listener.remove();
      !!pacContainer && pacContainer.remove();
    };
  }, [onLocationChanged]);

  function handleInputFocus({ target }) {
    target.select();
    onFocus();
  }

  return (
    <TextField
      id="address-field"
      onFocus={handleInputFocus}
      role="Geocomplete"
    />
  );
}

export default Geocomplete;
