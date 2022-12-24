import React from "react";

import { Person } from "@mui/icons-material";
import {
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";

import { useNavigate } from "react-router";
import { RouterPaths } from "../../router/router";
import { Creative } from "../../Types/creative";

type CreativeDetailProps = {
  creative: Creative;
};

const CreativeDetail = ({ creative }: CreativeDetailProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`${RouterPaths.CREATIVE}/${creative.title}`);
  };

  const lastModifiedLocalDate = new Date(
    creative.lastModified
  ).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Paper
      style={{ padding: 16, cursor: "pointer" }}
      elevation={8}
      onClick={handleClick}
    >
      <Grid container spacing={3}>
        <Grid item xs={8}>
          <Typography variant="h6" paragraph>
            {creative.title}
          </Typography>
          <Typography paragraph>{creative.description}</Typography>
          <Typography paragraph>{creative.content}</Typography>
        </Grid>
        <Grid item xs={4}>
          <Paper elevation={0} style={{ padding: 16 }}>
            <Typography paragraph variant="subtitle2">
              {`Crée par ${creative.createdBy.firstName} ${creative.createdBy.lastName}`}
            </Typography>
            <Typography paragraph variant="subtitle2">
              {`Dernière modification le ${lastModifiedLocalDate}`}
            </Typography>
          </Paper>

          <Paper elevation={2}>
            <List>
              {creative.contributors.map((user) => (
                <ListItem key={user.id}>
                  <ListItemIcon>
                    <Person />
                  </ListItemIcon>
                  <ListItemText
                    primary={`${user.firstName} ${user.lastName}`}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Paper>
  );
};

export { CreativeDetail };
