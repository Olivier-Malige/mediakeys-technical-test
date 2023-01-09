import { Avatar, Chip, Grid, ListItemText, Switch, Typography } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import { Creative } from '../../../interfaces/creative';

export interface CreativeItemProps {
  creative: Creative;
  isLast: boolean;
  isSelected: boolean;
  onEnable: (id: string, enabled: boolean) => void;
}

const CreativeItem = ({ creative, isLast, isSelected, onEnable }: CreativeItemProps) => {
  return (
    <ListItem
      data-testid={`creative-item-${creative.id}`}
      secondaryAction={
        <Switch
          data-testid="active-switch"
          onClick={() => onEnable(creative.id, !creative.enabled)}
          checked={creative.enabled}
        />
      }
      divider={!isLast}
    >
      <ListItemText
        primary={
          <Grid container spacing={1} flexDirection={{ md: 'row', xs: 'column' }}>
            <Grid item sm={4} sx={{ paddingRight: '10px' }}>
              <Typography
                variant="h6"
                sx={{
                  ...(isSelected && { fontWeight: 'bold' }),
                }}
              >
                {creative.title}
              </Typography>
            </Grid>
            <Grid item md={2} sx={{ paddingRight: '10px' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {creative.contributors.map((user, index) => (
                  <Avatar
                    data-testid={`avatar-${index}`}
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
            <Grid item md={6} sx={{ paddingRight: '10px' }}>
              {creative.formats.map((format, index) => (
                <Chip
                  data-testid={`format-${index}`}
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
