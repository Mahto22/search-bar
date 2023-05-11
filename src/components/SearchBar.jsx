import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import "./SearchBar.css";

function SearchBar() {
  // api data store
  const [data, setData] = useState([]);
  // filter data on change
  const [records, setRecords] = useState([]);
  // sort data
  const [sortType, setSortType] = useState("stars");

  useEffect(() => {
    fetch("https://api.github.com/users/sudheerj/repos")
      .then((res) => res.json())
      .then((resp) => {
        // fetche data list
        const dataList = resp.map((data) => {
          let objList = {
            Avatar: data.owner.avatar_url,
            Reponame: data.name,
            Stars: data.owner.starred_url,
            Description: data.description,
            language: data.language,
          };
          return objList;
        });
        // const showModal = ((data)=>{
        //   alert(setData(data))
        // })
        setData(dataList);
        setRecords(dataList);

        // sort funcnality
        const sortArray = (type) => {
          const types = {
            stars: "stars",
            watchers_count: "watchers_count",
            score: "score",
            name: "name",
            created_at: "created_at",
            updated_at: "updated_at",
          };
          const sortProperty = types[type];
          const sorted = [...resp].sort(
            (a, b) => a[sortProperty] - b[sortProperty]
          );
          
          setData(sorted);
        };
        //alert(sortType);
        // function showModal(){
        //   alert(sortArray(sortType));
        // }
        sortArray(sortType);
      })
      .catch(console.error);
  }, [sortType]);

  const searchFilter = (event) => {
    setRecords(
      records.filter((f) =>
        f.Reponame?.toLowerCase().includes(event.target.value)
      )
    );
  };
  
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="input-wrapper">
              <FaSearch id="search-icons"></FaSearch>
              <input
                type="text"
                placeholder="Type to search..."
                onChange={searchFilter}
              ></input>
            </div>
            <br></br>
            <br></br>

            <div className="row row-cols-1 row-cols-md-2">
              {records.map((d, i) => (
                <div className="col mb-3" key={i}>
                  <div className="card" style={{ width: "15rem" }}>
                    <img
                      className="card-img-top"
                      src={d.Avatar}
                      alt="Card image cap"
                    ></img>
                    <div className="card-body">
                      <h5 className="card-title">{d.Reponame}</h5>
                      <h4 className="card-text">{d.language}</h4>
                      <p className="card-text">{d.Description}</p>
                      <a href={d.Stars} className="btn btn-primary">
                        Stars
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className="col"
            style={{ textAlign: "center", marginTop: "10px" }}
          >
            <select onChange={(e) => setSortType(e.target.value)}>
              <option value="stars">Stars</option>
              <option value="watchers_count">watchers_count</option>
              <option value="score">score</option>
              <option value="name">name</option>
              <option value="created_at">created_at</option>
              <option value="updated_at">updated_at</option>
            </select>
            <br></br>
            <br></br>
            
            <div className="row row-cols-1 row-cols-md-2" onClick={()=>setData(data)}>
              {data.map((band) => (
                <div className="col mb-3" key={band.id}>
                  <div className="card" style={{ width: "15rem" }}>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">{`stars: ${band.stars}`}</li>
                      <li className="list-group-item">{`watchers_count: ${band.watchers_count}`}</li>
                      <li className="list-group-item">{`score: ${band.score}`}</li>
                      <li className="list-group-item">{`name: ${band.name}`}</li>
                      <li className="list-group-item">{`created_at: ${band.created_at}`}</li>
                      <li className="list-group-item">{`updated_at: ${band.updated_at}`}</li>
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchBar;
