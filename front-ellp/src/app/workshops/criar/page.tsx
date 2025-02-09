"use client";

import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { InputTextarea } from "primereact/inputtextarea";
import { createWorkshop } from "../../../services/WorkshopService";
import { createStudent, deleteStudent } from "../../../services/StudentService";
import { StudentEntity } from "../../../entities/StudentEntity";

import "./styles.css";
import { BackButton } from "../../../components/core/backButton";

export default function WokshopsCreation() {
  const [fields, setFields] = useState<{
    name: string;
    description: string;
    startAt: Date;
    students: StudentEntity[];
  }>({
    name: "",
    description: "",
    startAt: new Date(),
    students: [],
  });

  const [newStudent, setNewStudent] = useState("");

  const handleAddStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudent.trim()) return;

    try {
      const response = await createStudent(newStudent);
      const newStudentData: StudentEntity = {
        id: response.data._doc._id,
        name: response.data._doc.name,
      };

      setFields((prev) => ({
        ...prev,
        students: [...(prev.students || []), newStudentData],
      }));

      setNewStudent("");
    } catch (error) {
      console.error("Erro ao adicionar aluno:", error);
    }
  };

  const handleRemoveStudent = async (studentId: string) => {
    try {
      await deleteStudent(studentId);
      setFields((prev) => ({
        ...prev,
        students: prev.students.filter((s) => s.id !== studentId),
      }));
    } catch (error) {
      console.error("Erro ao remover aluno:", error);
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await createWorkshop(
        fields.name,
        fields.description,
        fields.startAt,
        "67354f6e1d2845faca470fa0",
        fields.students
          .map((student) => student.id)
          .filter((id): id is string => Boolean(id))
      );

      if (response.status === 201) {
        window.location.href = "/workshops";
      }
    } catch (error) {}
  };

  return (
    <main className="main container-workshop-creation">
      <BackButton path="/workshops"></BackButton>

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
          <label htmlFor="startAt" aria-label="startAt">
            Data início
          </label>
          <Calendar
            id="startAt"
            inputId="startAt"
            value={fields.startAt}
            onChange={(e: any) => setFields({ ...fields, startAt: e.value })}
            showTime
            hourFormat="24"
            showIcon
            dateFormat="dd/mm/yy"
          />
        </div>

        {fields.students.length > 0 && (
          <div className="flex-field-box">
            <label>Alunos</label>
            <ul>
              {fields.students.map((student, index) => (
                <li
                  key={student.id || `student-${index}`}
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <p>{student.name}</p>
                  <Button
                    label="Remover"
                    icon="pi pi-trash"
                    className="p-button-danger p-button-text remove-button"
                    type="button"
                    onClick={() => {
                      if (!student.id) return;
                      handleRemoveStudent(student.id);
                    }}
                  />
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex-field-box">
          <InputText
            id="newStudent"
            value={newStudent}
            onChange={(e) => setNewStudent(e.target.value)}
            placeholder="Nome do aluno"
          />
          <Button label="Adicionar Aluno" onClick={handleAddStudent} />
        </div>

        <Button label="SALVAR" type="submit" />
      </form>
    </main>
  );
}
