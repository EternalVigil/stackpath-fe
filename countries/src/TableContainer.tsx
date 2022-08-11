import React from 'react';
import { columnHeaders } from './constants';
import { IUser } from './typeDefs';

interface ITableProps {
    selectedCountry?: string;
    userData: IUser[];
    genderOptions: string[];
    updateGenderFilter: (value: string) => void;
}

export const TableContainer: React.FC<ITableProps> = ({ selectedCountry, userData, genderOptions, updateGenderFilter }) => {

    if(!selectedCountry) {
        return(
            <div className="tableContainer">
                Please select a country
            </div>
        );
    }

    return(
        <div className="tableContainer">
            <div>
                <select onChange={(e) => updateGenderFilter(e?.target?.value)}>
                    {
                        genderOptions.map((gender: string) => {
                            return(
                                <option key={gender} value={gender}>
                                    { `${gender[0].toUpperCase()}${gender.slice(1)}` }
                                </option>
                            )
                        })
                    }
                </select>
            </div>
            {
                userData?.length
            ? <table className="userTable">
                <tbody>
                    <tr className="tableRow">
                        {
                            columnHeaders.map((header) => {
                                return(<th key={header}>{header}</th>)
                            })
                        }
                    </tr>
                {
                    userData.map((user) => {
                        const { name, gender, city, state, dateRegistered } = user;
                        return(
                          <tr key={`${name}-${dateRegistered}`} className="tableRow">
                            <td className="nameCell">{name}</td>
                            <td className="genderCell">{gender}</td>
                            <td className="cityCell">{city}</td>
                            <td className="stateCell">{state}</td>
                            <td className="registeredDateCell">{dateRegistered}</td>
                          </tr>  
                        )
                    })
                }
                </tbody>
            </table>
            : <div className="emptyRecords">No Records Found</div>
            }
        </div>
    );
};