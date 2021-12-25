import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import PlayForWorkIcon from '@mui/icons-material/PlayForWork';

const CampaignTable = (props) => {
  const { campaigns, selectCampaign } = props;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Campaign ID</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Type</TableCell>
            <TableCell align="right">Objective (Type)</TableCell>
            <TableCell align="right">Create Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {campaigns.map((row) => (
            <TableRow
              key={row.campaign_id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <PlayForWorkIcon onClick={() => { selectCampaign(row.campaign_id) }} />
                {row.campaign_id}
              </TableCell>
              <TableCell align="right">{row.campaign_name}</TableCell>
              <TableCell align="right">{row.campaign_type}</TableCell>
              <TableCell align="right">{row.objective} ({row.objective_type})</TableCell>
              <TableCell align="right">{row.create_time}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default function CampaignContent(props) {

  const { campaigns } = props;

  return (
    <Paper sx={{ maxWidth: 936, margin: 'auto', overflow: 'hidden' }}>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
      >
        <Toolbar>
          <Grid container>
            <Grid item xs={8}>
              <Typography mt={2} variant="h6">
                Campaign
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Button variant="contained" sx={{ mr: 1 }}>
                Add Campaign
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      {(null === campaigns || campaigns.length <= 0) ? (
        <Typography sx={{ my: 5, mx: 2 }} color="text.secondary" align="center">
          No campaign created
        </Typography>
      ) : (
        <CampaignTable {...props} />
      )
      }
    </Paper >
  );
}