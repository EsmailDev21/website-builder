import { v4 } from "uuid";
export type Position = {
  accuracy: number;
  address: string | null;
  altitude: number;
  attributes: {
    sat?: number;
    ignition?: boolean;
    status?: number;
    charge?: boolean;
    blocked?: boolean;
    alarm?: string;
    batteryLevel?: number;
    rssi?: number;
    distance?: number;
    motion?: boolean;
    totalDistance?: number;
  };
  alarm: string;
  blocked: boolean;
  charge: boolean;
  sat: number;
  status: number;
  course: number;
  deviceId: number;
  deviceTime: string; //use this for comparison
  fixTime: string; //This work too
  geofenceIds: null | number[];
  id: number;
  latitude: number;
  longitude: number;
  network: {
    radioType: string;
    considerIp: boolean;
    cellTowers: [
      {
        cellId: number;
        locationAreaCode: number;
        mobileCountryCode: number;
        mobileNetworkCode: number;
      }
    ];
  } | null;

  considerIp: boolean;
  radioType: string;
  outdated: boolean;
  protocol: string;
  serverTime: string;
  speed: number;
  valid: boolean;
};

export default function findTourParkings(tour: Position[]) {
  let parkings: { position: Position; duration: number }[] = [];
  let parkingStartTime: number | null = null;

  for (let i = 0; i < tour.length - 1; i++) {
    if (tour[i].speed === 0 || tour[i].attributes.motion === false) {
      if (parkingStartTime === null) {
        parkingStartTime = new Date(tour[i].deviceTime).getTime();
      }
    } else if (parkingStartTime !== null) {
      const parkingEndTime = new Date(tour[i].deviceTime).getTime();
      const parkingDuration = parkingEndTime - parkingStartTime;
      parkings.push({ position: tour[i - 1], duration: parkingDuration });
      parkingStartTime = null;
    }
  }

  /*console.table(
    splineInterpolation(tour, 5).map((pos) => ({
      id: pos.id,
      lon: pos.longitude,
      lat: pos.latitude,
    }))
  );*/
  console.table(
    embedInterpolatedPositions(tour.slice(0, 10), 5).map((pos) => ({
      id: pos.id,
      lon: pos.longitude,
      lat: pos.latitude,
    }))
  );
  /* console.table(
    parkings.map((parking) => ({
      id: parking.position.id,
      lon: parking.position.longitude,
      lat: parking.position.latitude,
      deviceTime: new Date(parking.position.deviceTime).toLocaleTimeString(),
      speed: parking.position.speed,
      durationInMunites: parking.duration / (1000 * 60),
    }))
  );*/
}

function splineInterpolation(positions: Position[], numPoints) {
  //console.log({ positions });
  // Extract latitude and longitude arrays from positions
  const lats = positions.map((pos) => pos.latitude);
  const lngs = positions.map((pos) => pos.longitude);
  // Create spline functions for latitude and longitude
  const splineLat = curveNatural(lats);
  const splineLng = curveNatural(lngs);
  //console.log({ a: splineLat(1), b: splineLng(1) });
  // Interpolate numPoints points along the spline curve
  const interpolatedPositions = [];
  for (let i = 0; i < numPoints; i++) {
    const t = i / (numPoints - 1);
    //console.log({ t }); // t parameter varies from 0 to 1
    const lat = splineLat(t);
    const lng = splineLng(t);
    console.log({ lat, lng });
    interpolatedPositions.push({ latitude: lat, longitude: lng, id: v4() });
  }

  //onsole.log({ interpolatedPositions });
  return interpolatedPositions;
}

function curveNatural(points: number[]): (t: number) => number {
  const n = points.length - 1;

  // Compute second derivatives (slopes) at each point
  const dx = [];
  const dy = [];
  const slope = [];

  for (let i = 0; i < n; i++) {
    dx.push(points[i + 1] - points[i]);
    dy.push(points[i + 1] - points[i]);
    if (dx[i] !== 0) {
      slope.push(dy[i] / dx[i]);
    } else {
      // Handle division by zero
      console.error(
        "Division by zero encountered when calculating slope at index:",
        i
      );
      // Set slope to a default value or handle it as per your use case
      slope.push(0); // Or any appropriate default value
    }
  }

  const a = [];
  const b = [];
  const c = [];
  const d = [];

  for (let i = 0; i < n; i++) {
    a.push(points[i]);
    b.push(slope[i]);
    const cVal = ((3 * dy[i]) / dx[i] - 2 * slope[i]) / dx[i];
    const dVal = (2 * slope[i] - (2 * dy[i]) / dx[i]) / dx[i] ** 2;
    console.log(slope[i + 1]);
    if (isNaN(cVal) || isNaN(dVal)) {
      console.error("NaN encountered in c or d calculation at index:", i);
      console.error("dx:", dx[i], "dy:", dy[i], "slope:", slope[i]);
    }
    c.push(cVal);
    d.push(dVal);
  }
  console.log({ a, b, c, d, dx, dy, slope });
  // Interpolation function
  return function (t) {
    const i = Math.min(Math.max(0, Math.floor(t * n)), n - 1);
    const dt = t * n - i;
    return a[i] + b[i] * dt + c[i] * dt ** 2 + d[i] * dt ** 3;
  };
}

export function embedInterpolatedPositions(
  originalTour: Position[],
  numPoints: number
) {
  const interpolatedTour = [];

  for (let i = 0; i < originalTour.length - 1; i++) {
    const currentPosition = originalTour[i];
    const nextPosition = originalTour[i + 1];

    interpolatedTour.push(currentPosition);

    // Check for significant speed variation between consecutive points
    if (Math.abs(currentPosition.speed - nextPosition.speed) > 5) {
      let arr = [currentPosition, nextPosition];
      //console.log(arr);
      //console.log([currentPosition, nextPosition]);
      // Interpolate points between current and next positions
      const interpolatedPoints = splineInterpolation(arr, numPoints);

      interpolatedTour.push(...interpolatedPoints);
    }
  }

  // Add the last position of the tour
  interpolatedTour.push(originalTour[originalTour.length - 1]);

  return interpolatedTour;
}
