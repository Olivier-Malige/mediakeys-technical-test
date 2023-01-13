import { yupResolver } from '@hookform/resolvers/yup';
import { Dialog, DialogActions } from '@mui/material';
import Button from '@mui/material/Button';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { CreativeFormat } from '../../types/creative';

const schema = yup.object().shape({
  width: yup.number().positive().required(),
  height: yup.number().positive().required(),
});

type AddFormatFormDialogProps = {
  onSubmit: (creativeFormat: CreativeFormat) => void;
  open: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const AddFormatFormDialog = ({ onSubmit, open, setIsOpen }: AddFormatFormDialogProps) => {
  const { handleSubmit, register, formState, reset } = useForm<CreativeFormat>({
    resolver: yupResolver(schema),
  });

  const handleSubmitForm: SubmitHandler<CreativeFormat> = (creativeFormat) => {
    onSubmit(creativeFormat);
    setIsOpen(false);
    reset();
  };

  const handleClose = () => {
    setIsOpen(false);
    reset();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <DialogTitle>Ajouter un format</DialogTitle>
        <DialogContent>
          <Grid container padding={1} spacing={3} direction={'column'}>
            <Grid item>
              <TextField
                {...register('width')}
                label="width"
                type="number"
                required
                error={!!formState.errors.width}
                fullWidth
              />
            </Grid>
            <Grid item>
              <TextField
                {...register('height')}
                label="height"
                type="number"
                required
                error={!!formState.errors.height}
                fullWidth
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Annuler
          </Button>
          <Button color="primary" variant="contained" type="submit">
            OK
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export { AddFormatFormDialog };
