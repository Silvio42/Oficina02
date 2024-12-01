"use client";
import dayjs from "dayjs";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Button } from "primereact/button";
import { InputIcon } from "primereact/inputicon";

import { WorkshopEntity } from "@/entities/WorkshopEntity";
import { WorkshopService } from "@/services/WorkshopService";
import { ListItems } from "@/components/pages/workshops/ListItems";

import "./styles.css";

export default function Wokshops() {
  const [workshops, setWorkshops] = useState<Array<WorkshopEntity>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loadWorkshops = async () => {
    if (workshops?.length) return;

    try {
      setIsLoading(true);

      const data = await new WorkshopService().getAll();
      setWorkshops(data || []);
    } finally {
      setIsLoading(false);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useMemo(() => loadWorkshops(), [workshops]);

  const deleteWorkshop = async (id: string) => {
    await new WorkshopService().delete(id);
    setWorkshops([]);
    await loadWorkshops();
  };

  return (
    <main className="main container">
      <Link href="/workshops/criar">
        <Button className="create-action">
          CRIAR NOVO WORKSHOP
          <InputIcon className="pi pi-plus" style={{ fontSize: "1.25rem" }} />
        </Button>
      </Link>

      <ListItems
        workshops={workshops.map((workshop) => ({
          ...workshop,
          startAt: dayjs(workshop.startAt).format("DD MMMM YYYY"),
        }))}
        isLoading={isLoading}
        deleteWorkshop={deleteWorkshop}
      ></ListItems>
    </main>
  );
}
