import React from "react";
import {
  Avatar,
  Chip,
  Grid,
  ListItemText,
  Switch,
  Typography,
} from "@mui/material";
import ListItem from "@mui/material/ListItem";

type CreativeItemProps = {
  creative: {
    title: string;
    users: string[];
    formats: string[];
    enabled: boolean;
  };
  isLast: boolean;
  isSelected: boolean;
};

const CreativeItem = ({ creative, isLast, isSelected }: CreativeItemProps) => {
  return (
    <ListItem
      secondaryAction={<Switch checked={creative.enabled} />}
      divider={!isLast}
    >
      <ListItemText
        primary={
          <Grid container spacing={1}>
            <Grid item xs={3}>
              <Typography
                variant="h6"
                sx={{
                  ...(isSelected ? { fontWeight: "bold" } : {}),
                }}
              >
                {creative.title}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <div style={{ display: "flex" }}>
                {creative.users.map((user) => (
                  <Avatar key={user} style={{ marginLeft: -16 }}>
                    {user}
                  </Avatar>
                ))}
              </div>
            </Grid>
            <Grid item xs={6}>
              {creative.formats.map((format) => (
                <Chip style={{ marginRight: 8 }} key={format} label={format} />
              ))}
            </Grid>
          </Grid>
        }
      />
    </ListItem>
  );
};

export { CreativeItem };
