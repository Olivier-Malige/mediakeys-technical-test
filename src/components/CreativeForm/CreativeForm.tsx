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
import { Creative, CreativeFormValues } from "../../types/creative";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface CreativeFormProps {
  creative: Creative;
  onSave: (creativeFormValues: CreativeFormValues, id: string) => void;
  onCancel: () => void;
  onDelete: (creativeId: string) => void;
}

const schema = yup.object().shape({
  title: yup
    .string()
    .min(3, "3 caractère min")
    .max(25, "25 caractères max")
    .required("Champ obligatoire"),
  description: yup.string().max(200, "200 caractères max"),
  content: yup.string().max(1000, "1000 caractères max"),
  enabled: yup.boolean(),
});

const CreativeForm = ({
  creative,
  onCancel,
  onDelete,
  onSave,
}: CreativeFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreativeFormValues>({
    defaultValues: {
      title: creative.title,
      description: creative.description,
      content: creative.content,
      enabled: creative.enabled,
    },
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const handleSubmitForm: SubmitHandler<CreativeFormValues> = (
    creativeFormValues
  ) => {
    onSave(creativeFormValues, creative.id);
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)}>
      <Grid container spacing={3} direction={"column"}>
        <Paper elevation={8} style={{ padding: 16, marginTop: 30 }}>
          <Grid container alignItems="center">
            <Grid item xs={8}>
              <TextField
                margin="normal"
                label="Titre"
                {...register("title")}
                error={!!errors.title}
                helperText={errors.title?.message}
                required
              />
            </Grid>
            <Grid item xs container justifyContent="flex-end">
              <Grid item>
                <Switch
                  {...register("enabled")}
                  defaultChecked={creative.enabled}
                />
              </Grid>
            </Grid>
          </Grid>

          <TextField
            margin="normal"
            fullWidth
            multiline
            minRows={3}
            label="Description"
            {...register("description")}
            error={!!errors.description}
            helperText={errors.description?.message}
          />

          <TextField
            margin="normal"
            fullWidth
            multiline
            minRows={10}
            label="Contenu"
            {...register("content")}
            error={!!errors.content}
            helperText={errors.content?.message}
          />

          <Grid container spacing={2} alignItems="center">
            {creative.formats.map((format) => (
              <Grid item key={format.width + format.height}>
                <Chip
                  label={format.width + "/" + format.height}
                  color="primary"
                />
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
            <Button color="primary" variant="contained" type="submit">
              Sauvegarder
            </Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" onClick={onCancel}>
              Annuler
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              color="error"
              onClick={() => onDelete(creative.id)}
            >
              Supprimer
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export { CreativeForm };
