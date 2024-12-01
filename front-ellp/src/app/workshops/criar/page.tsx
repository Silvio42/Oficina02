"use client";

import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { InputIcon } from "primereact/inputicon";
import { Calendar } from "primereact/calendar";
import { InputTextarea } from "primereact/inputtextarea";
import { useState } from "react";
import Link from "next/link";

import { WorkshopService } from "@/services/WorkshopService";

import "./styles.css";

export default function WokshopsCreation() {
  const [fields, setFields] = useState({
    name: "",
    description: "",
    startAt: new Date(),
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (e: any) => {
    e.preventDefault();

    new WorkshopService().create(
      fields.name,
      fields.description,
      fields.startAt,
      "67354f6e1d2845faca470fa0"
    );
    window.location.href = "/workshops";
  };

  return (
    <main className="main container-workshop-creation">
      <Link href="/workshops" style={{ width: "fit-content" }}>
        <Button className="back-action">
          <InputIcon
            className="pi pi-angle-left"
            style={{ fontSize: "1.25rem" }}
          />
          VOLTAR
        </Button>
      </Link>

      <form onSubmit={onSubmit}>
        <h3 style={{ textAlign: "center" }}>Criação de Workshop</h3>
        <div className="flex-field-box">
          <label htmlFor="name">Nome</label>
          <InputText
            id="name"
            name="name"
            value={fields.name}
            onChange={(e) => setFields({ ...fields, name: e.target.value })}
          />
        </div>
        <div className="flex-field-box">
          <label htmlFor="description">Descrição</label>
          <InputTextarea
            id="description"
            name="description"
            autoResize
            rows={5}
            cols={30}
            value={fields.description}
            onChange={(e) =>
              setFields({ ...fields, description: e.target.value })
            }
          />
        </div>
        <div className="flex-field-box">
          <label htmlFor="name">Data início</label>
          <Calendar
            id="calendar-24h"
            value={fields.startAt}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onChange={(e: any) => setFields({ ...fields, startAt: e.value })}
            showTime
            hourFormat="24"
            showIcon
          />
        </div>
        <Button label="SALVAR" type="submit"></Button>
      </form>
    </main>
  );
}
