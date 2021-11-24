import React from 'react'
import { Block, Calendar, Grid, ScrollView } from '@stage-ui/core'

export default () => {
  return (
    <ScrollView>
      <Grid gap="1rem" templateRows="1fr 1fr" templateColumns="1fr 1fr" alignItems="start">
        <Block p="m" decoration="mediumShadow" w="16rem">
          <Calendar hideNeighborMonths type="day" />
        </Block>
        <Block p="m" decoration="mediumShadow" w="16rem">
          <Calendar type="week" />
        </Block>
        <Block p="m" decoration="mediumShadow" w="16rem">
          <Calendar type="month" />
        </Block>
        <Block p="m" decoration="mediumShadow" w="16rem">
          <Calendar type="year" />
        </Block>
      </Grid>
    </ScrollView>
  )
}
