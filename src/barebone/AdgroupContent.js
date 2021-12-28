import React, { useEffect, useState } from 'react';
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
const axios = require('axios');

const AdgroupTable = (props) => {
  const { adgroups, selectAdgroup } = props;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Adgroup ID</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Type</TableCell>
            <TableCell align="right">Budget (Mode)</TableCell>
            <TableCell align="right">Create Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {adgroups.map((row) => (
            <TableRow
              key={row.adgroup_id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <PlayForWorkIcon onClick={() => { selectAdgroup(row.adgroup_id) }} />
                {row.adgroup_id}
              </TableCell>
              <TableCell align="right">{row.adgroup_name}</TableCell>
              <TableCell align="right">{row.bid_type}</TableCell>
              <TableCell align="right">{row.budget} ({row.budget_mode})</TableCell>
              <TableCell align="right">{row.create_time}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default function AdgroupContent(props) {

  const { campaignId } = props
  const [adgroups, setAdgroups] = useState(null);

  useEffect(() => {
    axios.get("/api/barebone/adgroup", { params: { campaignId: campaignId } }
    ).then(function (response) {
      setAdgroups(response.data);
    }).catch(function (error) {
      console.error(error);
    })
  }, [campaignId]);

  const createAdGroup = () => {
    axios.post("/api/barebone/adgroup", { campaignId: campaignId }
    ).then(function (response) {
      console.log(response.data);
    }).catch(function (error) {
      console.error(error);
    })
  }

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
                Adgroup of {campaignId}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Button variant="contained" sx={{ mr: 1 }} onClick={() => createAdGroup()}>
                Add Adgroup
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      {(null === adgroups || adgroups.length <= 0) ? (
        <Typography sx={{ my: 5, mx: 2 }} color="text.secondary" align="center">
          No Ad Group created
        </Typography>
      ) : (
        <AdgroupTable adgroups={adgroups} {...props} />
      )
      }
    </Paper >
  );
}