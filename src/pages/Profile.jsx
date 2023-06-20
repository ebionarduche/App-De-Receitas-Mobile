import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../style/Profile.css';
import check from '../images/check.svg';
import logout from '../images/logout.svg';
import yellowHeart from '../images/yellowHeart.png';

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
      <Header title="Profile" btnProfile />
      <section className="profile-container">
        <div>
          {email && (
            <h1 data-testid="profile-email">
              {email.email}

            </h1>
          )}
        </div>
        <button
          data-testid="profile-done-btn"
          onClick={ () => handleClick('/done-recipes') }
        >
          <div>
            <img src={ check } alt="" width="39px" />
            Done Recipes
          </div>
        </button>

        <button
          data-testid="profile-favorite-btn"
          onClick={ () => handleClick('/favorite-recipes') }
        >
          <div>
            <img src={ yellowHeart } alt="" width="42px" />
            Favorite Recipes
          </div>
        </button>

        <button
          data-testid="profile-logout-btn"
          onClick={ () => handleLocalStorage() }
        >
          <div>
            <img src={ logout } alt="" />
            Logout
          </div>
        </button>

      </section>
      <Footer />
    </div>
  );
}

export default Profile;
