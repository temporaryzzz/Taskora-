import '../../styles.scss';

function ProfilePage() {

    return (
        <main>
            <div className="profile-card profile-card--user">
                <div className="user-preview__image"></div>
                <div className="user-preview__content">
                    <div className="profile-card__title">
                        <h2>Username</h2>
                    </div>
                    <div className="user-preview__other-info">
                        <h5>other information</h5>
                    </div>
                </div>
            </div>

            <div className="profile-card profile-card--settings">
                <div className="profile-card__title">
                    <h2>Settings</h2>
                </div>
                <div className="profile-card__sub-title">
                    <h2>Account</h2>
                </div>
                <div className='profile-card__paragraph'>
                    <img src='email-icon.svg' width={'25px'} height={'25px'} style={{marginRight: '10px'}} alt='e-mail icon'>
                    </img>
                    Электронная почта
                </div>
                <div className='profile-card__paragraph'>
                    <img src='key-icon.svg' width={'25px'} height={'25px'} style={{marginRight: '10px'}} alt='password icon'>
                    </img>
                    Пароль
                </div>
                <div className='profile-card__paragraph'>
                    <img src='lock-icon.svg' width={'25px'} height={'25px'} style={{marginRight: '10px'}} alt='lock icon'>
                    </img>
                    Двухфакторная аутентификация
                </div>
                <div className='profile-card__paragraph'></div>
                <div className='profile-card__paragraph'></div>
                <div className="profile-card__sub-title">
                    <h2>Appearance</h2>
                </div>
                <div className='profile-card__paragraph'></div>
                <div className='profile-card__paragraph'></div>
                <div className='profile-card__paragraph'></div>
                <div className='profile-card__paragraph'></div>
                <div className='profile-card__paragraph'></div>
            </div>

            <div className="profile-card profile-card--stats">
                <div className="profile-card__title">
                    <h2>Statistics</h2>
                </div>
            </div>
        </main>

    )

}

export default ProfilePage