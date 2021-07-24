import React from 'react';
import arrow from '../../assets/img/arrow.png';

export default function Main() {
  let [dataCars, setDataCars] = React.useState([]);
  let [dataTariffs, setDataTariffs] = React.useState([]);
  React.useEffect(() => {
    fetch('https://city-mobil.ru/api/cars')
      .then((response) => response.json())
      .then((json) => {
        setDataCars(json.cars);
        setDataTariffs(['Марка и модель', ...json.tariffs_list]);
      });
  }, []);

  let [sortValue, setSortValue] = React.useState('');
  let inputRef = React.useRef('');
  let getSortValue = () => {
    setSortValue(inputRef.current.value.trim());
  };

  let [alphabetSort, setAlphabetSort] = React.useState(true);
  let changeAlphabetSort = () => {
    setAlphabetSort(prev => !prev)
  }

  let [choice, setChoice] = React.useState({});
  let getChoice = (mark, model, year) => {
    setChoice({name: mark + ' ' + model, year})
  }

  return (
    <main>
      <div className="search">
        <input ref={inputRef} type="text" placeholder="поиск по модели или марке" />
        <button onClick={getSortValue}>Найти</button>
      </div>
      <div className="table">
        <div className="tariffs">
          {dataTariffs &&
            dataTariffs.map((tariff, ind) => (
              <div className={ind ? 'tariff' : 'mark_model'} onClick={changeAlphabetSort}>
                {!ind && <img className={alphabetSort && 'reverse'} alt='arrow' src={arrow} />}
                {tariff}
              </div>
            ))}
        </div>
        {dataCars &&
          dataCars
            .filter((car) => {
              if (sortValue) {
                return car.mark === sortValue || car.model === sortValue;
              }
              return car;
            })
          .sort((a, b) => {
            if (alphabetSort) {
              return a.mark.codePointAt() - b.mark.codePointAt()
            }
            return b.mark.codePointAt() - a.mark.codePointAt()
          })
            .map((car) => (
              <div className="cars">
                <div>{car.mark + ' ' + car.model}</div>
                <div onClick={() => car.tariffs.Стандарт ? getChoice(car.mark, car.model, car.tariffs.Стандарт.year) : getChoice()}>
                  {car.tariffs.Стандарт ? car.tariffs.Стандарт.year : '-'}
                </div>
                <div onClick={() => car.tariffs.Комфорт ? getChoice(car.mark, car.model, car.tariffs.Комфорт.year) : getChoice()}>
                  {car.tariffs.Комфорт ? car.tariffs.Комфорт.year : '-'}
                </div>
                <div onClick={() => car.tariffs.Бизнес ? getChoice(car.mark, car.model, car.tariffs.Бизнес.year) : getChoice()}>
                  {car.tariffs.Бизнес ? car.tariffs.Бизнес.year : '-'}
                </div>
                <div onClick={() => car.tariffs['Комфорт+'] ? getChoice(car.mark, car.model, car.tariffs['Комфорт+'].year) : getChoice()}>
                  {car.tariffs['Комфорт+'] ? car.tariffs['Комфорт+'].year : '-'}
                </div>
                <div onClick={() => car.tariffs.Эконом ? getChoice(car.mark, car.model, car.tariffs.Эконом.year) : getChoice()}>
                  {car.tariffs.Эконом ? car.tariffs.Эконом.year : '-'}
                </div>
                <div onClick={() => car.tariffs.Минивен ? getChoice(car.mark, car.model, car.tariffs.Минивен.year) : getChoice()}>
                  {car.tariffs.Минивен ? car.tariffs.Минивен.year : '-'}
                </div>
                <div onClick={() => car.tariffs.Лайт ? getChoice(car.mark, car.model, car.tariffs.Лайт.year) : getChoice()}>
                  {car.tariffs.Лайт ? car.tariffs.Лайт.year : '-'}
                </div>
              </div>
            ))}
      </div>
      {choice.name && choice.year &&
        <div className='choice'>
          {`Выбран автомобиль ${choice.name} ${choice.year} года выпуска`}
        </div>
      }
    </main>
  );
}
