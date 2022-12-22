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

type CreativeDetailProps = {
  creative: {
    title: string;
    users: string[];
    description: string;
    content: string;
    formats: string[];
    enabled: boolean;
  };
};

const CreativeDetail = ({ creative }: CreativeDetailProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/creative/${creative.title}`);
  };

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
              Créé par Francis Nolastname
            </Typography>
            <Typography paragraph variant="subtitle2">
              Dernière modification le 1 novembre 2021
            </Typography>
          </Paper>

          <Paper elevation={2}>
            <List>
              {creative.users.map((user) => (
                <ListItem key={user}>
                  <ListItemIcon>
                    <Person />
                  </ListItemIcon>
                  <ListItemText primary={user} />
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
