const cites = [
  {
    arName: "أسيوط",
    isoName: "Asyūţ",
  },
  {
    arName: "المنيا",
    isoName: "Al Minyā",
  },
  {
    arName: "الجيزه",
    isoName: "Al Jīzah",
  },
  {
    arName: "أسوان",
    isoName: "Aswān",
  },
  {
    arName: "سوهاج",
    isoName: "Sohag",
  },
  {
    arName: "الاسكندريه",
    isoName: "Al Iskandarīyah",
  },
  {
    arName: "القاهرة",
    isoName: "Al Qāhirah",
  },
];

let selectEl = document.querySelector("#sel");

for (let city of cites) {
  let option = `<option value="${city.arName}">${city.arName}</option>`;
  selectEl.insertAdjacentHTML("afterbegin", option);
}

selectEl.addEventListener("change", () => {
  document.querySelector(".city__name").innerHTML = selectEl.value;
  for (let city of cites) {
    if (city.arName === selectEl.value) {
      getTimes(city.isoName);
    }
  }
});

function getTimes(city) {
  let params = {
    city: city,
    country: "EG",
  };

  axios
    .get("http://api.aladhan.com/v1/timingsByCity", {
      params: params,
    })
    .then(function (response) {
      let timings = response.data.data.timings;

      const setTime = (select, time) => {
        document.querySelector(select).innerHTML = time;
      };

      setTime(".fajr", timings.Fajr);
      setTime(".sunrise", timings.Sunrise);
      setTime(".dhuhr", timings.Dhuhr);
      setTime(".asr", timings.Asr);
      setTime(".sunset", timings.Sunset);
      setTime(".isha", timings.Isha);
    })
    .catch(function (error) {
      console.log(error);
    });
}

function getDate() {
  let params = {
    city: "Al Qāhirah",
    country: "EG",
  };

  axios
    .get("http://api.aladhan.com/v1/timingsByCity", {
      params: params,
    })
    .then(function (response) {
      let mDate;
      let enDay = response.data.data.date.gregorian.weekday.en;
      let mDay = response.data.data.date.gregorian.day;
      let enMonth = response.data.data.date.gregorian.month.en;
      let mYear = response.data.data.date.gregorian.year;
      mDate = `${enDay} ${mDay} ${enMonth} ${mYear}`;
      document.querySelector(".m__date").innerHTML = mDate;

      let hDate;
      let arDay = response.data.data.date.hijri.weekday.ar;
      let hDay = response.data.data.date.hijri.day;
      let hMonth = response.data.data.date.hijri.month.ar;
      let hYear = response.data.data.date.hijri.year;
      hDate = `${arDay} ${hDay} ${hMonth} ${hYear}`;
      document.querySelector(".h__date").innerHTML = hDate;
    })
    .catch(function (error) {
      console.log(error);
    });
}

getDate();
getTimes("Asyūţ");
