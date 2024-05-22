export interface Department
{
    name:string;
    manager:string;
    staffs: {username : string, name: string}[]
}