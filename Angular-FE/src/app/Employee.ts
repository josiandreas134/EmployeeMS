import { Team } from './Team'

export interface Employee {
    id: number,
    name: string,
    phoneNo: any,
    position: string,
    team: Team[],
}
