import {useEffect, useState} from 'react'

type PostitionOptions = {
  enableHighAccuracy?: boolean,
  maximumAge?: number,
  timeout?: number
}

type GeoLocationCoordinatesExtended = {
  accuracy: number | null;
  altitude: number | null;
  altitudeAccuracy: number | null;
  heading: number | null;
  latitude: number | null;
  longitude: number | null;
  speed: number | null;
  timestamp: number | null;
  error: GeolocationPositionError | null;
}

const useGeolocation = (
  {enableHighAccuracy, maximumAge, timeout} : PostitionOptions = {},
  callback?: (params: GeoLocationCoordinatesExtended) => void
) => {

  const [coordinates, setCoordinates] = useState<GeoLocationCoordinatesExtended>({
    accuracy: null, altitude: null, altitudeAccuracy: null,
    latitude: null, longitude: null,
    heading: null, speed: null,
    timestamp: null, error: null
  })

  useEffect(() => {
    let didCancel
    const updateCoordinates = ({ coords, timestamp }: GeolocationPosition) => {
      const { accuracy, altitude, altitudeAccuracy, heading, latitude, longitude, speed } = (coords || {})
      if (!didCancel) {
        setCoordinates({
          accuracy, altitude, altitudeAccuracy,
          latitude, longitude,
          heading, speed,
          timestamp, error: null
        })

        if (callback instanceof Function) {
          callback({
            accuracy, altitude, altitudeAccuracy,
            latitude, longitude,
            heading, speed,
            timestamp, error: null
          })
        }
      }
    }

    const setError = error => {
      if (!didCancel) {
        setCoordinates({
          accuracy: null, altitude: null, altitudeAccuracy: null,
          latitude: null, longitude: null,
          heading: null,  speed: null,
          timestamp: null, error
        })
      }
    }

    let watchId
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(updateCoordinates, setError)
      // watchId = navigator.geolocation.watchPosition(
      //   updateCoordinates,
      //   setError,
      //   {enableHighAccuracy, maximumAge, timeout}
      // )
    }

    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId)
      }
      didCancel = true
    }
  }, [callback, enableHighAccuracy, maximumAge, timeout])

  return coordinates
}

export default useGeolocation
