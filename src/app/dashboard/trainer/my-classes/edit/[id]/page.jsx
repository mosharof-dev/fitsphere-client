import { getClassesId } from "@/lib/api/classes";
import EditClassForm from "./EditClassForm";

export const metadata = {
  title: "Edit Class",
  description: "Edit your fitness class",
};

export default async function EditClassPage({ params }) {
  const { id } = await params;
  const initialData = await getClassesId(id);

  if (!initialData) {
    return <div className="text-white text-center py-10">Class not found.</div>;
  }

  return (
    <div>
      <EditClassForm initialData={initialData} />
    </div>
  );
}
