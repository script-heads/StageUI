import {
  Block,
  Button,
  Flexbox,
  Grid,
  Header,
  ScrollView,
  Spinner,
  useTheme,
  Checkbox,
} from '@stage-ui/core'
import React from 'react'
import PlaygroundControl from './control'
import PlaygroundMenu from './menu'
import PlaygroundSidebar from './sidebar'
import PlaygroundTable from './table'
import PlaygroundToolbar from './toolbar'

const App = () => {
  const { color } = useTheme()

  return (
    <Flexbox>
      <ScrollView h="100vh" w="15rem" backgroundColor="surface">
        <PlaygroundSidebar />
      </ScrollView>
      <ScrollView h="100vh" w="calc(100vw - 15rem)">
        <Block p={['4rem', '3rem', '2rem', '1rem']}>
          <Flexbox p="0.5rem" justifyContent="space-between">
            <Header>Playground</Header>
            <Spinner size="xl" />
          </Flexbox>
          <PlaygroundMenu />
          <PlaygroundToolbar />
          <PlaygroundControl />
          <Grid templateColumns="1fr 1fr" columnGap="0.5rem">
            <PlaygroundTable />
          </Grid>
        </Block>
        <Checkbox />
        <Button color="primary" label="new button" />
        <Block
          w="5rem"
          h="3rem"
          css={{
            background: color.blue[700].hex(),
          }}
        />
      </ScrollView>
    </Flexbox>
  )
}

export default App
