import React from "react";
import { CreativeForm } from "../components/CreativeForm/CreativeForm";
import { MainLayout } from "../layouts/MainLayout";

const CreativeEditionPage = () => {
  return (
    <MainLayout>
      <CreativeForm
        creative={{
          title: "Creative title",
          description: "Creative description",
          content: "Creative content",
          formats: ["format1", "format2"],
          enabled: true,
        }}
        onCancel={() => console.log("cancel")}
        onDelete={() => console.log("delete")}
        onSave={() => console.log("save")}
      />
    </MainLayout>
  );
};

export { CreativeEditionPage };
