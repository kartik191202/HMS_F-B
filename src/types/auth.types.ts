// export type User = { id: string; name: string; role: string };

export type User = {
  id: string;
  name: string;
  role: string;
  locationId?: string;
  locationName?: string;
  isDoctor?: boolean;
};