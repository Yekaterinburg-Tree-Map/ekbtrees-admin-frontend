import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { fetchTree } from '@/api/trees'
import { fetchSpecies } from '@/api/species'
import { treeStatuses, treePlantingTypes, conditionAssessments } from '@/utils/consts'
import ImagePreview from '@/components/ImagePreview/ImagePreview'
import {
  Breadcrumb,
  Button,
  Container,
  Dimmer,
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
        value: el.title,
        text: el.title,
      }))))
      .catch((err) => {
        console.error('error fetching species', err)
        setSpecies([])
      })
  }, [treeId])

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('handle submit')
  }

  return <>
    <Breadcrumb>
      <Breadcrumb.Divider icon="left chevron"/>
      <Breadcrumb.Section
        link
        onClick={() => router.push('/trees')}
      >
        К списку деревьев
      </Breadcrumb.Section>
    </Breadcrumb>
    {treeData && <Container>
      <Form
        onSubmit={handleSubmit}
      >
        <Segment>
          <Grid columns={2}>
            <Grid.Column>
              <Form.Dropdown
                label="Порода"
                key="speciesSelect"
                options={species}
                selection
                defaultValue={treeData.species.title}
                loading={species.length === 0}
              />
              <Form.Input
                label="Высота (в метрах)"
                type="number"
                key="height"
                value={treeData.treeHeight || 0}
              />
              <Form.Input
                label="Число стволов"
                type="number"
                key="numberOfTreeTrunks"
                value={treeData.numberOfTreeTrunks || 0}
              />
              <Form.Input
                label="Обхват самого толстого ствола (в сантиметрах)"
                type="number"
                key="trunkGirth"
                value={treeData.trunkGirth || 0}
              />
              <Form.Input
                label="Диаметр кроны (в метрах)"
                type="number"
                key="diameterOfCrown"
                value={treeData.diameterOfCrown || 0}
              />
            </Grid.Column>
            <Grid.Column>
              <Form.Input
                label="Высота первой ветви от земли (в метрах)"
                type="number"
                key="heightOfTheFirstBranch"
                value={treeData.heightOfTheFirstBranch || 0}
              />
              <Form.Dropdown
                label="Визуальная оценка состояния"
                selection
                key="conditionAssessment"
                defautValue={treeData.conditionAssessment || 1}
                options={conditionAssessments}
              />
              <Form.Input
                label="Возраст (в годах)"
                type="number"
                key="age"
                value={treeData.age || 0}
              />
              <Form.Dropdown
                selection
                label="Тип посадки"
                type="text"
                key="treePlantingType"
                defaultValue={treeData.treePlantingType}
                options={treePlantingTypes}
              />
              <Form.Dropdown
                selection
                label="Статус дерева"
                type="text"
                key="status"
                defaultValue={treeData.status}
                options={treeStatuses}
              />
            </Grid.Column>
          </Grid>
        </Segment>
        { treeData.fileIds.length && <Segment>
          {treeData.fileIds.map((fileId) => <ImagePreview
            key={fileId}
            fileId={fileId}
          />)}
        </Segment> || <></>}
        <Segment>
          <Button type="submit" color="green">Сохранить</Button>
        </Segment>
      </Form>
    </Container> || <Dimmer active>
      <Loader/>
    </Dimmer>}
  </>
}
