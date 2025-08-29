import '../../styles.scss';

function ProfilePage() {

    return (
        <main>
            <div className="profile-card profile-card--user">
                <div className="user-preview__image"></div>
                <div className="user-preview__content">
                    <div className="user-preview__title">
                        <h1>Username</h1>
                    </div>
                    <div className="user-preview__other-info">
                        <h5>other information</h5>
                    </div>
                </div>
            </div>

            <div className="profile-card profile-card--settings">
                <div className="user-preview__title">
                    <h1>Settings</h1>
                </div>
            </div>

            <div className="profile-card profile-card--stats">
                <div className="user-preview__title">
                    <h1>Statistics</h1>
                </div>
            </div>
        </main>

    )

}

export default ProfilePage