const treeStatuses = [
  {
    key: 'Живое',
    text: 'Живое',
  },
  {
    key: 'Неживое',
    text: 'Неживое',
  },
].map((el) => ({
  ...el,
  value: el.key,
}))

const conditionAssessments = Array.from(Array(5).keys()).map((el) => ({
  key: el + 1,
  value: el + 1,
  text: el + 1,
}))

const treePlantingTypes = [
  {
    key: 'Культурная посадка',
    text: 'Культурная посадка',
  },
  {
    key: 'Самосев',
    text: 'Самосев',
  },
].map((el) => ({
  ...el,
  value: el.key,
}))

module.exports = {
  treeStatuses,
  conditionAssessments,
  treePlantingTypes,
}
