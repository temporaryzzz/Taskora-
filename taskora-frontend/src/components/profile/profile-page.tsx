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
        <div className="profile-card__section">
          <div className="profile-card__paragraph">
            Электронная почта
            <div className="dropdown-menu dropdown-menu--setting">
              <button className="dropdown-menu__select-btn">
                <img
                  src="/email-icon.svg"
                  width={'18px'}
                  height={'18px'}
                  style={{ marginRight: '10px', marginTop: '2px' }}
                ></img>
                Изменить почту
              </button>
              <div
                className="dropdown-menu__content"
                style={{ display: 'none' }}
              ></div>
            </div>
          </div>

          <div className="profile-card__paragraph">
            Пароль
            <div className="dropdown-menu dropdown-menu--setting">
              <button className="dropdown-menu__select-btn">
                <img
                  src="/key-icon.svg"
                  width={'18px'}
                  height={'18px'}
                  style={{ marginRight: '10px', marginTop: '2px' }}
                ></img>
                Изменить пароль
              </button>
              <div
                className="dropdown-menu__content"
                style={{ display: 'none' }}
              ></div>
            </div>
          </div>

          <div className="profile-card__paragraph">
            Двухфакторная аутентификация
            <div className="dropdown-menu dropdown-menu--setting">
              <button className="dropdown-menu__select-btn">
                <img
                  src="/watch-icon.svg"
                  width={'18px'}
                  height={'18px'}
                  style={{ marginRight: '10px', marginTop: '2px' }}
                ></img>
                Настройка
              </button>
              <div
                className="dropdown-menu__content"
                style={{ display: 'none' }}
              ></div>
            </div>
          </div>
        </div>

        <div className="profile-card__sub-title">
          <h2>Appearance</h2>
        </div>
        <div className="profile-card__section">
          <div className="profile-card__paragraph">
            Тема
            <div className="dropdown-menu dropdown-menu--setting dropdown-menu--with-after">
              <button className="dropdown-menu__select-btn">
                <img
                  src="/gray-priority-icon.svg"
                  width={'18px'}
                  height={'18px'}
                  style={{ marginRight: '10px', marginTop: '2px' }}
                ></img>
                Темная
              </button>
              <div
                className="dropdown-menu__content"
                style={{ display: 'none' }}
              ></div>
            </div>
          </div>
          <div className="profile-card__paragraph">
            Цвет акцентов
            <div className="dropdown-menu dropdown-menu--setting dropdown-menu--with-after">
              <button className="dropdown-menu__select-btn">
                <img
                  src="/blue-priority-icon.svg"
                  width={'18px'}
                  height={'18px'}
                  style={{ marginRight: '10px', marginTop: '2px' }}
                ></img>
                Выбрать
              </button>
              <div
                className="dropdown-menu__content"
                style={{ display: 'none' }}
              ></div>
            </div>
          </div>
          <div className="profile-card__paragraph">
            Размер шрифта
            <div className="dropdown-menu dropdown-menu--setting dropdown-menu--with-after">
              <button className="dropdown-menu__select-btn">
                <img
                  src="/watch-icon.svg"
                  width={'18px'}
                  height={'18px'}
                  style={{ marginRight: '10px', marginTop: '2px' }}
                ></img>
                Стандартный
              </button>
              <div
                className="dropdown-menu__content"
                style={{ display: 'none' }}
              ></div>
            </div>
          </div>
          <div className="profile-card__paragraph">
            Стиль незавершенной задачи
            <div className="dropdown-menu dropdown-menu--setting dropdown-menu--with-after">
              <button className="dropdown-menu__select-btn">
                <img
                  src="/gray-priority-icon.svg"
                  width={'18px'}
                  height={'18px'}
                  style={{ marginRight: '10px', marginTop: '2px' }}
                ></img>
                Стандартный
              </button>
              <div
                className="dropdown-menu__content"
                style={{ display: 'none' }}
              ></div>
            </div>
          </div>
        </div>
        <div className="profile-card__sub-title">
          <h2>Notifications</h2>
        </div>
        <div className="profile-card__section">
          <div className="profile-card__paragraph">
            Разрешить уведомления
            <label className="checkbox-switch">
              <input type="checkbox"></input>
              <span className="checkbox-switch__wrapper"></span>
            </label>
          </div>
          <div className="profile-card__paragraph">
            Уведомления по электронной почте
            <label className="checkbox-switch">
              <input type="checkbox"></input>
              <span className="checkbox-switch__wrapper"></span>
            </label>
          </div>
          <div className="profile-card__paragraph">
            Уведомления через Telegram
            <label className="checkbox-switch">
              <input type="checkbox"></input>
              <span className="checkbox-switch__wrapper"></span>
            </label>
          </div>
        </div>
        <div className="profile-card__sub-title">
          <h2>More</h2>
        </div>
        <div className="profile-card__section">
          <div className="profile-card__paragraph">
            Приоритет по умолчанию
            <div className="dropdown-menu dropdown-menu--setting dropdown-menu--with-after">
              <button className="dropdown-menu__select-btn">
                <img
                  src="/gray-priority-icon.svg"
                  width={'18px'}
                  height={'18px'}
                  style={{ marginRight: '10px', marginTop: '2px' }}
                ></img>
                Стандартный
              </button>
              <div
                className="dropdown-menu__content"
                style={{ display: 'none' }}
              ></div>
            </div>
          </div>
          <div className="profile-card__paragraph">
            Дата по умолчанию
            <div className="dropdown-menu dropdown-menu--setting dropdown-menu--with-after">
              <button className="dropdown-menu__select-btn">
                <img
                  src="/watch-icon.svg"
                  width={'18px'}
                  height={'18px'}
                  style={{ marginRight: '10px', marginTop: '2px' }}
                ></img>
                Нет
              </button>
              <div
                className="dropdown-menu__content"
                style={{ display: 'none' }}
              ></div>
            </div>
          </div>
          <div className="profile-card__paragraph">
            Напоминания по умолчанию
            <div className="dropdown-menu dropdown-menu--setting dropdown-menu--with-after">
              <button className="dropdown-menu__select-btn">
                <img
                  src="/reminder-icon.svg"
                  width={'18px'}
                  height={'18px'}
                  style={{ marginRight: '10px', marginTop: '2px' }}
                ></img>
                Нет
              </button>
              <div
                className="dropdown-menu__content"
                style={{ display: 'none' }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="profile-card profile-card--stats">
        <div className="profile-card__title">
          <h2>Statistics</h2>
        </div>
      </div>
    </main>
  );
}

export default ProfilePage;
