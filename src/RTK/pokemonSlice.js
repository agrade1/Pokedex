import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPokemons = createAsyncThunk("pokemon/fetchAll", async () => {
  const ids = Array.from({ length: 151 }, (_, i) => i + 1);

  const pokemonData = await Promise.all(
    ids.map(async (id) => {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await res.json();

      return {
        id: data.id,
        name: data.name,
        sprites: data.sprites,
        types: data.types,
        stats: data.stats,
      };
    })
  );

  return pokemonData;
});

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState: { list: [], status: "idle" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemons.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPokemons.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchPokemons.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default pokemonSlice.reducer;
