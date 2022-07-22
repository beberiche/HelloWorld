import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import classes from "./MenuBtn.module.css";
const MenuBtn = (props) => {
  const router = useRouter();

  console.log(router.pathname === props.link);

  return (
    <Link href={props.link}>
      <h4 className={router.pathname === props.link ? classes.logo_active : ""}>
        {props.text}
      </h4>
    </Link>
  );
};

export default MenuBtn;
