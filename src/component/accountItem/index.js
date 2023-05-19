import classNames from "classnames/bind";
import styles from "./AccountItem.module.scss";
import { Link } from "react-router-dom";

function AccountItem({ data }) {
  const cx = classNames.bind(styles);
  console.log(data);
  return (
    <div to={`fruit-detail/${data.id}`} className={cx("info-wrapper")}>
      <img className={cx("info-avatar")} src={`${data.logo}`} alt="logo" />
      <div className={cx("info-user")}>
        <h4 className={cx("mst")}>
          <span>{`${data.mst}`}</span><br/>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span className={cx("name")}>{`${data.name}`}</span>
        </h4>
      </div>
    </div>
  );
}

export default AccountItem;