import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";

export async function loader({}: LoaderFunctionArgs) {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/ditto");

  if (!response.ok) {
    return {
      type: "failure" as const,
      error: "F in chat",
    };
  }

  const json = await response.json();

  return {
    type: "success" as const,
    name: json.name,
    id: json.id,
  };
}

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

type APIResponse = {
  id: number;
  name: string;
};

function ClientData() {
  const [data, setData] = useState<APIResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;

    async function fetchData() {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon/ditto");

      if (!response.ok) {
        if (isActive) {
          setError("Error while fetching from API :(");
          setData(null);
        }

        return;
      }

      const json = await response.json();

      if (isActive) {
        setData(json);
      }
    }

    fetchData();

    return () => {
      isActive = false;
    };
  }, []);

  if (error !== null) {
    return <p>Error: {error}</p>;
  }

  if (data === null) {
    return <p>Loading data from the client...</p>;
  }

  return (
    <>
      <p>ID: {data.id}</p>
      <p>Name: {data.name}</p>
    </>
  );
}

export default function Index() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="h-screen items-center justify-center">
      <p>This is the data, coming from the server:</p>
      {data.type === "failure" ? (
        <p>Failed to fetch data from server, blame the PokeAPI people</p>
      ) : (
        <>
          <p>ID: {data.id}</p>
          <p>Name: {data.name}</p>
        </>
      )}
      <p className="mt-8">This is the data, coming from the client:</p>
      <ClientData />
    </div>
  );
}
