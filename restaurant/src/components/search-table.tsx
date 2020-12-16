import React, { useEffect, useState } from "react";
import "./search-table.css";

function SearchTable() {
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [sort, setSort] = useState("name");
  const [restaurants, setRestaurants] = useState([]);
  const [cities, setCities] = useState([] as any);
  const [states, setStates] = useState([] as any);
  const [genres, setgenres] = useState([] as any);
  const [tempRestaurants, setTempRestaurants] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(
      `http://localhost:3001/api/v1/restaurant?limit=10&skip=${
        page - 1
      }&sort=${sort}`,
      {
        method: "GET",
        headers: new Headers({
          Accept: "application/json",
        }),
      }
    )
      .then((res) => res.json())
      .then((response) => {
        setTotal(response.total);
        setRestaurants(response.data);
        setTempRestaurants(response.data);
        const citiesData: any = response.data.map(({ city }) => city);
	const cityList = [...new Set(citiesData)];
        setCities(cityList);
        const genreData: any = response.data.map(({ genre }) => genre);
        setgenres([...new Set(genreData)]);
        const stateData: any = response.data.map(({ state }) => state);
        setStates([...new Set(stateData)]);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, [page, sort]);
  const filter = (search, by) => {
    let result = restaurants;
    const searchValue = search.toLowerCase();
    if (search && by === "all") {
      if (by === "all") {
        result = tempRestaurants.filter(
          ({ name, city, genre }: any) =>
            name.toLowerCase().includes(searchValue) ||
            city.toLowerCase().includes(searchValue) ||
            genre.toLowerCase().includes(searchValue)
        );
      }
    } else {
      if (searchValue === "") {
        result = tempRestaurants || [];
      } else {
        result = tempRestaurants.filter((d: any) =>
          d[by].toLowerCase().includes(searchValue)
        );
      }
    }

    setRestaurants(result);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    filter(e.target.value, "all");
  };

  const handleSearchName = (e) => {
    setSearch(e.target.value);
    filter(e.target.value, "name");
  };

  const handleSearchPhoneNumber = (e) => {
    setSearch(e.target.value);
    filter(e.target.value, "telephone");
  };

  const handleCity = (e) => {
    setSearch(e.target.value);
    filter(e.target.value, "city");
  };

  const handleState = (e) => {
    setSearch(e.target.value);
    filter(e.target.value, "state");
  };

  const handleGenre = (e) => {
    setSearch(e.target.value);
    filter(e.target.value, "genre");
  };

  const setSortBy = (by) => {
    setSort(by);
  };
  const totalArrayNumber = Math.ceil(total / 10);
  const totalArray = Array.from(Array(totalArrayNumber), (d, i) => i);

  return (
    <div className="container p-2">
      <div className="row">
        <div className="col-lg-12 mb-3">
          <div className="col-lg-4 offset-lg-8">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search"
                onChange={handleSearch}
              ></input>
              <div className="input-group-append">
                <button className="btn btn-secondary" type="button">
                  <i className="fa fa-search"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <table className="table table-boarded">
        <tr>
          <th onClick={() => setSortBy("name")}>Name</th>
          <th onClick={() => setSortBy("city")}>City</th>
          <th onClick={() => setSortBy("state")}>State</th>
          <th onClick={() => setSortBy("telephone")}>Phone Number</th>
          <th onClick={() => setSortBy("genre")}>Genres</th>
        </tr>
        <tr>
          <th>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search Name"
                onChange={handleSearchName}
              ></input>
            </div>
          </th>
          <th>
            <div className="input-group">
              <select className="form-control" onChange={handleCity}>
                <option value="">All</option>
                {cities.map((d) => (
                  <option value={d}>{d}</option>
                ))}
              </select>
            </div>
          </th>
          <th>
            <div className="input-group">
              <select className="form-control" onChange={handleState}>
                <option value="">All</option>
                {states.map((d) => (
                  <option value={d}>{d}</option>
                ))}
              </select>
            </div>
          </th>
          <th>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search Phone number"
                onChange={handleSearchPhoneNumber}
              ></input>
            </div>
          </th>
          <th>
            <div className="input-group">
              <select className="form-control" onChange={handleGenre}>
                <option value="">All</option>
                {genres.map((d) => (
                  <option value={d}>{d}</option>
                ))}
              </select>
            </div>
          </th>
        </tr>
        <tbody>
          {restaurants && restaurants.length > 0 ? (
            restaurants.map((d) => (
              <tr>
                <td>{d['name']}</td>
                <td>{d['city']}</td>
                <td>{d['state']}</td>
                <td>{d['telephone']}</td>
                <td>{d['genre']}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5}>No Record Found</td>
            </tr>
          )}
        </tbody>
      </table>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className={page === 1 ? "page-item disabled" : "page-item"}>
            <a
              className="page-link"
              href="javascript:void(0)"
              onClick={() => setPage(page - 1)}
            >
              Previous
            </a>
          </li>
          {totalArray &&
            totalArray.map((i) => (
              <li className={page === i + 1 ? "page-item active" : "page-item"}>
                <a
                  className={page === i + 1 ? "page-link active" : "page-link"}
                  href="javascript:void(0)"
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </a>
              </li>
            ))}

          <li
            className={
              page === totalArray.length ? "page-item disabled" : "page-item"
            }
          >
            <a
              className="page-link"
              href="javascript:void(0)"
              onClick={() => setPage(page + 1)}
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default SearchTable;
