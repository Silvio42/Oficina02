import Link from "next/link";
import "./styles.css";
import { SpecificWorkshop } from "../../../components/pages/workshops/SpecificWorkshop";
import { BackButton } from "../../../components/core/backButton";

export default async function WokshopPage({
  params,
}: {
  params: Promise<{ workshopId: string }>;
}) {
  const workshopId = (await params).workshopId;

  return (
    <>
      <div
        style={{ marginLeft: "15%", marginTop: "2rem", width: "fit-content" }}
      >
        <BackButton path="/workshops" />
      </div>
      <SpecificWorkshop workshopId={workshopId} />
    </>
  );
}
