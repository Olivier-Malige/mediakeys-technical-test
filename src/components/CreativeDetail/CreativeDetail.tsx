import { Person } from '@mui/icons-material';
import { Grid, List, ListItem, ListItemIcon, ListItemText, Paper, Typography } from '@mui/material';

import { useNavigate } from 'react-router';
import { Creative } from '../../types/creative';
import { ROUTER_PATHS } from '../../constants/path';

export type CreativeDetailProps = {
  creative: Creative;
};

const CreativeDetail = ({ creative }: CreativeDetailProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`${ROUTER_PATHS.CREATIVE}/${creative.id}`);
  };

  const lastModifiedLocalDate = new Date(creative.lastModified).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Paper style={{ padding: 16, cursor: 'pointer' }} elevation={8} onClick={handleClick}>
      <Grid container spacing={3} flexDirection={{ md: 'row', xs: 'column' }}>
        <Grid item md={8}>
          <Typography variant="h6" paragraph data-testid={'creative-title'}>
            {creative.title}
          </Typography>
          <Typography paragraph data-testid={'creative-description'}>
            {creative.description}
          </Typography>
          <Typography paragraph data-testid={'creative-content'}>
            {creative.content}
          </Typography>
        </Grid>
        <Grid item md={4}>
          <Paper
            elevation={0}
            sx={{
              md: {
                padding: 16,
              },
            }}
          >
            <Typography paragraph variant="subtitle2" data-testid="creative-createdBy">
              {`Crée par ${creative.createdBy.firstName} ${creative.createdBy.lastName}`}
            </Typography>
            <Typography paragraph variant="subtitle2" data-testid="creative-lastModified">
              {`Dernière modification le ${lastModifiedLocalDate}`}
            </Typography>
          </Paper>

          <Paper elevation={2}>
            <List>
              {creative.contributors.map((user) => (
                <ListItem key={user.id} data-testid={'creative-contributor'}>
                  <ListItemIcon>
                    <Person />
                  </ListItemIcon>
                  <ListItemText primary={`${user.firstName} ${user.lastName}`} />
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
