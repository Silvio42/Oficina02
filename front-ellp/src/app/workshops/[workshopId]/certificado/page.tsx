import { WorkshopUserCertificate } from "@/components/pages/workshops/SpecificWorkshop/certificate";

import "./styles.css";
import { BackButton } from "@/components/core/backButton";

export default async function WokshopCertificatePage({
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
        <BackButton path={`/workshops/${workshopId}`}></BackButton>
      </div>
      <WorkshopUserCertificate
        workshopId={workshopId}
      ></WorkshopUserCertificate>
    </>
  );
}
