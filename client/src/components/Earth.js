import { useEffect, useState } from "react";

const nasaKey = process.env.REACT_APP_NASA;

export default function Space() {
  const [pic, setPic] = useState(null);

  useEffect(() => {
    let url = `https://api.nasa.gov/EPIC/api/natural/images?api_key=${nasaKey}`;
    fetch(url)
      .then((res) => res.json())
      .then((d) => {
        let n = Math.floor(Math.random() * d.length);
        let item = d[n];
        let img = item.image;
        let date = item.date;
        date = date.split(" ")[0].split("-");
        let year = date[0];
        let month = date[1];
        let day = date[2];
        url = `https://api.nasa.gov/EPIC/archive/natural/${year}/${month}/${day}/png/${img}.png?api_key=${nasaKey}`;
        console.log(url);
        fetch(url)
          .then((res) => res.json())
          .then((d) => setPic(d))
          .catch((err) => console.error(err));
      });
  }, []);

  return <div></div>;
}
