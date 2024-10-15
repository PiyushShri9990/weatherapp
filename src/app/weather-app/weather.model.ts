export interface Weather {
  coord: {
    lat: number;
    lon: number;
  };
  main: {
    temp: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
}
