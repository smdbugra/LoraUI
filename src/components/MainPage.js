import React from 'react';

const MainPage = () => {
  return (
    <div className="m-5">
      <div>
        <h3 className="text-dark">Let's Meet With Lora!</h3>
      </div>
      <hr />
      <div className="d-flex mt-5">
        <div className="mr-4">
          <img
            className="radius"
            src={require('./../icons/what-is-lora.jpg')}
            alt=""
            style={{ height: '250px' }}
          />
        </div>
        <div className="pt-2">
          <h5 className="ml-3">What is Lora?</h5>
          <hr />
          <p>
            With the rapid spread of Internet of Things (IoT) applications all
            over the world in the last decade, it has become an important need
            to transfer data to long distances reliably and with low power
            consumption. Recently, we have witnessed important developments in
            communication technologies that can meet this need. At the forefront
            of these developments is the emergence of wireless communication
            technologies such as LoRa, Sigfox, NB-IOT, which enable the
            transmission of data at low bit rates over long distances with low
            power consumption.
          </p>
          <br />
          <p>
            LoRa, which is the most widespread among these technologies, is a
            modulation technique consisting of the first syllables of Long Range
            words, providing communication at a much longer distance than
            competing technologies such as WiFi and wired communication, and
            using radio frequencies. LoRaWAN (Long Range Wide Area Network) is a
            low-power wide area network specification designed for products that
            operate wirelessly on a regional, national, or global network.
          </p>
        </div>
      </div>
      <div className="d-flex mt-5">
        <div className="pt-2">
          <h5 className="ml-3 mt-3">Why Lora?</h5>
          <hr />
          <p>
            The fact that methods such as cellular communication (2G, 3G, 4G +)
            and WiFi, which are currently used to connect objects to the
            Internet, cannot fully meet the needs such as long-distance data
            transmission or the continuity of this transmission, or incur high
            costs while meeting these needs, which may eliminate these
            disadvantages. has been the driving force of the search for new
            technology. The distance limitation in WiFi technology, the costs of
            cellular communication and high energy use have been identified as
            the main deficiencies that should be avoided with LoRa technology.
            LoRa, which uses regionally different radio frequency ranges, can
            establish a connection in an open area at a distance that can expand
            up to 15 km, while devices connected at the endpoint can maintain
            communication from 8 to 15 years without any problems.
          </p>
        </div>
        <div className="p-2">
          <img
            className="radius"
            src={require('./../icons/why-lora.png')}
            alt=""
            style={{ height: '250px' }}
          />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
