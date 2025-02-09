import Link from "next/link";
import { Button } from "primereact/button";
import { InputIcon } from "primereact/inputicon";

import "./styles.css";

interface IBackButton {
  path: string;
}

export const BackButton = ({ path }: IBackButton) => (
  <Link href={path} style={{ width: "fit-content" }}>
    <Button className="back-action">
      <InputIcon className="pi pi-angle-left" style={{ fontSize: "1.25rem" }} />
      VOLTAR
    </Button>
  </Link>
);
