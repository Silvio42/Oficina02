"use client";
import { WorkshopAccessEntity } from "@/entities/WorkshopAccessEntity";

import "./styles.css";
import { useMemo, useState } from "react";
import { getByIdWorkshopAccess } from "@/services/WorkshopAccessService";
import { getUserId } from "@/actions/userCookies";
import dayjs from "dayjs";
import { InputIcon } from "primereact/inputicon";
import {
  USER_DESCRIPTION_CERTIFICATE_ROLE,
  USER_ROLE,
} from "@/utils/constants";
import html2canvas from "html2canvas";

interface IWorkshopUserCertificate {
  workshopId: string;
}

export const WorkshopUserCertificate = ({
  workshopId,
}: IWorkshopUserCertificate) => {
  const userId = getUserId();

  const [workshopAccess, setWorkshopAccess] = useState<WorkshopAccessEntity>();
  const [userName, setUserName] = useState<string>();

  const loadWorkshopAccess = async () => {
    const workshopAccessData = await getByIdWorkshopAccess(workshopId, userId);

    setWorkshopAccess(workshopAccessData);
  };

  const loadUserName = async () => {
    const first = workshopAccess?.user?.email?.split("@");
    if (!first) return;

    let userName = "";

    const firstTry = first[0].split(".").join(" ");
    const secondTry = first[0].split("_").join(" ");

    if (firstTry.includes(" ")) userName = firstTry;
    else if (secondTry.includes(" ")) userName = secondTry;

    setUserName(userName);
  };

  useMemo(() => {
    loadWorkshopAccess();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useMemo(() => {
    if (!userName) loadUserName();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workshopAccess]);

  const userRoleLabel = USER_ROLE[workshopAccess?.role || "student"];

  const downloadButton = () => {
    const element = document.getElementById("certificate");
    if (!element) return;

    html2canvas(element, { useCORS: true, scale: 2 }).then((canvas) => {
      const link = document.createElement("a");
      const workshopNameLabel = workshopAccess?.workshop?.name?.replaceAll(
        " ",
        "_"
      );
      link.download = `certificado-${workshopNameLabel}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    });
  };

  return (
    <div
      id="certificate"
      className="container-certificate"
      onClick={() => downloadButton()}
    >
      <div className="certificate-status-tag">
        <InputIcon
          className="pi pi-verified"
          style={{ fontSize: "7rem", color: "white" }}
        />
      </div>

      <div className="certificate-user-tag">
        <p>{userRoleLabel}</p>
      </div>

      <h2>Certificação de Workshop</h2>

      <h4>
        Certificado de confirmação de participação do workshop{" "}
        {workshopAccess?.workshop?.name}
      </h4>
      <div className="content-certificate-description">
        <p>
          A organização confirma a presença de {userName} (
          {workshopAccess?.user.email}) no Workshop{" "}
          {workshopAccess?.workshop?.name} ocorrido em{" "}
          {dayjs(workshopAccess?.workshop?.startAt)
            .locale("pt")
            .format("DD/MM/YYYY HH:mm")}
        </p>
        <p>
          Participando como {userRoleLabel},{" "}
          {USER_DESCRIPTION_CERTIFICATE_ROLE[workshopAccess?.role || "student"]}
        </p>
      </div>

      <h2>Workshop | {workshopAccess?.workshop?.name}</h2>

      <p className="footer-text">
        Certificado de acesso e utilização vitalícia
      </p>
    </div>
  );
};
