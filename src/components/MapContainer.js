/* eslint-disable react-hooks/exhaustive-deps */
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { Circle, GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import GatewayName from './GatewayNameInput';
import DistanceDifference from './DistanceDifference';

const containerStyle = {
  width: '1100px',
  height: '600px',
  margin: '45px',
};

const center = {
  lat: 41.10893790697754,
  lng: 29.008645143794233,
};
const circleOptions = {
  strokeColor: '#FF0000',
  strokeOpacity: 0.8,
  strokeWeight: 2,
  fillColor: '#FF0000',
  fillOpacity: 0.35,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
  radius: 30000,
  zIndex: 1,
};
const littleCircleOptions = {
  strokeColor: '#000000',
  strokeOpacity: 1,
  strokeWeight: 2,
  fillColor: '#000000',
  fillOpacity: 1,
  clickable: true,
  draggable: false,
  editable: false,
  visible: true,
  radius: 35,
  zIndex: 1,
};

const MapContainer = (props) => {
  const { collectionData, deviceData } = props;
  const [markerPoints, setMarkerPoints] = useState([]);
  const [draggable, setDraggable] = useState(true);
  const [currentSignal, setCurrentSignal] = useState([]);
  const [distanceAndName, setDistanceAndName] = useState([]);
  const [intersection, setIntersection] = useState();
  //Detect and keep coming signal
  useEffect(() => {
    if (deviceData && deviceData.signalType === 'up') {
      if (!_.isEqual(currentSignal[currentSignal.length - 1], deviceData)) {
        setCurrentSignal((prev) => [...prev, deviceData]);
      }
    }
    detectRadiusOfSignal();
  }, [deviceData]);
  console.log(collectionData);
  //To cancel drag map when create a marker and ınput
  useEffect(() => {
    if (markerPoints.length > 0) setDraggable(false);
    else setDraggable(true);
  }, [markerPoints]);

  //Compare coming signal and keep its name and distance
  useEffect(() => {
    const nameAndDistance = {};
    nameAndDistance.distance = 10000;
    nameAndDistance.deviceName = '';
    if (collectionData.length > 1 && currentSignal.length > 0) {
      for (let index = 0; index < collectionData.length; index++) {
        if (
          collectionData[index].spreadingFactor ===
            currentSignal[currentSignal.length - 1].spreadingFactor &&
          Math.abs(
            collectionData[index].rssi -
              currentSignal[currentSignal.length - 1].rssi
          ) < nameAndDistance.distance
        ) {
          nameAndDistance.distance = collectionData[index].distance;
          nameAndDistance.gateway =
            currentSignal[currentSignal.length - 1].gateway;
        }
      }
      setDistanceAndName([...distanceAndName, nameAndDistance]);
    }
  }, [currentSignal]);

  const detectRadiusOfSignal = () => {
    for (
      let indexDistance = 0;
      indexDistance < distanceAndName.length;
      indexDistance++
    ) {
      for (
        let indexMarker = 0;
        indexMarker < markerPoints.length;
        indexMarker++
      ) {
        if (
          distanceAndName[indexDistance].gateway ===
          markerPoints[indexMarker].gateway
        ) {
          setMarkerPoints((prev) => {
            prev[indexMarker].circleRadius =
              distanceAndName[indexDistance].distance;
            return prev;
          });
        }
      }
    }
  };

  //To add marker create an object of values of marker
  const addMarker = (event) => {
    const points = {};
    points.lat = event.latLng.lat();
    points.lng = event.latLng.lng();
    points.domX = event.domEvent.pageX;
    points.domY = event.domEvent.pageY;
    points.gateway = '';
    points.circleRadius = 0;
    setMarkerPoints([...markerPoints, points]);
  };

  const removeMarker = (event) => {
    if (markerPoints.length > 0) {
      const newArray = markerPoints.filter(
        (element) =>
          element.lat !== event.latLng.lat() &&
          element.lng !== event.latLng.lng()
      );
      setMarkerPoints(newArray);
    }
  };
  const addGatewayName = (device, index) => {
    setMarkerPoints((prev) => {
      prev[index].gateway = device;
      return prev;
    });
  };

  //setIntersection of circle to model signal detection
  const intersectionCircle = (e) => {
    setIntersection({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    });
  };

  const onIntersectionCircleClick = () => {
    setIntersection();
  };

  const renderInputArea = () => {
    if (markerPoints.length > 0) {
      return markerPoints.map((el, index) => (
        <GatewayName
          key={index}
          left={el.domX}
          top={el.domY}
          whichMarker={index}
          deviceName={addGatewayName}
        />
      ));
    }
  };

  const renderMarkers = () => {
    if (markerPoints.lenght < 1) return;
    return markerPoints.map((el, index) => (
      <Marker key={index} position={el} onClick={removeMarker} />
    ));
  };

  const renderCircles = () => {
    if (markerPoints.length > 0)
      return markerPoints.map((el, index) => (
        <Circle
          key={index}
          center={el}
          radius={el.circleRadius}
          options={circleOptions}
        />
      ));
  };
  console.log(intersection == null);

  const renderLogs = () => {
    if (currentSignal.length)
      return currentSignal.map((el, index) => {
        return (
          <div className="m-2" key={index}>
            <div>Gateway Name: {el.gateway}</div>
            <div>Published At: {el.createdAt}</div>
            <div>Rssi Value: {el.rssi}</div>
            <div>SNR Value: {el.SNR}</div>
            <div>Spread Factor: {el.spreadingFactor}</div>
            <div>---------------------------------</div>
          </div>
        );
      });
  };

  return (
    <div>
      <div className="d-flex">
        <div>
          <LoadScript googleMapsApiKey="AIzaSyDbr2oYC-F-TgeXenpSlVDJRT_O956Q-w4">
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              options={{
                draggable: draggable,
              }}
              clickableIcons={false}
              zoom={12}
              onClick={addMarker}
              onRightClick={intersectionCircle}
            >
              {/* Child components, such as markers, info windows, etc. */}
              {renderMarkers()}
              {renderCircles()}
              {intersection != null ? (
                <Circle
                  center={intersection}
                  options={littleCircleOptions}
                  onClick={onIntersectionCircleClick}
                />
              ) : undefined}
            </GoogleMap>
          </LoadScript>
          {renderInputArea()}
        </div>
        <div
          style={{
            marginTop: '45px',
            border: '10px',
            height: '600px',
            overflow: 'auto',
            backgroundColor: 'black',
            color: 'white',
          }}
        >
          {renderLogs()}
        </div>
      </div>
      <div>
        <DistanceDifference intersection={intersection} />
      </div>
    </div>
  );
};

export default React.memo(MapContainer);
