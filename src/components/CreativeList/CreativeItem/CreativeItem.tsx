import {
  Avatar,
  Chip,
  Grid,
  ListItemText,
  Switch,
  Typography,
} from "@mui/material";
import ListItem from "@mui/material/ListItem";
import { Creative } from "../../../interfaces/creative";

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
          <Grid
            container
            spacing={1}
            flexDirection={{ md: "row", xs: "column" }}
          >
            <Grid
              item
              sm={4}
              sx={{
                paddingRight: "10px",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  ...(isSelected && { fontWeight: "bold" }),
                }}
              >
                {creative.title}
              </Typography>
            </Grid>
            <Grid
              item
              md={2}
              sx={{
                paddingRight: "10px",
              }}
            >
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                {creative.contributors.map((user) => (
                  <Avatar
                    key={user.id}
                    sx={{
                      marginRight: {
                        xs: -1,
                        md: -2,
                      },
                    }}
                  >
                    {`${user.firstName[0]}${user.lastName[0]}`}
                  </Avatar>
                ))}
              </div>
            </Grid>
            <Grid
              item
              md={6}
              sx={{
                paddingRight: "10px",
              }}
            >
              {creative.formats.map((format) => (
                <Chip
                  style={{ marginRight: 8, marginBottom: 8 }}
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
