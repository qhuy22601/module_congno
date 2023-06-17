import Button from "~/components/Button";
import classNames from "classnames/bind";
import styles from "./Menu.module.scss";

const cx = classNames.bind(styles);
function MenuItem({ data, onClick }) {
  const classes = cx("menu-item", { separate: data.separate });
  return (
    <Button style={{ backgroundColor: "green", color: "white" }} 
      className={classes}
      leftIcon={data.icon}
      to={data.to}
      onClick={onClick}
    >
      {data.title}
    </Button>
  );
}

export default MenuItem;
