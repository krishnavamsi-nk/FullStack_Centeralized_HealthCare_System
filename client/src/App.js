import React, { useEffect, useState } from "react";

import axiosInstance from "./api/axiosInstance";
import { useAppDispatch } from "./app/hooks";
import { userActions } from "./features/userSlice";
import Navigation from "./components/Navigation/Navigation";
import PageLoader from "./components/Loaders/PageLoader";
function App() {
  const [screenLoad, setScreenLoad] = useState(true);

  const dispatch = useAppDispatch();
  const getUserData = async () => {
    setScreenLoad(true);
    try {
      const response = await axiosInstance.get("/check");
      console.log(response.data);
      dispatch(userActions.setState(response.data));
      setScreenLoad(false);
    } catch (err) {
      console.log(err);
      setScreenLoad(false);
    }
  };
  const storeLocation = (GeolocationPosition) => {
    console.log(GeolocationPosition);
    let coords = GeolocationPosition.coords;
    dispatch(
      userActions.setLocation({
        latitude: coords.latitude,
        longitude: coords.longitude,
      })
    );
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.permissions.query({ name: "geolocation" }).then((result) => {
        if (result.state === "granted") {
          navigator.geolocation.getCurrentPosition(storeLocation, () => {}, {
            timeout: 5000,
            maximumAge: 0,
          });
        } else if (result.state === "prompt") {
          navigator.geolocation.getCurrentPosition(storeLocation, () => {}, {
            timeout: 5000,
            maximumAge: 0,
          });
        } else if (result.state === "denied") {
          //If denied then you have to show instructions to enable location
        }

        result.onchange = function () {
          if (result.state === "granted") {
            console.log("granted", result.state);
            navigator.geolocation.getCurrentPosition(storeLocation, () => {}, {
              timeout: 5000,
              maximumAge: 0,
            });
            //If granted then you can directly call your function here
          } else if (result.state === "prompt") {
            navigator.geolocation.getCurrentPosition(storeLocation, () => {}, {
              timeout: 5000,
              maximumAge: 0,
            });
            console.log(result.state);
          } else if (result.state === "denied") {
            //If denied then you have to show instructions to enable location
          }
        };
      });
    } else {
      console.log("Location not available");
    }
  };

  useEffect(() => {
    getUserData();
    getUserLocation();
  }, []);  // Add them to the dependency array
  
  return screenLoad ? <PageLoader /> : <Navigation />;
}

export default App;

//just to test actions to test again
