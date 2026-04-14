export interface RapidSection {
  id: number
  title: string
  minReadSeconds: number
  content: string
}

export interface RapidChapter {
  id: number
  title: string
  sections: RapidSection[]
}
