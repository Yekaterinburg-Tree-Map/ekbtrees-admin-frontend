import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { fetchTree } from '@/api/trees'
import { fetchSpecies } from '@/api/species'
import {
  Breadcrumb,
  Button,
  Container,
  Dimmer,
  Divider,
  Form,
  Grid,
  Loader,
  Segment,
} from 'semantic-ui-react'

// eslint-disable-next-line complexity
export default function Tree() {
  const router = useRouter()
  const [treeData, setTreeData] = useState(null)
  const [species, setSpecies] = useState([])

  const { id: treeId } = router.query

  useEffect(() => {
    fetchTree(treeId)
      .then((data) => setTreeData(data))
      .catch((err) => {
        console.error('error fetching tree', treeId, err)
        setTreeData(null)
      })

    fetchSpecies()
      .then((data) => setSpecies(data.map(el => ({
        ...el,
        key: el.id,
        value: el.id,
        text: el.title,
      }))))
      .catch((err) => {
        console.error('error fetching species', err)
        setSpecies([])
      })
  }, [router.query])

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('asdasd')
  }

  return <>
    <Breadcrumb>
      <Breadcrumb.Divider icon='left chevron' />
      <Breadcrumb.Section
        link
        onClick={() => router.push('/trees')}
      >
        К списку деревьев
      </Breadcrumb.Section>
    </Breadcrumb>
    {treeData && <Container>
      <Segment>
        <Form
          onSubmit={handleSubmit}
        >
          <Grid columns={2}>
            <Grid.Column>
              <Form.Dropdown
                fluid
                label='speciesSelect'
                key='speciesSelect'
                options={species}
                value={'aa'}
                // value={treeData.species && {
                //   key: treeData.species.id,
                //   value: treeData.species.id,
                //   text: treeData.species.title,
                // } || null}
                loading={!Boolean(species.length)}
              />
              <Form.Input
                label='Высота дерева в метрах'
                type='number'
                key='height'
                value={treeData.treeHeight || 0}
              />
              <Form.Input 
                label='numberOfTreeTrunks'
                type='number'
                key='numberOfTreeTrunks'
                value={treeData.numberOfTreeTrunks || 0}
              />
              <Form.Input
                label='trunkGirth'
                type='number'
                key='trunkGirth'
                value={treeData.trunkGirth || 0}
              />
              <Form.Input
                label='diameterOfCrown'
                type='number'
                key='diameterOfCrown'
                value={treeData.diameterOfCrown || 0}
              />
            </Grid.Column>
            <Grid.Column>
              <Form.Input
                label='heightOfTheFirstBranch'
                type='number'
                key='heightOfTheFirstBranch'
                value={treeData.heightOfTheFirstBranch || 0}
              />
              <Form.Input
                // todo use select instead of input
                label='conditionAssessment'
                type='number'
                key='diameterOfCrown'
                value={treeData.conditionAssessment || 0}
              />
              <Form.Input
                label='age'
                type='number'
                key='age'
                value={treeData.age || 0}
              />
              <Form.Input
                label='treePlantingType'
                type='text'
                key='treePlantingType'
                value={treeData.treePlantingType || ''}
              />
              <Form.Input
                label='status'
                type='text'
                key='status'
                value={treeData.status || ''}
              />
            </Grid.Column>
          </Grid>
          <Divider horizontal />
          <Button type='submit' color='green'>Сохранить</Button>
        </Form>
      </Segment>
    </Container> || <Dimmer active>
      <Loader/>
    </Dimmer>}
  </>
}
