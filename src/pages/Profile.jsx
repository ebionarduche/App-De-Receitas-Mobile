import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile() {
  const email = JSON.parse(localStorage.getItem('user'));

  const history = useHistory();
  const handleClick = (url) => {
    history.push(url);
  };

  const handleLocalStorage = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div>
      <div>
        <Header title="Profile" btnProfile />
      </div>
      <div>
        {email && (
          <h1
            data-testid="profile-email"
          >
            {email.email}

          </h1>
        )}
      </div>
      <div>
        <button
          data-testid="profile-done-btn"
          onClick={ () => handleClick('/done-recipes') }
        >
          Done Recipes
        </button>
      </div>
      <div>
        <button
          data-testid="profile-favorite-btn"
          onClick={ () => handleClick('/favorite-recipes') }
        >
          Favorite Recipes
        </button>
      </div>
      <div>

        <button
          data-testid="profile-logout-btn"
          onClick={ () => handleLocalStorage() }
        >
          Logout
        </button>
      </div>
      <div>

        <Footer />
      </div>
    </div>
  );
}

export default Profile;
