import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile() {
  return (
    <div>
      <Header title="Profile" btnProfile />
      <input data-testid="profile-email" />
      <button data-testid="profile-done-btn">
        Done Recipes
      </button>
      <button data-testid="profile-favorite-btn">
        Favorite Recipes
      </button>
      <button data-testid="profile-logout-btn">
        Logout
      </button>
      <Footer />
    </div>
  );
}

export default Profile;
