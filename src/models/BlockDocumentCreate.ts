export type BlockDocumentCreate = {
  name: string,
  data: Record<string, unknown>,
  blockSchemaId: string,
  blockTypeId: string,
  is_anonymous?: boolean,
}