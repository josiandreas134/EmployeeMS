import { Employee } from './Employee'

export interface Team {
    id: number,
    teamName: string,
    members: Employee[]
}
