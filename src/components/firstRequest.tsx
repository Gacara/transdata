import React, { useEffect, useState } from 'react'
import { getJSON } from '../callAPI/fetch-json'
import useRefreshablePromise from '../callAPI/use-refreshable-promise'
import Async from '../callAPI/async';
import Search from './search';
import { Grid } from '@material-ui/core';

interface IProfile {
  slug: string
  name: string
}

interface stationsInterface {
 stations: IProfile[];
}

interface data {
result: stationsInterface;
}

const fetchProfiles = async () => {
  return getJSON<data>("https://api-ratp.pierre-grimaud.fr/v4/stations/metros/1");
}

const createProfile = async () => {
  console.log("poyuet");
  return;
}

function Recherche(): React.ReactElement {
  const [metroStations, setMetroStations] = useState<data | null>(null);
  const { refresh, ...fetchState } = useRefreshablePromise(fetchProfiles, setMetroStations)
  const stations = metroStations ? metroStations.result.stations : null;
  const onCreateProfileClick = async () => {
    await createProfile()
    await refresh() // re-execute fetchProfiles and re-render component
  }

  return (
    <Grid container item sm={12} justify="center">
        <Grid container item sm={12}>
        <Search list={stations && stations.length > 0 ? stations : null}/>
        </Grid>
        <Grid container item sm={12}>
      <Async state={fetchState}>
      {
        !stations  &&
        <>Pas de métro</>
      }
      </Async>
      </Grid>
      <Grid container item sm={12}>
          <button onClick={onCreateProfileClick}>Refresh metro List</button>
      </Grid>
    </Grid>
  )
}

export default Recherche;