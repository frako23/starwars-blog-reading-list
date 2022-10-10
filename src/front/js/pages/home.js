import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { CharacterCard } from "../component/characterCard";
import { PlanetCard } from "../component/planetCard";
import { VehicleCard } from "../component/vehicleCard";

export const Home = () => {

	const { store, actions } = useContext(Context);

	useEffect(() => {
		if (store.characters.length > 0) {
			actions.getCharacteristics()
		}
	}, [store.characters])
	useEffect(() => {
		if (store.planetCharacters.length > 0) {
			actions.getPlanetCharacteristics()
		}
	}, [store.planetCharacters])
	useEffect(() => {
		if (store.vehicleCharacters.length > 0) {
			actions.getVehicleCharacteristics()
		}
	}, [store.vehicleCharacters])
	return (
		<div className="container" >
			<h2 className="text-danger mt-5">Characters</h2>
			<div className="carousel" >
				<div className="characters">
					{store.characteristics.map((character, index) => {
						return (
							<CharacterCard character={character} key={index} />
						)
					})}</div>
			</div>


			<h2 className="text-danger mt-5">Planets</h2>
			<div className="carousel" >
				<div className="characters">
					{store.planetCharacteristics.map((planetCharacter, indexPlanet) => {
						return (

							<PlanetCard planetCharacter={planetCharacter} key={indexPlanet} />

						)
					})}</div>
			</div>

			<h2 className="text-danger mt-5">Vehicles</h2>
			<div className="carousel" >
				<div className="characters">
					{store.vehicleCharacteristics.map((vehicleCharacter, indexVehicle) => {
						return (

							<VehicleCard vehicleCharacter={vehicleCharacter} key={indexVehicle} />

						)
					})}</div>
			</div>
		</div>




	);
};
