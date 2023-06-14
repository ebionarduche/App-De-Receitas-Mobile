import 'bootstrap/dist/css/bootstrap.css';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';

function CarouselCard() {
  const { id } = useParams();
  const history = useHistory();
  const url = history.location.pathname;
  const [array, setArray] = useState([]);
  const max = 6;

  useEffect(() => {
    let REC = '';

    if (url.includes(`/meals/${id}`)) {
      REC = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    } else if (url.includes(`/drinks/${id}`)) {
      REC = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    }

    fetch(REC)
      .then((response) => response.json())
      .then((data) => {
        if (url.includes('/meals')) {
          setArray(data.drinks);
        } else {
          setArray(data.meals);
        }
      });
  }, [id, url]);

  return (
    <Carousel>
      {
        array.slice(0, max).map((item, index) => (
          <Carousel.Item
            data-testid={ `${index}-recommendation-card` }
            className="card"
            key={ index }
          >
            <button
              className="custom-button"
              onClick={ () => handleClick(id) }
            >
              <h6
                data-testid={ `${index}-recommendation-title` }
              >
                {item.strDrink || item.strMeal}
              </h6>
              <img
                className="d-block w-100"
                src={ item.strDrinkThumb || item.strMealThumb }
                alt={ item.strDrink || item.strMeal }
                width="100px"
              />
            </button>
          </Carousel.Item>
        ))

      }
    </Carousel>
  );
}

export default CarouselCard;
