import DetailsClient from "./DetailsClient";

export default function DetailsPage({ params }) {
  // مرر params كـ props للـ Client Component
  return <DetailsClient type={params.type} id={params.id} />;
}
