const getData = url =>
  fetch(url).then(res => {
    if (res.ok) {
      return res.json();
    }

    throw new Error(res.statusText);
  });

export const fetchStarships = urls => Promise.all(urls.map(getData));

export const fetchPeople = () =>
  getData('https://swapi.co/api/people/').then(({ results }) => {
    return Promise.all(
      results.map(person =>
        fetchStarships(person.starships).then(starships => ({
          ...person,
          starships,
        }))
      )
    );
  });
