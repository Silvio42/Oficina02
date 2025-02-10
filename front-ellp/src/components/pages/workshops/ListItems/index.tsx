import { useState } from "react";
import {
  DataTable,
  DataTableFilterMeta,
  DataTableFilterMetaData,
} from "primereact/datatable";
import { Column } from "primereact/column";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode } from "primereact/api";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { WorkshopEntity } from "@/entities/WorkshopEntity";
import { createVolunteers } from "@/services/volunteersService";

import "./styles.css";

export const ListItems = ({
  workshops,
  isLoading,
  deleteWorkshop,
}: {
  isLoading: boolean;
  workshops: Array<WorkshopEntity>;
  deleteWorkshop: (id: string) => Promise<void>;
}) => {
  const [globalFilterValue, setGlobalFilterValue] = useState<string>("");
  const [filters, setFilters] = useState<DataTableFilterMeta>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [newVolunteer, setNewVolunteer] = useState<{
    name: string;
    email: string;
    workshop: string;
  }>({ name: "", email: "", workshop: "" });

  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const _filters = { ...filters };
    (_filters["global"] as DataTableFilterMetaData).value = value;
    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const openDialog = (workshopId: string) => {
    setNewVolunteer({ name: "", email: "", workshop: workshopId });
    setIsDialogVisible(true);
  };
  const closeDialog = () => {
    setNewVolunteer({ name: "", email: "", workshop: "" });
    setIsDialogVisible(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewVolunteer((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveVolunteer = async () => {
    const { name, email, workshop } = newVolunteer;

    try {
      await createVolunteers(name, email, workshop);
      closeDialog();
    } catch (error) {
      console.log(error);
    }
  };

  const renderHeader = () => (
    <div style={{ width: "40%" }}>
      <IconField iconPosition="left" style={{ width: "100%" }}>
        <InputText
          value={globalFilterValue}
          onChange={onGlobalFilterChange}
          placeholder="Pesquisar..."
          style={{ width: "100%" }}
        />
        <InputIcon className="pi pi-search" />
      </IconField>
    </div>
  );

  return (
    <>
      <DataTable
        value={workshops}
        sortMode="multiple"
        paginator
        rows={10}
        rowsPerPageOptions={[10, 15, 25, 50]}
        dataKey="id"
        filters={filters}
        header={renderHeader}
        filterDisplay="row"
        loading={isLoading}
        globalFilterFields={[
          "id",
          "name",
          "description",
          "startAt",
          "volunteers.length",
          "manager.email",
        ]}
        emptyMessage="Nenhum workshop encontrado."
        tableStyle={{ minWidth: "100%", width: "100%" }}
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
      >
        <Column field="id" header="ID"></Column>
        <Column field="name" sortable header="Nome"></Column>
        <Column field="description" header="Descrição"></Column>
        <Column field="startAt" sortable header="Começa quando?"></Column>
        <Column
          field="volunteers.length"
          sortable
          header="Voluntários"
        ></Column>
        <Column field="manager.username" header="Coordenador"></Column>

        <Column
          field="id"
          header=""
          body={() => (
            <Button style={{ width: "fit-content" }}>
              <InputIcon className="pi pi-eye" />
            </Button>
          )}
        ></Column>

        <Column
          field="id"
          header=""
          body={(e) => (
            <Button
              style={{ background: "blue" }}
              onClick={() => openDialog(e.id)}
            >
              <InputIcon className="pi pi-user-plus" />
            </Button>
          )}
        ></Column>

        <Column
          field="manager.username"
          header=""
          body={(e) => (
            <Button
              style={{ background: "red" }}
              onClick={() => deleteWorkshop(e.id)}
            >
              <InputIcon className="pi pi-trash" />
            </Button>
          )}
        ></Column>
      </DataTable>

      <Dialog
        header="Adicionar Voluntário"
        visible={isDialogVisible}
        onHide={closeDialog}
        style={{ width: "30vw" }}
      >
        <div>
          <label>Nome:</label>
          <InputText
            name="name"
            value={newVolunteer.name}
            onChange={handleInputChange}
            style={{ width: "100%" }}
          />
        </div>
        <div style={{ marginTop: "10px" }}>
          <label>Email:</label>
          <InputText
            name="email"
            value={newVolunteer.email}
            onChange={handleInputChange}
            style={{ width: "100%" }}
          />
        </div>
        <div style={{ marginTop: "15px", textAlign: "right" }}>
          <Button
            label="Cancelar"
            className="p-button-text"
            onClick={closeDialog}
          />
          <Button label="Salvar" onClick={handleSaveVolunteer} autoFocus />
        </div>
      </Dialog>
    </>
  );
};
