import { useState } from "react";


export function useData<T>(cb: (id: string) => Promise<T>) {
  const [data, setData] = useState<null | T>(null);

  const getData = (id: string) => {
    cb(id).then((res) => setData(res));
  };
  return { data, getData };
}


type todo = {
    "userId": string,
    "id": string,
    "title": string,
    "completed": boolean
  }
export function useFetch() {
    const fetchData = (id: string): Promise<todo> => {
        return fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
               .then(response => response.json())
    }
    const { data, getData } = useData(fetchData)
    
    return {data, getData}
}

