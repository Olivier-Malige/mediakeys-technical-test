import React from "react";

import List from "@mui/material/List";
import Paper from "@mui/material/Paper";

import { CreativeItem } from "./CreativeItem/CreativeItem";
import { Creative } from "../../Types/creative";
import { Box } from "@mui/material";

type CreativesListProps = {
  creatives: Creative[] | undefined;
  setSelectedCreative: (creative: Creative) => void;
  selectedCreativeId: string | undefined;
};

const CreativesList = ({
  creatives,
  selectedCreativeId,
  setSelectedCreative,
}: CreativesListProps) => {
  return (
    <Paper style={{ padding: 16 }} elevation={8}>
      <List>
        {creatives &&
          creatives.map((creative, index) => (
            <Box
              sx={{ cursor: "pointer" }}
              key={creative.id}
              onClick={() => setSelectedCreative(creative)}
            >
              <CreativeItem
                creative={creative}
                isSelected={creative.id === selectedCreativeId}
                isLast={index === creatives.length - 1}
              />
            </Box>
          ))}
      </List>
    </Paper>
  );
};

export { CreativesList };
