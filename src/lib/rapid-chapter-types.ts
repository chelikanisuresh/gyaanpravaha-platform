export interface RapidSection {
  id: number
  title: string
  minReadSeconds: number
  body: string
}

export interface RapidChapter {
  id: number
  title: string
  sections: RapidSection[]
}
