import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { fetchTree, updateTree } from '@/api/trees'
import { fetchSpecies } from '@/api/species'
import { treeStatuses, treePlantingTypes, conditionAssessments } from '@/utils/consts'
import ImagePreview from '@/components/ImagePreview/ImagePreview'
import styles from './trees.module.css'

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
  const [pending, setPending] = useState(false)
  const [treeData, setTreeData] = useState(null)
  const [species, setSpecies] = useState([])
  const [speciesOptions, setSpeciesOptions] = useState([])

  const { id: treeId } = router.query

  useEffect(() => {
    const update = async () => {
      setPending(true)
      try {
        if (!treeId) {
          setTreeData(null)
          setSpeciesOptions([])
          return
        }
        const tree = await fetchTree(treeId)
        setTreeData(tree)
        const newSpecies = await fetchSpecies()
        setSpecies(newSpecies)
        setSpeciesOptions(newSpecies.map(el => ({
          ...el,
          key: el.id,
          value: el.title,
          text: el.title,
        })))
      } catch (e) {
        setTreeData(null)
        setSpecies([])
        setSpeciesOptions([])
      }
      setPending(false)
    }

    update().catch(console.error)
  }, [treeId])

  const handleChange = (fieldName) => {
    return (event, data) => {
      const newTreeData = { ...treeData }
      const value = data?.value || null
      newTreeData[fieldName] = !isNaN(+ value) && Number(value) || value
      setTreeData(newTreeData)
    }
  }

  const handleChangeSpecies = (event, data) => {
    const speciesName = data?.value || null
    console.log(species)
    const speciesEntity = species.find((el) => el.title = speciesName)
    const newTreeData = { ...treeData }
    newTreeData.species = speciesEntity || null
    setTreeData(newTreeData)
    console.log(treeData)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const update = async () => {
      try {
        await updateTree(treeId, treeData)
        await router.push('/trees')
      } catch (e) {
        console.error(e)
      }
    }

    update().catch(console.error)
  }

  return <>
    {pending && <Dimmer active>
      <Loader>Идёт загрузка</Loader>
    </Dimmer>}
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
                options={speciesOptions}
                selection
                defaultValue={treeData?.species?.title}
                loading={speciesOptions.length === 0}
                onChange={handleChangeSpecies}
              />
              <Form.Input
                label="Высота (в метрах)"
                type="number"
                key="height"
                value={treeData.treeHeight || 0}
                onChange={handleChange('treeHeight')}
              />
              <Form.Input
                label="Число стволов"
                type="number"
                key="numberOfTreeTrunks"
                value={treeData.numberOfTreeTrunks || 0}
                onChange={handleChange('numberOfTreeTrunks')}
              />
              <Form.Input
                label="Обхват самого толстого ствола (в сантиметрах)"
                type="number"
                key="trunkGirth"
                value={treeData.trunkGirth || 0}
                onChange={handleChange('trunkGirth')}
              />
              <Form.Input
                label="Диаметр кроны (в метрах)"
                type="number"
                key="diameterOfCrown"
                value={treeData.diameterOfCrown || 0}
                onChange={handleChange('diameterOfCrown')}
              />
            </Grid.Column>
            <Grid.Column>
              <Form.Input
                label="Высота первой ветви от земли (в метрах)"
                type="number"
                key="heightOfTheFirstBranch"
                value={treeData.heightOfTheFirstBranch || 0}
                onChange={handleChange('heightOfTheFirstBranch')}
              />
              <Form.Dropdown
                label="Визуальная оценка состояния"
                selection
                key="conditionAssessment"
                defaultValue={treeData.conditionAssessment || 1}
                options={conditionAssessments}
                onChange={handleChange('conditionAssessment')}
              />
              <Form.Input
                label="Возраст (в годах)"
                type="number"
                key="age"
                value={treeData.age || 0}
                onChange={handleChange('age')}
              />
              <Form.Dropdown
                selection
                label="Тип посадки"
                type="text"
                key="treePlantingType"
                defaultValue={treeData.treePlantingType}
                options={treePlantingTypes}
                onChange={handleChange('treePlantingType')}
              />
              <Form.Dropdown
                selection
                label="Статус дерева"
                type="text"
                key="status"
                defaultValue={treeData.status}
                options={treeStatuses}
                onChange={handleChange('status')}
              />
            </Grid.Column>
          </Grid>
        </Segment>
        { treeData.fileIds.length && <Segment>
          <div className={styles.imageContainer}>
            {treeData.fileIds.map((fileId) => <ImagePreview
              key={fileId}
              fileId={fileId}
            />)}
          </div>
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
