import List from '@mui/material/List';
import Paper from '@mui/material/Paper';

import { CreativeItem } from './CreativeItem/CreativeItem';
import { Creative } from '../../types/creative';
import { Box } from '@mui/material';

export type CreativesListProps = {
  creatives: Creative[] | undefined;
  setSelectedCreative: (creative: Creative) => void;
  selectedCreativeId: string | undefined;
  onEnable: (id: string, enabled: boolean) => void;
};

const CreativesList = ({ creatives, selectedCreativeId, setSelectedCreative, onEnable }: CreativesListProps) => {
  return (
    <Paper sx={{ padding: 1.2, height: 'fit-content' }} elevation={8}>
      <List>
        {creatives &&
          creatives.map((creative, index) => (
            <Box sx={{ cursor: 'pointer' }} key={creative.id} onClick={() => setSelectedCreative(creative)}>
              <CreativeItem
                creative={creative}
                isSelected={creative.id === selectedCreativeId}
                isLast={index === creatives.length - 1}
                onEnable={onEnable}
              />
            </Box>
          ))}
      </List>
    </Paper>
  );
};

export { CreativesList };
