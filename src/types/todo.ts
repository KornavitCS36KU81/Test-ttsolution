export type TodoType = {
    id: number
    title: string
    description: string
    startTime: string
    finishTime: string | null
    finish: boolean
}

export type ChangeType = {
    title: string
    description: string
}