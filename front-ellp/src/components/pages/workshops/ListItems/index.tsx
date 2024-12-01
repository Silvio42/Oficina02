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
import { useState } from "react";

import { WorkshopEntity } from "@/entities/WorkshopEntity";

import "./styles.css";
import { Button } from "primereact/button";

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

  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const _filters = { ...filters };

    (_filters["global"] as DataTableFilterMetaData)!.value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const renderHeader = () => {
    return (
      <div style={{ width: "40%" }}>
        <IconField iconPosition="left" style={{ width: "100%" }}>
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Pesquisar..."
            data-testid="table-search"
            style={{ width: "100%" }}
          />
          <InputIcon className="pi pi-search" />
        </IconField>
      </div>
    );
  };

  return (
    <DataTable
      value={workshops}
      sortMode="multiple"
      paginator
      rows={10}
      rowsPerPageOptions={[10, 15, 25, 50]}
      dataKey="id"
      data-testid="data-table"
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
      <Column
        field="name"
        data-testid="column-name"
        sortable
        header="Nome"
      ></Column>
      <Column field="description" header="Descrição"></Column>
      <Column field="startAt" sortable header="Começa quando?"></Column>
      <Column field="volunteers.length" sortable header="Voluntários"></Column>
      <Column field="manager.username" header="Coordenador"></Column>
      <Column
        field="manager.username"
        header=""
        body={(e) => {
          return (
            <Button
              style={{ width: "fit-content", background: "red" }}
              onClick={() => deleteWorkshop(e.id)}
            >
              <InputIcon className="pi pi-trash" />
            </Button>
          );
        }}
      ></Column>
    </DataTable>
  );
};
