import {
  Avatar,
  Chip,
  Grid,
  ListItemText,
  Switch,
  Typography,
} from "@mui/material";
import ListItem from "@mui/material/ListItem";
import { Creative } from "../../../types/creative";

type CreativeItemProps = {
  creative: Creative;
  isLast: boolean;
  isSelected: boolean;
  onEnable: (id: string, enabled: boolean) => void;
};

const CreativeItem = ({
  creative,
  isLast,
  isSelected,
  onEnable,
}: CreativeItemProps) => {
  return (
    <ListItem
      secondaryAction={
        <Switch
          onClick={() => onEnable(creative.id, !creative.enabled)}
          checked={creative.enabled}
        />
      }
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
                {creative.contributors.map((user) => (
                  <Avatar key={user.id} style={{ marginLeft: -16 }}>
                    {`${user.firstName[0]}${user.lastName[0]}`}
                  </Avatar>
                ))}
              </div>
            </Grid>
            <Grid item xs={6}>
              {creative.formats.map((format) => (
                <Chip
                  style={{ marginRight: 8 }}
                  key={format.width + format.height}
                  label={`${format.width} / ${format.height}`}
                />
              ))}
            </Grid>
          </Grid>
        }
      />
    </ListItem>
  );
};

export { CreativeItem };
