const DeviceNameInput = (props) => {
  const style = {
    position: 'absolute',
    left: props.left,
    top: props.top,
    border: '2px radius',
    zIndex: 1,
    width: '100px',
  };
  const onChange = (e) => {
    props.deviceName(e.target.value, props.whichMarker);
  };

  return (
    <div style={style}>
      <input
        style={{
          width: '100%',
        }}
        placeholder="device name"
        onChange={onChange}
      />
    </div>
  );
};

export default DeviceNameInput;
