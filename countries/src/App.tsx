import React, { useState, useEffect } from 'react';
import { CountriesList } from './CountriesList';
import { TableContainer } from './TableContainer';
import { IDataReturn, IUser } from './typeDefs';
import './App.css';

// TODO - should be in env config file
const url = 'https://randomuser.me/api/?results=100';

function App() {
  const [locationData, setLocationData] = useState<[string, Record<string, number>] | any[]>([]);
  const [userData, setUserData] = useState<IUser[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [genderOptions, setGenderOptions] = useState<string[]>([]);
  const [genderFilter, setGenderFilter] = useState<string>('All');

  useEffect(() => {
    fetch(url)
      .then((response) => {
        if(response.ok) return response.json();
        throw new Error('something failed with the fetch');
      })
      .then((data) => {
        const { results } = data ?? [];
        
        const countryMap: Record<string, Record<string, number>> = {};
        const userArray: IUser[] = [];

        const genderOptions = new Set<string>();
        genderOptions.add('All');

        results?.forEach((entry: IDataReturn) => {
          const { location, name, gender, registered } = entry;

          genderOptions.add(gender);

          const { first: firstName, last: lastName} = name ?? {};
          
          const { date: dateRegistered } = registered ?? {};

          const { country, state, city } = location ?? {};


          // compile user data into user array
          const userObj: IUser = {
            name: `${firstName} ${lastName}`,
            gender,
            city,
            state,
            country,
            dateRegistered,
          };
          userArray.push(userObj);
      

          if(!countryMap[country]) {
            countryMap[country] = { count: 0 };
          }
          countryMap[country].count = countryMap[country].count + 1;
        });

        const genderValueOptions: string[] = Array.from(genderOptions);
        setGenderOptions(genderValueOptions);
        setUserData(userArray);

        const countryArray = Object.entries(countryMap);

        const sortedCountries = countryArray.sort((a: [string, Record<string, number>], b:[string, Record<string, number>]) => {
          const [, countDataA] = a;
          const { count: countA } = countDataA;

          const [, countDataB] = b;
          const { count: countB } = countDataB;

          return countB - countA;
        });

        setLocationData(sortedCountries);
      });
  }, []);

  const renderedUsers = userData?.filter((user) => {
    if(!selectedCountry) {
      return false;
    }

    const { country, gender } = user;
    if(country === selectedCountry && (genderFilter === 'All' || gender === genderFilter)) {
      return true;
    }

    return false;
  }).sort((a: IUser, b: IUser) => {
    const { dateRegistered: dateA } = a;
    const { dateRegistered: dateB } = b;
    return dateB.localeCompare(dateA);
  });

  return (
    <div className="App">
      <CountriesList 
        countries={ locationData } 
        selectedCountry={selectedCountry}
        updateCountry={setSelectedCountry}
      />
      <TableContainer 
        selectedCountry={selectedCountry} 
        userData={renderedUsers} 
        genderOptions={genderOptions} 
        updateGenderFilter={setGenderFilter}  
      />
    </div>
  );
}

export default App;
