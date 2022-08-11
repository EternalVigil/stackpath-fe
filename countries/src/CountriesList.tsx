import React from 'react';
import { ICountriesList } from './typeDefs';

export const CountriesList: React.FC<ICountriesList> = ({ countries, selectedCountry, updateCountry }) => {
    return(
        <div className="countriesList">
            {
                countries.map((country: [string, Record<string, number>]) => {
                    const [key, countData] = country;
                    const { count } = countData ?? {};

                    return(
                        <button 
                            key={`${key}`} 
                            disabled={key === selectedCountry} 
                            className="countryButton"
                            onClick={() => {
                                if(key) {
                                    updateCountry(key);
                                }
                            }}
                        >
                            {key} - {count}
                        </button>

                    )
                })
            }
        </div>
    );
};