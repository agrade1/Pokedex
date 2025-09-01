import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPokemons = createAsyncThunk("pokemon/fetchAll", async () => {
  const ids = Array.from({ length: 151 }, (_, i) => i + 1);

  const pokemonData = await Promise.all(
    ids.map(async (id) => {
      // 포켓몬 기본 정보
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await res.json();

      // 포켓몬 species 정보 (한글 이름 포함)
      const speciesRes = await fetch(data.species.url);
      const speciesData = await speciesRes.json();
      const koreanName = speciesData.names.find(
        (n) => n.language.name === "ko"
      )?.name;

      return {
        id: data.id,
        name: data.name, // 영어 이름
        name_ko: koreanName, // 한글 이름
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
