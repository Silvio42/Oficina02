"use client";
import isBetween from "dayjs/plugin/isBetween";
import { useMemo, useState } from "react";
import Link from "next/link";
import dayjs from "dayjs";
dayjs.extend(isBetween);

import { WorkshopEntity } from "@/entities/WorkshopEntity";
import { getByIdWorkshop } from "@/services/WorkshopService";
import {
  createWorkshopAccess,
  getByIdWorkshopAccess,
} from "@/services/WorkshopAccessService";
import { getUserId } from "@/actions/userCookies";
import { WorkshopAccessEntity } from "@/entities/WorkshopAccessEntity";

import "./styles.css";

export const SpecificWorkshop = ({ workshopId }: { workshopId: string }) => {
  const [workshop, setWorkshop] = useState<WorkshopEntity>();
  const [workshopAccess, setWorkshopAccess] = useState<WorkshopAccessEntity>();

  const workshopStatus = useMemo(() => {
    if (!workshop?.startAt) return;

    const workshopDate = new Date(workshop.startAt);
    const agora = new Date().getTime();

    const inicio = new Date(workshopDate.getTime() - 30 * 60 * 1000).getTime();
    const fim = new Date(workshopDate.getTime() + 2 * 60 * 60 * 1000).getTime();

    if (agora >= inicio && agora <= fim)
      return { label: "Ocorrendo", value: "running" };

    if (agora > fim) return { label: "Finalizado", value: "finished" };

    return { label: "Pendente", value: "pending" };
  }, [workshop]);

  const loadWorkshop = async () => {
    const workshopData = await getByIdWorkshop(workshopId);
    setWorkshop(workshopData);
  };

  const loadWorkshopAccess = async () => {
    const userId = getUserId();

    const workshopAccessData = await getByIdWorkshopAccess(workshopId, userId);

    if (workshopStatus?.value === "running")
      await createWorkshopAccess(workshopId, userId);

    setWorkshopAccess(workshopAccessData);
  };

  useMemo(() => {
    loadWorkshop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useMemo(() => {
    loadWorkshopAccess();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workshopStatus]);

  const certificateBlocked = useMemo(() => {
    if (workshopStatus?.value === "finished" && !workshopAccess?.id)
      return "Você não possui presença para gerar um certificado de participação!";

    if (workshopStatus?.value === "pending")
      return "Workshop ainda não iniciado!";

    return;
  }, [workshopAccess, workshopStatus, workshop]);

  return (
    <div className="container-workshop">
      {workshopStatus?.label && (
        <div className={`workshop-status-tag ${workshopStatus?.value}`}>
          {workshopStatus?.label}
        </div>
      )}

      <div className="content-workshop-description">
        <label htmlFor="name">Nome do Workshop</label>
        <p id="name">{workshop?.name}</p>
        <label htmlFor="description">Descrição</label>
        <p id="description">{workshop?.description}</p>
        <label htmlFor="startAt">Data de início (2h de evento)</label>
        <p id="startAt">
          {dayjs(workshop?.startAt).format("DD/MM/YYYY HH:mm")}
        </p>
        <label htmlFor="volunteerSize">Quantidade de voluntários</label>
        <p id="volunteerSize">{workshop?.volunteers?.length || 0}</p>
        <h4>Seus acessos:</h4>
        <div className="content-access">
          <span>
            <label htmlFor="firstAccess">Primeiro acesso</label>
            <p id="firstAccess">
              {dayjs(workshopAccess?.createdAt).format("DD/MM/YYYY HH:mm")}
            </p>
          </span>
          <span>
            <label htmlFor="lastAccess">Último acesso</label>
            <p id="lastAccess">
              {dayjs(workshopAccess?.updatedAt).format("DD/MM/YYYY HH:mm")}
            </p>
          </span>
        </div>
      </div>

      <div className="content-certificate-redirect">
        <Link
          className={`certificate-action-button ${
            certificateBlocked
              ? "certificate-disabled"
              : "certificate-nondisabled"
          }`}
          href={`/workshops/${workshopId}/certificado`}
          passHref
        >
          Acesse seu certificado
        </Link>
        {certificateBlocked}
      </div>
    </div>
  );
};
