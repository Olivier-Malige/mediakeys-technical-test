import React from "react";

import List from "@mui/material/List";
import Paper from "@mui/material/Paper";

import { CreativeItem } from "./CreativeItem/CreativeItem";

type CreativesListProps = {
  creatives: {
    title: string;
    users: string[];
    formats: string[];
    enabled: boolean;
  }[];
};

const CreativesList = ({ creatives }: CreativesListProps) => {
  return (
    <Paper style={{ padding: 16 }} elevation={8}>
      <List>
        {creatives.map((creative, index) => (
          <CreativeItem
            key={creative.title}
            creative={creative}
            isSelected={false}
            isLast={index === creatives.length - 1}
          />
        ))}
      </List>
    </Paper>
  );
};

export { CreativesList };
