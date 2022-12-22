import React from "react";

import { Add } from "@mui/icons-material";
import {
  Button,
  Chip,
  Grid,
  IconButton,
  Paper,
  Switch,
  TextField,
} from "@mui/material";

type CreativeFormProps = {
  creative: {
    title: string;
    description: string;
    content: string;
    formats: string[];
    enabled: boolean;
  };
  onSave: () => void;
  onCancel: () => void;
  onDelete: () => void;
};

const CreativeForm = ({
  creative,
  onCancel,
  onDelete,
  onSave,
}: CreativeFormProps) => {
  return (
    <Grid container spacing={3} direction={"column"}>
      <Paper elevation={8} style={{ padding: 16, marginTop: 30 }}>
        <Grid container alignItems="center">
          <Grid item xs={8}>
            <TextField margin="normal" label="Titre" value={creative.title} />
          </Grid>
          <Grid item xs container justifyContent="flex-end">
            <Grid item>
              <Switch checked />
            </Grid>
          </Grid>
        </Grid>

        <TextField
          margin="normal"
          fullWidth
          multiline
          minRows={3}
          label="Description"
          value={creative.description}
        />

        <TextField
          margin="normal"
          fullWidth
          multiline
          minRows={10}
          label="Contenu"
          value={creative.content}
        />

        <Grid container spacing={2} alignItems="center">
          {creative.formats.map((format) => (
            <Grid item>
              <Chip label={format} color="primary" />
            </Grid>
          ))}
          <Grid item>
            <IconButton size="small" color="primary">
              <Add />
            </IconButton>
          </Grid>
        </Grid>
      </Paper>

      <Grid item container spacing={3} justifyContent="center">
        <Grid item>
          <Button color="primary" variant="contained" onClick={onSave}>
            Sauvegarder
          </Button>
        </Grid>
        <Grid item>
          <Button variant="outlined" onClick={onCancel}>
            Annuler
          </Button>
        </Grid>
        <Grid item>
          <Button variant="outlined" color="error" onClick={onDelete}>
            Supprimer
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export { CreativeForm };
