import { useState } from "react";
import styled from "styled-components";
import Modal from "../_layout/Modal";
import WeatherChart from "../WeatherChart/WeatherChart";
import Geocomplete from "../Geocomplete";

const DashboardContainer = styled.div`
  font-family: "Lexend", sans-serif;
  color: #fffefa;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background: #222529;
  display: flex;
`;

function Dashboard() {
  const [location, setLocation] = useState({});
  const [showLocationModal, setShowLocationModal] = useState(true);

  function handleLocationChanged(newLocation) {
    setLocation(newLocation);
    setShowLocationModal(false);
  }

  return (
    <DashboardContainer role="Dashboard">
      <Modal
        showModal={showLocationModal}
        handleBackgroundClick={() => setShowLocationModal(false)}
      >
        <Geocomplete
          onLocationChanged={handleLocationChanged}
          onFocus={() => setShowLocationModal(true)}
        />
      </Modal>
      <WeatherChart location={location} />
    </DashboardContainer>
  );
}

export default Dashboard;
