const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			characteristics: [],
			characters: [],
			planetCharacteristics: [],
			planetCharacters: [],
			vehicleCharacteristics: [],
			vehicleCharacters: [],
			favorites: []
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			getCharacteristics: () => {
				const store = getStore()
				for (const character of store.characters) {
					let id = character.uid
					const apiURL = `https://www.swapi.tech/api/people/${id}`
					fetch(apiURL)
						.then(Response => {
							if (Response.ok) {
								return Response.json();
							}
							throw new Error("Ha ocurrido un error")
						})
						.then(body => setStore({
							characteristics: [...store.characteristics,
							{
								uid: body.result.uid,
								_id: body.result._id,
								...body.result.properties
							}]
						}))
						.catch(error => console.log(error));
				}
			},
			getCharacters: () => {
				const apiURL = `https://www.swapi.tech/api/people/`
				fetch(apiURL)
					.then(Response => {
						if (Response.ok) {
							return Response.json();
						}
						throw new Error("Ha ocurrido un error")
					})
					.then(body => setStore({ characters: body.results }))
					.catch(error => console.log(error));
			},
			getPlanetCharacteristics: () => {
				const store = getStore()
				for (const character of store.planetCharacters) {
					let id = character.uid
					const apiURL = `https://www.swapi.tech/api/planets/${id}`
					fetch(apiURL)
						.then(Response => {
							if (Response.ok) {
								return Response.json();
							}
							throw new Error("Ha ocurrido un error")
						})
						.then(body => setStore({
							planetCharacteristics: [...store.planetCharacteristics,
							{
								uid: body.result.uid,
								_id: body.result._id,
								...body.result.properties
							}]
						}))
						.catch(error => console.log(error));
				}

			},
			getPlanetCharacters: () => {
				const apiURL = `https://www.swapi.tech/api/planets/`
				fetch(apiURL)
					.then(Response => {
						if (Response.ok) {
							return Response.json();
						}
						throw new Error("Ha ocurrido un error")
					})
					.then(body => setStore({ planetCharacters: body.results }))
					.catch(error => console.log(error));
			},
			getVehicleCharacteristics: () => {
				const store = getStore()
				for (const character of store.vehicleCharacters) {
					let id = character.uid
					const apiURL = `https://www.swapi.tech/api/vehicles/${id}`
					fetch(apiURL)
						.then(Response => {
							if (Response.ok) {
								return Response.json();
							}
							throw new Error("Ha ocurrido un error")
						})
						.then(body => setStore({
							vehicleCharacteristics: [...store.vehicleCharacteristics,
							{
								uid: body.result.uid,
								_id: body.result._id,
								...body.result.properties
							}]
						}))
						.catch(error => console.log(error));
				}

			},
			getVehicleCharacters: () => {
				const apiURL = `https://www.swapi.tech/api/vehicles/`
				fetch(apiURL)
					.then(Response => {
						if (Response.ok) {
							return Response.json();
						}
						throw new Error("Ha ocurrido un error")
					})
					.then(body => setStore({ vehicleCharacters: body.results }))
					.catch(error => console.log(error));
			},
			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},

			toggleFavorite: (item) => {
				const store = getStore();
				const actions = getActions();
				if (actions.isFavorite(item.name)) {
					const newFavorites = store.favorites.filter((fav) => {
						return fav.name !== item.name
					})
					setStore({
						favorites: newFavorites
					})
				}
				else {
					setStore({
						favorites: [
							...store.favorites,
							item
						]
					})
				};
			},
			isFavorite: (name) => {
				const store = getStore();
				return (store.favorites.find((favorite) => {
					return favorite.name == name
				}))
			}
		}
	};
};

export default getState;
