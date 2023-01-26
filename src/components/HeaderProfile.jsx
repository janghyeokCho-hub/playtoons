import { faGlobe, faXmarkLarge } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';

export default function HeaderProfile(props) {
  const { userInfo, homeURL, onClickShowProfile, onClickDashboard, onClickLogout, onClickLanguage } = props;
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="box_drop">
      <div className="top">
        <button
          type="button"
          className="btn_box_close"
          onClick={() => onClickShowProfile?.(false)}
        >
          <FontAwesomeIcon icon={faXmarkLarge} />{" "}
          {/* {t(`header.profile`)} */}
        </button>
      </div>
      <div className="bt">
        <p className="t2">
          {userInfo?.name || userInfo?.email}
        </p>
        <p className="t1">{t(`header.vaildatePoint`)}</p>
        <p className="c1">
          <span className="c-blue">100,324,394</span>
          <a href="#" className="btn-pk s blue bdrs">
            {t(`header.charge`)}
          </a>
        </p>
      </div>
      <ul>
        <li onClick={() => onClickShowProfile?.(false)}>
          <Link to="/author/register">
            {t(`header.registerCreator`)}
          </Link>
        </li>
        <li onClick={() => onClickShowProfile?.(false)}>
          <a className="pointer" onClick={onClickDashboard}>
            {t(`header.dashboard`)}
          </a>
        </li>
      </ul>
      <ul>
        <li>
          <a href="#">{t(`header.supporingCreator`)}</a>
        </li>
        <li>
          <a href="#">{t(`header.followingCreator`)}</a>
        </li>
      </ul>
      <ul>
        <li onClick={() => navigate("/mypage/purchase")}>
          {/* 구매 목록 */}
          <Link to="">{t(`header.purchaseList`)}</Link>
        </li>
        <li onClick={() => navigate("/mypage/review")}>
          {/* 리뷰 목록 */}
          <Link to="">{t(`header.reviewList`)}</Link>
        </li>
        <li onClick={() => navigate("/mypage/inquiry")}>
          {/* 문의 목록 */}
          <Link to="">{t(`header.contactList`)}</Link>
        </li>
      </ul>
      <ul>
        <li>
          <a href="#">{t(`header.setting`)}</a>
        </li>
        <li onClick={() => onClickLogout?.()}>
          <Link to={homeURL}>{t(`header.logout`)}</Link>
        </li>
      </ul>
      <div>
        <button
          type="button"
          className="btn-pk n gray bdrs"
          onClick={() => onClickLanguage?.(true)}
        >
          <FontAwesomeIcon icon={faGlobe} />
          {` ${t(`header.${i18n.language}`)}`}
        </button>
      </div>
    </div>
  )
}
