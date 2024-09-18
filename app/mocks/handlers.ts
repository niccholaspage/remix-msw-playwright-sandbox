import { http, HttpResponse } from "msw";

export const handlers = [
  //   http.get("https://pokeapi.co/api/v2/pokemon/ditto", () => {
  //     return new HttpResponse(null, {
  //       status: 404,
  //     });
  //   }),
  http.get("https://pokeapi.co/api/v2/pokemon/ditto", () => {
    return HttpResponse.json({
      id: 1337,
      name: "mock-pokemon",
    });
  }),
];
