export interface ID {
    name: string;
    value: string;
}
  
export interface IDateofBirth {
    date: string;
    age: number;
}
  
export interface ILocation {
    city: string;
    coordinates: Record<string, string>;
    country: string;
    postcode: number;
    state: string;
    street: Record<string, string | number>
    timezone: Record<string, string>
}

export interface IRegistration {
    date: string;
    age: number;
}
  
export interface IDataReturn {
    cell: string;
    dob: IDateofBirth;
    email: string;
    gender: string;
    id: ID;
    location: ILocation;
    login: Record<string, string>;
    name: Record<string, string>;
    nat: string;
    phone: string;
    picture: Record<string, string>;
    registered: IRegistration;
}
  
export interface IUser {
    city: string;
    dateRegistered: string;
    gender: string;
    name: string;
    state: string;
    country: string;
}

export interface ICountriesList {
    countries: any[];
    selectedCountry?: string;
    updateCountry: (value: string) => void;
}
